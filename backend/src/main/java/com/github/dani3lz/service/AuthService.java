package com.github.dani3lz.service;

import com.github.dani3lz.exception.AppError;
import com.github.dani3lz.model.Credential;
import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.*;
import com.github.dani3lz.repository.UserRepository;
import com.github.dani3lz.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService, Validator {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtils jwtTokenUtils;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper mapper;
    private final CountryService countryService;

    public ResponseEntity<?> login(JwtRequest authRequest){
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authRequest.getEmail(),
                    authRequest.getPassword()
            ));
        } catch (BadCredentialsException e){
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(),
                    "Incorrect email or password"),
                    HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = loadUserByUsername(authRequest.getEmail());
        String token = jwtTokenUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public User register(RegisterUserDTO registerUserDTO){
        User user = new User();
        user.setEmail(registerUserDTO.getEmail());
        user.setFirstName(registerUserDTO.getFirstName());
        user.setLastName(registerUserDTO.getLastName());
        user.setBirthday(registerUserDTO.getBirthday());
        user.setPhone(registerUserDTO.getPhone());
        user.setCity(registerUserDTO.getCity());
        user.setCountry(countryService.findByName(registerUserDTO.getCountry()));
        user.setCredential(new Credential(passwordEncoder.encode(registerUserDTO.getPassword())));
        return saveUser(user);
    }

    public User saveUser(User user) {
        if (validate(mapper.map(user, UserDTO.class))) {
            if (!userRepository.findByEmail(user.getEmail()).isPresent()) {
                user.setRoles(new HashSet<>(Collections.singletonList(roleService.findByName("ROLE_USER"))));
                return userRepository.save(user);
            }
            throw new RuntimeException("User with this email already exists.");
        }
        throw new RuntimeException("All fields are required.");
    }

    @Override
    public boolean validate(UserDTO userDTO) {
        return !userDTO.getEmail().trim().isEmpty() &&
                !userDTO.getFirstName().trim().isEmpty() &&
                !userDTO.getLastName().trim().isEmpty() &&
                !userDTO.getPhone().trim().isEmpty() &&
                !userDTO.getBirthday().trim().isEmpty() &&
                !userDTO.getCity().trim().isEmpty() &&
                Objects.nonNull(userDTO.getCountryDTO());
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found with this email."));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getCredential()
                        .getPassword(),
                user.getRoles()
                        .stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName()))
                        .collect(Collectors.toList())
        );
    }
}

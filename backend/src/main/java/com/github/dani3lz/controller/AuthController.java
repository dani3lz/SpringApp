package com.github.dani3lz.controller;

import com.github.dani3lz.exception.AppError;
import com.github.dani3lz.model.Credential;
import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.JwtRequest;
import com.github.dani3lz.model.dto.JwtResponse;
import com.github.dani3lz.model.dto.RegisterUserDTO;
import com.github.dani3lz.model.dto.UserDTO;
import com.github.dani3lz.service.UserService;
import com.github.dani3lz.util.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final JwtTokenUtils jwtTokenUtils;
    private final ModelMapper mapper;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthToken(@RequestBody final JwtRequest authRequest){
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
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getEmail());
        String token = jwtTokenUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping("/register")
    public UserDTO registerUser(@Valid @RequestBody final RegisterUserDTO registerUserDTO){
        User user = new User();
        user.setEmail(registerUserDTO.getEmail());
        user.setFirstName(registerUserDTO.getFirstName());
        user.setLastName(registerUserDTO.getLastName());
        user.setBirthday(registerUserDTO.getBirthday());
        user.setPhone(registerUserDTO.getPhone());
        user.setCity(registerUserDTO.getCity());
        user.setCountry(registerUserDTO.getCountry());
        user.setCredential(new Credential(passwordEncoder.encode(registerUserDTO.getPassword())));
        return mapper.map(userService.save(user), UserDTO.class);
    }
}

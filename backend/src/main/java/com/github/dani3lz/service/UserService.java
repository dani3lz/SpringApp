package com.github.dani3lz.service;

import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.UserDTO;
import com.github.dani3lz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements Validator, UserDetailsService {

    private final UserRepository userRepository;
    private final CountryService countryService;

    public List<User> getAll() {
        List<User> userList = new ArrayList<>();
        userRepository.findAll().forEach(userList::add);
        return userList;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email."));
    }

    public User edit(String email, UserDTO userDTO) {
        if (validate(userDTO)) {
            Optional<User> userFromDB = userRepository.findByEmail(email);
            Optional<User> checkIfEmailIsNotOccupied = email.equals(userDTO.getEmail()) ? Optional.empty() : userRepository.findByEmail(userDTO.getEmail());
            if (userFromDB.isPresent() && !checkIfEmailIsNotOccupied.isPresent()) {
                User user = userFromDB.get();
                user.setEmail(userDTO.getEmail());
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                user.setBirthday(userDTO.getBirthday());
                user.setPhone(userDTO.getPhone());
                user.setCountry(countryService.findByName(userDTO.getCountry()));
                user.setCity(userDTO.getCity());
                return user;
            } else {
                throw new RuntimeException("Email is occupied.");
            }
        } else {
            throw new RuntimeException("All fields are required.");
        }
    }

    public String delete(String email) {
        userRepository.delete(userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email.")));
        return "User was deleted successfully.";
    }

    @Override
    public boolean validate(UserDTO userDTO) {
        return !userDTO.getEmail().trim().isEmpty() &&
                !userDTO.getFirstName().trim().isEmpty() &&
                !userDTO.getLastName().trim().isEmpty() &&
                !userDTO.getPhone().trim().isEmpty() &&
                !userDTO.getBirthday().trim().isEmpty() &&
                !userDTO.getCity().trim().isEmpty() &&
                !userDTO.getCountry().trim().isEmpty();
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

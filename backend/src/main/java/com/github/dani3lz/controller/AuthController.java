package com.github.dani3lz.controller;

import com.github.dani3lz.exception.AppError;
import com.github.dani3lz.model.Credential;
import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.JwtRequest;
import com.github.dani3lz.model.dto.JwtResponse;
import com.github.dani3lz.model.dto.RegisterUserDTO;
import com.github.dani3lz.model.dto.UserDTO;
import com.github.dani3lz.service.AuthService;
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
    private final AuthService authService;
    private final ModelMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthToken(@RequestBody final JwtRequest authRequest){
        return authService.login(authRequest);
    }

    @PostMapping("/register")
    public UserDTO registerUser(@Valid @RequestBody final RegisterUserDTO registerUserDTO){
        return mapper.map(authService.saveUser(authService.register(registerUserDTO)), UserDTO.class);
    }
}

package com.github.dani3lz.controller;

import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.CountryDTO;
import com.github.dani3lz.model.dto.JwtRequest;
import com.github.dani3lz.model.dto.RegisterUserDTO;
import com.github.dani3lz.model.dto.UserDTO;
import com.github.dani3lz.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.http.ResponseEntity;
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
        return mapper.map(authService.register(registerUserDTO), UserDTO.class);
    }
}

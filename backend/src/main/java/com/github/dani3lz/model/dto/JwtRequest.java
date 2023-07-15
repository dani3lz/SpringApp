package com.github.dani3lz.model.dto;

import lombok.Data;

@Data
public class JwtRequest {
    private String email;
    private String password;
}

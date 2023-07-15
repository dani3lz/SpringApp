package com.github.dani3lz.model.dto;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterUserDTO {
    @NotNull
    String email;
    @NotNull
    String password;
    @NotNull
    String firstName;
    @NotNull
    String lastName;
    @NotNull
    String birthday;
    @NotNull
    String phone;
    @NotNull
    String country;
    @NotNull
    String city;
}

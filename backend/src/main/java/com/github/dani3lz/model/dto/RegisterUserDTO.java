package com.github.dani3lz.model.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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

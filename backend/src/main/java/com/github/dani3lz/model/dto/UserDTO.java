package com.github.dani3lz.model.dto;

import com.sun.istack.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @NotNull
    String firstName;
    @NotNull
    String lastName;
    @NotNull
    String email;
    @NotNull
    String birthday;
    @NotNull
    String phone;
    @NotNull
    String country;
    @NotNull
    String city;
}

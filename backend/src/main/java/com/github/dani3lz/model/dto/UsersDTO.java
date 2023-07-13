package com.github.dani3lz.model.dto;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsersDTO {
    String username;
    String firstName;
    String lastName;
    String email;
    String phone;
    String country;
    String city;
}

package com.github.dani3lz.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "Users")
@Getter
@Setter
@NoArgsConstructor
public class CustomUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank
    private String username;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "credential_id")
    private Credential credential;

    @Column(name = "firstName", nullable = false)
    @NotBlank
    String firstName;

    @Column(name = "firstName", nullable = false)
    @NotBlank
    String lastName;

    @Column(name = "email", nullable = false)
    @NotBlank
    String email;

    @Column(name = "phone", nullable = false)
    @NotBlank
    String phone;
    @Column(name = "country", nullable = false)
    @NotBlank
    String country;

    @Column(name = "role", nullable = false)
    private String role = "USER";

    public CustomUser(String username) {
        this.username = username;
    }
}

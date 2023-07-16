package com.github.dani3lz.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@Table(name = "countries")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "iso", nullable = false)
    private String iso;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "nicename", nullable = false)
    private String nicename;

    @Column(name = "iso3")
    private String iso3 = null;

    @Column(name = "numcode")
    private String numcode = null;

    @Column(name = "phonecode", nullable = false)
    private String phonecode;

    @OneToMany(mappedBy = "country")
    @JsonManagedReference
    private Set<User> users;
}

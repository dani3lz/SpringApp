package com.github.dani3lz.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryDTO {
    /*private String iso;
    private String name;
    private String iso3;
    private String numcode;*/
    private String nicename;
    private String phonecode;
}

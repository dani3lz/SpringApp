package com.github.dani3lz.service;

import com.github.dani3lz.model.Country;
import com.github.dani3lz.model.dto.CountryDTO;
import com.github.dani3lz.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepository countryRepository;
    private final ModelMapper mapper;

    public List<CountryDTO> findAllCountries(){
        List<CountryDTO> countryDTOList = new ArrayList<>();
        countryRepository.findAll().forEach(country -> countryDTOList.add(mapper.map(country, CountryDTO.class)));
        return countryDTOList;
    }

    public Country findByName(String name){
        return countryRepository.findByNicename(name).orElseThrow(() -> new RuntimeException("Country doesn't exists"));
    }

}

package com.github.dani3lz;

import com.github.dani3lz.model.Country;
import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.CountryDTO;
import com.github.dani3lz.model.dto.UserDTO;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.spi.MappingContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StartApplication {

	public static void main(String[] args) {
		SpringApplication.run(StartApplication.class, args);
	}

	@Bean
	public ModelMapper getModelMapper(){
		ModelMapper modelMapper = new ModelMapper();
		TypeMap<User, UserDTO> propertyMapper = modelMapper.createTypeMap(User.class, UserDTO.class);
		Converter<Country, CountryDTO> countryConverter =
				context -> new ModelMapper().map(context.getSource(), CountryDTO.class);
		propertyMapper.addMappings(
				mapper -> mapper.using(countryConverter).map(User::getCountry, UserDTO::setCountryDTO)
		);
		return modelMapper;
	}

}

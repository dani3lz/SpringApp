package com.github.dani3lz;

import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.UserDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
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
		/*Converter<Country, CountryDTO> countryConverter =
				context -> new ModelMapper().map(context.getSource(), CountryDTO.class);*/
		propertyMapper.addMappings(
				mapper -> mapper.map(user -> user.getCountry().getNicename(), UserDTO::setCountry)
		);
		return modelMapper;
	}

}

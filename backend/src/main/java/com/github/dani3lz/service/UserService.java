package com.github.dani3lz.service;

import com.github.dani3lz.model.Users;
import com.github.dani3lz.model.dto.UsersDTO;
import com.github.dani3lz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements Validator {

    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public List<UsersDTO> getAll() {
        List<UsersDTO> usersDTOList = new ArrayList<>();
        userRepository.findAll().forEach(user -> usersDTOList.add(mapper.map(user, UsersDTO.class)));
        return usersDTOList;
    }

    public UsersDTO getByEmail(String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return mapper.map(user.get(), UsersDTO.class);
        } else {
            throw new RuntimeException("Not found");
        }
    }

    public UsersDTO save(Users user) {
        return mapper.map(userRepository.save(user), UsersDTO.class);
    }

    public UsersDTO edit(String email, UsersDTO usersDTO) {
        if(validate(usersDTO)) {
            Optional<Users> userFromDB = userRepository.findByEmail(email);
            Optional<Users> checkIfEmailIsNotOccupied = userRepository.findByEmail(usersDTO.getEmail());
            if (userFromDB.isPresent() && !checkIfEmailIsNotOccupied.isPresent()) {
                Users user = userFromDB.get();
                user.setEmail(usersDTO.getEmail());
                user.setFirstName(usersDTO.getFirstName());
                user.setLastName(usersDTO.getLastName());
                user.setBirthday(usersDTO.getBirthday());
                user.setPhone(usersDTO.getPhone());
                user.setCountry(usersDTO.getCountry());
                user.setCity(usersDTO.getCity());
                return usersDTO;
            } else {
                throw new RuntimeException("Email is occupied.");
            }
        } else {
            throw new RuntimeException("All fields are required.");
        }
    }

    public UsersDTO delete(String email) {
        Optional<Users> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            userRepository.delete(user.get());
            return mapper.map(user.get(), UsersDTO.class);
        } else {
            throw new RuntimeException("Not found");
        }
    }

    @Override
    public boolean validate(UsersDTO usersDTO) {
        return !usersDTO.getEmail().trim().isEmpty() &&
                !usersDTO.getFirstName().trim().isEmpty() &&
                !usersDTO.getLastName().trim().isEmpty() &&
                !usersDTO.getPhone().trim().isEmpty() &&
                !usersDTO.getBirthday().trim().isEmpty() &&
                !usersDTO.getCity().trim().isEmpty() &&
                !usersDTO.getCountry().trim().isEmpty();
    }
}

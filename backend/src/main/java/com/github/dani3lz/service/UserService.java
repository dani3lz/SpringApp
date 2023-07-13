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
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public List<UsersDTO> getAll(){
        List<UsersDTO> usersDTOList = new ArrayList<>();
        userRepository.findAll().forEach(user -> usersDTOList.add(mapper.map(user, UsersDTO.class)));
        return usersDTOList;
    }

    public UsersDTO getById(Long id){
        Optional<Users> user = userRepository.findById(id);
        if(user.isPresent()){
            return mapper.map(user.get(), UsersDTO.class);
        } else {
            throw new RuntimeException("Not found");
        }
    }

    public UsersDTO save(Users user){
        return mapper.map(userRepository.save(user), UsersDTO.class);
    }

    public UsersDTO delete(String username){
        Optional<Users> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            userRepository.delete(user.get());
            return mapper.map(user.get(), UsersDTO.class);
        } else {
            throw new RuntimeException("Not found");
        }
    }
}

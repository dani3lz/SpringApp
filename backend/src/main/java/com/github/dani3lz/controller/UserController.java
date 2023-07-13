package com.github.dani3lz.controller;

import com.github.dani3lz.model.Users;
import com.github.dani3lz.model.dto.UsersDTO;
import com.github.dani3lz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UsersDTO> getAll(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public UsersDTO getById(@PathVariable("id") Long id){
        return userService.getById(id);
    }

    @PostMapping
    public UsersDTO save(@Valid @RequestBody Users user){
        return userService.save(user);
    }

    @DeleteMapping("/{username}")
    public UsersDTO delete(@PathVariable("username") String username){
        return userService.delete(username);
    }
}

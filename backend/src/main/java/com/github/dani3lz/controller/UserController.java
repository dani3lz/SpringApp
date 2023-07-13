package com.github.dani3lz.controller;

import com.github.dani3lz.model.Users;
import com.github.dani3lz.model.dto.UsersDTO;
import com.github.dani3lz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.transaction.Transactional;
import java.util.List;


@CrossOrigin
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

    @GetMapping("/{email}")
    public UsersDTO getByEmail(@PathVariable("email") final String email){
        return userService.getByEmail(email);
    }

    @PostMapping
    public UsersDTO save(@Valid @RequestBody final Users user){
        return userService.save(user);
    }

    @PutMapping("/{email}")
    public UsersDTO edit(@PathVariable final String email,
                         @Valid @RequestBody final UsersDTO usersDTO){
        return userService.edit(email, usersDTO);
    }

    @DeleteMapping("/{email}")
    public UsersDTO delete(@PathVariable("email") final String email){
        return userService.delete(email);
    }
}

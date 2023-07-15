package com.github.dani3lz.controller;

import com.github.dani3lz.model.Role;
import com.github.dani3lz.model.User;
import com.github.dani3lz.model.dto.UserDTO;
import com.github.dani3lz.service.RoleService;
import com.github.dani3lz.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@Transactional
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final RoleService roleService;
    private final ModelMapper mapper;

    @GetMapping
    public List<UserDTO> getAll() {
        List<UserDTO> userDTOList = new ArrayList<>();
        userService.getAll().forEach(user -> userDTOList.add(mapper.map(user, UserDTO.class)));
        return userDTOList;
    }

    @GetMapping("/{email}")
    public UserDTO getByEmail(@PathVariable("email") final String email) {
        return mapper.map(userService.findByEmail(email), UserDTO.class);
    }

    @PutMapping("/{email}")
    public UserDTO edit(@PathVariable final String email,
                        @Valid @RequestBody final UserDTO userDTO) {
        return mapper.map(userService.edit(email, userDTO), UserDTO.class);
    }

    @DeleteMapping("/{email}")
    public String delete(@PathVariable("email") final String email) {
        return userService.delete(email);
    }

    @GetMapping("/info")
    public String userData(Principal principal) {
        return principal.getName();
    }

    @PutMapping("/{email}/role")
    public ResponseEntity<UserDTO> changeRole(@PathVariable(name = "email") final String email,
                                              @RequestBody final Role newRole) {
        return ResponseEntity.ok(mapper.map(roleService.changeRole(email, newRole.getName()), UserDTO.class));
    }

    @PostMapping("/role")
    public String createRole(@RequestBody final Role role){
        return roleService.createRole(role.getName());
    }

    @DeleteMapping("/role")
    public String deleteRole(@RequestBody final Role role){
        return roleService.deleteRole(role.getName());
    }
}

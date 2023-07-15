package com.github.dani3lz.service;

import com.github.dani3lz.model.Role;
import com.github.dani3lz.model.User;
import com.github.dani3lz.repository.RoleRepository;
import com.github.dani3lz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    List<String> defaultRoles = Arrays.asList("ROLE_USER", "ROLE_ADMIN");

    public User changeRole(String email, String newRole) {
        User user = userService.findByEmail(email);
        user.setRoles(new HashSet<>(Collections.singletonList(roleRepository.findByName(newRole)
                .orElseThrow(() -> new RuntimeException("This role not exists.")))));
        return userRepository.save(user);
    }

    public String createRole(String name){
        if(roleRepository.findByName(name).isPresent()){
            return String.format("Role: '%s' already exists.", name);
        } else {
            roleRepository.save(new Role(name));
            return String.format("Role: '%s' was created successfully.", name);
        }
    }

    public String deleteRole(String name){
        if(!defaultRoles.contains(name) && roleRepository.findByName(name).isPresent()) {
            Role role = roleRepository.findByName(name).get();
            List<User> usersWithThisRole = userRepository.findAllByRolesIn(new HashSet<>(
                            Collections.singletonList(role)
                    ));
            if(!usersWithThisRole.isEmpty()){
                for(User user : usersWithThisRole){
                    user.setRoles(new HashSet<>(
                            Collections.singletonList(findByName("ROLE_USER"))
                    ));
                    userRepository.save(user);
                }
            }
            roleRepository.delete(role);
            return String.format("Role: '%s' was deleted successfully.", name);
        } else {
            return String.format("Role: '%s' not exists or cannot be deleted.", name);
        }
    }

    public Role findByName(String name){
        return roleRepository.findByName(name).orElseThrow(() -> new RuntimeException("This role not exists."));
    }
}

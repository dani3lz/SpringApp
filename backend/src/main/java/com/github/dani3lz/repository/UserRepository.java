package com.github.dani3lz.repository;

import com.github.dani3lz.model.Role;
import com.github.dani3lz.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String username);
    List<User> findAllByRolesIn(Set<Role> role);

}

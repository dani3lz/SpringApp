package com.github.dani3lz.repository;

import com.github.dani3lz.model.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<Users, Long> {

    Optional<Users> findByUsername(String username);

}

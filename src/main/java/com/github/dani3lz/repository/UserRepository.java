package com.github.dani3lz.repository;

import com.github.dani3lz.model.entity.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<CustomUser, Long> {
    Optional<CustomUser> findCustomUserByUsername(String username);
}

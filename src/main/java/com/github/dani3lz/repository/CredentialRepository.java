package com.github.dani3lz.repository;


import com.github.dani3lz.model.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CredentialRepository extends JpaRepository<Credential, Long> {
    Optional<Credential> findCredentialByCustomUserUsernameContaining(String username);
}

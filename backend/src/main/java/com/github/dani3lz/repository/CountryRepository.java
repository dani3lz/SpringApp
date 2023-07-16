package com.github.dani3lz.repository;

import com.github.dani3lz.model.Country;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends CrudRepository<Country, Integer> {
    Optional<Country> findByNicename(String name);
}

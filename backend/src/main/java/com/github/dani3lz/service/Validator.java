package com.github.dani3lz.service;

import com.github.dani3lz.model.dto.UsersDTO;

public interface Validator {
    boolean validate(UsersDTO usersDTO);
}

package com.github.dani3lz.service;

import com.github.dani3lz.model.dto.UserDTO;

public interface Validator {
    boolean validate(UserDTO userDTO);
}

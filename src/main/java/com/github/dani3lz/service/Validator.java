package com.github.dani3lz.service;


import com.github.dani3lz.model.requests.RegisterRequest;

public interface Validator {

    boolean validate(RegisterRequest request);

}

package com.github.dani3lz.exceptions;

public class UserAlreadyRegisteredException extends RuntimeException {
    public UserAlreadyRegisteredException(String username){
        super("Email: " + username + " is already registered");
    }
}

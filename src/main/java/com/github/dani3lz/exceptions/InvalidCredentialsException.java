package com.github.dani3lz.exceptions;

public class InvalidCredentialsException extends RuntimeException{

    public InvalidCredentialsException(){
        super("Username or password is incorrect");
    }
}

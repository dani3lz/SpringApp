package com.github.dani3lz.exceptions;

public class PasswordNotMatchException extends RuntimeException{
    public PasswordNotMatchException(){
        super("Password not match");
    }
}

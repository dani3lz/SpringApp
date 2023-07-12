package com.github.dani3lz.controllers;

import com.github.dani3lz.exceptions.InvalidCredentialsException;
import com.github.dani3lz.exceptions.PasswordNotMatchException;
import com.github.dani3lz.exceptions.SomethingIsWrongException;
import com.github.dani3lz.exceptions.UserAlreadyRegisteredException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PasswordNotMatchException.class)
    public ModelAndView redirectPasswordNotMatch() {
        return new ModelAndView("redirect:/register?password");
    }

    @ExceptionHandler(UserAlreadyRegisteredException.class)
    public ModelAndView redirectUsernameAlreadyExist() {
        return new ModelAndView("redirect:/register?exist");
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ModelAndView redirectToLogin() {
        return new ModelAndView("redirect:/login");
    }
}

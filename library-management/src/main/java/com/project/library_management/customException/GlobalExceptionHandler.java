package com.project.library_management.customException;

import com.project.library_management.customException.exceptions.CustomBadCredentialException;
import com.project.library_management.customException.exceptions.EmailAlreadyExistException;
import com.project.library_management.customException.exceptions.UserBlockedException;
import com.project.library_management.customException.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {EmailAlreadyExistException.class})
    public ResponseEntity<ErrorMessage> emailAlreadyExists(EmailAlreadyExistException ex) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .description("There is conflict with already existing email.")
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(errorMessage);
    }

    @ExceptionHandler(value = {CustomBadCredentialException.class})
    public ResponseEntity<ErrorMessage> customBadCredentialException(CustomBadCredentialException ex) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .description("Please check your username and password.")
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(errorMessage);
    }

    @ExceptionHandler(value = {UserBlockedException.class})
    public ResponseEntity<ErrorMessage> userBlockedException(UserBlockedException ex) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(ex.getMessage())
                .description("Your account has been temporarily blocked. Please contact an administrator.")
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(errorMessage);
    }

    @ExceptionHandler(value = {UserNotFoundException.class})
    public ResponseEntity<ErrorMessage> userNotFoundException(UserNotFoundException ex) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .description("The specified user does not exist.")
                .timestamp(LocalDateTime.now())
                .build();

        return  ResponseEntity.ok(errorMessage);
    }
}

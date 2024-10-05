package com.project.library_management.customException.exceptions;

public class CustomBadCredentialException extends RuntimeException {
    public CustomBadCredentialException(String message) {
        super(message);
    }
}

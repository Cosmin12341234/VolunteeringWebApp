package com.example.backend.exception;

public class DeletionException extends RuntimeException {
    public DeletionException(String message) {
        super(message);
    }
}

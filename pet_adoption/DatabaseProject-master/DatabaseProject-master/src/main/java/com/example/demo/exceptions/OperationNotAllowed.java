package com.example.demo.exceptions;

public class OperationNotAllowed extends Exception {
    public OperationNotAllowed() {
        super();
    }

    public OperationNotAllowed(String message) {
        super(message);
    }

    public OperationNotAllowed(String message, Throwable cause) {
        super(message, cause);
    }

    public OperationNotAllowed(Throwable cause) {
        super(cause);
    }
}

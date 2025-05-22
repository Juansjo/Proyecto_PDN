package com.example.demo.payload.response;

public class LoginMensage {
    String message;
    Boolean status;

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }
    public LoginMensage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }
}

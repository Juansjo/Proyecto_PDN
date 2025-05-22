package com.example.demo.Dto;

public class EmpleadoDto {


    private int empleadoid;
    private String empleadonombre;
    private String email;
    private String password;

    public EmpleadoDto() {
    }
    public EmpleadoDto(int empleadoid, String empleadonombre, String email, String password) {
        this.empleadoid = empleadoid;
        this.empleadonombre = empleadonombre;
        this.email = email;
        this.password = password;
    }

    public int getEmpleadoid() {
        return empleadoid;
    }

    public void setEmpleadoid(int empleadoid) {
        this.empleadoid = empleadoid;
    }

    public String getEmpleadonombre() {
        return empleadonombre;
    }

    public void setEmpleadonombre(String empleadonombre) {
        this.empleadonombre = empleadonombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

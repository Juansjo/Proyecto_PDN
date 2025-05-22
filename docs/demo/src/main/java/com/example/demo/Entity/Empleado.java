package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="empleado")
public class Empleado {
    @Id
    @Column(name = "empleado_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int empleadoid;
    @Column(name = "employee_name", length = 255)
    private String empleadonombre;
    @Column(name = "email", length = 255)
    private String email;
    @Column(name = "password", length = 255)
    private String password;
    public Empleado() {
    }
    public Empleado(int empleadoid, String empleadonombre, String email, String password) {
        this.empleadoid = empleadoid;
        this.empleadonombre = empleadonombre;
        this.email = email;
        this.password = password;
    }
    // Getters y Setters

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
package com.example.demo.Service.impl;

import com.example.demo.Dto.EmpleadoDto;
import com.example.demo.Dto.LoginDto;
import com.example.demo.Entity.Empleado;
import com.example.demo.Repo.EmpleadoRepo;
import com.example.demo.Service.EmpleadoService;
import com.example.demo.payload.response.LoginMensage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.regex.Pattern.matches;


@Service
public class EmpleadoIMPL implements EmpleadoService {
    @Autowired
    private EmpleadoRepo empleadoRepo;


    @Override
    public String addEmpleado(EmpleadoDto empleadoDto) {
        Empleado empleado = new Empleado(
                empleadoDto.getEmpleadoid(),
                empleadoDto.getEmpleadonombre(),
                empleadoDto.getEmail(),
                empleadoDto.getPassword()
        );
        empleadoRepo.save(empleado);
        return empleado.getEmpleadonombre();
    }


    EmpleadoDto empleadoDTO;

    @Override

    public LoginMensage loginEmpleado(LoginDto logindDto) {
        Empleado empleado = empleadoRepo.findByEmail(logindDto.getEmail());
        if (empleado == null) {
            return new LoginMensage("Email not exists", false);
        }

        if (matches(logindDto.getPassword(), empleado.getPassword())) {
            return new LoginMensage("Login Success", true);
        } else {
            return new LoginMensage("Password Not Match", false);
        }
    }

}


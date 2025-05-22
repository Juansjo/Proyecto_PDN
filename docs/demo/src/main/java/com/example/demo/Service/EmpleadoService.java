package com.example.demo.Service;

import com.example.demo.Dto.EmpleadoDto;
import com.example.demo.Dto.LoginDto;
import com.example.demo.payload.response.LoginMensage;


public interface EmpleadoService {
    String addEmpleado(EmpleadoDto empleadoDto);
    LoginMensage loginEmpleado(LoginDto loginDto);
}

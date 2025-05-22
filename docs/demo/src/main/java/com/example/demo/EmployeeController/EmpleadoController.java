package com.example.demo.EmployeeController;

import com.example.demo.Dto.EmpleadoDto;
import com.example.demo.Dto.LoginDto;
import com.example.demo.Service.EmpleadoService;
import com.example.demo.payload.response.LoginMensage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/empleado")

public class EmpleadoController {
    @Autowired
    private EmpleadoService empleadoService;

    @PostMapping(path = "/save")
    public String saveEmployee(@RequestBody EmpleadoDto empleadoDto) {
        String id = empleadoService.addEmpleado(empleadoDto);
        return id;
    }

    /*@PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDto loginDto) {
        LoginMensage loginMensage = empleadoService.loginEmpleado(loginDto);
        return ResponseEntity.ok(loginMensage);
    }*/
}
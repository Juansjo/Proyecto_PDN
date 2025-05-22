package com.example.demo.EmployeeController;

import com.example.demo.Dto.LibroDTO;
import com.example.demo.Entity.Libro;
import com.example.demo.Service.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping
    public ResponseEntity<List<LibroDTO>> getAllLibros() {
        return ResponseEntity.ok(libroService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO> getLibroById(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.findById(id));
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<List<LibroDTO>> getLibrosByTitulo(@PathVariable String titulo) {
        return ResponseEntity.ok(libroService.findByTitulo(titulo));
    }

    @GetMapping("/autor/{autor}")
    public ResponseEntity<List<LibroDTO>> getLibrosByAutor(@PathVariable String autor) {
        return ResponseEntity.ok(libroService.findByAutor(autor));
    }

    @PostMapping
    public ResponseEntity<LibroDTO> createLibro(@RequestBody LibroDTO libroDTO) {
        return new ResponseEntity<>(libroService.save(libroDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroDTO> updateLibro(@PathVariable Long id, @RequestBody LibroDTO libroDTO) {
        return ResponseEntity.ok(libroService.update(id, libroDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibro(@PathVariable Long id) {
        libroService.delete(id);
        return ResponseEntity.noContent().build();
    }
}


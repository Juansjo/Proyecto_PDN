package com.example.demo.Service;

import com.example.demo.Dto.LibroDTO;
import com.example.demo.Entity.Libro;
import com.example.demo.Repo.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    public List<LibroDTO> findAll() {
        return libroRepository.findAll().stream()
                .map(LibroDTO::new)
                .collect(Collectors.toList());
    }

    public LibroDTO findById(Long id) {
        return libroRepository.findById(id)
                .map(LibroDTO::new)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }

    public List<LibroDTO> findByTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo).stream()
                .map(LibroDTO::new)
                .collect(Collectors.toList());
    }

    public List<LibroDTO> findByAutor(String autor) {
        return libroRepository.findByAutorContainingIgnoreCase(autor).stream()
                .map(LibroDTO::new)
                .collect(Collectors.toList());
    }

    public LibroDTO save(LibroDTO libroDTO) {
        // Validación básica
        if (libroDTO.getTitulo() == null || libroDTO.getTitulo().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El título es obligatorio");
        }
        if (libroDTO.getAutor() == null || libroDTO.getAutor().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El autor es obligatorio");
        }

        // Verificar ISBN único si se proporciona
        if (libroDTO.getIsbn() != null && !libroDTO.getIsbn().trim().isEmpty()) {
            libroRepository.findByIsbn(libroDTO.getIsbn())
                    .ifPresent(libro -> {
                        if (!libro.getId().equals(libroDTO.getId())) {
                            throw new ResponseStatusException(HttpStatus.CONFLICT, "El ISBN ya existe");
                        }
                    });
        }

        Libro savedLibro = libroRepository.save(libroDTO.toEntity());
        return new LibroDTO(savedLibro);
    }

    public void delete(Long id) {
        if (!libroRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado");
        }
        libroRepository.deleteById(id);
    }

    public LibroDTO update(Long id, LibroDTO libroDTO) {
        if (!libroRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado");
        }
        libroDTO.setId(id);
        return save(libroDTO);
    }
}
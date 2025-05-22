package com.example.demo.Dto;

import com.example.demo.Entity.Libro;

public class LibroDTO {
    private Long id;
    private String titulo;
    private String autor;
    private String descripcion;
    private String isbn;
    private Integer anioPublicacion;
    private String editorial;
    private Boolean disponible;

    // Getters y Setters (omitidos por brevedad)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getAnioPublicacion() {
        return anioPublicacion;
    }

    public void setAnioPublicacion(Integer anioPublicacion) {
        this.anioPublicacion = anioPublicacion;
    }

    public String getEditorial() {
        return editorial;
    }

    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public Boolean getDisponible() {
        return disponible;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    // Constructor vacío
    public LibroDTO() {}

    // Constructor para convertir de Entidad a DTO
    public LibroDTO(Libro libro) {
        this.id = libro.getId();
        this.titulo = libro.getTitulo();
        this.autor = libro.getAutor();
        this.descripcion = libro.getDescripcion();
        this.isbn = libro.getIsbn();
        this.anioPublicacion = libro.getAnioPublicacion();
        this.editorial = libro.getEditorial();
        this.disponible = libro.getDisponible();
    }

    // Método para convertir de DTO a Entidad
    public Libro toEntity() {
        Libro libro = new Libro();
        libro.setId(this.id);
        libro.setTitulo(this.titulo);
        libro.setAutor(this.autor);
        libro.setDescripcion(this.descripcion);
        libro.setIsbn(this.isbn);
        libro.setAnioPublicacion(this.anioPublicacion);
        libro.setEditorial(this.editorial);
        libro.setDisponible(this.disponible);
        return libro;
    }
}

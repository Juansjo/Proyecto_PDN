import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-libro-lista',
  standalone: false,
  templateUrl: './libro-lista.component.html',
  styleUrls: ['./libro-lista.component.scss']
})
export class LibroListaComponent implements OnInit {
  libros: Libro[] = [];
  cargando = true;
  busqueda = '';
  criterio = 'titulo';

  constructor(
    private libroService: LibroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.cargando = true;
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar libros', error);
        this.cargando = false;
      }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/libros', id]);
  }

  editarLibro(id: number): void {
    this.router.navigate(['/libros/editar', id]);
  }

  eliminarLibro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe({
        next: () => {
          this.libros = this.libros.filter(libro => libro.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar libro', error);
        }
      });
    }
  }

  buscar(): void {
    if (!this.busqueda.trim()) {
      this.cargarLibros();
      return;
    }

    this.cargando = true;
    if (this.criterio === 'titulo') {
      this.libroService.getLibrosByTitulo(this.busqueda).subscribe({
        next: (data) => {
          this.libros = data;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error en la búsqueda', error);
          this.cargando = false;
        }
      });
    } else if (this.criterio === 'autor') {
      this.libroService.getLibrosByAutor(this.busqueda).subscribe({
        next: (data) => {
          this.libros = data;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error en la búsqueda', error);
          this.cargando = false;
        }
      });
    }
  }

  nuevoLibro(): void {
    this.router.navigate(['/libros/nuevo']);
  }
}
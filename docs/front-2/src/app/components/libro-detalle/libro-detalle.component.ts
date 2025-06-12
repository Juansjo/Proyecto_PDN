import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro-detalle',
  standalone: false,
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.scss']
})
export class LibroDetalleComponent implements OnInit {
  libro: Libro | null = null;
  cargando = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libroService: LibroService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.cargarLibro(id);
    });
  }

  cargarLibro(id: number): void {
    this.cargando = true;
    this.libroService.getLibroById(id).subscribe({
      next: (data) => {
        this.libro = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar libro', error);
        this.cargando = false;
        this.error = true;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/libros']);
  }

  editarLibro(): void {
    if (this.libro) {
      this.router.navigate(['/libros/editar', this.libro.id]);
    }
  }

  eliminarLibro(): void {
    if (this.libro && confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.libroService.deleteLibro(this.libro.id as number).subscribe({
        next: () => {
          this.router.navigate(['/libros']);
        },
        error: (error) => {
          console.error('Error al eliminar libro', error);
        }
      });
    }
  }
}
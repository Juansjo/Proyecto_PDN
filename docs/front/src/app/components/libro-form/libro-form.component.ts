import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro-form',
  standalone: false,
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.scss']
})
export class LibroFormComponent implements OnInit {
  libroForm!: FormGroup;
  esEdicion = false;
  libroId?: number;
  cargando = false;
  enviando = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        this.libroId = +params['id'];
        this.cargarLibro(this.libroId);
      }
    });
  }

  inicializarFormulario(): void {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      autor: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(1000)],
      isbn: ['', [Validators.maxLength(20)]],
      anioPublicacion: [null, [Validators.min(0), Validators.max(new Date().getFullYear())]],
      editorial: ['', Validators.maxLength(100)],
      disponible: [true]
    });
  }

  cargarLibro(id: number): void {
    this.cargando = true;
    this.libroService.getLibroById(id).subscribe({
      next: (libro) => {
        this.libroForm.patchValue(libro);
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar libro', error);
        this.cargando = false;
        this.errorMsg = 'No se pudo cargar la información del libro.';
      }
    });
  }

  guardar(): void {
    if (this.libroForm.invalid) {
      Object.keys(this.libroForm.controls).forEach(key => {
        const controlErrors = this.libroForm.get(key)?.errors;
        if (controlErrors) {
          this.libroForm.get(key)?.markAsTouched();
        }
      });
      return;
    }

    this.enviando = true;
    const libro: Libro = this.libroForm.value;

    if (this.esEdicion && this.libroId) {
      this.libroService.updateLibro(this.libroId, libro).subscribe({
        next: () => {
          this.enviando = false;
          this.router.navigate(['/libros']);
        },
        error: (error) => {
          console.error('Error al actualizar libro', error);
          this.enviando = false;
          this.errorMsg = 'Error al guardar los cambios. Por favor intente nuevamente.';
        }
      });
    } else {
      this.libroService.createLibro(libro).subscribe({
        next: () => {
          this.enviando = false;
          this.router.navigate(['/libros']);
        },
        error: (error) => {
          console.error('Error al crear libro', error);
          this.enviando = false;
          this.errorMsg = 'Error al crear el libro. Por favor intente nuevamente.';
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/libros']);
  }

  get titulo() { return this.libroForm.get('titulo'); }
  get autor() { return this.libroForm.get('autor'); }
  get descripcion() { return this.libroForm.get('descripcion'); }
  get isbn() { return this.libroForm.get('isbn'); }
  get anioPublicacion() { return this.libroForm.get('anioPublicacion'); }
}
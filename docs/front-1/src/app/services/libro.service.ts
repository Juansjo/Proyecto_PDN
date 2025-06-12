import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  getLibrosByTitulo(titulo: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/titulo/${titulo}`);
  }

  getLibrosByAutor(autor: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/autor/${autor}`);
  }

  createLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  updateLibro(id: number, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
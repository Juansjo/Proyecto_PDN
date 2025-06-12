export interface Libro {
    id?: number;
    titulo: string;
    autor: string;
    descripcion?: string;
    isbn?: string;
    anioPublicacion?: number;
    editorial?: string;
    disponible?: boolean;
  }
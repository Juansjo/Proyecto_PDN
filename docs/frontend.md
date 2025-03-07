
[frontend.md](https://github.com/user-attachments/files/19119638/frontend.md)

# Gestión de Biblioteca

##Integrantes
Juan Jose Pérez Gomez - 191923
Geily Nathalia Duran Torrado - 191973
Nicolás Andrés Castro Rodriguez - 191924

## Introducción
Este proyecto es una aplicación web para la gestión de una biblioteca, que permite a los usuarios realizar operaciones CRUD (Crear, Actualizar, Eliminar) sobre libros y otros recursos. Está desarrollado utilizando el lenguaje JavaScript y el framework Angular, y se ejecuta en el entorno de desarrollo integrado (IDE) Visual Studio Code. 

## Configuración del Entorno y Ejecución
Para configurar y ejecutar el entorno del frontend, sigue estos pasos:

1. *Instalación de Dependencias*
   - Abre Visual Studio Code.
   - Navega a la carpeta raíz del frontend del proyecto.
   - Abre una terminal en Visual Studio Code.
   - Ejecuta el siguiente comando para instalar las dependencias necesarias:

     bash
     npm install
     

2. *Ejecución del Servidor de Desarrollo*
   - Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

     bash
     npm run dev
     

   - El servidor de desarrollo se iniciará y la aplicación estará disponible en http://localhost:4200

## Lenguajes de Programación
El frontend de este proyecto está desarrollado utilizando los siguientes lenguajes de programación:

- *JavaScript*: Para la lógica de la aplicación.
- *HTML*: Para la estructura de las páginas web.
- *CSS*: Para el diseño y la presentación de las páginas web.
- *TypeScript*: Lenguaje de programación libre y de código abierto.

## Framework
El framework utilizado para el desarrollo del frontend es *Angular*, una plataforma y framework para crear aplicaciones web dinámicas y de una sola página. Está escrito en TypeScript. Implementa la funcionalidad básica y opcional como un conjunto de bibliotecas TypeScript que importaremos en nuestra aplicacion con Angular haremos pruebas unitarias y de extremo a extremo, lo que facilita la creación de aplicaciones robustas y de alta calidad gracias a su capacidad de enlace de datos bidireccional, lo que significa que los cambios en los datos de la aplicación se reflejan automáticamente en la interfaz de usuario y viceversa, sin necesidad de manipular el DOM directamente.

## IDE
El entorno de desarrollo integrado (IDE) utilizado para el desarrollo del frontend es *Visual Studio Code*. Incluye soporte para la depuración, control integrado de Git, resaltado de sintaxis, finalización inteligente de código, fragmentos y refactorización de código.

## Rutas de Carpetas
La estructura de carpetas del frontend del proyecto es la siguiente:

```proyecto biblioteca
frontend/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── ...
│   │   ├── models/
│   │   │   └── ...
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── ...
│   ├── assets/
│   │   └── ...
│   ├── environments/
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── package.json
├── angular.json
└── README.md

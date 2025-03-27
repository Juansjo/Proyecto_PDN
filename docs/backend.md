# Clase 27/03/2025

## Requerimientos

- Mysql Workbech 8.0
- IntelliJ IDEA

## Creación del proyecto

-Decargar la carpeta demo y abrirla con IntelliJ
-Configurar conexion con Mysql Workbech en application.properties

```
   Ruta:demo\src\main\resource\application.properties

```
-Configurar puerto de conexion con Mysqlworkbech

```
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3307/dbkms?createDatabaseIfNotExist=true  // Puerto en que este conectado Mysql en mi caso 3307

spring.datasource.username=root
spring.datasource.password=  //Contraseña de Mysql si tienes


#jpa vendor adapter configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.generate-ddl=true
spring.jpa.show-sql=true

```
Descargar dependencias

```
En IntelliJ IDEA click en Maven, Download Sources And/or Documentation, Download Sources y click en Generate Sources and Update Folders For All Projects


```
Ejecutar la clase DemoApplication.

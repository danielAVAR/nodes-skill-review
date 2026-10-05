# Campus CLI

Aplicación de consola en Node.js (JavaScript) para gestionar estudiantes, docentes, cursos, aulas, horarios, inscripciones y calificaciones. Está basada en el esquema relacional de la base de datos del proyecto (MySQL) y sirve para practicar los temas del módulo.

## Requisitos

- Node.js 20.6 o superior
- MySQL 8

## Cómo ejecutarla

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear la base de datos con las tablas y datos iniciales:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. Crear el archivo de configuración a partir del ejemplo y completar tus credenciales:

   ```bash
   cp .env.example .env
   ```

4. Iniciar la aplicación:

   ```bash
   npm start
   ```

## Estructura por capas

```
database/schema.sql        Script SQL del esquema
src/
  index.js                 Punto de entrada: crea los objetos y los conecta
  config/                  Conexión a la base de datos
  interfaces/              Contratos (Repository, Observer)
  models/                  Entidades del dominio
  repositories/            Acceso a datos (SQL)
  services/                Reglas de negocio
  factories/               Creación de objetos
  patterns/                Piezas del patrón Observer
  utils/                   Funciones pequeñas de apoyo
  cli/                     Menús y lectura por consola
```

El flujo siempre va en una sola dirección:

```
cli  ->  services  ->  repositories  ->  base de datos
```

- **cli**: muestra menús, pide datos al usuario e imprime resultados. No conoce SQL ni reglas de negocio.
- **services**: validan y aplican las reglas (por ejemplo, no inscribir dos veces al mismo estudiante en un horario).
- **repositories**: son los únicos que ejecutan consultas SQL.
- **models**: representan las tablas como clases.

## Temas practicados

### Entornos de ejecución

El proyecto corre sobre Node.js usando módulos ES (`"type": "module"` en `package.json`). La configuración sale de variables de entorno que se cargan con `node --env-file=.env` (ver el script `start`). La lectura por consola usa `node:readline/promises` y el código usa `await` de nivel superior en `src/index.js`.

### Introducción a la POO

Cada tabla tiene su clase en `src/models/`, con propiedades y métodos propios. Ejemplos: `Course` guarda sus temas con `addTopic()`, `Person` expone `fullName`, y cada modelo sabe convertirse a fila de base de datos (`toRow()`) y crearse desde una fila (`fromRow()`). `Subject` usa un campo privado (`#observers`).

### Herencia y polimorfismo

- `Student` y `Teacher` heredan de `Person`, que hereda de `BaseEntity`.
- Todas las entidades sobrescriben `describe()`. La opción "Todas las personas" del menú principal junta estudiantes y docentes en una sola lista y llama a `describe()` sin importar el tipo: cada uno responde a su manera.
- En servicios: `StudentService` extiende `PersonService`, y todos extienden `BaseService`.

### Interfaces y relaciones entre clases

JavaScript no tiene interfaces nativas, así que se usan clases base que lanzan error si no se implementan los métodos:

- `Repository` define `findAll`, `findById`, `create`, `update` y `delete`; `BaseRepository` la implementa.
- `Observer` define `update`; `ConsoleObserver` la implementa.

Relaciones entre clases:

- **Herencia**: `Student` es una `Person`.
- **Composición**: un `Course` contiene sus `Topic`.
- **Asociación**: `CourseSchedule` se relaciona con `Course`, `Teacher` y `Classroom`; `Inscription` con `Student` y `CourseSchedule`.
- **Dependencia**: los servicios usan repositorios; `PersonFactory` usa `Student` y `Teacher`.

### SOLID

- **S (responsabilidad única)**: cada capa y cada clase hace una sola cosa. Los repositorios solo hablan con la base de datos, los servicios solo validan, los menús solo interactúan con el usuario.
- **O (abierto/cerrado)**: para agregar una tabla nueva se crea una subclase de `BaseRepository` y una de `BaseService` sin modificar las existentes.
- **L (sustitución de Liskov)**: un `Student` o un `Teacher` pueden usarse donde se espera una `Person`, y cualquier repositorio donde se espera un `Repository`.
- **I (segregación de interfaces)**: las interfaces son pequeñas y separadas (`Repository` y `Observer`); ninguna clase está obligada a implementar métodos que no usa.
- **D (inversión de dependencias)**: los servicios reciben sus repositorios por el constructor en lugar de crearlos. Todo se conecta en `src/index.js`.

### Patrones de diseño

| Patrón | Dónde | Para qué |
| --- | --- | --- |
| Singleton | `config/Database.js` | Una sola conexión (pool) compartida por toda la aplicación |
| Repository | `repositories/` | Aislar el SQL del resto del código |
| Factory | `factories/PersonFactory.js` | Crear `Student` o `Teacher` según un tipo |
| Observer | `patterns/` e `InscriptionService` | Avisar con un evento cuando una inscripción se crea o se cancela |

### Persistencia de datos y bases de datos relacionales

- Los datos se guardan en MySQL con `mysql2` y consultas parametrizadas (`?`), que evitan inyección SQL.
- `database/schema.sql` crea las 11 tablas del diagrama con sus llaves primarias y foráneas.
- `BaseRepository` implementa el CRUD genérico (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) a partir del nombre de la tabla y del modelo.
- Las relaciones del diagrama se respetan al guardar: un horario necesita curso, docente y aula existentes; una inscripción necesita estudiante y horario existentes; una calificación necesita una inscripción activa.

## Reglas de negocio incluidas

- Nombres, apellidos, número de identificación y correo válido son obligatorios para estudiantes y docentes.
- Los estudiantes necesitan un código.
- Intensidad, peso y capacidad deben ser mayores a cero.
- La fecha final de un horario debe ser posterior a la inicial.
- No se puede inscribir dos veces al mismo estudiante en el mismo horario activo.
- Las inscripciones se cancelan (`active = 0`) en lugar de borrarse.
- Las calificaciones van de 1 a 5 y solo aplican a inscripciones activas.

## Menú

```
Gestión académica
1. Estudiantes      listar, registrar, eliminar
2. Docentes         listar, registrar, eliminar
3. Cursos           listar con temas, crear, agregar tema
4. Aulas            listar, crear
5. Horarios         listar, crear
6. Inscripciones    listar, inscribir, cancelar, calificar, listar calificaciones
7. Todas las personas
0. Salir
```

Orden recomendado para probarla desde cero: crear un estudiante, un docente, un curso, un aula, un horario y luego una inscripción.

## Notas

- Al eliminar un registro que otras tablas referencian, MySQL lo rechaza por la llave foránea y la aplicación muestra el error en pantalla.
- Los tipos de identificación y ciudades iniciales vienen en `schema.sql`; se pueden cambiar o ampliar directamente en la base de datos.

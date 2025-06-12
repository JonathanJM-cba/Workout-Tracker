# Rastreador de Entrenamiento 🏋️‍♂️

Aplicación backend desarrollada para permitir a los usuarios registrar, gestionar y hacer seguimiento de sus entrenamientos físicos. Este proyecto está basado en el desafío propuesto por la comunidad de [roadmap.sh](https://roadmap.sh/projects/fitness-workout-tracker).

## 📌 Descripción

El sistema permite a los usuarios:

- Registrarse e iniciar sesión con autenticación basada en JWT.
- Crear, editar, eliminar y programar entrenamientos.
- Acceder a una lista predefinida de ejercicios clasificados por categoría o grupo muscular.

## 🚀 Tecnologías Utilizadas

- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL
- **ORM:** TypeORM
- **Autenticación:** JSON Web Tokens (JWT)
- **Validaciones:** express-validator
- **Encriptación:** bcryptjs
- **Testing:** Jest y Supertest
- **Entorno de Desarrollo:** ts-node-dev

## 📁 Estructura de Rutas

```bash
GET     /api/exercises           → Obtener todos los ejercicios
POST    /api/exercises           → Crear un nuevo ejercicio

POST    /api/auth/register       → Registro de usuario
POST    /api/auth/login          → Inicio de sesión de usuario

GET     /api/workouts            → Listar entrenamientos del usuario (autenticado)
POST    /api/workouts            → Crear entrenamiento
PUT     /api/workouts/:idWorkout → Actualizar entrenamiento
DELETE  /api/workouts/:idWorkout → Eliminar entrenamiento
PATCH   /api/workouts/schedule/:idWorkout → Programar entrenamiento
```

## 🔐 Autenticación

Los endpoints relacionados con entrenamientos están protegidos por JWT. Solo usuarios autenticados pueden acceder a ellos, y cada usuario solo puede interactuar con sus propios entrenamientos.

## 📊 Funcionalidades Clave

- ✅ Registro e inicio de sesión de usuarios
- ✅ CRUD de entrenamientos
- ✅ Programación de entrenamientos por fecha y hora
- ✅ Validaciones de datos y autorización
- ✅ Seeders de ejercicios con nombre, descripción y categoría/grupo muscular

## 📄 Scripts Disponibles

| Script          | Descripción                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Ejecuta el servidor en modo desarrollo |
| `npm run start` | Ejecuta la app en modo producción      |
| `npm run test`  | Ejecuta las pruebas unitarias          |
| `npm run tsc`   | Compila TypeScript                     |

## 🧪 Pruebas

Se utilizan **Jest** y **Supertest** para realizar pruebas unitarias y de integración.

```bash
npm run test          # Ejecutar todas las pruebas
npm run test:watch    # Ejecutar pruebas en modo watch
npm run test:coverage # Mostrar el reporte de cobertura
```

## 📂 Seeder de Ejercicios

El sistema incluye una funcionalidad de sembrado para cargar ejercicios predefinidos en la base de datos. Cada ejercicio contiene:

- `nombre`
- `descripción`
- `categoría` o `grupo muscular`

Estos datos sirven como base para la creación de planes de entrenamiento.

## 🧰 Requisitos Previos

- Node.js >= 18
- PostgreSQL (con una base de datos configurada)
- Variables de entorno en un archivo `.env` para configurar:
  - `PORT`
  - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
  - `ACCESS_TOKEN_KEY`

## 📖 Basado en

Este proyecto está basado en el reto propuesto en el roadmap de proyectos de [roadmap.sh - Fitness Workout Tracker](https://roadmap.sh/projects/fitness-workout-tracker).

---

## ✍️ Autor

Desarrollado por **Jonathan Muñoz**.

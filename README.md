# 🧩 Proyecto Base – Backend con NestJS + MySQL

Este repositorio es un **boilerplate backend en NestJS** con conexión a **MySQL** mediante SQL crudo.  
Incluye un módulo de ejemplo (`users`) que muestra cómo estructurar servicios, queries, transacciones y manejo de errores.

---

## ⚙️ Configuración inicial

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Variables de entorno (`.env`)**
   ```bash
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=root
   DB_PASS=tu_password
   DB_NAME=plataforma_alquiler
   ```

3. **Levantar el proyecto**
   ```bash
   npm run start:dev
   ```

   El servidor quedará disponible en  
   👉 `http://localhost:3000/api`

---

## 📦 Estructura del proyecto

```
src/
 ├── core/                # Configuración global de DB y helpers
 │   ├── core.module.ts
 │   └── database.service.ts
 │
 ├── users/               # Módulo de ejemplo
 │   ├── users.controller.ts
 │   ├── users.service.ts
 │   ├── queries/         # 💡 Aquí están las consultas SQL del módulo
 │   │   └── user.queries.ts
 │   └── user.entity.ts
 │
 ├── migrations/          # Scripts SQL de migraciones
 │   ├── sql/
 │   └── runner-raw.ts
 │
 └── main.ts              # Entry point
```

---

## 🧱 Estructura de módulos

Cada módulo (por ejemplo, `users`, `anuncios`, `reservas`, etc.) debe tener:

- Su propia carpeta `queries/`
- Un archivo que **exporte todas las queries SQL** (por orden lógico)
- Sus servicios (`.service.ts`) usando el `DatabaseService` para ejecutar esas queries

Ejemplo:  
`src/users/queries/user.queries.ts`

```ts
export const USER_QUERIES = {
  QUERIES: {
    FIND_ALL: 'SELECT id, nombre, apellido, correo, telefono FROM users',
    FIND_BY_ID: 'SELECT id, nombre, apellido, correo, telefono FROM users WHERE id = ?',
    EXISTS_BY_ID: 'SELECT 1 AS ok FROM users WHERE id = ? LIMIT 1',
  },
  MUTATIONS: {
    CREATE_USER: `
      INSERT INTO users (nombre, apellido, correo, telefono, created_at)
      VALUES (?, ?, ?, ?, NOW());
    `,
  },
};
```

Luego en tu servicio:

```ts
import { USER_QUERIES } from './queries/user.queries';

async findAll() {
  return this.db.query<User>(USER_QUERIES.QUERIES.FIND_ALL);
}
```

---

## 💾 DatabaseService

El `DatabaseService` es un wrapper central que simplifica las operaciones SQL:

```ts
// Consultas básicas
await db.query<User>('SELECT * FROM users');

// Una sola fila
await db.queryOne<User>('SELECT * FROM users WHERE id = ?', [id]);

// Verificar existencia
await db.exists('SELECT 1 FROM users WHERE correo = ?', [email]);

// Transacciones
await db.tx(async (qr) => {
  await qr.query('UPDATE ...');
  await qr.query('INSERT ...');
});
```

---

## 🧰 Buenas prácticas

- ✅ **Cada módulo** debe tener su carpeta `queries/`  
  para mantener el código limpio y separado de la lógica del servicio.
- ✅ Siempre usa **placeholders (`?`)** para evitar inyecciones SQL.
- ✅ Centraliza errores y logs con el **filtro global de excepciones**.
- ✅ Usa transacciones (`db.tx`) cuando varias operaciones dependan entre sí.
- ✅ Revisa el módulo **`users`** — sirve como **referencia completa** de estructura y estilo.

## 💬 Notas finales

- Este proyecto busca un estilo limpio y modular: **cada módulo maneja sus propias queries**.
- El módulo `users` es tu guía — sigue ese patrón para los demás.
- Si agregas un nuevo módulo, **usa tu propia carpeta `queries/` y exporta las consultas** desde allí.

---

> ✨ **Objetivo:** mantener un backend legible, modular y fácil de mantener.
> 
> Cada módulo tiene independencia, sus queries bien organizadas y un flujo limpio gracias al `DatabaseService`.

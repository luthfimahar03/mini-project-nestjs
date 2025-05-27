# NestJS Task Management API

A simple and modular task management API built with **NestJS**, **MongoDB**, and **JWT Authentication**. This project is designed for demonstration and technical testing purposes.

---

## 🚀 Features

### 1. CRUD Operations for Tasks

- Create, Read, Update, and Delete tasks.
- Each task includes:

  - `id` (UUID)
  - `title`
  - `description`
  - `status`: `OPEN`, `IN_PROGRESS`, `DONE`
  - `createdAt`: timestamp

### 2. MongoDB Integration

- Task data is persisted in MongoDB using Mongoose.
- Filter tasks by status using query parameters.

### 3. Authentication with JWT

- **User registration and login**.
- Passwords hashed with `bcryptjs`.
- **JWT-based protection** for authenticated routes.
- Custom `JwtStrategy` and `JwtAuthGuard` for validation.

### 4. Dockerized Setup

- Dockerized using `Dockerfile` and `docker-compose.yml`.
- Services:

  - `api`: NestJS application
  - `mongo`: MongoDB

### 5. Modular Architecture

- Organized into modules:

  - `auth/`
  - `tasks/`
  - `users/`

---

## 📦 Tech Stack

- **NestJS** (TypeScript)
- **MongoDB** + Mongoose
- **Passport.js** with **JWT**
- **Docker**
- **class-validator**, **bcryptjs**, **uuid**

---

## 🛡️ Secured Endpoints

| Endpoint         | Method | Auth Required | Description                 |
| ---------------- | ------ | ------------- | --------------------------- |
| `/auth/register` | POST   | ❌            | Register a new user         |
| `/auth/login`    | POST   | ❌            | Login and receive token     |
| `/tasks`         | GET    | ✅            | Get all tasks (with filter) |
| `/tasks/:id`     | GET    | ✅            | Get a task by ID            |
| `/tasks`         | POST   | ✅            | Create a task               |
| `/tasks/:id`     | PATCH  | ✅            | Update task fields          |
| `/tasks/:id`     | DELETE | ✅            | Delete a task               |

---

## 🗃️ Database Schemas

### User

```ts
{
  username: string;
  password: string; // hashed
}
```

### Task

```ts
{
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
  createdAt: Date;
}
```

---

## 🐳 Running with Docker

1. Ensure Docker Desktop is running.
2. Run the application:

```bash
docker-compose up --build
```

3. Access the app at: [http://localhost:3000](http://localhost:3000)

MongoDB URI: `mongodb://localhost:27017/tasks-db`

---

## 🧪 Testing Auth Flow

1. Register:

```http
POST /auth/register
{
  "username": "john",
  "password": "securepass"
}
```

2. Login:

```http
POST /auth/login
{
  "username": "john",
  "password": "securepass"
}
```

Response:

```json
{
  "access_token": "<JWT_TOKEN>"
}
```

3. Use the token:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📁 Project Structure

```
src/
├── auth/
│   ├── dto/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── jwt.strategy.ts
├── tasks/
│   ├── dto/
│   ├── enums/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   └── tasks.module.ts
├── users/
│   └── user.schema.ts
├── app.module.ts
└── main.ts
```

---

## 📄 License

This project is for educational and demonstration purposes.

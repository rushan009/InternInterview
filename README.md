# Career Hub — Mini Job Application Tracker

A full stack web application to track job applications through different hiring stages, built as part of the Full Stack Internship assignment.

---

## 📸 Demo
![Search function screenshot](image-1.png)
![One page shows three of the applications](image-2.png)
![Form to create the application](image-3.png)


## 🚀 Live Demo
Full working appllication:-
https://intern-interview-delta.vercel.app/
> 

---

## 📋 Project Overview

Career Hub lets you manage your job search in one place. You can add applications, track their status across hiring stages, search by company or job title, filter by status, and delete entries — all through a clean, responsive UI backed by a REST API.

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, TypeScript, Tailwind CSS, Vite |
| Backend    | Node.js, Express, TypeScript         |
| Database   | PostgreSQL (via Neon)                |
| ORM        | Prisma                               |
| HTTP Client| Axios                                |

---

## ✅ Features

- **Application List** — view all applications with company name, job title, type, status, applied date, and notes
- **Add Application** — create a new application via a modal form with validation
- **Edit Application** — update an existing application's details
- **Delete Application** — remove an application with a confirmation step
- **Filter by Status** — filter by Applied, Interviewing, Offer, or Rejected
- **Search** — search by company name or job title
- **Pagination** — server-side pagination (3 per page)
- **Loading States** — spinner and skeleton loaders during data fetching

---

## 📦 Prerequisites

- Node.js v18+
- npm v9+
- PostgreSQL database (local or hosted — [Neon](https://neon.tech) recommended)

---

## 📁 Project Structure

```
Intern/
├── client/          # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
└── server/          # Express backend (TypeScript + Prisma)
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   └── services/
    └── prisma/
        └── schema.prisma
```

---

## ⚙️ Environment Variables

### Server — `server/.env`

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@host/dbname?sslmode=require"
PORT=5000
```

### Client — `client/.env`

```env
VITE_API_URL=http://localhost:5000
```

> A `.env.example` is provided in both `client/` and `server/` directories.

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/rushan009/InternInterview.git
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure environment variables

```bash
# In server/
cp .env.example .env
# Fill in your DATABASE_URL and DIRECT_URL

# In client/
cp .env.example .env
# Fill in your VITE_API_URL
```

### 4. Run database migrations

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

---

## 💻 Running in Development Mode

Open two terminals:

```bash
# Terminal 1 — Start the backend
cd server
npm run dev
# Runs on http://localhost:5000

# Terminal 2 — Start the frontend
cd client
npm run dev
# Runs on http://localhost:5173
```

---

## 🗄️ Database Schema

```prisma
model applications {
  id           Int      @id @default(autoincrement())
  company_name String
  job_title    String
  job_type     JobType
  status       Status   @default(Applied)
  applied_date DateTime
  notes        String?
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt
}

enum JobType {
  Internship
  Full_time
  Part_time
}

enum Status {
  Applied
  Interviewing
  Offer
  Rejected
}
```

---

## 📡 API Documentation

Base URL: `http://localhost:5000`

| Method | Endpoint              | Description                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/applications`       | List all applications (supports `?status=`, `?search=`, `?page=`, `?limit=`) |
| GET    | `/applications/:id`   | Get a single application                 |
| POST   | `/applications`       | Create a new application                 |
| PATCH  | `/applications/:id`   | Update an application partially          |
| DELETE | `/applications/:id`   | Delete an application                    |

### Query Parameters for GET `/applications`

| Param    | Type   | Description                        |
|----------|--------|------------------------------------|
| `status` | string | Filter by status (e.g. `Applied`)  |
| `search` | string | Search by company name or job title|
| `page`   | number | Page number (default: 1)           |
| `limit`  | number | Items per page (default: 3)        |

### Example Request

```bash
GET /applications?status=Applied&search=google&page=1&limit=3
```

### Example Response

```json
{
  "success": true,
  "response": {
    "data": [...],
    "total": 10,
    "page": 1,
    "totalPages": 4
  }
}
```

---

## 🧩 Add/Edit Form Fields

| Field        | Type     | Required | Validation              |
|--------------|----------|----------|-------------------------|
| company_name | String   | ✅       | Minimum 2 characters    |
| job_title    | String   | ✅       | —                       |
| job_type     | Enum     | ✅       | Internship / Full-time / Part-time |
| status       | Enum     | ✅       | Applied / Interviewing / Offer / Rejected |
| applied_date | Date     | ✅       | —                       |
| notes        | Text     | ❌       | Optional                |

---

## ✨ Bonus Features Implemented

- [x] Search by company name or job title
- [x] Server-side pagination
- [x] Loading states and skeleton loaders
- [x] TypeScript throughout (frontend + backend)
- [x] Live deployment (Vercel + Render + Neon)

---

## 📄 License

This project was built as part of a Full Stack Internship assignment.

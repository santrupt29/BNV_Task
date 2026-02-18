# MERN Stack User Management System

A responsive web application for managing users with Create, Read, Update, Delete (CRUD) capabilities, Search, Pagination, and CSV Export.
Part of an Assessment Task for BNV.

## Features
- **Responsive Design**: Works on Desktop and Mobile.
- **User Management**: Add, Edit, View, and Delete users.
- **Table Listing**: Pagination and Search functionality.
- **CSV Export**: Download user data as CSV.
- **Validation**: Form validation for all fields.
- **Rich Aesthetics**: Modern UI with CSS variables and clean design.

## Tech Stack
- **Frontend**: React (Vite), React Router, Vanilla CSS, Axios.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Multer.

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)

## Setup & Run

### 1. Backend Setup
```bash
cd server
npm install
# Create a .env file if needed, or rely on defaults (PORT=5000, Mongo=Local)
npm start
```
Server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`.

## Folder Structure
```
/server
  /models       - Mongoose Models
  /controllers  - Business Logic
  /routes       - API Routes
  /uploads      - Uploaded images
  server.js     - Entry point

/client
  /src
    /components - Reusable components (UserForm, UserTable)
    /pages      - Application Pages
    /services   - API calls
    /styles     - Global CSS
```

## API Endpoints
- `GET /api/users`: List users (pagination, search)
- `POST /api/users/register`: Create user
- `GET /api/users/:id`: Get single user
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user
- `GET /api/users/export`: Export to CSV


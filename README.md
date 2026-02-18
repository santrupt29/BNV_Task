# BNV Task - MERN Stack User Management System

A responsive web application for managing users with Create, Read, Update, Delete (CRUD) capabilities, Search, Pagination, and CSV Export. This project was built as part of an assessment task for BNV.

## Features
- **Responsive Design**: Fully responsive layout optimized for Desktop and Mobile devices.
- **User Management**: Complete CRUD operations (Add, Edit, View, and Delete users).
- **Advanced Listing**:
  - **Pagination**: Efficiently browse through user records.
  - **Search**: Real-time search by First Name, Last Name, or Email.
- **CSV Export**: Export the entire user dataset to a CSV file with a single click.
- **Validation**: Robust form validation for all inputs (Email, Mobile, Required fields).
- **Rich Aesthetics**: Modern UI with a clean Cream & Dark theme, using CSS variables for consistent styling.
- **Image Upload**: Profile picture upload functionality.

## Tech Stack
- **Frontend**: React (Vite), React Router, Vanilla CSS, Axios.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Multer (for file uploads).

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (Atlas Connection String or Local URI)

## Setup & Run

### 1. Backend Setup
Navigate to the server directory and install dependencies.

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
# Server runs on http://localhost:5001
```

### 2. Frontend Setup
Navigate to the client directory and install dependencies.

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory with the following variable:

```env
VITE_BACKEND_API_URL=http://localhost:5001
```

Start the frontend development server:

```bash
npm run dev
# Client runs on http://localhost:5173
```

## Folder Structure
```
/server
  /models       - Mongoose Models (User Schema)
  /controllers  - Business Logic (CRUD, Export, Uploads)
  /routes       - API Routes
  /uploads      - Directory for stored profile images
  server.js     - Application Entry Point

/client
  /src
    /components - Reusable components (UserForm, UserTable, Layout)
    /pages      - Application Pages (Home, Register, Edit, Details)
    /services   - API Service Configuration (Axios)
    /styles     - Global CSS and Variables
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users with pagination & search |
| POST | `/api/users/register` | Create a new user with profile image |
| GET | `/api/users/:id` | Get single user details |
| PUT | `/api/users/:id` | Update user details & profile image |
| DELETE | `/api/users/:id` | Delete a user |
| GET | `/api/users/export` | Export all user data to CSV |

## Notes
- **Exports**: The CSV export feature generates a file named `users.csv` containing all user records.
- **Uploads**: Images are uploaded to the `server/uploads` directory and served statically.

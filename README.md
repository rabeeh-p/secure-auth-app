# Full Stack Authentication System

## Overview

This project is a simple authentication system built using Django Rest Framework and React.

It includes:

- Backend with Django Rest Framework, JWT authentication
- MongoDB as the database (using pymongo)
- Frontend with React featuring Registration, Login, Dashboard, and Profile management pages

---

## Features

### Backend
- User Registration
- User Login with JWT authentication
- User Logout
- User CRUD operations (Create, Read, Update, Delete)
- MongoDB integration using pymongo

### Frontend
- Registration page
- Login page
- Dashboard page (protected, accessible after login)
- Profile Update and Delete options
- Responsive UI (built with your preferred UI framework or plain CSS)

---

## Technologies Used

- **Backend:** Django, Django Rest Framework, pymongo, PyJWT
- **Database:** MongoDB
- **Frontend:** React, Axios, SweetAlert2
- **Authentication:** JWT tokens

---

## Installation & Setup

## Installation & Setup

### Backend Setup

1. **Clone the repository** (if not done already):
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>/backend
Create and activate a Python virtual environment:

On Linux/macOS:

bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate
On Windows (PowerShell):

powershell
Copy
Edit
python -m venv venv
.\venv\Scripts\activate
Install Python dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Set environment variables:

Create a .env file in the backend directory with the following content:

ini
Copy
Edit
SECRET_KEY=your_django_secret_key_here
MONGODB_URI=your_mongodb_connection_string_here
Run Django migrations (if applicable):

Since you are using MongoDB with pymongo directly, migrations may not be required unless you have other Django models.

bash
Copy
Edit
python manage.py migrate
Run the backend server:

bash
Copy
Edit
python manage.py runserver
Backend will be accessible at http://127.0.0.1:8000

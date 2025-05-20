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

git clone <your-repo-url>
cd <your-repo-folder>/backend
python3 -m venv venv
source venv/bin/activate  # For Windows PowerShell use: .\venv\Scripts\activate
pip install -r requirements.txt
echo "SECRET_KEY=your_django_secret_key_here" > .env
echo "MONGODB_URI=your_mongodb_connection_string_here" >> .env
python manage.py migrate  # Optional if you have Django models
python manage.py runserver

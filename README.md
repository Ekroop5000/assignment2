# Assignment 2: Task Management Tool API

## Project Overview
This project is a **Task Management Tool** API designed to help users manage their tasks efficiently. The API allows users to register, log in, create tasks, update task statuses, and perform other task management operations.

The task management system includes features such as:
- User registration and authentication.
- CRUD operations for tasks (Create, Read, Update, Delete).
- Task prioritization, status updates, and filtering.
- Secure authentication using cookies for user sessions.

## Features
- **User Authentication**:
  - **POST** `/auth/register` - Registers a new user.
  - **POST** `/auth/login` - Logs in a user.
  - **GET** `/auth/logout` - Logs out a user and clears the session.
  
- **Task Management**:
  - **GET** `/tasks` - Retrieves all tasks.
  - **POST** `/tasks` - Creates a new task.
  - **GET** `/tasks/:id` - Retrieves a specific task by ID.
  - **PUT** `/tasks/:id` - Updates a specific task.
  - **DELETE** `/tasks/:id` - Deletes a task.
  - **PATCH** `/tasks/:id/status` - Updates the status of a task (e.g., "Pending", "In Progress", "Completed").

## Technologies and Tools Used
- **Node.js** with **Express.js** for creating the server and API endpoints.
- **MongoDB** for storing task data and user information.
- **Mongoose** for interacting with MongoDB.
- **Cookie-parser** for handling session cookies.
- **bcryptjs** for hashing passwords securely.

## Setup Instructions
1. **Clone the repository**:
   If you would like to clone the repository, run the following command:
   ```bash
   git clone https://github.com/your-username/assignment2

# e-comerce-hahn-pro

Technical Test - CRUD Application Development (Java + React)

Full-Stack E-Commerce Application (Spring Boot + React)
This is a complete full-stack application built to demonstrate a modern, professional web development workflow. It features a Java/Spring Boot backend, a React frontend, a PostgreSQL database, and is fully containerized with Docker for easy setup and deployment.

Core Features
Backend: Secure REST API with JWT authentication and role-based access control (USER/ADMIN).

Frontend: Responsive UI built with React, Vite, and Tailwind CSS, featuring a product catalog, user authentication, and a shopping cart/order system.

Database: Relational data persistence using PostgreSQL, automatically seeded with demo data on startup.

Containerization: The entire application stack (Frontend Server, Backend API, Database) is managed by Docker Compose for one-command setup.

Swagger API Documentation: Live, interactive API documentation is provided via Swagger UI using this link: http://localhost:8080/swagger-ui/index.html.

Project Structure
The repository is organized into two main folders, with the main docker-compose.yml file at the root:

/backend: Contains the Spring Boot application source code.

/frontend: Contains the React application source code.

Getting Started: Running the Full Application
This guide provides the steps to build and run the entire full-stack application using Docker. This is the recommended method.

Prerequisites
Docker and Docker Compose installed and running on your machine.

Java 17 and Gradle (for building the backend).

Node.js and npm (for building the frontend).

Step-by-Step Instructions
Important: These commands must be run from the root directory of the project (e-comerce-hahn-pro/).

Step 1: Build the Backend Application

First, clone the repository

git clone https://github.com/oumaima-ben/hahn-software-technical-test
cd hahn-software-technical-test

	
Next, we need to compile the Java code and create the executable .jar file that the backend's Docker image requires.

# Navigate into the backend directory from the project root
cd backend

# Run the Gradle build command
./gradlew bootJar

# Navigate back to the root directory
cd ..

This command creates a build/libs/ folder inside your backend directory containing the application JAR file.

Step 2: Build the Frontend Application

Next, we need to build the optimized static files for the React application, which the frontend's Docker image requires.

# Navigate into the frontend directory from the project root
cd frontend

# Install dependencies (only needed once per project setup)
npm install

# Run the React build command
npm run build

# Navigate back to the root directory
cd ..

This command creates a dist/ folder inside your frontend directory containing the final HTML, CSS, and JS files.

Step 3: Launch Everything with Docker Compose

Now that both the backend and frontend artifacts have been built, you can start the entire application stack with a single command from the project root.

docker-compose up --build

up: Starts all services defined in docker-compose.yml.

--build: Forces Docker to build fresh images for your frontend and backend using the artifacts you just created in steps 1 and 2.

Docker Compose will now start the database, backend, and frontend containers.

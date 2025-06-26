# e-comerce-hahn-pro

Technical Test - CRUD Application Development (Java + React)

This repository contains the complete backend for a simple e-commerce application. It is built with Java, Spring Boot, and PostgreSQL, and it is fully containerized with Docker. The API provides endpoints for user authentication, product management, and order processing, with role-based access control.

## Key Features

- **Secure Authentication**: JWT-based authentication for stateless and secure API access.
- **Role-Based Access Control (RBAC)**: Differentiated permissions for regular `USER`s and `ADMIN`s.
- **RESTful API**: A clean, well-structured API for managing users, products, and orders.
- **Data Persistence**: Uses Spring Data JPA and Hibernate with a PostgreSQL database.
- **Containerized**: Fully containerized with Docker and Docker Compose for easy setup and deployment.
- **Live API Documentation**: Integrated with Swagger (OpenAPI 3) for interactive API exploration and testing.
- **Demo Data**: Includes an SQL script to automatically seed the database with sample users and products.

---

## Tech Stack

- **Backend**: Java 17, Spring Boot 3, Spring Security, Spring Data JPA
- **Database**: PostgreSQL
- **Build Tool**: Gradle
- **Containerization**: Docker, Docker Compose
- **API Documentation**: SpringDoc OpenAPI (Swagger)

---

## Getting Started

You can run this project in two ways: using Docker (recommended for ease of use) or locally with a manual database setup.

### Option 1: Running with Docker (Recommended)

This is the simplest way to get the entire application stack (app + database) running.

**Prerequisites:**

- Docker and Docker Compose installed and running.
- Java 17 & Gradle (only for building the initial JAR file).

**Steps:**

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Build the application JAR:**
    This command compiles your code into an executable file that Docker can use.

    ```bash
    ./gradlew bootJar
    ```

3.  **Launch the application stack:**
    This single command will build the app image, start the database container, and start the application container.
    ```bash
    docker-compose up --build
    ```

The API will be available at `http://localhost:8080`.

### Option 2: Running Locally (Manual Setup)

Use this method if you want to run the application directly from your IDE without Docker.

**Prerequisites:**

- Java 17 & Gradle
- A PostgreSQL server running locally.

**Steps:**

1.  **Create a database:** In your local PostgreSQL server, create a new database named `ats`.
2.  **Configure the application:** Open `src/main/resources/application.yml` and ensure the `datasource` properties match your local database credentials.
3.  **Run the application:** You can run the main class from your IDE (like IntelliJ)

The API will be available at `http://localhost:8080`.

---

## API Documentation (Swagger UI)

This project includes live, interactive API documentation. Once the application is running, you can access it at:

**[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

### How to Use Swagger for Testing

1.  **Explore Endpoints**: The UI lists all available endpoints, categorized by their controller (`Authentication`, `Products`, `Orders`).
2.  **Authenticate**:
    - At the top right, click the **Authorize** button.
    - First, get a token by using the `/api/auth/signin` endpoint. Provide the credentials for one of the demo users (e.g., `admin@example.com` or `john.doe@example.com` with password `password123`).
    - Copy the `token` value from the response.
    - Go back to the **Authorize** dialog, paste the token into the `Value` field, and click **Authorize**. You are now authenticated for all subsequent requests made from the UI.
3.  **Test Endpoints**:
    - Click on any endpoint to expand it.
    - Click **Try it out**.
    - Fill in any required parameters (like an ID or a request body).
    - Click **Execute**.

You will see the full request, the response code, and the response body directly in your browser.

### Demo Users

The `data.sql` script creates the following users. The password for both is `password123`.

- **Admin User**:
  - **Email**: `admin@example.com`
  - **Role**: `ADMIN` (can access all endpoints, including creating/deleting products)
- **Normal User**:
  - **Email**: `john.doe@example.com`
  - **Role**: `USER` (can view products and manage their own orders)

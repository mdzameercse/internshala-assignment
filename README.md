📌 Intershala Backend Developer Assignment

Built by: Md Zameer

This project is developed as part of the Backend Developer Internship Assignment.
It includes a fully working Spring Boot backend with JWT authentication and a React frontend to interact with the APIs.

🚀 Tech Stack
Backend

Spring Boot 3

Spring Security + JWT

Spring Data JPA

MySQL

Swagger (SpringDoc)

Frontend

React 18

Vite

Fetch API

🧩 Features Implemented
✔ Authentication

User Registration

User Login

Password hashing using BCrypt

JWT Token generation

Role-based access (USER, ADMIN)

✔ CRUD Module (Notes)

Create Note

Update Note

Delete Note

Get All Notes (only logged-in user can see their notes)

✔ Security

Stateless JWT authentication

Protected routes

Spring Security filter chain

Per-user note access restrictions

✔ Versioning

All APIs are placed under:

/api/v1

✔ API Documentation

Swagger available at:

http://localhost:8080/swagger-ui.html

🗂️ Project Structure
backend/
 └── src/main/java/com/zameer/assignment
      ├── auth
      ├── note
      ├── security
      ├── user
      └── AssignmentBackendApplication.java

frontend/
 └── src
      ├── App.jsx
      ├── api.js
      └── styles.css

🧪 API Testing (Postman)

Postman collection included in the repo:

Intershala-Postman-Collection.json


Import it into Postman → set variable:

token = <JWT-token-from-login>

🛠️ How to Run
Backend
cd backend
mvn spring-boot:run


Runs on:

http://localhost:8080

Frontend
cd frontend
npm install
npm run dev


Runs on:

http://localhost:5173

📈 Scalability Notes

Stateless JWT makes horizontal scaling easy

Can be separated into microservices (auth-service, notes-service)

MySQL can scale via master–slave replication

Redis caching can reduce DB reads

Docker + Load Balancer (NGINX) supports large traffic

🔐 Security Notes

Passwords hashed with BCrypt

JWT-based authentication ensures stateless sessions

Role-based authorization for protected resources

Input validation to prevent invalid/malicious requests

No sensitive data stored in frontend localStorage except token

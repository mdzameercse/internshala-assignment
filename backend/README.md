# Backend Assignment

This is a simple Spring Boot backend for the Intershala assignment.

Stack:
- Spring Boot 3
- Spring Security with JWT
- MySQL with Spring Data JPA
- REST API with versioning under /api/v1
- Swagger UI at /swagger-ui.html

Main features:
- User registration and login with hashed passwords
- JWT based authentication
- Role based access (USER and ADMIN)
- CRUD API for notes entity
- Basic validation and error responses

How to run:
1. Start MySQL and create a database named `assignment` or let Spring create it.
2. Update username and password in `src/main/resources/application.properties`.
3. Run `mvn spring-boot:run` inside the backend folder.
4. Open Swagger UI at http://localhost:8080/swagger-ui.html to test APIs.

API overview:
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/notes
- POST /api/v1/notes
- PUT /api/v1/notes/{id}
- DELETE /api/v1/notes/{id}

For scalability:
- The project is split into packages for auth, user, note, and security.
- In future it can be split into microservices, and we can add caching, logging, and API gateway.

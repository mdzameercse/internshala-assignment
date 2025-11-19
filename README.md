# Intershala Backend Developer Assignment

Scalability Note
The backend uses a modular structure (auth, user, notes, security) making it suitable for microservices.
JWT makes the system stateless, allowing horizontal scaling with load balancers.
MySQL can be upgraded with read replicas and master–slave architecture.
Redis caching can be used to reduce DB load.
Docker containers can be deployed across multiple nodes for high availability.

Security Note
Passwords are stored using BCrypt hashing.
JWT token authentication ensures secure, stateless sessions.
Role-based access control (USER, ADMIN).
Input validation prevents SQL injection and malformed requests.

# Users API

This document describes the /users/register and /users/login endpoints.

---

# /users/register

Registers a new user.

## Endpoint
- Method: POST  
- URL: /users/register

## Description
Creates a new user account. On success returns a JWT token and the created user (password is excluded).

## Headers
- Content-Type: application/json

## Request body (JSON)
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string" // optional
  },
  "email": "user@example.com",
  "password": "string"
}
```

## Validation rules
- fullname.firstname: required, minimum 3 characters
- fullname.lastname: optional, if present should be minimum 3 characters
- email: required, must be a valid email
- password: required, minimum 6 characters

## Status codes
- 201 Created — user created successfully  
  Response body: `{ "token": "<jwt>", "user": { ...userWithoutPassword } }`
- 400 Bad Request — validation failed  
  Response body: `{ "errors": [{ "msg": "error message", "param": "field", ... }] }`
- 409 Conflict — email already in use (duplicate key error)  
- 500 Internal Server Error — unexpected server error

## Example (curl)
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "password": "hunter2"
  }'
```

---

# /users/login

Authenticates an existing user.

## Endpoint
- Method: POST  
- URL: /users/login

## Description
Validates credentials and returns a JWT token and user object (password excluded). The server compares the provided password with the stored hashed password.

## Headers
- Content-Type: application/json

## Request body (JSON)
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

## Validation rules
- email: required, must be a valid email
- password: required, minimum 6 characters

## Status codes
- 200 OK — authentication successful  
  Response body: `{ "token": "<jwt>", "user": { ...userWithoutPassword } }`
- 400 Bad Request — validation failed  
  Response body: `{ "errors": [{ "msg": "error message", "param": "field", ... }] }`
- 401 Unauthorized — invalid email or password  
  Response body: `{ "message": "Invalid email or password" }`
- 500 Internal Server Error — unexpected server error

## Example (curl)
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "hunter2"
  }'
```

## Successful response example (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f0c1a2...",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

---

# /users/profile

Retrieves the authenticated user's profile.

## Endpoint
- Method: GET
- URL: /users/profile

## Description
Fetches the profile information of the currently logged-in user. This is a protected route and requires a valid JWT.

## Headers
- Authorization: Bearer `<jwt_token>` (if not using cookies)

## Cookies
- `token=<jwt_token>` (if using cookies)

## Status codes
- 200 OK — successfully retrieved profile
  Response body: `{ ...userObject }`
- 401 Unauthorized — token is missing, invalid, or blacklisted

## Example (curl with header)
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <jwt_token>"
```

## Successful response example (200)
```json
{
    "_id": "64f0c1a2...",
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "socketId": null,
    "__v": 0
}
```

---

# /users/logout

Logs out the authenticated user.

## Endpoint
- Method: GET
- URL: /users/logout

## Description
Invalidates the user's current session by blacklisting their JWT. The token will no longer be valid for accessing protected routes.

## Headers
- Authorization: Bearer `<jwt_token>` (if not using cookies)

## Cookies
- `token=<jwt_token>` (if using cookies)

## Status codes
- 200 OK — successfully logged out
  Response body: `{ "message": "Logged out" }`
- 401 Unauthorized — token is missing, invalid, or blacklisted

## Example (curl with header)
```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

# Examples — full flow

1) Register a new user (creates account and returns token)

Request:
```bash
curl -i -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Bob", "lastname": "Jones" },
    "email": "bob@example.com",
    "password": "securePass123"
  }'
```

Expected success response (201):
```json
{
  "token": "<jwt_token_here>",
  "user": {
    "_id": "64fabc123...",
    "fullname": { "firstname": "Bob", "lastname": "Jones" },
    "email": "bob@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

2) Login with the created user (returns token and user)

Request:
```bash
curl -i -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "bob@example.com",
    "password": "securePass123"
  }'
```

Expected success response (200):
```json
{
  "token": "<jwt_token_here>",
  "user": {
    "_id": "64fabc123...",
    "fullname": { "firstname": "Bob", "lastname": "Jones" },
    "email": "bob@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

3) Example error responses

Validation error (400):
```json
{
  "errors": [
    { "msg": "invalid email", "param": "email", "location": "body" },
    { "msg": "Password must be 6 characters", "param": "password", "location": "body" }
  ]
}
```

Auth error (401):
```json
{ "message": "Invalid email or password" }
```


Notes
- Ensure env vars (e.g. JWT_SECRET, MONGO_URI, DB_NAME) are set before running the server.
- Passwords are hashed before storage; the API does not return the password field.

---

# Captain API

This document describes the /captain/login, /captain/profile and /captain/logout endpoints.

---

# /captain/login

Authenticates an existing captain.

## Endpoint
- Method: POST
- URL: /captain/login

## Description
Validates credentials and returns a JWT token and captain object (password excluded). The server compares the provided password with the stored hashed password.

## Headers
- Content-Type: application/json

## Request body (JSON)
```json
{
  "email": "captain@example.com",
  "password": "string"
}
```

## Validation rules
- email: required, must be a valid email
- password: required, minimum 6 characters

## Status codes
- 200 OK — authentication successful
  Response body: `{ "token": "<jwt>", "captain": { ...captainObject } }`
- 400 Bad Request — validation failed
  Response body: `{ "errors": [{ "msg": "error message", "param": "field", ... }] }`
- 401 Unauthorized — invalid email or password
  Response body: `{ "message": "Invalid email or password" }`
- 500 Internal Server Error — unexpected server error

## Example (curl)
```bash
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "captain@example.com",
    "password": "securePassword123"
  }'
```

---

# /captain/profile

Retrieves the authenticated captain's profile.

## Endpoint
- Method: GET
- URL: /captain/profile

## Description
Fetches the profile information of the currently logged-in captain. This is a protected route and requires a valid JWT.

## Headers
- Authorization: Bearer `<jwt_token>` (if not using cookies)

## Cookies
- `token=<jwt_token>` (if using cookies)

## Status codes
- 200 OK — successfully retrieved profile
  Response body: `{ "captain": { ...captainObject } }`
- 401 Unauthorized — token is missing, invalid, or blacklisted

## Example (curl with header)
```bash
curl -X GET http://localhost:3000/captain/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

# /captain/logout

Logs out the authenticated captain.

## Endpoint
- Method: GET
- URL: /captain/logout

## Description
Invalidates the captain's current session by blacklisting their JWT. The token will no longer be valid for accessing protected routes.

## Headers
- Authorization: Bearer `<jwt_token>` (if not using cookies)

## Cookies
- `token=<jwt_token>` (if using cookies)

## Status codes
- 200 OK — successfully logged out
  Response body: `{ "message": "logout successfully" }`
- 401 Unauthorized — token is missing, invalid, or blacklisted

## Example (curl with header)
```bash
curl -X GET http://localhost:3000/captain/logout \
  -H "Authorization: Bearer <jwt_token>"
```
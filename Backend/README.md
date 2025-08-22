# Users API — /users/register

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
- fullname.lastname: optional, if present should be minimum 3 characters (not enforced by route validation currently)
- email: required, must be a valid email
- password: required, minimum 6 characters

## Status codes
- 201 Created — user created successfully  
  Response body: `{ "token": "<jwt>", "user": { ...userWithoutPassword } }`
- 400 Bad Request — validation failed  
  Response body: `{ "errors": [{ "msg": "error message", "param": "field", ... }] }`
- 409 Conflict — email already in use (duplicate key error)  
- 500 Internal Server Error — unexpected server error

## Examples

Request (curl):
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alice", "lastname": "Smith" },
    "email": "alice@example.com",
    "password": "hunter2"
  }'
```

Successful response (201):
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

Validation error (400):
```json
{
  "errors": [
    { "msg": "invalid email", "param": "email", "location": "body" },
    { "msg": "first name must by atleast 3 characters", "param": "fullname.firstname", "location": "body" }
  ]
}
```

Notes
- Ensure env vars (e.g. JWT_SECRET, MONGO_URI, DB_NAME) are set before running the server.
- Passwords are hashed before storage; the API does not return the password field.
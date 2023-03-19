# Express Backend for Photo Library

This is a Node.js backend application built with Express.js for a photo library. The backend provides endpoints for user authentication and photo management.

## Getting Started

1. Clone the repository to your local machine.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory of the project, and add the following environment variables:

```
PORT=3000
DB_URL=<database_url>
JWT_SECRET=<jwt_secret>
```

4. Run `npm run dev` to start the server.

## API Endpoints

### User Authentication

#### POST /login

This endpoint is used to authenticate a user.

### User Management

#### GET /app/users

This endpoint is used to retrieve all users, with pagination options "page" && "rowsPerPage"

### Photo Management

#### GET /app/photos

This endpoint is used to retrieve all photos, with pagination query param "page" && "rowsPerPage"

Both user and photo api protected by authentication
##### Request Headers
```
{
"Authorization": "Bearer <access_token>"
}
```

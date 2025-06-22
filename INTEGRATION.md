# Aureole E-commerce Application Integration

This document outlines how the Aureole frontend and backend systems are integrated.

## System Architecture

```
┌─────────────────┐           ┌─────────────────┐
│                 │           │                 │
│  React Frontend │ ◄────────►│ Express Backend │ ◄────► MongoDB
│  (Port 3000)    │    API    │  (Port 5001)    │
│                 │  Requests │                 │
└─────────────────┘           └─────────────────┘
```

## Integration Points

### 1. API Communication

The React frontend communicates with the Express backend using RESTful API calls. This is facilitated by:

- **Proxy Configuration**: The frontend's package.json includes a proxy setting to route API requests to the backend
  ```json
  "proxy": "http://localhost:5001"
  ```

- **API Service**: A centralized API service (`src/services/api.ts`) manages all HTTP requests using axios

- **CORS Configuration**: The backend is configured to accept cross-origin requests from the frontend

### 2. Authentication Flow

1. User submits login/register form
2. Frontend sends credentials to `/api/users/login` or `/api/users` endpoint
3. Backend validates credentials and returns a JWT token
4. Frontend stores token in localStorage and includes it in subsequent API requests
5. Protected routes/resources check for valid token

### 3. Data Management

- **Products**: Frontend fetches product data from `/api/products` endpoint
- **User Profile**: User profile data is fetched from `/api/users/profile` (protected endpoint)
- **Orders**: Order processing is handled via `/api/orders` endpoints

## Fallback Mechanism

For development purposes, the frontend includes fallback mechanisms to use mock data when:
1. The backend server is unavailable
2. MongoDB connection fails

## Development Setup

To run the full stack application locally:

1. Start MongoDB (or ensure MongoDB connection string is configured to a remote database)
2. Start the backend server (Port 5001):
   ```
   cd /Users/vedantagnihotri/Desktop/Aureol/aureole-backend
   npm run dev
   ```

3. Start the frontend application (Port 3000):
   ```
   cd /Users/vedantagnihotri/Desktop/Aureol/aureole-website
   npm start
   ```

4. Access the application at http://localhost:3000

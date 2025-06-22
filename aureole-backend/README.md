# Aureole Backend API

Backend API for the Aureole e-commerce website.

## Features

- User authentication and authorization
- Product management
- RESTful API design
- MongoDB database
- Express framework
- TypeScript

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/aureole
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Users

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a product by ID
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

## Build

To build the application for production:

```
npm run build
```

## Deployment

To run the production build:

```
npm start
```

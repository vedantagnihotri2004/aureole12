# Aureole - Luxury Candle E-commerce Platform

![Aureole Logo](https://placehold.co/600x200/e9d9c8/333333?text=Auréole+Candles)

## Overview

Aureole is a full-stack e-commerce platform specialized in luxury candles and home fragrances. It features a modern React frontend with a Node.js/Express backend, providing a seamless shopping experience with user authentication, product browsing, cart management, and secure checkout.

## Features

### 🛒 Customer Features
- **User Authentication**: Secure sign-up, login, and profile management
- **Product Catalog**: Browse through a curated collection of luxury candles
- **Shopping Cart**: Add/remove items, adjust quantities, and save for later
- **Wishlist**: Save favorite products for future reference
- **Secure Checkout**: Streamlined purchase process with shipping options
- **Order History**: Track previous orders and reorder items

### ⚙️ Technical Features
- **Responsive Design**: Optimized for desktop and mobile devices
- **State Management**: Redux for predictable state handling
- **API Integration**: RESTful API communication between frontend and backend
- **Database**: MongoDB for data persistence
- **JWT Authentication**: Secure user sessions with token-based auth
- **Error Handling**: Graceful error management with fallback options

## Architecture

The application is structured with a clear separation of concerns:

```
┌─────────────────┐           ┌─────────────────┐
│                 │           │                 │
│  React Frontend │ ◄────────►│ Express Backend │ ◄────► MongoDB
│  (Port 3000)    │    API    │  (Port 5001)    │
│                 │  Requests │                 │
└─────────────────┘           └─────────────────┘
```

## Technologies

### Frontend
- React 18+
- TypeScript
- Redux Toolkit
- Styled Components
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedantagnihotri2004/aureole12.git
   cd aureole
   ```

2. **Install dependencies for frontend and backend**
   ```bash
   # Install backend dependencies
   cd aureole-backend
   npm install
   
   # Install frontend dependencies
   cd ../aureole-website
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/aureole
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the development servers**

   One-command startup:
   ```bash
   # From the root directory
   ./start-dev.sh
   ```
   
   Or start each separately:
   ```bash
   # Start backend server
   cd aureole-backend
   npm run dev
   
   # In another terminal, start frontend
   cd aureole-website
   npm start
   ```

5. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5001](http://localhost:5001)

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users` - Register new user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Project Structure

```
aureole/
├── aureole-backend/          # Backend API
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   └── utils/            # Helper functions
│   └── package.json
│
├── aureole-website/          # Frontend React app
│   ├── public/               # Static files
│   ├── src/
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/       # Reusable components
│   │   ├── data/             # Mock data (fallback)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── slices/           # Redux slices
│   │   ├── store/            # Redux store
│   │   ├── types/            # TypeScript interfaces
│   │   └── App.tsx           # Main component
│   └── package.json
│
├── INTEGRATION.md            # Integration documentation
├── start-dev.sh              # Development startup script
└── README.md                 # This file
```

## Deployment

### Frontend
The React frontend can be deployed to services like:
- Vercel
- Netlify
- AWS S3 + CloudFront

### Backend
The Node.js backend can be deployed to:
- Heroku
- AWS Elastic Beanstalk
- Digital Ocean
- Railway

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Vedant Agnihotri - [Github](https://github.com/vedantagnihotri2004)

Project Link: [https://github.com/vedantagnihotri2004/aureole12](https://github.com/vedantagnihotri2004/aureole12)

---

Made with ♥ by Vedant Agnihotri


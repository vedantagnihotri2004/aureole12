import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';

dotenv.config();

// Create Express app
const app: Express = express();

// Connect to MongoDB (if available)
connectDB().catch((err) => {
  console.warn('MongoDB connection failed. Running in API-only mode.');
  console.warn(`Reason: ${err.message}`);
});

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true // Allow cookies if needed for session management
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 5001; // Changed to port 5001 to avoid conflicts

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

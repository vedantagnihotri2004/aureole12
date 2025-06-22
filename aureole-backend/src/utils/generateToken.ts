
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const generateToken = (id: string | Types.ObjectId | unknown): string => {
  // Creating a simple JWT token
  const token = jwt.sign(
    { id },
    process.env.JWT_SECRET || 'aureole_jwt_secret'
  );
  
  return token;
};

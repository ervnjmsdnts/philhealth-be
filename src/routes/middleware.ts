import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'secret';

// Authentication middleware to protect routes
// Verifies the JWT token in the Authorization header
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization; // Get the Authorization header from the request

  // Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  // Extract the token from the Authorization header ("Bearer <token>")
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach the decoded user information to req.user for access in subsequent middleware or route handlers
    next(); // Call the next middleware or route handler if token is valid
  } catch (error) {
    // Handle invalid or expired token
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }
};

export default authMiddleware;

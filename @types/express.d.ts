import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can replace `any` with a more specific type for your user if you have one, e.g., `User`
    }
  }
}

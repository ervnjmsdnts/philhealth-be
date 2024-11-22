import { User } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import prisma from '../lib/prisma';

// Login Controller
// Handles user login by verifying credentials and returning a JWT token if successful
export const loginController = async (req: Request, res: Response) => {
  const { code, password }: User = req.body; // Extracts code and password from the request body

  try {
    // Finds the user in the database based on the unique 'code'
    const user = await prisma.user.findUnique({ where: { code } });

    // If user is not found, return a 400 status with a message
    if (!user) {
      res.status(400).send({ message: 'User not found' });
      return;
    }

    // Compares the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return a 401 status with a message
    if (!isPasswordValid) {
      res.status(401).send({ message: 'Invalid credentials' });
    }

    // Generates a JWT token with user information if login is successful
    const token = jwt.sign(
      { id: user.id, name: user.name, code: user.code },
      'secret',
    );

    // Creates a profile object with user data to send in the response
    const profile = { id: user.id, name: user.name, code: user.code };

    // Responds with the token and user profile information
    res.status(200).send({ token, profile });
    return;
  } catch (error) {
    // Catches any errors and returns a 500 status with the error message
    res
      .status(500)
      .send({ message: `loginControllee ERROR: ${(error as Error).message}` });
    return;
  }
};

// Register Controller
// Handles user registration by creating a new user if they do not already exist
export const registerController = async (req: Request, res: Response) => {
  const { code, name, password }: User = req.body; // Extracts code, name, and password from the request body

  try {
    // Checks if a user with the provided 'code' already exists
    const userExist = await prisma.user.findUnique({ where: { code } });

    // If user already exists, return a 400 status with a message
    if (userExist) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }
    // Hashes the provided password with a salt factor of 10 for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creates a new user record in the database with the hashed password
    await prisma.user.create({
      data: { code, name, password: hashedPassword },
    });
    // Responds with a success message and a 201 status
    res.status(201).send({ message: 'User created' });
    return;
  } catch (error) {
    // Catches any errors and returns a 500 status with the error message
    res.status(500).send({
      message: `registerController ERROR: ${(error as Error).message}`,
    });
  }
};

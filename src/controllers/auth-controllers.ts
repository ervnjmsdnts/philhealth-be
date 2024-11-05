import { User } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import prisma from '../lib/prisma';

export const loginController = async (req: Request, res: Response) => {
  const { code, password }: User = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { code } });

    if (!user) {
      res.status(400).send({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, code: user.code },
      'secret',
    );

    const profile = { id: user.id, name: user.name, code: user.code };

    res.status(200).send({ token, profile });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: `loginControllee ERROR: ${(error as Error).message}` });
    return;
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { code, name, password }: User = req.body;

  try {
    const userExist = await prisma.user.findUnique({ where: { code } });

    if (userExist) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { code, name, password: hashedPassword },
    });

    res.status(201).send({ message: 'User created' });
    return;
  } catch (error) {
    res.status(500).send({
      message: `registerController ERROR: ${(error as Error).message}`,
    });
  }
};

import { Request, Response } from 'express';

export const getFacilities = (req: Request, res: Response) => {
  res.status(200).json({ message: 'hi' });
  return;
};

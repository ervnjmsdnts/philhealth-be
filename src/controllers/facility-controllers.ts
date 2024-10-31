import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Facility } from '@prisma/client';

export const getFacilities = async (_req: Request, res: Response) => {
  try {
    const facilities = await prisma.facility.findMany();

    res.status(200).send(facilities);
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: `getFacilities ERROR: ${(error as Error).message}` });
    return;
  }
};

export const createFacility = async (req: Request, res: Response) => {
  const body: Facility = req.body;

  try {
    await prisma.facility.create({ data: { ...body } });
    res.status(200).send({ message: 'Facility created' });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: `createFacility ERROR: ${(error as Error).message}` });
    return;
  }
};

export const deleteFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const facilityId = Number(id);

    const facility = await prisma.facility.findUnique({
      where: { id: facilityId },
    });

    if (!facility) {
      res.status(400).send({ message: 'Facility does not exists' });
      return;
    }

    await prisma.facility.delete({ where: { id: facility.id } });

    res.status(200).send({ message: 'Facility deleted' });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: `deleteFacility ERROR: ${(error as Error).message}` });
    return;
  }
};

export const updateFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const body: Facility = req.body;

    const faciltyId = Number(id);

    const facility = await prisma.facility.findUnique({
      where: { id: faciltyId },
    });

    if (!facility) {
      res.status(400).send({ message: 'Facility does not exists' });
      return;
    }

    await prisma.facility.update({
      where: { id: facility.id },
      data: { ...body },
    });
    res.status(200).send({ message: 'Facility updated' });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: `updateFacility ERROR: ${(error as Error).message}` });
    return;
  }
};

import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { HealthCare } from '@prisma/client';

export const getHealthCareProfessional = async (
  _req: Request,
  res: Response,
) => {
  try {
    const healthCareProfessional = await prisma.healthCare.findMany();

    res.status(200).send(
      healthCareProfessional.map((item) => ({
        ...item,
        sendDate: Number(item?.sendDate?.toString()) ?? null,
        receivedDate: Number(item?.receivedDate?.toString()) ?? null,
        dateClaimed: Number(item?.dateClaimed?.toString()) ?? null,
      })),
    );
    return;
  } catch (error) {
    res.status(500).send({
      message: `getHealthCareProfessional ERROR: ${(error as Error).message}`,
    });
    return;
  }
};

export const createHealthCareProfessional = async (
  req: Request,
  res: Response,
) => {
  const body: HealthCare = req.body;

  try {
    await prisma.healthCare.create({ data: { ...body } });
    res.status(200).send({ message: 'Health care professional created' });
    return;
  } catch (error) {
    res.status(500).send({
      message: `createHealthCareProfessional ERROR: ${
        (error as Error).message
      }`,
    });
    return;
  }
};

export const deleteHealthCareProfessional = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const healthCareId = Number(id);

    const healthCareProfessional = await prisma.healthCare.findUnique({
      where: { id: healthCareId },
    });

    if (!healthCareProfessional) {
      res
        .status(400)
        .send({ message: 'Health care professional does not exists' });
      return;
    }

    await prisma.healthCare.delete({
      where: { id: healthCareProfessional.id },
    });

    res.status(200).send({ message: 'Health care professional deleted' });
    return;
  } catch (error) {
    res.status(500).send({
      message: `deleteHealthCareProfessional ERROR: ${
        (error as Error).message
      }`,
    });
    return;
  }
};

export const updateHealthCareProfessional = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const body: HealthCare = req.body;

    const healthCareId = Number(id);

    const healthCareProfessional = await prisma.healthCare.findUnique({
      where: { id: healthCareId },
    });

    if (!healthCareProfessional) {
      res
        .status(400)
        .send({ message: 'Health care professional does not exists' });
      return;
    }

    await prisma.healthCare.update({
      where: { id: healthCareProfessional.id },
      data: { ...body },
    });
    res.status(200).send({ message: 'Health care professional updated' });
    return;
  } catch (error) {
    res.status(500).send({
      message: `updateHealthCareProfessional ERROR: ${
        (error as Error).message
      }`,
    });
    return;
  }
};

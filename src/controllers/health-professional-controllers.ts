import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { HealthCare } from '@prisma/client';

// Controller to retrieve all health care professionals
// Fetches a list of health care professionals from the database and returns them in the response
export const getHealthCareProfessional = async (
  _req: Request,
  res: Response,
) => {
  try {
    // Fetch all health care professionals from the database
    const healthCareProfessional = await prisma.healthCare.findMany();

    // Map over each health care professional to ensure BigInt fields are converted to numbers for response
    res.status(200).send(
      healthCareProfessional.map((item) => ({
        ...item,
        sendDate: Number(item?.sendDate?.toString()) ?? null, // Convert sendDate to a number or null if undefined
        receivedDate: Number(item?.receivedDate?.toString()) ?? null, // Convert receivedDate to a number or null if undefined
        dateClaimed: Number(item?.dateClaimed?.toString()) ?? null, // Convert dateClaimed to a number or null if undefined
      })),
    );
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res.status(500).send({
      message: `getHealthCareProfessional ERROR: ${(error as Error).message}`,
    });
    return;
  }
};

// Controller to create a new health care professional
// Adds a new health care professional record to the database based on the request body
export const createHealthCareProfessional = async (
  req: Request,
  res: Response,
) => {
  const body: HealthCare = req.body; // Extracts the health care professional data from the request body

  try {
    // Creates a new health care professional record in the database
    await prisma.healthCare.create({ data: { ...body } });

    // Responds with a success message upon successful creation
    res.status(200).send({ message: 'Health care professional created' });
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res.status(500).send({
      message: `createHealthCareProfessional ERROR: ${
        (error as Error).message
      }`,
    });
    return;
  }
};

// Controller to delete a health care professional
// Deletes a health care professional record from the database based on the ID provided in the request parameters
export const deleteHealthCareProfessional = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params; // Gets the health care professional ID from the URL parameters

    const healthCareId = Number(id); // Converts the ID to a number for use in the query

    // Finds the health care professional by ID in the database to ensure it exists
    const healthCareProfessional = await prisma.healthCare.findUnique({
      where: { id: healthCareId },
    });

    // If the health care professional does not exist, return a 400 status with a message
    if (!healthCareProfessional) {
      res
        .status(400)
        .send({ message: 'Health care professional does not exist' });
      return;
    }

    // Deletes the health care professional from the database
    await prisma.healthCare.delete({
      where: { id: healthCareProfessional.id },
    });

    // Responds with a success message upon successful deletion
    res.status(200).send({ message: 'Health care professional deleted' });
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res.status(500).send({
      message: `deleteHealthCareProfessional ERROR: ${
        (error as Error).message
      }`,
    });
    return;
  }
};

// Controller to update an existing health care professional
// Updates a health care professional record in the database based on the ID and data provided
export const updateHealthCareProfessional = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params; // Gets the health care professional ID from the URL parameters
    const body: HealthCare = req.body; // Extracts the update data from the request body

    const healthCareId = Number(id); // Converts the ID to a number for use in the query

    // Finds the health care professional by ID in the database to ensure it exists
    const healthCareProfessional = await prisma.healthCare.findUnique({
      where: { id: healthCareId },
    });

    // If the health care professional does not exist, return a 400 status with a message
    if (!healthCareProfessional) {
      res
        .status(400)
        .send({ message: 'Health care professional does not exist' });
      return;
    }

    // Updates the health care professional record in the database with the new data
    await prisma.healthCare.update({
      where: { id: healthCareProfessional.id },
      data: { ...body },
    });

    // Responds with a success message upon successful update
    res.status(200).send({ message: 'Health care professional updated' });
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res.status(500).send({
      message: `updateHealthCareProfessional ERROR: ${
        (error as Error).message
      }`,
    });
    return;
  }
};

import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { Facility } from '@prisma/client';

// Controller to retrieve all facilities
// Fetches a list of facilities from the database and returns them in the response
export const getFacilities = async (_req: Request, res: Response) => {
  try {
    // Fetch all facilities from the database
    const facilities = await prisma.facility.findMany();

    // Map over each facility to ensure BigInt fields are converted to numbers for response
    res.status(200).send(
      facilities.map((item) => ({
        ...item,
        sendDate: Number(item?.sendDate?.toString()) ?? null, // Convert sendDate to a number or null if undefined
        receivedDate: Number(item?.receivedDate?.toString()) ?? null, // Convert receivedDate to a number or null if undefined
        dateClaimed: Number(item?.dateClaimed?.toString()) ?? null, // Convert dateClaimed to a number or null if undefined
      })),
    );
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res
      .status(500)
      .send({ message: `getFacilities ERROR: ${(error as Error).message}` });
    return;
  }
};

// Controller to create a new facility
// Adds a new facility record to the database based on the request body
export const createFacility = async (req: Request, res: Response) => {
  const body: Facility = req.body; // Extracts the facility data from the request body

  try {
    // Creates a new facility record in the database
    await prisma.facility.create({ data: { ...body } });

    // Responds with a success message upon successful creation
    res.status(200).send({ message: 'Facility created' });
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res
      .status(500)
      .send({ message: `createFacility ERROR: ${(error as Error).message}` });
    return;
  }
};

// Controller to delete a facility
// Deletes a facility record from the database based on the facility ID provided in the request parameters
export const deleteFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Gets the facility ID from the URL parameters

    const facilityId = Number(id); // Converts the ID to a number for use in the query

    // Finds the facility by ID in the database to ensure it exists
    const facility = await prisma.facility.findUnique({
      where: { id: facilityId },
    });

    // If the facility does not exist, return a 400 status with a message
    if (!facility) {
      res.status(400).send({ message: 'Facility does not exist' });
      return;
    }

    // Deletes the facility from the database
    await prisma.facility.delete({ where: { id: facility.id } });

    // Responds with a success message upon successful deletion
    res.status(200).send({ message: 'Facility deleted' });
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res
      .status(500)
      .send({ message: `deleteFacility ERROR: ${(error as Error).message}` });
    return;
  }
};

// Controller to update an existing facility
// Updates a facility record in the database based on the facility ID and data provided
export const updateFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Gets the facility ID from the URL parameters
    const body: Facility = req.body; // Extracts the update data from the request body

    const facilityId = Number(id); // Converts the ID to a number for use in the query

    // Finds the facility by ID in the database to ensure it exists
    const facility = await prisma.facility.findUnique({
      where: { id: facilityId },
    });

    // If the facility does not exist, return a 400 status with a message
    if (!facility) {
      res.status(400).send({ message: 'Facility does not exist' });
      return;
    }

    // Updates the facility record in the database with the new data
    await prisma.facility.update({
      where: { id: facility.id },
      data: { ...body },
    });

    // Responds with a success message upon successful update
    res.status(200).send({ message: 'Facility updated' });
    return;
  } catch (error) {
    // Handle errors and respond with a 500 status and the error message
    res
      .status(500)
      .send({ message: `updateFacility ERROR: ${(error as Error).message}` });
    return;
  }
};

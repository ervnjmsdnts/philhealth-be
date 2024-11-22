import 'dotenv/config'; // Loads environment variables from a .env file into process.env
import express from 'express'; // Imports the Express framework for creating a web server
import cors from 'cors'; // Imports CORS middleware to enable Cross-Origin Resource Sharing

// Importing route handlers for authentication, facility, and health professional routes
import { authRoutes, facilityRoutes, healthProfessionalRoutes } from './routes';

const app = express(); // Initializes an Express application

app.use(cors()); // Enables CORS for all routes to allow cross-origin requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies (form submissions)
app.use(express.json()); // Parses incoming JSON requests

const PORT = process.env.PORT || 8000; // Sets the server's port, defaulting to 8000 if not defined in environment variables

// Route handlers
app.use('/api/facility', facilityRoutes); // Routes for facility-related endpoints under /api/facility
app.use('/api/health-professional', healthProfessionalRoutes); // Routes for health professional-related endpoints under /api/health-professional
app.use('/api/auth', authRoutes); // Routes for authentication-related endpoints under /api/auth

// Starts the server, listening on the specified port
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`); // Logs a message indicating the server is running
});

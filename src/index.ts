import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { authRoutes, facilityRoutes, healthProfessionalRoutes } from './routes';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/api/facility', facilityRoutes);
app.use('/api/health-professional', healthProfessionalRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

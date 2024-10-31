import { Router } from 'express';
import authMiddleware from './middleware';
import {
  createHealthCareProfessional,
  deleteHealthCareProfessional,
  getHealthCareProfessional,
  updateHealthCareProfessional,
} from '../controllers/health-professional-controllers';

const router = Router();

router.get('/', authMiddleware, getHealthCareProfessional);
router.post('/', authMiddleware, createHealthCareProfessional);
router.put('/:id', authMiddleware, updateHealthCareProfessional);
router.delete('/:id', authMiddleware, deleteHealthCareProfessional);

export default router;

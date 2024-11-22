import { Router } from 'express';
import authMiddleware from './middleware';
import {
  createFacility,
  deleteFacility,
  getFacilities,
  updateFacility,
} from '../controllers/facility-controllers';

const router = Router();

router.get('/', authMiddleware, getFacilities);
router.post('/', authMiddleware, createFacility);
router.put('/:id', authMiddleware, updateFacility);
router.delete('/:id', authMiddleware, deleteFacility);

export default router;

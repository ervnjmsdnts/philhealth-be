import { Router } from 'express';
import authMiddleware from './middleware';
import { getFacilities } from '../controllers/facility-controllers';

const router = Router();

router.get('/', authMiddleware, getFacilities);
router.post('/');
router.put('/:id');
router.delete('/:id');

export default router;

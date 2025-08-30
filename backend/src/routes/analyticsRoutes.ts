import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
	getSummary,
	getSpendingByCategory,
	getSpendingTrends,
} from '../controllers/analyticsController';

const router = express.Router();

router.use(protect);

router.get('/summary', getSummary);
router.get('/categories', getSpendingByCategory);
router.get('/trends', getSpendingTrends);

export default router;

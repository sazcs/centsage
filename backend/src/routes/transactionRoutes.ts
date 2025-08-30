import express from 'express';
import {
	parseTransactionWithAI,
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
} from '../controllers/transactionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/parse', protect, parseTransactionWithAI);

router
	.route('/')
	.get(protect, getTransactions)
	.post(protect, createTransaction);

router
	.route('/:id')
	.put(protect, updateTransaction)
	.delete(protect, deleteTransaction);

export default router;

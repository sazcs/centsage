import express from 'express';
import {
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
} from '../controllers/transactionController';

const router = express.Router();

router.route('/').get(getTransactions).post(createTransaction);
router.route('/:id').put(updateTransaction).delete(deleteTransaction);

export default router;

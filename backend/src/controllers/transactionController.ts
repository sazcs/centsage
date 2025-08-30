import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

const getTransactions = async (req: Request, res: Response) => {
	try {
		const transactions = await Transaction.find().sort({ date: -1 });
		res.status(200).json(transactions);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const createTransaction = async (req: Request, res: Response) => {
	try {
		const { type, amount, category, description, date } = req.body;

		const newTransaction = new Transaction({
			type,
			amount,
			category,
			description,
			date,
		});

		const savedTransaction = await newTransaction.save();
		res.status(201).json(savedTransaction);
	} catch (error) {
		res.status(400).json({ message: 'Invalid data' });
	}
};

const updateTransaction = async (req: Request, res: Response) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({ message: 'Transaction not found' });
		}

		const updatedTransaction = await Transaction.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedTransaction);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const deleteTransaction = async (req: Request, res: Response) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({ message: 'Transaction not found' });
		}

		await transaction.deleteOne();
		res.status(200).json({ message: 'Transaction removed' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

export {
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};

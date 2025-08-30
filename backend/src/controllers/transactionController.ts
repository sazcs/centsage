import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { IUser } from '../models/User';

const getTransactions = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	try {
		const transactions = await Transaction.find({ user: user._id }).sort({
			date: -1,
		});
		res.status(200).json(transactions);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const createTransaction = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	const { type, amount, category, description, date } = req.body;
	try {
		const newTransaction = new Transaction({
			user: user._id,
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
	const user = (req as any).user as IUser;
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(404).json({ message: 'Transaction not found' });
		}
		if (transaction.user.toString() !== user._id.toString()) {
			return res.status(401).json({ message: 'User not authorized' });
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
	const user = (req as any).user as IUser;
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(404).json({ message: 'Transaction not found' });
		}
		if (transaction.user.toString() !== user._id.toString()) {
			return res.status(401).json({ message: 'User not authorized' });
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

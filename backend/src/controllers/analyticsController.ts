import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { IUser } from '../models/User';

const getSummary = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	try {
		const summary = await Transaction.aggregate([
			{ $match: { user: user._id } },
			{
				$group: {
					_id: '$type',
					total: { $sum: '$amount' },
				},
			},
		]);

		const income = summary.find((item) => item._id === 'income')?.total || 0;
		const expenses = summary.find((item) => item._id === 'expense')?.total || 0;
		const savings = income - expenses;

		res.status(200).json({ income, expenses, savings });
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const getSpendingByCategory = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	try {
		const categories = await Transaction.aggregate([
			{ $match: { user: user._id, type: 'expense' } },
			{
				$group: {
					_id: '$category',
					total: { $sum: '$amount' },
				},
			},
			{ $sort: { total: -1 } },
		]);

		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

const getSpendingTrends = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	try {
		const trends = await Transaction.aggregate([
			{ $match: { user: user._id, type: 'expense' } },
			{
				$group: {
					_id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
					total: { $sum: '$amount' },
				},
			},
			{ $sort: { _id: 1 } },
			{ $limit: 30 },
		]);

		res.status(200).json(trends);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

export { getSummary, getSpendingByCategory, getSpendingTrends };

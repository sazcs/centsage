import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { IUser } from '../models/User';

// Helper function to build the date query
const buildDateQuery = (startDate?: any, endDate?: any) => {
	const dateQuery: any = {};
	if (startDate) {
		dateQuery.$gte = new Date(startDate);
	}
	if (endDate) {
		// Set to the end of the day
		const end = new Date(endDate);
		end.setHours(23, 59, 59, 999);
		dateQuery.$lte = end;
	}
	return dateQuery;
};

const getSummary = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	const { startDate, endDate } = req.query;
	try {
		const dateQuery = buildDateQuery(startDate, endDate);
		const matchQuery: any = { user: user._id };
		if (startDate || endDate) {
			matchQuery.date = dateQuery;
		}

		const summary = await Transaction.aggregate([
			{ $match: matchQuery },
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
	const { startDate, endDate } = req.query;
	try {
		const dateQuery = buildDateQuery(startDate, endDate);
		const matchQuery: any = { user: user._id, type: 'expense' };
		if (startDate || endDate) {
			matchQuery.date = dateQuery;
		}

		const categories = await Transaction.aggregate([
			{ $match: matchQuery },
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
	const { startDate, endDate } = req.query;
	try {
		const dateQuery = buildDateQuery(startDate, endDate);
		const matchQuery: any = { user: user._id, type: 'expense' };
		if (startDate || endDate) {
			matchQuery.date = dateQuery;
		}

		const trends = await Transaction.aggregate([
			{ $match: matchQuery },
			{
				$group: {
					_id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
					total: { $sum: '$amount' },
				},
			},
			{ $sort: { _id: 1 } },
		]);

		res.status(200).json(trends);
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};

export { getSummary, getSpendingByCategory, getSpendingTrends };

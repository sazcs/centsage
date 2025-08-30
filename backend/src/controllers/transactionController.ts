import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { IUser } from '../models/User';
import axios from 'axios';

const parseTransactionWithAI = async (req: Request, res: Response) => {
	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ message: 'Text input is required' });
	}

	const today = new Date().toISOString().slice(0, 10);
	const prompt = `
      You are an expert financial assistant. Today's date is ${today}.
      Parse the following transaction text and return ONLY a valid JSON object with the keys: "amount", "description", "category", "type", and "date".
      
      RULES:
      - The "type" must be either "income" or "expense".
      - The "category" must be one of: Food, Gas, Groceries, Bills, Subscription, Shopping, Entertainment, Health, Transport, Salary, Other.
      - The "date" must be in YYYY-MM-DD format. If no specific date is mentioned, assume today's date.
      - If the text mentions a relative date like "yesterday", "last week", or "last month", calculate the correct date based on today's date.
      
      EXAMPLES (Today is ${today}):
      1. Text: "Coffee at Starbucks $6.50" -> JSON: {"amount": 6.50, "description": "Coffee at Starbucks", "category": "Food", "type": "expense", "date": "${today}"}
      2. Text: "Got paid $3500 salary today" -> JSON: {"amount": 3500, "description": "Salary", "category": "Salary", "type": "income", "date": "${today}"}
      3. Text: "Netflix subscription for last month $16" -> JSON: {"amount": 16, "description": "Netflix subscription", "category": "Subscription", "type": "expense", "date": "2025-07-30"}

      Now parse this text: "${text}"
    `;

	try {
		const response = await axios.post(
			'https://openrouter.ai/api/v1/chat/completions',
			{
				model: 'google/gemma-3n-e4b-it:free',
				messages: [{ role: 'user', content: prompt }],
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const rawResponseText = response.data.choices[0].message.content;
		const jsonStartIndex = rawResponseText.indexOf('{');
		const jsonEndIndex = rawResponseText.lastIndexOf('}');

		if (jsonStartIndex === -1 || jsonEndIndex === -1) {
			throw new Error('Could not find a valid JSON object in the AI response.');
		}

		const jsonString = rawResponseText.substring(
			jsonStartIndex,
			jsonEndIndex + 1
		);
		const parsedJson = JSON.parse(jsonString);

		res.status(200).json(parsedJson);
	} catch (error) {
		console.error('Error parsing with OpenRouter:', error);
		res.status(500).json({ message: 'Failed to parse transaction with AI' });
	}
};

const getTransactions = async (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	const { startDate, endDate } = req.query;

	try {
		const query: any = { user: user._id };

		if (startDate || endDate) {
			query.date = {};
			if (startDate) {
				query.date.$gte = new Date(startDate as string);
			}
			if (endDate) {
				const end = new Date(endDate as string);
				end.setHours(23, 59, 59, 999);
				query.date.$lte = end;
			}
		}

		const transactions = await Transaction.find(query).sort({ date: -1 });
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
	parseTransactionWithAI,
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};

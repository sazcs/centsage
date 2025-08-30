import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { IUser } from '../models/User';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const parseTransactionWithAI = async (req: Request, res: Response) => {
	const { text } = req.body;

	if (!text) {
		return res.status(400).json({ message: 'Text input is required' });
	}

	try {
		const today = new Date().toISOString().slice(0, 10);
		const prompt = `
      You are an expert financial assistant. Parse the following transaction text and return a JSON object with the keys: "amount", "description", "category", "type", and "date".
      The transaction "type" must be either "income" or "expense".
      The "category" should be one of the following: Food, Gas, Groceries, Bills, Subscription, Shopping, Entertainment, Health, Transport, Salary, Other.
      The "date" must be in YYYY-MM-DD format. If no date is mentioned, assume the date is ${today}.
      If any value cannot be determined, use null for that key.

      Example 1:
      Text: "Coffee at Starbucks $6.50"
      JSON: {"amount": 6.50, "description": "Coffee at Starbucks", "category": "Food", "type": "expense", "date": "${today}"}

      Example 2:
      Text: "Got paid $3500 salary today"
      JSON: {"amount": 3500, "description": "Salary", "category": "Salary", "type": "income", "date": "${today}"}

      Example 3:
      Text: "Netflix subscription $15.99 yesterday"
      JSON: {"amount": 15.99, "description": "Netflix subscription", "category": "Subscription", "type": "expense", "date": "2025-08-29"}

      Now parse the following text:
      Text: "${text}"
      JSON:
    `;

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
		console.error(error);
		res.status(500).json({ message: 'Failed to parse transaction with AI' });
	}
};

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
	parseTransactionWithAI,
	getTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};

import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
	user: mongoose.Schema.Types.ObjectId;
	type: 'income' | 'expense';
	amount: number;
	category: string;
	description: string;
	date: Date;
}

const TransactionSchema: Schema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: ['income', 'expense'],
			required: [true, 'Transaction type is required'],
		},
		amount: {
			type: Number,
			required: [true, 'Amount is required'],
			trim: true,
		},
		category: {
			type: String,
			required: [true, 'Category is required'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
			trim: true,
		},
		date: {
			type: Date,
			required: [true, 'Date is required'],
		},
	},
	{
		timestamps: true,
	}
);

const Transaction = mongoose.model<ITransaction>(
	'Transaction',
	TransactionSchema
);

export default Transaction;

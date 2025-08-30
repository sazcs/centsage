import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	_id: mongoose.Types.ObjectId;
	googleId: string;
	displayName: string;
	firstName: string;
	email: string;
	image?: string;
}

const UserSchema: Schema = new Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true,
		},
		displayName: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: '30d',
	});
};

const googleAuthCallback = (req: Request, res: Response) => {
	const user = req.user as IUser;
	if (user) {
		const token = generateToken(user.id);
		res.redirect(`http://localhost:5173?token=${token}`);
	} else {
		res.redirect(`http://localhost:5173/login/error`);
	}
};

const getUserProfile = (req: Request, res: Response) => {
	const user = (req as any).user as IUser;
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json({ message: 'User not found' });
	}
};

export { googleAuthCallback, getUserProfile };

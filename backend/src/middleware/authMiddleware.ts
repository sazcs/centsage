import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

interface JwtPayload {
	id: string;
}

export interface AuthenticatedRequest extends Request {
	user: IUser;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

			const user = await User.findById(decoded.id).select('-password');

			if (!user) {
				return res
					.status(401)
					.json({ message: 'Not authorized, user not found' });
			}

			(req as AuthenticatedRequest).user = user;
			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({ message: 'Not authorized, token failed' });
		}
	} else {
		res.status(401).json({ message: 'Not authorized, no token' });
	}
};

export { protect };

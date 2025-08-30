import express from 'express';
import passport from 'passport';
import {
	googleAuthCallback,
	getUserProfile,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login/error',
		session: false,
	}),
	googleAuthCallback
);

router.get('/profile', protect, getUserProfile);

export default router;

import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import connectDB from './config/db';
import transactionRoutes from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

dotenv.config();
import './config/passport';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
	res.send('CentSage API is running!');
});

app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

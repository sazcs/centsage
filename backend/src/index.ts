import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
	res.send('CentSage API is running!');
});

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

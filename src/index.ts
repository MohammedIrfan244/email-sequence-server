import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/dbConfig';
import { infoLogger } from './lib/utils/devLogger';
import authRoute from './routes/authRoute';
import leadRoute from './routes/leadRoute';
import templateRoute from './routes/tempRoute';
import flowRoute from './routes/flowRoute';
import globalErrorHandler from './middlewares/globalErrorHandler';
import './jobs/emailJob'; 
import { startAgenda } from './configs/agenda';

dotenv.config();

connectDB();
startAgenda()

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/lead', leadRoute);
app.use('/api/template', templateRoute);
app.use('/api/flow', flowRoute);


app.all('/{*any}', (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(globalErrorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  infoLogger(`Server is running on port ${PORT}`);
});

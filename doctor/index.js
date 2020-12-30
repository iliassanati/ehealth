import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use('/api/doctors', doctorRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000'.yellow.bold);
});

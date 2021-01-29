import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { natsWrapper } from './nats-wrapper.js';
import { DoctorCreatedListener } from './events/listeners/doctor-created-listener.js';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener.js';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener.js';

dotenv.config();

import rdvRoutes from './routes/rdvRoutes.js';

connectDB();

const app = express();

try {
  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    process.env.NATS_CLIENT_ID,
    process.env.NATS_URL
  );

  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());

  new DoctorCreatedListener(natsWrapper.client).listen();
  new ExpirationCompleteListener(natsWrapper.client).listen();
  new PaymentCreatedListener(natsWrapper.client).listen();
} catch (error) {
  console.error(error);
}

app.use(express.json());

app.use('/api/rdvs', rdvRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000'.yellow.bold);
});

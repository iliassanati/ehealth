import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { natsWrapper } from './nats-wrapper.js';
import { RdvCreatedListener } from './events/listeners/rdv-created-listener.js';
import { RdvUpdatedListener } from './events/listeners/rdv-updated-listener.js';

dotenv.config();

import paymentRoutes from './routes/paymentRoutes.js';

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

  new RdvCreatedListener(natsWrapper.client).listen();
  new RdvUpdatedListener(natsWrapper.client).listen();
} catch (error) {
  console.error(error);
}

app.use(express.json());

app.use('/api/payments', paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server running on port 3000'.yellow.bold);
});

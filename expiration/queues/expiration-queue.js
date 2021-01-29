import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher.js';
import { natsWrapper } from '../nats-wrapper.js';

const expirationQueue = new Queue('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async job => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    rdvId: job.data.rdvId,
  });
});
export { expirationQueue };

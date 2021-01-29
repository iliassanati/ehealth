import { natsWrapper } from './nats-wrapper.js';
import { RdvCreatedListener } from './events/listeners/rdv-created-listener.js';

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
} catch (err) {
  console.error(err);
}

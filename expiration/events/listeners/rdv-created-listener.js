import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import { expirationQueue } from '../../queues/expiration-queue.js';

export class RdvCreatedListener extends Listener {
  constructor() {
    super(...arguments);
    this.subject = Subjects.RdvCreated;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    console.log('Waiting this many milliseconds to process the job :', delay);

    await expirationQueue.add(
      {
        rdvId: data.id,
      },
      {
        delay,
      }
    );

    // ack the message
    msg.ack();
  }
}

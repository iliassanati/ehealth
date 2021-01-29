import { Listener } from './base-listener.js';
import { Subjects } from './subjects.js';

export class TicketCreatedListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.TicketCreated;

    this.queueGroupName = 'payments-service';
  }

  onMessage(data, msg) {
    console.log('Event data!', data);

    console.log(data.id);

    console.log(data.title);

    console.log(data.price);

    msg.ack();
  }
}

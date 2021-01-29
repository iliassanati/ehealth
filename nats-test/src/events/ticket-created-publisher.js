import { Publisher } from './base-publisher.js';
import { Subjects } from './subjects.js';

export class TicketCreatedPublisher extends Publisher {
  constructor() {
    super(...arguments);

    this.subject = Subjects.TicketCreated;
  }
}

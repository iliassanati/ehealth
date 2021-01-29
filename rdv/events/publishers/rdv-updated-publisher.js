import { Publisher } from '../base-publisher.js';
import { Subjects } from '../subjects.js';

export class RdvUpdatedPublisher extends Publisher {
  constructor() {
    super(...arguments);

    this.subject = Subjects.RdvUpdated;
  }
}

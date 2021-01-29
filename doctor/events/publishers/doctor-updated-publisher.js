import { Publisher } from '../base-publisher.js';
import { Subjects } from '../subjects.js';

export class DoctorUpdatedPublisher extends Publisher {
  constructor() {
    super(...arguments);

    this.subject = Subjects.DoctorUpdated;
  }
}

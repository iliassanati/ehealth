import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import Doctor from '../../models/doctorModel.js';

export class RdvCreatedListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.RdvCreated;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    const doctor = await Doctor.findById(data.doctorId);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // ack the message
    msg.ack();
  }
}

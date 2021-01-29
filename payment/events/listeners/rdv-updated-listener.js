import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import RDV from '../../models/rdvModel.js';

export class RdvUpdatedListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.RdvUpdated;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    const { id, isDelivered, deliveredAt } = data;

    const rdv = await RDV.findByIdAndUpdate(id, { isDelivered, deliveredAt });

    if (!rdv) {
      throw new Error('Rdv not found');
    }

    msg.ack();
  }
}

import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import RDV from '../../models/rdvModel.js';

export class PaymentCreatedListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.PaymentCreated;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    const { rdvId } = data;

    const rdv = await RDV.findById(rdvId);

    rdv.isPaid = true;
    rdv.paidAt = Date.now();

    await rdv.save();

    msg.ack();
  }
}

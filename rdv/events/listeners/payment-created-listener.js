import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import RDV from '../../models/rdvModel.js';
import { RdvStatus } from '../types/rdv-status.js';

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
    rdv.status = RdvStatus.Complete;

    await rdv.save();

    msg.ack();
  }
}

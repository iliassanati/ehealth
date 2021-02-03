import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import RDV from '../../models/rdvModel.js';

export class RdvCreatedListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.RdvCreated;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    const { id, userId, version, status, paymentMethod, totalPrice } = data;

    const rdv = RDV.build({
      id,
      userId,
      totalPrice,
      status,
      paymentMethod,
      version,
    });

    await rdv.save();

    msg.ack();
  }
}

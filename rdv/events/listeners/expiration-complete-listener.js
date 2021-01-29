import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import { RdvStatus } from '../types/rdv-status.js';
import RDV from '../../models/rdvModel.js';
import { RdvCancelledPublisher } from '../publishers/rdv-cancelled-publisher.js';

export class ExpirationCompleteListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.ExpirationComplete;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    console.log(data);

    const rdv = await RDV.findById(data.rdvId);

    if (!rdv) {
      throw new Error('Rdv not found');
    }

    if (rdv.status === RdvStatus.Complete) {
      return msg.ack();
    }

    rdv.set({ status: RdvStatus.Cancelled });

    await rdv.save();

    await new RdvCancelledPublisher(this.client).publish({
      id: rdv._id,
      version: rdv.version,
    });
    msg.ack();
  }
}

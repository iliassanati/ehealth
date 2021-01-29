import { Listener } from '../base-listener.js';
import { Subjects } from '../subjects.js';
import { queueGroupName } from './queue-group-name.js';
import Doctor from '../../models/doctorModel.js';

export class DoctorCreatedListener extends Listener {
  constructor() {
    super(...arguments);

    this.subject = Subjects.DoctorCreated;
    this.queueGroupName = queueGroupName;
  }

  async onMessage(data, msg) {
    const { id, nom, prenom, prixConsultation } = data;

    const doctor = Doctor.build({
      id,
      doctorNom: nom,
      doctorPrenom: prenom,
      prixConsultation,
    });

    await doctor.save();

    msg.ack();
  }
}

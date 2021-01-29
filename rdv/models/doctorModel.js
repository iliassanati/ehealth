import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const doctorSchema = mongoose.Schema({
  doctorNom: {
    type: String,
    required: true,
  },
  doctorPrenom: {
    type: String,
    required: true,
  },
  prixConsultation: {
    type: Number,
    default: 300,
  },
});

doctorSchema.set('versionKey', 'version');
doctorSchema.plugin(updateIfCurrentPlugin);

doctorSchema.statics.build = function (attrs) {
  return new Doctor({
    _id: attrs.id,
    doctorNom: attrs.doctorNom,
    doctorPrenom: attrs.doctorPrenom,
    prixConsultation: attrs.prixConsultation,
  });
};

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

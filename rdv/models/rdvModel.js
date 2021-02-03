import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { RdvStatus } from '../events/types/rdv-status.js';

const rdvSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userNom: {
      type: String,
      required: true,
    },
    userPrenom: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    doctorId: {
      type: String,
      ref: 'Doctor',
      required: true,
    },
    doctorNom: {
      type: String,
      required: true,
    },
    doctorPrenom: {
      type: String,
      required: true,
    },
    etatClient: {
      type: String,
      enum: [
        'Je suis un nouveau patient',
        'Je suis déjà patient de ce médecin',
      ],
      default: 'Je suis un nouveau patient',
    },
    typeConsultation: {
      type: String,
      enum: ['Consultation en presentiel', 'Teleconsultation'],
      required: true,
    },
    renseignementMedicaux: {
      type: String,
    },
    rdvPrix: {
      type: String,
      required: true,
    },
    rdvDate: {
      type: String,
      required: true,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(RdvStatus),
      default: RdvStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
  },
  { timestamps: true }
);

rdvSchema.set('versionKey', 'version');
rdvSchema.plugin(updateIfCurrentPlugin);

const RDV = mongoose.model('RDV', rdvSchema);

export default RDV;

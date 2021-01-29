import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const rdvSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
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
});

rdvSchema.set('versionKey', 'version');
rdvSchema.plugin(updateIfCurrentPlugin);

rdvSchema.statics.build = function (attrs) {
  return new RDV({
    _id: attrs.id,
    user: attrs.user,
    totalPrice: attrs.totalPrice,
    status: attrs.status,
    paymentMethod: attrs.paymentMethod,
    version: attrs.version,
  });
};

const RDV = mongoose.model('RDV', rdvSchema);

export default RDV;

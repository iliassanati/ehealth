import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
  rdvId: {
    required: true,
    type: String,
  },
  stripeId: {
    required: true,
    type: String,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

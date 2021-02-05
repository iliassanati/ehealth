import express from 'express';
import Payment from '../models/paymentModel.js';
import { auth } from '../middlewares/auth.js';
import asyncHandler from 'express-async-handler';
import { stripe } from '../stripe.js';
import RDV from '../models/rdvModel.js';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher.js';
import { natsWrapper } from '../nats-wrapper.js';
import { RdvStatus } from '../events/types/rdv-status.js';

const router = express.Router();

//@route POST api/payments
//@desc Pay for an order
//@access Private
router.post(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const { token, rdvId } = req.body;

    const rdv = await RDV.findById(rdvId);

    if (!rdv) {
      res.status(404);
      throw new Error('Rdv not found');
    }

    if (rdv.userId !== req.user._id) {
      res.status(404);
      throw new Error('Not Authorized');
    }

    if (rdv.status === RdvStatus.Cancelled) {
      res.status(404);
      throw new Error('Cannor pay for a cancelled rdv');
    }

    const charge = await stripe.charges.create({
      currency: 'mad',
      amount: rdv.totalPrice * 100,
      source: token,
    });

    const payment = new Payment({
      rdvId,
      stripeId: charge.id,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment._id,
      rdvId: payment.rdvId,
      stripeId: payment.stripeId,
    });

    res.status(201).json(payment);
  })
);

//@route    GET api/payments/
//@desc     Fetch all payments
//@access   Admin
router.get(
  '/',
 // admin,
  asyncHandler(async (req, res) => {
    const payments = await Payment.find();

    if (payments) {
      res.json(payments);
    } else {
      throw new Error('Not authorized');
    }
  })
);

export default router;

import express from 'express';
import RDV from '../models/rdvModel.js';
import Doctor from '../models/doctorModel.js';
import { auth } from '../middlewares/auth.js';
import asyncHandler from 'express-async-handler';
import { RdvCreatedPublisher } from '../events/publishers/rdv-created-publisher.js';
import { RdvCancelledPublisher } from '../events/publishers/rdv-cancelled-publisher.js';
import { RdvUpdatedPublisher } from '../events/publishers/rdv-updated-publisher.js';
import { natsWrapper } from '../nats-wrapper.js';
import { RdvStatus } from '../events/types/rdv-status.js';

const router = express.Router();

//@route    POST api/rdvs
//@desc     Create a new rdv
//@access   Private

router.post(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const {
      userNom,
      userPrenom,
      userPhone,
      doctorId,
      etatClient,
      typeConsultation,
      renseignementMedicaux,
      paymentMethod,
      rdvPrix,
      rdvDate,
      taxPrice,
      totalPrice,
    } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      res.status(404);
      throw new Error('Doctor not found');
    }

    // // Make sure that this rdv is not already reserved
    // const isReserved = await rdv.isReserved();
    // if (isReserved) {
    //   throw new Error('Rdv is already reserved');
    // }

    //Calculte the expiration date for the order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 1 * 60);

    const rdv = new RDV({
      userId: req.user._id,
      userNom,
      userPrenom,
      userPhone,
      doctorId: doctor._id,
      doctorNom: doctor.doctorNom,
      doctorPrenom: doctor.doctorPrenom,
      etatClient,
      typeConsultation,
      renseignementMedicaux,
      rdvPrix,
      rdvDate,
      taxPrice,
      totalPrice,
      paymentMethod,
      expiresAt: expiration,
    });

    const createdRdv = await rdv.save();

    if (createdRdv) {
      res.status(201).json(createdRdv);

      new RdvCreatedPublisher(natsWrapper.client).publish({
        id: rdv._id,
        userId: req.user._id,
        userNom,
        userPrenom,
        userPhone,
        doctorId: doctor._id,
        doctorNom: doctor.doctorNom,
        doctorPrenom: doctor.doctorPrenom,
        etatClient,
        typeConsultation,
        renseignementMedicaux,
        rdvPrix,
        rdvDate,
        taxPrice,
        totalPrice,
        paymentMethod,
        status: rdv.status,
        expiresAt: expiration.toISOString(),
      });
    } else {
      res.status(400);
      throw new Error('Invalid rdv data');
    }
  })
);

//@desc GET logged in user rdvs
//@route GET /api/rdvs/myrdvs
//@access Private
router.get(
  '/patient-rdvs',
  auth,
  asyncHandler(async (req, res) => {
    const rdvs = await RDV.find({ userId: req.user._id });
    res.json(rdvs);
  })
);

//@desc GET logged in doctor rdvs
//@route GET /api/rdvs/myrdvs
//@access Private
router.get(
  '/doctor-rdvs',
  auth,
  asyncHandler(async (req, res) => {
    const rdvs = await RDV.find({ doctorId: req.doctor._id });
    res.json(rdvs);
  })
);

//@route    GET api/rdvs/:id
//@desc     Fetch rdv details
//@access   Private
router.get(
  '/:id',
  auth,
  asyncHandler(async (req, res) => {
    const rdv = await RDV.findById(req.params.id);

    if (rdv) {
      res.json(rdv);
    } else {
      res.status(404);
      throw new Error('Rdv not Found');
    }
  })
);

//@desc Update rdv to delivered
//@route GET /api/rdvs/:id/deliver
//@access Private

router.put(
  '/:id/deliver',
  auth,
  asyncHandler(async (req, res) => {
    const rdv = await RDV.findById(req.params.id);

    if (!rdv) {
      res.status(404);
      throw Error('Not Found');
    }

    rdv.isDelivered = true;
    rdv.deliveredAt = Date.now();

    await rdv.save();

    new RdvUpdatedPublisher(natsWrapper.client).publish({
      id: rdv._id,
      isDelivered: rdv.isDelivered,
      deliveredAt: rdv.deliveredAt,
    });

    res.json(rdv);
  })
);

//@desc Delete a rdv
//@route DELETE /api/rdvs/:id
//@access Private
router.delete(
  '/:id',
  auth,
  asyncHandler(async (req, res) => {
    const rdv = await RDV.findById(req.params.id);

    if (!rdv) {
      throw new Error('Rdv not found');
    }

    rdv.status = RdvStatus.Cancelled;
    await rdv.save();

    //Publishing an event saying that the rdv was cancelled
    new RdvCancelledPublisher(natsWrapper.client).publish({
      id: rdv._id,
      version: rdv.version,
    });

    res.status(204).send(rdv);
  })
);

//@desc Delete a cancelled rdv
//@route DELETE /api/rdvs/:id
//@access Private
router.post(
  '/:id/delete',
  auth,
  asyncHandler(async (req, res) => {
    const rdv = await RDV.findById(req.params.id);

    if (!rdv) {
      throw new Error('Rdv not found');
    } else {
      if (rdv.status == 'cancelled') {
        await RDV.deleteOne(rdv);
        res.json('Rdv is deleted');
      } else {
        throw new Error('RDV is not cancelled');
      }
    }
  })
);

//@desc Get all rdvs for a doctor
//@route GET /api/rdvs/
//@access Public
router.get(
  '/:id/doctorinfo',
  asyncHandler(async (req, res) => {
    const rdvs = await RDV.find({ doctorId: req.params.id });

    if (rdvs) {
      res.json(rdvs);
    } else {
      throw new Error('Server error');
    }
  })
);

export default router;

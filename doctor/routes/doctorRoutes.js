import express from 'express';
import Doctor from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

//@route    GET api/doctors/profile
//@desc     show doctor profile
//@access   Private
router.get(
  '/profile',
  auth,
  asyncHandler(async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.doctor._id).select('-password');
      res.json(doctor);
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server Error');
    }
  })
);

//@route    POST api/doctors/signup
//@desc     register a doctor
//@access   Public
router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const {
      titre,
      prenom,
      nom,
      email,
      password,
      specialite,
      addressCabinet,
      ville,
      phoneCabinet,
      phonePersonel,
    } = req.body;

    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      res.status(400);
      throw new Error('Doctor already exists');
    }

    const doctor = await Doctor.create({
      titre,
      prenom,
      nom,
      email,
      password,
      specialite,
      addressCabinet,
      ville,
      phoneCabinet,
      phonePersonel,
    });

    if (doctor) {
      const payload = {
        doctor: {
          id: doctor.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            _id: doctor._id,
            titre: doctor.titre,
            prenom: doctor.prenom,
            nom: doctor.nom,
            email: doctor.email,
            specialite: doctor.specialite,
            addressCabinet: doctor.addressCabinet,
            ville: doctor.ville,
            phoneCabinet: doctor.phoneCabinet,
            phonePersonel: doctor.phonePersonel,
            token: token,
          });
        }
      );
    } else {
      res.status(400);
      throw new Error('Invalid doctor data');
    }
  })
);

//@route    POST api/doctors/login
//@desc     auth a doctor and return a token
//@access   Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (doctor && (await doctor.matchPassword(password))) {
      const payload = {
        doctor: {
          _id: doctor._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            _id: doctor._id,
            titre: doctor.titre,
            prenom: doctor.prenom,
            nom: doctor.nom,
            email: doctor.email,
            specialite: doctor.specialite,
            addressCabinet: doctor.addressCabinet,
            ville: doctor.ville,
            phoneCabinet: doctor.phoneCabinet,
            phonePersonel: doctor.phonePersonel,
            token: token,
          });
        }
      );
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

export default router;

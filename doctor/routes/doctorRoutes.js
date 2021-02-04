import path from 'path';
import express from 'express';
import multer from 'multer';
import Doctor from '../models/doctorModel.js';
import { auth } from '../middlewares/auth.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { DoctorCreatedPublisher } from '../events/publishers/doctor-created-publisher.js';
import { DoctorUpdatedPublisher } from '../events/publishers/doctor-updated-publisher.js';
import { natsWrapper } from '../nats-wrapper.js';

const router = express.Router();

//@route    POST api/doctors/signup
//@desc     Register a doctor
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
          _id: doctor._id,
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
            ville: doctor.ville,
            phoneCabinet: doctor.phoneCabinet,
            phonePersonel: doctor.phonePersonel,
            formattedAddress: doctor.location.formattedAddress,
            location: doctor.location,
            token: token,
          });
        }
      );

      new DoctorCreatedPublisher(natsWrapper.client).publish({
        id: doctor._id,
        titre: doctor.titre,
        prenom: doctor.prenom,
        nom: doctor.nom,
        email: doctor.email,
        specialite: doctor.specialite,
        ville: doctor.ville,
        phoneCabinet: doctor.phoneCabinet,
        phonePersonel: doctor.phonePersonel,
        formattedAddress: doctor.location.formattedAddress,
        location: doctor.location,
        version: doctor.version,
      });
    } else {
      res.status(400);
      throw new Error('Invalid doctor data');
    }
  })
);

//@route    POST api/doctors/login
//@desc     Authenticate a doctor and return a token
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
            formattedAddress: doctor.location.formattedAddress,
            ville: doctor.ville,
            phoneCabinet: doctor.phoneCabinet,
            phonePersonel: doctor.phonePersonel,
            token: token,
            location: doctor.location,
          });
        }
      );
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

//@route    GET api/doctors/profile
//@desc     Show doctor profile
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

// @route    GET api/doctors/:id
// @desc     Fetch a single doctor
// @access   Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).select('-password');
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404);
      throw new Error('Doctor not found');
    }
  })
);

//@route    PUT /api/doctors/profile
//@desc     Update doctor profile
//@access   Private
router.put(
  '/profile',
  auth,
  asyncHandler(async (req, res) => {
    const doctor = await Doctor.findById(req.doctor._id);
    if (doctor) {
      doctor.titre = req.body.titre || doctor.titre;
      doctor.prenom = req.body.prenom || doctor.prenom;
      doctor.nom = req.body.nom || doctor.nom;
      doctor.email = req.body.email || doctor.email;
      doctor.specialite = req.body.specialite || doctor.specialite;
      doctor.addressCabinet = req.body.addressCabinet || doctor.addressCabinet;
      doctor.ville = req.body.ville || doctor.ville;
      doctor.phoneCabinet = req.body.phoneCabinet || doctor.phoneCabinet;
      doctor.phonePersonel = req.body.phonePersonel || doctor.phonePersonel;
      doctor.image = req.body.image || doctor.image;
      doctor.prixConsultation =
        req.body.prixConsultation || doctor.prixConsultation;
      doctor.description = req.body.description || doctor.description;
      doctor.diplomesEtFormations =
        req.body.diplomesEtFormations || doctor.diplomesEtFormations;
      doctor.informationsPratiques =
        req.body.informationsPratiques || doctor.informationsPratiques;

      if (req.body.password) {
        doctor.password = req.body.password;
      }

      const updatedDoctor = await doctor.save();

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
            _id: updatedDoctor._id,
            titre: updatedDoctor.titre,
            prenom: updatedDoctor.prenom,
            nom: updatedDoctor.nom,
            email: updatedDoctor.email,
            specialite: updatedDoctor.specialite,
            addressCabinet: updatedDoctor.addressCabinet,
            ville: updatedDoctor.ville,
            phoneCabinet: updatedDoctor.phoneCabinet,
            phonePersonel: updatedDoctor.phonePersonel,
            image: updatedDoctor.image,
            prixConsultation: updatedDoctor.prixConsultation,
            description: updatedDoctor.description,
            diplomesEtFormations: updatedDoctor.diplomesEtFormations,
            informationsPratiques: updatedDoctor.informationsPratiques,
            token: token,
          });
        }
      );

      new DoctorUpdatedPublisher(natsWrapper.client).publish({
        _id: updatedDoctor._id,
        titre: updatedDoctor.titre,
        prenom: updatedDoctor.prenom,
        nom: updatedDoctor.nom,
        email: updatedDoctor.email,
        specialite: updatedDoctor.specialite,
        addressCabinet: updatedDoctor.addressCabinet,
        ville: updatedDoctor.ville,
        phoneCabinet: updatedDoctor.phoneCabinet,
        phonePersonel: updatedDoctor.phonePersonel,
        image: updatedDoctor.image,
        prixConsultation: updatedDoctor.prixConsultation,
        description: updatedDoctor.description,
        diplomesEtFormations: updatedDoctor.diplomesEtFormations,
        informationsPratiques: updatedDoctor.informationsPratiques,
        version: updatedDoctor.version,
      });
    } else {
      res.status(400);
      throw new Error('Doctor not found');
    }
  })
);

//@route    GET /api/doctors/
//@desc     Get all doctors
//@access   Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const keyword1 = req.query.keyword
      ? { nom: { $regex: req.query.keyword1, $options: 'i' } }
      : {};

    const keyword2 = req.query.keyword2
      ? { ville: { $regex: req.query.keyword2, $options: 'i' } }
      : {};

    const doctors = await Doctor.find({ ...keyword1, ...keyword2 }).select(
      '-password'
    );
    res.json(doctors);
  })
);

//@route POST /api/doctors/:id/reviews
//@desc Create a new Review
//@access Private
router.post(
  '/:id/reviews',
  auth,
  asyncHandler(async (req, res) => {
    const { nom, prenom, rating, comment } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      const alreadyReviewd = doctor.reviews.find(
        r => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewd) {
        res.status(400);
        throw new Error('Doctor already reviewd');
      }

      const review = {
        nom,
        prenom,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      doctor.reviews.push(review);

      (doctor.numReviews = doctor.reviews.length),
        (doctor.rating =
          doctor.reviews.reduce((acc, item) => item.rating + acc, 0) /
          doctor.reviews.length);

      await doctor.save();

      res.status(200).json({ message: 'Review Added', doctor });
    } else {
      res.status(400);
      throw new Error('Doctor not found');
    }
  })
);

//@route POST /api/doctors/uploads
//@desc Upload a new image
//@access Private

// const __dirname = path.resolve();
// express().use('/app', express.static(path.join(__dirname, '/app')));
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/uploads', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;

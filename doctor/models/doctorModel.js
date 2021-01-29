import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import geocoder from '../utils/geocoder.js';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const doctorSchema = mongoose.Schema({
  titre: {
    type: String,
    required: true,
    enum: ['Dr.', 'Pr.'],
  },
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  specialite: {
    type: String,
    required: true,
    enum: [
      'Orthodontiste',
      'Psychiatre',
      'Cardiologue',
      'Chirurgien digestif - viscéral',
      'Opticien',
      'Gastrologue',
      'entérologue',
      'Chirurgien général',
      'Chirurgien dentiste',
      'Kinésithérapeute',
      'Urologue et chirurgien urologue',
      'Oto-rhino-laryngologue',
      'Endocrinologue - maladies métaboliques',
      'Ophtalmologue',
      'Médecin Ostéopathe',
      'Gériatre',
      'Chirurgien esthétique',
      'Dermatologue',
      'Pédiatre',
      'Gynécologue obstétricien',
      'Anatomo-pathologiste',
      'Rhumatologue',
      'Orthophoniste',
      'Médecin généraliste',
      'Psychologue',
      'Nutritionniste',
      'Médecin interne',
      'Infirmier',
      'Chirurgien cardio-vasculaire',
      'Pneumologue',
      'Neurochirurgien',
      'Chirurgien orthopédiste et traumatologue',
      'Neuropsychiatre',
      'Génétique médicale',
      'Sexologue',
      'Neurologue',
      'Médecin biologiste',
      'Stomatologue et chirurgien maxillo-faciale',
      'Gynécologue sexologue',
      'Cancérologue',
      'Algologue',
      'Chirurgien réparateur et plastique',
      'Allergologue',
      'Médecin sportif',
      'Néphrologue',
      'Chirurgien pédiatre',
      'Médecin physique et réadaptation fonctionnelle',
      'Gérontologue',
      'Podologue',
      'Chirurgien hépato-biliaire et digestive',
      'Oncologue médicale',
      'Médecin légal et de travail',
      'Pédodontiste',
      'Acupuncteur',
      'Radiothérapeute',
      'Angiologue',
      'Médecin morphologique et anti-âge',
      'Diététicien',
      'Radiologue',
      'Psychomotricité',
      'Chirurgien cancérologue',
      'Anesthésiste-réanimateur',
      'Médecine nucléaire',
      'Homéopathe',
      'Orthopédiste dento-faciale',
      'Pharmacologue',
      'Parodontologue',
      'infectiologue',
      'Odontologue chirurgicale',
      'Chirurgien thoracique',
      'Biologiste vétérinaire',
      'Réanimateur',
      'Autre',
      'Médecin urgentiste',
    ],
  },
  addressCabinet: {
    type: String,
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: {
      type: String,
    },
  },
  ville: {
    type: String,
    required: true,
  },
  phoneCabinet: {
    type: String,
    required: true,
  },
  phonePersonel: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '/images/doctor.jpg',
  },
  prixConsultation: {
    type: Number,
    default: 300,
  },
  description: {
    type: String,
  },
  diplomesEtFormations: {
    type: String,
  },
  informationsPratiques: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date().now,
  },
});

doctorSchema.set('versionkey', 'version');
doctorSchema.plugin(updateIfCurrentPlugin);

// Geocode & create location

doctorSchema.pre('save', async function (next) {
  const add = this.addressCabinet + ' ' + this.ville;

  const loc = await geocoder.geocode(add);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  // Do not save address
  // this.addressCabinet = undefined;
  next();
});

doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

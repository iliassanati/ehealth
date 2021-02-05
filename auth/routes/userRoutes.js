import express from 'express';
import User from '../models/userModel.js';
import { auth, admin } from '../middlewares/auth.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router();

//@route    GET api/users/profile
//@desc     show user profile
//@access   Private
router.get(
  '/profile',
  auth,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).json('Server Error');
    }
  })
);

//@route    POST api/users/signup
//@desc     Register user
//@access   Public
router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const { nom, prenom, email, phone, password, isAdmin } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({
      nom,
      prenom,
      phone,
      email,
      phone,
      password,
      isAdmin,
    });

    if (user) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: token,
          });
        }
      );
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);

//@route    POST api/auth
//@desc     Authenticate & return token
//@access   Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const payload = {
        user: {
          _id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            phone: user.phone,
            email: user.email,
            isAdmin: user.isAdmin,
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

//@route PUT /api/users/profile
//@desc Update user profile
//@access Private
router.put(
  '/profile',
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.nom = req.body.nom || user.nom;
      user.prenom = req.body.prenom || user.prenom;
      user.phone = req.body.phone || user.phone;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();

      const payload = {
        user: {
          _id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            _id: updatedUser._id,
            nom: updatedUser.nom,
            prenom: updatedUser.prenom,
            phone: updatedUser.phone,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: token,
          });
        }
      );
    } else {
      res.status(400);
      throw new Error('User not found');
    }
  })
);

////////////////////////////////////////////////////ADMIN ROUTES///////////////////////////////////////////
//@route    POST api/users/signup/admin
//@desc     Register a admin
//@access   Admin
router.post(
  '/signup/admin',
  asyncHandler(async (req, res) => {
    const { nom, prenom, email, phone, password, isAdmin } = req.body;

    const adminExists = await User.findOne({ email });

    if (adminExists) {
      res.status(400);
      throw new Error('Admin already exists');
    }
    const admin = await User.create({
      nom,
      prenom,
      phone,
      email,
      phone,
      password,
      isAdmin,
    });

    if (admin) {
      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_KEY_ADMIN,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            _id: admin._id,
            nom: admin.nom,
            prenom: admin.prenom,
            email: admin.email,
            phone: admin.phone,
            isAdmin: admin.isAdmin,
            token: token,
          });
        }
      );
    } else {
      res.status(400);
      throw new Error('Invalid admin data');
    }
  })
);

//@route    POST api/login/admin
//@desc     Authenticate & return token for admin
//@access   Admin
router.post(
  '/login/admin',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const payload = {
        admin: {
          _id: admin._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_KEY_ADMIN,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            _id: admin._id,
            nom: admin.nom,
            prenom: admin.prenom,
            phone: admin.phone,
            email: admin.email,
            isAdmin: admin.isAdmin,
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

//@route    GET api/users/
//@desc     Fetch all users
//@access   Admin
router.get(
  '/',
 // admin,
  asyncHandler(async (req, res) => {
    const users = await User.find();

    if (users) {
      res.json(users);
    } else {
      throw new Error('Not authorized');
    }
  })
);

//@desc Delete a user
//@route DELETE /api/users/:id
//@access Admin
router.delete(
  '/:id',
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: 'User Removed' });
    } else {
      res.status(404);
      throw new Error('User Not found');
    }
  })
);

//@desc Get user by Id
//@route GET /api/users/:id
//@access Admin
router.get(
  '/:id',
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User Not found');
    }
  })
);

//@desc Update user
//@route PUT /api/users/:id
//@access Admin
router.get(
  '/:id',
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.nom = req.body.nom || user.nom;
      user.prenom = req.body.prenom || user.prenom;
      user.phone = req.body.phone || user.phone;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        nom: updatedUser.nom,
        prenom: updatedUser.prenom,
        phone: updatedUser.phone,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  })
);

export default router;

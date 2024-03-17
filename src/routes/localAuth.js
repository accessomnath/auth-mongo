import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import requireLocalAuth from '../middleware/requireLocalAuth.js';
import { registerSchema } from '../services/validators.js';
import { verifyApiKey } from '../middleware/verifyApiKey.js';
import  requireJwtAuth  from '../middleware/requireJwtAuth.js';


const router = Router();

router.post('/login',verifyApiKey, requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.json({ token, me });
});

router.post('/register',verifyApiKey, async (req, res, next) => {
  try {
    // Validate request body using Joi
    const { error } = registerSchema.validate(req.body); // Use Joi schema directly
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    const { email, password, name, username } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      provider: 'email',
      email,
      password: hashedPassword,
      username,
      name
    });

    // Save the new user to the database
    await newUser.save();

    res.json({ message: 'Registration successful' });
  } catch (err) {
    // Handle errors
    next(err);
  }
});

router.get('/logout',verifyApiKey, (req, res) => {
  req.logout();
  res.send(false);
});

router.get('/me',verifyApiKey,requireJwtAuth, (req, res) => {
  const me = req.user.toJSON();
  res.json({  me });
});

export default router;

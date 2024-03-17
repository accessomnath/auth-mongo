import { Router } from 'express';
import passport from 'passport';
import { verifyApiKey } from '../middleware/verifyApiKey.js';
const router = Router();

router.get(
  '/google',verifyApiKey,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',verifyApiKey,
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie('x-auth-cookie', token);
    res.redirect(clientUrl);
  },
);

export default router;

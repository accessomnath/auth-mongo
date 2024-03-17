import { Router } from 'express';
import passport from 'passport';
import { verifyApiKey } from '../middleware/verifyApiKey.js';
const router = Router();

router.get(
  '/facebook', verifyApiKey,
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
);


router.get(
  '/facebook/callback',verifyApiKey,
  passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    // console.log(req.user);
    const token = req.user.generateJWT();
    res.cookie('x-auth-cookie', token);
    res.redirect(clientUrl);
  },
);

export default router;

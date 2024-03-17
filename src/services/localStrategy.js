import passport from 'passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import User from '../models/User.js';
import { loginSchema } from './validators.js';

const passportLogin = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return done(null, false, { message: error.details[0].message });
    }

    try {
      const user = await User.findOne({ email: email.trim() });
      if (!user) {
        return done(null, false, { message: 'Email does not exist.' });
      }

      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  },
);


passport.use(passportLogin);

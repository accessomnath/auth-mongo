import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
// import { dirname } from 'path';
import passport from 'passport';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
import './services/jwtStrategy.js';
import './services/facebookStrategy.js';
import './services/googleStrategy.js';
import './services/localStrategy.js';


const dbConnection = process.env.MONGO_URI_DEV;

console.log(dbConnection);

mongoose
  .connect(dbConnection)
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

app.use('/', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server running at ' + port);
});


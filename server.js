const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// APIs
const auth = require('./API/auth');
const search = require('./API/search');
const booking = require('./API/booking');

// Private APIs
const flight = require('./Private API/flight');

// Database Configuration
const MONGO_URI = require('./config/keys').MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, err => {
  if (err) console.error(err);
  else console.log('MongoDB Connected!');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport Configuration
const configurePassport = require('./config/passport');
configurePassport(passport);

// Routes
app.use('/api/auth', auth);
app.use('/api/search', search);
app.use('/api/booking', booking);

// Private Routes
app.use('/api/flight', flight);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is live!');
});

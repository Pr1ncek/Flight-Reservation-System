const express = require('express');
const passport = require('passport');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

const router = express.Router();

router.post('/new', async (req, res) => {
  const { flightId, flightDate, tripId, userId, firstName, lastName } = req.body;
  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ flight: 'Flight does not exist' });
  const trip = flight.possibleTrips.find(trip => trip.id.toString() === tripId);
  if (!trip) return res.status(404).json({ trip: 'Flight does not have this trip' });
  const newBooking = new Booking({
    flightId,
    flightDate,
    trip,
    userId,
    firstName,
    lastName
  });
  console.log(newBooking);
  const savedBooking = await newBooking.save();
  console.log(req.body);
  res.json({ Msg: 'Success', savedBooking });
});

// @route   POST api/booking/
// @desc    book a flight
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { flightId, flightDate, tripId, userId, firstName, lastName } = req.body;
  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ flight: 'Flight does not exist' });
  const trip = flight.possibleTrips.find(trip => trip.id.toString() === tripId);
  if (!trip) return res.status(404).json({ trip: 'Flight does not have this trip' });
  const newBooking = new Booking({
    flightId,
    flightDate,
    trip,
    userId,
    firstName,
    lastName
  });
  console.log(newBooking);
  const savedBooking = await newBooking.save();
  res.json({ Msg: 'Success', savedBooking });
});

// @route   GET api/booking/all
// @desc    Find all bookings for a given user
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { userId } = req.body;
  Booking.find({ userId })
    .populate('userId', ['firstName', 'lastName'])
    .populate('flightId', ['flightNumber', 'flightName'])
    .then(bookings => res.json({ Msg: 'Success', bookings }))
    .catch(err => {
      console.error(err);
      res.status(404).json(err);
    });
});

// @route   DELETE api/booking/cancel
// @desc    Cancel a booking
// @access  Private
router.delete('/cancel', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { bookingId } = req.body;
  Booking.findByIdAndRemove(bookingId)
    .then(() => res.json({ Msg: 'Success' }))
    .catch(err => res.status(404).json(err));
});

module.exports = router;

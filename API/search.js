const express = require('express');
const Flight = require('../models/Flight');

const router = express.Router();

// @route   GET api/search/
// @desc    Find a flight with a given origin ie 'SF' and given destination ie 'LA'
// @access  Public
router.get('/:origin/:destination', (req, res) => {
  const { origin = 'SF', destination = 'LA' } = req.params;
  Flight.find()
    .then(flights => {
      const matchingFlights = [];
      flights.forEach(flight => {
        flight.possibleTrips.forEach(trip => {
          if (trip.origin.toLowerCase().includes(origin.toLowerCase())) {
            if (trip.destination.toLowerCase().includes(destination.toLowerCase())) {
              let flightToSendBack = {
                _id: flight._id,
                flightNumber: flight.flightNumber,
                flightName: flight.flightName
              };
              flightToSendBack.trip = trip;
              matchingFlights.push(flightToSendBack);
            }
          }
        });
      });
      res.json(matchingFlights);
    })
    .catch(err => console.error(err));
});

module.exports = router;

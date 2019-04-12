const express = require('express');
const Flight = require('../models/Flight');
const flight1 = require('./flight-data');

const router = express.Router();

router.post('/newflight', async (req, res) => {
  try {
    const flight = await Flight.findOne({ flightNumber: req.body.flightNumber });
    if (flight) return res.status(400).json({ flight: 'This flight is already in database' });
    const newFlight = new Flight({ ...flight1 });
    const savedFlight = await newFlight.save();
    return res.json({ Msg: 'Success', savedFlight });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

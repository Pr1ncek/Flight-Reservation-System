const mongoose = require('mongoose');

// Create Schema
const bookingSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Flight'
  },
  flightDate: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  trip: {
    type: Object,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

/* 
Bookings Schema
confirmation number
user id
first name, last name
flight number
date
departure time
arrival time
date created: ‘For records purposes’
*/

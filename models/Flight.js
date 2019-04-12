const mongoose = require('mongoose');

// Create Schema
const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true
  },
  flightName: {
    type: String,
    required: true
  },
  possibleTrips: {
    type: [
      {
        origin: String,
        destination: String,
        originAirport: String,
        destinationAirport: String,
        weekday: String,
        departureTime: String,
        arrivalTime: String,
        price: Number
      }
    ],
    required: true
  }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;

/* 
Flight Schema
flight number
origins: [SF]
destinations: [LA]
originAirport: SFO
destinationAirport: LAX
days: [M, T, W, TH, F]
departureTime: [9AM, 2PM, 7PM]
arrivalTime: [11AM, 4PM, 9PM]
price: $200

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

// models/Location.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  exeId: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

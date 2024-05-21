const mongoose = require('mongoose');

const executiveSchema = new mongoose.Schema({
  exeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const Executive = mongoose.model('Executive', executiveSchema);

module.exports = Executive;

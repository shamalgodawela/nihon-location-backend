const express = require('express');
const router = express.Router();
const {addExecutive}= require('../Controller/ExecutiveController')

router.post('/register', addExecutive)

module.exports = router;
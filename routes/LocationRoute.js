const express = require('express');
const router = express.Router();
const {addLocation, getAllLocations,getLocationById}= require('../Controller/LocationController')

router.post('/addlocation', addLocation)
router.get('/getAlllocations', getAllLocations)
router.get('/location/:id', getLocationById);

module.exports = router;
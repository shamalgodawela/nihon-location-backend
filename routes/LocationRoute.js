const express = require('express');
const router = express.Router();
const {addLocation, getAllLocations,getLocationById,searchByExeIdAndDate}= require('../Controller/LocationController')

router.post('/addlocation', addLocation)
router.get('/getAlllocations', getAllLocations)
router.get('/location/:id', getLocationById);
router.get('/locationbydate', searchByExeIdAndDate)

module.exports = router;
const Location = require('../Models/LocationForm');
const Executive = require('../Models/Executive');

const addLocation = async (req, res) => {
  try {
    const { exeId, shopName, latitude, longitude } = req.body;

    // Create a new Date object to capture current date and time
    const currentTime = new Date();
    
    // Extract just the time (hours, minutes, seconds)
    const formattedTime = currentTime.toLocaleTimeString();  // Example format: "2:15:30 PM"

    const newLocation = new Location({
      exeId,
      shopName,
      latitude,
      longitude,
      timestamp: currentTime,  // This will store full date and time
      time: formattedTime       // Store the extracted time as a string
    });

    await newLocation.save();
    res.status(201).json({ message: 'Location added successfully', location: newLocation });
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




const getAllLocations = async (req, res) => {
    try {
        // Query the database to fetch all location records
        const locations = await Location.find();

        // Send the retrieved locations as a response
        res.status(200).json(locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getLocationById = async (req, res) => {
    try {
      const { id } = req.params;
  
      
      const location = await Location.findById(id);
  
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
  
      // Send the retrieved location detail as a response
      res.status(200).json(location);
    } catch (error) {
      console.error('Error fetching location detail:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const searchByExeIdAndDate = async (req, res) => {
    const { exeId, date } = req.query;
  
    if (!exeId || !date) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }
  
    try {
      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));
  
      const locations = await Location.find({
        exeId,
        timestamp: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });
  
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error searching locations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    addLocation,
    getAllLocations,
    getLocationById,
    searchByExeIdAndDate
   
};


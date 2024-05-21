const Location = require('../Models/LocationForm');
const Executive = require('../Models/Executive');

const addLocation = async (req, res) => {
    try {
        const { exeId, shopName, latitude, longitude } = req.body;

        // Check if the executive exists
        const existingUser = await Executive.findOne({ exeId });
        if (!existingUser) {
            return res.status(404).json({ error: 'Executive not found' });
        }

        // Save the location document to the database
        const newLocation = new Location({
            exeId,
            shopName,
            latitude,
            longitude
        });
        await newLocation.save();

        res.status(201).json({ message: 'Location added successfully' });
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

  const searchLocations = async (req, res) => {
    try {
      const { timestamp, exeId } = req.query; 
  
      
      if (timestamp && exeId) {
       
        const locations = await Location.find({ timestamp, exeId });
        res.json(locations);
      } else if (date) { 
        
        const locations = await Location.find({ timestamp });
        res.json(locations);
      } else if (exeId) { 
        const locations = await Location.find({ exeId });
        res.json(locations); 
      } else {
    
        res.status(400).json({ message: 'Date or exeId parameter is required' });
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    addLocation,
    getAllLocations,
    getLocationById,
    searchLocations
};


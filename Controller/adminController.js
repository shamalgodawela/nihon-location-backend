const Admin= require('../Models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin= async(req, res)=>{
    try {
        const {name, email, password}= req.body

        if(!name || !email || !password){
            res.status(404).json({message:'required all feild'});
        }

        const findadmin= await Admin.findOne({email});

        if(findadmin){
            res.status(400).json({message:'Admin already registered with your provide email'})

        
        }

        const newAdmin= new Admin({
            name,
            email,
            password
        })
        await newAdmin.save();
        res.status(200).json(newAdmin);
        



    } catch (error) {
        res.status(500).json({error:'internal server error'});
        
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the request
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if admin exists in the database
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Validate password (since password is not hashed, compare directly)
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const payload = {
            admin: {
                id: admin.id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports ={
    registerAdmin,
    loginAdmin
}
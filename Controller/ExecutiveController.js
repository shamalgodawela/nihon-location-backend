const Executive = require('../Models/Executive');

const addExecutive = async (req, res) => {
    try {
        const { exeId, name, email } = req.body;

        const existingExe = await Executive.findOne({ email });

        if (existingExe) {
            return res.status(400).json({ error: 'Executive with this email already exists' });
        }

        const newExe = new Executive({
            exeId,
            name,
            email
        });

        await newExe.save();
        res.status(201).json({ message: 'Executive added successfully' });

    } catch (error) {
        console.error('Error adding executive:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addExecutive
};

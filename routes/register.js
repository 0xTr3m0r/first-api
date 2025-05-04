const express = require('express');
const router = express.Router();
const { User } = require('../models'); 
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await User.create({ username, password });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


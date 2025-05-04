const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models'); 


router.post('/', async (req, res) => {
    const { username, password, firstName, lastName, bio } = req.body;

    try {
        
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const newUser = await User.create({ username, password });

        
        const newProfile = await Profile.create({
            userId: newUser.id, 
            firstName: firstName || '', 
            lastName: lastName || '',
            bio: bio || '',
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            profile: newProfile,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


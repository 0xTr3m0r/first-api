const express = require('express');
const router = express.Router();
const { Profile } = require('../models'); 

router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ where: { userId: req.params.id } }); 
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, bio } = req.body;

    try {
        const profile = await Profile.findByPk(id); 
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        
        profile.firstName = firstName || profile.firstName;
        profile.lastName = lastName || profile.lastName;
        profile.bio = bio || profile.bio;
        await profile.save();

        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
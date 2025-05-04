const express = require('express');
const router = express.Router();
const { User } = require('../models');


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = `fake-jwt-token-for-${user.username}`;
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../utils/prisma.js');  // Import Prisma client

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the user in the database with the hashed password
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // Respond back to the client with the created user's username and ID
        res.status(201).json({ user: { id: user.id, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
});

module.exports = router;

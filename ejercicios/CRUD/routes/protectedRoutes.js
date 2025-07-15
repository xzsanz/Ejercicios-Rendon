// routes/protectedRoutes.js
const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/private', protect, (req, res) => {
    res.json({ message: 'Acceso autorizado', userId: req.user });
});

module.exports = router;

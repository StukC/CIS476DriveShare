const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Car = require('../models/car');

// Add a new car listing (Protected)
router.post('/list-car', verifyToken, async (req, res) => {
  try {
    // req.user contains user information from the token
    const newCar = new Car({ ...req.body, owner: req.user.userId });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

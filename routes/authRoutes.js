const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const sessionManager = require('../utils/sessionManager');
const { SecurityQuestionHandler } = require('../handlers/handler');

router.post('/register', async (req, res) => {
  try {
    const { email, password, securityQuestion1, securityAnswer1, securityQuestion2, securityAnswer2, securityQuestion3, securityAnswer3 } = req.body;
    const user = new User({
      email,
      password,
      securityQuestion1,
      securityAnswer1,
      securityQuestion2,
      securityAnswer2,
      securityQuestion3,
      securityAnswer3
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = sessionManager.createToken({ userId: user._id });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/get-security-questions', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select('securityQuestion1 securityQuestion2 securityQuestion3 -_id');
    if (!user) {
      return res.status(404).send('User not found');
    }
    // Return the actual security question text
    const questions = [user.securityQuestion1, user.securityQuestion2, user.securityQuestion3];
    res.json({ questions });
  } catch (error) {
    console.error("An error occurred while fetching security questions:", error);
    res.status(500).send("An error occurred while fetching security questions.");
  }
});

router.post('/verify-security-answers', async (req, res) => {
  const { email, answers } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Assuming you have security answers stored as securityAnswer1, securityAnswer2, etc.
    for (let i = 0; i < answers.length; i++) {
      const answerKey = `securityAnswer${i + 1}`;
      const isMatch = await bcrypt.compare(answers[i], user[answerKey]);
      if (!isMatch) {
        return res.status(400).send(`Security answer ${i + 1} is incorrect.`);
      }
    }

    res.json({ message: 'All security answers verified.' });
  } catch (error) {
    console.error("An error occurred while verifying security answers:", error);
    res.status(500).send("An error occurred while verifying security answers.");
  }
});


router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error("An error occurred while resetting the password:", error);
    res.status(500).send("An error occurred while resetting the password.");
  }
});

module.exports = router;

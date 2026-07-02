const express = require('express');
const { saveMessage } = require('../database/storage');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }

  if (name.trim().length < 2 || message.trim().length < 10) {
    return res.status(400).json({ error: 'Please provide a valid name and a longer message.' });
  }

  try {
    await saveMessage({ name, email, message });
    res.status(201).json({ message: 'Your message has been saved successfully.' });
  } catch (error) {
    console.error('Contact save error:', error);
    res.status(500).json({ error: 'Server error while saving your message.' });
  }
});

module.exports = router;

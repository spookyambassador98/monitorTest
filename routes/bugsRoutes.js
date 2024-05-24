const express = require('express');
const router = express.Router();
const bugs = require('../models/bugs'); // Assuming your model file is in the models folder

router.post('/submit', async (req, res) => {
  try {
    const BugsData =({
        title: req.body.title,
        name: req.body.name,
        department: req.body.department,
        severity: req.body.severity,
        description: req.body.description,
        Ip: req.ip,
        date: new Date().toISOString(),
    })

    const newBug = new bugs(BugsData);
    await newBug.save();
    res.status(201).json(newBug); // Respond with the newly created user
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

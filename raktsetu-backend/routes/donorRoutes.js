const express = require('express');
const Donor = require('../models/Donor');
const { protect, optionalAuth } = require('../middleware/auth');
const escapeRegex = require('../utils/escapeRegex');
const router = express.Router();

// GET /api/donors/me  (the logged in user's own donor profile)
router.get('/me', protect, async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user.id });
    res.json(donor);   // null when the user is not a donor yet
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/donors?bloodGroup=O%2B&city=Delhi
router.get('/', async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    const filter = { isAvailable: true };

    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (city) {
      filter.city = new RegExp(`^${escapeRegex(city)}$`, 'i');
    }

    const donors = await Donor.find(filter).sort({ createdAt: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', optionalAuth, async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.user) {
      const existing = await Donor.findOne({ user: req.user.id });
      if (existing) {
        return res.status(400).json({ message: 'You already have a donor profile' });
      }
      data.user = req.user.id;
    }

    const donor = await Donor.create(data);
    res.status(201).json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/donors/:id/availability  (protected)
router.patch('/:id/availability', protect, async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: 'Donor not found' });

    const isOwner = donor.user && String(donor.user) === req.user.id;
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    donor.isAvailable = !donor.isAvailable;
    await donor.save();
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
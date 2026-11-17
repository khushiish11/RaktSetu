const express = require('express');
const Hospital = require('../models/Hospital');
const { protect, adminOnly } = require('../middleware/auth');
const escapeRegex = require('../utils/escapeRegex');

const router = express.Router();

// GET /api/hospitals?city=Delhi&search=aiims
router.get('/', async (req, res) => {
  try {
    const { city, search } = req.query;
    const filter = {};

    if (city) filter.city = new RegExp(`^${escapeRegex(city)}$`, 'i');
    if (search) filter.name = new RegExp(escapeRegex(search), 'i');

    const hospitals = await Hospital.find(filter);
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/hospitals/inventory/summary  (total stock per blood group)
router.get('/inventory/summary', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    const groups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    const summary = groups.map(group => {
      const total = hospitals.reduce(
        (sum, h) => sum + ((h.bloodInventory && h.bloodInventory[group]) || 0),
        0
      );
      const status =
        total > 30 ? 'Available' : total >= 10 ? 'Low' : 'Critical';
      return { bloodGroup: group, available: total, status };
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/hospitals  (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
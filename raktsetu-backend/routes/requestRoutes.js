const express = require('express');
const BloodRequest = require('../Models/BloodRequest');
const { protect, optionalAuth } = require('../middleware/auth');
const router = express.Router();

// GET /api/requests/mine  (requests posted by the logged in user)
router.get('/mine', protect, async (req, res) => {
  try {
    const requests = await BloodRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/requests?status=Pending&bloodGroup=O%2B
router.get('/', async (req, res) => {
  try {
    const { status, bloodGroup, urgencyLevel } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (urgencyLevel) filter.urgencyLevel = urgencyLevel;

    const requests = await BloodRequest.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', optionalAuth, async (req, res) => {
  try {
    const request = await BloodRequest.create({
      ...req.body,
      user: req.user ? req.user.id : undefined
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id/status', protect, async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    const isOwner = request.user && String(request.user) === req.user.id;
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    request.status = req.body.status;
    await request.save();
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
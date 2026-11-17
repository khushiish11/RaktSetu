const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  patientName: { type: String, required: true },
  bloodGroup: {
    type: String, required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  unitsNeeded: { type: Number, required: true, min: 1 },
  urgencyLevel: {
    type: String,
    enum: ['Normal', 'Urgent', 'Critical'],
    default: 'Normal'
  },
  hospitalName: { type: String, required: true },
  city: { type: String, required: true },
  contactNumber: { type: String, required: true },
  reason: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['Pending', 'Fulfilled', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });
module.exports = mongoose.model('BloodRequest', requestSchema);
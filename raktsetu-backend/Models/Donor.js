const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, trim: true },
  bloodGroup: {
    type: String, required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  age: { type: Number, required: true, min: 18, max: 65 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true, trim: true },
  area: { type: String, required: true, trim: true },
  lastDonationDate: { type: Date },
  isAvailable: { type: Boolean, default: true },
  totalDonations: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
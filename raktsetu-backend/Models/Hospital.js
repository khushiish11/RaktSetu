const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  city: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Government', 'Private'], default: 'Government' },
  emergency: { type: Boolean, default: false },
  bloodBankAvailable: { type: Boolean, default: true },
  bloodBankTiming: { type: String, default: '24/7' },
  opdTiming: { type: String },
  bloodInventory: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
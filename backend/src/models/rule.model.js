const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  when: { type: Object, required: true }, // JSON condition
  then: { type: Object, required: true }, // JSON action
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Rule', RuleSchema);

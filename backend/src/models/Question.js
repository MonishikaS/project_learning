const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    topic: String,
    text: String,
    options: [String],
    answer: Number,
    difficulty: { type: Number, default: 1 },
    blooms: String,
    skills: [String],
    explanation: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);

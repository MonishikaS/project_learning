const mongoose = require("mongoose");
const Question = require("./models/Question");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Question.create({
    topic: "JavaScript",
    text: "Which keyword declares a constant variable?",
    options: ["let", "var", "const", "static"],
    answer: 2,
    difficulty: 1,
    explanation: "'const' creates a block-scoped constant.",
  });
  console.log("✅ Sample question inserted");
  mongoose.disconnect();
});

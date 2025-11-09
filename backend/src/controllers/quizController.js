const Question = require("../models/Question");

exports.getNextQuestion = async (req, res) => {
  try {
    const { topic, difficulty = 1 } = req.body;
    const question = await Question.aggregate([
      { $match: { topic, difficulty } },
      { $sample: { size: 1 } },
    ]);
    if (question.length === 0)
      return res.status(404).json({ message: "No questions available" });
    res.json(question[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question" });
  }
};

exports.submitAttempt = async (req, res) => {
  try {
    const { questionId, selected } = req.body;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });
    const correct = question.answer === selected;
    res.json({ correct, explanation: question.explanation });
  } catch {
    res.status(500).json({ message: "Error submitting attempt" });
  }
};

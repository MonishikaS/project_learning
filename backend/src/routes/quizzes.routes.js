const express = require('express');
const router = express.Router();
const { generateQuiz, recordAttempt } = require('../controllers/quizzes.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/generate', authMiddleware, generateQuiz);
router.post('/attempt', authMiddleware, recordAttempt);

module.exports = router;

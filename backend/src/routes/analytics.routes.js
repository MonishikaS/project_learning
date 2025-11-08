const express = require('express');
const router = express.Router();
const { learnerMasteryTimeline } = require('../controllers/analytics.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.get('/learner/:id/timeline', authMiddleware, learnerMasteryTimeline);

module.exports = router;

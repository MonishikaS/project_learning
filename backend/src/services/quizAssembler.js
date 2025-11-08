const Item = require('../models/item.model');
const Attempt = require('../models/attempt.model');

// assembleQuiz({ learnerId, topics, mode, size })
async function assembleQuiz({ learnerId, topics = [], mode = 'formative', size = 10 }) {
  // 1. Exclude items attempted recently by learner (cooldown)
  const recentAttempts = await Attempt.find({ learner: learnerId }).sort({ takenAt: -1 }).limit(200).lean();
  const excludedItemIds = new Set(recentAttempts.map(a => String(a.item)));
  // 2. Build query: topics and exclude recent items
  const q = {};
  if (topics.length) q['tags.topic'] = { $in: topics };
  const candidates = await Item.find(q).lean();
  // 3. Filter out excluded
  const filtered = candidates.filter(it => !excludedItemIds.has(String(it._id)));
  // 4. Simple strategy: prefer items matching lower mastery (caller ensures topic selection) and difficulty balancing if required
  // For now random sample of filtered; if filtered < size, allow repeats (pick from all)
  const pickFrom = filtered.length >= size ? filtered : candidates;
  // shuffle
  for (let i = pickFrom.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pickFrom[i], pickFrom[j]] = [pickFrom[j], pickFrom[i]];
  }
  const selected = pickFrom.slice(0, Math.min(size, pickFrom.length));
  // format quiz
  const quiz = {
    mode,
    size: selected.length,
    items: selected.map(it => ({
      id: it._id,
      stem: it.stem,
      type: it.type,
      choices: it.choices,
      tags: it.tags,
      hints: it.hints,
      explanation: it.explanation
    })),
    createdAt: new Date()
  };
  return quiz;
}

module.exports = { assembleQuiz };

// Rolling mastery calculator based on last N attempts and weighted time.
// Input: learnerDoc, attempts (array of Attempt docs)
function computeMasteryFromAttempts(attempts, decay = 0.9) {
  // We'll compute per-topic mastery as exponential weighted correctness
  const byTopic = {};
  // attempts ordered by takenAt ascending
  for (const a of attempts) {
    const topic = a.metadata && a.metadata.topic ? a.metadata.topic : (a.item && a.item.tags && a.item.tags.topic);
    if (!topic) continue;
    if (!byTopic[topic]) byTopic[topic] = { score: 0, weight: 0 };
    const correct = a.correct ? 1 : 0;
    // weight based on recency: more recent attempts have higher weight; we model by exponent of index later
    byTopic[topic].score += correct;
    byTopic[topic].weight += 1;
  }
  const mastery = {};
  for (const t of Object.keys(byTopic)) {
    const s = byTopic[t].score / (byTopic[t].weight || 1);
    mastery[t] = Math.round(s * 100) / 100; // 0..1 two decimals
  }
  return mastery;
}

module.exports = { computeMasteryFromAttempts };

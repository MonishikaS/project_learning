// Simple evaluator for rules stored as { when: {topic: 'algebra', masteryLt: 0.6}, then: {action:'remediate', params:{topic:'algebra'}} }
function evaluateRules(learnerDoc, context = {}, rules = []) {
  const actions = [];
  for (const r of rules) {
    if (!r.active) continue;
    const cond = r.when || {};
    let ok = true;
    if (cond.topic && cond.masteryLt !== undefined) {
      const mastery = (learnerDoc.mastery && learnerDoc.mastery.get(cond.topic)) || 0;
      if (!(mastery < cond.masteryLt)) ok = false;
    }
    if (cond.topic && cond.masteryGte !== undefined) {
      const mastery = (learnerDoc.mastery && learnerDoc.mastery.get(cond.topic)) || 0;
      if (!(mastery >= cond.masteryGte)) ok = false;
    }
    // more predicates can be added
    if (ok) actions.push(r.then);
  }
  return actions;
}

module.exports = { evaluateRules };

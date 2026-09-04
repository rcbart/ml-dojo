#!/usr/bin/env node
/* A correct answer that is conspicuously the longest is answerable without
   knowing the material. Two gates, both on budgets that only ever come down.

   1. OUTLIERS: per question, the correct answer far longer than the rest. Strict
      (RATIO and ABS together), so it catches only the egregious ones.
   2. LONGEST SHARE: the aggregate. How often is the correct answer simply the
      longest option? Under a fair bank that is the chance baseline, 1/n per
      question. Well above it means "always pick the longest" beats guessing,
      which is the failure the per-question outlier test misses entirely: 345
      questions can each be a mild tell and still add up to a giveaway.

   Worst offenders: python3 scripts/quiz-annotate.py bias 20
   Rewrite them:    python3 scripts/quiz-annotate.py retext patch.json */
const fs = require('fs');
const BUDGET = 0;          // lower this as questions are fixed, never raise it
const RATIO = 1.4;           // correct answer at least 40% above the mean of the rest
const ABS = 20;              // and at least 20 characters longer, to ignore noise
// Aggregate debt, measured 2026-09-04: 170 of 345 (49.3%) against a 25.0% chance
// baseline. A learner who knows nothing and always picks the longest option scores
// about 49%. This is real, committed debt: lower it as questions are rewritten,
// never raise it.
const LONGEST_BUDGET = 0;
const dir = 'content/streams';
let tot = 0, biased = 0, longest = 0, expected = 0, variance = 0;
for (const f of fs.readdirSync(dir).filter(x => /^\d.*\.js$/.test(x))) {
  const S = [];
  new Function('STREAMS', fs.readFileSync(`${dir}/${f}`, 'utf8'))(S);
  for (const l of S.flatMap(s => s.lessons)) {
    for (const q of (l.quiz ? l.quiz.questions : [])) {
      const o = q.options.map(x => String(x).replace(/<[^>]+>/g, '').trim());
      if (o.length < 2) continue;
      tot++;
      const rest = o.filter((_, i) => i !== q.answer).map(x => x.length);
      const mean = rest.reduce((a, b) => a + b, 0) / rest.length;
      const c = o[q.answer].length;
      if (c > mean * RATIO && c > mean + ABS) biased++;
      // Strictly the longest option: ties are not a tell, so they do not count.
      if (o.every((x, i) => i === q.answer || x.length < c)) longest++;
      const p = 1 / o.length;
      expected += p; variance += p * (1 - p);
    }
  }
}
let bad = false;

console.log(`outliers:      ${biased} of ${tot} questions (${(100 * biased / tot).toFixed(1)}%) have a length-biased correct answer.`);
console.log(`               budget: ${BUDGET}`);
if (biased > BUDGET) { console.error(`  over outlier budget by ${biased - BUDGET}`); bad = true; }
else if (biased < BUDGET) console.log(`  ${BUDGET - biased} below budget. Lower BUDGET in this file to lock the gain in.`);

const z = (longest - expected) / Math.sqrt(variance);
console.log(`longest share: ${longest} of ${tot} questions (${(100 * longest / tot).toFixed(1)}%) have the correct answer as the strictly longest option.`);
console.log(`               chance baseline ${expected.toFixed(1)} (${(100 * expected / tot).toFixed(1)}%), z = ${z.toFixed(1)}`);
console.log(`               budget: ${LONGEST_BUDGET}`);
if (longest > LONGEST_BUDGET) { console.error(`  over longest-share budget by ${longest - LONGEST_BUDGET}`); bad = true; }
else if (longest < LONGEST_BUDGET) console.log(`  ${LONGEST_BUDGET - longest} below budget. Lower LONGEST_BUDGET in this file to lock the gain in.`);

if (bad) process.exit(1);
console.log('ok');

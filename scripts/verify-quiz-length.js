#!/usr/bin/env node
/* A correct answer that is conspicuously the longest is answerable without
   knowing the material. This counts how many questions still are, against a
   budget that only ever comes down.

   Worst offenders: python3 scripts/quiz-annotate.py bias 20
   Rewrite them:    python3 scripts/quiz-annotate.py retext patch.json */
const fs = require('fs');
const BUDGET = 40;          // lower this as questions are fixed, never raise it
const RATIO = 1.4;           // correct answer at least 40% above the mean of the rest
const ABS = 20;              // and at least 20 characters longer, to ignore noise
const dir = 'content/streams';
let tot = 0, biased = 0;
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
    }
  }
}
console.log(`${biased} of ${tot} questions (${(100 * biased / tot).toFixed(1)}%) have a length-biased correct answer.`);
console.log(`budget: ${BUDGET}`);
if (biased > BUDGET) { console.error(`over budget by ${biased - BUDGET}`); process.exit(1); }
if (biased < BUDGET) console.log(`${BUDGET - biased} below budget. Lower BUDGET in this file to lock the gain in.`);
else console.log('ok');

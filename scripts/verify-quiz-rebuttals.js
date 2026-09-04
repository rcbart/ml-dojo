#!/usr/bin/env node
/* Every quiz question should explain why the option you picked is wrong, not
   only why the right one is right. whyWrong runs parallel to options, with an
   empty string in the correct slot. This reports coverage and fails on a
   malformed array, which is the failure that would silently mislabel a
   rebuttal after the options are reordered.

   Fill gaps with: python3 scripts/quiz-annotate.py dump <file>  then  apply */
const fs = require('fs');
const dir = 'content/streams';
let tot = 0, done = 0, bad = 0;
for (const f of fs.readdirSync(dir).filter(x => /^\d.*\.js$/.test(x))) {
  const S = [];
  new Function('STREAMS', fs.readFileSync(`${dir}/${f}`, 'utf8'))(S);
  const qs = S.flatMap(s => s.lessons).flatMap(l => (l.quiz ? l.quiz.questions : []));
  let d = 0;
  for (const q of qs) {
    const w = q.whyWrong;
    // No rebuttals at all is the biggest gap, not an exemption. Skipping it here
    // meant a bank with zero whyWrong reported "0 malformed" and exited clean.
    if (!w) {
      bad++; console.error(`  ${f}: no whyWrong at all on "${String(q.q).slice(0, 60)}"`); continue;
    }
    if (!Array.isArray(w) || w.length !== q.options.length || String(w[q.answer] || '').trim()) {
      bad++; console.error(`  ${f}: malformed whyWrong on "${String(q.q).slice(0, 60)}"`); continue;
    }
    if (w.some((t, i) => i !== q.answer && !String(t).trim())) {
      bad++; console.error(`  ${f}: blank rebuttal on "${String(q.q).slice(0, 60)}"`); continue;
    }
    d++;
  }
  tot += qs.length; done += d;
  if (qs.length) console.log(`${String(d + '/' + qs.length).padStart(8)}  ${f}`);
}
console.log(`rebuttals: ${done} of ${tot} question(s) (${(100 * done / tot).toFixed(0)}%), ${bad} malformed`);
if (bad) process.exit(1);

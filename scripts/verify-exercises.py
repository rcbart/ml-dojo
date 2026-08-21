#!/usr/bin/env python3
"""Run every reference solution and check it against its own assertions.

The other checks in this repository read the content. This one executes it. An
exercise whose solution does not actually satisfy the tests the learner is
graded against is the worst kind of defect: the model answer is wrong, and the
learner has no way to tell.

Mirrors what the browser does, minus Pyodide: run `solution`, then evaluate each
`tests[].expr` in the namespace it left behind.

  python3 scripts/verify-exercises.py [--verbose]
"""
import io, json, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STREAMS = os.path.join(ROOT, 'content', 'streams')

def load():
    man = json.load(io.open(os.path.join(STREAMS, 'manifest.json'), encoding='utf-8'))
    src = io.open(os.path.join(STREAMS, '_header.js'), encoding='utf-8').read()
    for f in man:
        src += io.open(os.path.join(STREAMS, f), encoding='utf-8').read() + '\n'
    src += io.open(os.path.join(STREAMS, '_footer.js'), encoding='utf-8').read()
    js = ('"use strict";' + src + ';console.log(JSON.stringify(STREAMS.map(s=>({'
          'title:s.title,lessons:s.lessons.map(l=>({id:l.id,exs:(l.exs||(l.ex?[l.ex]:[]))}))}))));')
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as fh:
        fh.write(js); tmp = fh.name
    try:
        out = subprocess.run(['node', tmp], capture_output=True, text=True, check=True).stdout
    finally:
        os.unlink(tmp)
    return json.loads(out)

RUNNER = '''
import io, json, sys, traceback, contextlib
ns = {"__name__": "__main__"}
buf = io.StringIO()
try:
    with contextlib.redirect_stdout(buf):
        exec(compile(SOLUTION, "<solution>", "exec"), ns)
except ModuleNotFoundError as e:
    print(json.dumps({"stage": "missing-module", "error": str(e)}))
    sys.exit(0)
except Exception:
    print(json.dumps({"stage": "solution", "error": traceback.format_exc(limit=2)}))
    sys.exit(0)
# The browser runner hands the captured output to the assertions as _stdout.
ns["_stdout"] = buf.getvalue()
results = []
for d, expr in TESTS:
    try:
        ok = bool(eval(expr, ns))
        results.append([d, ok, None])
    except Exception as e:
        results.append([d, False, "%s: %s" % (type(e).__name__, e)])
print(json.dumps({"stage": "tests", "results": results}))
'''

def main():
    verbose = '--verbose' in sys.argv
    streams = load()
    total = passed = failed = skipped = 0
    problems = []
    for s in streams:
        for l in s['lessons']:
            for i, e in enumerate(l['exs']):
                key = l['id'] + ('#%d' % i if len(l['exs']) > 1 else '')
                tests = e.get('tests') or []
                if not e.get('solution') or not tests:
                    skipped += 1
                    problems.append(('NO SOLUTION' if not e.get('solution') else 'NO TESTS', key, ''))
                    continue
                total += 1
                prog = ('SOLUTION = ' + repr(e['solution']) + '\n'
                        'TESTS = ' + repr([[t.get('d', ''), t['expr']] for t in tests]) + '\n' + RUNNER)
                with tempfile.NamedTemporaryFile('w', suffix='.py', delete=False, encoding='utf-8') as fh:
                    fh.write(prog); tmp = fh.name
                try:
                    r = subprocess.run([sys.executable, tmp], capture_output=True, text=True, timeout=30)
                finally:
                    os.unlink(tmp)
                if r.returncode != 0 or not r.stdout.strip():
                    failed += 1
                    problems.append(('CRASH', key, (r.stderr or '').strip().splitlines()[-1:] or ['no output'])); continue
                out = json.loads(r.stdout.strip().splitlines()[-1])
                if out['stage'] == 'missing-module':
                    # A library the browser has through Pyodide but this machine does not.
                    # Counted and named, never silently passed.
                    total -= 1; skipped += 1
                    problems.append(('SKIP no module', key, out['error'])); continue
                if out['stage'] == 'solution':
                    failed += 1
                    problems.append(('SOLUTION RAISED', key, out['error'].strip().splitlines()[-1])); continue
                bad = [x for x in out['results'] if not x[1]]
                if bad:
                    failed += 1
                    for d, _, err in bad:
                        problems.append(('ASSERTION', key, '%s%s' % (d, ' [%s]' % err if err else '')))
                else:
                    passed += 1
                    if verbose:
                        print('  ok  %-10s %d assertion(s)' % (key, len(tests)))
    for kind, key, detail in problems:
        print('%-16s %-12s %s' % (kind, key, detail if isinstance(detail, str) else ' '.join(detail)))
    print('\nexercises=%d run=%d passed=%d failed=%d skipped=%d'
          % (total + skipped, total, passed, failed, skipped))
    if failed:
        sys.exit(1)

if __name__ == '__main__':
    main()

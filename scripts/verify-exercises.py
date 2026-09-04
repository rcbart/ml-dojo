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

# Third-party roots the browser gets from Pyodide but a bare dev machine may not
# have. A missing import is skipped ONLY when the whole absent package is one of
# these. Anything else (a typo, a renamed module, a missing submodule of a package
# that IS installed) is a real defect that reaches the learner as a hard error, so
# it fails here. CI runs `pip install scikit-learn`, so these skips are an artifact
# of the local machine, never a hole in the gate.
OPTIONAL_ROOTS = {'sklearn', 'pandas', 'matplotlib', 'numpy', 'scipy'}
MISSING_RE = re.compile(r"No module named '([^']+)'")

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
    seen = total = passed = failed = skipped = warned = 0
    problems = []
    for s in streams:
        for l in s['lessons']:
            # The app renders lessonExs(l)[0] and nothing else, so a second
            # exercise is content no learner can reach and no one can grade.
            if len(l['exs']) > 1:
                failed += 1
                problems.append(('UNREACHABLE EX', l['id'],
                                 '%d exercises declared, but src/app.js renders lessonExs(l)[0] only, '
                                 'so exercise 2+ is unreachable. Promote it to its own lesson or retire it.'
                                 % len(l['exs'])))
            for i, e in enumerate(l['exs']):
                seen += 1
                key = l['id'] + ('#%d' % i if len(l['exs']) > 1 else '')
                tests = e.get('tests') or []
                if not e.get('solution') or not tests:
                    # Not a skip. With no assertions the browser used to award the
                    # lesson on any Run (0 of 0 checks passed), and with no reference
                    # solution nothing about this exercise is checked at all.
                    failed += 1
                    problems.append(('NO SOLUTION' if not e.get('solution') else 'NO TESTS', key,
                                     'every exercise needs a reference solution and at least one test'))
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
                    m = MISSING_RE.search(out['error'] or '')
                    name = m.group(1) if m else ''
                    # Skip only when an entire optional third-party package is absent
                    # from this machine. A dotted name means the package IS here and
                    # the submodule does not exist, which is a typo or a rename.
                    if name and '.' not in name and name in OPTIONAL_ROOTS:
                        total -= 1; skipped += 1
                        problems.append(('SKIP no module', key, out['error'] + ' (optional here, installed in CI)'))
                    else:
                        failed += 1
                        problems.append(('BAD IMPORT', key, out['error'] + ' -- not an optional package, so this is a broken import'))
                    continue
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
          % (seen, total, passed, failed, skipped))
    if skipped:
        print('skips are optional packages missing on this machine only; CI installs them.')
    if failed:
        sys.exit(1)

if __name__ == '__main__':
    main()

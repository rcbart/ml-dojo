#!/usr/bin/env python3
"""Add per-wrong-answer rebuttals (whyWrong) to MLDojo's inline quizzes.

The other three dojos already carry a whyWrong array parallel to options, so
choosing a wrong answer explains why THAT choice is wrong before explaining the
right one. MLDojo only had a single `why`. This fills the gap.

  python3 scripts/quiz-annotate.py dump <stream-file>   emit questions as JSON
  python3 scripts/quiz-annotate.py apply <patch.json>    write whyWrong arrays
  python3 scripts/quiz-annotate.py bias <N>              worst length-biased questions
  python3 scripts/quiz-annotate.py retext <patch.json>   rewrite individual options

Patch entries are {file, qi, whyWrong:[...]}, where qi is the question index
within the file as reported by dump, and whyWrong runs parallel to options with
an empty string in the correct slot.
"""
import io, json, re, sys, importlib.util

_spec = importlib.util.spec_from_file_location('qs', __file__.replace('quiz-annotate.py', 'quiz-shuffle.py'))
qs = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(qs)

LIT = re.compile(r"^\s*'((?:\\.|[^'])*)'\s*$", re.S)


def unlit(src):
    m = LIT.match(src)
    return m.group(1).replace("\\'", "'").replace('\\\\', '\\') if m else src.strip()


def lit(text):
    return "'" + text.replace('\\', '\\\\').replace("'", "\\'") + "'"


def dump(path):
    src = io.open(path, encoding='utf-8').read()
    out = []
    for qi, (i, end, els, ans_span, ai, key) in enumerate(qs.find_quizzes(src)):
        has = re.compile(r'\s*,?\s*whyWrong:').match(src, re.compile(r'\s*,?\s*answer:\s*\d+').match(src, end).end())
        out.append({'file': path, 'qi': qi, 'q': key, 'answer': ai,
                    'options': [unlit(e) for e in els], 'done': bool(has)})
    print(json.dumps(out, ensure_ascii=False, indent=1))


def bias(n):
    """A correct answer that is conspicuously the longest is answerable without
    knowing the material. Report the worst offenders across every stream."""
    import glob
    RATIO, ABS = 1.4, 20
    rows = []
    for path in sorted(glob.glob('content/streams/*.js')):
        src = io.open(path, encoding='utf-8').read()
        for qi, (i, end, els, ans_span, ai, key) in enumerate(qs.find_quizzes(src)):
            opts = [re.sub(r'<[^>]+>', '', unlit(e)) for e in els]
            if len(opts) < 2:
                continue
            c = len(opts[ai])
            rest = [len(o) for j, o in enumerate(opts) if j != ai]
            mean = sum(rest) / len(rest)
            if c > mean * RATIO and c > mean + ABS:
                rows.append({'file': path, 'qi': qi, 'gap': int(c - mean), 'answer': ai,
                             'q': key, 'options': opts})
    rows.sort(key=lambda r: -r['gap'])
    print(json.dumps(rows[:int(n)], ensure_ascii=False, indent=1))


def retext(patch_path):
    """Apply {file, qi, oi, text} option rewrites in place."""
    patch = json.load(io.open(patch_path, encoding='utf-8'))
    by_file = {}
    for p in patch:
        by_file.setdefault(p['file'], []).append(p)
    for path, items in by_file.items():
        src = io.open(path, encoding='utf-8').read()
        quizzes = list(qs.find_quizzes(src))
        # Group by question first. Several options of the same question share one
        # source span, and applying them as separate edits would overwrite each
        # other and shred the file.
        per_q = {}
        for p in items:
            per_q.setdefault(p['qi'], {})[p['oi']] = p['text']
        edits = []
        for qi, changes in per_q.items():
            i, end, els, ans_span, ai, key = quizzes[qi]
            new = list(els)
            for oi, text in changes.items():
                new[oi] = lit(text)
            edits.append((i, end, '[' + ','.join(new) + ']'))
        for i, end, text in sorted(edits, reverse=True):
            src = src[:i] + text + src[end:]
        io.open(path, 'w', encoding='utf-8').write(src)
        print('%s: %d option(s) rewritten' % (path, len(items)))


def apply(patch_path):
    patch = json.load(io.open(patch_path, encoding='utf-8'))
    by_file = {}
    for p in patch:
        by_file.setdefault(p['file'], []).append(p)
    for path, items in by_file.items():
        src = io.open(path, encoding='utf-8').read()
        quizzes = list(qs.find_quizzes(src))
        edits = []
        for p in items:
            i, end, els, ans_span, ai, key = quizzes[p['qi']]
            ww = p['whyWrong']
            assert len(ww) == len(els), '%s q%d: %d rebuttals for %d options' % (path, p['qi'], len(ww), len(els))
            assert not ww[ai].strip(), '%s q%d: the correct slot must be blank' % (path, p['qi'])
            am = re.compile(r'\s*,?\s*answer:\s*\d+').match(src, end)
            edits.append((am.end(), ',whyWrong:[' + ','.join(lit(w) for w in ww) + ']'))
        for pos, text in sorted(edits, reverse=True):
            src = src[:pos] + text + src[pos:]
        io.open(path, 'w', encoding='utf-8').write(src)
        print('%s: %d question(s) annotated' % (path, len(items)))


if __name__ == '__main__':
    mode, arg = sys.argv[1], sys.argv[2]
    {'dump': dump, 'apply': apply, 'bias': bias, 'retext': retext}[mode](arg)

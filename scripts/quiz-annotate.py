#!/usr/bin/env python3
"""Add per-wrong-answer rebuttals (whyWrong) to MLDojo's inline quizzes.

The other three dojos already carry a whyWrong array parallel to options, so
choosing a wrong answer explains why THAT choice is wrong before explaining the
right one. MLDojo only had a single `why`. This fills the gap.

  python3 scripts/quiz-annotate.py dump <stream-file>   emit questions as JSON
  python3 scripts/quiz-annotate.py apply <patch.json>    write whyWrong arrays

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
    (dump if mode == 'dump' else apply)(arg)

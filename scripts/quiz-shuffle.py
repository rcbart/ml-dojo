#!/usr/bin/env python3
"""Rebalance which slot the correct answer sits in, for MLDojo's inline quizzes.

Same job as the Dev Dojo tool, different storage: MLDojo quizzes live as JS
object literals inside content/streams/*.js rather than in a JSON bank, so this
reorders the source text of each option in place instead of round-tripping
through json. Deterministic (seeded by the question text), so a rerun is a
no-op and the diff stays reviewable.

Left alone: fewer than three options, an "all/none of the above" style option,
or a set of options that is purely numeric and so reads as an ordered scale.

  python3 scripts/quiz-shuffle.py report
  python3 scripts/quiz-shuffle.py apply
"""
import collections, glob, hashlib, io, re, sys

SKIP = re.compile(r'\b(all|none|both|neither) of (the |these )?(above|these|them)\b'
                  r'|\bof the above\b|\bboth [AB1-4] and\b', re.I)
NUMERICISH = re.compile(r"^['\s\d.,%$+\-/x×()]+$")


def h(s):
    return int(hashlib.md5(s.encode('utf-8')).hexdigest(), 16)


def split_array(src, i):
    """src[i] == '['. Return (elements_as_source, index_after_closing_bracket)."""
    assert src[i] == '['
    j, depth, quote, start, out = i + 1, 0, None, i + 1, []
    while j < len(src):
        c = src[j]
        if quote:
            if c == '\\':
                j += 2
                continue
            if c == quote:
                quote = None
        elif c in "'\"`":
            quote = c
        elif c in '[({':
            depth += 1
        elif c in '])}':
            if c == ']' and depth == 0:
                out.append(src[start:j])
                return out, j + 1
            depth -= 1
        elif c == ',' and depth == 0:
            out.append(src[start:j])
            start = j + 1
        j += 1
    raise ValueError('unterminated options array')


QTEXT = re.compile(r"q:\s*(['\"`])((?:\\.|(?!\1).)*)\1", re.S)


def find_quizzes(src):
    """Yield (opts_start, opts_end, elements, ans_span, ans_value, question_text).

    The question text is the stable key: it is what seeds the permutation, so
    reordering the options does not change where the next run puts them."""
    for m in re.finditer(r'options:\s*\[', src):
        i = src.index('[', m.start())
        els, end = split_array(src, i)
        a = re.compile(r'\s*,?\s*answer:\s*(\d+)').match(src, end)
        if not a:
            continue
        qs = [x for x in QTEXT.finditer(src, 0, m.start())]
        key = qs[-1].group(2) if qs else els[0].strip()
        yield i, end, els, (a.start(1), a.end(1)), int(a.group(1)), key


def skippable(els):
    if len(els) < 3:
        return True
    flat = [re.sub(r'<[^>]+>', '', e).strip() for e in els]
    if any(SKIP.search(e) for e in flat):
        return True
    if all(NUMERICISH.match(e) for e in flat if e):
        return True
    return False


def perm(n, ai, key, target):
    rest = [x for x in range(n) if x != ai]
    r = h(key) % len(rest)
    rest = rest[r:] + rest[:r]
    return rest[:target] + [ai] + rest[target:]


def main(mode):
    files = sorted(glob.glob('content/streams/*.js'))
    found = []
    for f in files:
        src = io.open(f, encoding='utf-8').read()
        for i, end, els, ans_span, ai, key in find_quizzes(src):
            if skippable(els):
                continue
            found.append((f, i, end, els, ans_span, ai, key))

    by_n = collections.defaultdict(list)
    for rec in found:
        by_n[len(rec[3])].append(rec[6])
    target = {}
    for n, keys in by_n.items():
        keys = sorted(set(keys), key=h)
        for idx, k in enumerate(keys):
            target[k] = idx % n

    before = collections.Counter()
    after = collections.Counter()
    for f in files:
        src = io.open(f, encoding='utf-8').read()
        edits = []
        for i, end, els, ans_span, ai, key in find_quizzes(src):
            before[ai] += 1
            if skippable(els):
                after[ai] += 1
                continue
            t = target[key]
            order = perm(len(els), ai, key, t)
            edits.append((i, end, ','.join(els[k] for k in order), ans_span, t))
            after[t] += 1
        if mode == 'apply' and edits:
            for i, end, new_arr, ans_span, t in sorted(edits, reverse=True):
                src = src[:ans_span[0]] + str(t) + src[ans_span[1]:]
                src = src[:i] + '[' + new_arr + ']' + src[end:]
            io.open(f, 'w', encoding='utf-8').write(src)

    print('before %s' % dict(sorted(before.items())))
    print('after  %s' % dict(sorted(after.items())))
    print('%d question(s), %d rebalanced, %d left as-is'
          % (sum(before.values()), len(found), sum(before.values()) - len(found)))
    if mode != 'apply':
        print('(report only, nothing written)')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'report')

STREAMS.push({icon:'🎲',track:'Foundations Track',title:'Probability & Statistics',blurb:'From "what does 70% chance even mean?" through distributions and Gaussians, then, on those foundations, Bayesian probability.',requires:'log2',requiresName:'Logarithms & Exponentials',lessons:[
{id:'pr1',
 title:'Fundamentals: what probability is (measure it by simulating)',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>Probability is <b>how often something happens in the long run</b>. "A fair coin is 50%
heads" means: flip it a million times and very close to half will be heads. You don't have to
take that on faith, with Python you can <i>run</i> the million flips and watch the number
settle. That habit, <b>when unsure, simulate</b>, is the working data scientist's secret
weapon, and it's how we'll check every formula in this stream.</p></div>

<h3>Two readings of the same number</h3>
<p>The <b>frequentist</b> reading: probability = long-run frequency (the coin). The
<b>Bayesian</b> reading: probability = <i>degree of belief</i> ("70% chance it rains
tomorrow", tomorrow happens once; the 70% describes your confidence, not a repeat count).
Both are used everywhere in ML; the advanced part of this stream is built on the second.</p>

<div class="notebox"><b>📐 Notation decoder, probability & statistics</b> (met across this
stream; refer back anytime):
<table>
<tr><td>P(A)</td><td>the <b>probability</b> of event A (a number from 0 to 1)</td></tr>
<tr><td>P(A | B)</td><td>the probability of A <b>given</b> B (the "|" reads "given")</td></tr>
<tr><td>P(A, B)</td><td>the <b>joint</b> probability: A <i>and</i> B both happen</td></tr>
<tr><td>E[X]</td><td>the <b>expectation</b> (mean) of X, its long-run average</td></tr>
<tr><td>Var(X), σ²</td><td>the <b>variance</b>, average squared spread</td></tr>
<tr><td>σ (sigma)</td><td>the <b>standard deviation</b>, spread in original units (√variance)</td></tr>
<tr><td>μ (mu)</td><td>the <b>mean</b> of a distribution</td></tr>
<tr><td>X ~ N(μ, σ²)</td><td>"X is <b>distributed as</b>" a normal (Gaussian) with mean μ, variance σ²</td></tr>
<tr><td>∝</td><td>"is <b>proportional to</b>" (shows up in Bayes' rule)</td></tr>
<tr><td>argmax</td><td>the value that <b>maximizes</b> something (MLE finds parameters this way)</td></tr>
</table>
Note the collision to keep straight: σ (sigma, lower-case) is standard deviation here, while Σ
(Sigma, capital) was summation in the notation stream, same letter, different jobs.</div>

<h3>Expectation and variance: the two numbers that summarize randomness</h3>
<p>The <b>expectation</b> (mean) is the long-run average: a die averages
(1+2+…+6)/6 = <b>3.5</b>, a value it never actually shows, but where the average settles.
The <b>variance</b> measures <i>spread</i>: the average of the <b>squared</b> distances from
the mean. Squared, remember why from the MSE story: so over- and under-shoots don't cancel,
and big misses count more. A die's variance is exactly <b>35/12 ≈ 2.92</b>, and your
simulation will land right on it.</p>
<div class="codeSample">import random
rolls = [random.randint(1, 6) for _ in range(100_000)]
mean = sum(rolls) / len(rolls)                          # ≈ 3.5
var  = sum((r - mean)**2 for r in rolls) / len(rolls)   # ≈ 2.92</div>

<div class="demystify"><b>Demystify "expectation":</b> nothing is being "expected" in the
everyday sense, a die never rolls 3.5. It's just the long-run average, and the name stuck
(from 17th-century gambling math). Same for "variance": it's simply "average squared distance
from the mean", spread, measured in a way that will feed the math later.</div>`,
 docs:[['Seeing Theory (a visual intro to probability)','https://seeing-theory.brown.edu/']],
 quiz:{title:'Quick check',questions:[
   {q:'"This coin is 50% heads" means, in the frequentist reading:',
    options:['A head is worth half a point when the outcomes are scored','Every second flip comes up heads, alternating down the sequence','The coin remembers its last flip and balances the next one','Over many flips, the fraction of heads settles toward one half'],answer:3,whyWrong:['Probability is not a payout. It says how often, not how much.','Strict alternation would be a pattern you could bet against, and it is not what randomness looks like.','Coins have no memory. Each flip is independent of everything before it.',''],
    why:'Probability = long-run frequency. Any short run can wobble; the fraction converges as flips accumulate.'},
   {q:'The expectation of a fair die is 3.5. Why is that not absurd, given no face shows 3.5?',
    options:['The true expectation is 3 or 4, and 3.5 is a rounding halfway between them','An expectation is a long-run average, not a value that has to occur','Dice do have a 3.5 face, on the versions used in probability','It is absurd, and the definition of expectation is misleading here'],answer:1,whyWrong:['Nothing was rounded. 3.5 is the exact average of 1 through 6.','','A standard die has faces 1 through 6 and nothing in between.','It is standard and correct. An average need not be an attainable value, and 2.4 children is the same idea.'],
    why:'Expectation is where the running average settles over many rolls, it need not be a possible outcome.'},
   {q:'Variance uses SQUARED distances from the mean because:',
    options:['Positive and negative deviations would otherwise cancel out','It is a convention, and absolute deviation would do just as well','It produces a smaller number, which is easier to compare across datasets','Squares are simpler to write than absolute values are'],answer:0,whyWrong:['','There is a reason, and taking the square root at the end recovers the original units.','Squaring makes the number larger, not smaller.','Absolute values are just as easy to write, and they are a real alternative with different properties.'],
    why:'Same logic as MSE: kill the cancellation, weight large deviations more, and keep the math smooth for what comes later.'}
 ]},
 exs:[{title:'Simulate a die: watch the mean and variance settle',
   lang:'python',
   prompt:`Simulate <code>100_000</code> rolls of a fair die with <code>random.randint(1, 6)</code>
   (the seed is fixed for you so results are reproducible):
   <ol>
   <li><code>rolls</code>, the list of 100,000 rolls,</li>
   <li><code>mean</code>, their average (should land within 0.05 of <b>3.5</b>),</li>
   <li><code>var</code>, the average of squared distances from the mean (within 0.1 of <b>35/12 ≈ 2.917</b>),</li>
   <li><code>p_six</code>, the fraction of rolls that are 6 (within 0.01 of <b>1/6 ≈ 0.167</b>).</li>
   </ol>`,
   starter:`import random
random.seed(42)          # fixed so your numbers are reproducible

# 1) 100,000 rolls of a fair die
rolls =

# 2) The long-run average: expectation
mean =

# 3) Average SQUARED distance from the mean: variance
var =

# 4) Fraction of rolls that are 6
p_six =

print(mean, var, p_six)
`,
   solution:`import random
random.seed(42)          # fixed so your numbers are reproducible

# 1) 100,000 rolls of a fair die
rolls = [random.randint(1, 6) for _ in range(100_000)]

# 2) The long-run average: expectation
mean = sum(rolls) / len(rolls)

# 3) Average SQUARED distance from the mean: variance
var = sum((r - mean) ** 2 for r in rolls) / len(rolls)

# 4) Fraction of rolls that are 6
p_six = sum(1 for r in rolls if r == 6) / len(rolls)

print(mean, var, p_six)
`,
   tests:[
     {d:'100,000 rolls, all between 1 and 6',expr:'len(rolls) == 100000 and min(rolls) >= 1 and max(rolls) <= 6'},
     {d:'mean settles near 3.5 (the expectation)',expr:'abs(mean - 3.5) < 0.05'},
     {d:'variance settles near 35/12 ≈ 2.917',expr:'abs(var - 35/12) < 0.1'},
     {d:'P(six) settles near 1/6',expr:'abs(p_six - 1/6) < 0.01'}
   ],
   hints:[
     'Build the rolls with a comprehension: [random.randint(1, 6) for _ in range(100_000)].',
     'mean = sum(rolls) / len(rolls); var = sum((r - mean)**2 for r in rolls) / len(rolls).',
     'Count sixes with sum(1 for r in rolls if r == 6), then divide by len(rolls).'
   ]}]},

{id:'st1',
 title:'Fundamentals: descriptive statistics, summarizing data beyond the mean',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>Before modeling anything, you <b>describe</b> your data, and the mean alone lies. One
billionaire in a room of ten people makes the <i>average</i> wealth enormous while nine people
are broke. Descriptive statistics are the small set of numbers that summarize a dataset
faithfully; reaching for them is the first move in every real ML project (exploratory data
analysis), and choosing the right one is a mark of competence.</p></div>

<h3>Middle: mean vs median vs mode</h3>
<p><b>Mean</b>, the average (sum ÷ count); sensitive to extreme values. <b>Median</b>, the
middle value when sorted; <i>robust</i>, the billionaire barely moves it. <b>Mode</b>, the
most common value. On <code>[1, 2, 2, 3, 100]</code>: mean ≈ 21.6 (dragged up by 100),
median = 2 (unbothered), mode = 2. When mean and median diverge, your data is <b>skewed</b>, and
the mean is pulled toward the long tail. (Recognize the pair? Squared error lands on the mean,
absolute error on the median, the MSE-vs-MAE robustness story, in statistics form.)</p>

<h3>Spread: range, percentiles, and the IQR</h3>
<p><b>Range</b> = max − min (crude; one outlier ruins it). Far better: <b>percentiles</b>. The
<code>p</code>-th percentile is the value below which <code>p%</code> of the data falls. Three
matter most, the <b>quartiles</b>: <b>Q1</b> (25th percentile), <b>Q2</b> (50th = the median),
<b>Q3</b> (75th). The <b>interquartile range IQR = Q3 − Q1</b> is the spread of the middle
50%, a robust measure of "how spread out," ignoring the extremes. The standard outlier rule
(the whiskers of a box plot): anything below <code>Q1 − 1.5·IQR</code> or above
<code>Q3 + 1.5·IQR</code> is flagged as an outlier.</p>

<div class="demystify"><b>Demystify "robust":</b> a statistic is robust if a few weird values
barely change it. The median and IQR are robust; the mean, range, and standard deviation are
not. In real, messy ML data (which always has a few garbage rows), robust summaries tell you
the truth while the mean quietly misleads, which is exactly why box plots and medians are the
data scientist's default first look.</div>`,
 docs:[['Descriptive statistics (an overview)','https://www.scribbr.com/statistics/descriptive-statistics/']],
 quiz:{title:'Quick check',questions:[
   {q:'On the data [1, 2, 2, 3, 100], the mean is ~21.6 but the median is 2. This tells you:',
    options:['The median is wrong, because it ignores four fifths of the values','The data is skewed, and one extreme value is dragging the mean','The mode is 100, since that is the value furthest from the median','Nothing useful, since two summaries of the same data will always differ'],answer:1,whyWrong:['The median is exactly right. It is the mean that is being dragged.','','The mode is 2, the value that appears twice.','The gap between them is one of the most useful signals in exploratory work.'],
    why:'Mean is sensitive to outliers, median is robust. A large gap between them signals skew and warns you not to trust the mean alone.'},
   {q:'The interquartile range (IQR) is:',
    options:['Q3 minus Q1, the spread of the middle half of the data','The average of all the values in the dataset','The maximum minus the minimum, the full extent of the data','The most common value in the dataset'],answer:0,whyWrong:['','That is the mean, which is a center rather than a spread.','That is the range, and a single outlier can inflate it without limit.','That is the mode.'],
    why:'IQR ignores the extreme quarters, so a few outliers do not distort it, unlike the range or standard deviation.'},
   {q:'Why do data scientists reach for the median and IQR first on real data?',
    options:['They keep telling the truth when outliers are present','They are required by reporting standards in most industries','They only become reliable once the dataset is large','They are cheaper to compute than the mean and the range'],answer:0,whyWrong:['','No law is involved. It is a judgement about which summary survives dirty data.','They work at any size, and on small samples the difference is often starkest.','The mean is the cheaper computation. Robustness is what earns the median its place.'],
    why:'Robustness. The first look at messy data should not be fooled by a handful of extreme or erroneous values.'}
 ]},
 exs:[{title:'Robust vs sensitive, summarize data with an outlier',
   lang:'python',
   packages:['numpy'],
   prompt:`Salaries (thousands), with one outlier: <code>data = [30, 35, 40, 45, 50, 500]</code>:
   <ol>
   <li><code>mean</code>, the average (use <code>np.mean</code>; ≈ 116.7, dragged up by 500),</li>
   <li><code>median</code>, the middle (<code>np.median</code>; 42.5, barely affected),</li>
   <li><code>q1, q3</code>, the 25th and 75th percentiles (<code>np.percentile(data, 25)</code> and <code>75</code>),</li>
   <li><code>iqr</code>, <code>q3 - q1</code>,</li>
   <li><code>mean_beats_median</code>, <code>True</code> if <code>mean &gt; 2 * median</code> (showing how far the outlier dragged the mean).</li>
   </ol>`,
   starter:`import numpy as np

data = [30, 35, 40, 45, 50, 500]

mean = np.mean(data)
median = np.median(data)

# 25th and 75th percentiles
q1 =
q3 =

# interquartile range
iqr =

# did the outlier drag the mean way above the median?
mean_beats_median =

print(mean, median, q1, q3, iqr, mean_beats_median)
`,
   solution:`import numpy as np

data = [30, 35, 40, 45, 50, 500]

mean = np.mean(data)
median = np.median(data)

# 25th and 75th percentiles
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)

# interquartile range
iqr = q3 - q1

# did the outlier drag the mean way above the median?
mean_beats_median = mean > 2 * median

print(mean, median, q1, q3, iqr, mean_beats_median)
`,
   tests:[
     {d:'mean is dragged up near 116.7 by the outlier',expr:'abs(mean - 116.6667) < 0.1'},
     {d:'median stays robust at 42.5',expr:'abs(median - 42.5) < 1e-9'},
     {d:'quartiles: Q1 ≈ 36.25, Q3 ≈ 48.75',expr:'abs(q1 - 36.25) < 0.5 and abs(q3 - 48.75) < 0.5'},
     {d:'IQR = Q3 − Q1 (robust spread)',expr:'abs(iqr - (q3 - q1)) < 1e-9'},
     {d:'the mean is more than double the median, the outlier’s fingerprint',expr:'mean_beats_median == True'}
   ],
   hints:[
     'np.mean and np.median are one call each. Notice how different they are, that gap IS the outlier.',
     'np.percentile(data, 25) and np.percentile(data, 75) give the quartiles; iqr = q3 - q1.',
     'mean_beats_median = mean > 2 * median, the mean (~117) is far above twice the median (85), because 500 pulls it.'
   ]}]},

{id:'ct1',
 title:'Fundamentals: counting, permutations, combinations, and where the binomial comes from',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>Probability of equally-likely outcomes is <b>favorable ÷ total</b>, so you have to
<i>count</i> outcomes, and outcomes explode fast. <b>Combinatorics</b> is the art of counting
without listing, and it is the missing piece behind the binomial distribution, the
"n-choose-k" you see in formulas, and a lot of probability reasoning.</p></div>

<h3>The foundation: the fundamental counting principle</h3>
<p>Everything in this lesson is built from one rule, and it is common sense: <b>if one choice
can be made in <code>m</code> ways and a second (independent) choice in <code>n</code> ways,
then the two together can be made in <code>m × n</code> ways.</b> Three shirts and four pants
give <code>3 × 4 = 12</code> outfits. It chains across any number of stages, just multiply the
number of options at each stage. That single "multiply the options" idea generates every
formula below; if you ever forget a formula, you can rebuild it from here.</p>

<h3>Factorials: the counting principle applied to arranging</h3>
<p>How many ways to arrange <code>n</code> distinct items in a row? <code>n</code> choices for
the first slot, <code>(n−1)</code> for the next (one is used up), and so on down to 1.
Multiply them all by the counting principle. That product is the <b>factorial</b>:
<code>n! = n × (n−1) × … × 2 × 1</code>. So <code>5! = 120</code>. One convention worth knowing:
<code>0! = 1</code> (there is exactly one way to arrange nothing). Factorials are the raw
material of permutations and combinations.</p>

<h3>Two quick probability rules</h3>
<p><b>Complement:</b> <code>P(not A) = 1 − P(A)</code>, often the easy way in ("at least one"
= 1 − "none"). <b>Addition rule:</b> <code>P(A or B) = P(A) + P(B) − P(A and B)</code>, add
the two, then subtract the overlap you double-counted (if they can't both happen, the overlap
is 0 and you just add).</p>

<h3>Permutations: order matters</h3>
<p>How many ways to arrange things when <b>order counts</b>? For <code>n</code> distinct items
in <code>k</code> slots: <code>n × (n−1) × … </code> for <code>k</code> factors, written
<code>n! / (n−k)!</code>. The <b>factorial</b> <code>n! = n×(n−1)×…×1</code> counts full
arrangements (5! = 120 ways to order 5 books). Example: how many 3-letter codes from 5 distinct
letters, no repeats? <code>5 × 4 × 3 = 60</code>.</p>

<h3>Combinations: order does NOT matter</h3>
<p>When picking a <i>group</i> where order is irrelevant (a committee, or <i>which</i> flips
came up heads), use <b>combinations</b>, "<b>n choose k</b>":</p>
<div class="codeSample">C(n, k) = n! / ( k! · (n−k)! )      "n choose k"      (Python: math.comb(n, k))</div>
<p>Example: how many ways to choose 2 people from 4? <code>C(4,2) = 6</code>. The link to ML
and probability: the number of ways to get <b>k heads in n coin flips</b> is exactly
<code>C(n, k)</code>, which is the counting factor in the <b>binomial distribution</b> you met
by shape in the distributions lesson. That is <i>why</i> the middle outcomes (many ways to
arrange them) are more likely than the extremes (only one way to get all-heads).</p>

<div class="demystify"><b>Demystify "n choose k":</b> it just answers "how many different
groups of <code>k</code> can I pick from <code>n</code>?", nothing more. Permutations count
arrangements (order matters); combinations count selections (order does not). Mixing them up is
the classic counting mistake; the tell is the word "arrange/order" (permutation) vs
"choose/select/group" (combination).</div>`,
 docs:[['Permutations and combinations','https://www.mathsisfun.com/combinatorics/combinations-permutations.html'],['Python math.comb / math.perm','https://docs.python.org/3/library/math.html#math.comb']],
 quiz:{title:'Quick check',questions:[
   {q:'The fundamental counting principle says that 3 shirts and 4 pants give how many outfits?',
    options:['12, three shirts times four pairs of trousers','1, since you can only wear one outfit at a time','7, adding the two counts together','It depends on which shirts go with which trousers'],answer:0,whyWrong:['','One outfit would mean the choices were fixed rather than free.','Adding counts the garments. Multiplying counts the combinations.','It does not depend on anything here. Every shirt can go with every pair of trousers.'],
    why:'Independent choices multiply: m ways × n ways = m×n combined. This one rule generates factorials, permutations, and combinations.'},
   {q:'The difference between a permutation and a combination is:',
    options:['Combinations are only defined when you are choosing exactly two items','Nothing, they are two names for the same count','Permutations count arrangements, combinations count selections','Permutations always produce the larger number of the two'],answer:2,whyWrong:['Combinations work for any k. The formula has no such restriction.','There is a real difference, and mixing them up is one of the commonest counting errors.','','They are bigger for the same n and k, and that is a consequence rather than the definition.'],
    why:'Order is the whole distinction. "Arrange/order" → permutation; "choose/group/select" → combination.'},
   {q:'"n choose k", written C(n, k), answers:',
    options:['n raised to the power k, one choice per position','Whichever of n and k is the larger of the two','How many different groups of k can be picked from n','n multiplied by k, one choice for each item selected'],answer:2,whyWrong:['That counts sequences with repetition allowed, which is a different question.','Comparing sizes has nothing to do with counting selections.','','Multiplying gives you pairs from two separate sets, not subsets of one.'],
    why:'C(n,k) = n!/(k!(n−k)!) counts unordered selections. It is the counting factor in the binomial distribution.'},
   {q:'The number of ways to get exactly k heads in n coin flips is:',
    options:['C(n, k), the number of ways to choose which flips came up heads','k / n, the proportion of the flips that need to be heads','n × k, one choice per flip multiplied by the heads required','Always 1, since each outcome of n flips happens in exactly one way'],answer:0,whyWrong:['','That is a proportion between zero and one. The question asks for a count of arrangements.','Multiplying does not describe how the heads can be positioned among the flips.','Exactly one arrangement gives all heads or all tails. Every count in between has many.'],
    why:'There are C(n,k) arrangements of k heads among n flips. All-heads has only C(n,n)=1 way; that is why extremes are rare.'}
 ]},
 exs:[{title:'Count it, factorials, choices, and the binomial coefficient',
   lang:'python',
   prompt:`Use Python's <code>math</code> module (<code>math.factorial</code>,
   <code>math.comb</code>, <code>math.perm</code>):
   <ol>
   <li><code>outfits</code>, by the counting principle, 3 shirts × 4 pants (12),</li>
   <li><code>arrangements</code>, how many ways to order 5 books (<code>5!</code> = 120),</li>
   <li><code>codes</code>, 3-letter codes from 5 distinct letters, no repeats, order matters (<code>math.perm(5, 3)</code> = 60),</li>
   <li><code>committees</code>, ways to choose 2 people from 4 (<code>math.comb(4, 2)</code> = 6),</li>
   <li><code>ways_2_heads</code>, number of ways to get exactly 2 heads in 4 flips (also <code>math.comb(4, 2)</code>),</li>
   <li><code>p_2_heads</code>, its probability: <code>ways_2_heads / 2**4</code> (there are 2⁴ = 16 equally likely flip sequences → 0.375).</li>
   </ol>`,
   starter:`import math

outfits =                # 3 shirts x 4 pants (counting principle)
arrangements =           # 5!
codes =                  # perm(5, 3): order matters, no repeats
committees =             # comb(4, 2): choose 2 of 4
ways_2_heads =           # comb(4, 2): 2 heads among 4 flips
p_2_heads =              # ways / total sequences (2**4)

print(outfits, arrangements, codes, committees, ways_2_heads, p_2_heads)
`,
   solution:`import math

outfits = 3 * 4                      # 3 shirts x 4 pants (counting principle)
arrangements = math.factorial(5)     # 5!
codes = math.perm(5, 3)              # perm(5, 3): order matters, no repeats
committees = math.comb(4, 2)         # comb(4, 2): choose 2 of 4
ways_2_heads = math.comb(4, 2)       # comb(4, 2): 2 heads among 4 flips
p_2_heads = ways_2_heads / 2**4      # ways / total sequences (2**4)

print(outfits, arrangements, codes, committees, ways_2_heads, p_2_heads)
`,
   tests:[
     {d:'3 × 4 = 12 outfits (fundamental counting principle)',expr:'outfits == 12'},
     {d:'5! = 120 arrangements of 5 books',expr:'arrangements == 120'},
     {d:'perm(5,3) = 60 ordered codes',expr:'codes == 60'},
     {d:'comb(4,2) = 6 committees',expr:'committees == 6'},
     {d:'6 ways to get 2 heads in 4 flips',expr:'ways_2_heads == 6'},
     {d:'P(exactly 2 heads in 4 flips) = 6/16 = 0.375',expr:'abs(p_2_heads - 0.375) < 1e-9'}
   ],
   hints:[
     'math.factorial(5) is 120. math.perm(5, 3) counts ordered selections (60).',
     'math.comb(4, 2) counts unordered selections (6), and that is exactly the number of ways to place 2 heads among 4 flips.',
     'There are 2**4 = 16 equally likely head/tail sequences of length 4, so P(2 heads) = 6/16 = 0.375.'
   ]}]},

{id:'pr2',
 title:'Fundamentals: distributions: PMF, PDF, and why the Gaussian is everywhere',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>A <b>distribution</b> is the full "shape of the randomness", not just the average, but how
probability spreads over the outcomes. Meet the vocabulary word by word, because two letters
trip everyone: PMF and PDF.</p></div>

<h3>PMF: countable outcomes</h3>
<p>When outcomes can be listed (a die: 1–6), a <b>PMF</b> (probability <i>mass</i> function)
just assigns each outcome its probability: P(4) = 1/6. The bars sum to 1. Simple.</p>

<h3>PDF: continuous outcomes (the trap)</h3>
<p>Heights, weights, and errors are <b>continuous</b>, between any two values lie infinitely
many more. So the chance of being <i>exactly</i> 178.000000…cm is <b>zero</b>, and yet heights
obviously cluster around some typical value. The fix: a <b>PDF</b> (probability
<i>density</i> function) describes how <i>dense</i> probability is near each value, and real
probabilities are <b>areas under the curve</b> over a <i>range</i>: P(170 ≤ height ≤ 180) =
the area between 170 and 180. Density can even exceed 1, only areas must behave.</p>

<h3>The Gaussian: the bell everyone means by "normal"</h3>
<p>One continuous shape dominates nature and ML: the <b>normal (Gaussian)</b>, the bell
curve. Two knobs describe it completely: the <b>mean</b> (where the peak sits) and the
<b>standard deviation</b> (how wide the bell spreads). Why is it everywhere? The
<b>central limit theorem</b>, in plain words: <i>add up many small independent effects and
the total is bell-shaped, almost no matter what the pieces look like</i>. Heights (many genes
+ many environmental nudges), measurement errors, sums of dice, all Gaussian. You'll prove it
yourself in the exercise: single die rolls are flat (uniform), but the <b>sum of ten dice</b>
piles up into a bell. Flat pieces, bell total, that's the CLT happening in your own data.</p>

<div class="demystify"><b>Demystify "normal":</b> the name doesn't mean other distributions are
abnormal, it's a historical label (from "the normal law of errors"). And the famous
"68% within one standard deviation" isn't a mystical rule; it's just the area under the bell
between −1σ and +1σ.</div>`,
 docs:[['Seeing Theory (distributions)','https://seeing-theory.brown.edu/probability-distributions/index.html']],
 quiz:{title:'Quick check',questions:[
   {q:'For a continuous quantity like height, P(height is EXACTLY 178.000000 cm) is:',
    options:['About 68%, the share falling within one standard deviation','Equal to the height of the density curve at 178, read off the y-axis','One in six, the same as any single outcome of a die','Zero, since probability lives in ranges as areas under the curve'],answer:3,whyWrong:['68% is the share within one standard deviation, which is a range rather than a point.','The density at a point is not a probability, and it can exceed one.','One in six is a fair die. Heights are continuous.',''],
    why:'Infinitely many values means any exact one has probability zero. The PDF gives density; area over a range gives probability.'},
   {q:'A Gaussian is completely described by:',
    options:['Its mean, where the peak sits, and its standard deviation','Its total area, which varies from one Gaussian to another','Its first ten samples, which pin down the shape','Its minimum and its maximum, the range it covers'],answer:0,whyWrong:['','The area is always exactly one, for every Gaussian. That is what makes it a density.','Samples estimate the parameters. They are not the description.','A Gaussian has no minimum or maximum. Its tails go on forever.'],
    why:'Two numbers pin the whole bell: location and spread. (The area under any PDF is always exactly 1.)'},
   {q:'Why does the sum of ten dice look bell-shaped when a single die is flat?',
    options:['Dice are Gaussian already, and a single die only looks flat','It is an artifact of how the histogram bins were chosen','Only weighted dice do this, since their faces are unequally likely to come up','The central limit theorem: sums of many independent pieces go bell-shaped'],answer:3,whyWrong:['A single die is flat, which is as far from Gaussian as a distribution gets.','Plot it yourself and the shape appears. Nothing about the rendering causes it.','Fair dice do it just as clearly. Weighting is not required.',''],
    why:'That is the CLT, and it is why the Gaussian shows up wherever many small effects add: heights, noise, measurement error.'}
 ]},
 exs:[{title:'Watch the bell emerge: the central limit theorem by hand',
   lang:'python',
   prompt:`Show the CLT with dice (seed fixed):
   <ol>
   <li><code>sums</code>, 20,000 samples, each the <b>sum of 10 dice</b> (each die <code>random.randint(1, 6)</code>),</li>
   <li><code>mean</code>, the average of the sums (should land near <b>35</b> = 10 × 3.5),</li>
   <li><code>middle</code>, the fraction of sums between 30 and 40 inclusive (the fat middle of the bell, should exceed 0.6),</li>
   <li><code>extreme</code>, the fraction of sums ≤ 14 or ≥ 56 (the thin tails, should be below 0.001; a flat distribution would put far more out there).</li>
   </ol>
   Middle fat, tails thin, a bell, built from flat pieces.`,
   starter:`import random
random.seed(7)

# 1) 20,000 sums of 10 dice each
sums =

# 2) Their average: near 10 * 3.5 = 35
mean =

# 3) Fraction between 30 and 40 inclusive: the fat middle
middle =

# 4) Fraction <= 14 or >= 56: the starved tails
extreme =

print(mean, middle, extreme)
`,
   solution:`import random
random.seed(7)

# 1) 20,000 sums of 10 dice each
sums = [sum(random.randint(1, 6) for _ in range(10)) for _ in range(20_000)]

# 2) Their average: near 10 * 3.5 = 35
mean = sum(sums) / len(sums)

# 3) Fraction between 30 and 40 inclusive: the fat middle
middle = sum(1 for s in sums if 30 <= s <= 40) / len(sums)

# 4) Fraction <= 14 or >= 56: the starved tails
extreme = sum(1 for s in sums if s <= 14 or s >= 56) / len(sums)

print(mean, middle, extreme)
`,
   tests:[
     {d:'20,000 sums, each between 10 and 60',expr:'len(sums) == 20000 and min(sums) >= 10 and max(sums) <= 60'},
     {d:'mean lands near 35',expr:'abs(mean - 35) < 0.5'},
     {d:'the middle (30–40) holds most of the probability',expr:'middle > 0.6'},
     {d:'the tails are nearly empty, the bell, not a flat line',expr:'extreme < 0.001'}
   ],
   hints:[
     'One sample is sum(random.randint(1, 6) for _ in range(10)); wrap that in a comprehension for 20,000 samples.',
     'middle: count sums s with 30 <= s <= 40, divide by len(sums).',
     'extreme: count s <= 14 or s >= 56. If the pieces were NOT summed (one die), these bins would hold plenty, summing is what starves the tails and fattens the middle.'
   ]}]},

{id:'pr4',
 title:'Fundamentals: conditional probability & independence, when knowledge changes the odds',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p><b>Conditional probability</b> answers: <i>"given what I now know, what are the odds?"</i>
P(rain | wet street), the chance of rain <i>given</i> the street is wet, is very different
from P(rain) alone. Written <code>P(A | B)</code>, said "probability of A given B." Every
spam filter, medical test, and recommender is computing conditionals: P(spam | contains
"free money"), P(disease | positive test), P(you like this movie | you liked those).</p></div>

<h3>Computing it: just narrow the world</h3>
<p>P(A | B) = look ONLY at the cases where B happened, and ask what fraction of those also
have A. As a formula: <code>P(A|B) = P(A and B) / P(B)</code>, but the "narrow the world,
then count" reading is the one to keep. In a simulation it is literally a filter followed by
a fraction, which is exactly what you will run.</p>

<h3>Independence: when knowledge changes nothing</h3>
<p>A and B are <b>independent</b> when knowing B tells you nothing about A:
<code>P(A | B) = P(A)</code>, equivalently <code>P(A and B) = P(A)·P(B)</code>. Two dice are
independent, the first die does not care what the second shows. But the first die and
<i>the sum</i> are NOT independent: learn the first is a 3 and the odds of "sum = 8" move
from 5/36 to 1/6. Same world, new knowledge, new odds, that movement is the whole subject.</p>

<div class="demystify"><b>Demystify the "|":</b> the vertical bar is not division, it reads
"given." P(A|B) is a different <i>question</i> than P(A), asked in a world narrowed to B.
Mixing up P(A|B) with P(B|A) is the most consequential confusion in applied probability
(a test\u0027s accuracy P(+|sick) is NOT your risk P(sick|+), next lesson turns exactly
this into the famous 9%).</div>

<div class="hardidea">🧠 <b>Why ML cares so much:</b> assuming independence when it is false is
one of the great silent model-killers (two correlated features double-counted as if they were
separate evidence). And the one assumption that makes Naive Bayes "naive" is, precisely,
conditional independence of features. You are one lesson away from seeing it exploited.</div>`,
 docs:[['Seeing Theory (conditional probability)','https://seeing-theory.brown.edu/compound-probability/index.html']],
 quiz:{title:'Quick check',questions:[
   {q:'P(A | B) means:',
    options:['The probability of A in a world narrowed to the cases where B happened','The probability of B given A, the same quantity written differently','The probability that A and B both occur, taken over the whole sample space','P(A) divided by P(B), the ratio of the two separate probabilities'],answer:0,whyWrong:['','The order matters. P(A|B) and P(B|A) are different numbers, as the disease example shows.','That is P(A and B), which appears in the definition rather than being the definition.','That is the formula for P(A and B) divided by P(B), and writing it as P(A)/P(B) drops the joint term.'],
    why:'The bar reads "given": filter to B\u0027s cases, then ask how often A holds there.'},
   {q:'Two events are independent exactly when:',
    options:['Both of them are outcomes of rolling dice or flipping coins','They cannot both happen at once, so one of them rules the other out entirely','They have the same probability of occurring','Knowing one changes nothing about the other, so P(A and B) = P(A)P(B)'],answer:3,whyWrong:['Dice are one example. Independence is a property of any two events.','That is mutual exclusivity, which is close to the opposite. If they cannot both happen, one tells you a great deal about the other.','Equal probability says nothing about whether they inform each other.',''],
    why:'Independence = knowledge of B is worthless for predicting A. The product rule is the same statement in multiplication form.'},
   {q:'A test is 99% accurate: P(positive | sick) = 0.99. Is that the same as P(sick | positive)?',
    options:['Yes, provided the test is sensitive enough to be worth its cost','Yes, since both describe the same joint probability from either side','Only for blood tests, where the two error rates happen to match','No, they ask different questions and can differ enormously'],answer:3,whyWrong:['Price has no bearing on it. The gap comes from how rare the condition is.','They are equal only in special circumstances, and a rare disease is exactly where they diverge.','It applies to any test for anything, medical or otherwise.',''],
    why:'Reversing a conditional is the base-rate trap. Bayes\u0027 theorem (next lesson) is the correct way to flip the bar.'}
 ]},
 exs:[{title:'Watch knowledge move the odds, two dice, simulated',
   lang:'python',
   prompt:`Simulate <code>100_000</code> rolls of TWO dice (seed fixed). Compute:
   <ol>
   <li><code>p_sum8</code>: P(sum = 8) (expect ≈ 5/36 ≈ 0.139),</li>
   <li><code>p_sum8_given_first3</code>, P(sum = 8 | first die = 3): filter to first-die-3 rolls, then the fraction with sum 8 (expect ≈ 1/6 ≈ 0.167, knowledge moved the odds!),</li>
   <li><code>p_first_even</code>, <code>p_both_even</code>: P(first even) and P(both even),</li>
   <li><code>indep_gap</code>, <code>abs(p_both_even − p_first_even * 0.5)</code>, near 0, because the dice ARE independent (product rule holds).</li>
   </ol>`,
   starter:`import random
random.seed(11)

rolls = [(random.randint(1, 6), random.randint(1, 6)) for _ in range(100_000)]

# 1) P(sum = 8) across all rolls
p_sum8 =

# 2) P(sum = 8 GIVEN first = 3): narrow the world, then count
first3 = [r for r in rolls if r[0] == 3]
p_sum8_given_first3 =

# 3) P(first even) and P(both even)
p_first_even =
p_both_even =

# 4) Independence check: both-even should equal first-even * 1/2
indep_gap =

print(p_sum8, p_sum8_given_first3, indep_gap)
`,
   solution:`import random
random.seed(11)

rolls = [(random.randint(1, 6), random.randint(1, 6)) for _ in range(100_000)]

# 1) P(sum = 8) across all rolls
p_sum8 = sum(1 for a, b in rolls if a + b == 8) / len(rolls)

# 2) P(sum = 8 GIVEN first = 3): narrow the world, then count
first3 = [r for r in rolls if r[0] == 3]
p_sum8_given_first3 = sum(1 for a, b in first3 if a + b == 8) / len(first3)

# 3) P(first even) and P(both even)
p_first_even = sum(1 for a, b in rolls if a % 2 == 0) / len(rolls)
p_both_even = sum(1 for a, b in rolls if a % 2 == 0 and b % 2 == 0) / len(rolls)

# 4) Independence check: both-even should equal first-even * 1/2
indep_gap = abs(p_both_even - p_first_even * 0.5)

print(p_sum8, p_sum8_given_first3, indep_gap)
`,
   tests:[
     {d:'P(sum=8) ≈ 5/36',expr:'abs(p_sum8 - 5/36) < 0.01'},
     {d:'P(sum=8 | first=3) ≈ 1/6, conditioning MOVED the odds',expr:'abs(p_sum8_given_first3 - 1/6) < 0.02'},
     {d:'the two probabilities really differ (dependence detected)',expr:'p_sum8_given_first3 - p_sum8 > 0.01'},
     {d:'P(both even) ≈ P(first even) × 1/2, the dice are independent',expr:'indep_gap < 0.01'}
   ],
   hints:[
     'p_sum8: count rolls where a + b == 8, divide by all 100,000.',
     'The conditional is the SAME computation inside the narrowed list first3, filter, then fraction. That filter IS the "given".',
     'For independence: p_both_even should sit within noise of p_first_even * 0.5, the product rule, observed in your own data.'
   ]}],
 homework:{problems:[
   {q:`<b>1.</b> A standard deck has 52 cards, 4 of them kings. You draw one card. What is <code>P(king)</code>? Now you are told the card is a "face card" (J, Q, K, 12 of them). What is <code>P(king | face card)</code>?`,
    solution:`<code>P(king) = 4/52 = 1/13 ≈ 0.077</code>.<br>
    Given it is a face card, <b>narrow the world</b> to the 12 face cards; 4 of those are kings:<br>
    <code>P(king | face card) = 4/12 = 1/3 ≈ 0.333</code>.<br>
    Knowing "face card" more than quadrupled the probability, that is conditioning: information shrinks the sample space and changes the odds.`},
   {q:`<b>2. (Multiplication rule)</b> You draw two cards without replacing the first. Using <code>P(A and B) = P(A) · P(B | A)</code>, find the probability both are kings.`,
    solution:`<code>P(first king) = 4/52</code>. After removing a king, 3 kings remain in 51 cards, so <code>P(second king | first king) = 3/51</code>.<br>
    <code>P(both kings) = (4/52) · (3/51) = 12/2652 = 1/221 ≈ 0.0045</code>.<br>
    This multiplication rule, join two events by conditioning the second on the first, is exactly Step 2 in the derivation of Bayes' rule.`},
   {q:`<b>3. (Independence check)</b> Are "the first card is a king" and "the second card is a king" (drawn without replacement) independent? Show it with numbers.`,
    solution:`Independent would require <code>P(second king | first king) = P(second king)</code>.<br>
    But <code>P(second king | first king) = 3/51 ≈ 0.0588</code>, while <code>P(second king)</code> with no information is <code>4/52 ≈ 0.0769</code>. They differ, so the events are <b>dependent</b>, the first draw changes the deck. (With <i>replacement</i>, they would be independent, both 4/52.)`}
 ]}},

{id:'pr3',
 title:'Advanced: Bayesian probability, the 99% accurate test that is usually wrong',
 body:`
<div class="ground"><span class="gTag">🎯 What it does, and why it breaks intuition</span>
<p>Now the fundamentals pay off. <b>Bayes' theorem</b> is the rule for <b>updating a belief
when evidence arrives</b>. The famous shocker: a disease affects 1 person in 1,000. The test
is 99% accurate. You test positive. What's the chance you're sick? Most people, including
most doctors in published studies, say ~99%. The real answer is about <b>9%</b>. Let's see
why with nothing but counting.</p></div>

<h3>Count 100,000 people</h3>
<p>Out of 100,000: about <b>100 are sick</b> (1 in 1,000), the test catches 99 of them.
About <b>99,900 are healthy</b>, but 1% of them, <b>999 people</b>, get a false positive.
So the positive pile holds 99 + 999 = 1,098 people, of whom only 99 are sick:
99/1,098 ≈ <b>9%</b>. The intuition-breaker has a name, the <b>base-rate fallacy</b>:
the rarity of the disease (the <i>base rate</i>) overwhelms the accuracy of the test.
Because the disease is rare, false positives from the huge healthy crowd swamp the true ones.</p>

<h3>Bayes' rule itself: where it comes from</h3>
<p>The counting works, but we want the <b>formula</b>, and, crucially, to see it is not
handed down from nowhere. It falls out of the conditional probability you already learned in
two short steps.</p>
<p><b>Step 1, conditional probability (from the earlier lesson):</b> the chance of A given B is
the joint over the condition:</p>
<div class="mathblock">P(A | B) = P(A and B) / P(B)</div>
<p><b>Step 2, the joint can be written two ways</b> (the multiplication rule), because "A and
B" is the same event as "B and A":</p>
<div class="mathblock">P(A and B) = P(B | A) · P(A)        (condition on A first)
P(A and B) = P(A | B) · P(B)        (condition on B first)</div>
<p><b>Put them together.</b> Substitute the first form of the joint into Step 1's numerator,
and you have <b>Bayes' rule</b>:</p>
<div class="mathblock"><b>P(A | B)  =  P(B | A) · P(A)  /  P(B)</b>

           posterior  =  likelihood × prior  /  evidence</div>
<p>That is the whole theorem, a rearrangement of conditional probability so you can <b>flip the
condition</b>: it turns "the chance of the evidence given the cause" (which you know, the test's
accuracy) into "the chance of the cause given the evidence" (what you actually want, your risk).
Reversing that arrow without Bayes is the base-rate fallacy.</p>

<h3>Walking it through, term by term</h3>
<p>Let <code>A = sick</code> and <code>B = tested positive (+)</code>. Bayes says
<code>P(sick | +) = P(+ | sick) · P(sick) / P(+)</code>. Fill each slot:</p>
<div class="mathblock">P(sick)      = 0.001        the PRIOR, 1 in 1,000 before any test
P(+ | sick)  = 0.99         the LIKELIHOOD, the test catches the sick
P(+)         = ?            the EVIDENCE, chance of a positive, for ANYONE</div>
<p>The one non-obvious term is <code>P(+)</code>, the total chance of a positive result. It has
two sources, true positives and false positives, added up (the <b>law of total
probability</b>):</p>
<div class="mathblock">P(+) = P(+|sick)·P(sick) + P(+|healthy)·P(healthy)
     = (0.99)(0.001)   +   (0.01)(0.999)
     = 0.00099         +   0.00999          =  0.01098</div>
<p>Now plug everything in:</p>
<div class="mathblock">P(sick | +) = (0.99 × 0.001) / 0.01098 = 0.00099 / 0.01098 ≈ <b>0.090</b>  (about 9%)</div>
<p>Exactly the counting answer, <code>99 / 1,098</code>, because the formula <i>is</i> the
counting, done with proportions instead of a census. Notice the denominator <code>0.01098</code>
is dominated by the <code>0.00999</code> false-positive term: that is the rare base rate letting
the huge healthy crowd swamp the signal, now visible right in the algebra.</p>

<h3>The vocabulary, demystified</h3>
<p><b>Prior</b> = your belief <i>before</i> the evidence (1/1,000, also called
<i>a priori</i>). <b>Likelihood</b> = how well each hypothesis explains the evidence
(sick explains a positive at 99%; healthy at 1%). <b>Posterior</b> = the updated belief
<i>after</i> the evidence (~9%, <i>a posteriori</i>). <b>Evidence</b> = the total chance of
what you saw, <code>P(+)</code>, which normalizes the result to a real probability. So Bayes
reads: <i>posterior = likelihood × prior ÷ evidence.</i></p>

<div class="demystify"><b>Demystify:</b> "Bayesian inference" sounds like a philosophy degree.
It's the counting exercise above, done with algebra instead of a census. Prior in, evidence
weighed, posterior out. When ML papers say "we place a prior on the weights," they mean
exactly this machinery, and (from the glossary) MAP estimation = MLE + prior is where
regularization secretly comes from.</div>

<div class="hardidea">🧠 <b>Hard idea, made simple:</b> the posterior depends on BOTH the
test's accuracy AND how common the condition is. A great test for a rare thing still yields
mostly false alarms. This is why screening programs for rare diseases follow a positive with a
<i>second</i>, different test, the first positive raises your prior from 0.1% to 9%, and from
there the same evidence pushes the posterior to ~91%. Updating is iterative: today's posterior
is tomorrow's prior.</div>`,
 docs:[['3Blue1Brown, Bayes theorem','https://www.3blue1brown.com/lessons/bayes-theorem'],['Seeing Theory, Bayesian inference','https://seeing-theory.brown.edu/bayesian-inference/index.html']],
 quiz:{title:'Quick check',questions:[
   {q:'Disease: 1 in 1,000. Test: 99% accurate. You test positive once. Your chance of being sick is closest to:',
    options:['99%','9%','50%','1%'],answer:1,whyWrong:['That is the test accuracy, which is the number people mistake for the answer.','','A coin flip would be the answer if the disease were far more common.','1% is close to the false positive rate, and it is not the posterior.'],
    why:'Count it: ~99 true positives vs ~999 false positives, the rare base rate lets the healthy crowd swamp the signal. 99/1098 ≈ 9%.'},
   {q:'In Bayes vocabulary, the "prior" is:',
    options:['The test result itself, positive or negative','The error rate of the test being applied','Your belief before any evidence has been seen','The final answer, once the evidence has been taken into account'],answer:2,whyWrong:['That is the evidence you are updating on.','That is the likelihood, and it describes the test rather than the population.','','That is the posterior, which is what you get after the update.'],
    why:'Prior (a priori) = before evidence; posterior (a posteriori) = after. The likelihood is how well each hypothesis explains what you saw.'},
   {q:'Why does a SECOND positive test change the picture so much?',
    options:['Two positives in a row are definitive, whatever the rate of the disease in the population','It does not change anything, since the same test was used twice','Your prior is now 9% rather than 0.1%, so the same evidence lands differently','The test becomes more accurate the second time it is administered'],answer:2,whyWrong:['Two positives on a very rare condition can still leave real doubt. Here it reaches about 91%, not certainty.','It changes it enormously, from 9% to roughly 91%.','','The test is exactly as accurate as it was. What changed is what you believed going in.'],
    why:'Updating is iterative: today\u0027s posterior is tomorrow\u0027s prior. Starting from 9%, the arithmetic that gave 9% now gives ~91%.'}
 ]},
 exs:[{title:'Compute the posterior two ways: count it, then Bayes it',
   lang:'python',
   prompt:`Population 100,000; disease rate 1/1,000; test 99% sensitive (catches sick) and 99%
   specific (1% false-positive rate on healthy):
   <ol>
   <li><code>true_pos</code>, sick people who test positive (99% of the sick),</li>
   <li><code>false_pos</code>, healthy people who test positive (1% of the healthy),</li>
   <li><code>posterior_count</code>, fraction of positives who are actually sick (the ~9%),</li>
   <li><code>posterior_bayes</code>, the same number from the formula <code>(0.99 * 0.001) / (0.99*0.001 + 0.01*0.999)</code>,</li>
   <li><code>second_test</code>, start from prior = <code>posterior_bayes</code> and apply the same update again (the ~91%).</li>
   </ol>
   The two routes to the first answer must agree, that agreement IS Bayes' theorem.`,
   starter:`population = 100_000
sick = population * 0.001        # 100 people
healthy = population - sick      # 99,900 people

# 1) 99% of the sick test positive
true_pos =

# 2) 1% of the healthy test positive
false_pos =

# 3) Of everyone who tested positive, what fraction is sick?
posterior_count =

# 4) Same thing by the formula: P(+|sick)P(sick) / P(+)
posterior_bayes = (0.99 * 0.001) / (0.99 * 0.001 + 0.01 * 0.999)

# 5) A second positive test: reuse the update with prior = posterior_bayes
p = posterior_bayes
second_test =

print(posterior_count, posterior_bayes, second_test)
`,
   solution:`population = 100_000
sick = population * 0.001        # 100 people
healthy = population - sick      # 99,900 people

# 1) 99% of the sick test positive
true_pos = sick * 0.99

# 2) 1% of the healthy test positive
false_pos = healthy * 0.01

# 3) Of everyone who tested positive, what fraction is sick?
posterior_count = true_pos / (true_pos + false_pos)

# 4) Same thing by the formula: P(+|sick)P(sick) / P(+)
posterior_bayes = (0.99 * 0.001) / (0.99 * 0.001 + 0.01 * 0.999)

# 5) A second positive test: reuse the update with prior = posterior_bayes
p = posterior_bayes
second_test = (0.99 * p) / (0.99 * p + 0.01 * (1 - p))

print(posterior_count, posterior_bayes, second_test)
`,
   tests:[
     {d:'true positives ≈ 99 people',expr:'abs(true_pos - 99) < 0.5'},
     {d:'false positives ≈ 999 people',expr:'abs(false_pos - 999) < 0.5'},
     {d:'counting gives ≈ 9%, not 99%',expr:'abs(posterior_count - 0.0902) < 0.005'},
     {d:'the Bayes formula agrees with the counting (that agreement IS the theorem)',expr:'abs(posterior_count - posterior_bayes) < 1e-6'},
     {d:'a second positive pushes the posterior to ≈ 91%',expr:'abs(second_test - 0.9075) < 0.01'}
   ],
   hints:[
     'true_pos = sick * 0.99 (99 people); false_pos = healthy * 0.01 (999 people). Feel how the healthy crowd dominates.',
     'posterior_count = true_pos / (true_pos + false_pos), sick positives over ALL positives.',
     'For the second test, the same shape with the new prior p: (0.99 * p) / (0.99 * p + 0.01 * (1 - p)). Yesterday\u0027s posterior is today\u0027s prior.'
   ]}],
 homework:{intro:'Work the algebra of Bayes by hand on fresh numbers, then check with the Playground. Write the formula, fill each slot, compute the denominator with total probability, divide.',problems:[
   {q:`<b>1.</b> Write Bayes' rule for <code>P(A | B)</code>, and label which part is the prior, the likelihood, and the evidence.`,
    solution:`<code>P(A | B) = P(B | A) · P(A) / P(B)</code>.<br>
    • <b>P(A)</b> = the <b>prior</b> (belief in A before the evidence).<br>
    • <b>P(B | A)</b> = the <b>likelihood</b> (how probable the evidence is if A is true).<br>
    • <b>P(B)</b> = the <b>evidence</b> (total probability of B, over all cases), which normalizes the answer.<br>
    In words: posterior = likelihood × prior ÷ evidence.`},
   {q:`<b>2.</b> A spam filter: 40% of email is spam. The word "free" appears in 80% of spam but only 5% of real email. An email contains "free". Use Bayes to find <code>P(spam | "free")</code>. Show the denominator via total probability.`,
    solution:`Let A = spam, B = contains "free". Knowns: <code>P(spam)=0.4</code>, <code>P("free"|spam)=0.8</code>, <code>P("free"|real)=0.05</code>, <code>P(real)=0.6</code>.<br>
    <b>Evidence (total probability of "free"):</b><br>
    <code>P("free") = (0.8)(0.4) + (0.05)(0.6) = 0.32 + 0.03 = 0.35</code>.<br>
    <b>Bayes:</b> <code>P(spam | "free") = (0.8 × 0.4) / 0.35 = 0.32 / 0.35 ≈ <b>0.914</b></code>, about 91% likely spam. The strong likelihood (0.8 vs 0.05) plus a fairly high prior (0.4) pushes it well above the prior.`},
   {q:`<b>3. (Base rate)</b> Redo problem 2, but now only 5% of email is spam (a well-filtered inbox), everything else the same. What is <code>P(spam | "free")</code> now, and what does the change teach you?`,
    solution:`Now <code>P(spam)=0.05</code>, <code>P(real)=0.95</code>.<br>
    <code>P("free") = (0.8)(0.05) + (0.05)(0.95) = 0.04 + 0.0475 = 0.0875</code>.<br>
    <code>P(spam | "free") = (0.8 × 0.05) / 0.0875 = 0.04 / 0.0875 ≈ <b>0.457</b></code>, only ~46%, now <i>below</i> 50%, even though the word is just as spammy!<br>
    <b>Lesson:</b> the same evidence yields a very different posterior when the <b>prior (base rate)</b> changes. Rare spam means most "free" emails are actually real, the base-rate effect, exactly as in the disease example.`}
 ]}},

{id:'pr5',
 title:'Advanced: maximum likelihood, how "fitting a model" actually works',
 body:`
<div class="ground"><span class="gTag">🎯 What it does, the bridge from probability to ML</span>
<p>Here is the secret that ties this whole stream to everything after it: <b>training a model
is usually maximum likelihood estimation in disguise</b>. The principle (<b>MLE</b>): among
all candidate explanations, <i>pick the one that makes the data you actually saw least
surprising</i>. Least-squares regression? MLE under Gaussian noise. Cross-entropy for
classifiers? MLE for categorical outcomes. When you later call <code>.fit()</code>, this
lesson is what the machine is doing.</p></div>

<h3>The smallest possible example: a suspicious coin</h3>
<p>You flip a coin 10 times and see <b>7 heads</b>. What is your best estimate of its
heads-probability <code>p</code>? MLE says: score every candidate <code>p</code> by the
probability it assigns to your exact data, the <b>likelihood</b>
<code>L(p) = p⁷ · (1−p)³</code>, and take the best-scoring one. The winner is exactly
<b>0.7</b>, the observed fraction. Intuitive result, principled route, and the route is what
generalizes to a billion-parameter model when the fraction shortcut does not exist.</p>

<h3>Two working details you will see everywhere</h3>
<p><b>Log-likelihood:</b> multiplying 10,000 small probabilities underflows to zero, so
everyone maximizes the <i>log</i> of the likelihood instead (same winner, log is
order-preserving, but sums instead of products). This is exactly the payoff you built in the
Logarithms stream: product-to-sum, monotonic, differentiable. When ML code minimizes "negative
log likelihood," now you can read it: <i>maximize the data\u0027s probability, in log form,
flipped to a minimization</i>. <b>And the calculus connection:</b> "maximize" means "climb
the likelihood surface", the gradient ascent twin of the descent you already implemented.</p>

<div class="demystify"><b>Demystify "MLE vs MAP":</b> MLE listens only to the data. <b>MAP</b>
(maximum a posteriori) adds your prior: maximize likelihood × prior: Bayes\u0027 rule from
last lesson, used as a fitting principle. Seen 7 heads in 10 but strongly believe coins are
fair? MAP lands between 0.7 and 0.5. And the punchline you will meet again: <b>regularization
in ML is exactly a prior in disguise</b>: L2 penalty = Gaussian prior on the weights. The
probability stream and the ML track are the same subject wearing two outfits.</div>`,
 docs:[['StatQuest, maximum likelihood','https://www.youtube.com/watch?v=XepXtl9YKwc'],['Seeing Theory, likelihood','https://seeing-theory.brown.edu/bayesian-inference/index.html']],
 quiz:{title:'Quick check',questions:[
   {q:'Maximum likelihood estimation picks the parameter value that:',
    options:['Minimizes the parameter itself, keeping the model as simple as possible','Sits closest to 0.5, the least committed value available','The prior assigns the highest probability to before any data arrives','Makes the observed data least surprising under the model'],answer:3,whyWrong:['Minimizing the parameter would pick whatever value is smallest, regardless of the data.','There is nothing special about 0.5. The data decides.','Adding a prior is what turns MLE into MAP. Plain MLE has no prior.',''],
    why:'Score candidates by the probability they give YOUR data; take the argmax. Training a model is this, at scale.'},
   {q:'Why do practitioners maximize LOG-likelihood instead of likelihood?',
    options:['It is a convention inherited from statistical physics','Logs are computed to higher precision than products are','Taking logs changes the answer to one that generalizes better on new data','Products of thousands of probabilities underflow, and logs give sums'],answer:3,whyWrong:['The reason is numerical, and it applies wherever probabilities are multiplied.','Logs are not more accurate in themselves. They avoid the underflow that destroys accuracy.','The maximizer is identical. The log is monotonic, so it moves nowhere.',''],
    why:'log is order-preserving: same winner, numerically sane. "Negative log likelihood" in ML code is exactly this, flipped to minimize.'},
   {q:'MAP differs from MLE by:',
    options:['Multiplying in a prior, which is what makes regularisation a prior in disguise','Being defined only for simple models such as a coin flip','Fitting on a different dataset from the one MLE uses','Ignoring the likelihood entirely and using only what you believed before seeing the data'],answer:0,whyWrong:['','It applies to any model. Coins are just the easiest example to write out.','Both use the same data. What differs is what else is brought to it.','MAP keeps the likelihood and multiplies a prior into it.'],
    why:'MAP = argmax likelihood × prior. L2 regularization = Gaussian prior on weights: the Bayes lesson and the ML track, connected.'}
 ]},
 exs:[{title:'Fit your first model by maximum likelihood',
   lang:'python',
   prompt:`Observed flips (1 = heads): <code>data = [1,1,0,1,1,1,0,1,0,1]</code>, 7 heads, 3 tails.
   <ol>
   <li><code>mle</code>, the closed-form MLE: the observed heads fraction (0.7),</li>
   <li><code>best_p</code>, confirm it by brute force: over candidates <code>p = 0.01, 0.02, …, 0.99</code>, compute the likelihood <code>p**heads * (1-p)**tails</code> and keep the argmax (expect 0.70),</li>
   <li><code>ll_07, ll_05</code>, the LOG-likelihood (<code>math.log</code>) at p = 0.7 and p = 0.5: the data must score better under 0.7,</li>
   </ol>
   The agreement of (1) and (2) is the point: the formula and the principle are the same thing.`,
   starter:`import math

data = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1]
heads = sum(data)
tails = len(data) - heads

# 1) The closed-form MLE: observed fraction
mle =

# 2) Brute-force the likelihood over p = 0.01 .. 0.99
best_p = 0.0
best_L = -1.0
for i in range(1, 100):
    p = i / 100
    L =                      # p^heads * (1-p)^tails
    if L > best_L:
        best_L, best_p = L, p

# 3) Log-likelihoods at 0.7 and 0.5
ll_07 =
ll_05 =

print(mle, best_p, ll_07 > ll_05)
`,
   solution:`import math

data = [1, 1, 0, 1, 1, 1, 0, 1, 0, 1]
heads = sum(data)
tails = len(data) - heads

# 1) The closed-form MLE: observed fraction
mle = heads / len(data)

# 2) Brute-force the likelihood over p = 0.01 .. 0.99
best_p = 0.0
best_L = -1.0
for i in range(1, 100):
    p = i / 100
    L = p**heads * (1 - p)**tails
    if L > best_L:
        best_L, best_p = L, p

# 3) Log-likelihoods at 0.7 and 0.5
ll_07 = heads * math.log(0.7) + tails * math.log(0.3)
ll_05 = heads * math.log(0.5) + tails * math.log(0.5)

print(mle, best_p, ll_07 > ll_05)
`,
   tests:[
     {d:'7 heads observed',expr:'heads == 7'},
     {d:'closed-form MLE is 0.7, the observed fraction',expr:'abs(mle - 0.7) < 1e-9'},
     {d:'brute-force search agrees: best p is 0.70',expr:'abs(best_p - 0.7) < 0.011'},
     {d:'the data scores better under p=0.7 than p=0.5 (log-likelihood)',expr:'ll_07 > ll_05'}
   ],
   hints:[
     'mle = heads / len(data), for a coin, the observed fraction IS the maximum-likelihood answer.',
     'L = p**heads * (1 - p)**tails, the probability of exactly your sequence under candidate p.',
     'Log form: heads*log(p) + tails*log(1-p). Products become sums; the winner does not move.'
   ]}]}
,

{id:'pr6',
 title:'Fundamentals: random variables and expectation, done properly',
 body:`
<div class="ground"><span class="gTag">🎯 The object every later formula is written about</span>
<p>So far "probability" has meant probabilities of events. Almost every formula in machine
learning is instead written about a <b>random variable</b>, and about its <b>expectation</b>.
Both words sound heavier than they are.</p></div>

<h3>A random variable is a function, not a variable</h3>
<p>Roll two dice. The outcome is a pair like (3, 5). A <b>random variable</b> is a rule that
turns each outcome into a number: <code>X = "the total"</code> maps (3,5) to 8. That is all it
is, a function from outcomes to numbers. It is called a variable for historical reasons and the
name has confused students ever since.</p>
<p>Capital letters name the variable, lower case names a value it took. <code>P(X = 8)</code>
asks for the probability of the outcomes that map to 8.</p>
<p><b>Discrete</b> variables take countable values and are described by a probability mass
function <code>p(x)</code>. <b>Continuous</b> variables take values on a range and are described
by a density <code>p(x)</code>, where only intervals have probability.</p>

<h3>Expectation is a weighted average</h3>
<div class="mathblock">discrete:    E[X] = &Sigma;<sub>x</sub> x &middot; p(x)

continuous:  E[X] = &int; x p(x) dx</div>
<p>Read it in English: every value, weighted by how likely it is. It is the long-run average you
would get by sampling forever, which is not a definition but is the right intuition, and the law
of large numbers later makes it precise.</p>
<div class="worked"><b>Worked, a fair die.</b>
<code>E[X] = (1+2+3+4+5+6)/6 = 3.5</code>. Note that 3.5 is not a value the die can produce. An
expectation need not be attainable, which is worth remembering when a model reports an expected
class label.</div>

<h3>The two properties you will use constantly</h3>
<div class="mathblock">linearity:   E[aX + bY + c] = a E[X] + b E[Y] + c        (always)

LOTUS:       E[g(X)] = &Sigma;<sub>x</sub> g(x) p(x)</div>
<p><b>Linearity holds whether or not X and Y are independent.</b> That is stronger than most
people expect and it is why so many derivations are shorter than they look. LOTUS, the law of
the unconscious statistician, says you can take the expectation of a function of X without ever
working out the distribution of that function, which saves an enormous amount of work.</p>

<h3>Variance measures spread, and squares the units</h3>
<div class="mathblock">Var[X] = E[ (X - E[X])<sup>2</sup> ] = E[X<sup>2</sup>] - (E[X])<sup>2</sup>

Var[aX + b] = a<sup>2</sup> Var[X]</div>
<div class="worked"><b>Deriving the computational form.</b> Let <code>&mu; = E[X]</code>. Expand
the square: <code>E[(X-&mu;)<sup>2</sup>] = E[X<sup>2</sup> - 2&mu;X + &mu;<sup>2</sup>]</code>.
By linearity that is <code>E[X<sup>2</sup>] - 2&mu;E[X] + &mu;<sup>2</sup></code>, and since
<code>E[X] = &mu;</code> this is <code>E[X<sup>2</sup>] - 2&mu;<sup>2</sup> + &mu;<sup>2</sup> =
E[X<sup>2</sup>] - &mu;<sup>2</sup>.</code> Two lines, using nothing but linearity.</div>
<p>Notice <code>Var[aX] = a<sup>2</sup>Var[X]</code>, not <code>a Var[X]</code>. Variance lives
in squared units, which is why the <b>standard deviation</b> <code>&radic;Var</code> exists: it
is back in the units of the data and can be compared to it.</p>
<div class="hardidea">🧠 <b>Why the loss function you already met is an expectation.</b> Mean
squared error is <code>E[(y - y&#770;)<sup>2</sup>]</code> estimated from a sample. Training a
model is minimizing an expectation you cannot compute, using the average over your data as a
stand-in. That substitution is called <b>empirical risk minimization</b>, and every gap between
training performance and real performance comes from the fact that the sample average is not the
expectation.</div>
`,
 exs:[{title:'Expectation by simulation, then break E[g(X)] = g(E[X])',
   lang:'python',
   packages:['numpy'],
   prompt:`X is the total of two fair dice, and its whole distribution is handed to you as
   <code>vals</code> and <code>probs</code>. Compute its expectation twice, then watch a rule
   most people assume fail:
   <ol>
   <li><code>EX</code>, the analytic expectation, the weighted sum of every value, which is <b>7.0</b>,</li>
   <li><code>EX2</code>, the analytic <code>E[X^2]</code> by the same weights on squared values (that is LOTUS: you never work out the distribution of X squared), about <b>54.83</b>,</li>
   <li><code>sim_mean</code>, the average of 200,000 simulated totals, which should land within 0.05 of <code>EX</code>,</li>
   <li><code>gap</code>, the difference <code>E[g(X)] - g(E[X])</code> for the convex g(x) = x squared.</li>
   </ol>
   Jensen says that gap cannot be negative for a convex g. Here it is exactly the variance, 35/6.`,
   starter:`import numpy as np
np.random.seed(0)

# The distribution of X, the total of two fair dice
vals  = np.arange(2, 13)
probs = np.array([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]) / 36.0

# 1) E[X] = sum of x * p(x)
EX =

# 2) E[X^2] by LOTUS: same weights, squared values
EX2 =

# 3) The same expectation the other way, by simulation
rolls = np.random.randint(1, 7, size=(200_000, 2)).sum(axis=1)
sim_mean =

# The two sides of Jensen's inequality for g(x) = x**2
g_of_EX = EX ** 2
E_of_gX = EX2

# 4) The gap between them
gap =

print(EX, EX2, sim_mean, gap)
`,
   solution:`import numpy as np
np.random.seed(0)

# The distribution of X, the total of two fair dice
vals  = np.arange(2, 13)
probs = np.array([1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]) / 36.0

# 1) E[X] = sum of x * p(x)
EX = float((vals * probs).sum())

# 2) E[X^2] by LOTUS: same weights, squared values
EX2 = float((vals ** 2 * probs).sum())

# 3) The same expectation the other way, by simulation
rolls = np.random.randint(1, 7, size=(200_000, 2)).sum(axis=1)
sim_mean = float(rolls.mean())

# The two sides of Jensen's inequality for g(x) = x**2
g_of_EX = EX ** 2
E_of_gX = EX2

# 4) The gap between them
gap = E_of_gX - g_of_EX

print(EX, EX2, sim_mean, gap)
`,
   tests:[
     {d:'E[X] is 7, the weighted sum of every total the two dice can show',expr:'abs(EX - 7) < 1e-9'},
     {d:'E[X²] is about 54.83, obtained by LOTUS without ever finding the distribution of X²',expr:'abs(EX2 - 54.8333333333) < 1e-6'},
     {d:'200,000 simulated totals average to the analytic expectation',expr:'abs(sim_mean - EX) < 0.05'},
     {d:'E[g(X)] is strictly larger than g(E[X]) for the convex g, which is Jensen as a number rather than a sentence',expr:'E_of_gX > g_of_EX'},
     {d:'the Jensen gap here is exactly the variance, 35/6 ≈ 5.833',expr:'abs(gap - 35/6) < 1e-9'}
   ],
   hints:[
     'A weighted average is one line with arrays: (vals * probs).sum().',
     'LOTUS means reusing the same probabilities: (vals ** 2 * probs).sum(). No new distribution is needed.',
     'gap = E_of_gX - g_of_EX, which is E[X²] - (E[X])², and that is the computational form of the variance from the lesson.'
   ]}],
 quiz:{title:'Quick check, expectation',questions:[
   {q:'A random variable is best described as:',
    options:['A function mapping outcomes to numbers','A variable whose value is unknown until it is measured','The probability assigned to an event','A number chosen uniformly at random'],answer:0,whyWrong:['','An unknown constant is not random. A random variable has a distribution over its possible values.','That is a probability, which is what the function induces rather than what it is.','That is one particular random variable, the uniform one.'],
    why:'It is a function on the sample space. The name is historical and misleading.'},
   {q:'E[X + Y] = E[X] + E[Y] holds:',
    options:['For any X and Y whatsoever','Only when both have finite variance','Only for discrete random variables','Only when X and Y are independent'],answer:0,whyWrong:['','Finite variance is not required. Only the expectations have to exist.','It holds for continuous variables too.','Independence is needed for E[XY] = E[X]E[Y]. Linearity of expectation needs nothing at all.'],
    why:'Linearity of expectation never requires independence, which makes it unusually powerful.'},
   {q:'Why is standard deviation reported instead of variance?',
    options:['It is unaffected by extreme values','It is always the smaller of the two and easier to read','It has the same units as the data itself','It is faster to compute from a sample'],answer:2,whyWrong:['It is affected by extreme values just as variance is, since it is the square root of one.','It is smaller only when the variance exceeds one. Below that it is larger.','','It costs one extra square root, which is negligible either way.'],
    why:'Variance is in squared units. Taking the root puts the spread back on the scale of the measurements.'}
 ]}},

{id:'pr7',
 title:'Fundamentals: joint, marginal and conditional, and what covariance measures',
 body:`
<div class="ground"><span class="gTag">🎯 What happens when you have more than one variable</span>
<p>Real data has many columns. Everything from covariance matrices to PCA to Gaussian mixtures
rests on how several random variables behave together, and there are exactly three
distributions you need to keep straight.</p></div>

<h3>The three distributions</h3>
<p><b>Joint</b>, <code>p(x, y)</code>: the probability that both take particular values.
<b>Marginal</b>, <code>p(x)</code>: the probability of one, ignoring the other. <b>Conditional</b>,
<code>p(x | y)</code>: the probability of one given that the other is known.</p>
<div class="mathblock">marginal:     p(x) = &Sigma;<sub>y</sub> p(x, y)        or   &int; p(x,y) dy

conditional:  p(x | y) = p(x, y) / p(y)

product rule: p(x, y) = p(x | y) p(y)</div>
<p>"Marginalizing" means summing the other variable out, and the name is literal: in old
printed tables the row and column totals were written in the margins.</p>
<div class="worked"><b>Worked.</b> A joint table over weather and whether you carry an umbrella:
<pre><code>            rain   dry
umbrella    0.30   0.10
none        0.10   0.50</code></pre>
Marginal for rain: <code>0.30 + 0.10 = 0.40</code>. Conditional
<code>P(umbrella | rain) = 0.30 / 0.40 = 0.75</code>. Note this differs from
<code>P(rain | umbrella) = 0.30 / 0.40 = 0.75</code> only by coincidence here; in general
swapping them is the error Bayes' theorem exists to correct.</div>

<h3>Independence, stated precisely</h3>
<div class="mathblock">X &perp; Y   &hArr;   p(x, y) = p(x) p(y) for all x, y   &hArr;   p(x | y) = p(x)</div>
<p>Knowing one tells you nothing about the other. This is a strong condition, and most
interesting variables fail it.</p>

<h3>Covariance: do they move together</h3>
<div class="mathblock">Cov[X, Y] = E[ (X - E[X])(Y - E[Y]) ]  =  E[XY] - E[X]E[Y]</div>
<p>Read the definition. When X is above its mean at the same times Y is above its mean, both
factors are positive and the product is positive. When one is above while the other is below,
the product is negative. Average those products, and you get a number that is positive for
variables that rise together, negative for variables that move oppositely, and near zero for
variables with no linear relationship.</p>
<p>Its size is uninterpretable, because it depends on the units. Divide by both standard
deviations and you get <b>correlation</b>, which is confined to [-1, 1]:</p>
<div class="mathblock">&rho;<sub>XY</sub> = Cov[X, Y] / ( &sigma;<sub>X</sub> &sigma;<sub>Y</sub> )</div>
<div class="hardidea">🧠 <b>Zero covariance does not mean independent.</b> Let X be uniform on
[-1, 1] and let <code>Y = X<sup>2</sup></code>. Y is completely determined by X, so they could
hardly be more dependent. But by symmetry <code>E[X] = 0</code> and
<code>E[XY] = E[X<sup>3</sup>] = 0</code>, so <code>Cov[X,Y] = 0</code>. Covariance sees only
<b>linear</b> association. Independence implies zero covariance; the reverse is false, except in
the special case of jointly Gaussian variables, where the two do coincide. That exception is a
large part of why the Gaussian is so convenient.</div>

<h3>The covariance matrix</h3>
<p>With <code>D</code> variables, collect every pairwise covariance into a
<code>D &times; D</code> matrix:</p>
<div class="mathblock">&Sigma; = E[ (x - &mu;)(x - &mu;)<sup>T</sup> ]      &Sigma;<sub>ij</sub> = Cov[X<sub>i</sub>, X<sub>j</sub>]</div>
<p>The diagonal holds the variances. It is symmetric, since
<code>Cov[X,Y] = Cov[Y,X]</code>, and it is <b>positive semi-definite</b>, meaning
<code>a<sup>T</sup>&Sigma;a &ge; 0</code> for any vector <code>a</code>. That last fact is not
decoration: it says the variance of any linear combination of your variables cannot be negative,
which is obviously true, and it is exactly the property the next lesson exploits.</p>
<div class="worked"><b>Why a<sup>T</sup>&Sigma;a is a variance.</b> Consider the scalar
<code>Y = a<sup>T</sup>x</code>, a weighted combination of your columns. Then
<code>Var[Y] = E[(a<sup>T</sup>(x-&mu;))<sup>2</sup>] = E[a<sup>T</sup>(x-&mu;)(x-&mu;)<sup>T</sup>a]
= a<sup>T</sup>&Sigma;a</code>. So the quadratic form is not an abstraction, it is the variance
of the data measured along the direction <code>a</code>.</div>
`,
 exs:[{title:'Marginalize, condition, then find zero covariance between dependent variables',
   lang:'python',
   packages:['numpy'],
   prompt:`X is uniform on the five values -2 to 2, and Y is X squared, so Y is completely
   determined by X. Build the joint table and read all three distributions off it:
   <ol>
   <li><code>J</code>, the 5 by 3 joint table, each row holding 0.2 in the single column where y = x squared,</li>
   <li><code>px</code> and <code>py</code>, the marginals, each obtained by summing the other variable out. <code>py</code> should be <b>[0.2, 0.4, 0.4]</b>,</li>
   <li><code>cond</code>, the conditional distribution of X given Y = 1, which is that column divided by <code>py[1]</code>, and which must sum to 1,</li>
   <li><code>cov</code>, the covariance <code>E[XY] - E[X]E[Y]</code>.</li>
   </ol>
   The covariance comes out at zero although Y is a function of X. The last test compares the
   joint against the product of the marginals, which is what independence would actually require.`,
   starter:`import numpy as np

xs = np.array([-2, -1, 0, 1, 2])
ys = np.array([0, 1, 4])

# 1) The joint table: P(X = x, Y = x**2) = 1/5, zero everywhere else
J = np.zeros((5, 3))
for i, x in enumerate(xs):
    j = int(np.where(ys == x ** 2)[0][0])
    J[i, j] =

# 2) Marginals: sum the other variable out
px =
py =

# 3) The conditional distribution of X given Y = 1
cond =

# Expectations, each a weighted sum over the table
EX  = float((px * xs).sum())
EY  = float((py * ys).sum())
EXY = float(sum(J[i, j] * xs[i] * ys[j] for i in range(5) for j in range(3)))

# 4) Covariance
cov =

# How far the joint sits from the product of its marginals
gap = float(np.abs(J - np.outer(px, py)).max())

print(py, cond, cov, gap)
`,
   solution:`import numpy as np

xs = np.array([-2, -1, 0, 1, 2])
ys = np.array([0, 1, 4])

# 1) The joint table: P(X = x, Y = x**2) = 1/5, zero everywhere else
J = np.zeros((5, 3))
for i, x in enumerate(xs):
    j = int(np.where(ys == x ** 2)[0][0])
    J[i, j] = 1 / 5

# 2) Marginals: sum the other variable out
px = J.sum(axis=1)
py = J.sum(axis=0)

# 3) The conditional distribution of X given Y = 1
cond = J[:, 1] / py[1]

# Expectations, each a weighted sum over the table
EX  = float((px * xs).sum())
EY  = float((py * ys).sum())
EXY = float(sum(J[i, j] * xs[i] * ys[j] for i in range(5) for j in range(3)))

# 4) Covariance
cov = EXY - EX * EY

# How far the joint sits from the product of its marginals
gap = float(np.abs(J - np.outer(px, py)).max())

print(py, cond, cov, gap)
`,
   tests:[
     {d:'the joint table is a distribution: every cell is non-negative and the whole thing sums to 1',expr:'J.min() >= 0 and abs(J.sum() - 1) < 1e-12'},
     {d:'marginalizing X out leaves py = [0.2, 0.4, 0.4], since 1 and 4 each arise two ways and 0 only one',expr:'bool(np.allclose(py, [0.2, 0.4, 0.4]))'},
     {d:'conditioning on Y = 1 gives a distribution summing to 1, split evenly between X = -1 and X = +1',expr:'abs(cond.sum() - 1) < 1e-12 and abs(cond[1] - 0.5) < 1e-12 and abs(cond[3] - 0.5) < 1e-12'},
     {d:'the covariance is zero, because E[XY] = E[X³] = 0 by symmetry',expr:'abs(cov) < 1e-12'},
     {d:'yet the joint is nowhere near the product of the marginals, so uncorrelated is not independent',expr:'gap > 0.1'}
   ],
   hints:[
     'Each row of J has exactly one nonzero entry, in the column where ys equals x ** 2, and every outcome has probability 1/5.',
     'Marginals are sums along an axis: J.sum(axis=1) removes Y, J.sum(axis=0) removes X. Conditioning is a slice divided by its own total.',
     'cov = EXY - EX * EY. E[X] is zero by symmetry and E[XY] = E[X³] is zero for the same reason, so the covariance has no choice but to vanish.'
   ]}],
 quiz:{title:'Quick check, joint and covariance',questions:[
   {q:'Marginalizing a joint distribution means:',
    options:['Conditioning on the most likely value of the other variable','Discarding the least probable outcomes','Summing or integrating the other variable out','Normalizing so the total equals one'],answer:2,whyWrong:['That is conditioning on a value, which keeps the variable rather than removing it.','Nothing is discarded. Every outcome contributes to the sum.','','Normalizing rescales what is there. Marginalizing removes a dimension.'],
    why:'p(x) = Σ_y p(x,y). You remove a variable by summing over everything it could have been.'},
   {q:'Zero covariance between X and Y implies:',
    options:['The joint distribution factorizes into its two marginals','X and Y must be statistically independent','One of the two has zero variance','No linear relationship, but possibly others'],answer:3,whyWrong:['Factorisation is independence, which is strictly stronger than zero covariance.','A parabola through the origin has zero covariance and total dependence.','Zero variance in one variable does force zero covariance, and it is not the only way to get it.',''],
    why:'Y = X² with X symmetric about zero has zero covariance and total dependence.'},
   {q:'The quantity aᵀΣa represents:',
    options:['The correlation between the first two columns','The determinant of the covariance matrix','The mean of the data along direction a','The variance of the data along direction a'],answer:3,whyWrong:['That is one off-diagonal entry, and it does not involve a at all.','The determinant is a single scalar summarizing the whole matrix, with no direction attached.','The mean along a is aᵀμ, and it is linear rather than quadratic.',''],
    why:'It is Var[aᵀx]. That is why Σ must be positive semi-definite, since variances cannot be negative.'}
 ]}},

{id:'pr8',
 title:'Advanced: the multivariate Gaussian, directional derivatives, and where PCA comes from',
 body:`
<div class="ground"><span class="gTag">🎯 One distribution, one optimization, and the machinery behind both</span>
<p>The multivariate Gaussian is the distribution nearly every method assumes when it assumes
anything. PCA is the optimization that falls out of its geometry. This lesson does both, and
introduces <b>directional derivatives</b> along the way, because that is the tool that makes the PCA derivation rigorous rather than hand-waved.</p></div>

<h3>The density, term by term</h3>
<div class="mathblock">N(x | &mu;, &Sigma;) = (2&pi;)<sup>-D/2</sup> |&Sigma;|<sup>-1/2</sup> exp( -&frac12; (x-&mu;)<sup>T</sup>&Sigma;<sup>-1</sup>(x-&mu;) )</div>
<p>Do not be intimidated by the front. The two factors before the exponential are a normalizing
constant, present only so the density integrates to 1. Everything interesting is in the
exponent.</p>
<p>That exponent, <code>(x-&mu;)<sup>T</sup>&Sigma;<sup>-1</sup>(x-&mu;)</code>, is called the
<b>squared Mahalanobis distance</b>. Compare it to ordinary squared distance
<code>(x-&mu;)<sup>T</sup>(x-&mu;)</code>. The only difference is the <code>&Sigma;<sup>-1</sup></code>
in the middle, and what it does is measure distance in units of standard deviation along each
direction. Being three units away along a direction where the data varies a lot is unremarkable;
being three units away along a direction where it barely varies is extraordinary. Mahalanobis
distance knows the difference and Euclidean distance does not.</p>
<div class="worked"><b>Worked, two dimensions.</b> Take
<code>&Sigma; = [[9, 0], [0, 1]]</code>, so the data has standard deviation 3 horizontally and 1
vertically. Then <code>&Sigma;<sup>-1</sup> = [[1/9, 0],[0,1]]</code> and the exponent for a
point 3 units right of the mean is <code>9/9 = 1</code>, while for a point 3 units above it is
<code>9/1 = 9</code>. Same Euclidean distance, nine times the surprise.</div>

<h3>The shape: eigenvectors are the axes</h3>
<p>Since <code>&Sigma;</code> is symmetric and positive semi-definite, the spectral theorem
guarantees it can be written as</p>
<div class="mathblock">&Sigma; = U &Lambda; U<sup>T</sup>,   U orthogonal,   &Lambda; = diag(&lambda;<sub>1</sub>, ..., &lambda;<sub>D</sub>), all &lambda;<sub>i</sub> &ge; 0</div>
<p>Geometrically: the contours of constant density are ellipsoids. The columns of
<code>U</code>, the <b>eigenvectors</b>, point along the axes of those ellipsoids, and the
<b>eigenvalues</b> give the variance along each axis, so the semi-axis lengths are
<code>&radic;&lambda;<sub>i</sub></code>. A Gaussian is a stretched, rotated ball, and
<code>&Sigma;</code> records exactly how it was stretched and rotated.</p>

<h3>Directional derivatives, since PCA needs them</h3>
<p>Before deriving PCA, the tool. You know the partial derivative
<code>&part;f/&part;x<sub>i</sub></code>: how fast <code>f</code> changes as you move along one
coordinate axis. But you can move in any direction, not only along the axes. The
<b>directional derivative</b> asks how fast <code>f</code> changes as you step in an arbitrary
unit direction <code>u</code>:</p>
<div class="mathblock">D<sub>u</sub>f(x) = lim<sub>h&rarr;0</sub> [ f(x + hu) - f(x) ] / h  =  &nabla;f(x)<sup>T</sup>u</div>
<p>That second equality is the useful one, and it is worth seeing why it holds. To first order,
<code>f(x + hu) &asymp; f(x) + h &nabla;f(x)<sup>T</sup>u</code>, so subtracting and dividing by
<code>h</code> leaves exactly <code>&nabla;f<sup>T</sup>u</code>.</p>
<div class="hardidea">🧠 <b>Two consequences worth internalizing.</b> First, since
<code>&nabla;f<sup>T</sup>u = ||&nabla;f|| cos&theta;</code> for a unit <code>u</code>, the
directional derivative is largest when <code>&theta; = 0</code>, meaning <b>the gradient points
in the direction of steepest increase</b>. That is not a definition of the gradient, it is a
theorem, and it is the entire justification for gradient descent stepping along
<code>-&nabla;E</code>. Second, when <code>u</code> is perpendicular to the gradient the
directional derivative is zero, which is why contour lines are everywhere perpendicular to the
gradient.</div>

<h3>PCA, derived</h3>
<p>Ask a concrete question: <b>which single direction carries the most variance in the data?</b>
From the last lesson, the variance along a unit direction <code>u</code> is
<code>u<sup>T</sup>&Sigma;u</code>. So we want</p>
<div class="mathblock">maximize   u<sup>T</sup>&Sigma;u    subject to   u<sup>T</sup>u = 1</div>
<p>The constraint is essential. Without it you could make the objective arbitrarily large just by
lengthening <code>u</code>, which says nothing about the data. Constrained problems like this are
handled with a <b>Lagrange multiplier</b>: form</p>
<div class="mathblock">L(u, &lambda;) = u<sup>T</sup>&Sigma;u - &lambda;(u<sup>T</sup>u - 1)</div>
<p>and set the derivative with respect to <code>u</code> to zero. Using
<code>&part;(u<sup>T</sup>Au)/&part;u = 2Au</code> for symmetric <code>A</code>:</p>
<div class="mathblock">2&Sigma;u - 2&lambda;u = 0    &rArr;    &Sigma;u = &lambda;u</div>
<p>That is the eigenvector equation. <b>The directions of maximum variance are the eigenvectors
of the covariance matrix</b>, and this is not asserted, it fell out of the optimization.</p>
<p>Which eigenvector? Multiply <code>&Sigma;u = &lambda;u</code> on the left by
<code>u<sup>T</sup></code>: since <code>u<sup>T</sup>u = 1</code>, you get
<code>u<sup>T</sup>&Sigma;u = &lambda;</code>. The variance captured by a direction <b>is</b> its
eigenvalue. So take the largest one. The second component is the same problem restricted to
directions orthogonal to the first, giving the second-largest eigenvalue, and so on.</p>
<div class="worked"><b>Reading a PCA output.</b> Eigenvalues
<code>[4.0, 1.5, 0.4, 0.1]</code> total 6.0. The first component explains
<code>4.0/6.0 = 67%</code> of the variance, the first two explain
<code>5.5/6.0 = 92%</code>. That ratio is the "explained variance" every library prints, and now
it is not a black box: it is the share of total variance lying along that axis, and the total
variance is the trace of &Sigma;.</div>
<div class="demystify"><b>Why centering first is not optional.</b> The derivation used
<code>&Sigma; = E[(x-&mu;)(x-&mu;)<sup>T</sup>]</code>. If you skip subtracting the mean, you
compute <code>E[xx<sup>T</sup>]</code> instead, and the first component will point roughly at the
mean of your data rather than at the direction of greatest spread. It will look plausible and be
wrong.</div>
`,
 docs:[['A visual, interactive explanation of PCA','https://setosa.io/ev/principal-component-analysis/']],
 exs:[{title:'Recover a covariance, take its eigenvectors, and watch PCA appear',
   lang:'python',
   packages:['numpy'],
   prompt:`The true covariance is <code>diag(9, 1)</code> rotated by 30 degrees, so the direction
   of greatest spread is <code>u_true</code>. Sample from it, then work backwards from the sample
   alone:
   <ol>
   <li><code>X</code>, 4,000 draws: standard normal noise passed through the Cholesky factor <code>L</code>, which turns N(0, I) into N(0, &Sigma;),</li>
   <li><code>S</code>, the covariance estimated from the centered data, <code>Xc.T @ Xc / n</code>,</li>
   <li><code>top</code> and <code>lam_top</code>, the eigenvector of <code>S</code> with the largest eigenvalue, and that eigenvalue,</li>
   <li><code>var_top</code>, the variance of the data projected onto <code>top</code>, which should equal <code>lam_top</code> to machine precision.</li>
   </ol>
   The last test scans 180 directions around the circle and checks that none beats the top
   eigenvector. That is the constrained maximum of the lesson, verified rather than asserted.`,
   starter:`import numpy as np
np.random.seed(0)

theta  = np.pi / 6
u_true = np.array([np.cos(theta), np.sin(theta)])
U      = np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])
S_true = U @ np.diag([9.0, 1.0]) @ U.T
L      = np.linalg.cholesky(S_true)

# 1) 4,000 draws with that covariance
X  =
Xc = X - X.mean(axis=0)

# 2) The covariance estimated back from the sample
S =

# 3) Eigen-decomposition, then the top eigenvector and its eigenvalue
w, V    = np.linalg.eigh(S)
top     =
lam_top =

# 4) The variance of the data along that direction
proj     = Xc @ top
var_top  =

# Every direction around the half circle, and the variance along each
angles   = np.linspace(0, np.pi, 180)
dirs     = np.stack([np.cos(angles), np.sin(angles)], axis=1)
vars_all = ((Xc @ dirs.T) ** 2).mean(axis=0)

print(S, lam_top, var_top, abs(float(top @ u_true)))
`,
   solution:`import numpy as np
np.random.seed(0)

theta  = np.pi / 6
u_true = np.array([np.cos(theta), np.sin(theta)])
U      = np.array([[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]])
S_true = U @ np.diag([9.0, 1.0]) @ U.T
L      = np.linalg.cholesky(S_true)

# 1) 4,000 draws with that covariance
X  = np.random.randn(4000, 2) @ L.T
Xc = X - X.mean(axis=0)

# 2) The covariance estimated back from the sample
S = (Xc.T @ Xc) / len(Xc)

# 3) Eigen-decomposition, then the top eigenvector and its eigenvalue
w, V    = np.linalg.eigh(S)
top     = V[:, int(np.argmax(w))]
lam_top = float(w.max())

# 4) The variance of the data along that direction
proj     = Xc @ top
var_top  = float(proj.var())

# Every direction around the half circle, and the variance along each
angles   = np.linspace(0, np.pi, 180)
dirs     = np.stack([np.cos(angles), np.sin(angles)], axis=1)
vars_all = ((Xc @ dirs.T) ** 2).mean(axis=0)

print(S, lam_top, var_top, abs(float(top @ u_true)))
`,
   tests:[
     {d:'the sample covariance recovers the true one to within 0.2 in every entry',expr:'float(np.abs(S - S_true).max()) < 0.2'},
     {d:'the top eigenvalue is near 9, the variance that was built into that direction',expr:'abs(lam_top - 9) < 0.5'},
     {d:'the top eigenvector points along u_true, up to a sign the decomposition is free to choose',expr:'abs(float(top @ u_true)) > 0.99'},
     {d:'the variance of the projected data equals the eigenvalue exactly, which is the statement uᵀΣu = λ',expr:'abs(var_top - lam_top) < 1e-9'},
     {d:'no direction on the circle carries more variance, so the eigenvector really is the constrained maximum',expr:'float(vars_all.max()) <= lam_top + 1e-9'}
   ],
   hints:[
     'np.random.randn(4000, 2) @ L.T produces correlated draws, because multiplying standard normals by L gives covariance L Lᵀ, which is Σ.',
     'S = (Xc.T @ Xc) / len(Xc). np.linalg.eigh returns eigenvalues in ascending order, so the largest is w[-1].',
     'top = V[:, int(np.argmax(w))] and lam_top = float(w.max()). Then proj = Xc @ top and var_top = float(proj.var()), which will match lam_top to machine precision.'
   ]}],
 quiz:{title:'Quick check, Gaussians and PCA',questions:[
   {q:'The Mahalanobis distance differs from Euclidean distance by:',
    options:['Ignoring the correlations between variables and treating each alike','Measuring in units of standard deviation per direction','Always producing a value between zero and one','Being restricted to two dimensions at a time'],answer:1,whyWrong:['Correlations are precisely what it accounts for, through the inverse covariance matrix.','','It is unbounded above, exactly like Euclidean distance.','It works in any number of dimensions, and correlated high-dimensional data is where it earns its keep.'],
    why:'The Σ⁻¹ in the middle rescales each direction by how much the data actually varies along it.'},
   {q:'The directional derivative ∇fᵀu is largest when u:',
    options:['Has the smallest possible magnitude','Is perpendicular to the gradient vector at that point','Points along the first coordinate axis','Points in the same direction as the gradient'],answer:3,whyWrong:['Magnitude scales the whole quantity. The question is about direction, and u is normally taken to be a unit vector.','Perpendicular to the gradient gives exactly zero, which is the flattest direction rather than the steepest.','A coordinate axis is only best when the gradient happens to lie along it.',''],
    why:'∇fᵀu = ‖∇f‖cos θ, maximized at θ = 0. That is why gradient descent steps along −∇E.'},
   {q:'PCA finds eigenvectors of the covariance matrix because:',
    options:['Maximizing uᵀΣu subject to ‖u‖=1 yields Σu = λu','Eigenvectors are always orthogonal to each other','The covariance matrix is expensive to invert','Eigen-decomposition is numerically the fastest route'],answer:0,whyWrong:['','Orthogonality is a consequence that makes the components independent, and it is not what produces the equation.','Nothing is inverted in PCA. The covariance matrix is decomposed.','There are faster factorisations for other purposes. The eigenvectors are what the constrained optimum demands.'],
    why:'The Lagrange condition for the constrained maximum is exactly the eigenvector equation.'}
 ]}}
,

{id:'pr9',
 title:'Advanced: entropy, cross-entropy and KL divergence, where loss functions come from',
 body:`
<div class="ground"><span class="gTag">🎯 Why classifiers minimize a quantity invented for telegraph wires</span>
<p>Every classifier you will build minimizes cross-entropy. It is usually presented as a formula
to accept. It is not arbitrary, it comes from Claude Shannon's 1948 theory of communication, and
once you see where it comes from you can never mistake it for a convention again.</p></div>

<h3>Surprise, made quantitative</h3>
<p>You met this in the logarithms stream. Define the surprise of an outcome of probability
<code>p</code> as <code>-log p</code>. A certain event has zero surprise, a rare one has a lot,
and the surprise of two independent events adds. Those three requirements force the logarithm,
they do not merely permit it.</p>
<p><b>Entropy</b> is the average surprise of a distribution:</p>
<div class="mathblock">H(p) = -&Sigma;<sub>x</sub> p(x) log p(x)     (in bits if log base 2, nats if natural log)</div>
<div class="worked"><b>Worked, three coins.</b> A fair coin:
<code>H = -(0.5 log&#8322;0.5 + 0.5 log&#8322;0.5) = 1</code> bit. A biased coin with p = 0.9:
<code>-(0.9 log&#8322;0.9 + 0.1 log&#8322;0.1) = 0.469</code> bits. A two-headed coin:
<code>H = 0</code>, since you learn nothing from the flip. Entropy is highest for the uniform
distribution and zero for a certainty, and its literal meaning is the average number of bits
needed to transmit one outcome under the best possible code.</div>

<h3>Cross-entropy: coding with the wrong distribution</h3>
<p>Suppose the truth is <code>p</code> but you built your code assuming <code>q</code>. You are
now assigning short codes to things that are not actually common. The average message length you
achieve is the <b>cross-entropy</b>:</p>
<div class="mathblock">H(p, q) = -&Sigma;<sub>x</sub> p(x) log q(x)</div>
<p>Read it carefully: the weights are the true probabilities <code>p</code>, but the surprise is
computed under your beliefs <code>q</code>. Reality decides how often each thing happens; your
model decides how surprised you are when it does.</p>

<h3>KL divergence: the penalty for being wrong</h3>
<div class="mathblock">D<sub>KL</sub>(p || q) = H(p, q) - H(p) = &Sigma;<sub>x</sub> p(x) log[ p(x) / q(x) ]</div>
<p>The excess cost of using <code>q</code> when the truth is <code>p</code>. It is zero exactly
when <code>q = p</code>, and otherwise strictly positive. It is <b>not symmetric</b>:
<code>D<sub>KL</sub>(p||q) &ne; D<sub>KL</sub>(q||p)</code>, so it is not a distance despite
being used like one.</p>
<div class="hardidea">🧠 <b>Proving it cannot be negative, since this is the fact everything
rests on.</b> Jensen's inequality says that for a concave function <code>f</code>,
<code>E[f(Z)] &le; f(E[Z])</code>. Apply it with <code>f = log</code>, which is concave:
<div class="mathblock">-D<sub>KL</sub>(p||q) = &Sigma; p(x) log[q(x)/p(x)] = E<sub>p</sub>[ log(q/p) ]
                &le; log E<sub>p</sub>[ q/p ] = log &Sigma; p(x)&middot;q(x)/p(x) = log &Sigma; q(x) = log 1 = 0</div>
So <code>D<sub>KL</sub> &ge; 0</code>, with equality only when <code>q = p</code> everywhere.
Remember this argument. The EM algorithm two lessons from now is built on precisely the same
inequality.</div>

<h3>Why your classifier's loss is exactly this</h3>
<p>For a single training example the true distribution is one-hot: probability 1 on the correct
class <code>c</code>, zero elsewhere. Substitute into cross-entropy:</p>
<div class="mathblock">H(p, q) = -&Sigma;<sub>k</sub> p<sub>k</sub> log q<sub>k</sub> = -log q<sub>c</sub></div>
<p>Every term vanishes except the one for the true class. So the loss for that example is just
<b>the negative log of the probability your model assigned to the right answer</b>. Confident and
correct gives a loss near zero. Confident and wrong gives a very large loss, because
<code>-log</code> of something near zero is enormous. That asymmetry is deliberate and it is why
cross-entropy trains classifiers so much better than squared error does.</p>
<div class="worked"><b>Worked.</b> True class is the second of three. Model outputs
<code>[0.2, 0.7, 0.1]</code>: loss <code>-log(0.7) = 0.357</code>. Model outputs
<code>[0.2, 0.1, 0.7]</code>: loss <code>-log(0.1) = 2.303</code>. Same confidence, wrong target,
six times the penalty.</div>
<div class="demystify"><b>The link back to maximum likelihood.</b> Since
<code>D<sub>KL</sub>(p||q) = H(p,q) - H(p)</code> and <code>H(p)</code> does not depend on your
model, minimizing cross-entropy is identical to minimizing KL divergence from the truth. And
minimizing cross-entropy over a dataset is identical to maximizing log-likelihood. Three
descriptions, one optimization. That is why the same objective keeps appearing under different
names.</div>
`,
 docs:[['Shannon, A Mathematical Theory of Communication (1948)','https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf']],
 exs:[{title:'Entropy, cross-entropy, KL, and the price of a confident mistake',
   lang:'python',
   packages:['numpy'],
   prompt:`Coins first, measured in bits, then a classifier:
   <ol>
   <li><code>h_fair</code> and <code>h_load</code>, the entropies of a fair coin and of one that lands heads 90% of the time: <b>1.0</b> and about <b>0.469</b> bits,</li>
   <li><code>hpq</code>, the cross-entropy of the truth <code>p = [0.7, 0.2, 0.1]</code> against the belief <code>q = [0.5, 0.3, 0.2]</code>, and <code>kl</code>, the KL divergence from p to q,</li>
   <li><code>loss_right</code> and <code>loss_wrong</code>, the classifier loss <code>-log(q_c)</code> when the model gives the true class 0.7 and when it gives it 0.01.</li>
   </ol>
   Test three is the identity <code>H(p, q) = H(p) + KL(p || q)</code>, and it holds to machine
   precision or you have a bug.`,
   starter:`import numpy as np

def entropy(p):
    p = np.asarray(p, float)
    return float(                     )   # average surprise, in bits

# 1) Two coins
h_fair = entropy([0.5, 0.5])
h_load = entropy([0.9, 0.1])

# The truth, and a model that believes something slightly different
p  = np.array([0.7, 0.2, 0.1])
q  = np.array([0.5, 0.3, 0.2])
hp = entropy(p)

# 2) Cross-entropy: true weights, surprise measured under q. Then the excess, KL.
hpq =
kl  =
kl_reverse = float((q * np.log2(q / p)).sum())

# 3) The loss on the true class, in nats, confident and right, then confident and wrong
loss_right =
loss_wrong =

print(h_fair, h_load, hpq, kl, loss_right, loss_wrong)
`,
   solution:`import numpy as np

def entropy(p):
    p = np.asarray(p, float)
    return float(-(p * np.log2(p)).sum())   # average surprise, in bits

# 1) Two coins
h_fair = entropy([0.5, 0.5])
h_load = entropy([0.9, 0.1])

# The truth, and a model that believes something slightly different
p  = np.array([0.7, 0.2, 0.1])
q  = np.array([0.5, 0.3, 0.2])
hp = entropy(p)

# 2) Cross-entropy: true weights, surprise measured under q. Then the excess, KL.
hpq = float(-(p * np.log2(q)).sum())
kl  = float((p * np.log2(p / q)).sum())
kl_reverse = float((q * np.log2(q / p)).sum())

# 3) The loss on the true class, in nats, confident and right, then confident and wrong
loss_right = float(-np.log(0.7))
loss_wrong = float(-np.log(0.01))

print(h_fair, h_load, hpq, kl, loss_right, loss_wrong)
`,
   tests:[
     {d:'a fair coin carries exactly 1 bit, the 90/10 coin only 0.469: predictability is cheap to transmit',expr:'abs(h_fair - 1) < 1e-12 and abs(h_load - 0.469) < 0.001'},
     {d:'KL is strictly positive here, as it must be whenever q is not p',expr:'kl > 0'},
     {d:'cross-entropy equals entropy plus KL, to machine precision, which is the identity the loss rests on',expr:'abs(hpq - (hp + kl)) < 1e-12'},
     {d:'swapping the arguments changes the answer, so KL is not a distance',expr:'abs(kl - kl_reverse) > 0.005'},
     {d:'the confident wrong answer costs about 4.6 against 0.36 for the confident right one, and that asymmetry is what trains a classifier',expr:'loss_wrong > 4.5 and loss_wrong > 12 * loss_right'}
   ],
   hints:[
     'Entropy is the average of the surprises -log p, weighted by p itself: -(p * np.log2(p)).sum().',
     'Cross-entropy keeps p as the weights and takes the log of q: -(p * np.log2(q)).sum(). KL is (p * np.log2(p / q)).sum().',
     'The classifier loss is the negative log of the probability given to the true class, so -np.log(0.01) is about 4.6 while -np.log(0.7) is about 0.36.'
   ]}],
 quiz:{title:'Quick check, information',questions:[
   {q:'Entropy is highest when a distribution is:',
    options:['As close to uniform as possible','Skewed toward the rarest event','Concentrated on a single outcome','Defined over the fewest outcomes'],answer:0,whyWrong:['','Skew concentrates probability, which lowers entropy rather than raising it.','That is the minimum. A certain outcome carries no surprise at all.','Fewer outcomes means less uncertainty, so entropy falls.'],
    why:'Uniform means maximum average surprise. A certainty has entropy zero.'},
   {q:'KL divergence is not a distance because:',
    options:['It depends on the base of the logarithm','It is undefined for continuous variables','It is not symmetric in its two arguments','It can take negative values in some cases'],answer:2,whyWrong:['The base only changes the units, bits against nats, and rescaling does not stop something being a distance.','It is defined for continuous variables, with an integral in place of the sum.','','It is never negative. That is one of the few distance-like properties it does have.'],
    why:'D(p‖q) ≠ D(q‖p) in general, which violates a requirement of any metric.'},
   {q:'For a one-hot target, cross-entropy loss reduces to:',
    options:['The entropy of the predicted distribution','The squared error against the one-hot target vector','The negative log probability of the true class','The sum of logs across every class'],answer:2,whyWrong:['The entropy of the prediction involves only the prediction. Cross-entropy compares it to the target.','Squared error against a one-hot vector is a different loss, and it trains far worse for classification.','','Every other class has a target of zero, so its term vanishes. One term survives.'],
    why:'Every term with p_k = 0 vanishes, leaving −log q_c for the correct class only.'}
 ]}},

{id:'pr10',
 title:'Advanced: Bayesian inference, conjugate priors and MAP',
 body:`
<div class="ground"><span class="gTag">🎯 From one application of Bayes to a way of doing statistics</span>
<p>You already met Bayes' theorem on the medical-test problem. That was arithmetic. This lesson
is the shift from using the formula once to treating <b>the parameters themselves as random
variables</b>, which is what "Bayesian" actually means.</p></div>

<h3>The reframing</h3>
<div class="mathblock">p(&theta; | D) = p(D | &theta;) p(&theta;) / p(D)

posterior = likelihood &times; prior / evidence</div>
<p>Maximum likelihood asked: which single <code>&theta;</code> makes my data most probable. The
Bayesian question is different: given the data, <b>what is the distribution over</b>
<code>&theta;</code>. You do not get one answer, you get a whole distribution expressing what you
now believe and how firmly.</p>
<p>The <b>evidence</b> <code>p(D) = &int; p(D|&theta;)p(&theta;) d&theta;</code> is just the
normalizing constant, and it is also the reason Bayesian methods are computationally hard: that
integral is usually impossible in closed form. Nearly all of Bayesian computation, MCMC and
variational inference alike, exists to dodge it.</p>

<h3>A conjugate pair, worked from scratch</h3>
<p>Estimating a coin's bias <code>&theta;</code>. The likelihood for <code>h</code> heads in
<code>n</code> flips is binomial, <code>&theta;<sup>h</sup>(1-&theta;)<sup>n-h</sup></code>. Take
a <b>Beta prior</b>:</p>
<div class="mathblock">Beta(&theta; | a, b) &prop; &theta;<sup>a-1</sup>(1-&theta;)<sup>b-1</sup></div>
<p>Multiply prior by likelihood and collect the exponents:</p>
<div class="mathblock">p(&theta;|D) &prop; &theta;<sup>h</sup>(1-&theta;)<sup>n-h</sup> &middot; &theta;<sup>a-1</sup>(1-&theta;)<sup>b-1</sup>
        = &theta;<sup>(a+h)-1</sup>(1-&theta;)<sup>(b+n-h)-1</sup>
        = Beta(&theta; | a+h, b+n-h)</div>
<p>The posterior is a Beta again, with the counts simply added to the parameters. That is what
<b>conjugacy</b> means: prior and posterior belong to the same family, so updating is arithmetic
rather than integration. It also gives the prior a plain reading, <code>a</code> and
<code>b</code> act like heads and tails you had already imagined seeing.</p>
<div class="worked"><b>Worked.</b> Start with <code>Beta(2,2)</code>, a mild belief the coin is
fair. Observe 7 heads in 10 flips. Posterior is <code>Beta(9,5)</code>, whose mean is
<code>9/14 = 0.64</code>. Maximum likelihood alone would have said <code>0.70</code>. The prior
pulled the estimate toward 0.5, and its influence shrinks as data accumulates: after 700 heads in
1000 flips the posterior mean is <code>702/1004 = 0.699</code>, essentially the data's answer.</div>

<h3>MAP, and why regularization reappears</h3>
<p>If you want a single number rather than a distribution, take the <b>maximum a posteriori</b>
estimate, the peak of the posterior:</p>
<div class="mathblock">&theta;<sub>MAP</sub> = argmax<sub>&theta;</sub> p(D|&theta;)p(&theta;)
        = argmax<sub>&theta;</sub> [ log p(D|&theta;) + log p(&theta;) ]</div>
<p>Compare that with maximum likelihood, which is the same expression without the second term.
<b>The prior contributes an additive term to the objective</b>, and if you have read the
overfitting lesson in the neural networks stream you have seen this before: a zero-mean Gaussian
prior on the weights gives <code>log p(w) = -&lambda;w<sup>T</sup>w/2 + const</code>, which is
exactly L2 regularization. A Laplace prior gives L1.</p>
<div class="hardidea">🧠 <b>Regularization was never a hack.</b> Every penalty term you add to a
loss is a prior belief written in the language of optimization. Choosing "weights are probably
small" and choosing "add λ‖w‖²" are the same act described in two vocabularies. This is worth
knowing because it tells you how to design a penalty: ask what you believe about the parameters
before seeing data, and take its negative log.</div>

<h3>Where the two schools actually differ</h3>
<p>A frequentist treats <code>&theta;</code> as fixed and unknown, and treats the data as random,
so a 95% confidence interval is a statement about the procedure. A Bayesian treats
<code>&theta;</code> as random and the observed data as fixed, so a 95% credible interval is a
statement about <code>&theta;</code>: there is a 95% probability it lies in this range, given the
prior and the data. The second is what people usually think the first means.</p>
<p>The practical trade is plain: Bayesian methods give you uncertainty as a first-class output
and require you to state a prior and pay for the integral. Which matters depends on whether you
need calibrated uncertainty, and on how much data you have, since with enough data the prior
washes out and the two agree.</p>
`,
 exs:[{title:'Update a Beta prior by hand, and watch the prior wash out',
   lang:'python',
   packages:['numpy'],
   prompt:`A coin of unknown bias. Prior <code>Beta(2, 2)</code>, a mild belief in fairness, then
   7 heads in 10 flips:
   <ol>
   <li><code>a_post, b_post</code>, the posterior parameters, which conjugacy reduces to addition,</li>
   <li><code>post_mean</code>, the posterior mean <code>a/(a+b)</code>, about <b>0.643</b>, and <code>map_est</code>, the posterior mode <code>(a-1)/(a+b-2)</code>, about <b>0.667</b>,</li>
   <li><code>grid_map</code>, the same peak found the slow way, by evaluating the unnormalized density on a grid of 999 values and taking the argmax,</li>
   <li><code>map_big</code>, the MAP after 700 heads in 1,000 flips, the same prior against a hundred times the data.</li>
   </ol>
   The MLE is 0.7 in both cases. The tests are about where the estimate sits relative to it.`,
   starter:`import numpy as np

a, b = 2.0, 2.0        # the prior: two imagined heads, two imagined tails
h, n = 7, 10           # the data

# 1) The conjugate update
a_post =
b_post =

prior_mean = a / (a + b)
mle        = h / n

# 2) Two summaries of the posterior: its mean and its peak
post_mean =
map_est   =

# 3) The peak again, by brute force over a grid
th       = np.linspace(0.001, 0.999, 999)
dens     = th ** (a_post - 1) * (1 - th) ** (b_post - 1)
grid_map = float(th[int(np.argmax(dens))])

# 4) The same prior against 1,000 flips
H, N = 700, 1000
aB, bB  = a + H, b + N - H
map_big =

print(a_post, b_post, post_mean, map_est, grid_map, map_big)
`,
   solution:`import numpy as np

a, b = 2.0, 2.0        # the prior: two imagined heads, two imagined tails
h, n = 7, 10           # the data

# 1) The conjugate update
a_post = a + h
b_post = b + n - h

prior_mean = a / (a + b)
mle        = h / n

# 2) Two summaries of the posterior: its mean and its peak
post_mean = a_post / (a_post + b_post)
map_est   = (a_post - 1) / (a_post + b_post - 2)

# 3) The peak again, by brute force over a grid
th       = np.linspace(0.001, 0.999, 999)
dens     = th ** (a_post - 1) * (1 - th) ** (b_post - 1)
grid_map = float(th[int(np.argmax(dens))])

# 4) The same prior against 1,000 flips
H, N = 700, 1000
aB, bB  = a + H, b + N - H
map_big = (aB - 1) / (aB + bB - 2)

print(a_post, b_post, post_mean, map_est, grid_map, map_big)
`,
   tests:[
     {d:'the posterior is Beta(9, 5): conjugacy means the counts are simply added to the prior parameters',expr:'a_post == 9 and b_post == 5'},
     {d:'the posterior mean 0.643 sits between the prior mean 0.5 and the sample proportion 0.7',expr:'prior_mean < post_mean < mle'},
     {d:'the grid search finds the same peak the closed-form MAP formula does',expr:'abs(grid_map - map_est) < 0.002'},
     {d:'on 10 flips the prior still moves the answer, pulling MAP about 0.033 off the MLE',expr:'abs(map_est - mle) > 0.03'},
     {d:'on 1,000 flips the same prior moves it by less than 0.001, so MAP and MLE converge as data accumulates',expr:'abs(map_big - mle) < 0.001'}
   ],
   hints:[
     'The update is arithmetic: a_post = a + heads, b_post = b + tails. Nothing is integrated.',
     'The mean of a Beta is a/(a+b) and its mode is (a-1)/(a+b-2). They differ, which is why MAP and the posterior mean are not the same estimate.',
     'map_big uses aB and bB in exactly the same mode formula. With 1,000 flips the added 2 and 2 barely register, which is the prior washing out.'
   ]}],
 quiz:{title:'Quick check, Bayesian inference',questions:[
   {q:'A conjugate prior is one where:',
    options:['The posterior stays in the same family','The evidence integral evaluates to one','The likelihood and prior are independent','The prior contains no information at all'],answer:0,whyWrong:['','The evidence integrates to whatever it integrates to. Conjugacy is about the shape of the result.','They are not independent in any meaningful sense. They are multiplied together.','An uninformative prior is a separate idea, and a conjugate prior can be strongly informative.'],
    why:'Beta prior with a binomial likelihood gives a Beta posterior, so updating means adding counts.'},
   {q:'MAP estimation differs from maximum likelihood by:',
    options:['Using a different optimization algorithm','Adding the log prior to the objective','Averaging over the whole posterior distribution','Requiring the evidence term to be computed'],answer:1,whyWrong:['The same optimizers work for both. What changes is the objective.','','Averaging over the posterior is full Bayesian inference. MAP takes the single peak.','The evidence cancels in the argmax, so neither method needs it.'],
    why:'argmax [log p(D|θ) + log p(θ)]. That extra term is exactly what regularization does.'},
   {q:'An L2 penalty on weights corresponds to which prior?',
    options:['An exponential prior on the magnitudes','A Laplace prior centered at zero','A uniform prior over a bounded range','A zero-mean Gaussian over the weights'],answer:3,whyWrong:['An exponential prior on magnitudes is closer to the L1 case, and it does not give the squared penalty.','A Laplace prior gives you L1, and its corner geometry is what drives coefficients to exactly zero.','A uniform prior contributes a constant, which leaves you with plain maximum likelihood.',''],
    why:'log of a zero-mean Gaussian gives −λwᵀw/2 plus a constant. Laplace gives L1 instead.'}
 ]}}
,

{id:'pr11',
 title:'Fundamentals: the distribution zoo, and how to pick one',
 body:`
<div class="ground"><span class="gTag">🎯 Nine distributions, each answering one specific question</span>
<p>Textbooks present distributions as a list to memorize. They are better understood as answers:
each one is what you get when you ask a particular question about a particular kind of
randomness. Learn the question and the formula stops needing memorizing.</p></div>

<h3>Discrete: probability mass functions</h3>
<p>A <b>PMF</b> gives the probability of each exact value, so <code>p(x) &ge; 0</code> and
<code>&Sigma; p(x) = 1</code>. You can ask <code>P(X = 3)</code> and get a real answer.</p>
<div class="mathblock">Bernoulli(p)     one trial, success or not
  p(x) = p<sup>x</sup>(1-p)<sup>1-x</sup>,  x &isin; {0,1}      E = p        Var = p(1-p)

Binomial(n,p)    how many successes in n independent trials
  p(k) = C(n,k) p<sup>k</sup>(1-p)<sup>n-k</sup>            E = np       Var = np(1-p)

Categorical(&pi;)    one trial, K possible outcomes
  p(x = k) = &pi;<sub>k</sub>,  &Sigma;&pi;<sub>k</sub> = 1

Poisson(&lambda;)       how many rare events in a fixed interval
  p(k) = &lambda;<sup>k</sup>e<sup>-&lambda;</sup>/k!                   E = &lambda;        Var = &lambda;

Geometric(p)     how many trials until the first success
  p(k) = (1-p)<sup>k-1</sup>p                    E = 1/p      Var = (1-p)/p&sup2;</div>
<div class="worked"><b>Where Poisson comes from.</b> Take a binomial with <code>n</code> huge and
<code>p</code> tiny, holding <code>np = &lambda;</code> fixed. Substituting and taking the limit
gives <code>&lambda;<sup>k</sup>e<sup>-&lambda;</sup>/k!</code>. That is why Poisson describes
rare events across many opportunities: server requests per second, typos per page, mutations per
genome. Its mean and variance are both <code>&lambda;</code>, so if your count data has variance
noticeably larger than its mean, Poisson is the wrong model and you want a negative binomial
instead. That single check catches a lot of bad modeling.</div>

<h3>Continuous: probability density functions</h3>
<p>A <b>PDF</b> is not a probability. <code>p(x)</code> can exceed 1, and
<code>P(X = 3) = 0</code> exactly, for every value. Only intervals carry probability:
<code>P(a &lt; X &lt; b) = &int;<sub>a</sub><sup>b</sup> p(x)dx</code>. Density is
probability per unit of x, which is why it has units and why it can be large where the range is
narrow.</p>
<div class="mathblock">Uniform(a,b)     every value in a range equally likely
  p(x) = 1/(b-a)                     E = (a+b)/2

Exponential(&lambda;)   waiting time until the next Poisson event
  p(x) = &lambda;e<sup>-&lambda;x</sup>,  x &ge; 0            E = 1/&lambda;      Var = 1/&lambda;&sup2;

Gamma(&alpha;,&beta;)       waiting time until the &alpha;-th event
  p(x) &prop; x<sup>&alpha;-1</sup>e<sup>-&beta;x</sup>                E = &alpha;/&beta;

Beta(a,b)        a probability that is itself uncertain, on [0,1]
  p(x) &prop; x<sup>a-1</sup>(1-x)<sup>b-1</sup>              E = a/(a+b)

Gaussian(&mu;,&sigma;&sup2;)   the next lesson, and it earns one</div>
<div class="hardidea">🧠 <b>The memorylessness of the exponential.</b> The exponential is the only
continuous distribution satisfying <code>P(X &gt; s+t | X &gt; s) = P(X &gt; t)</code>. A bus
that has not come for ten minutes is no more likely to come in the next minute than it was at the
start. This is exactly right for radioactive decay and completely wrong for machine parts, which
wear out. When someone models time-to-failure with an exponential, this assumption is what they
are asserting, usually without noticing.</div>

<h3>Choosing, in practice</h3>
<p>Ask what kind of thing you are modeling. Binary outcome: Bernoulli. Count of successes out of
a known number of tries: binomial. Count of events with no natural upper bound: Poisson. Time
until something happens: exponential or gamma. A proportion or a probability: beta. One of
several unordered categories: categorical. A quantity produced by many small additive effects:
Gaussian, for the reason in the next lesson.</p>
<div class="demystify"><b>The relationships are worth more than the formulas.</b> Bernoulli is
binomial with n = 1. Binomial becomes Poisson in the rare-event limit, and Gaussian in the
many-trial limit. Exponential is gamma with &alpha; = 1. Beta is the conjugate prior for
Bernoulli and binomial; gamma is the conjugate prior for the Poisson rate. The zoo is a family
tree, not a list.</div>
`,
 exs:[{title:'Fit four distributions to one sample and let the log-likelihood pick',
   lang:'python',
   packages:['numpy'],
   prompt:`600 draws from an exponential with rate 0.5. Pretend you do not know that, fit four
   families by maximum likelihood, and score each by the log-likelihood it reaches. Every density
   is written out with numpy, because that is all any of them are:
   <ol>
   <li><code>rate</code>, the exponential MLE <code>1/mean</code>, and <code>ll_exp</code>, its log-likelihood <code>n log(rate) - rate * sum(x)</code>,</li>
   <li><code>ll_gauss</code>, for a Gaussian fitted with the sample mean and standard deviation,</li>
   <li><code>ll_logn</code>, for a log-normal: a Gaussian fitted to <code>log x</code>, plus the <code>-log x</code> the change of variables contributes,</li>
   <li><code>ll_unif</code>, for a uniform on [0, max x], which is just <code>-n log(max x)</code>.</li>
   </ol>
   Higher is better. The family that generated the data should win, and the last test says by
   how much.`,
   starter:`import numpy as np
np.random.seed(3)

n = 600
x = np.random.exponential(scale=2.0, size=n)     # rate 0.5, mean 2

# 1) Exponential: the MLE rate is one over the sample mean
rate   =
ll_exp =

# 2) Gaussian at its MLE
mu, sd   = x.mean(), x.std()
ll_gauss = float((-0.5 * np.log(2 * np.pi * sd ** 2) - (x - mu) ** 2 / (2 * sd ** 2)).sum())

# 3) Log-normal: a Gaussian on log x, corrected by -log x
lg       = np.log(x)
m2, s2   = lg.mean(), lg.std()
ll_logn  =

# 4) Uniform on [0, max x]
ll_unif  =

scores = {'exponential': ll_exp, 'gaussian': ll_gauss, 'lognormal': ll_logn, 'uniform': ll_unif}
best   = max(scores, key=scores.get)
print(rate, best, scores)
`,
   solution:`import numpy as np
np.random.seed(3)

n = 600
x = np.random.exponential(scale=2.0, size=n)     # rate 0.5, mean 2

# 1) Exponential: the MLE rate is one over the sample mean
rate   = 1 / x.mean()
ll_exp = float(n * np.log(rate) - rate * x.sum())

# 2) Gaussian at its MLE
mu, sd   = x.mean(), x.std()
ll_gauss = float((-0.5 * np.log(2 * np.pi * sd ** 2) - (x - mu) ** 2 / (2 * sd ** 2)).sum())

# 3) Log-normal: a Gaussian on log x, corrected by -log x
lg       = np.log(x)
m2, s2   = lg.mean(), lg.std()
ll_logn  = float((-np.log(x) - 0.5 * np.log(2 * np.pi * s2 ** 2) - (lg - m2) ** 2 / (2 * s2 ** 2)).sum())

# 4) Uniform on [0, max x]
ll_unif  = float(-n * np.log(x.max()))

scores = {'exponential': ll_exp, 'gaussian': ll_gauss, 'lognormal': ll_logn, 'uniform': ll_unif}
best   = max(scores, key=scores.get)
print(rate, best, scores)
`,
   tests:[
     {d:'the fitted rate is close to the true 0.5, from 600 draws',expr:'abs(rate - 0.5) < 0.05'},
     {d:'the exponential MLE is exactly the reciprocal of the sample mean, no search required',expr:'abs(1 / rate - float(x.mean())) < 1e-12'},
     {d:'the exponential wins: the family that generated the data scores highest',expr:'best == "exponential"'},
     {d:'the log-normal comes second, the Gaussian third, the uniform last, which is the order of how much shape each one gets right',expr:'ll_logn > ll_gauss > ll_unif'},
     {d:'the exponential beats the Gaussian by more than 200 log units, so this is not a close call',expr:'ll_exp - ll_gauss > 200'}
   ],
   hints:[
     'For the exponential, log p(x) = log(rate) - rate*x, so summing over the sample gives n*log(rate) - rate*x.sum().',
     'The log-normal is the Gaussian formula applied to lg = np.log(x), with an extra -np.log(x) term per point from the change of variables.',
     'A uniform on [0, m] has density 1/m everywhere, so its log-likelihood is n * log(1/m) = -n * np.log(x.max()).'
   ]}],
 quiz:{title:'Quick check, the distribution zoo',questions:[
   {q:'A probability density function can exceed 1 because:',
    options:['It measures probability per unit, not probability','Densities are normalized only at the end','It represents a cumulative rather than exact value','Continuous variables have infinite outcomes'],answer:0,whyWrong:['','It is normalized by construction. The integral is one, and that constrains the area rather than the height.','The cumulative function is the one bounded by one. The density is its slope.','Infinitely many outcomes is why point probabilities are zero, and it does not explain why the height can exceed one.'],
    why:'Only the integral over an interval is a probability. Density on a narrow range can be large.'},
   {q:'Count data whose variance is much larger than its mean suggests:',
    options:['The data should be modeled as continuous','Poisson is wrong, since it forces them equal','A Poisson model fits it especially well','The counts were collected over too short a window'],answer:1,whyWrong:['Counts are discrete. Overdispersion is about the variance, not about the type.','','It fits badly. Poisson insists the variance equals the mean, and negative binomial is the usual repair.','A shorter window lowers both the mean and the variance. It does not pull them apart.'],
    why:'Poisson has E = Var = λ. Overdispersion points to a negative binomial instead.'},
   {q:'The exponential distribution is memoryless, which means:',
    options:['Its variance does not depend on its mean','It has no defined expectation value','Past waiting does not change future waiting','Its parameter cannot be estimated from data'],answer:2,whyWrong:['For an exponential the variance is the square of the mean, so they are tightly linked.','It has a perfectly good expectation, equal to one over the rate.','','The rate is easy to estimate. Memorylessness is a property of the distribution, not an obstacle.'],
    why:'P(X > s+t | X > s) = P(X > t). Right for decay, wrong for anything that wears out.'}
 ]}},

{id:'pr12',
 title:'Advanced: the Gaussian, and the four reasons it is everywhere',
 body:`
<div class="ground"><span class="gTag">🎯 Not a convenience, and not a coincidence</span>
<p>The Gaussian shows up in noise models, in priors, in initialization schemes, in mixture
models, and in the assumptions of half of classical statistics. People often assume it is chosen
because the math is easy. The math being easy is a consequence, not the cause. There are four
real reasons, and each one buys something specific.</p></div>

<div class="mathblock">N(x | &mu;, &sigma;&sup2;) = (1/&radic;(2&pi;&sigma;&sup2;)) exp( -(x-&mu;)&sup2; / (2&sigma;&sup2;) )</div>

<h3>Reason 1: sums of many small things become Gaussian</h3>
<p>The <b>central limit theorem</b>: take independent variables with finite mean and variance,
from <i>any</i> distribution at all, and their standardized sum converges to a Gaussian.</p>
<div class="mathblock">( &Sigma;X<sub>i</sub> - n&mu; ) / ( &sigma;&radic;n )  &rarr;  N(0, 1)   as n &rarr; &infin;</div>
<p>This is why measurement error is usually Gaussian: it is the accumulation of many small
independent perturbations, and their sum forgets what shape each one had. It also explains where
the Gaussian is <b>not</b> appropriate. Income is not a sum of small effects, it is closer to a
product, so it is log-normal with a long right tail. Financial returns have tails far heavier
than Gaussian, and models that assumed otherwise have caused real damage.</p>
<div class="worked"><b>How fast it converges.</b> Average 30 draws from a uniform distribution
and the histogram is already visually indistinguishable from a bell curve. From something badly
skewed you may need hundreds. The convergence is in distribution, not in the tails, so extreme
events remain badly estimated even when the middle looks perfect. That caveat is the one that
bites.</div>

<h3>Reason 2: it is the least presumptuous choice given only a mean and a variance</h3>
<p>Among all distributions on the real line with a given mean and variance, the Gaussian has
<b>maximum entropy</b>. Entropy is average surprise, so maximum entropy means assuming the least
beyond what you have specified. If all you are willing to claim is a center and a spread, any
other distribution smuggles in extra assumptions about shape. This is a principled argument, not
an aesthetic one.</p>

<h3>Reason 3: it is closed under the operations you actually perform</h3>
<div class="mathblock">sum:          N(&mu;<sub>1</sub>,&sigma;<sub>1</sub>&sup2;) + N(&mu;<sub>2</sub>,&sigma;<sub>2</sub>&sup2;) = N(&mu;<sub>1</sub>+&mu;<sub>2</sub>, &sigma;<sub>1</sub>&sup2;+&sigma;<sub>2</sub>&sup2;)   (independent)
scaling:      aN(&mu;,&sigma;&sup2;) + b = N(a&mu;+b, a&sup2;&sigma;&sup2;)
marginal:     a Gaussian marginalized is Gaussian
conditional:  a Gaussian conditioned is Gaussian
linear map:   x ~ N(&mu;,&Sigma;)  &rArr;  Ax ~ N(A&mu;, A&Sigma;A<sup>T</sup>)</div>
<p>Almost no other distribution behaves this well. Marginalize a mixture and you get something
messier; marginalize a Gaussian and you get a Gaussian, with the relevant rows and columns simply
struck out of <code>&Sigma;</code>. This closure is why Kalman filters, Gaussian processes and
linear regression all have closed-form answers, and why almost nothing else does.</p>

<h3>Reason 4: squared error and Gaussian noise are the same assumption</h3>
<p>Assume <code>y = f(x) + &epsilon;</code> with <code>&epsilon; ~ N(0, &sigma;&sup2;)</code>.
The log-likelihood of the data is</p>
<div class="mathblock">log p(y|x) = -&Sigma;<sub>n</sub> (y<sub>n</sub> - f(x<sub>n</sub>))&sup2; / (2&sigma;&sup2;)  + const</div>
<p>Maximizing that is minimizing the sum of squared errors. So <b>every time you use MSE you are
assuming Gaussian noise</b>, whether or not you said so. That is worth knowing, because when your
residuals are heavy-tailed, MSE is the wrong loss and it is the outliers that will dominate your
fit. Absolute error corresponds to Laplace noise and is the standard alternative.</p>

<h3>The multivariate case, briefly recalled</h3>
<p>Everything above generalizes, with <code>&Sigma;</code> in place of <code>&sigma;&sup2;</code>,
as covered in the PCA lesson. Two facts to carry into the next lessons: for jointly Gaussian
variables, <b>zero covariance really does imply independence</b>, which is false in general, and
a diagonal <code>&Sigma;</code> means axis-aligned contours while a full <code>&Sigma;</code>
allows tilted ellipses.</p>
`,
 exs:[{title:'Average a badly skewed variable until it turns into a bell',
   lang:'python',
   packages:['numpy'],
   prompt:`The exponential is about as far from a bell as a common distribution gets: skewness 2,
   all of it piled on the right. Average n of them and the skew has to fall like <code>2/&radic;n</code>:
   <ol>
   <li><code>skew(v)</code>, a function returning the mean of the cubed standardized values,</li>
   <li><code>skews</code>, the skewness of 20,000 averages, one entry for each n in [1, 2, 10, 50],</li>
   <li><code>within1</code>, the fraction of the n = 50 averages lying within one standard deviation of their mean, which for a Gaussian is <b>0.68</b>.</li>
   </ol>
   Nothing about the exponential changed. Only the averaging did.`,
   starter:`import numpy as np
np.random.seed(1)

def skew(v):
    v = np.asarray(v, float)
    return float(                        )   # mean of ((v - mean) / sd) ** 3

S     = 20000
ns    = [1, 2, 10, 50]
skews = []
last  = None

for n in ns:
    avg = np.random.exponential(1.0, size=(S, n)).mean(axis=1)
    skews.append(         )
    last = avg

theory = [2 / np.sqrt(n) for n in ns]

# The n = 50 averages, standardized, and how many land inside one standard deviation
z       = (last - last.mean()) / last.std()
within1 =

print(skews, theory, within1)
`,
   solution:`import numpy as np
np.random.seed(1)

def skew(v):
    v = np.asarray(v, float)
    return float((((v - v.mean()) / v.std()) ** 3).mean())   # mean of ((v - mean) / sd) ** 3

S     = 20000
ns    = [1, 2, 10, 50]
skews = []
last  = None

for n in ns:
    avg = np.random.exponential(1.0, size=(S, n)).mean(axis=1)
    skews.append(skew(avg))
    last = avg

theory = [2 / np.sqrt(n) for n in ns]

# The n = 50 averages, standardized, and how many land inside one standard deviation
z       = (last - last.mean()) / last.std()
within1 = float((np.abs(z) < 1).mean())

print(skews, theory, within1)
`,
   tests:[
     {d:'a single exponential draw has skewness near 2, which is heavily right-tailed',expr:'abs(skews[0] - 2) < 0.15'},
     {d:'skewness falls at every step: averaging destroys the asymmetry',expr:'all(skews[i] > skews[i + 1] for i in range(3))'},
     {d:'each measured skew tracks the theoretical 2/√n',expr:'max(abs(skews[i] - theory[i]) for i in range(4)) < 0.1'},
     {d:'by n = 50 the skew is under 0.35, and the histogram would look like a bell',expr:'skews[-1] < 0.35'},
     {d:'about 68% of those averages lie within one standard deviation, which is the Gaussian signature',expr:'abs(within1 - 0.68) < 0.02'}
   ],
   hints:[
     'Standardize first, then cube, then average: (((v - v.mean()) / v.std()) ** 3).mean().',
     'np.random.exponential(1.0, size=(S, n)).mean(axis=1) gives S averages of n draws each, in one call.',
     'within1 = float((np.abs(z) < 1).mean()). For a Gaussian this is 0.6827, and the n = 50 averages already hit it.'
   ]}],
 quiz:{title:'Quick check, the Gaussian',questions:[
   {q:'The central limit theorem explains why the Gaussian suits:',
    options:['Counts of rare events over a fixed interval','Quantities that are products of many independent factors','Quantities built from many small additive effects','Any dataset once it is large enough'],answer:2,whyWrong:['That is the Poisson, which the central limit theorem does not produce.','Products of many factors give a log-normal, because the logs add rather than the values.','','Size alone does not help. A million samples from an exponential are still exponential.'],
    why:'Sums converge to Gaussian. Products converge to log-normal, which is why income is not Gaussian.'},
   {q:'The maximum entropy argument says the Gaussian:',
    options:['Has the smallest possible tail probability of any shape','Is the most likely distribution in nature','Minimizes the error of any estimator','Assumes the least given a mean and a variance'],answer:3,whyWrong:['Its tails are thin, and plenty of distributions have thinner ones, including any with bounded support.','Nature does not have a most likely distribution. The argument is about what you assume, not about what occurs.','No such optimality is claimed. Estimator error depends on the estimator, not on the prior family.',''],
    why:'Any other shape with the same two moments encodes additional assumptions you did not state.'},
   {q:'Using mean squared error implicitly assumes:',
    options:['The features have been standardized first','The model is linear in its parameters','The residuals are Gaussian','The data contains no missing values'],answer:2,whyWrong:['Standardization helps optimization and has nothing to do with the noise model.','Squared error is used with nonlinear models constantly. The assumption is about the noise, not the form.','','Missing values are a data-cleaning matter and are unrelated to the loss.'],
    why:'Gaussian log-likelihood is a negative sum of squares plus a constant. The two objectives coincide.'}
 ]}}
,

{id:'pr13',
 title:'Advanced: latent variables and Gaussian mixture models',
 body:`
<div class="ground"><span class="gTag">🎯 What to do when one bell curve is obviously not enough</span>
<p>Plot the heights of everyone in a building and you may see two humps. No single Gaussian fits
that. A <b>mixture</b> says the data came from several Gaussians, and that you were never told
which one produced each point. That missing label is a <b>latent variable</b>, and latent
variables are the doorway to a large part of modern machine learning.</p></div>

<h3>The generative story</h3>
<p>Describe how you imagine the data was produced. For each point: first pick a component
<code>k</code> with probability <code>&pi;<sub>k</sub></code>, then draw the point from that
component's Gaussian. You observe the point, never the choice.</p>
<div class="mathblock">z ~ Categorical(&pi;),      x | z = k  ~  N(&mu;<sub>k</sub>, &Sigma;<sub>k</sub>)

p(x) = &Sigma;<sub>k=1..K</sub> &pi;<sub>k</sub> N(x | &mu;<sub>k</sub>, &Sigma;<sub>k</sub>)      &Sigma;<sub>k</sub> &pi;<sub>k</sub> = 1, &pi;<sub>k</sub> &ge; 0</div>
<p>The second line is the marginal, obtained by summing the joint over the unobserved
<code>z</code>. The <code>&pi;<sub>k</sub></code> are called <b>mixing coefficients</b>, and they
are the prior probability of each component before you look at the point.</p>
<div class="hardidea">🧠 <b>Why a mixture is not simply "several Gaussians fitted separately".</b>
If you knew which component produced each point, this would be trivial: split the data and fit
each group. You do not know. So the parameters depend on the assignments and the assignments
depend on the parameters, and that circularity is the entire difficulty. Everything in the next
lesson exists to break it.</div>

<h3>Responsibilities: soft assignment</h3>
<p>Given parameters, you can ask how likely it is that point <code>x<sub>n</sub></code> came from
component <code>k</code>. That is Bayes' theorem, with the mixing coefficient as the prior:</p>
<div class="mathblock">&gamma;(z<sub>nk</sub>) = p(z=k | x<sub>n</sub>) = &pi;<sub>k</sub>N(x<sub>n</sub>|&mu;<sub>k</sub>,&Sigma;<sub>k</sub>) / &Sigma;<sub>j</sub> &pi;<sub>j</sub>N(x<sub>n</sub>|&mu;<sub>j</sub>,&Sigma;<sub>j</sub>)</div>
<p>These are called <b>responsibilities</b>: how much each component is held responsible for each
point. They are probabilities, so they sum to 1 across components. A point in the middle of one
cluster gets responsibility near 1 from it; a point between two clusters splits its
responsibility.</p>
<div class="worked"><b>Worked.</b> Two components, equal weights. A point where
<code>N<sub>1</sub> = 0.30</code> and <code>N<sub>2</sub> = 0.10</code>. Then
<code>&gamma;<sub>1</sub> = 0.5(0.30)/[0.5(0.30)+0.5(0.10)] = 0.75</code> and
<code>&gamma;<sub>2</sub> = 0.25</code>. The point belongs three-quarters to the first
cluster.</div>

<h3>Why not just use k-means</h3>
<p>K-means is the special case you get by making three restrictions: every
<code>&Sigma;<sub>k</sub> = &sigma;&sup2;I</code> with the same <code>&sigma;</code>, all
<code>&pi;<sub>k</sub></code> equal, and responsibilities forced to 0 or 1 rather than allowed to
be fractions. Those restrictions cost you real things.</p>
<p>K-means finds spherical clusters of similar size, because that is what its assumptions
encode. A GMM with full covariance can find elongated, tilted clusters of different sizes and
different shapes. And soft responsibilities mean a point between two clusters is reported as ambiguous rather than arbitrarily assigned.</p>
<div class="demystify"><b>The trap that ruins naive implementations.</b> The likelihood of a GMM
is <b>unbounded</b>. Put one component's mean exactly on a single data point and shrink its
variance toward zero, and the density at that point goes to infinity, so the likelihood does too.
This is a genuine singularity, not a numerical artifact. Implementations avoid it by adding a
small constant to the diagonal of each &Sigma;, or by placing a prior on the covariances and
doing MAP instead of maximum likelihood. If your GMM produces a component that has collapsed onto
one point, this is what happened.</div>
`,
 exs:[{title:'Compute responsibilities, and find the points the model is unsure about',
   lang:'python',
   packages:['numpy'],
   prompt:`Two components: weights 0.3 and 0.7, means 0 and 4, standard deviations 1 and 1.5.
   2,000 points are drawn and their labels thrown away, which is exactly what makes z latent.
   <ol>
   <li><code>normpdf(x, m, s)</code>, the Gaussian density written out by hand,</li>
   <li><code>comp</code>, the 2000 by 2 array of <code>&pi;_k N(x_n | &mu;_k, &sigma;_k)</code>, and <code>px</code>, the mixture density, which is its row sums,</li>
   <li><code>gam</code>, the responsibilities: each row of <code>comp</code> divided by that row's own total,</li>
   <li><code>amb</code>, the count of points whose largest responsibility is below 0.9, the ones sitting between the clusters.</li>
   </ol>
   Notice that the column means of <code>gam</code> recover the mixing weights. That is the
   M-step for &pi; hiding in plain sight.`,
   starter:`import numpy as np
np.random.seed(0)

pi, mu, sd = np.array([0.3, 0.7]), np.array([0.0, 4.0]), np.array([1.0, 1.5])
N = 2000
z = (np.random.rand(N) > pi[0]).astype(int)      # the latent label, used once and discarded
x = np.random.randn(N) * sd[z] + mu[z]

# 1) The Gaussian density, no library
def normpdf(x, m, s):
    return

# 2) Weighted component densities, then the mixture density
comp = pi * normpdf(x[:, None], mu, sd)          # N by 2
px   =

# 3) Responsibilities: Bayes, with the mixing weight as the prior
gam =

# A single point at x = 0, and the share the first component takes of it
g0 = float(gam[np.argmin(np.abs(x))][0])

# The density integrates to 1, checked with a Riemann sum
grid = np.linspace(-8, 14, 4001)
dx   = grid[1] - grid[0]
area = float(((pi * normpdf(grid[:, None], mu, sd)).sum(axis=1) * dx).sum())

# 4) Points no component can claim with confidence
amb =

print(gam.mean(axis=0), area, amb)
`,
   solution:`import numpy as np
np.random.seed(0)

pi, mu, sd = np.array([0.3, 0.7]), np.array([0.0, 4.0]), np.array([1.0, 1.5])
N = 2000
z = (np.random.rand(N) > pi[0]).astype(int)      # the latent label, used once and discarded
x = np.random.randn(N) * sd[z] + mu[z]

# 1) The Gaussian density, no library
def normpdf(x, m, s):
    return np.exp(-0.5 * ((x - m) / s) ** 2) / (s * np.sqrt(2 * np.pi))

# 2) Weighted component densities, then the mixture density
comp = pi * normpdf(x[:, None], mu, sd)          # N by 2
px   = comp.sum(axis=1)

# 3) Responsibilities: Bayes, with the mixing weight as the prior
gam = comp / px[:, None]

# A single point at x = 0, and the share the first component takes of it
g0 = float(gam[np.argmin(np.abs(x))][0])

# The density integrates to 1, checked with a Riemann sum
grid = np.linspace(-8, 14, 4001)
dx   = grid[1] - grid[0]
area = float(((pi * normpdf(grid[:, None], mu, sd)).sum(axis=1) * dx).sum())

# 4) Points no component can claim with confidence
amb = int((gam.max(axis=1) < 0.9).sum())

print(gam.mean(axis=0), area, amb)
`,
   tests:[
     {d:'every point splits its responsibility across the two components, summing to 1',expr:'bool(np.allclose(gam.sum(axis=1), 1.0))'},
     {d:'the density you wrote integrates to 1 over the grid, so it really is a density',expr:'abs(area - 1) < 0.01'},
     {d:'the point nearest x = 0 belongs about 95% to the first component',expr:'g0 > 0.9'},
     {d:'the average responsibility for component 0 recovers its mixing weight of 0.3',expr:'abs(float(gam[:, 0].mean()) - 0.3) < 0.03'},
     {d:'a few hundred points are genuinely ambiguous, and hard assignment would have to guess at every one of them',expr:'100 < amb < 500'}
   ],
   hints:[
     'The density is exp(-0.5 * ((x - m) / s) ** 2) / (s * sqrt(2 * pi)). Broadcasting x[:, None] against the length-2 arrays gives you the whole N by 2 table at once.',
     'px = comp.sum(axis=1) is the denominator in Bayes, the total density at that point across components.',
     'gam = comp / px[:, None]. Then amb = int((gam.max(axis=1) < 0.9).sum()) counts the points where no component is confident.'
   ]}],
 quiz:{title:'Quick check, mixtures',questions:[
   {q:'The latent variable in a GMM represents:',
    options:['The distance from each point to its cluster center','The noise added to each observation','The number of clusters in the data','Which component produced each data point'],answer:3,whyWrong:['Distance is computed from the parameters. The latent variable is a discrete label.','The noise is captured by each component\'s covariance.','The number of components is a hyperparameter you set. The latent variable is per data point.',''],
    why:'z is the unobserved component label. If you knew it, fitting would be trivial.'},
   {q:'A responsibility γ(z_nk) is:',
    options:['The prior probability of component k','The posterior probability that k produced n','The distance from point n to the center of component k','The fraction of variance explained by k'],answer:1,whyWrong:['That is the mixing coefficient, the prior. Responsibility is what it becomes after seeing the point.','','Distance is not a probability, and a GMM weights by density rather than by distance.','Explained variance is a PCA idea and has no role in a mixture model.'],
    why:'It is p(z=k | xₙ) by Bayes, using π as the prior. They sum to one across components.'},
   {q:'K-means is a GMM restricted to:',
    options:['Diagonal covariances estimated separately per cluster','Two components with equal mixing weights','Spherical equal covariances and hard assignment','Data that has been standardized beforehand'],answer:2,whyWrong:['Diagonal covariances are still per-cluster and still allow different widths per axis.','Neither the component count nor equal weights is what makes the difference.','','Standardization is a preprocessing choice available to both.'],
    why:'Shared σ²I, equal π, and responsibilities forced to 0 or 1. Those restrictions are why it finds only round clusters.'}
 ]}},

{id:'pr14',
 title:'Advanced: expectation maximization, derived from scratch',
 body:`
<div class="ground"><span class="gTag">🎯 The algorithm for when the thing you need was never observed</span>
<p>The circularity from the last lesson looks fatal: parameters need assignments, assignments
need parameters. EM breaks it by alternating, and the reason that alternation is guaranteed to
work is a genuinely beautiful piece of mathematics built on the same Jensen inequality that gave
us <code>D<sub>KL</sub> &ge; 0</code>.</p></div>

<h3>The algorithm first, so you know where we are going</h3>
<p><b>Initialize</b> the parameters, often with k-means. Then repeat until the log-likelihood
stops improving:</p>
<p><b>E-step.</b> With parameters fixed, compute the responsibilities
<code>&gamma;(z<sub>nk</sub>)</code> for every point and component.</p>
<p><b>M-step.</b> With responsibilities fixed, update the parameters as weighted versions of the
ordinary formulas, using responsibilities as the weights:</p>
<div class="mathblock">N<sub>k</sub> = &Sigma;<sub>n</sub> &gamma;(z<sub>nk</sub>)

&mu;<sub>k</sub> = (1/N<sub>k</sub>) &Sigma;<sub>n</sub> &gamma;(z<sub>nk</sub>) x<sub>n</sub>

&Sigma;<sub>k</sub> = (1/N<sub>k</sub>) &Sigma;<sub>n</sub> &gamma;(z<sub>nk</sub>)(x<sub>n</sub>-&mu;<sub>k</sub>)(x<sub>n</sub>-&mu;<sub>k</sub>)<sup>T</sup>

&pi;<sub>k</sub> = N<sub>k</sub> / N</div>
<p>Read those: each is the familiar sample mean, sample covariance, and proportion, except every
point contributes in proportion to how responsible that component is for it.
<code>N<sub>k</sub></code> is the effective number of points belonging to component
<code>k</code>.</p>

<h3>Why the alternation cannot make things worse</h3>
<p>Here is the derivation. We want to maximize the log-likelihood, which contains a sum inside a
logarithm and is therefore awkward:</p>
<div class="mathblock">log p(X|&theta;) = &Sigma;<sub>n</sub> log &Sigma;<sub>z</sub> p(x<sub>n</sub>, z | &theta;)</div>
<p>Introduce any distribution <code>q(z)</code> over the latent variable, multiply and divide,
and apply Jensen's inequality, exactly as in the KL lesson:</p>
<div class="mathblock">log &Sigma;<sub>z</sub> p(x,z|&theta;) = log &Sigma;<sub>z</sub> q(z) [ p(x,z|&theta;) / q(z) ]
                     &ge; &Sigma;<sub>z</sub> q(z) log [ p(x,z|&theta;) / q(z) ]  &equiv;  L(q, &theta;)</div>
<p><code>L(q, &theta;)</code> is a <b>lower bound</b> on the log-likelihood, for any choice of
<code>q</code>. It is called the <b>evidence lower bound</b>, or ELBO. And the gap between the
bound and the truth turns out to be exactly a KL divergence:</p>
<div class="mathblock">log p(X|&theta;) = L(q, &theta;) + D<sub>KL</sub>( q(z) || p(z|X,&theta;) )</div>
<div class="hardidea">🧠 <b>This single identity explains both steps at once.</b> Since KL is
never negative, <code>L</code> is always below the log-likelihood, and they are equal exactly
when the KL term is zero, which happens exactly when
<code>q(z) = p(z|X,&theta;)</code>, the true posterior. So:
<br><br>
<b>The E-step</b> holds <code>&theta;</code> fixed and sets <code>q</code> to the posterior. That
drives KL to zero, so the bound now touches the log-likelihood at the current parameters. Those
posteriors are the responsibilities.
<br><br>
<b>The M-step</b> holds <code>q</code> fixed and maximizes <code>L</code> over
<code>&theta;</code>. Because <code>L</code> is a bound, raising it must raise the
log-likelihood at least as much, since the log-likelihood sits above it and they were touching.
<br><br>
So every full iteration increases the log-likelihood or leaves it unchanged. Never decreases. The
proof is that one identity.</div>

<h3>What the M-step actually maximizes</h3>
<p>With <code>q</code> fixed, drop the terms of <code>L</code> that do not involve
<code>&theta;</code> and you are left with</p>
<div class="mathblock">Q(&theta;, &theta;<sup>old</sup>) = E<sub>q</sub>[ log p(X, Z | &theta;) ] = &Sigma;<sub>n</sub>&Sigma;<sub>k</sub> &gamma;(z<sub>nk</sub>) log[ &pi;<sub>k</sub> N(x<sub>n</sub>|&mu;<sub>k</sub>,&Sigma;<sub>k</sub>) ]</div>
<p>This is the <b>expected complete-data log-likelihood</b>, and it is why the algorithm has its
name. The awkward log-of-a-sum has become a sum-of-logs, which separates cleanly, so setting
derivatives to zero gives the closed-form updates above. Differentiating with respect to
<code>&mu;<sub>k</sub></code> and solving yields precisely the weighted mean; the
<code>&pi;</code> update needs a Lagrange multiplier for the constraint
<code>&Sigma;&pi;<sub>k</sub> = 1</code>, which is where <code>N<sub>k</sub>/N</code> comes
from.</p>

<h3>What the guarantee does and does not promise</h3>
<p>It promises the likelihood never decreases, so the algorithm converges. It does <b>not</b>
promise you reach the global maximum. EM is a hill-climb, and mixture likelihoods have many local
optima, so the answer depends on where you started. Standard practice is several restarts, keep
the best. It also converges slowly near the optimum compared to second-order methods, which is
usually an acceptable price for having closed-form steps and no learning rate to tune.</p>

<h3>Where else you will meet it</h3>
<p>EM is a general recipe, not a GMM trick. It fits hidden Markov models through the
Baum-Welch algorithm, it handles missing data by treating the missing entries as latent, it
underpins probabilistic PCA and factor analysis, and it fits topic models. And the ELBO you just
derived is the same object that variational autoencoders maximize, the difference being that when
the true posterior is intractable you restrict <code>q</code> to a family you can handle and
accept a nonzero KL gap. Variational inference is EM with the E-step done approximately.</p>
`,
 docs:[['Dempster, Laird & Rubin (1977), the paper that named EM','https://www.jstor.org/stable/2984875'],['Bishop, Pattern Recognition and Machine Learning, chapter 9','https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/']],
 exs:[{title:'Run EM and check the log-likelihood never falls',
   lang:'python',
   packages:['numpy'],
   prompt:`The same 2,000 points, and now the parameters are unknown. Start deliberately badly:
   equal weights, means at -1 and 1, both standard deviations 2. Then alternate 60 times:
   <ol>
   <li>the E-step, <code>gam</code>, the responsibilities under the current parameters,</li>
   <li>the current log-likelihood, <code>sum(log px)</code>, appended to <code>lls</code> before any update,</li>
   <li>the M-step: <code>mu</code>, <code>sd</code> and <code>pi</code>, the weighted mean, weighted standard deviation and weighted proportion, with the responsibilities as weights.</li>
   </ol>
   The second test is the one that matters. Nothing in your code enforces it. It holds because of
   the ELBO identity in the lesson.`,
   starter:`import numpy as np
np.random.seed(0)

pi_t, mu_t, sd_t = np.array([0.3, 0.7]), np.array([0.0, 4.0]), np.array([1.0, 1.5])
N = 2000
z = (np.random.rand(N) > pi_t[0]).astype(int)
x = np.random.randn(N) * sd_t[z] + mu_t[z]

def normpdf(x, m, s):
    return np.exp(-0.5 * ((x - m) / s) ** 2) / (s * np.sqrt(2 * np.pi))

# A deliberately poor starting point
pi, mu, sd = np.array([0.5, 0.5]), np.array([-1.0, 1.0]), np.array([2.0, 2.0])
lls = []

for it in range(60):
    comp = pi * normpdf(x[:, None], mu, sd)
    px   = comp.sum(axis=1)

    # 2) The log-likelihood of the parameters we are about to replace
    lls.append(                 )

    # 1) E-step
    gam =
    Nk  = gam.sum(axis=0)

    # 3) M-step: the ordinary formulas, weighted by responsibility
    mu =
    sd =
    pi =

lls  = np.array(lls)
step = np.diff(lls)
print(lls[0], lls[-1], step.min(), np.sort(mu), np.sort(pi))
`,
   solution:`import numpy as np
np.random.seed(0)

pi_t, mu_t, sd_t = np.array([0.3, 0.7]), np.array([0.0, 4.0]), np.array([1.0, 1.5])
N = 2000
z = (np.random.rand(N) > pi_t[0]).astype(int)
x = np.random.randn(N) * sd_t[z] + mu_t[z]

def normpdf(x, m, s):
    return np.exp(-0.5 * ((x - m) / s) ** 2) / (s * np.sqrt(2 * np.pi))

# A deliberately poor starting point
pi, mu, sd = np.array([0.5, 0.5]), np.array([-1.0, 1.0]), np.array([2.0, 2.0])
lls = []

for it in range(60):
    comp = pi * normpdf(x[:, None], mu, sd)
    px   = comp.sum(axis=1)

    # 2) The log-likelihood of the parameters we are about to replace
    lls.append(float(np.log(px).sum()))

    # 1) E-step
    gam = comp / px[:, None]
    Nk  = gam.sum(axis=0)

    # 3) M-step: the ordinary formulas, weighted by responsibility
    mu = (gam * x[:, None]).sum(axis=0) / Nk
    sd = np.sqrt((gam * (x[:, None] - mu) ** 2).sum(axis=0) / Nk)
    pi = Nk / N

lls  = np.array(lls)
step = np.diff(lls)
print(lls[0], lls[-1], step.min(), np.sort(mu), np.sort(pi))
`,
   tests:[
     {d:'the log-likelihood climbs by more than 1,500 from that bad start',expr:'lls[-1] - lls[0] > 1500'},
     {d:'it never decreases, at any of the 59 steps, which is the one thing the derivation promises',expr:'float(step.min()) > -1e-9'},
     {d:'the recovered means land near the true 0 and 4, although nothing ever told the algorithm the labels',expr:'bool(np.allclose(np.sort(mu), [0.0, 4.0], atol=0.15))'},
     {d:'the recovered mixing weights land near the true 0.3 and 0.7',expr:'abs(float(np.sort(pi)[0]) - 0.3) < 0.03'},
     {d:'the final step barely moves the likelihood, so this run has converged to a local optimum',expr:'abs(float(step[-1])) < 1e-4'}
   ],
   hints:[
     'The E-step is one line, and it is the same one as the previous lesson: gam = comp / px[:, None].',
     'Nk = gam.sum(axis=0) is the effective number of points per component. Then mu = (gam * x[:, None]).sum(axis=0) / Nk.',
     'sd = np.sqrt((gam * (x[:, None] - mu) ** 2).sum(axis=0) / Nk) and pi = Nk / N. Append float(np.log(px).sum()) before updating anything, or the monotonicity test compares the wrong pairs.'
   ]}],
 quiz:{title:'Quick check, EM',questions:[
   {q:'The E-step sets q(z) to the posterior in order to:',
    options:['Reduce the number of parameters the M-step updates','Make the KL gap zero so the bound is tight','Remove the need for an initialization','Guarantee the global maximum is reached'],answer:1,whyWrong:['The parameter count is unchanged. What changes is how tight the bound is.','','Initialization is still needed, and EM is famously sensitive to it.','Nothing guarantees a global maximum. EM finds a local one.'],
    why:'log p = L + KL. Setting q to the true posterior zeroes the KL term, so the bound touches the likelihood.'},
   {q:'EM guarantees that each iteration:',
    options:['Reduces the number of active components','Converges in a fixed number of steps','Reaches the global optimum of the likelihood','Never decreases the log-likelihood'],answer:3,whyWrong:['Components can collapse in practice, and nothing in the guarantee promises it.','The number of steps depends on the data and the initialization.','It reaches a local optimum. Multiple restarts are standard practice for exactly this reason.',''],
    why:'Monotonic improvement only. Local optima are real, which is why multiple restarts are standard.'},
   {q:'The M-step is tractable because taking the expectation:',
    options:['Makes the covariance matrices diagonal','Removes the latent variables from the model','Turns a log of a sum into a sum of logs','Eliminates the mixing coefficients'],answer:2,whyWrong:['Covariance structure is a modeling choice, and the M-step does not simplify it.','The latent variables remain in the model. What changes is that they are replaced by their expected values.','','The mixing coefficients are estimated in the M-step rather than eliminated.'],
    why:'The expected complete-data log-likelihood separates, so each parameter has a closed-form solution.'}
 ]}},

{id:'pr15',
 title:'Advanced: the other places Gaussians show up in machine learning',
 body:`
<div class="ground"><span class="gTag">🎯 Six uses, so the pattern stops looking like a coincidence</span>
<p>Having done the Gaussian and the mixture properly, it is worth collecting the other places the
same distribution appears, because recognizing it saves you from learning several things that are
really one thing.</p></div>

<h3>1. Linear regression is a Gaussian likelihood</h3>
<p>As shown two lessons ago, assuming <code>y = w<sup>T</sup>x + &epsilon;</code> with
<code>&epsilon; ~ N(0,&sigma;&sup2;)</code> makes maximum likelihood identical to least squares.
Add a Gaussian prior on <code>w</code> and MAP becomes ridge regression. The entire classical
toolkit is Gaussian assumptions wearing different names.</p>

<h3>2. Gaussian naive Bayes</h3>
<p>Model each feature within each class as an independent Gaussian, then classify by posterior.
"Naive" refers to the independence assumption, which is usually false and often works anyway,
because the decision boundary can be roughly right even when the probabilities are badly
calibrated.</p>
<div class="mathblock">p(y=c | x) &prop; p(y=c) &Pi;<sub>d</sub> N(x<sub>d</sub> | &mu;<sub>cd</sub>, &sigma;<sub>cd</sub>&sup2;)</div>

<h3>3. Weight initialization</h3>
<p>Networks are initialized from a Gaussian whose variance is chosen from the layer widths.
<b>Xavier</b> initialization uses <code>Var = 2/(n<sub>in</sub>+n<sub>out</sub>)</code>, and
<b>He</b> initialization uses <code>Var = 2/n<sub>in</sub></code> for ReLU networks.</p>
<div class="worked"><b>Where the 2/n comes from.</b> A neuron computes
<code>&Sigma;<sub>i</sub>w<sub>i</sub>x<sub>i</sub></code> over <code>n</code> inputs. If the
weights are independent with variance <code>&sigma;<sub>w</sub>&sup2;</code>, the variance of that
sum is <code>n&sigma;<sub>w</sub>&sup2;Var[x]</code>. To keep signal variance stable layer to
layer you want that factor to be 1, so <code>&sigma;<sub>w</sub>&sup2; = 1/n</code>. ReLU zeroes
roughly half the outputs, halving the variance, so you double it back:
<code>2/n</code>. The number is derived, not tuned.</div>

<h3>4. Gaussian processes</h3>
<p>Instead of a distribution over parameters, put a distribution over <b>functions</b>: any
finite set of points has a joint Gaussian distribution, with the covariance between two points
given by a kernel measuring how similar their inputs are. Because Gaussians are closed under
conditioning, observing some points gives a closed-form posterior over the rest, with calibrated
uncertainty. Excellent with little data, and the cost is <code>O(n&sup3;)</code>, which is why it
is not used with much of it.</p>

<h3>5. Variational autoencoders</h3>
<p>A VAE encodes each input to a Gaussian in latent space rather than to a point, samples from
it, and decodes. The objective is the ELBO from the EM lesson: reconstruction accuracy minus the
KL divergence between the encoder's Gaussian and a standard Gaussian prior. Both Gaussians are
chosen so that KL has a closed form and so that sampling can be written as
<code>z = &mu; + &sigma;&odot;&epsilon;</code> with <code>&epsilon; ~ N(0,I)</code>, which keeps
the randomness out of the path the gradient travels. That trick is called
<b>reparameterization</b> and it depends on the Gaussian's scaling property.</p>

<h3>6. Diffusion models</h3>
<p>Add Gaussian noise to an image in small steps until it is pure noise, then train a network to
reverse one step at a time. The forward process is chosen to be Gaussian precisely because the
sum-of-Gaussians property lets you jump to any noise level in closed form instead of simulating
every step, which is what makes training affordable.</p>
<div class="demystify"><b>The through-line.</b> In every one of these the Gaussian is chosen for
the same reason: it is closed under the operations involved, so something that would otherwise
require an intractable integral has a closed form. When you see a Gaussian assumption in a paper,
ask which integral it is buying, and you will usually find it immediately.</div>
`,
 exs:[{title:'Kill the signal in a deep network, then rescue it with 2/n',
   lang:'python',
   packages:['numpy'],
   prompt:`Ten ReLU layers of width 256, one batch of 512 standard normal inputs, three choices of
   weight variance. Record the variance of the activations after every layer:
   <ol>
   <li><code>he</code>, with <code>Var[w] = 2/n_in</code>, the value the lesson derives,</li>
   <li><code>half</code>, with <code>Var[w] = 1/n_in</code>, right for a linear layer but forgetting that ReLU throws away half the signal,</li>
   <li><code>naive</code>, with a fixed standard deviation of 0.01, the pre-2010 default,</li>
   <li><code>ratios</code>, the layer-to-layer variance ratios of the <code>half</code> run.</li>
   </ol>
   Only one of the three still has a signal at layer ten. The median ratio should sit close to
   <b>0.5</b>, which is precisely the factor the 2 exists to cancel.`,
   starter:`import numpy as np
np.random.seed(0)

n_in, layers, batch = 256, 10, 512
x0 = np.random.randn(batch, n_in)

def forward(var_w):
    h, variances = x0.copy(), []
    for _ in range(layers):
        W = np.random.randn(n_in, n_in) * np.sqrt(var_w)
        h =                              # one linear layer, then ReLU
        variances.append(float(h.var()))
    return np.array(variances)

# 1) He: the derived value
he    = forward(              )

# 2) The same derivation, without the ReLU correction
half  = forward(              )

# 3) A fixed small scale, chosen by habit rather than derivation
naive = forward(0.01 ** 2)

# 4) What each layer does to the variance in the second run
ratios =

print(he[-1], half[-1], naive[-1], float(np.median(ratios)))
`,
   solution:`import numpy as np
np.random.seed(0)

n_in, layers, batch = 256, 10, 512
x0 = np.random.randn(batch, n_in)

def forward(var_w):
    h, variances = x0.copy(), []
    for _ in range(layers):
        W = np.random.randn(n_in, n_in) * np.sqrt(var_w)
        h = np.maximum(h @ W, 0.0)       # one linear layer, then ReLU
        variances.append(float(h.var()))
    return np.array(variances)

# 1) He: the derived value
he    = forward(2.0 / n_in)

# 2) The same derivation, without the ReLU correction
half  = forward(1.0 / n_in)

# 3) A fixed small scale, chosen by habit rather than derivation
naive = forward(0.01 ** 2)

# 4) What each layer does to the variance in the second run
ratios = half[1:] / half[:-1]

print(he[-1], half[-1], naive[-1], float(np.median(ratios)))
`,
   tests:[
     {d:'He keeps the activation variance flat: layer 10 is within a factor of two of layer 1',expr:'0.5 < he[-1] / he[0] < 2.0'},
     {d:'without the factor of 2, each layer passes on about half the variance it received',expr:'abs(float(np.median(ratios)) - 0.5) < 0.05'},
     {d:'ten halvings cost a factor of several hundred, from a change of 2 in one constant',expr:'half[0] / half[-1] > 100'},
     {d:'the fixed 0.01 scale wipes the signal out completely, which is what made deep networks untrainable before this was worked out',expr:'naive[-1] < 1e-12'},
     {d:'only the He run still carries a usable signal at the last layer',expr:'he[-1] > 0.1 and he[-1] > 100 * half[-1]'}
   ],
   hints:[
     'A layer is h = np.maximum(h @ W, 0.0): the matrix multiply, then ReLU clipping the negatives to zero.',
     'The two variances to pass in are 2.0 / n_in and 1.0 / n_in. Everything else about the two runs is identical.',
     'ratios = half[1:] / half[:-1] compares each layer with the one before it, and the median of those will be almost exactly 0.5.'
   ]}],
 quiz:{title:'Quick check, Gaussians in ML',questions:[
   {q:'He initialization uses variance 2/n_in because:',
    options:['It keeps signal variance stable, doubled for ReLU','It matches the scale of typical normalized input data','It minimizes the number of dead neurons','It was found empirically to train fastest'],answer:0,whyWrong:['','Input scale is handled by normalizing the data. The factor concerns what happens through the layers.','Dead neurons are a related symptom, and the derivation is about keeping the variance of the signal constant.','It was derived rather than found by search, and the derivation is what makes it transfer to new architectures.'],
    why:'Var of the weighted sum is n·σ²·Var[x]; setting it to 1 gives 1/n, and ReLU zeroing half the outputs doubles it.'},
   {q:'The reparameterization trick in a VAE relies on:',
    options:['The encoder producing discrete latent codes','The Gaussian being closed under scaling and shifting','KL divergence being symmetric in the order of its arguments','The decoder being a deterministic function'],answer:1,whyWrong:['Discrete codes are exactly the case the trick does not cover, which is why Gumbel-softmax exists.','','KL is not symmetric, and the trick does not need it to be.','The decoder is deterministic in a VAE, and the trick is about the sampling step in the encoder.'],
    why:'z = μ + σ⊙ε keeps the sampling outside the gradient path, and only works because scaling a Gaussian gives a Gaussian.'},
   {q:'Across all six examples, the Gaussian is chosen mainly because:',
    options:['It has the fewest parameters to estimate','It makes an otherwise intractable integral solvable','It is the only common distribution with finite variance','It best describes how real data is distributed'],answer:1,whyWrong:['It has more parameters than several alternatives, two rather than one.','','Plenty of distributions have finite variance, including the uniform.','Real data is frequently skewed or heavy-tailed. Convenience is the real reason.'],
    why:'Closure under the relevant operation is what buys the closed form. That is the common thread.'}
 ]}}
,

{id:'pr16',
 title:'Fundamentals: estimators, bias, and the laws that justify using a sample',
 body:`
<div class="ground"><span class="gTag">🎯 Why an average of 200 things tells you anything about a million</span>
<p>Every number you compute from data is a guess at something you cannot see. This lesson is
about why those guesses work, when they are systematically wrong, and the one place a
denominator of <code>n-1</code> comes from.</p></div>

<h3>The CDF, and why it is often the more useful object</h3>
<div class="mathblock">F(x) = P(X &le; x)     non-decreasing,  F(-&infin;) = 0,  F(&infin;) = 1

discrete:   F(x) = &Sigma;<sub>t &le; x</sub> p(t)          continuous:  F(x) = &int;<sub>-&infin;</sub><sup>x</sup> p(t)dt,  p(x) = F'(x)</div>
<p>The <b>cumulative distribution function</b> always exists, whether or not a density does, and
it is what percentiles are read from. The median is <code>F<sup>-1</sup>(0.5)</code>. It also
gives you a way to generate samples: if <code>U</code> is uniform on [0,1], then
<code>F<sup>-1</sup>(U)</code> has distribution <code>F</code>. That is <b>inverse transform
sampling</b>, and it is how a random number generator producing uniforms becomes one producing
anything.</p>

<h3>Estimators, and what it means for one to be biased</h3>
<p>An <b>estimator</b> is any function of the data used to guess a parameter. It is itself a
random variable, since a different sample gives a different value. Two properties matter:</p>
<div class="mathblock">bias(&theta;&#770;) = E[&theta;&#770;] - &theta;        MSE(&theta;&#770;) = bias&sup2; + Var[&theta;&#770;]</div>
<p><b>Unbiased</b> means right on average across repeated samples. It does not mean right on your
sample, and a biased estimator with low variance often beats an unbiased one with high variance,
which is exactly the trade the next lesson formalizes.</p>

<h3>Where n-1 comes from, derived</h3>
<p>The sample mean is unbiased: <code>E[x&#772;] = &mu;</code>, directly by linearity. The naive
sample variance is not. Consider dividing by <code>n</code>:</p>
<div class="mathblock">E[ (1/n)&Sigma;(x<sub>i</sub> - x&#772;)&sup2; ] = &sigma;&sup2; (n-1)/n  &lt;  &sigma;&sup2;</div>
<p>It underestimates, every time. The reason is intuitive once stated: the deviations are measured
from <code>x&#772;</code>, which was itself computed from the same data and therefore sits closer
to the points than the true <code>&mu;</code> does. Squared deviations from the sample mean are
the smallest they could be from any center, so they undershoot.</p>
<div class="worked"><b>The correction.</b> Dividing by <code>n-1</code> instead of
<code>n</code> multiplies the result by <code>n/(n-1)</code>, canceling the factor exactly and
giving an unbiased estimate. The <code>n-1</code> is the number of <b>degrees of freedom</b>
left: once you know <code>x&#772;</code> and any <code>n-1</code> of the deviations, the last one
is determined, since they sum to zero. You spent one degree of freedom estimating the mean.</div>

<h3>The two laws that make sampling legitimate</h3>
<p><b>The law of large numbers.</b> As the sample grows, the sample mean converges to the true
mean:</p>
<div class="mathblock">x&#772;<sub>n</sub> &rarr; &mu;   as n &rarr; &infin;</div>
<p>This is the theorem that says estimation is possible at all. Without it there would be no
reason to think a sample tells you about a population.</p>
<p><b>The central limit theorem</b> tells you how fast, and in what shape. The standard deviation
of the sample mean is <code>&sigma;/&radic;n</code>, called the <b>standard error</b>, and the
distribution of the sample mean is approximately Gaussian.</p>
<div class="hardidea">🧠 <b>The square root is the whole economics of data collection.</b> Error
falls as <code>1/&radic;n</code>, so halving your error requires <b>four times</b> the data, and
reducing it tenfold requires a hundred times. This single fact explains why the step from 100 to
1,000 examples transforms a model and the step from 100,000 to 1,000,000 often barely moves it,
and why past a point buying more data is worse value than improving the model or the
features.</div>
<div class="worked"><b>Confidence interval, worked.</b> With <code>n = 100</code>,
<code>x&#772; = 50</code>, <code>s = 10</code>: standard error is
<code>10/&radic;100 = 1</code>. An approximate 95% interval is
<code>50 &plusmn; 1.96(1) = [48.04, 51.96]</code>. Read it correctly: it is a statement about the
procedure, meaning 95% of intervals built this way contain the true mean. It is not a 95%
probability that &mu; lies in this particular interval, which is the Bayesian credible interval
from the earlier lesson.</div>

<h3>Monte Carlo and the bootstrap</h3>
<p><b>Monte Carlo</b> estimation is the law of large numbers used deliberately: to compute an
expectation you cannot integrate, draw samples and average.</p>
<div class="mathblock">E[f(X)] &asymp; (1/N) &Sigma;<sub>i=1..N</sub> f(x<sub>i</sub>),   x<sub>i</sub> ~ p(x)</div>
<p>The error falls as <code>1/&radic;N</code> regardless of dimension, which is why Monte Carlo
wins over grid methods in high dimensions, where a grid is hopeless. Dropout at prediction time,
run repeatedly to estimate uncertainty, is Monte Carlo. So is most of Bayesian computation.</p>
<p><b>The bootstrap</b> answers "how uncertain is this statistic" when no formula exists.
Resample your data with replacement, recompute the statistic, repeat a thousand times, and look
at the spread of the results. It treats your sample as a stand-in for the population, which is
justified by the same law of large numbers. It is also the idea behind <b>bagging</b> and
therefore behind random forests.</p>
`,
 exs:[{title:'Catch an estimator being wrong on average',
   lang:'python',
   packages:['numpy'],
   prompt:`20,000 samples of 5 draws each, from a standard normal whose true variance is 1. For
   every sample compute both variance estimators, then average across the 20,000:
   <ol>
   <li><code>means</code>, each sample's own mean, and <code>dev2</code>, its sum of squared deviations from that mean,</li>
   <li><code>v_n</code>, that sum divided by n, and <code>v_nm1</code>, the same sum divided by n-1,</li>
   <li><code>bias_n</code>, the average of <code>v_n</code> minus the true variance of 1.</li>
   </ol>
   The 1/n estimator should average near <b>0.8</b>, which is (n-1)/n, rather than near 1. Missing
   by 20% every time, always in the same direction, is what bias means.`,
   starter:`import numpy as np
np.random.seed(0)

n, S = 5, 20000
X = np.random.randn(S, n)          # true mean 0, true variance 1

# 1) Each sample's own mean, and its squared deviations from it
means = X.mean(axis=1)
dev2  =

# 2) The two estimators
v_n   =
v_nm1 =

# 3) How far the first one is off, on average
bias_n =

print(means.mean(), v_n.mean(), v_nm1.mean(), bias_n)
`,
   solution:`import numpy as np
np.random.seed(0)

n, S = 5, 20000
X = np.random.randn(S, n)          # true mean 0, true variance 1

# 1) Each sample's own mean, and its squared deviations from it
means = X.mean(axis=1)
dev2  = ((X - means[:, None]) ** 2).sum(axis=1)

# 2) The two estimators
v_n   = dev2 / n
v_nm1 = dev2 / (n - 1)

# 3) How far the first one is off, on average
bias_n = float(v_n.mean()) - 1.0

print(means.mean(), v_n.mean(), v_nm1.mean(), bias_n)
`,
   tests:[
     {d:'the sample mean is unbiased: over 20,000 samples it averages to within 0.01 of the true 0',expr:'abs(float(means.mean())) < 0.01'},
     {d:'the 1/n estimator averages about 0.8, not 1, and 0.8 is exactly (n-1)/n',expr:'abs(float(v_n.mean()) - 0.8) < 0.02'},
     {d:'the 1/(n-1) estimator averages about 1, so its bias is essentially zero',expr:'abs(float(v_nm1.mean()) - 1) < 0.02'},
     {d:'the bias is negative and large: the estimator undershoots, and more samples will not fix it',expr:'bias_n < -0.15'},
     {d:'multiplying the biased average by n/(n-1) recovers the unbiased one exactly, which is all the correction ever was',expr:'abs(float(v_n.mean()) * n / (n - 1) - float(v_nm1.mean())) < 1e-12'}
   ],
   hints:[
     'Deviations are measured from each row’s own mean, so subtract means[:, None] before squaring and summing along axis=1.',
     'The two estimators share dev2 and differ only in the denominator: dev2 / n and dev2 / (n - 1).',
     'bias_n = float(v_n.mean()) - 1.0, since the true variance is 1. Expect about -0.2, which is -1/n.'
   ]}],
 quiz:{title:'Quick check, estimation',questions:[
   {q:'Sample variance divides by n-1 because:',
    options:['It makes the result match the standard deviation','It prevents division by zero when n is one','Deviations from the sample mean are too small','Small samples need a larger denominator'],answer:2,whyWrong:['The standard deviation is the square root of whichever variance you computed. The denominator is a separate question.','With n equal to one there is no spread to estimate, and the undefined result is arguably the right answer.','','It is not a size-based fudge. The correction is exactly one, at every n.'],
    why:'The sample mean sits closer to the data than μ does, so squared deviations undershoot by exactly n/(n-1).'},
   {q:'Standard error falls as 1/√n, which implies:',
    options:['A hundred times the data cuts error tenfold','Doubling the data halves the error','Error is independent of the sample size','Ten times the data cuts error by a factor of ten'],answer:0,whyWrong:['','Doubling gives a factor of the square root of two, about 1.41, not 2.','It depends on n very much. That dependence is the whole point of the formula.','Ten times the data cuts it by the square root of ten, about 3.2.'],
    why:'√100 = 10. This is why going from 100 to 1,000 examples matters far more than 100,000 to 1,000,000.'},
   {q:'The bootstrap estimates uncertainty by:',
    options:['Assuming the statistic is Gaussian around its mean','Fitting the model on progressively larger subsets','Resampling the data with replacement many times','Splitting the data into equal sized folds'],answer:2,whyWrong:['Assuming Gaussian is the parametric shortcut the bootstrap exists to avoid.','That is a learning curve, which shows how performance scales with data.','','That is cross-validation, which estimates predictive performance rather than the sampling distribution of a statistic.'],
    why:'It uses the sample as a stand-in for the population, then looks at the spread of the recomputed statistic.'}
 ]}},

{id:'pr17',
 title:'Advanced: the bias-variance decomposition, and what overfitting actually is',
 body:`
<div class="ground"><span class="gTag">🎯 Overfitting and underfitting, as an equation rather than a picture</span>
<p>You have seen the two-curve diagram. Underneath it is an exact identity that says expected
error splits into three parts, one of which you cannot do anything about. Once you have the
identity, every practical technique in machine learning has an obvious place in it.</p></div>

<h3>Setting it up</h3>
<p>Suppose the truth is <code>y = f(x) + &epsilon;</code> with <code>E[&epsilon;] = 0</code> and
<code>Var[&epsilon;] = &sigma;&sup2;</code>. You fit a model <code>f&#770;</code> on a random
training set, so <code>f&#770;</code> is itself random: a different sample gives a different
fitted model. Ask for the expected squared error at a fixed point <code>x</code>, averaged over
both the noise and the choice of training set.</p>

<h3>The derivation</h3>
<p>Write <code>f&#772;(x) = E[f&#770;(x)]</code>, the average prediction across all possible
training sets. Add and subtract it inside the square:</p>
<div class="mathblock">E[(y - f&#770;)&sup2;] = E[(f + &epsilon; - f&#770;)&sup2;]
            = E[(f - f&#770;)&sup2;] + E[&epsilon;&sup2;]           (cross term vanishes: &epsilon; is independent, mean zero)
            = E[(f - f&#772; + f&#772; - f&#770;)&sup2;] + &sigma;&sup2;
            = (f - f&#772;)&sup2; + E[(f&#772; - f&#770;)&sup2;] + &sigma;&sup2;
            =   bias&sup2;    +     variance     + irreducible</div>
<p>The cross term in the last expansion vanishes because <code>(f - f&#772;)</code> is a constant
while <code>E[f&#772; - f&#770;] = 0</code> by the definition of <code>f&#772;</code>. Three terms,
and each has a plain meaning:</p>
<p><b>Bias</b> is how far the average model is from the truth. It measures whether your model
family can represent <code>f</code> at all. <b>Variance</b> is how much the fitted model moves
when the training set changes. <b>Irreducible error</b> is the noise, and no model, no data and
no algorithm removes it.</p>
<div class="worked"><b>Reading it on two extremes.</b> Predict a constant, ignoring
<code>x</code> entirely: variance is zero, since the training set barely changes the answer, and
bias is enormous. Fit a polynomial through every point exactly: bias is near zero, since the
family can represent anything, and variance is enormous, since resampling the data produces a
wildly different curve. The two failure modes are the two terms.</div>

<h3>Underfitting and overfitting, named precisely</h3>
<p><b>Underfitting is high bias.</b> The model family cannot represent the pattern, so training
error and validation error are both high and close together. <b>Overfitting is high variance.</b>
The model fits this sample rather than the pattern, so training error is low, validation error is
high, and the gap between them is the symptom.</p>
<p>That gap now has an interpretation: <b>it is an estimate of the variance term</b>. And the
floor that validation error cannot go below is <code>bias&sup2; + &sigma;&sup2;</code>.</p>

<h3>Every technique, placed</h3>
<div class="mathblock">more data          &rarr;  reduces variance, leaves bias unchanged
regularization     &rarr;  reduces variance, increases bias
a bigger model     &rarr;  reduces bias, increases variance
bagging / forests  &rarr;  reduces variance by averaging many fits
boosting           &rarr;  reduces bias by fitting the residuals in sequence
dropout            &rarr;  reduces variance, an averaging argument
early stopping     &rarr;  stops before variance overtakes the bias reduction
feature selection  &rarr;  reduces variance, risks adding bias</div>
<p>Read that table as a single strategy: choose a family with low enough bias to represent the
problem, then spend everything else on controlling variance. That is what modern practice
actually is, and it explains why large models plus heavy regularization plus large data is the
dominant recipe.</p>
<div class="hardidea">🧠 <b>Where the classical story stops being true.</b> The traditional picture
is a U-shaped curve: error falls as complexity rises, then rises again as variance takes over,
with a sweet spot in the middle. Very large modern networks are trained far past the point where
they can interpolate the training data exactly, and test error often <b>falls again</b> rather
than continuing to rise. This is called <b>double descent</b>, and it does not violate the
decomposition, which is an identity and cannot be violated. It says that in the heavily
overparameterized regime, the implicit bias of the optimizer selects among the many perfect fits,
and gradient descent happens to prefer smooth ones. The decomposition remains exactly true; the
assumption that variance must grow with parameter count is what fails.</div>

<h3>What to do with small datasets</h3>
<p>Small data means the variance term dominates, so every effective technique is a variance
reduction:</p>
<p><b>Transfer learning</b> is the strongest option available. Start from a model trained on a
large related dataset and fine-tune. Someone else paid for the variance reduction.
<b>Data augmentation</b> manufactures new examples from existing ones. <b>Cross-validation</b>
replaces a single split with <code>k</code> of them, so your estimate of performance is itself
lower variance, which matters most when you can least afford to waste rows on a test set.
<b>Simpler models</b> accept bias in exchange for variance, which is the correct trade when
<code>n</code> is small, and it is why linear models and gradient-boosted trees still win on
small tabular data. <b>Stronger regularization</b> and <b>ensembling</b> do the same in different
currencies. And a <b>Bayesian treatment</b> with an informative prior is the principled version
of all of them, since the prior supplies information the data cannot.</p>
`,
 docs:[['Belkin et al., double descent','https://arxiv.org/abs/1812.11118']],
 exs:[{title:'Split squared error into bias, variance and noise, and watch it add back up',
   lang:'python',
   packages:['numpy'],
   prompt:`The truth is <code>sin(x)</code> at 30 fixed points, with noise of standard deviation
   0.3. Draw 400 training sets, each a fresh noise realization, fit a polynomial of each degree,
   and record the pieces:
   <ol>
   <li><code>fbar</code>, the average prediction across the 400 fits, the f-bar of the derivation,</li>
   <li><code>bias2</code>, the mean over points of <code>(f - fbar)&sup2;</code>,</li>
   <li><code>var</code>, the mean of <code>(pred - fbar)&sup2;</code> over fits and points,</li>
   <li><code>total</code>, the expected squared error, <code>mean((f - preds)&sup2;) + &sigma;&sup2;</code>.</li>
   </ol>
   The decomposition is an identity, not an approximation, so the first test holds to machine
   precision at every degree.`,
   starter:`import numpy as np
np.random.seed(0)

sigma  = 0.3
xs     = np.linspace(0, 2 * np.pi, 30)
ftrue  = np.sin(xs)
S      = 400
degrees = [1, 3, 5, 7]

bias2s, vars_, totals, sums = [], [], [], []

for d in degrees:
    preds = np.zeros((S, len(xs)))
    for s in range(S):
        y = ftrue + sigma * np.random.randn(len(xs))
        preds[s] = np.polyval(np.polyfit(xs, y, d), xs)

    # 1) The average model across all 400 training sets
    fbar  =

    # 2) How far that average model is from the truth
    bias2 =

    # 3) How far individual fits sit from their own average
    var   =

    # 4) The expected squared error against noisy targets
    total =

    bias2s.append(bias2); vars_.append(var); totals.append(total)
    sums.append(bias2 + var + sigma ** 2)

print(np.round(bias2s, 5), np.round(vars_, 5), np.round(totals, 5))
`,
   solution:`import numpy as np
np.random.seed(0)

sigma  = 0.3
xs     = np.linspace(0, 2 * np.pi, 30)
ftrue  = np.sin(xs)
S      = 400
degrees = [1, 3, 5, 7]

bias2s, vars_, totals, sums = [], [], [], []

for d in degrees:
    preds = np.zeros((S, len(xs)))
    for s in range(S):
        y = ftrue + sigma * np.random.randn(len(xs))
        preds[s] = np.polyval(np.polyfit(xs, y, d), xs)

    # 1) The average model across all 400 training sets
    fbar  = preds.mean(axis=0)

    # 2) How far that average model is from the truth
    bias2 = float(((ftrue - fbar) ** 2).mean())

    # 3) How far individual fits sit from their own average
    var   = float(((preds - fbar) ** 2).mean())

    # 4) The expected squared error against noisy targets
    total = float(((ftrue - preds) ** 2).mean()) + sigma ** 2

    bias2s.append(bias2); vars_.append(var); totals.append(total)
    sums.append(bias2 + var + sigma ** 2)

print(np.round(bias2s, 5), np.round(vars_, 5), np.round(totals, 5))
`,
   tests:[
     {d:'bias squared plus variance plus noise reproduces the total exactly, at every degree: this is an identity, not a fit',expr:'max(abs(totals[i] - sums[i]) for i in range(4)) < 1e-12'},
     {d:'bias collapses as the polynomial gains flexibility, and by degree 7 there is almost none left',expr:'bias2s[0] > 20 * bias2s[1] and bias2s[-1] < 0.01'},
     {d:'variance rises at every step, because a more flexible fit chases the noise harder',expr:'all(vars_[i] < vars_[i + 1] for i in range(3))'},
     {d:'that variance is close to σ²(d+1)/n, roughly one noise unit per parameter fitted',expr:'max(abs(vars_[i] - 0.09 * (degrees[i] + 1) / 30) / vars_[i] for i in range(4)) < 0.15'},
     {d:'total error is lowest at degree 3, not at the most flexible model, and that trade is the whole lesson',expr:'int(np.argmin(totals)) == 1'}
   ],
   hints:[
     'fbar = preds.mean(axis=0) averages over training sets, leaving one average prediction per x.',
     'bias2 uses ftrue against fbar; var uses each prediction against fbar. Both end in .mean().',
     'total = float(((ftrue - preds) ** 2).mean()) + sigma ** 2. The noise term is added rather than simulated, which is why the identity closes to machine precision.'
   ]}],
 quiz:{title:'Quick check, bias and variance',questions:[
   {q:'The gap between training and validation error estimates:',
    options:['The bias term of the decomposition','The irreducible noise in the labels','The variance term of the decomposition','The learning rate used during training'],answer:2,whyWrong:['Bias shows up as both errors being high together, not as a gap between them.','Irreducible noise appears in both errors equally and does not show up in the gap.','','The learning rate affects how you got here, and it is not what the gap measures.'],
    why:'Variance is how much the fitted model moves with the training sample, which is exactly what the gap reflects.'},
   {q:'Adding regularization typically:',
    options:['Reduces variance while raising bias','Reduces both terms simultaneously','Affects only the irreducible error','Reduces bias while raising variance'],answer:0,whyWrong:['','If both fell you would simply have a better model. The trade is that one rises.','Irreducible error is a property of the problem and no model choice can touch it.','That is the trade run backwards. Regularisation constrains the model, which raises bias.'],
    why:'It constrains the family, so the average fit moves further from the truth but varies less across samples.'},
   {q:'With a small dataset, the dominant term is usually:',
    options:['Variance, since fits move a lot per sample','Bias, since simple models are forced','Irreducible error, since noise dominates a short sample','All three contribute about equally'],answer:0,whyWrong:['','Simpler models are the response to the problem rather than its cause.','Irreducible error is fixed by the problem and does not grow as the sample shrinks.','They do not. Variance is the term a small sample inflates.'],
    why:'Few rows means the fit swings with the sample. That is why transfer learning and augmentation help most.'}
 ]}}
]});

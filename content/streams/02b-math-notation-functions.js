STREAMS.push({icon:'✍️',track:'Foundations Track',title:'Math Notation & Functions',blurb:'The on-ramp to reading ML math: the symbols (Sigma, Pi, argmax) are just loops, and a model is just a function. Nothing scary once decoded.',requires:'py14',requiresName:'Python from Zero (basics complete)',lessons:[
{id:'mf1',
 title:'Reading math notation: Sigma and Pi are just loops',
 body:`


<div class="ground"><span class="gTag">🎯 Why this unlocks everything</span>
<p>ML formulas look intimidating because of their <b>symbols</b>, and every one of those
symbols is something you already do in code. This lesson is a decoder ring. Once you see that
<b>Sigma is a for-loop that adds</b>, textbook and paper formulas stop being a wall. You'll translate real ML notation into code you already write.</p></div>

<h3>Function notation and subscripts</h3>
<p><b><code>f(x)</code></b>, "f of x", is a machine: put <code>x</code> in, get
<code>f(x)</code> out. You've been writing these as Python functions. <b>Subscripts</b>
like <code>x&#8321;, x&#8322;, &#8230;, x&#8345;</code> are the items of a list.
<code>x&#7522;</code> is "the i-th x," i.e. <code>x[i]</code>. The only catch: math counts from 1, Python from
0. <code>n</code> almost always means "how many," i.e. <code>len(x)</code>.</p>

<h3>Sigma (&Sigma;): summation is a for-loop that adds</h3>
<div class="codeSample">The notation:   &Sigma;&#7522;&#8332;&#8321;&#8319;  x&#7522;      "sum x&#7522; for i from 1 to n"

In Python:      total = 0
                for xi in x:
                    total += xi
                # ... which is just:  sum(x)</div>
<p>The big &Sigma; says "add these up as i walks through the range."
The mean is <code>(1/n) &Sigma; x&#7522;</code> = <code>sum(x)/len(x)</code>. The dot product is
<code>&Sigma; a&#7522;b&#7522;</code>. The <b>MSE</b> (mean squared error, the average of the
squared misses) from the Orientation lesson is
<code>(1/n) &Sigma;(pred&#7522; &minus; actual&#7522;)&sup2;</code>. You've
already computed all three. Now you can read them in their native dress.</p>

<h3>Pi (&Pi;), argmax, and a few more</h3>
<p><b>&Pi;</b> (capital pi) is Sigma's twin for <b>multiplication</b>, a for-loop that
multiplies. The <b>likelihood</b> from the logs stream, how probable the data you saw is under a
given model, is <code>&Pi; p&#7522;</code>. <b>argmax</b> /
<b>argmin</b> mean "the input that makes this biggest / smallest": the <i>location</i>,
not the value. <b>MLE</b> (maximum likelihood estimation: pick the parameter values that make
the data you actually saw the most probable) is <code>argmax</code> over parameters. A quick phrasebook you'll
meet: <code>&isin;</code> "is in / belongs to," <code>&forall;</code> "for all,"
<code>&asymp;</code> "approximately equals," <code>&prop;</code> "is proportional to,"
<code>&nabla;</code> "the gradient (vector of slopes)," bold <b>x</b> "a vector, not a single
number."</p>

<div class="demystify"><b>The reframe:</b> mathematical notation is <i>compressed code</i>,
written before computers existed. Every operator is a loop, an index, or a function you
already use. When a formula looks scary, translate it symbol by symbol into Python. It
turns out to be five lines you could have written yourself.</div>`,
 docs:[['Summation notation (a gentle guide)','https://www.khanacademy.org/math/ap-calculus-bc/bc-series-new/bc-10-1/a/sigma-notation']],
 quiz:{title:'Quick check',questions:[
   {q:'The notation Σ (sum over i from 1 to n) of xᵢ translates to which Python?',
    options:['len(x), which counts how many values there are','max(x), the largest of the values','sum(x), a loop that accumulates a running total','The list of x values, written out one after another'],answer:2,whyWrong:['len(x) counts the items rather than adding them.','max is a different Greek-free operation entirely.','','The list is what you sum over. Sigma produces one number from it.'],
    why:'Big Sigma = "add these up as i walks the range" = the accumulator loop you already know, i.e. sum().'},
   {q:'argmax over p of a function means:',
    options:['The input p at which the function is largest','The largest value the function reaches anywhere','The number of inputs the function accepts','The average value the function takes across its inputs'],answer:0,whyWrong:['','That is max. argmax gives you where it happens, not how high it is.','That is a count of inputs, not a choice among them.','The average is a different summary and has nothing to do with where the peak is.'],
    why:'arg-max = "the argument (input) that maximizes it." MLE is argmax over parameters; you want WHERE the peak is.'},
   {q:'The Pi symbol (capital) in a formula tells you to:',
    options:['Take the derivative of each term in the expression that follows','Add the terms together, one after another','Divide the result by the constant pi','Multiply the terms together, the way a likelihood is built'],answer:3,whyWrong:['Derivatives are written with d or partial signs.','Adding is capital sigma. Pi is its multiplicative counterpart.','The constant pi is lowercase and is a different symbol altogether.',''],
    why:'Pi is Sigma for multiplication. A product of probabilities is exactly what the logs stream turned into a sum.'}
 ]},
 exs:[{title:'Translate the notation into code',
   lang:'python',
   prompt:`Implement each formula straight from its notation (pure Python). For
   <code>xs = [2, 4, 6, 8]</code>:
   <ol>
   <li><code>total</code> = Sigma x&#7522; (sum them),</li>
   <li><code>mean</code> = (1/n) Sigma x&#7522;,</li>
   <li><code>sum_sq</code> = Sigma x&#7522;&sup2; (sum of squares),</li>
   <li><code>prod</code> = Pi x&#7522; (multiply them all),</li>
   <li><code>mse</code> = (1/n) Sigma (pred&#7522; &minus; actual&#7522;)&sup2; for <code>preds = [3, 5]</code>, <code>actuals = [2, 5]</code>, the error formula from Orientation, now read from its symbols.</li>
   </ol>`,
   starter:`xs = [2, 4, 6, 8]

# 1) total = sum of xs
total =

# 2) mean = (1/n) * sum
mean =

# 3) sum_sq = sum of each x squared
sum_sq =

# 4) prod = product of all xs (a Pi loop)
prod = 1
# ... multiply each x into prod

# 5) MSE from its notation
preds = [3, 5]
actuals = [2, 5]
mse =

print(total, mean, sum_sq, prod, mse)
`,
   solution:`xs = [2, 4, 6, 8]

# 1) total = sum of xs
total = sum(xs)

# 2) mean = (1/n) * sum
mean = sum(xs) / len(xs)

# 3) sum_sq = sum of each x squared
sum_sq = sum(x**2 for x in xs)

# 4) prod = product of all xs (a Pi loop)
prod = 1
for x in xs:
    prod *= x

# 5) MSE from its notation
preds = [3, 5]
actuals = [2, 5]
mse = sum((p - a)**2 for p, a in zip(preds, actuals)) / len(preds)

print(total, mean, sum_sq, prod, mse)
`,
   tests:[
     {d:'total = Σ xᵢ = 20',expr:'total == 20'},
     {d:'mean = (1/n) Σ xᵢ = 5.0',expr:'abs(mean - 5.0) < 1e-9'},
     {d:'sum_sq = Σ xᵢ² = 120',expr:'sum_sq == 120'},
     {d:'prod = Π xᵢ = 384',expr:'prod == 384'},
     {d:'mse read from its notation = 0.5',expr:'abs(mse - 0.5) < 1e-9'}
   ],
   hints:[
     'Sigma is sum(): total = sum(xs); mean = sum(xs) / len(xs).',
     'sum_sq = sum(x**2 for x in xs). The Pi loop: for x in xs: prod *= x.',
     'MSE: sum((p - a)**2 for p, a in zip(preds, actuals)) / len(preds), zip pairs each prediction with its actual.'
   ]}]},

{id:'mf2',
 title:'Functions and the shapes that matter in ML',
 body:`



<div class="ground"><span class="gTag">🎯 What it does</span>
<p>In ML, <b>a model is a function</b>. It takes features in and puts
a prediction out. Training searches for the best function. So understanding functions,
what they are, how they combine, and the handful of <b>shapes</b> that recur, is understanding
the object ML manipulates.</p></div>

<h3>What a function is</h3>
<p>A <b>function</b> maps each input to exactly one output. Its <b>domain</b> is the allowed
inputs, its <b>range</b> is the possible outputs. <code>f(x) = 2x + 1</code> is a function.
So is a trained neural network with a billion parameters. Same idea, different size.</p>

<h3>The shapes you'll meet again and again</h3>
<p><b>Linear</b> <code>f(x) = mx + b</code>, a straight line, the simplest model (linear
regression). <b>Quadratic</b> <code>x&sup2;</code>, the parabola, the bowl shape of squared
error. That bowl is why gradient descent works: the <b>gradient</b> is the direction of steepest increase of
the loss, and <b>gradient descent</b> keeps stepping the other way, downhill. <b>Exponential</b> <code>e&#739;</code>, explosive growth
(<code>e &asymp; 2.718</code>; <code>exp</code> is "e to the power," the inverse of the log
you met). <b>Logarithmic</b>, slow growth, the mirror of exponential (logs stream).
And the star of ML classification: the <b>sigmoid</b>.</p>

<h3>The sigmoid: turning any number into a probability</h3>
<div class="codeSample">sigma(x) = 1 / (1 + e^(-x))</div>
<p>The <b>sigmoid</b> (logistic function) is an <b>S-curve</b>. It squashes <i>any</i> real
number, from minus a million to plus a million, into the range <b>(0, 1)</b>. Feed it a big
positive number, out comes almost 1. A big negative, almost 0. Feed it 0, out comes exactly
0.5. That's how a model turns a raw score into a <b>probability</b> ("87% spam").
It's why the sigmoid is the heart of <b>logistic regression</b>, a model that turns a weighted
sum of the features into a yes-or-no probability. It's also a classic neural-network
<b>activation</b>: the function applied after each layer's weighted sum. That's what lets a
network bend. You'll implement it and watch it squash.</p>

<h3>Composition: functions inside functions</h3>
<p><b>Composition</b> is feeding one function's output into another: <code>f(g(x))</code>,
"do g, then f." A <b>neural network is a composition of functions</b>.
Layer after layer, each feeds the next. That's why the <b>chain rule</b> (calculus
stream) is the engine of training: it's the rule for differentiating compositions.</p>

<div class="demystify"><b>Demystify "nonlinear":</b> a linear function is a straight line
(or flat plane). <i>Nonlinear</i> means "not a straight line", it can bend. The
power of neural networks comes from composing <i>nonlinear</i> functions (like the sigmoid).
Stack only linear ones and you collapse back to a single straight line, no matter how many
layers.</div>`,
 docs:[['The sigmoid / logistic function','https://en.wikipedia.org/wiki/Logistic_function'],['Function composition (visual intuition)','https://www.mathsisfun.com/sets/functions-composition.html']],
 quiz:{title:'Quick check',questions:[
   {q:'The sigmoid function 1/(1+e^(-x)) is used in ML because it:',
    options:['Is the fastest activation function to evaluate','Makes small numbers larger, so gradients do not vanish','Sorts the values so the largest score comes first','Squashes any real number into the range 0 to 1'],answer:3,whyWrong:['It involves an exponential and a division, so speed is not its selling point.','It bounds the output rather than enlarging it. Large inputs get squashed toward one.','Nothing is sorted. It transforms one number at a time.',''],
    why:'The S-curve maps (-inf, +inf) to (0, 1): a score becomes a probability. That is the core of logistic regression and a classic activation.'},
   {q:'A neural network is, mathematically, mostly:',
    options:['A composition of functions, each layer feeding the next','A database query, matching stored patterns against the input','A single linear equation with a very large number of terms','A spreadsheet, with one cell per weight and formulas between them'],answer:0,whyWrong:['','Queries retrieve data. A network computes a function of its input.','A single linear equation is exactly what you get if you remove the activations, and it is far weaker.','A spreadsheet holds values. The network is the chain of operations applied to them.'],
    why:'Layers compose: f(g(h(x))). Differentiating a composition is the chain rule, the link between this stream and calculus.'},
   {q:'Why must the composed functions be nonlinear for depth to help?',
    options:['It does not matter, since depth adds capacity whatever the activation is','Linear functions cannot be composed with one another in the first place','Nonlinear functions are faster to evaluate, so depth becomes affordable','Composing linear functions collapses back to a single linear function'],answer:3,whyWrong:['It matters completely. Without it, depth buys you nothing at all.','They compose perfectly well, and the result is another linear function, which is the problem.','Speed is not the argument. Expressiveness is.',''],
    why:'Linear-of-linear is still linear. The nonlinearity between layers is precisely what buys a deep network its expressive power.'}
 ]},
 exs:[{title:'Build the sigmoid and compose functions',
   lang:'python',
   prompt:`Implement the shapes ML runs on (pure Python, <code>math</code> module):
   <ol>
   <li><code>sigmoid(x)</code> = <code>1 / (1 + math.exp(-x))</code>,</li>
   <li><code>s0</code> = <code>sigmoid(0)</code> (exactly 0.5, the middle of the S),</li>
   <li><code>squashed</code> = <code>True</code> if <code>sigmoid(10)</code> is above 0.999 AND <code>sigmoid(-10)</code> is below 0.001 AND both are strictly inside (0, 1),</li>
   <li>compose <code>f(u) = u + 1</code> and <code>g(x) = 2 * x</code>: set <code>composed</code> = <code>f(g(3))</code> (do g first: 2*3=6, then f: 7),</li>
   <li><code>increasing</code> = <code>True</code> if <code>sigmoid(1) &gt; sigmoid(0)</code> (the S-curve always rises).</li>
   </ol>`,
   starter:`import math

def sigmoid(x):
    # 1 / (1 + e^(-x))
    pass

s0 = sigmoid(0)

# Does it squash extremes into (0, 1)?
squashed =

def f(u):
    return u + 1

def g(x):
    return 2 * x

# Compose: do g first, then f
composed =

# The S-curve is monotonically increasing
increasing =

print(s0, squashed, composed, increasing)
`,
   solution:`import math

def sigmoid(x):
    # 1 / (1 + e^(-x))
    return 1 / (1 + math.exp(-x))

s0 = sigmoid(0)

# Does it squash extremes into (0, 1)?
squashed = (sigmoid(10) > 0.999) and (sigmoid(-10) < 0.001) and (0 < sigmoid(10) < 1) and (0 < sigmoid(-10) < 1)

def f(u):
    return u + 1

def g(x):
    return 2 * x

# Compose: do g first, then f
composed = f(g(3))

# The S-curve is monotonically increasing
increasing = sigmoid(1) > sigmoid(0)

print(s0, squashed, composed, increasing)
`,
   tests:[
     {d:'sigmoid(0) is exactly 0.5, the center of the S',expr:'abs(s0 - 0.5) < 1e-12'},
     {d:'sigmoid squashes extremes into (0, 1)',expr:'squashed == True'},
     {d:'sigmoid never leaves (0,1): sigmoid(1000) stays below 1',expr:'0 < sigmoid(1000) <= 1 and sigmoid(1000) < 1 + 1e-9'},
     {d:'composition f(g(3)) = 7 (g first, then f)',expr:'composed == 7'},
     {d:'the sigmoid is increasing',expr:'increasing == True'}
   ],
   hints:[
     'sigmoid: return 1 / (1 + math.exp(-x)). math.exp(-x) is e to the power minus x.',
     'squashed combines four conditions with and: sigmoid(10) > 0.999, sigmoid(-10) < 0.001, and each strictly between 0 and 1.',
     'Composition applies the inner function first: f(g(3)) = f(6) = 7. This nesting is exactly what a neural network does, layer by layer.'
   ]}]}
]});

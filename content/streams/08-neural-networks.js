STREAMS.push({icon:'🧠',track:'ML & AI Track',title:'Neural Networks: from the perceptron to the transformer',blurb:'Every idea behind modern neural networks, in the order it was invented and in plain English first. One neuron, then many, then how they learn, then convolution, attention, and what these things still cannot do.',lessons:[

{id:'nn0',
 title:'What a neuron actually is, and why the brain metaphor misleads you',
 body:`
<div class="ground"><span class="gTag">🎯 Start here before any diagram of a brain</span>
<p>Almost every introduction to neural networks opens with a picture of a biological neuron
and an arrow pointing at a computer. That picture has done more damage than good. A neural
network is not a small brain, it is <b>a pile of multiplications and additions with one
bend in it</b>. Understanding it as arithmetic is what lets you reason about it. Understanding
it as a brain is what leads people to believe it thinks.</p></div>

<h3>The whole of one neuron, in one sentence</h3>
<p>A single artificial neuron takes some numbers in, multiplies each one by its own
<b>weight</b>, adds the results together, adds one extra number called the <b>bias</b>, and
passes the total through one simple function. That is all of it. If you can multiply and add,
you already understand a neuron.</p>
<p>Say the inputs are the size of a house and its age, so <code>x1 = 1800</code> and
<code>x2 = 12</code>. The neuron holds two weights, say <code>w1 = 95</code> and
<code>w2 = -400</code>, and a bias, say <code>b = 20000</code>. It computes:</p>
<pre><code>output = (1800 × 95) + (12 × -400) + 20000
       = 171000 - 4800 + 20000
       = 186200</code></pre>
<p>A predicted price of 186,200. The weights are the knobs from the orientation lesson.
<b>Training a network is nothing more than finding good numbers to put in those knobs.</b></p>

<h3>Why weights are the interesting part</h3>
<p>Notice what the weights are saying. <code>w1 = 95</code> means every extra square foot adds
95 to the prediction. <code>w2 = -400</code> means every year of age takes 400 off. The
weights encode what the neuron has learned about how the inputs relate to the answer. Nobody
wrote those numbers by hand. The whole field exists to work out how to find them.</p>
<p>The bias is the offset, what the neuron predicts when every input is zero. It is what lets
the line sit somewhere other than through the origin. Without it, a house of size zero and
age zero would have to be worth exactly nothing, and every prediction would be dragged toward
that assumption.</p>

<h3>Where the brain metaphor comes from, and where it breaks</h3>
<p>The metaphor is historical. In 1943 Warren McCulloch and Walter Pitts wrote down a
mathematical model of a nerve cell: inputs arrive, they are weighted, and if the total crosses
a threshold the cell fires. That is a fair sketch of a biological neuron at the level of detail
anyone had in 1943, and it is where the vocabulary comes from.</p>
<p>Here is where it stops being useful. A real neuron is a living cell with chemistry, timing,
and a physical shape that all matter. An artificial neuron is a weighted sum. Real learning in
brains does not work like backpropagation, which you will meet in a few lessons. And a
network with a billion parameters is not "closer to a brain" than one with a thousand, it is
just a bigger pile of arithmetic.</p>
<p>Keep the word "neuron" because everyone uses it. Drop the mental image.</p>

<h3>What you should be able to say now</h3>
<p>A neuron is a weighted sum plus a bias, followed by one function. Weights are learned, not
written. The rest of this stream is about three questions: what happens when you connect many
of these together, how the weights get found, and what shapes of connection work best for
different kinds of data.</p>
<h3>The same neuron, written properly</h3>
<p>Everything above was one neuron with two inputs. Write it for <code>D</code> inputs and the
notation you will meet in every textbook falls out immediately. Collect the inputs into a
vector <code>x</code> and the weights into a vector <code>w</code>, both of length
<code>D</code>:</p>
<div class="mathblock">a = w<sup>T</sup>x + b = &Sigma;<sub>i=1..D</sub> w<sub>i</sub> x<sub>i</sub> + b

z = h(a)</div>
<p>Read it back in English: <code>a</code> is the weighted sum, called the
<b>pre-activation</b>. <code>h</code> is the activation function. <code>z</code> is what the
neuron actually emits. The superscript T is transpose, which is bookkeeping so that a column of
weights times a column of inputs produces a single number rather than a grid.</p>
<div class="worked"><b>Worked, with the house.</b> <code>x = [1800, 12]<sup>T</sup></code>,
<code>w = [95, -400]<sup>T</sup></code>, <code>b = 20000</code>.
<code>w<sup>T</sup>x = 95(1800) + (-400)(12) = 171000 - 4800 = 166200</code>, so
<code>a = 186200</code>. With no activation, <code>h</code> is the identity and
<code>z = a</code>. That is exactly the arithmetic above, in the notation Bishop uses in
chapter 5.</div>
<div class="demystify"><b>Why the bias is often hidden.</b> Many texts drop <code>b</code> from
the formula by adding a fake input <code>x<sub>0</sub> = 1</code> with weight
<code>w<sub>0</sub> = b</code>. Then <code>a = w<sup>T</sup>x</code> with no separate bias
term, and the sum runs from 0 instead of 1. Nothing changed, it is the same model with tidier
algebra. When you see a formula with no bias, look for the constant input.</div>
`,
 docs:[['McCulloch & Pitts, the 1943 paper that started the vocabulary','https://www.cs.cmu.edu/~./epxing/Class/10715/reading/McCulloch.and.Pitts.pdf']],
 quiz:{title:'Quick check, one neuron',questions:[
   {q:'A single artificial neuron computes:',
    options:['A weighted sum of its inputs, plus a bias','A random value adjusted by feedback','The average of all of its inputs','A simulation of a biological cell'],answer:0,whyWrong:['','Nothing about a neuron is random once it is trained. The weights are fixed numbers applied the same way every time.','An average weights every input equally. A neuron learns a different weight for each one, which is where the information lives.','The biological framing is where the name came from. What it computes is arithmetic, not chemistry.'],
    why:'Multiply each input by its weight, add them up, add the bias. That is the entire computation.'},
   {q:'What does training a network actually change?',
    options:['The programming language it runs in','The order the inputs arrive in','The number of inputs it accepts','The values stored in its weights and biases'],answer:3,whyWrong:['The language is a choice you made before training, and nothing about it changes.','Input order is a property of your data pipeline. Training never touches it.','The input count is fixed by the architecture. Changing it would mean a different network.',''],
    why:'The structure stays fixed. Training searches for good numbers to put in the weights and biases.'},
   {q:'The bias term exists so that:',
    options:['Weights are kept small enough to be stable','The network runs faster on a GPU','Errors are spread evenly across inputs','The output can be nonzero when all inputs are zero'],answer:3,whyWrong:['That is regularisation, which is a separate mechanism entirely.','The bias adds one number per neuron and has no bearing on hardware speed.','Nothing spreads error evenly. The bias is one more learned parameter, not an error-handling device.',''],
    why:'Without a bias the model is forced through the origin, which is rarely where the truth sits.'}
 ]}},

{id:'nn1',
 title:'The perceptron, 1958: one neuron that could learn',
 body:`
<div class="ground"><span class="gTag">🎯 The first machine that adjusted its own weights</span>
<p>The neuron in the last lesson had weights, but nothing said where they came from. In 1958
Frank Rosenblatt added the missing half: <b>a rule for changing the weights when the answer
comes out wrong</b>. That rule is the ancestor of everything in this stream.</p></div>

<h3>What a perceptron does</h3>
<p>A perceptron is one neuron doing a yes-or-no job. It takes the weighted sum from the last
lesson, and instead of returning the number, it returns <b>1 if the total is above zero and 0
if it is not</b>. That is called a <b>step function</b>, and it turns a number into a decision.</p>
<p>Is this email spam. Is this shape a circle. One neuron, one line drawn through the data,
everything on one side gets a 1 and everything on the other gets a 0.</p>

<h3>The learning rule, which is simpler than you expect</h3>
<p>Show it an example where you know the right answer. If it gets it right, change nothing. If
it gets it wrong, nudge every weight a little in the direction that would have helped:</p>
<pre><code>new weight = old weight + (learning rate × error × input)</code></pre>
<p>Where <code>error</code> is the true answer minus what the perceptron said, so it is
<code>+1</code> when the perceptron said 0 and should have said 1, and <code>-1</code> the
other way round. The <b>learning rate</b> is a small number, maybe 0.01, deciding how big each
nudge is.</p>
<p>Read the formula in words: when the perceptron is wrong, push each weight in proportion to
how much that input contributed. An input that was large gets a large correction, an input
that was zero gets none, because it was not responsible.</p>

<h3>Why this was a genuine breakthrough</h3>
<p>Before this, getting a machine to classify something meant a human writing the rule. The
perceptron replaced the human with a loop: show examples, correct mistakes, repeat. Rosenblatt
also proved something reassuring, the <b>perceptron convergence theorem</b>: if a straight line
exists that separates your two classes, this rule is guaranteed to find one, in a finite
number of steps.</p>
<p>The press coverage was, in hindsight, unhinged. The New York Times reported in 1958 that
the Navy expected an electronic computer that would "walk, talk, see, write, reproduce itself
and be conscious of its existence." It was a single neuron classifying shapes.</p>

<h3>The catch, stated plainly</h3>
<p>Look at that guarantee again: <i>if a straight line exists</i>. A perceptron draws one
straight boundary. If your data cannot be split by a straight line, the rule never converges,
it just keeps oscillating. That sounds like an edge case. It is not, and the next lesson is
about the very small example that stopped the field for over a decade.</p>
<h3>The learning rule, derived rather than asserted</h3>
<p>The rule above was handed to you. Here is where it comes from. Write the perceptron output
as <code>y = f(w<sup>T</sup>x)</code> where <code>f</code> is the step. Using the convention
that targets are <code>t &isin; {-1, +1}</code>, a point is classified correctly exactly when
<code>t<sub>n</sub> w<sup>T</sup>x<sub>n</sub> &gt; 0</code>, because the sign of the sum
agrees with the sign of the label.</p>
<p>So define a loss that is zero for correct points and grows with how badly wrong the others
are. That is the <b>perceptron criterion</b>, summing only over the misclassified set
<code>M</code>:</p>
<div class="mathblock">E<sub>P</sub>(w) = -&Sigma;<sub>n &isin; M</sub> t<sub>n</sub> w<sup>T</sup>x<sub>n</sub></div>
<p>Every term in that sum is positive, because for a misclassified point
<code>t<sub>n</sub>w<sup>T</sup>x<sub>n</sub></code> is negative and the leading minus flips
it. Now differentiate with respect to <code>w</code>. The only place <code>w</code> appears is
linearly, so:</p>
<div class="mathblock">&nabla;<sub>w</sub> E<sub>P</sub> = -&Sigma;<sub>n &isin; M</sub> t<sub>n</sub> x<sub>n</sub></div>
<p>Gradient descent says step against the gradient, and taking one misclassified point at a
time:</p>
<div class="mathblock">w &larr; w - &eta; &nabla;<sub>w</sub> E<sub>P</sub> = w + &eta; t<sub>n</sub> x<sub>n</sub></div>
<p>That is the rule from the top of the lesson. With 0/1 labels rather than &plusmn;1, the term
<code>t<sub>n</sub></code> becomes <code>(t<sub>n</sub> - y<sub>n</sub>)</code>, which is the
error, and you recover the version written earlier.</p>
<div class="hardidea">🧠 <b>Why the step function is the whole problem.</b> Look at what we did:
we differentiated the <i>pre-activation</i>, never the step function itself. We could not have
differentiated the step. It is flat everywhere and undefined at zero, so its derivative carries
no information about which way to move. The perceptron criterion is a workaround that dodges
the activation entirely. It only works because there is a single layer. The moment you stack
layers you must push derivatives back <i>through</i> the activations, and a step function
blocks that completely. This is the real reason smooth activations had to be invented.</div>
`,
 docs:[['Rosenblatt 1958, the original perceptron paper','https://psycnet.apa.org/record/1959-09865-001']],
 quiz:{title:'Quick check, the perceptron',questions:[
   {q:'What did the perceptron add that a plain neuron did not have?',
    options:['More inputs than a single neuron','A second layer of processing','The ability to output any real number','A way to update its own weights from mistakes'],answer:3,whyWrong:['Input count is a matter of how you wire it. Both take as many inputs as you give them.','The perceptron is still a single layer, and that was exactly its limitation.','The perceptron outputs a threshold, so its range narrowed rather than widened.',''],
    why:'Rosenblatt contributed the learning rule. The weighted sum already existed.'},
   {q:'In the update rule, why is each weight scaled by its input?',
    options:['To make the arithmetic faster to compute','To stop the weights from becoming negative','So inputs that contributed more get corrected more','To keep all the weights the same size'],answer:2,whyWrong:['The multiply costs the same either way. The scaling is about credit, not speed.','Weights are allowed to be negative, and they need to be for the model to express anything useful.','','Keeping the weights uniform would defeat the purpose. Different inputs matter by different amounts.'],
    why:'An input of zero cannot have caused the error, so it earns no correction. A large input earns a large one.'},
   {q:'The convergence guarantee holds only when:',
    options:['All of the inputs have been normalized first','The learning rate is set above one','A straight line can separate the two classes','The data has fewer than a thousand rows'],answer:2,whyWrong:['Normalisation helps in practice, and it is not what the theorem requires.','Any positive learning rate works for the guarantee. The rate affects speed, not whether it terminates.','','Dataset size is irrelevant. Separability is the condition.'],
    why:'Linear separability is the condition. Without it the rule never settles.'}
 ]}},

{id:'nn2',
 title:'Why one neuron was not enough: XOR and the first AI winter',
 body:`
<div class="ground"><span class="gTag">🎯 The four data points that stalled a field</span>
<p>In 1969 Marvin Minsky and Seymour Papert published a book called <i>Perceptrons</i>
containing a proof about a problem with four rows of data. Funding dried up, researchers moved
on, and neural networks went quiet for most of the 1970s. The problem is worth understanding
exactly, because the fix is the entire idea of a deep network.</p></div>

<h3>The problem: exclusive or</h3>
<p><b>XOR</b> means "one or the other, but not both." Two inputs, each 0 or 1:</p>
<pre><code>0, 0  ->  0
0, 1  ->  1
1, 0  ->  1
1, 1  ->  0</code></pre>
<p>Now try to draw one straight line on a square that puts the two 1s on one side and the two
0s on the other. The 1s sit at opposite corners. So do the 0s. There is no such line. Not a
hard line to find, <b>no line exists</b>.</p>
<p>A perceptron draws exactly one straight boundary, so a perceptron cannot learn XOR. Ever.
Not with more data, not with more training, not with a better learning rate.</p>

<h3>Why this mattered more than it should have</h3>
<p>XOR is not an exotic function, it is one of the basic operations in logic. If the leading
machine learning method of the day could not represent something that simple, the case for
funding it became hard to make. The book was rigorous and its proof was correct. What it did
not emphasize enough was that the limitation applied to <b>one layer</b>, and that people
already suspected more layers would fix it.</p>

<h3>The fix, and why nobody could use it yet</h3>
<p>Stack the neurons. Have a first layer compute two intermediate facts, and a second layer
combine them:</p>
<pre><code>hidden neuron A: "at least one input is 1"   (an OR)
hidden neuron B: "both inputs are 1"         (an AND)
output neuron:   "A is true AND B is false"</code></pre>
<p>Check it against the table. Both zero: A false, so output 0. One of each: A true, B false,
so output 1. Both one: A true but B also true, so output 0. XOR, solved, with three neurons in
two layers.</p>
<p>So why did the field stall for a decade if the answer was three neurons? Because nobody had
a working method for <b>training</b> a stack. The perceptron rule needs to know how wrong each
neuron was, and for a neuron in the middle there is no answer sheet. Nobody tells hidden
neuron A what it should have said. That is the credit assignment problem, and solving it took
until 1986.</p>

<h3>The idea to carry forward</h3>
<p>A single layer draws one straight boundary. A layer of neurons feeding another layer can
draw a boundary made of pieces, and with enough pieces you can enclose any region you like.
Depth buys you shape. The next lesson makes that precise.</p>
<h3>Proving no line exists</h3>
<p>"You cannot draw the line" deserves a proof rather than a picture. Suppose some perceptron
solves XOR. Then there exist weights <code>w<sub>1</sub>, w<sub>2</sub></code> and a bias
<code>b</code> such that <code>w<sub>1</sub>x<sub>1</sub> + w<sub>2</sub>x<sub>2</sub> + b &gt; 0</code>
exactly for the two positive cases. Write out all four constraints:</p>
<div class="mathblock">(0,0) &rarr; 0 :   b &le; 0
(0,1) &rarr; 1 :   w<sub>2</sub> + b &gt; 0
(1,0) &rarr; 1 :   w<sub>1</sub> + b &gt; 0
(1,1) &rarr; 0 :   w<sub>1</sub> + w<sub>2</sub> + b &le; 0</div>
<p>Add the second and third inequalities:
<code>w<sub>1</sub> + w<sub>2</sub> + 2b &gt; 0</code>. From the first,
<code>b &le; 0</code>, so <code>-b &ge; 0</code> and therefore
<code>w<sub>1</sub> + w<sub>2</sub> + b &gt; -b &ge; 0</code>. That says
<code>w<sub>1</sub> + w<sub>2</sub> + b &gt; 0</code>, which directly contradicts the fourth
constraint. No such weights exist, for any real numbers whatsoever.</p>
<div class="demystify"><b>What the proof is really saying.</b> Nothing here is about neural
networks. It is a statement about <b>linear separability</b>: the positive set and the negative
set have overlapping convex hulls, because the segment joining (0,0) to (1,1) crosses the
segment joining (0,1) to (1,0). Two sets whose convex hulls intersect cannot be separated by a
hyperplane, in any number of dimensions. XOR is just the smallest example.</div>
<div class="worked"><b>The two-layer solution, in numbers.</b> Take hidden units
<code>h<sub>1</sub> = step(x<sub>1</sub> + x<sub>2</sub> - 0.5)</code> (an OR) and
<code>h<sub>2</sub> = step(x<sub>1</sub> + x<sub>2</sub> - 1.5)</code> (an AND), then
<code>y = step(h<sub>1</sub> - h<sub>2</sub> - 0.5)</code>.
Check (1,1): <code>h<sub>1</sub>=1, h<sub>2</sub>=1</code>, so
<code>y = step(1-1-0.5) = 0</code>. Check (0,1): <code>h<sub>1</sub>=1, h<sub>2</sub>=0</code>,
so <code>y = step(0.5) = 1</code>. The hidden layer has bent the space so that a line
suffices.</div>
`,
 docs:[['Minsky & Papert, Perceptrons (1969), the book that paused the field','https://mitpress.mit.edu/9780262534772/perceptrons/']],
 quiz:{title:'Quick check, XOR',questions:[
   {q:'A single perceptron cannot learn XOR because:',
    options:['The dataset is too small to train on','No straight line separates the two classes','The inputs are binary rather than continuous','The learning rate cannot be tuned low enough'],answer:1,whyWrong:['XOR has four rows, which is all of them. Nothing is missing.','','Binary inputs are fine. The continuous version of XOR is equally impossible for one perceptron.','No learning rate helps. The boundary the model can draw is the wrong shape at any rate.'],
    why:'The two positive cases sit at opposite corners, and so do the two negative cases. No line divides them.'},
   {q:'What stopped researchers from simply stacking layers in 1969?',
    options:['Stacked layers were proven to be no more powerful','The mathematics of stacking had not been described','There was no way to train the neurons in the middle','Computers of the era could not store the weights'],answer:2,whyWrong:['Stacking was understood to be more powerful in principle. Training was the obstacle.','Composing layers was straightforward to describe. Assigning blame to the middle ones was not.','','The networks of the era were small enough to store without difficulty.'],
    why:'Credit assignment was the blocker. Nothing tells a hidden neuron what its correct output should have been.'},
   {q:'What does adding a hidden layer buy you?',
    options:['Fewer weights to store and update','Guaranteed accuracy on unseen examples','Faster convergence on the same class of problems','Boundaries built from several pieces rather than one line'],answer:3,whyWrong:['It adds weights rather than removing them, sometimes a great many.','Nothing guarantees accuracy on unseen data. A hidden layer makes overfitting easier, not harder.','Convergence often gets slower. What changes is which problems are solvable at all.',''],
    why:'Depth buys shape. Several simple boundaries combine into a complicated one.'}
 ]}},

{id:'nn3',
 title:'Layers, and what "deep" actually means',
 body:`
<div class="ground"><span class="gTag">🎯 Deep is a description of shape, not a compliment</span>
<p>"Deep learning" sounds like it might mean profound. It means the network has more than a
couple of layers between the input and the output. That is the whole definition, and it is
worth deflating early.</p></div>

<h3>The three kinds of layer</h3>
<p><b>The input layer</b> is not really a layer of neurons, it is just your data arriving. One
slot per feature. A 28 by 28 pixel image flattened out gives 784 inputs.</p>
<p><b>Hidden layers</b> sit in the middle. They are called hidden because nothing outside the
network ever sees their values. You do not know what they should output, which is exactly the
credit assignment problem from the last lesson.</p>
<p><b>The output layer</b> produces the answer, and its shape is decided by the question. One
neuron for a price. One neuron for a yes or no. Ten neurons for "which digit is this," one
per possible digit.</p>

<h3>What actually happens between two layers</h3>
<p>Every neuron in a layer looks at <b>every</b> value from the layer before it. That is why
this arrangement is called <b>fully connected</b>, or a <b>dense</b> layer. So if a layer of
784 inputs feeds a layer of 100 neurons, each of those 100 neurons has 784 weights, and the
whole connection holds 78,400 weights plus 100 biases.</p>
<p>You will see this written as a matrix multiplication, because that is what it is. Stack the
weights into a grid, and computing the whole layer at once is one multiply. This is not a
notational nicety, it is why neural networks run on graphics hardware: GPUs were built to do
enormous matrix multiplications for rendering, and a neural network is mostly the same
operation.</p>

<h3>Why more layers rather than one enormous one</h3>
<p>A result called the <b>universal approximation theorem</b> says a single hidden layer, given
enough neurons, can approximate essentially any continuous function you like. So why go deep at
all?</p>
<p>Because "enough neurons" can mean an absurd number. Depth lets a network build ideas in
stages, and stages compose. In a network that recognizes faces, the early layers respond to
edges, the middle layers to combinations of edges that look like an eye or a nose, and the
later layers to arrangements of those. Each layer reuses what the last one found. A single wide
layer has to discover every whole face pattern separately, from scratch.</p>
<p>That is the practical argument for depth: <b>reuse</b>. It is the same reason you write
functions rather than one enormous block of code.</p>

<h3>What you are actually choosing when you design a network</h3>
<p>How many layers, how many neurons in each, and what function sits at the end of each neuron.
Those choices are called the <b>architecture</b>. Everything else, all the weights, gets found
by training. Most of this stream from here is about which architectures suit which data, and
why the obvious dense stack is the wrong shape for an image.</p>
<h3>A whole layer, in one line of algebra</h3>
<p>One neuron was <code>a = w<sup>T</sup>x + b</code>. A layer of <code>M</code> neurons is
<code>M</code> of those, and stacking the weight vectors as rows of a matrix
<code>W</code> of shape <code>M &times; D</code> gives the entire layer at once:</p>
<div class="mathblock">a = Wx + b        (a is M&times;1, W is M&times;D, x is D&times;1, b is M&times;1)

z = h(a)          (h applied elementwise)</div>
<p>Now compose. For a network with layers indexed by <code>(1), (2), ...</code>, with
<code>z<sup>(0)</sup> = x</code>:</p>
<div class="mathblock">z<sup>(l)</sup> = h<sup>(l)</sup>( W<sup>(l)</sup> z<sup>(l-1)</sup> + b<sup>(l)</sup> )</div>
<p>That single recurrence is the entire forward pass of a feed-forward network, and it is worth
memorizing because everything later is a modification of it. A two-layer network written out in
full is:</p>
<div class="mathblock">y(x, w) = h<sup>(2)</sup>( W<sup>(2)</sup> h<sup>(1)</sup>( W<sup>(1)</sup>x + b<sup>(1)</sup> ) + b<sup>(2)</sup> )</div>
<div class="worked"><b>Counting the parameters.</b> Inputs 784, hidden 100, outputs 10.
<code>W<sup>(1)</sup></code> is 100&times;784 = 78,400 weights, plus 100 biases.
<code>W<sup>(2)</sup></code> is 10&times;100 = 1,000 weights, plus 10 biases. Total 79,510
parameters. Every one of them is found by training, and the count matters: it is roughly how
many numbers the network could use to memorize your data.</div>
<div class="hardidea">🧠 <b>Why depth is not free, formally.</b> The universal approximation
theorem (Cybenko 1989, Hornik 1991) says a single hidden layer with enough units approximates
any continuous function on a compact set to any accuracy. It is an existence result and it says
nothing about <i>how many</i> units, or whether training can find them. There are functions
that a network of depth <code>k</code> represents with a polynomial number of units, but which
require an exponential number at depth <code>k-1</code>. Depth is not about what is possible.
It is about what is affordable.</div>
`,
 docs:[['A visual, click-through introduction to layers','https://playground.tensorflow.org/']],
 quiz:{title:'Quick check, layers',questions:[
   {q:'A layer is called "hidden" because:',
    options:['Nothing outside the network observes its values','Its weights are encrypted during training','It only activates for certain inputs','It is optional and can be removed safely'],answer:0,whyWrong:['','Nothing is encrypted. The weights sit in memory as ordinary numbers.','It activates for every input. Whether the output is nonzero is a separate matter.','Removing it takes you back to a linear model, which is the thing the hidden layer was added to escape.'],
    why:'You see the inputs and the final output. What the middle layers produce is internal, and unlabeled.'},
   {q:'A dense layer of 100 neurons fed by 784 inputs holds how many weights?',
    options:['884, one per value involved','78,400, one per connection','784, one per input value','100, one per neuron'],answer:1,whyWrong:['That is 784 plus 100, which counts values rather than connections.','','One weight per input describes a single neuron, not a hundred of them.','One per neuron is the bias count, and the biases are separate from the weights.'],
    why:'Every neuron connects to every input, so it is 784 × 100, plus 100 biases on top.'},
   {q:'The main practical argument for depth over width is:',
    options:['Deep networks are guaranteed to be more accurate','Wide layers cannot be computed on a GPU','Later layers can reuse what earlier layers found','Only deep networks can represent nonlinear functions'],answer:2,whyWrong:['There is no such guarantee. Depth helps on structured problems and can hurt elsewhere.','A wide layer is one large matrix multiply, which is precisely what a GPU is best at.','','A single hidden layer is already a universal approximator. Depth is about efficiency, not possibility.'],
    why:'Composition. Edges become eyes become faces, and each stage builds on the last instead of starting over.'}
 ]}}
,

{id:'nn4',
 title:'Activation functions: why a network needs a kink to learn anything',
 body:`
<div class="ground"><span class="gTag">🎯 The one nonlinear step, and why removing it collapses everything</span>
<p>Every neuron ends with a small function applied to its weighted sum. It looks like a detail.
It is the reason a deep network is worth building at all, and the fastest way to see that is to
take it away.</p></div>

<h3>What happens with no activation function</h3>
<p>Suppose each layer only does the weighted sum, with nothing after it. Layer one multiplies
your inputs by some numbers and adds them. Layer two multiplies those results by more numbers
and adds them. But a weighted sum of weighted sums is itself just a weighted sum.</p>
<p>You can prove this with school algebra. If layer one computes <code>3x + 2</code> and layer
two computes <code>5(that) - 1</code>, the whole thing is <code>15x + 9</code>. One line. A
hundred stacked layers with no activation function collapse into a single line, and you are
back to a perceptron that cannot do XOR.</p>
<p><b>The activation function is what stops the collapse.</b> Put any bend in the middle and
the layers stop folding into each other.</p>

<h3>The ones you will actually meet</h3>
<p><b>Sigmoid</b> squashes any number into the range 0 to 1, along a smooth S shape. Big
negative numbers go near 0, big positive ones near 1, and zero maps to 0.5. It was the default
for years because it is smooth and looks like a soft version of the perceptron's step. Its
problem shows up in a few lessons: at both ends the curve is almost flat, which starves
learning.</p>
<p><b>Tanh</b> is the same S shape but running from -1 to 1 rather than 0 to 1. Being centered
on zero helps training, so it beat sigmoid for a while, but it has the same flat ends.</p>
<p><b>ReLU</b> is the one that took over, and it is almost embarrassingly simple:</p>
<pre><code>ReLU(x) = x if x > 0, otherwise 0</code></pre>
<p>Negative goes to zero, positive passes straight through. That is the whole function. It has
one bend at the origin, which is all the nonlinearity you need, and for positive values it does
not flatten out, so learning keeps moving. It is also almost free to compute, which matters when
you are doing it a trillion times.</p>

<h3>Why the simplest one won</h3>
<p>This is a good example of how the field actually moves. ReLU is not more mathematically
elegant than sigmoid, it is cruder. It won because it trains faster, it does not flatten at the
positive end, and it costs almost nothing to compute. Deep networks became practical partly
because of this one change.</p>
<p>ReLU has a failure of its own, called <b>dying ReLU</b>: a neuron whose output is negative
for every input in your data outputs zero forever and never recovers, because the flat part has
no slope to learn from. Variants like <b>Leaky ReLU</b> fix this by letting negatives through
scaled down instead of zeroed, so there is always a little slope.</p>

<h3>Choosing one</h3>
<p>Use ReLU in hidden layers unless you have a specific reason not to. At the output layer the
choice is decided by the question, not by preference: nothing at all for predicting a number,
sigmoid for a single yes or no, and <b>softmax</b> for choosing one of several classes, which
turns a row of scores into probabilities that add to 1.</p>
<h3>The collapse, proved</h3>
<p>The claim was that stacked linear layers collapse to one. Set every
<code>h</code> to the identity and compose two layers:</p>
<div class="mathblock">z<sup>(2)</sup> = W<sup>(2)</sup>( W<sup>(1)</sup>x + b<sup>(1)</sup> ) + b<sup>(2)</sup>
        = (W<sup>(2)</sup>W<sup>(1)</sup>)x + (W<sup>(2)</sup>b<sup>(1)</sup> + b<sup>(2)</sup>)
        = W&#771;x + b&#771;</div>
<p>The product of two matrices is a matrix, and the rest is a vector. So the two-layer network
is exactly a one-layer network with <code>W&#771; = W<sup>(2)</sup>W<sup>(1)</sup></code>.
Induction extends this to any depth. No amount of stacking escapes the linear family.</p>

<h3>The functions, and their derivatives</h3>
<p>Backpropagation needs <code>h'</code>, so each activation is only usable if you can
differentiate it. These are the ones worth knowing cold:</p>
<div class="mathblock">&sigma;(a) = 1 / (1 + e<sup>-a</sup>)          &sigma;'(a) = &sigma;(a)(1 - &sigma;(a))

tanh(a) = (e<sup>a</sup> - e<sup>-a</sup>)/(e<sup>a</sup> + e<sup>-a</sup>)   tanh'(a) = 1 - tanh<sup>2</sup>(a)

ReLU(a) = max(0, a)                  ReLU'(a) = 1 if a &gt; 0, else 0</div>
<div class="worked"><b>Deriving the sigmoid derivative.</b> Write
<code>&sigma; = (1 + e<sup>-a</sup>)<sup>-1</sup></code>. By the chain rule,
<code>&sigma;' = -(1 + e<sup>-a</sup>)<sup>-2</sup> &middot; (-e<sup>-a</sup>) = e<sup>-a</sup>/(1+e<sup>-a</sup>)<sup>2</sup></code>.
Now split it: <code>= [1/(1+e<sup>-a</sup>)] &middot; [e<sup>-a</sup>/(1+e<sup>-a</sup>)]</code>.
The first bracket is <code>&sigma;</code>. The second is
<code>(1+e<sup>-a</sup>-1)/(1+e<sup>-a</sup>) = 1 - &sigma;</code>. Hence
<code>&sigma;' = &sigma;(1-&sigma;)</code>. This is why sigmoid was loved: the derivative costs
nothing once you have the output.</div>
<div class="hardidea">🧠 <b>The number that predicts the vanishing gradient.</b> Maximize
<code>&sigma;(1-&sigma;)</code>. It peaks at <code>&sigma; = 0.5</code>, giving
<code>0.25</code>. So <b>the sigmoid derivative never exceeds one quarter</b>. Backpropagation
multiplies one of these per layer, so through ten sigmoid layers the gradient is scaled by at
most <code>0.25<sup>10</sup> &asymp; 10<sup>-6</sup></code>, and that is the best case. This
single number is why deep sigmoid networks would not train, and why ReLU, whose derivative is
exactly 1 on the positive side, changed what was buildable.</div>

<h3>Softmax, since every classifier ends with it</h3>
<div class="mathblock">softmax(a)<sub>k</sub> = e<sup>a<sub>k</sub></sup> / &Sigma;<sub>j</sub> e<sup>a<sub>j</sub></sup></div>
<p>Exponentiate every score to force positivity, then divide by the total so they sum to 1. The
outputs are non-negative and sum to one, which is what lets you read them as probabilities.</p>
<div class="worked"><b>Worked.</b> Scores <code>[2.0, 1.0, 0.1]</code>. Exponentials are
<code>7.39, 2.72, 1.11</code>, summing to <code>11.22</code>. Dividing gives
<code>[0.659, 0.242, 0.099]</code>. In practice you subtract the largest score from all of them
first, since <code>e<sup>1000</sup></code> overflows. The result is unchanged because the shared
factor cancels top and bottom.</div>
`,
 docs:[['A gallery of activation functions with their shapes','https://mlu-explain.github.io/']],
 quiz:{title:'Quick check, activations',questions:[
   {q:'Removing the activation functions from a deep network would:',
    options:['Improve accuracy while costing more memory','Make it equivalent to a single linear layer','Make training slower but still possible','Leave the network unchanged in practice'],answer:1,whyWrong:['Accuracy would collapse to whatever a linear model can manage, which is usually far less.','','Speed is not the issue. The model becomes strictly less expressive.','It changes a great deal. Composing linear maps gives you one linear map.'],
    why:'A weighted sum of weighted sums is a weighted sum. Every layer folds into one line.'},
   {q:'ReLU became the default mainly because:',
    options:['It does not flatten out for positive values','It keeps every output between zero and one','It has a longer history than the alternatives','It is the smoothest option available'],answer:0,whyWrong:['','That is sigmoid, and the flattening at both ends is exactly the problem ReLU avoids.','Sigmoid and tanh are the older functions. ReLU won on behaviour, not seniority.','ReLU has a kink at zero and is not smooth there. Smoothness was not what mattered.'],
    why:'No saturation on the positive side, plus it is trivially cheap. That combination made deep training practical.'},
   {q:'A "dying ReLU" is a neuron that:',
    options:['Grows its weights without any upper bound','Outputs zero for all inputs and stops learning','Alternates between two outputs forever','Loses precision as the network gets deeper'],answer:1,whyWrong:['Unbounded weight growth is a different failure, and it usually shows as divergence rather than silence.','','Nothing oscillates. The neuron simply stops responding to anything.','Precision loss is a numerical issue, unrelated to the ReLU cutoff.'],
    why:'Stuck in the flat region, it has no slope to learn from, so it can never come back.'}
 ]}},

{id:'nn5',
 title:'How a network learns: backpropagation without the calculus fear',
 body:`
<div class="ground"><span class="gTag">🎯 The answer to the question that stalled the field for seventeen years</span>
<p>The problem from the XOR lesson was credit assignment: nobody tells a hidden neuron what it
should have said. Backpropagation is the answer, and the idea underneath it is something you
already do without thinking. If you have followed the calculus stream you have all the
machinery. If you have not, the plain English version below is genuinely enough.</p></div>

<h3>The idea, in a sentence you already believe</h3>
<p>If the final answer was too high, then anything that pushed it upward is partly to blame,
and how much blame depends on how strongly it pushed. Assign blame backward from the output,
layer by layer, until every weight in the network has a share.</p>
<p>Think about a dinner that came out too salty. You do not need to taste every ingredient
separately. You work backward: the sauce was too salty, the sauce was salty because the stock
was salty, the stock was salty because of how much you added. Blame flows backward along the
path that produced the result, and it splits according to how much each step contributed.</p>

<h3>Doing it properly, in four steps</h3>
<p><b>1. Forward pass.</b> Push an example through the network and get a prediction. Keep every
intermediate value, you will need them.</p>
<p><b>2. Measure the loss.</b> Compare the prediction to the truth with one number, the loss
from the orientation lesson.</p>
<p><b>3. Backward pass.</b> Starting at the output, work out how much a small change in each
weight would have changed the loss. This is the <b>gradient</b>: for every weight, a number
saying "nudging you up by a little changes the loss by about this much, in this direction."</p>
<p><b>4. Update.</b> Move every weight a small step in the direction that reduces the loss.
That is the next lesson.</p>

<h3>Why it is called back propagation</h3>
<p>Because of how step 3 is computed. To know how a weight in layer one affected the loss, you
need to know how it affected layer two, which affected layer three, and so on to the output.
Calculus has a rule for exactly this situation, the <b>chain rule</b>, which says that when
effects are linked in a chain you multiply the individual sensitivities together.</p>
<p>The insight that made it practical is that you can compute this from the output end
backward, reusing the work. Each layer receives from the layer above it a summary of "how much
the loss cares about your output," combines it with its own local derivative, and passes a
similar summary down. One pass backward gives you the gradient for every weight in the
network, at roughly the cost of one pass forward. Without that reuse, training a large network
would be hopeless.</p>

<h3>Some history worth knowing</h3>
<p>The pieces existed earlier, in control theory and in a 1970 master's thesis by Seppo
Linnainmaa, and Paul Werbos proposed applying them to networks in 1974. The paper that made the
field notice was Rumelhart, Hinton and Williams in 1986. They did not invent the chain rule.
They showed it worked, on real problems, and that hidden layers learned useful intermediate
features on their own.</p>
<p>That is the part worth sitting with. Nobody tells the middle layers what to detect. Give the
network a goal and a way to assign blame, and useful intermediate representations appear as a
side effect of reducing the loss.</p>
<h3>Backpropagation, derived</h3>
<p>Everything above was intuition. Here is the derivation, following the standard treatment.
Take one training example, with loss <code>E</code>. Define for every unit <code>j</code> the
quantity Bishop calls the <b>error</b>:</p>
<div class="mathblock">&delta;<sub>j</sub> &equiv; &part;E / &part;a<sub>j</sub></div>
<p>That is the sensitivity of the loss to that unit's <i>pre-activation</i>. It is the whole
trick: once you have <code>&delta;</code> for a unit, the derivative for every weight feeding
into it is immediate. Because <code>a<sub>j</sub> = &Sigma;<sub>i</sub> w<sub>ji</sub>z<sub>i</sub></code>,
the chain rule gives:</p>
<div class="mathblock">&part;E/&part;w<sub>ji</sub> = (&part;E/&part;a<sub>j</sub>)(&part;a<sub>j</sub>/&part;w<sub>ji</sub>) = &delta;<sub>j</sub> z<sub>i</sub></div>
<p>Read that in English: <b>the gradient for a weight is the error at its destination times the
activation at its source.</b> Two numbers you already have. That is the entire payoff.</p>
<p>Now the recursion. For an output unit with a squared-error loss and identity output
activation, <code>&delta;<sub>k</sub> = y<sub>k</sub> - t<sub>k</sub></code>, the prediction
minus the target. For a hidden unit <code>j</code>, its pre-activation affects the loss only
through every unit <code>k</code> it feeds, so sum over those paths:</p>
<div class="mathblock">&delta;<sub>j</sub> = &Sigma;<sub>k</sub> (&part;E/&part;a<sub>k</sub>)(&part;a<sub>k</sub>/&part;a<sub>j</sub>)
   = h'(a<sub>j</sub>) &Sigma;<sub>k</sub> w<sub>kj</sub> &delta;<sub>k</sub></div>
<p>There is the algorithm. The errors of the layer above, weighted by the connections leading to
them, scaled by the local derivative of this unit's activation. In matrix form:</p>
<div class="mathblock">&delta;<sup>(l)</sup> = ( W<sup>(l+1)T</sup> &delta;<sup>(l+1)</sup> ) &odot; h'(a<sup>(l)</sup>)</div>
<p>where <code>&odot;</code> is elementwise multiplication. Compare it to the forward pass,
<code>a<sup>(l)</sup> = W<sup>(l)</sup>z<sup>(l-1)</sup> + b<sup>(l)</sup></code>. Forward you
multiply by <code>W</code>; backward you multiply by <code>W<sup>T</sup></code>. The backward
pass is the forward pass run through the transpose.</p>
<div class="worked"><b>The full procedure, four steps.</b> (1) Forward, storing every
<code>a</code> and <code>z</code>. (2) At the output, <code>&delta; = y - t</code>. (3) For
each layer going backward, apply the recursion. (4) Read off
<code>&part;E/&part;w<sub>ji</sub> = &delta;<sub>j</sub>z<sub>i</sub></code> everywhere. Cost is
one forward and one backward pass, so <b>O(W)</b> in the number of weights. Estimating the same
gradients numerically, by perturbing each weight and re-running, would cost <b>O(W&sup2;)</b>.
For 79,510 weights that is the difference between one run and eighty thousand.</div>
<div class="hardidea">🧠 <b>Where the vanishing gradient lives, precisely.</b> Look at the
recursion again: every step backward multiplies by <code>W<sup>T</sup></code> and by
<code>h'</code>. Over <code>L</code> layers you accumulate a product of <code>L</code> such
factors. If those factors are typically below 1, the gradient decays geometrically and the
early layers barely move. If they are above 1, it explodes. The recursion is not just how
training works, it is why deep training is fragile.</div>
`,
 docs:[['Rumelhart, Hinton & Williams 1986','https://www.nature.com/articles/323533a0'],['3Blue1Brown, backpropagation visually','https://www.3blue1brown.com/topics/neural-networks']],
 quiz:{title:'Quick check, backpropagation',questions:[
   {q:'Backpropagation solves which problem?',
    options:['Working out how much each weight contributed to the error','Choosing how many layers a network needs','Storing the training data efficiently in memory','Deciding which activation function to use'],answer:0,whyWrong:['','Layer count is a design choice you make before training starts.','Storage is a data-pipeline concern. Backpropagation computes gradients.','Activation choice is another design decision, not something the algorithm determines.'],
    why:'Credit assignment. It computes a share of the blame for every weight, including hidden ones.'},
   {q:'Why does the algorithm run backward from the output?',
    options:['Because the output layer holds the largest weights','Because forward passes are too slow to repeat','Because the inputs are not known until the end','So each layer can reuse the sensitivity passed down to it'],answer:3,whyWrong:['Weight magnitudes vary by layer and have nothing to do with the direction of the sweep.','The forward pass runs once. It is the per-weight sensitivity that would be expensive to recompute.','The inputs are known first. It is the error that is only known at the end.',''],
    why:'Working backward lets every layer reuse the summary from the layer above, so one pass covers the whole network.'},
   {q:'What did the 1986 paper demonstrate that mattered most?',
    options:['That hidden layers learn useful features unprompted','That the chain rule applies to composed functions','That networks converge faster than decision trees','That deeper networks always beat shallow ones'],answer:0,whyWrong:['','The chain rule was centuries old. Applying it to learned internal representations was the news.','No such comparison was the point, and decision trees were a separate line of work.','Depth was not shown to always win, and it often does not.'],
    why:'Nobody labels the hidden layers. Useful intermediate representations emerge from minimizing the loss.'}
 ]}},

{id:'nn6',
 title:'Gradient descent: rolling downhill in the dark',
 body:`
<div class="ground"><span class="gTag">🎯 What the network does with the blame once it has been assigned</span>
<p>Backpropagation tells you which direction each weight should move. Gradient descent is the
policy for actually moving them, and nearly every practical problem in training is a problem
with this step.</p></div>

<h3>The picture to keep</h3>
<p>Imagine the loss as a landscape. Every possible setting of the weights is a location, and
the height at that location is how wrong the network is there. Training means walking downhill.
The catch is that you cannot see the landscape. You are standing in fog, and all you can feel
is the slope directly under your feet. That is precisely what the gradient gives you.</p>
<p>So the rule is: feel the slope, take a step downhill, feel again, repeat.</p>
<pre><code>new weight = old weight - (learning rate × gradient)</code></pre>
<p>Compare that to the perceptron rule from lesson two. Same shape. The perceptron rule was a
special case of this idea, seventeen years before anyone could apply it to a stack of layers.</p>

<h3>The learning rate, and why it ruins so many runs</h3>
<p>The <b>learning rate</b> is how big a step you take. It is the single setting most likely to
be the reason your training is not working.</p>
<p>Too small, and you creep. Training that should take an hour takes a week, and you may stall
somewhere unhelpful. Too large, and you leap past the bottom of the valley and land higher up
the other side, then overcorrect again. The loss goes up instead of down, sometimes to
infinity. When someone says their loss "exploded," this is usually why.</p>
<p>In practice people start around 0.001 for common optimizers and reduce it as training goes
on, taking big strides early and small careful ones near the end.</p>

<h3>Why nobody uses the whole dataset at once</h3>
<p>Strictly, the gradient should be computed over every training example. With a million
examples that is one step per full pass, which is unbearably slow.</p>
<p>So instead you take a <b>batch</b>, maybe 32 or 256 examples, compute the gradient on those,
and step. That is <b>stochastic gradient descent</b>. The direction is noisier, because a small
sample is an imperfect estimate of the whole. This turns out to help: the noise can shake you
out of a shallow dip that is not the real bottom.</p>
<p>One pass through all your data is an <b>epoch</b>. Training runs for many epochs, reshuffling
between them.</p>

<h3>The optimizers you will see named</h3>
<p><b>SGD with momentum</b> keeps a running memory of recent steps, so consistent downhill
directions build up speed and jittery ones cancel out. Like a ball rolling rather than a hiker
stepping.</p>
<p><b>Adam</b> is the common default. It keeps a separate, automatically adjusted step size for
every individual weight, based on how that weight's gradient has behaved recently. Weights with
consistently small gradients get larger steps, and vice versa. It is not magic and it does not
always beat well-tuned SGD, but it works acceptably without much tuning, which is why it is
everywhere.</p>

<h3>What about getting stuck</h3>
<p>The classic worry is landing in a <b>local minimum</b>, a dip that is not the lowest point.
In the very high dimensional spaces real networks live in, this turns out to be much less of a
problem than expected. With millions of weights, a point that is a minimum in every single
direction at once is vanishingly rare. What you actually meet are <b>saddle points</b>, downhill
in some directions and uphill in others, and momentum handles those reasonably well.</p>
<h3>The update rule, and why that direction</h3>
<p>A first-order Taylor expansion of the loss around the current weights says that for a small
step <code>&Delta;w</code>:</p>
<div class="mathblock">E(w + &Delta;w) &asymp; E(w) + &nabla;E(w)<sup>T</sup> &Delta;w</div>
<p>To make the loss fall as fast as possible for a step of fixed length, choose
<code>&Delta;w</code> pointing opposite to the gradient, because
<code>&nabla;E<sup>T</sup>&Delta;w</code> is most negative when the two vectors are
antiparallel. That is the entire justification, and it is also the warning: it is a
<b>local, first-order</b> argument, valid only for small steps. Take too large a step and the
approximation stops holding, which is what a diverging loss looks like.</p>
<div class="mathblock">w<sup>(&tau;+1)</sup> = w<sup>(&tau;)</sup> - &eta; &nabla;E(w<sup>(&tau;)</sup>)</div>

<h3>Momentum and Adam, written out</h3>
<div class="mathblock">momentum:  v &larr; &beta;v + &nabla;E ;   w &larr; w - &eta;v

Adam:  m &larr; &beta;<sub>1</sub>m + (1-&beta;<sub>1</sub>)g
       v &larr; &beta;<sub>2</sub>v + (1-&beta;<sub>2</sub>)g&sup2;
       m&#770; = m/(1-&beta;<sub>1</sub><sup>t</sup>) ,  v&#770; = v/(1-&beta;<sub>2</sub><sup>t</sup>)
       w &larr; w - &eta; m&#770; / (&radic;v&#770; + &epsilon;)</div>
<p>In words: <code>m</code> is a running average of the gradient, so it smooths the direction.
<code>v</code> is a running average of the gradient <i>squared</i>, so it measures how large
that weight's gradients have been. Dividing by <code>&radic;v&#770;</code> gives each weight its
own step size, large where gradients have been small and small where they have been large. The
hats correct the bias caused by starting both averages at zero, which otherwise makes the first
few steps far too small. Typical values are
<code>&beta;<sub>1</sub>=0.9, &beta;<sub>2</sub>=0.999, &epsilon;=10<sup>-8</sup></code>.</p>
<div class="worked"><b>Why the learning rate has the units it does.</b> The gradient has units
of loss per unit weight. Multiplying by <code>&eta;</code> must give units of weight, so
<code>&eta;</code> carries units of weight squared per loss. This is why a learning rate that
worked on one problem can be badly wrong on another whose loss is scaled differently, and why
normalizing inputs changes which learning rates work.</div>
<div class="hardidea">🧠 <b>The curvature problem gradient descent cannot see.</b> The gradient
is first order, so it knows the slope but not the shape. In a valley that is steep across and
shallow along, the steepest direction points across the valley rather than down it, and plain
descent zig-zags. The second-order information lives in the <b>Hessian</b>, the matrix of second
derivatives, and stepping with it (Newton's method) would fix this. For a network with
<code>W</code> weights the Hessian has <code>W&sup2;</code> entries, so for a million weights it
is a trillion numbers. That is why the field uses cheap approximations, and momentum and Adam
are both crude ways of buying a little curvature information without ever forming the
matrix.</div>
`,
 docs:[['An interactive look at optimizers on the same landscape','https://distill.pub/2017/momentum/']],
 quiz:{title:'Quick check, gradient descent',questions:[
   {q:'A learning rate that is too large typically causes:',
    options:['The gradients to become exactly zero','The loss to rise instead of falling','Memory use to grow with each epoch','Training to converge to a worse minimum quietly'],answer:1,whyWrong:['Gradients going to zero is the vanishing-gradient failure, which comes from saturation rather than step size.','','Memory use is set by the architecture and the batch size, not by the learning rate.','Quietly settling into a worse minimum is what too small a rate can do. Too large is usually loud.'],
    why:'You overshoot the valley and land higher up, then overshoot again. The loss diverges.'},
   {q:'Stochastic gradient descent uses a small batch because:',
    options:['The full dataset rarely fits in memory at all','Small batches give a more accurate gradient','Full-dataset steps are far too slow to iterate','It reduces the number of weights to update'],answer:2,whyWrong:['Memory is often fine. The real cost is one update per full pass, which is far too few updates.','A small batch gives a noisier gradient, not a more accurate one. The noise is the price you pay.','','Every weight is updated either way. Batch size changes how the gradient is estimated.'],
    why:'One step per full pass is unusable. Batches trade some accuracy in the direction for far more steps.'},
   {q:'In very high dimensional weight spaces, the more common obstacle is:',
    options:['Weights overflowing their numeric range','Saddle points, downhill some ways and uphill others','Gradients pointing in random directions','Local minima in every direction at once'],answer:1,whyWrong:['Overflow is a numerical problem addressed by scaling, and it is not a feature of the landscape.','','Gradients point downhill by construction. The randomness comes from the batch, not the geometry.','A true local minimum needs every direction to be uphill, and in a million dimensions that is very unlikely.'],
    why:'A true local minimum needs every direction to curve upward, which is vanishingly unlikely with millions of weights.'}
 ]}},

{id:'nn7',
 title:'Overfitting, and the tricks that stop it',
 body:`
<div class="ground"><span class="gTag">🎯 A network that scores perfectly on your data and fails in the world</span>
<p>A neural network with enough weights can memorize its training set exactly, including the
noise and the mistakes in it. This is the central practical danger of the whole field, and
every technique in this lesson exists to fight it.</p></div>

<h3>Memorizing versus learning</h3>
<p>Give a large network a thousand photos labeled cat or dog and enough training time, and it
can reach 100 percent accuracy by effectively storing them. Show it a new photo and it may be
useless. It learned <i>those pictures</i>, not what a cat looks like.</p>
<p>You detect this by holding data back. Split your data into a <b>training set</b> the network
learns from and a <b>validation set</b> it never sees during training. Then watch both losses.
While both fall, learning is happening. When training loss keeps falling and validation loss
starts rising, memorization has started. That crossing point is the thing to watch, and it is
the single most useful graph in machine learning.</p>

<h3>The fixes, roughly in order of effectiveness</h3>
<p><b>More data.</b> Unglamorous and almost always the strongest option. Memorizing ten
thousand examples is much harder than memorizing one hundred, so the network is pushed toward
finding an actual pattern.</p>
<p><b>Data augmentation.</b> When you cannot get more data, make more from what you have. Flip
the image, rotate it slightly, crop it, adjust the brightness. A cat rotated five degrees is
still a cat, and the network sees a fresh example. This is standard practice for images and it
works remarkably well.</p>
<p><b>Early stopping.</b> Watch the validation loss and stop training at the moment it turns
upward. Free, obvious, and effective.</p>
<p><b>Dropout.</b> During training, randomly switch off a fraction of the neurons on each pass,
often half of them. It sounds like sabotage. It works because the network cannot rely on any
one neuron always being present, so it has to spread the representation across many, and
spread-out representations generalize better. At prediction time everything is switched back
on.</p>
<p><b>Weight regularization.</b> Add a penalty to the loss for large weights, so the optimizer
prefers small ones unless large ones genuinely help. Small weights mean a smoother, less
contorted function, and smooth functions are less able to bend around individual noisy points.</p>
<p><b>A smaller network.</b> Fewer weights means less capacity to memorize. Worth trying, and
usually the last resort, since the modern instinct is a large model held in check by the
techniques above.</p>

<h3>The opposite problem, briefly</h3>
<p><b>Underfitting</b> is when the model is too simple to capture the pattern, and both losses
stay high. The fix is the reverse: a bigger network, more training, fewer restrictions. The
useful diagnostic is that overfitting shows a <i>gap</i> between the two losses, while
underfitting shows both of them stuck.</p>

<h3>The habit to build</h3>
<p>Never judge a model by its training accuracy. It is the score on an exam the model wrote for
itself. The only number worth reporting is performance on data the model has never seen, and if
you have tuned your choices against the validation set many times, you need a third untouched
<b>test set</b> to keep yourself honest.</p>
<h3>Regularization, as an addition to the loss</h3>
<p>"Penalize large weights" has a precise form. Add a term proportional to the squared length of
the weight vector:</p>
<div class="mathblock">E&#771;(w) = E(w) + (&lambda;/2) w<sup>T</sup>w</div>
<p>Differentiate and the effect on the update is immediate:</p>
<div class="mathblock">&nabla;E&#771; = &nabla;E + &lambda;w

w &larr; w - &eta;(&nabla;E + &lambda;w) = (1 - &eta;&lambda;)w - &eta;&nabla;E</div>
<p>Every step multiplies the weights by <code>(1 - &eta;&lambda;)</code>, slightly less than 1,
before the gradient step. The weights shrink toward zero on their own and only stay large when
the data keeps pushing them back. This is why <code>L2</code> regularization is also called
<b>weight decay</b>, and now the name is not a coincidence, it is the algebra.</p>
<div class="demystify"><b>L1 versus L2.</b> Using <code>&lambda;&Sigma;|w<sub>i</sub>|</code>
instead gives a gradient of <code>&lambda; &middot; sign(w)</code>, a constant pull toward zero
regardless of size. Constant pull drives small weights to exactly zero, so L1 produces
<b>sparse</b> models where many weights vanish entirely. L2's pull is proportional to the
weight, so it shrinks large weights hard and small ones barely, and nothing reaches exactly
zero.</div>
<div class="hardidea">🧠 <b>What regularization means probabilistically.</b> Minimizing
<code>E + (&lambda;/2)w<sup>T</sup>w</code> is exactly maximizing the posterior
<code>p(w|D) &prop; p(D|w)p(w)</code> under a zero-mean Gaussian prior on the weights, with
<code>&lambda;</code> set by the prior's variance. The penalty is not a hack bolted onto the
loss. It is a prior belief that weights are probably small, stated in the language of
optimization. L1 is the same statement with a Laplace prior, whose sharp peak at zero is what
produces sparsity.</div>
<div class="worked"><b>Dropout, and why halving matters.</b> With dropout probability
<code>p</code>, each unit is kept with probability <code>1-p</code> during training, so a
unit's expected contribution is <code>(1-p)</code> times its full value. At test time nothing is
dropped, so outputs would be too large by <code>1/(1-p)</code>. Implementations fix this by
scaling activations up by <code>1/(1-p)</code> during training, called <b>inverted
dropout</b>, so that test time needs no adjustment at all.</div>
`,
 docs:[['Dropout, the original paper','https://jmlr.org/papers/v15/srivastava14a.html']],
 quiz:{title:'Quick check, overfitting',questions:[
   {q:'The clearest signal of overfitting is:',
    options:['Accuracy fluctuates between batches','Both losses stay high and stop moving','Training loss falls while validation loss rises','The gradients become smaller each epoch'],answer:2,whyWrong:['Batch-to-batch fluctuation is ordinary noise from stochastic gradients.','Both staying high is underfitting, which is the opposite problem.','','Shrinking gradients usually mean you are approaching a minimum, which is not in itself a warning.'],
    why:'The gap opening between the two is the signature. Both stuck high is underfitting instead.'},
   {q:'Dropout helps because the network:',
    options:['Converges before it has time to memorize','Trains on fewer examples per epoch','Cannot depend on any single neuron being present','Uses less memory during the backward pass'],answer:2,whyWrong:['Dropout usually slows convergence rather than cutting it short.','Every example is still used. What gets dropped are units, not rows.','','Memory use is essentially unchanged, and it is not why dropout helps.'],
    why:'Forcing redundancy spreads the representation out, and spread-out representations generalize better.'},
   {q:'Why keep a separate test set as well as a validation set?',
    options:['Because validation data is used up during training','Because two estimates are averaged for accuracy','To measure how fast the model runs in production','To check the model on data no choice was tuned against'],answer:3,whyWrong:['Validation data is reusable. What gets used up is its independence, which is why a test set exists.','Nothing is averaged. They measure different things at different points in the process.','Speed is measured with a benchmark, not with held-out data.',''],
    why:'Once you have tuned repeatedly against the validation set, its score is optimistic. The test set stays untouched.'}
 ]}}
,

{id:'nn8',
 title:'Convolution in plain English: sliding a stencil across a picture',
 body:`
<div class="ground"><span class="gTag">🎯 The word that scares people off, defined before any symbol</span>
<p>"Convolutional" sounds like it belongs in a physics paper. The operation is something you
could do by hand with a piece of card. This lesson defines it in plain English, then in
arithmetic, then in the notation you will meet in papers, in that order.</p></div>

<h3>The plain English version</h3>
<p>Cut a small square hole in a piece of card, say three by three. Lay it over the top-left
corner of a photograph so it exposes nine pixels. Multiply each exposed pixel by a number you
have chosen for that position, add up the nine results, and write that single number down.
Now slide the card one pixel to the right and do it again. Keep going along the row, then down
to the next row, until you have covered the whole image.</p>
<p>You have just performed a convolution. The card with its nine chosen numbers is called a
<b>kernel</b> or a <b>filter</b>. The grid of numbers you wrote down is called a <b>feature
map</b>. That is the entire operation, and everything else is detail.</p>

<h3>Why sliding the same card everywhere is the point</h3>
<p>The same nine numbers are used at every position. This is <b>weight sharing</b>, and it
carries two consequences that matter enormously.</p>
<p>First, it is a statement about images: <b>a pattern is a pattern wherever it appears</b>. An
edge in the top-left corner and an identical edge in the bottom-right are the same thing, so
they should be detected by the same nine numbers. A dense layer has no idea about this and has
to learn each corner of the image separately.</p>
<p>Second, it is a huge saving. Nine numbers cover an entire image of any size, where a dense
layer connecting a 200 by 200 image to a 200 by 200 output would need 1.6 billion weights.</p>

<h3>What the numbers on the card actually do</h3>
<p>Choose the nine numbers well and the operation detects something specific.</p>
<pre><code>-1  0  1        1  1  1        0 -1  0
-1  0  1        0  0  0       -1  5 -1
-1  0  1       -1 -1 -1        0 -1  0
vertical edges  horizontal      sharpen</code></pre>
<p>Take the first one. Where the image is flat, the pixels on the left and right are similar,
so <code>-1</code> times one side plus <code>+1</code> times the other cancels out and you get
roughly zero. Where there is a vertical edge, dark on the left and bright on the right, the
sum is large. So this card lights up precisely where vertical edges are, and stays dark
elsewhere.</p>
<p>Before neural networks, people designed these numbers by hand. The Sobel operator above is
from 1968. <b>The insight of a convolutional network is to stop designing them and let
backpropagation find them</b>, because a kernel is just nine weights, and weights are what
training finds.</p>

<h3>The arithmetic, one window at a time</h3>
<div class="worked"><b>Worked, fully.</b> Take a patch and the vertical-edge kernel above:
<pre><code>patch:            kernel:
 10  10  200      -1  0  1
 10  10  200      -1  0  1
 10  10  200      -1  0  1</code></pre>
Multiply position by position and sum:
<code>(10)(-1) + (10)(0) + (200)(1) = 190</code> for the top row, and the same for the middle
and bottom rows. Total <code>570</code>. A large positive number, because this patch is exactly
a vertical edge going from dark to bright. Now try a flat patch of all 10s:
<code>(10)(-1) + 0 + (10)(1) = 0</code> per row, total <code>0</code>. Nothing detected,
correctly.</div>

<h3>The formula, now that it means something</h3>
<div class="mathblock">S(i,j) = &Sigma;<sub>m</sub> &Sigma;<sub>n</sub> I(i+m, j+n) &middot; K(m,n)</div>
<p>Read it back: for output position <code>(i,j)</code>, run <code>m</code> and <code>n</code>
over the kernel's little grid, multiply the image pixel at the offset position by the kernel
value there, and add everything up. That is the sliding card, written down.</p>
<div class="demystify"><b>The pedantic footnote every textbook makes.</b> True mathematical
convolution flips the kernel first, <code>I(i-m, j-n)</code>. What neural networks actually
compute is <b>cross-correlation</b>, without the flip. Nobody minds, because the kernel values
are learned, so the network simply learns the flipped version if that is what it needs. Every
library calls it convolution. Now you know why a mathematician might raise an eyebrow.</div>

<h3>The three settings you will always have to choose</h3>
<p><b>Stride</b> is how far the card jumps each time. Stride 1 moves one pixel and overlaps
heavily. Stride 2 skips every other position and halves the output size.</p>
<p><b>Padding</b> deals with the edges. A three by three card cannot be centered on a corner
pixel, so without padding the output is smaller than the input, and corner pixels get looked at
less often than middle ones. Adding a border of zeros, called <b>same</b> padding, keeps the
output the same size.</p>
<p><b>Channels.</b> A color image is three stacked grids, red, green and blue. So the kernel is
not three by three, it is three by three by three, and it sums across all of them to produce one
output number. A layer usually learns many kernels at once, say 64, producing 64 feature maps
stacked into the next layer's channels.</p>
<div class="mathblock">params in a conv layer = (k<sub>h</sub> &times; k<sub>w</sub> &times; C<sub>in</sub> + 1) &times; C<sub>out</sub>

output size = floor( (W - k + 2p) / s ) + 1</div>
<div class="worked"><b>Worked.</b> A 3&times;3 kernel over 3 input channels producing 64 output
channels: <code>(3&times;3&times;3 + 1) &times; 64 = 1,792</code> parameters, and that number is
the same whether the image is 32 pixels wide or 4,000. A dense layer on a 224&times;224&times;3
image with 64 outputs of the same size would need over 480 billion. That ratio is why
convolution exists.</div>
`,
 docs:[['A visual guide to convolution arithmetic','https://github.com/vdumoulin/conv_arithmetic']],
 quiz:{title:'Quick check, convolution',questions:[
   {q:'A convolution kernel is:',
    options:['A rule for choosing which pixels to discard','A small grid of weights applied across the whole image','A layer that reduces the number of channels','A compressed copy of the input image'],answer:1,whyWrong:['Discarding pixels is what striding and pooling do. The kernel computes, it does not select.','','Channel reduction is a 1x1 convolution or a pooling layer. The kernel itself is just weights.','Nothing is copied. The kernel is learned and is far smaller than the image.'],
    why:'A small grid of numbers, slid over every position, multiplied and summed. The numbers are learned.'},
   {q:'Weight sharing encodes which assumption about images?',
    options:['Images are square more often than not','Neighboring pixels usually have similar values','A pattern means the same thing anywhere it appears','Color matters less than brightness does'],answer:2,whyWrong:['Aspect ratio has nothing to do with it. Weight sharing works on any shape.','That is a smoothness assumption, and it is what makes small kernels sensible rather than what sharing encodes.','','Colour and brightness are both just channels. Sharing says nothing about their relative importance.'],
    why:'Translation invariance. The same detector is reused at every position because position should not change what a pattern is.'},
   {q:'A 3x3 kernel over 3 channels producing 64 outputs has how many parameters?',
    options:['9, since the kernel is shared','1,792, including one bias per output','576, ignoring the bias terms','192, one per kernel position'],answer:1,whyWrong:['Nine counts one channel of one kernel. There are three input channels and sixty-four kernels.','','576 is 3x3x64, which forgets the three input channels and the biases.','That counts a fraction of the connections. The total is 3x3x3x64 weights plus 64 biases.'],
    why:'(3 × 3 × 3 + 1) × 64. Independent of image size, which is the whole saving.'}
 ]}},

{id:'nn9',
 title:'CNNs: why images broke ordinary networks, and what fixed it',
 body:`
<div class="ground"><span class="gTag">🎯 Three problems with dense layers, and the three answers</span>
<p>Convolution is the main answer, but it is not the only one. A convolutional network is
convolution plus pooling plus depth, arranged so that simple detectors in early layers become
complicated ones later.</p></div>

<h3>What actually goes wrong with a dense layer on an image</h3>
<p><b>Parameter count.</b> A 224 by 224 color image is 150,528 numbers. One dense hidden layer
of 1,000 units needs 150 million weights, in the first layer alone. That is a model that will
memorize your training set and nothing else.</p>
<p><b>No notion of nearby.</b> Flattening an image into a row destroys the fact that two pixels
were adjacent. A dense layer sees an unordered list of numbers, and would behave identically if
you shuffled every pixel, as long as you shuffled them the same way every time. Everything you
know about images being made of local shapes is thrown away before the first weight is applied.</p>
<p><b>No transfer across position.</b> A cat learned in the top-left teaches the network nothing
about a cat in the bottom-right. Those go through entirely different weights.</p>

<h3>Pooling, the second idea</h3>
<p>After a convolution you often <b>pool</b>: take each little region of the feature map, say
two by two, and keep only the largest value. This shrinks the map by half in each direction and
discards precisely where within that small region the feature was.</p>
<p>That discarding is the point. Once you know there is an edge somewhere in this neighborhood,
its exact pixel is rarely what matters, and forgetting it buys you <b>tolerance to small
shifts</b>. It also cuts the amount of computation for every layer that follows.</p>
<div class="worked"><b>Max pooling, worked.</b> The 2&times;2 patch
<code>[[1, 9], [4, 3]]</code> pools to <code>9</code>. The gradient during backpropagation flows
only to the position that produced the 9, since the other three had no effect on the output. The
rest receive exactly zero. Max pooling routes gradient as well as signal.</div>

<h3>The shape of a classic CNN</h3>
<pre><code>image -> [conv -> ReLU -> conv -> ReLU -> pool] x N -> flatten -> dense -> softmax</code></pre>
<p>Each block finds features and then shrinks. Because the map shrinks while the kernel stays
three by three, a kernel in a later layer covers a much larger region of the original image. Its
<b>receptive field</b> has grown, without anyone enlarging the kernel.</p>
<div class="mathblock">receptive field growth, stacked 3&times;3 convs with stride 1:
layer 1: 3&times;3      layer 2: 5&times;5      layer 3: 7&times;7

two 3&times;3 convs: 18 params per channel pair, receptive field 5&times;5
one 5&times;5 conv:   25 params per channel pair, receptive field 5&times;5</div>
<p>That comparison is why modern networks are built from stacks of small kernels rather than
single large ones: the same reach, fewer parameters, and an extra nonlinearity in between.</p>

<h3>The hierarchy, which is the real result</h3>
<p>Look at what the kernels learn, layer by layer, and you find the same thing every time.
Early layers become edge and color-blob detectors, closely resembling the hand-designed filters
of the 1970s and the receptive fields Hubel and Wiesel recorded in cat visual cortex in 1959.
Middle layers respond to corners, textures and repeated motifs. Later layers respond to object
parts, an eye, a wheel, a doorknob. Nobody specified any of this. It emerges from minimizing
classification error.</p>

<h3>A short history worth knowing</h3>
<p>Yann LeCun's <b>LeNet-5</b> read handwritten digits on checks in 1998, and it already has the
modern shape. The field then largely ignored it for over a decade, because there was neither
the data nor the hardware. In 2012 <b>AlexNet</b> won ImageNet by an enormous margin, using the
same ideas plus ReLU, dropout, and two GPUs. The architecture was not new. What was new was
1.2 million labeled images and hardware fast enough to use them.</p>
<div class="hardidea">🧠 <b>The lesson people take the wrong way.</b> It is tempting to conclude
that scale is all that matters. The more precise reading is that AlexNet worked because its
<i>architecture encoded a true fact about images</i>, and scale let that fact be exploited. A
dense network with the same data and hardware did not win. The prior mattered, and then the
scale mattered.</div>
`,
 docs:[['LeCun et al., LeNet-5 (1998)','http://yann.lecun.com/exdb/publis/pdf/lecun-98.pdf'],['AlexNet (2012)','https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks']],
 quiz:{title:'Quick check, CNNs',questions:[
   {q:'Flattening an image before a dense layer destroys:',
    options:['The brightness range of the original image','The ability to use backpropagation','The color information in the channels','The information about which pixels were adjacent'],answer:3,whyWrong:['The brightness values survive exactly. What is lost is where each one sat.','Backpropagation works fine through a flatten. It is a reshape, not a barrier.','The colour channels survive too. They just end up in a long unstructured row.',''],
    why:'A dense layer sees an unordered list. Any consistent shuffle of the pixels would train equally well.'},
   {q:'Max pooling mainly buys you:',
    options:['More precise localization of each feature','A larger number of learnable parameters','Tolerance to small shifts, and less computation','Protection against vanishing gradients'],answer:2,whyWrong:['Precision goes the other way. Pooling deliberately blurs where a feature was.','Max pooling has no parameters at all.','','Vanishing gradients are addressed by activation choice, normalisation and residual paths.'],
    why:'It deliberately forgets exactly where in a small region a feature was, which is what makes it shift tolerant.'},
   {q:'Two stacked 3x3 convolutions are usually preferred to one 5x5 because they:',
    options:['Use fewer parameters and add a nonlinearity','Avoid the need for any padding at the edges','Cover a larger region of the input image','Can be computed in a single GPU pass'],answer:0,whyWrong:['','Both need padding if you want to keep the spatial size.','Two 3x3 layers reach exactly the same 5x5 receptive field, which is what makes the comparison fair.','They are two separate layers and cannot be fused into one without changing the arithmetic.'],
    why:'Same 5×5 receptive field, 18 parameters instead of 25, and a ReLU in the middle.'}
 ]}},

{id:'nn10',
 title:'Sequences and memory: recurrent networks',
 body:`
<div class="ground"><span class="gTag">🎯 What to do when the input has no fixed length</span>
<p>Convolution assumed a grid. Now consider a sentence, a stock price, or an audio clip. The
input is a sequence, its length varies, and the order carries the meaning. A dense layer needs
a fixed number of inputs, so it cannot even accept this. Recurrence is the first answer the
field found.</p></div>

<h3>The idea in plain English</h3>
<p>Read the sequence one item at a time, and keep a notepad. At each step, look at the current
item and at what is on the notepad, produce an output, and update the notepad. The notepad is
the only thing carried forward, so it has to hold everything from the past that still matters.</p>
<p>That notepad is called the <b>hidden state</b>. The network is the same at every step, the
same weights applied over and over, which is why it can handle a sequence of any length. It is
weight sharing again, but across time rather than across space.</p>

<h3>Written down</h3>
<div class="mathblock">h<sub>t</sub> = tanh( W<sub>hh</sub> h<sub>t-1</sub> + W<sub>xh</sub> x<sub>t</sub> + b<sub>h</sub> )

y<sub>t</sub> = W<sub>hy</sub> h<sub>t</sub> + b<sub>y</sub></div>
<p>Three weight matrices, reused at every timestep. <code>W<sub>xh</sub></code> decides how the
new input enters, <code>W<sub>hh</sub></code> decides how the notepad carries forward, and
<code>W<sub>hy</sub></code> decides how to read an answer out of it. The starting state
<code>h<sub>0</sub></code> is usually zeros.</p>
<div class="worked"><b>Why the same matrix at every step matters.</b> If each timestep had its
own weights, a network trained on ten-word sentences could not process an eleventh word, having
never learned a weight for that position. Sharing <code>W<sub>hh</sub></code> means the rule for
"update the notepad" is learned once and applies at any length, exactly as one kernel applies at
any image position.</div>

<h3>Training it: unrolling</h3>
<p>To train, you <b>unroll</b> the loop. A 20-step sequence becomes a 20-layer feed-forward
network, where every layer happens to share the same weights, and then you run ordinary
backpropagation over it. This is called <b>backpropagation through time</b>. The gradients for
the shared matrix are summed across all the steps where it was used.</p>
<div class="mathblock">&part;E/&part;W<sub>hh</sub> = &Sigma;<sub>t=1..T</sub> &part;E<sub>t</sub>/&part;W<sub>hh</sub></div>

<h3>The problem, which is now predictable</h3>
<p>You already have everything needed to see what goes wrong. Propagating gradient from step
<code>T</code> back to step <code>t</code> means passing through <code>T - t</code> applications
of the same recursion, so the chain rule accumulates a product:</p>
<div class="mathblock">&part;h<sub>T</sub>/&part;h<sub>t</sub> = &Pi;<sub>k=t+1..T</sub> W<sub>hh</sub><sup>T</sup> diag( tanh'(a<sub>k</sub>) )</div>
<p>The same matrix, multiplied by itself, over and over. Whether that product survives is
governed by the largest singular value of <code>W<sub>hh</sub></code>, call it
<code>&lambda;</code>. If <code>&lambda; &lt; 1</code> the product shrinks geometrically toward
zero. If <code>&lambda; &gt; 1</code> it grows without bound. There is no comfortable middle,
because a number other than exactly 1 raised to a large power goes to 0 or to infinity.</p>
<div class="hardidea">🧠 <b>Put numbers on it.</b> Suppose the per-step factor is 0.9, which
sounds harmless. Over 50 steps: <code>0.9<sup>50</sup> &asymp; 0.005</code>. The gradient
reaching the start of the sequence is two hundred times smaller than the one at the end, so the
early words barely train. Now suppose it is 1.1: <code>1.1<sup>50</sup> &asymp; 117</code>, and
one bad batch produces an update large enough to destroy the model. Recall that
<code>tanh'</code> is at most 1 and usually much less, so the shrinking case is the normal one.
<b>A plain RNN cannot reliably learn dependencies more than about ten steps apart.</b></div>
<p>Exploding gradients have a blunt fix that works: <b>gradient clipping</b>, which rescales the
gradient whenever its norm exceeds a threshold. Vanishing gradients have no such fix, because
you cannot amplify information that is already gone. That required a change to the
architecture, which is the next lesson.</p>
`,
 docs:[['Karpathy, the unreasonable effectiveness of RNNs','https://karpathy.github.io/2015/05/21/rnn-effectiveness/']],
 quiz:{title:'Quick check, RNNs',questions:[
   {q:'The hidden state in an RNN is:',
    options:['A copy of the most recent input value','The gradient accumulated so far in training','A summary of the past, carried to the next step','The output before the activation is applied'],answer:2,whyWrong:['A copy of the input carries no memory. The whole point is that it accumulates.','Gradients are a training-time quantity. The hidden state exists at inference too.','','The pre-activation value is an intermediate inside one step, not the thing carried between steps.'],
    why:'It is the notepad. Everything the network still needs from earlier in the sequence has to be in it.'},
   {q:'Why does an RNN reuse the same weight matrices at every timestep?',
    options:['Because timesteps are processed in parallel','To keep the hidden state from growing too large','To reduce the memory needed during training','So it can process sequences of any length'],answer:3,whyWrong:['Timesteps are processed in sequence, which is precisely the RNN\'s weakness.','Sharing weights does not bound the hidden state. Saturating activations are what do that.','It does save memory, and the reason it is done is that a sequence has no fixed length to give separate weights to.',''],
    why:'Per-step weights could not generalize past the longest sequence seen in training.'},
   {q:'Vanishing gradients in an RNN come from:',
    options:['The activation function saturating at both ends','Repeatedly multiplying by the same matrix','Too many parameters for the data available','The loss being summed rather than averaged'],answer:1,whyWrong:['Saturation contributes, and it is the compounding across many steps that turns small into vanishing.','','Too many parameters causes overfitting. Vanishing gradients happen in small RNNs too.','Summing rather than averaging rescales the loss by a constant, which cannot cause exponential decay.'],
    why:'A repeated product of factors below one decays geometrically. Saturating tanh makes it worse but the product is the cause.'}
 ]}}
,

{id:'nn11',
 title:'Why RNNs forget, and how gates fixed it',
 body:`
<div class="ground"><span class="gTag">🎯 If the problem is a repeated multiplication, remove the multiplication</span>
<p>The last lesson ended with a diagnosis: gradient dies because it is multiplied by the same
matrix at every step. The LSTM, published by Hochreiter and Schmidhuber in 1997, fixes it by
building a path through time where the gradient is <b>added to</b> rather than multiplied.</p></div>

<h3>The idea in plain English</h3>
<p>Keep two things instead of one. A <b>cell state</b>, which is a conveyor belt running the
length of the sequence and which the network mostly leaves alone, and a <b>hidden state</b>,
which is the working output at each step.</p>
<p>Then add three small controllers, called <b>gates</b>, each of which is a tiny neural network
producing a number between 0 and 1 for every position on the belt. Zero means block completely,
one means let through completely.</p>
<p><b>The forget gate</b> decides what to wipe off the belt. <b>The input gate</b> decides what
new information to place on it. <b>The output gate</b> decides how much of the belt to expose as
this step's answer. Every one of those decisions is learned, and depends on what the network is
currently reading.</p>

<h3>Written out</h3>
<div class="mathblock">f<sub>t</sub> = &sigma;( W<sub>f</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub> )      forget gate
i<sub>t</sub> = &sigma;( W<sub>i</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub> )      input gate
o<sub>t</sub> = &sigma;( W<sub>o</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub> )      output gate

C&#771;<sub>t</sub> = tanh( W<sub>C</sub>[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>C</sub> )   candidate

C<sub>t</sub> = f<sub>t</sub> &odot; C<sub>t-1</sub> + i<sub>t</sub> &odot; C&#771;<sub>t</sub>    the belt
h<sub>t</sub> = o<sub>t</sub> &odot; tanh( C<sub>t</sub> )</div>
<p>Sigmoid is used for the gates precisely because it outputs between 0 and 1, which is what a
valve needs. <code>&odot;</code> is elementwise, so each position on the belt is gated
independently.</p>

<h3>The line that does the work</h3>
<p>Look only at the cell state update:</p>
<div class="mathblock">C<sub>t</sub> = f<sub>t</sub> &odot; C<sub>t-1</sub> + i<sub>t</sub> &odot; C&#771;<sub>t</sub>

&part;C<sub>t</sub>/&part;C<sub>t-1</sub> = f<sub>t</sub></div>
<p>Compare that with the RNN, where the equivalent derivative was
<code>W<sub>hh</sub><sup>T</sup>diag(tanh')</code>. Here it is just the forget gate. If the
network learns <code>f<sub>t</sub> &asymp; 1</code> for some position, the gradient passes
through that step essentially unchanged, and it can do so for hundreds of steps. The path from
<code>C<sub>1</sub></code> to <code>C<sub>T</sub></code> is a sum with a near-identity
connection, not a product of matrices.</p>
<div class="hardidea">🧠 <b>The generalizable idea, which matters more than the LSTM.</b> The
fix was to create a route through the network that is close to the identity, so gradient
survives it. That same idea reappears as <b>residual connections</b> in ResNet, where a layer
computes <code>y = F(x) + x</code> rather than <code>y = F(x)</code>. The derivative of that
addition is 1, so gradient always has an unobstructed path back. Skip connections are what let
networks go from about 20 layers to over 100. LSTM gates and residual connections are the same
insight applied to time and to depth.</div>
<div class="worked"><b>Why the forget-gate bias is initialized to 1.</b> A common trick is to
set <code>b<sub>f</sub></code> to 1 at the start, so <code>&sigma;(1) &asymp; 0.73</code> and
the belt defaults to remembering. Initialized at zero, <code>&sigma;(0) = 0.5</code>, and the
cell state halves every step, so it forgets almost everything before training has a chance to
learn otherwise.</div>

<h3>GRU, in one paragraph</h3>
<p>The <b>gated recurrent unit</b> (2014) merges the forget and input gates into one update
gate, and drops the separate cell state. Fewer parameters, faster, and in practice usually
comparable. Which one is better depends on the problem, and the honest answer from the
literature is that the difference is small.</p>
`,
 docs:[['Hochreiter & Schmidhuber, Long Short-Term Memory (1997)','https://www.bioinf.jku.at/publications/older/2604.pdf'],['Olah, Understanding LSTM Networks','https://colah.github.io/posts/2015-08-Understanding-LSTMs/']],
 quiz:{title:'Quick check, gating',questions:[
   {q:'The LSTM cell state helps because the gradient through it is:',
    options:['Scaled by the forget gate rather than a matrix','Clipped whenever it exceeds a threshold','Multiplied by a learned weight matrix each step','Recomputed from scratch at every timestep'],answer:0,whyWrong:['','Clipping is a separate trick for exploding gradients, applied by the optimiser.','A matrix multiply at every step is exactly what the plain RNN does and what the cell state avoids.','The cell state persists across steps. Recomputing it would destroy the memory.'],
    why:'∂Cₜ/∂Cₜ₋₁ = fₜ. With the gate near 1 the gradient passes through almost unchanged.'},
   {q:'Gates use a sigmoid rather than tanh because:',
    options:['Sigmoid outputs between 0 and 1, like a valve','Sigmoid avoids saturating at its extremes','Sigmoid is cheaper to compute than tanh','Sigmoid has a larger maximum derivative'],answer:0,whyWrong:['','Sigmoid does saturate at both ends. Here that is tolerable, because a gate wants to reach fully open or fully shut.','The cost difference is negligible, and it is not why the choice was made.','Tanh has the larger maximum derivative, 1 against sigmoid\'s 0.25.'],
    why:'A gate needs a fraction to let through. Zero blocks, one passes, and sigmoid produces exactly that range.'},
   {q:'Residual connections in very deep networks share which idea with LSTM gates?',
    options:['Randomly dropping units during training','Reducing the total parameter count','Normalizing activations between layers','Creating a near-identity path for the gradient'],answer:3,whyWrong:['That is dropout, a regularisation technique with a different purpose.','Both add parameters rather than removing them, and gates add several matrices.','Normalisation is what batch and layer norm do, and it is a separate mechanism.',''],
    why:'y = F(x) + x has derivative 1 through the addition, so gradient always has a clear route back.'}
 ]}},

{id:'nn12',
 title:'Attention: the idea that replaced memory',
 body:`
<div class="ground"><span class="gTag">🎯 Stop summarizing the past, and look it up instead</span>
<p>Both the RNN and the LSTM force everything from the past through one fixed-size state. For a
long document that is a bottleneck no amount of gating removes. Attention throws the bottleneck
out: keep every past position available, and at each step decide which ones to read.</p></div>

<h3>The plain English version</h3>
<p>You are translating a sentence and about to produce the next word. Rather than relying on a
summary of the sentence, you glance back at the original and focus on the two or three words
that matter for the word you are about to write. Different output word, different words to look
at.</p>
<p>That is attention. For each position, compute a score against every other position saying how
relevant it is, turn those scores into weights that sum to one, and take a weighted average of
what is stored there. Nothing is summarized away, and everything stays reachable.</p>

<h3>Queries, keys and values</h3>
<p>The vocabulary is borrowed from databases and it is a good analogy. A <b>query</b> is what
this position is looking for. A <b>key</b> is what each position advertises about itself. A
<b>value</b> is what you actually get back if you attend to it. Match the query against every
key to get scores, then take a weighted blend of the values.</p>
<p>Unlike a database, the match is soft: you do not retrieve one row, you retrieve a mixture
weighted by relevance. Each of <code>Q</code>, <code>K</code> and <code>V</code> is produced by
multiplying the inputs by a learned matrix, so the network learns what to advertise and what to
look for.</p>
<div class="mathblock">Attention(Q, K, V) = softmax( QK<sup>T</sup> / &radic;d<sub>k</sub> ) V</div>
<p>Read it in pieces. <code>QK<sup>T</sup></code> is every query dotted with every key, giving a
grid of relevance scores. Dividing by <code>&radic;d<sub>k</sub></code> keeps them from growing
with dimension. Softmax turns each row into weights summing to 1. Multiplying by <code>V</code>
takes the weighted average.</p>
<div class="hardidea">🧠 <b>Why divide by the square root of the dimension.</b> If the entries of
<code>q</code> and <code>k</code> are independent with mean 0 and variance 1, then
<code>q&middot;k</code> is a sum of <code>d<sub>k</sub></code> such products, so it has variance
<code>d<sub>k</sub></code> and typical size <code>&radic;d<sub>k</sub></code>. With
<code>d<sub>k</sub> = 64</code> the scores are typically around 8, and after exponentiating,
softmax becomes nearly one-hot. A nearly one-hot softmax has almost no gradient, so learning
stalls. Dividing by <code>&radic;d<sub>k</sub></code> restores unit variance and keeps the
softmax in a range where it can still learn. It is one symbol, and without it training does not
work.</div>
<div class="worked"><b>Worked, three positions.</b> Suppose one query gives raw scores
<code>[4.0, 1.0, 0.5]</code> against three keys, with <code>d<sub>k</sub> = 4</code> so we
divide by 2: <code>[2.0, 0.5, 0.25]</code>. Exponentiate: <code>[7.39, 1.65, 1.28]</code>, total
<code>10.32</code>. Weights: <code>[0.72, 0.16, 0.12]</code>. The output is
<code>0.72v<sub>1</sub> + 0.16v<sub>2</sub> + 0.12v<sub>3</sub></code>. Mostly the first value,
with a little of the others mixed in.</div>

<h3>Self-attention, and multiple heads</h3>
<p>When the queries, keys and values all come from the same sequence, it is called
<b>self-attention</b>: every word looks at every other word in its own sentence. That is how a
model resolves what "it" refers to, by letting the position holding "it" attend strongly to the
noun it stands for.</p>
<p><b>Multi-head attention</b> runs several of these in parallel with different learned
projections, then concatenates the results. One head may track grammatical subject, another
nearby modifiers, another long-range reference. Averaging everything into one attention pattern
would blur those apart.</p>

<h3>What it costs</h3>
<p>Every position attends to every position, so the score grid is <code>n &times; n</code> for a
sequence of length <code>n</code>. Compute and memory grow as <b>O(n&sup2;)</b>. Doubling the
context length quadruples the cost. This is the central engineering constraint of modern
language models, and a large research literature exists purely to soften it.</p>
`,
 docs:[['Vaswani et al., Attention Is All You Need (2017)','https://arxiv.org/abs/1706.03762'],['The Illustrated Transformer','https://jalammar.github.io/illustrated-transformer/']],
 quiz:{title:'Quick check, attention',questions:[
   {q:'Attention removes which limitation of an RNN?',
    options:['Forcing the past through one fixed-size state','Needing gradients to flow backward in time','Requiring the same weights at every timestep','Being unable to process variable-length input'],answer:0,whyWrong:['','Attention still trains by backpropagation. The gradients simply travel a shorter path.','A transformer also reuses the same weights at every position, which is what makes it a sequence model.','RNNs handle variable length well. It is long-range dependence they struggle with.'],
    why:'Every position stays directly reachable, so nothing has to be compressed into a single summary vector.'},
   {q:'Scores are divided by the square root of the key dimension because otherwise:',
    options:['Negative scores would dominate the average','Softmax saturates and the gradient disappears','The values would be scaled inconsistently','The weights would fail to sum to exactly one'],answer:1,whyWrong:['Softmax handles negative scores without difficulty. Scale is the problem, not sign.','','The values are untouched. The division applies to the scores, before softmax.','Softmax always sums to one, at any scale. What changes is how sharply peaked it is.'],
    why:'Dot products grow like √d, pushing softmax nearly one-hot, where it has almost no gradient left.'},
   {q:'Self-attention costs O(n²) because:',
    options:['Each layer is applied twice per position','Softmax must be computed over all layers','The keys and values are stored twice over','Every position is compared against every position'],answer:3,whyWrong:['Each layer is applied once. Depth multiplies the cost linearly, not quadratically.','Softmax runs over positions within a layer, not across layers.','Keys and values are stored once each. The quadratic term is the score matrix.',''],
    why:'The score grid is n×n. Doubling the context quadruples the compute and the memory.'}
 ]}},

{id:'nn13',
 title:'Transformers: what actually happens inside one',
 body:`
<div class="ground"><span class="gTag">🎯 Attention, plus the three unglamorous parts that make it trainable</span>
<p>The 2017 paper was titled "Attention Is All You Need," which is catchy and slightly
misleading. Attention is the new part. A transformer is attention plus positional information,
plus a feed-forward network, plus normalization and residuals, and it does not work without
them.</p></div>

<h3>Why attention alone is not enough</h3>
<p>Attention is <b>permutation invariant</b>. It computes a weighted average, and averages do
not care about order. Shuffle the words of a sentence and pure self-attention produces exactly
the same set of outputs, just reordered. For language that is fatal, since "the dog bit the man"
and "the man bit the dog" contain identical words.</p>
<p>So position has to be injected explicitly. <b>Positional encodings</b> add a
position-dependent vector to each input embedding. The original paper used fixed sine and cosine
waves of different frequencies, chosen so that relative offsets correspond to a linear
transformation; modern models often learn the encodings instead, or use rotary encodings which
apply a rotation whose angle depends on position.</p>
<div class="mathblock">PE(pos, 2i)   = sin( pos / 10000<sup>2i/d</sup> )
PE(pos, 2i+1) = cos( pos / 10000<sup>2i/d</sup> )</div>

<h3>One block, in order</h3>
<div class="mathblock">x &larr; x + MultiHeadAttention( LayerNorm(x) )
x &larr; x + FeedForward( LayerNorm(x) )

where FeedForward(x) = W<sub>2</sub> &middot; ReLU( W<sub>1</sub>x + b<sub>1</sub> ) + b<sub>2</sub></div>
<p>Two sublayers, each wrapped in a residual connection and a normalization. Stack this block
<code>N</code> times, 6 in the original paper, 96 or more in large modern models.</p>
<p><b>The residuals</b> are the same identity-path idea from the LSTM lesson, and they are what
allow the stack to be deep at all. <b>Layer normalization</b> rescales each position's vector to
zero mean and unit variance, which keeps activations in a workable range as depth grows.</p>
<p><b>The feed-forward network</b> is easy to overlook and is where most of the parameters live.
It is applied to each position independently, and it is usually four times wider than the model
dimension. Attention moves information between positions; the feed-forward layer does the
processing at each one. Both are needed, and roughly two thirds of a transformer's parameters
sit in these layers rather than in attention.</p>
<div class="worked"><b>Where the parameters actually go.</b> With
<code>d = 512</code> and a feed-forward width of 2048, one block holds about
<code>4d&sup2; = 1.05M</code> parameters in attention (the Q, K, V and output projections) and
about <code>2 &times; d &times; 4d = 2.1M</code> in the feed-forward network. Two thirds of the
block is the part nobody puts in the diagram.</div>

<h3>Masking, and why it makes a language model</h3>
<p>To use a transformer for generation, you prevent each position from attending to positions
after it, by setting those scores to negative infinity before the softmax so their weights become
zero. This is <b>causal masking</b>. Now predicting the next token cannot cheat by looking at
it, and the model can be trained on any text at all, with the text itself supplying the labels.</p>
<div class="hardidea">🧠 <b>Why this architecture took over, in one sentence.</b> An RNN must
process step 1 before step 2, so training cannot be parallelized along the sequence. A
transformer computes all positions simultaneously, because attention is a single matrix
multiplication over the whole sequence. That turned sequence modeling into exactly the operation
GPUs are fastest at, and made it economic to train on far more text. The architecture did not
just work better, it removed the reason you could not spend more compute.</div>
`,
 docs:[['Attention Is All You Need (2017)','https://arxiv.org/abs/1706.03762'],['The Annotated Transformer, line by line in code','https://nlp.seas.harvard.edu/annotated-transformer/']],
 quiz:{title:'Quick check, transformers',questions:[
   {q:'Positional encodings are needed because attention:',
    options:['Cannot handle sequences longer than training','Produces the same result regardless of order','Requires inputs to have unit variance','Loses precision over very long sequences'],answer:1,whyWrong:['Length generalisation is a real limitation, and it is a consequence of how positions are encoded rather than the reason they exist.','','Variance is handled by the normalisation layers. Position is a separate matter.','Nothing loses precision. Attention is simply blind to order without help.'],
    why:'A weighted average is permutation invariant, so word order carries no information without an explicit signal.'},
   {q:'Most of a transformer block’s parameters live in:',
    options:['The position-wise feed-forward network','The layer normalization parameters','The positional encoding table','The multi-head attention projections'],answer:0,whyWrong:['','Layer norm holds two parameters per feature, which is negligible.','The positional table is one row per position, and it is often not learned at all.','The attention projections are large, and the feed-forward network is typically about twice their size.'],
    why:'Roughly two thirds. The feed-forward layer is typically four times the model width and is easy to overlook.'},
   {q:'Causal masking works by:',
    options:['Removing later tokens from the input entirely','Setting future scores to negative infinity','Reversing the order of the input sequence','Training on shuffled copies of the text'],answer:1,whyWrong:['The tokens stay in the input. Removing them would break the parallel computation the architecture exists for.','','Reversing the sequence changes what is predicted, not what may be attended to.','Shuffling would destroy the language, and it has nothing to do with causality.'],
    why:'After softmax those weights become zero, so a position cannot attend to anything that comes after it.'}
 ]}},

{id:'nn14',
 title:'What neural networks still cannot do',
 body:`
<div class="ground"><span class="gTag">🎯 The lesson that keeps the rest of the stream honest</span>
<p>Every technique here works, and none of them makes the limitations below go away. Knowing
what a network cannot do is what separates using one well from being surprised by it in
production.</p></div>

<h3>They interpolate confidently and extrapolate badly</h3>
<p>A network learns a function that fits the region its training data covered. Ask about a point
inside that region and it does well. Ask about a point outside it and the answer is arbitrary,
because nothing constrained the function there.</p>
<p>The dangerous part is that <b>nothing in the output says which case you are in</b>. A
classifier trained on daytime photographs will return a confident answer for a night-time one.
Softmax always produces a probability, and that probability is not a measure of whether the
input resembled anything in training.</p>

<h3>They are not calibrated, and they are easy to fool</h3>
<p>Modern networks are systematically <b>overconfident</b>: a set of predictions made at 99
percent confidence is typically right rather less than 99 percent of the time. Techniques like
temperature scaling help and do not fully fix it.</p>
<p>Worse, <b>adversarial examples</b> exist. Take an image the network classifies correctly, add
a carefully chosen perturbation too small for a person to see, and the classification flips to
something arbitrary with high confidence. This is not a bug in one model, it is a property of
high-dimensional decision boundaries learned this way, and a decade of work has not eliminated
it.</p>

<h3>Correlation is what they learn, and shortcuts are what they take</h3>
<p>A network minimizes loss. If a shortcut predicts the label, it will use the shortcut, and it
has no way to prefer the causal explanation. Classifiers have been found keying on hospital
watermarks rather than pathology, on background texture rather than the animal, on scanner
artifacts rather than tissue. Each of those achieved excellent validation accuracy, because the
shortcut was present in the validation set too.</p>
<div class="hardidea">🧠 <b>Why your validation set will not catch this.</b> The validation split
is drawn from the same collection process as the training data, so any bias in that process
appears in both. Shortcut learning is invisible to the metric you are watching, by construction.
Catching it needs a distribution shift, data from another hospital, another camera, another
year, and that is expensive, which is why so many published models fail on deployment.</div>

<h3>Data hunger, and what it costs</h3>
<p>People generalize from a handful of examples. Networks generally need many thousands per
class. Transfer learning softens this by starting from a model trained on something large, but
the requirement has not gone away, it has been paid once by somebody else.</p>

<h3>They cannot tell you why</h3>
<p>A model with a hundred million weights has no explanation to give. Interpretability methods
exist, saliency maps, probing classifiers, attention visualization, and they give hints rather
than accounts. Several are unreliable enough that a saliency map can look sensible for a model
that is provably keying on something else. In domains where a decision must be justified, this
is not a research inconvenience, it is a reason not to use one.</p>

<h3>How to use one anyway</h3>
<p>Know the region your training data covers, and treat anything outside it as unanswered rather
than answered. Test on data collected differently from your training data, not just held out
from it. Treat confidence scores as scores and not as probabilities unless you have calibrated
them. And keep asking what a shortcut would look like if the model had found one, because the
metric will not raise its hand.</p>
<div class="demystify"><b>Where this leaves you.</b> Everything in this stream is a way of
building a function that fits data, and the field's remarkable results come from doing that at
scale with the right architectural priors. That is a genuinely powerful thing, and it is
narrower than the language around it suggests. Holding both of those at once is the useful
position.</div>
`,
 docs:[['Geirhos et al., Shortcut Learning in Deep Neural Networks','https://arxiv.org/abs/2004.07780'],['Guo et al., On Calibration of Modern Neural Networks','https://arxiv.org/abs/1706.04599']],
 quiz:{title:'Quick check, limits',questions:[
   {q:'A network given an input unlike anything in training will:',
    options:['Report low confidence for that prediction','Refuse to produce an output at all','Fall back to the most common class seen','Return a confident answer with no warning'],answer:3,whyWrong:['Confidence is usually high rather than low, which is the failure being described.','There is no refusal mechanism. A forward pass always produces numbers.','There is no fallback. The network computes whatever its weights compute.',''],
    why:'Nothing in the output distinguishes interpolation from extrapolation. Softmax always returns a probability.'},
   {q:'Shortcut learning usually escapes detection because:',
    options:['Training loss stays higher than expected','The shortcut disappears after enough epochs','It only appears in very large models','The validation set shares the same bias'],answer:3,whyWrong:['Training loss looks excellent, which is part of why the problem hides.','The shortcut persists for as long as it works. Nothing removes it.','Small models take shortcuts too, often more readily.',''],
    why:'Validation comes from the same collection process, so the spurious cue is present there too.'},
   {q:'Modern classifiers are typically:',
    options:['Underconfident on classes seen rarely','Accurate only on balanced datasets','Overconfident relative to their real accuracy','Well calibrated once softmax is applied'],answer:2,whyWrong:['The bias runs the other way. Rare classes get confident predictions as well.','They are accurate on imbalanced data too, and calibration is a separate property from accuracy.','','Softmax produces numbers that look like probabilities without being calibrated ones. Temperature scaling exists for exactly this.'],
    why:'Predictions made at 99 percent confidence are right noticeably less than 99 percent of the time.'}
 ]}}
]});

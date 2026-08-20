STREAMS.push({icon:'🤖',track:'ML & AI Track',title:'Classic Machine Learning: Your First Models',blurb:'The payoff. Everything the foundations built, vectors, gradients, probability, now becomes real models that learn from data. Built by hand, then the one-line library version.',requires:'tk4',requiresName:'the ML Toolkit (pandas, scikit-learn, plotting)',lessons:[
{id:'mlwhat',
 title:'What machine learning actually is: the fit → predict → evaluate loop',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>You met the words in Orientation; now we make them real. <b>Machine learning is learning a
function from examples.</b> Instead of you writing rules ("if the email says FREE MONEY, it is
spam"), you show the computer many labelled examples and it <i>finds the rule itself</i> by
tuning knobs to reduce error. Every classic model, regression, classification, trees, is a
variation on one loop: <b>fit, predict, evaluate.</b></p></div>

<h3>The three words made concrete</h3>
<p><b>fit</b> (a.k.a. train): show the model the <i>training data</i>, features
<code>X</code> and their true labels <code>y</code>, and let it tune its knobs to match.
<b>predict</b>: give the trained model new features and it outputs its guess. <b>evaluate</b>:
measure how wrong those guesses are (the error/loss), ideally on data it has <i>never seen</i>,
so you know it will work in the real world, not just memorize.</p>
<div class="codeSample">model.fit(X_train, y_train)     # learn from labelled examples
preds = model.predict(X_test)   # guess on new data
error = mse(preds, y_test)      # how wrong were the guesses?</div>
<p>That <code>fit/predict</code> shape is the exact scikit-learn interface you met, and it is
the same whether the model is a line, a tree, or a neural network. Learn the loop once, use it
everywhere.</p>

<h3>Weights: the knobs, grounded (as promised)</h3>
<p>A model is a function with adjustable numbers called <b>weights</b> (or parameters). For a
straight-line model <code>prediction = w · feature + b</code>, the weight <code>w</code> is
<b>how much that feature counts</b> toward the prediction, and <code>b</code> (the <b>bias</b>
or intercept) is the baseline. Reading a weight: its <b>sign</b> says whether more of the
feature pushes the prediction up or down, its <b>size</b> says how strongly. "+18k per bedroom,
−900 per year of age", those numbers <i>are</i> the weights. Training is nothing but searching
for the weights that make the error small. ("Weight," "parameter," and "coefficient" are three
words for the same thing, <code>model.coef_</code> in scikit-learn.)</p>

<h3>Regression vs classification</h3>
<p>Two flavours cover most of classic ML: <b>regression</b> predicts a <i>number</i> (house
price, temperature), the demystified name just means "predict a continuous value"; and
<b>classification</b> predicts a <i>category</i> (spam / not-spam, cat / dog). Same fit/predict
loop; different kind of answer, and a different way to measure error (squared error for numbers,
accuracy for categories). You will build one of each in this stream.</p>

<div class="demystify"><b>Demystify "a model":</b> not a mind, not magic, a <b>function with
tunable numbers</b>, plus a procedure for tuning them to fit data. When you hear "we trained a
model," picture: we searched for the weights that made the error small. Everything else is
which function and which search.</div>`,
 docs:[['scikit-learn (an intro to machine learning)','https://scikit-learn.org/stable/tutorial/basic/tutorial.html']],
 quiz:{title:'Quick check',questions:[
   {q:'The core loop of a classic ML model is:',
    options:['fit on labelled examples, predict on new data, evaluate the error','Compile the model, link its dependencies, then execute it on the data','Guess at random, and keep guessing until the answers happen to be right','Download a model, install its weights, and run it on your own data'],answer:0,whyWrong:['','That is the build cycle for a compiled program. Nothing in it learns from data.','Guessing is where an untrained model starts. The loop is what moves it away from that.','That is how you obtain a tool, not how a model learns.'],
    why:'Fit tunes the weights on training data; predict applies them to new data; evaluate measures how wrong, ideally on unseen data.'},
   {q:'In prediction = w · feature + b, the weight w is:',
    options:['The number of features the model was given to work with','The error between the prediction and the true value','How much that feature counts toward the prediction','Always 1, so that every feature contributes on equal terms'],answer:2,whyWrong:['The feature count is a property of your data. Each feature gets its own weight.','The error is the gap between the prediction and the truth. The weight is what you adjust to shrink it.','','A weight fixed at 1 would leave the model unable to learn anything.'],
    why:'Weights (= parameters = coefficients) are the knobs training tunes. "+18k per bedroom" is a weight. b is the baseline (bias/intercept).'},
   {q:'Predicting a house PRICE is regression; predicting SPAM/not-spam is:',
    options:['Clustering, since the messages are grouped by similarity','Not machine learning, since the answer is a yes or a no','Classification, since the answer is a category','Also regression, since the model outputs a spam score'],answer:2,whyWrong:['Clustering groups unlabelled data. Here you have labels saying which messages were spam.','It is a textbook supervised problem, and one of the first ever solved commercially.','','Regression predicts a number. Spam or not is a category with no ordering and no arithmetic.'],
    why:'Regression predicts a continuous number; classification predicts a category. Same fit/predict loop, different answer type and error measure.'}
 ]},
 exs:[{title:'Be the model: predict, then measure the error',
   lang:'python',
   prompt:`Four houses, feature = size, label = price: <code>sizes = [1, 2, 3, 4]</code>,
   <code>prices = [3, 5, 7, 9]</code>. A linear model predicts <code>price = w*size + b</code>.
   <ol>
   <li>With <code>w = 2, b = 1</code>, compute <code>preds</code> for every size (a list),</li>
   <li><code>mse</code>, the mean squared error between <code>preds</code> and <code>prices</code> (this model is perfect, so 0.0),</li>
   <li>a <b>baseline</b> model that ignores size and always predicts the mean price: <code>base_pred</code> = mean(prices), and <code>base_mse</code>, the MSE of always guessing that (should be 5.0),</li>
   <li><code>beats_baseline</code>, <code>True</code> if the linear model's mse is lower than the baseline's (a good model beats "just guess the average").</li>
   </ol>`,
   starter:`sizes = [1, 2, 3, 4]
prices = [3, 5, 7, 9]
w, b = 2, 1

# 1) predictions of the linear model
preds =

# 2) mean squared error vs the true prices
mse =

# 3) baseline: always predict the average price
base_pred = sum(prices) / len(prices)
base_mse =

# 4) does the model beat the baseline?
beats_baseline =

print(preds, mse, base_pred, base_mse, beats_baseline)
`,
   solution:`sizes = [1, 2, 3, 4]
prices = [3, 5, 7, 9]
w, b = 2, 1

# 1) predictions of the linear model
preds = [w * s + b for s in sizes]

# 2) mean squared error vs the true prices
mse = sum((preds[i] - prices[i]) ** 2 for i in range(len(prices))) / len(prices)

# 3) baseline: always predict the average price
base_pred = sum(prices) / len(prices)
base_mse = sum((base_pred - prices[i]) ** 2 for i in range(len(prices))) / len(prices)

# 4) does the model beat the baseline?
beats_baseline = mse < base_mse

print(preds, mse, base_pred, base_mse, beats_baseline)
`,
   tests:[
     {d:'the model predicts [3, 5, 7, 9], exactly right here',expr:'preds == [3, 5, 7, 9]'},
     {d:'its MSE is 0.0 (a perfect fit on this data)',expr:'abs(mse) < 1e-9'},
     {d:'the baseline always guesses the mean price 6.0',expr:'abs(base_pred - 6.0) < 1e-9'},
     {d:'the baseline MSE is 5.0, worse than the model',expr:'abs(base_mse - 5.0) < 1e-9'},
     {d:'the model beats the baseline',expr:'beats_baseline == True'}
   ],
   hints:[
     'preds = [w * s + b for s in sizes], apply the line to every size.',
     'MSE = average of (pred - actual) squared: sum((preds[i]-prices[i])**2 ...) / len.',
     'The baseline predicts the same mean for everyone; a real model uses the feature and does better.'
   ]}],
 homework:{problems:[
   {q:`<b>1.</b> A model predicts salary from years of experience as <code>salary = 5·years + 30</code> (in thousands). What does the weight 5 mean, and what does the 30 mean? Predict the salary for 4 years.`,
    solution:`The <b>weight 5</b> means each extra year of experience adds <b>5k</b> to the predicted salary (positive → more experience, higher pay; size 5 → the strength). The <b>30</b> is the <b>bias/baseline</b>: the predicted salary at 0 years (a starting point). Prediction at 4 years: <code>5·4 + 30 = 50</code> → <b>50k</b>.`},
   {q:`<b>2. (Concept)</b> Why do we evaluate a model on data it has never seen (a test set) instead of the data it trained on?`,
    solution:`Because doing well on the training data is easy and misleading, a model can <b>memorize</b> those exact examples without learning the real pattern (overfitting), then fail on anything new. The whole point of a model is to work on <b>future, unseen</b> data, so we hold out a test set to get an honest estimate of that. Low training error but high test error is the classic warning sign.`}
 ]}},

{id:'mllinreg',
 title:'Linear regression: teaching a line to fit data (gradient descent from scratch)',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p><b>Linear regression</b> is the "hello world" of ML: fit the best straight line through your
data, then use it to predict. It is where <i>all</i> the foundations finally click together:
the line is a dot product (linear algebra), the error is MSE (probability/loss), and finding
the best weights is gradient descent (calculus). You are about to train a real model with
nothing but what you already know.</p></div>

<h3>The model, the loss, the learning</h3>
<p><b>Model:</b> <code>prediction = w · x + b</code>, a line with two knobs, the slope
<code>w</code> and intercept <code>b</code>. <b>Loss:</b> the mean squared error, how wrong the
line is on average. <b>Learning:</b> gradient descent, nudge <code>w</code> and <code>b</code>
downhill on the loss until it stops improving. The gradients (the slopes of the MSE with
respect to each knob) are, by the calculus you did:</p>
<div class="mathblock">error_i = (w·xᵢ + b) − yᵢ            (how wrong on example i)

∂Loss/∂w = (2/n) · Σ errorᵢ · xᵢ      (nudge for the slope)
∂Loss/∂b = (2/n) · Σ errorᵢ           (nudge for the intercept)</div>
<p>Then the update is the gradient-descent step you already wrote: <code>w -= lr · ∂Loss/∂w</code>
and <code>b -= lr · ∂Loss/∂b</code>. Repeat, and the line walks toward the data.</p>

<div class="worked"><b>✍️ One step by hand.</b> Data <code>x=[1,2], y=[3,5]</code>, start
<code>w=0, b=0</code>, so both predictions are 0 and errors are <code>[0−3, 0−5] = [−3, −5]</code>.
<div class="mathblock">∂Loss/∂w = (2/2)·((−3)(1) + (−5)(2)) = (−3 − 10) = −13
∂Loss/∂b = (2/2)·((−3) + (−5))       = −8</div>
With <code>lr = 0.1</code>: <code>w ← 0 − 0.1·(−13) = 1.3</code>, <code>b ← 0 − 0.1·(−8) = 0.8</code>.
Both knobs moved up (the line was too low). Repeat a few hundred times and it converges to the
best-fit line.</div>

<div class="demystify"><b>Demystify "regression":</b> the confusing name is Galton's historical
accident ("regression to the mean"), today it simply means <b>predict a number</b>. And the
sklearn one-liner <code>LinearRegression().fit(X, y)</code> does exactly the training loop you
are about to write (via the closed-form normal equations from the linear-algebra stream); the
from-scratch version is how you <i>understand</i> what that one line does.</p></div>`,
 docs:[['scikit-learn (LinearRegression)','https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html']],
 quiz:{title:'Quick check',questions:[
   {q:'Linear regression finds its weights by:',
    options:['Guessing values at random and keeping whichever happens to fit best','Gradient descent, or the closed-form normal equations','Enumerating every possible line and scoring each of them in turn','Sorting the data so the best-fitting line can be read off directly'],answer:1,whyWrong:['Random guessing never converges. The whole method is that each step is informed by the slope.','','There are infinitely many lines. You cannot enumerate them.','Sorting rearranges the data and leaves the weights untouched.'],
    why:'The line has two knobs; training walks them down the loss surface (gradient descent) or solves the normal equations directly.'},
   {q:'The gradient ∂Loss/∂w for MSE is (2/n)·Σ(errorᵢ·xᵢ). What is errorᵢ?',
    options:['The learning rate, which scales the size of each step','The true label yᵢ, the value the model was aiming for','The prediction minus the actual, (w·xᵢ + b) − yᵢ','Always zero, once the model has been fitted properly'],answer:2,whyWrong:['The learning rate is a setting you choose. The error is measured from the data.','The true label is one half of the error. The error is what is left after subtracting the prediction from it.','','If the error were always zero there would be nothing left to learn.'],
    why:'Error is prediction − actual. Multiplying it by xᵢ and averaging gives the slope of the loss in the w-direction, the nudge.'},
   {q:'If after training the loss stops decreasing, it means:',
    options:['The weights have settled near the bottom of the loss bowl','There is no data left for the model to learn anything further from','The training loop crashed and stopped updating the loss','The learning rate has decayed to zero and no steps are being taken'],answer:0,whyWrong:['','With no data there would be no loss to compute in the first place.','A crash stops the program. A flat loss curve is the program working and finishing its job.','A learning rate of zero would leave the loss flat from step one, not after it had come down.'],
    why:'A flat loss means the gradient is ~0, you are at the minimum, the best line the model can draw.'}
 ]},
 exs:[{title:'Train a linear regression by gradient descent',
   lang:'python',
   prompt:`Data (true line is <code>y = 2x + 1</code>): <code>x = [1, 2, 3, 4]</code>,
   <code>y = [3, 5, 7, 9]</code>. Start <code>w = 0.0, b = 0.0</code>, learning rate
   <code>lr = 0.01</code>, and run <b>2000</b> steps of gradient descent:
   <ol>
   <li>each step: compute <code>preds</code>, the <code>errors</code> (pred − y), then the two gradients <code>dw</code> and <code>db</code> from the formulas, and update w and b,</li>
   <li>after training, <code>w</code> ≈ 2 and <code>b</code> ≈ 1,</li>
   <li><code>pred_5</code>, the trained model's prediction at x = 5 (≈ 11),</li>
   <li><code>final_mse</code>, the mean squared error after training (≈ 0).</li>
   </ol>`,
   starter:`x = [1.0, 2.0, 3.0, 4.0]
y = [3.0, 5.0, 7.0, 9.0]
n = len(x)
w, b, lr = 0.0, 0.0, 0.01

for step in range(2000):
    preds = [w * x[i] + b for i in range(n)]
    errors = [preds[i] - y[i] for i in range(n)]
    dw = (2 / n) * sum(errors[i] * x[i] for i in range(n))
    db = (2 / n) * sum(errors[i] for i in range(n))
    # update the two knobs against their gradients
    w =
    b =

pred_5 =
final_mse = sum((w * x[i] + b - y[i]) ** 2 for i in range(n)) / n

print(round(w, 3), round(b, 3), round(pred_5, 3), round(final_mse, 6))
`,
   solution:`x = [1.0, 2.0, 3.0, 4.0]
y = [3.0, 5.0, 7.0, 9.0]
n = len(x)
w, b, lr = 0.0, 0.0, 0.01

for step in range(2000):
    preds = [w * x[i] + b for i in range(n)]
    errors = [preds[i] - y[i] for i in range(n)]
    dw = (2 / n) * sum(errors[i] * x[i] for i in range(n))
    db = (2 / n) * sum(errors[i] for i in range(n))
    # update the two knobs against their gradients
    w = w - lr * dw
    b = b - lr * db

pred_5 = w * 5 + b
final_mse = sum((w * x[i] + b - y[i]) ** 2 for i in range(n)) / n

print(round(w, 3), round(b, 3), round(pred_5, 3), round(final_mse, 6))
`,
   tests:[
     {d:'the learned slope w is ≈ 2',expr:'abs(w - 2.0) < 0.05'},
     {d:'the learned intercept b is ≈ 1',expr:'abs(b - 1.0) < 0.1'},
     {d:'the trained model predicts ≈ 11 at x = 5',expr:'abs(pred_5 - 11.0) < 0.1'},
     {d:'the final MSE is tiny, the line fits',expr:'final_mse < 0.01'}
   ],
   hints:[
     'The update is the gradient-descent step from calculus: w = w - lr * dw, and b = b - lr * db.',
     'Everything else is provided, the loop already computes preds, errors, and the two gradients.',
     'After 2000 small steps the line converges to y = 2x + 1, so pred_5 = 2·5 + 1 = 11.'
   ]}],
 homework:{problems:[
   {q:`<b>1.</b> Data <code>x=[1,2], y=[3,5]</code>, current <code>w=1, b=0</code>. Compute the predictions, the errors (pred − y), and the gradient <code>∂Loss/∂w = (2/n)·Σ(errorᵢ·xᵢ)</code> by hand.`,
    solution:`Predictions: <code>w·x + b = [1·1+0, 1·2+0] = [1, 2]</code>. Errors (pred − y): <code>[1−3, 2−5] = [−2, −3]</code>.<br>
    <code>∂Loss/∂w = (2/2)·((−2)(1) + (−3)(2)) = (−2 − 6) = <b>−8</b></code>. It is negative, so gradient descent will <b>increase</b> w (the line is too shallow/low), moving it toward the data, exactly what you want.`},
   {q:`<b>2. (Concept)</b> The learning rate is 0.01 and training took 2000 steps. What happens if you make the learning rate far too big (say 5.0)?`,
    solution:`With too large a learning rate, each step <b>overshoots</b> the bottom of the loss bowl and lands farther up the other side. The weights bounce around and the loss <b>grows instead of shrinking</b> (it diverges), you will see w and b explode to huge or NaN values. The rate must be small enough that each step actually descends. Too small, though, and it converges very slowly, choosing it is a real practical skill.`}
 ]}},

{id:'mlclass',
 title:'Classification with logistic regression: turning a score into a decision',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>Now predict a <b>category</b>, not a number: is this email spam? <b>Logistic regression</b>
takes the same linear score <code>w·x + b</code> as before, then squashes it through the
<b>sigmoid</b> into a probability between 0 and 1, "0.93 spam", and decides by a threshold
(usually 0.5). It is the workhorse first classifier, and the direct ancestor of a neural
network's output layer.</p></div>

<h3>Score → probability → decision</h3>
<p><b>Step 1, score:</b> <code>z = w·x + b</code>, exactly the linear model. <b>Step 2,
probability:</b> <code>p = sigmoid(z) = 1 / (1 + e^(−z))</code>, the S-curve (from the
functions lesson) maps any score into (0, 1). A big positive score → near 1; big negative →
near 0; zero → exactly 0.5. <b>Step 3, decision:</b> predict class 1 (spam) if
<code>p ≥ 0.5</code>, else class 0. Because sigmoid(0) = 0.5, the decision flips exactly where
the score <code>z</code> crosses 0, that line is the <b>decision boundary</b>.</p>

<div class="worked"><b>✍️ Worked by hand.</b> One feature: number of spammy words. Weights
<code>w = 1, b = −3</code>, so <code>z = x − 3</code>. An email with 5 spammy words:
<div class="mathblock">z = 5 − 3 = 2
p = 1 / (1 + e^(−2)) = 1 / (1 + 0.135) ≈ 0.88   →  p ≥ 0.5, predict SPAM</div>
An email with 1 spammy word: <code>z = −2</code>, <code>p ≈ 0.12</code> → predict NOT spam. The
boundary sits at <code>x = 3</code> (where <code>z = 0, p = 0.5</code>).</div>

<div class="demystify"><b>Demystify "logistic regression":</b> the name lies twice over, it
does <b>classification</b>, not regression, and there is nothing scary about it: it is linear
regression's score passed through the sigmoid to become a probability. Why not just use a line
for 0/1 labels? Because a line gives −4 or 7.2, nonsense as a probability; the sigmoid keeps
the answer honestly between 0 and 1. (And its loss is cross-entropy, not MSE, the log-loss you
met in the logarithms stream.)</div>`,
 docs:[['scikit-learn (LogisticRegression)','https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html']],
 quiz:{title:'Quick check',questions:[
   {q:'Logistic regression turns the linear score w·x + b into a class by:',
    options:['Passing it through the sigmoid, then thresholding the probability at 0.5','Sorting the scores and splitting them at the halfway point','Rounding the score to the nearest whole number','Taking the absolute value and comparing it against a threshold'],answer:0,whyWrong:['','Sorting the scores says which example is most likely, not whether any of them cross the line.','Rounding a raw score gives an arbitrary integer with no probabilistic meaning.','Absolute value throws away the sign, which is exactly the information that decides the class.'],
    why:'Score → sigmoid → probability → decision. The sigmoid keeps the output a valid probability; 0.5 is the usual cut.'},
   {q:'Despite its name, logistic regression performs:',
    options:['Classification, since it predicts a category rather than a number','Clustering, since it groups similar examples together','Sorting, since it ranks examples by their score','Regression, since it predicts a continuous quantity'],answer:0,whyWrong:['','Clustering has no labels. Logistic regression is trained on them.','Nothing is sorted. It produces a probability per example.','It produces a probability, and the decision it hands you is a category rather than a quantity.'],
    why:'It predicts a category via a probability. The name is a historical quirk; it is a classifier.'},
   {q:'The decision boundary of logistic regression sits where:',
    options:['At x = 0, wherever the input happens to be zero','Where the score z = w·x + b crosses zero, so the probability is 0.5','At the edge of the region the training data covers','At the largest value taken by the strongest feature'],answer:1,whyWrong:['x = 0 is a point in the input space and has nothing to do with where the score crosses zero.','','The boundary is defined by the weights and extends across the whole space, wherever the data happens to stop.','The largest feature value is a property of the data, not of the model.'],
    why:'sigmoid(0) = 0.5, so the class flips exactly where the linear score is zero, that is the boundary.'}
 ]},
 exs:[{title:'Build a spam classifier with logistic regression',
   lang:'python',
   prompt:`One feature = number of spammy words. Weights <code>w = 1.0, b = -3.0</code>, so
   score <code>z = w*x + b</code>. Emails <code>xs = [0, 2, 4, 5]</code> with true labels
   <code>labels = [0, 0, 1, 1]</code> (1 = spam):
   <ol>
   <li>write <code>sigmoid(z)</code> = <code>1 / (1 + math.exp(-z))</code>,</li>
   <li><code>probs</code>, the spam probability for each email,</li>
   <li><code>preds</code>, the class for each: 1 if prob ≥ 0.5 else 0,</li>
   <li><code>accuracy</code>, the fraction of predictions that match the true labels (expect 1.0, all correct here).</li>
   </ol>`,
   starter:`import math

def sigmoid(z):
    pass

xs = [0, 2, 4, 5]
labels = [0, 0, 1, 1]
w, b = 1.0, -3.0

probs = [sigmoid(w * x + b) for x in xs]
preds =
accuracy =

print([round(p, 3) for p in probs], preds, accuracy)
`,
   solution:`import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

xs = [0, 2, 4, 5]
labels = [0, 0, 1, 1]
w, b = 1.0, -3.0

probs = [sigmoid(w * x + b) for x in xs]
preds = [1 if p >= 0.5 else 0 for p in probs]
accuracy = sum(1 for i in range(len(labels)) if preds[i] == labels[i]) / len(labels)

print([round(p, 3) for p in probs], preds, accuracy)
`,
   tests:[
     {d:'sigmoid(0) is 0.5 (the middle of the S-curve)',expr:'abs(sigmoid(0) - 0.5) < 1e-9'},
     {d:'the probabilities rise with more spammy words',expr:'probs[0] < probs[1] < probs[2] < probs[3]'},
     {d:'predictions are [0, 0, 1, 1] (boundary at 3 spammy words)',expr:'preds == [0, 0, 1, 1]'},
     {d:'accuracy is 1.0, every email classified correctly',expr:'abs(accuracy - 1.0) < 1e-9'}
   ],
   hints:[
     'sigmoid: return 1 / (1 + math.exp(-z)).',
     'preds = [1 if p >= 0.5 else 0 for p in probs], threshold each probability.',
     'accuracy = (number of preds matching labels) / total. With z = x - 3, the boundary is x = 3.'
   ]}],
 homework:{problems:[
   {q:`<b>1.</b> With <code>w = 2, b = -6</code>, an email has 4 spammy words. Compute the score z, then the probability with sigmoid, then the decision. (Use e ≈ 2.718; sigmoid(2) ≈ 0.88.)`,
    solution:`Score: <code>z = 2·4 − 6 = 2</code>. Probability: <code>sigmoid(2) = 1/(1+e^(−2)) ≈ 1/(1+0.135) ≈ <b>0.88</b></code>. Since 0.88 ≥ 0.5, predict <b>SPAM</b>. The boundary is where <code>z = 0</code>: <code>2x − 6 = 0 → x = 3</code>, so 4 words (above 3) is spam, as expected.`},
   {q:`<b>2. (Concept)</b> Why squash the linear score through a sigmoid instead of just using the raw score w·x + b to classify?`,
    solution:`The raw linear score can be any number, −4, 7.2, 100, which is meaningless as a probability and makes "how confident?" impossible to read. The <b>sigmoid maps any score into (0, 1)</b>, giving a genuine probability you can threshold and interpret ("88% spam"). It also gives a smooth, differentiable output so the model can be trained by gradient descent, and pairs with the cross-entropy (log) loss to punish confident-but-wrong predictions. A bare line does none of that.`}
 ]}}
,

{id:'mlparadigms',
 title:'Supervised, unsupervised, and the rest of the map',
 body:`
<div class="ground"><span class="gTag">🎯 The first question to ask about any ML problem</span>
<p>Before choosing an algorithm, work out which kind of problem you have. Almost every mistake in
applied machine learning starts with getting this wrong, usually by assuming labels exist when
they do not, or by treating a labeling exercise as a modeling one.</p></div>

<h3>The distinction, in one line</h3>
<p><b>Supervised learning has an answer key. Unsupervised learning does not.</b> That is the
entire difference, and everything else follows from it.</p>
<div class="mathblock">supervised:    data is (x, y) pairs        learn  f: x &rarr; y
unsupervised:  data is x alone            learn  structure in p(x)</div>

<h3>Supervised learning</h3>
<p>You have inputs and the correct outputs, and you want a function mapping one to the other.
Two flavors, distinguished only by what <code>y</code> is.</p>
<p><b>Regression</b> predicts a number: a price, a temperature, a duration. Error is naturally
measured as a distance, so squared error is the default, which (as the probability stream shows)
is a Gaussian noise assumption.</p>
<p><b>Classification</b> predicts a category: spam or not, which of ten digits. Error is
naturally measured by probability assigned to the truth, so cross-entropy is the default.</p>
<div class="worked"><b>The test that settles it.</b> Ask whether the numbers you are predicting
have meaningful arithmetic. Predicting house price: 300k is halfway between 200k and 400k, so
regression. Predicting which of three doctors saw a patient, coded 1, 2, 3: doctor 2 is not
halfway between doctors 1 and 3, so classification. Coding categories as integers and running
regression on them is a common and quiet error.</div>

<h3>Unsupervised learning</h3>
<p>No labels. You are asking what structure exists in the data itself, which means there is no
single right answer and no accuracy to report. That is the hard part, not the algorithms.</p>
<p><b>Clustering</b> groups similar points: k-means, Gaussian mixtures, hierarchical,
DBSCAN. <b>Dimensionality reduction</b> finds a smaller set of coordinates that keeps most of
the information: PCA, t-SNE, UMAP, autoencoders. <b>Density estimation</b> models
<code>p(x)</code> itself, which gives you anomaly detection for free, since an anomaly is a point
in a low-density region. <b>Association</b> finds items that co-occur.</p>
<div class="hardidea">🧠 <b>Why unsupervised results are so easy to over-trust.</b> Run k-means
with k=4 on data with no cluster structure whatsoever and it returns four clusters, confidently,
with tidy boundaries. The algorithm has no way to report that there was nothing there. Every
clustering method partitions whatever you hand it. Validating unsupervised output requires
something outside the algorithm: a downstream task it should improve, a stability check across
resamples, or a human who knows the domain. A silhouette score is a description of the partition,
not evidence that the partition is real.</div>

<h3>The middle ground, which is where most real work sits</h3>
<p><b>Semi-supervised</b>: a few labeled examples and many unlabeled ones. This is the ordinary
situation, because collecting <code>x</code> is cheap and labeling it is not.</p>
<p><b>Self-supervised</b>: invent labels from the data. Hide a word and predict it; mask a patch
of an image and reconstruct it; take two crops of the same photo and require their
representations to agree. Formally supervised, since there is a target, but it costs no
annotation, and it is how essentially every large modern model is pre-trained. This is the single
most consequential idea on this page.</p>
<p><b>Reinforcement learning</b>: no answer key, only a reward that arrives later, often long
after the actions that earned it. Different enough to be its own field.</p>

<h3>Choosing, and the honest order to do it in</h3>
<p>Start from the question, not the method. Do you have labels? If yes and you want a number,
regression; a category, classification. If no, ask whether you want groups, fewer dimensions, or
a notion of "unusual", and pick accordingly. If you have a few labels and lots of raw data, look
for a pre-trained model before you consider training anything from scratch, because
self-supervised pre-training has already paid for most of what you need.</p>
<div class="demystify"><b>A framing that saves time.</b> Supervised learning is interpolation
inside a labeled region. Unsupervised learning is a description of a dataset. Neither is a claim
about cause. If your question is "what will happen if we change X", no algorithm on this page
answers it, and reaching for one is how organizations end up confidently acting on a
correlation.</div>
`,
 quiz:{title:'Quick check, paradigms',questions:[
   {q:'The defining difference between supervised and unsupervised learning is:',
    options:['Whether the dataset is large or small','Whether the model is linear or nonlinear','Whether the training data includes target labels','Whether the data is numeric or categorical'],answer:2,whyWrong:['Size affects how well either one works. It does not decide which one you are doing.','Both supervised and unsupervised methods come in linear and nonlinear forms.','','Both handle numeric and categorical data. The distinction is about targets, not feature types.'],
    why:'Supervised has an answer key. Everything else about the two follows from that one fact.'},
   {q:'Self-supervised learning is best described as:',
    options:['Reinforcement learning with a delayed reward','Clustering applied before a supervised model runs','Supervised learning on labels derived from the data','Training without any objective function at all'],answer:2,whyWrong:['There is no reward and no environment. The labels come from the data itself.','That is a preprocessing pipeline, and the labels would still have to come from somewhere.','','There is very much an objective. Predicting the hidden word is the objective.'],
    why:'Mask a word and predict it. There is a target, so it is supervised, but nobody annotated anything.'},
   {q:'Running k-means on data with no real cluster structure will:',
    options:['Return a single cluster containing everything','Raise an error about insufficient separation','Return k clusters and report no problem','Fail to converge within the iteration limit'],answer:2,whyWrong:['It returns exactly the k you asked for, split however the geometry allows.','There is no such check. The algorithm has no notion of whether the structure is real.','','It converges reliably, and converging is not the same as finding something meaningful.'],
    why:'Clustering partitions whatever it is given. Validation has to come from outside the algorithm.'}
 ]}},

{id:'mlsmall',
 title:'Working with small datasets, and how to know if a model is any good',
 body:`
<div class="ground"><span class="gTag">🎯 The situation most people are actually in</span>
<p>Papers use a million examples. Most real problems have a few hundred rows and no budget for
more. Small data is not a lesser version of the same task, it changes which methods are
appropriate and how you are allowed to measure success.</p></div>

<h3>Why small data is specifically a variance problem</h3>
<p>From the bias-variance lesson: expected error is
<code>bias&sup2; + variance + noise</code>. With few rows the fitted model swings substantially
depending on which rows you happened to get, so <b>variance dominates</b>. That single fact
determines the entire strategy: with small data you should be willing to accept extra bias to buy
a reduction in variance.</p>
<p>It also explains something people find counterintuitive: on a few hundred rows of tabular
data, logistic regression or gradient-boosted trees routinely beat a neural network. The network
has lower bias and far higher variance, and at that sample size the trade goes the wrong way.</p>

<h3>What actually works, in order of effect</h3>
<p><b>Transfer learning.</b> Start from a model trained on something large and related, and
fine-tune. Somebody else paid the variance cost on millions of examples. For images, text and
audio this is now the default and it is not close.</p>
<p><b>Data augmentation.</b> Manufacture new examples from the ones you have, using
transformations that preserve the label. Flips, crops and color shifts for images; synonym
replacement and back-translation for text; time shifts and noise for audio. Every augmentation is
you telling the model an invariance you know about, which is information the data did not
contain.</p>
<p><b>Simpler models and stronger regularization.</b> Deliberately accept bias. This is the
correct move, not a compromise.</p>
<p><b>Feature engineering.</b> Out of fashion and highly effective when <code>n</code> is small.
A feature encoding domain knowledge is information you did not have to learn, and learning is
exactly what you cannot afford.</p>
<p><b>Ensembling.</b> Average several models. Averaging reduces variance almost by construction,
which is why bagging exists.</p>
<p><b>An informative prior.</b> The Bayesian version of all of the above, and the most explicit:
you are stating what you believed before the data arrived, and small data is precisely when that
belief still matters.</p>
<p><b>Collecting more data.</b> Worth pricing honestly. Error falls as
<code>1/&radic;n</code>, so going from 100 to 400 rows halves your error. That is often cheaper
than a month of modeling.</p>

<h3>Measuring performance when you cannot spare a test set</h3>
<p>With 200 rows, holding back 40 leaves you both a worse model and a noisy estimate.
<b>K-fold cross-validation</b> solves this: split into <code>k</code> folds, train on
<code>k-1</code> and evaluate on the held-out one, rotate, and average.</p>
<div class="mathblock">CV error = (1/k) &Sigma;<sub>i=1..k</sub> error on fold i</div>
<p>Every row is used for evaluation exactly once and for training <code>k-1</code> times. With
<code>k = n</code> this is <b>leave-one-out</b>, nearly unbiased and high variance and expensive.
<code>k = 5</code> or <code>10</code> is the usual compromise.</p>
<div class="hardidea">🧠 <b>The mistake that invalidates the whole estimate.</b> Any step that
looks at the labels must happen <b>inside</b> the fold, not before it. Selecting features by
correlation with the target on the full dataset, then cross-validating, leaks the test folds into
the selection and produces optimistic numbers that will not survive deployment. The same applies
to scaling, imputation and target encoding. If it learned anything from <code>y</code>, it goes
in the pipeline, and the pipeline goes inside the loop.</div>
<div class="worked"><b>Stratify when classes are imbalanced.</b> With 200 rows and 20 positives,
a random 5-fold split can easily give one fold with 1 positive and another with 7. Stratified
folds preserve the class ratio in each, so the estimates are comparable. With imbalance this
severe, also stop reporting accuracy: predicting the majority class always gives 90% here, and
means nothing. Report precision, recall and the confusion matrix.</div>

<h3>The habit that matters most</h3>
<p>With small data, the difference between a good result and a self-deception is usually not the
model. It is whether you tuned repeatedly against the same split until something scored well. Do
that twenty times and you have fitted the validation set with your own choices. Keep a final set
you look at once, and if you cannot afford one, at least count how many decisions you made
against your cross-validation score and treat the last number with a proportionate amount of
suspicion.</p>
`,
 quiz:{title:'Quick check, small data',questions:[
   {q:'Small datasets are dominated by which error term?',
    options:['Irreducible noise in the measurements','All three contribute about equally','Variance, since the fit swings with the sample','Bias, since simpler models must be used'],answer:2,whyWrong:['Irreducible noise is fixed by the problem and does not grow as the sample shrinks.','They do not. Variance is the term a small sample inflates.','','Simpler models are the response to the problem, not the source of it.'],
    why:'Few rows means a different sample gives a noticeably different model. That is variance by definition.'},
   {q:'Feature selection based on correlation with the target should be done:',
    options:['Only when the dataset is large','Once on the full dataset beforehand','After the model has been fitted','Inside each cross-validation fold'],answer:3,whyWrong:['Size does not change the argument. Selecting on the full data leaks the answer at any size.','That is the leak. The held-out fold has already influenced which features you kept.','By then the selection has already decided what the model saw. It has to happen inside the fold.',''],
    why:'Doing it beforehand leaks the held-out labels into the selection and inflates every score that follows.'},
   {q:'With 200 rows and 20 positives, reporting accuracy is misleading because:',
    options:['Predicting the majority class already scores 90%','The folds will not contain any positives','Accuracy is undefined for imbalanced data','Cross-validation cannot be used at all'],answer:0,whyWrong:['','Stratified folds keep the positives distributed. That is a separate concern, and a solvable one.','Accuracy is perfectly well defined here. It is just uninformative.','Cross-validation works fine. It is the metric that is wrong, not the protocol.'],
    why:'A model that learns nothing scores 90%. Precision, recall and the confusion matrix are informative here.'}
 ]}}
,

{id:'mlzoo',
 title:'The classifier zoo: six ways to draw a boundary',
 body:`
<div class="ground"><span class="gTag">🎯 Every classifier is a different bet about what boundaries look like</span>
<p>You have met logistic regression. There are half a dozen other families in common use, and
they differ in one respect that matters more than any other: <b>what shape of decision boundary
they are willing to draw</b>. Choose by matching that shape to your problem, not by reputation.</p></div>

<h3>1. k-nearest neighbours: no model at all</h3>
<p>To classify a new point, find the <code>k</code> closest training points and take a vote. That
is the entire algorithm. There is no training phase, which is why it is called
<b>lazy</b>: the training set <i>is</i> the model.</p>
<div class="mathblock">y&#770;(x) = majority vote over the k nearest x<sub>i</sub>, by some distance d(x, x<sub>i</sub>)</div>
<p><code>k</code> controls the bias-variance trade directly. <code>k = 1</code> gives a boundary
that wraps around every single point, which is maximum variance and zero bias. Large
<code>k</code> smooths the boundary toward the majority class, which is the opposite.</p>
<div class="demystify"><b>k-NN is not k-means, and the names cause real confusion.</b> k-NN is
<b>supervised</b> classification, where <code>k</code> is how many neighbours vote. k-means is
<b>unsupervised</b> clustering, where <code>k</code> is how many clusters exist. They share a
letter and nothing else.</div>
<div class="hardidea">🧠 <b>Why k-NN collapses in high dimensions.</b> In <code>d</code>
dimensions, the volume of a unit ball shrinks toward zero as <code>d</code> grows, so almost all
of a cube's volume sits in its corners. The practical consequence is that the distance to your
nearest neighbour and the distance to your farthest become nearly equal, so "nearest" stops
meaning anything. This is the <b>curse of dimensionality</b>, and it hits every distance-based
method. Beyond about 20 informative dimensions, k-NN needs dimensionality reduction first, or a
different method entirely.</div>
<p>Also note that distance is unit-dependent, so a feature measured in dollars will dominate one
measured in years. <b>Always scale features before any distance-based method.</b> This is the
most common way k-NN silently fails.</p>

<h3>2. Naive Bayes: assume independence and apply Bayes</h3>
<div class="mathblock">p(y=c | x) &prop; p(y=c) &Pi;<sub>d</sub> p(x<sub>d</sub> | y=c)</div>
<p>The product is the "naive" part: it assumes features are conditionally independent given the
class. That is almost always false. In text, "New" and "York" are anything but independent.</p>
<p>It works anyway, and there is a reason. Classification only needs the <b>argmax</b> to be
right, not the probabilities. Dependence between features distorts the magnitudes badly while
often leaving the ordering intact. So naive Bayes is frequently a good classifier and almost
always a poorly calibrated probability estimator, and you should not use its outputs as
confidences.</p>
<p>Fast, needs little data, and still a sensible baseline for text.</p>

<h3>3. Decision trees: axis-aligned splits</h3>
<p>Repeatedly ask a question of one feature, split, recurse. The boundary is a staircase of
axis-aligned cuts. Trees choose each split by maximizing purity, most commonly with Gini
impurity or entropy:</p>
<div class="mathblock">Gini(S) = 1 - &Sigma;<sub>c</sub> p<sub>c</sub>&sup2;         Entropy(S) = -&Sigma;<sub>c</sub> p<sub>c</sub> log p<sub>c</sub>

gain = impurity(parent) - &Sigma;<sub>children</sub> (n<sub>child</sub>/n<sub>parent</sub>) impurity(child)</div>
<div class="worked"><b>Worked.</b> A node with 40 of class A and 10 of class B has
<code>Gini = 1 - (0.8&sup2; + 0.2&sup2;) = 0.32</code>. A split producing (30,0) and (10,10) gives
children with Gini 0 and 0.5, weighted: <code>(30/50)(0) + (20/50)(0.5) = 0.20</code>. Gain is
<code>0.12</code>, so the split is worth making.</div>
<p>Trees need no scaling, handle mixed feature types, and are readable. Left unrestricted they
also memorize the training set perfectly, which is maximum variance. Alone they are rarely the
right answer; in an ensemble they are often the best one.</p>

<h3>4 and 5. Random forests and gradient boosting: two ways to use many trees</h3>
<p>The two differ in what they are fixing, and it maps exactly onto the bias-variance
decomposition.</p>
<p><b>Random forest</b> grows many deep trees, each on a bootstrap resample and each considering
only a random subset of features per split, then averages them. Deep trees are low bias and high
variance; averaging many decorrelated ones cuts the variance. The random feature subset exists
purely to decorrelate them, since averaging near-identical trees would achieve nothing.</p>
<p><b>Gradient boosting</b> grows shallow trees <b>in sequence</b>, each fitted to the residual
errors of everything before it. Shallow trees are high bias and low variance; adding them one at
a time drives the bias down.</p>
<div class="mathblock">F<sub>m</sub>(x) = F<sub>m-1</sub>(x) + &nu; h<sub>m</sub>(x), h<sub>m</sub> fitted to the negative gradient of the loss</div>
<p>The <code>&nu;</code> is a learning rate, usually 0.01 to 0.1, and shrinking it while adding
more trees is what keeps boosting from overfitting. Note the shape of that update: it is gradient
descent, but stepping in the space of functions rather than the space of parameters.</p>
<p>Forests parallelize and are hard to misuse. Boosting usually wins on tabular data and needs
tuning. On small-to-medium tabular problems, gradient boosting is still the method to beat, and
neural networks usually do not.</p>

<h3>6. Support vector machines: the widest possible gap</h3>
<p>Among all boundaries that separate the classes, choose the one with the largest <b>margin</b>,
the widest empty corridor between the two sides. Only the points on the edge of that corridor
matter, and they are the <b>support vectors</b>.</p>
<div class="mathblock">minimize  &frac12;||w||&sup2; + C&Sigma;&xi;<sub>i</sub>   subject to   t<sub>i</sub>(w<sup>T</sup>x<sub>i</sub>+b) &ge; 1 - &xi;<sub>i</sub>, &xi;<sub>i</sub> &ge; 0</div>
<p>The <code>&xi;</code> are slack variables allowing some violations, and <code>C</code> sets how
much you tolerate. Small <code>C</code> means a wide margin and more mistakes allowed.</p>
<div class="hardidea">🧠 <b>The kernel trick, in one paragraph.</b> Solve the dual form and the
data appears only as inner products <code>x<sub>i</sub><sup>T</sup>x<sub>j</sub></code>. So
replace every inner product with a function <code>K(x<sub>i</sub>, x<sub>j</sub>)</code> that
equals the inner product in some higher-dimensional space, and you get a boundary that is linear
there and curved here, <b>without ever computing the coordinates in that space</b>. The RBF
kernel <code>K = exp(-&gamma;||x<sub>i</sub>-x<sub>j</sub>||&sup2;)</code> corresponds to an
infinite-dimensional space. You never construct it, you only ever evaluate the kernel. That is
the trick, and it is one of the most elegant ideas in the field.</div>
<p>SVMs were dominant before deep learning and remain strong when <code>n</code> is small and
<code>d</code> is large, text being the classic case. They scale badly past a few tens of
thousands of rows.</p>

<h3>Choosing, honestly</h3>
<div class="mathblock">tabular, any size        &rarr; gradient boosting first, random forest as the safe default
text, small data         &rarr; naive Bayes or linear SVM
few features, need speed &rarr; logistic regression, and it is interpretable
small n, large d         &rarr; SVM
images, audio, language  &rarr; a pre-trained neural network, not this list
need to explain it       &rarr; a shallow tree or logistic regression</div>
<p>Start with logistic regression. It gives you a baseline in minutes and tells you whether the
problem is easy. A great deal of effort is spent beating a linear model that was never tried.</p>
`,
 quiz:{title:'Quick check, classifiers',questions:[
   {q:'k-NN requires feature scaling because:',
    options:['Scaling reduces the number of neighbours needed','Distances are dominated by large-scale features','The vote would otherwise be tied too often','Training would take too long without it'],answer:1,whyWrong:['k is a setting you choose, and scaling does not change how many neighbours you need.','','Ties are handled by choosing an odd k or by a tie-break rule. Scaling addresses something else.','There is no training phase to speed up. k-NN stores the data and does the work at query time.'],
    why:'A feature in dollars swamps one in years. Distance has no idea the units differ.'},
   {q:'Random forests and gradient boosting differ mainly in that:',
    options:['Forests use shallow trees, boosting uses deep ones','Forests reduce variance, boosting reduces bias','Only boosting can handle categorical features','Forests require the data to be scaled first'],answer:1,whyWrong:['It is usually the reverse. Forests grow deep trees and boosting grows shallow ones.','','Both handle categorical features, depending on the implementation rather than the family.','Neither needs scaling. Trees split on thresholds, which are scale-invariant.'],
    why:'Averaging deep decorrelated trees cuts variance; sequentially fitting residuals with shallow trees cuts bias.'},
   {q:'The kernel trick works because the SVM dual depends on data only through:',
    options:['The distances to the decision boundary','The number of features in the input','The class labels of the support vectors','Inner products between pairs of points'],answer:3,whyWrong:['Distances to the boundary are what the margin measures, and they come out of the solution rather than going into it.','The feature count is precisely what the trick lets you ignore, since the space may be infinite-dimensional.','The labels appear in the dual as coefficients, and they are not what the kernel replaces.',''],
    why:'Replace each inner product with K(xᵢ,xⱼ) and you work in a higher space without ever computing coordinates there.'}
 ]}},

{id:'mlcluster',
 title:'Cluster analysis: four methods and the question none of them answer',
 body:`
<div class="ground"><span class="gTag">🎯 Grouping without an answer key, and why that is harder than it sounds</span>
<p>Clustering has no accuracy to report, because there is nothing to be accurate against. That
makes the choice of method, and the validation of the result, far more consequential than in
supervised work.</p></div>

<h3>1. k-means: round clusters, hard assignment</h3>
<p>Pick <code>k</code> centers. Assign every point to its nearest. Move each center to the mean
of its points. Repeat. It minimizes</p>
<div class="mathblock">J = &Sigma;<sub>n</sub> &Sigma;<sub>k</sub> r<sub>nk</sub> ||x<sub>n</sub> - &mu;<sub>k</sub>||&sup2;, r<sub>nk</sub> &isin; {0,1}</div>
<p>The two steps are coordinate descent on that objective: fixing centers and optimizing
assignments gives "nearest center", and fixing assignments and optimizing centers gives "the
mean". Each step lowers <code>J</code>, so it converges, and only to a local optimum, so use
<code>k-means++</code> initialization and several restarts.</p>
<p>Because the objective is squared Euclidean distance to a center, <b>k-means can only find
round clusters of roughly equal size</b>. Give it two elongated parallel bands and it will cut
them across the middle rather than along their length. That is not a bug, it is the objective.</p>

<h3>2. Gaussian mixtures: elliptical clusters, soft assignment</h3>
<p>Covered in depth in the probability stream. A GMM replaces "nearest center" with "posterior
probability of each component", and replaces the shared spherical shape with a learned
<code>&Sigma;<sub>k</sub></code> per component. That buys you elongated, tilted clusters of
different sizes, and honest fractional membership for ambiguous points.</p>
<div class="mathblock">k-means  =  GMM with  &Sigma;<sub>k</sub> = &sigma;&sup2;I (shared), equal &pi;<sub>k</sub>, hard responsibilities</div>
<p>Fitted by EM. Costs more, needs more data per cluster because there are more parameters, and
can collapse onto a single point if the covariances are not regularized.</p>

<h3>3. Hierarchical clustering: no k required</h3>
<p>Start with every point as its own cluster, repeatedly merge the two closest, and record the
order. The result is a <b>dendrogram</b>, a tree you can cut at any height to get any number of
clusters. You do not have to choose <code>k</code> in advance, which is its main appeal.</p>
<p>The "closest" needs defining, and the choice changes the result substantially. <b>Single
linkage</b> uses the closest pair of points, which chains clusters together along thin bridges.
<b>Complete linkage</b> uses the farthest pair and produces compact clusters. <b>Ward linkage</b>
merges whichever pair increases total within-cluster variance least, and behaves most like
k-means. Cost is <code>O(n&sup2;)</code> or worse, so it is for thousands of points, not
millions.</p>

<h3>4. DBSCAN: density, arbitrary shapes, and an outlier category</h3>
<p>Define a neighbourhood radius <code>&epsilon;</code> and a minimum count
<code>minPts</code>. A point with at least <code>minPts</code> neighbours within
<code>&epsilon;</code> is a <b>core point</b>; core points that are close together form a cluster;
points near a cluster but not core join its edge; anything else is labeled <b>noise</b>.</p>
<p>Three properties follow, and they are exactly what k-means lacks. It finds clusters of
<b>arbitrary shape</b>, including crescents and rings. It does not need <code>k</code>. And it
explicitly labels outliers rather than forcing them into a cluster. The cost is that it struggles
when clusters have very different densities, since one <code>&epsilon;</code> has to suit all of
them.</p>

<h3>Choosing k, and why every method for it is a heuristic</h3>
<p><b>The elbow method</b> plots within-cluster sum of squares against <code>k</code> and looks
for the bend. It always decreases, so there is no optimum to find, only a judgement call about
where the returns diminish.</p>
<p><b>Silhouette score</b> compares each point's average distance to its own cluster against its
distance to the nearest other cluster:</p>
<div class="mathblock">s(i) = (b(i) - a(i)) / max(a(i), b(i)), s &isin; [-1, 1]</div>
<p><b>BIC or AIC</b> apply to GMMs, since a GMM has a likelihood, and penalize parameter count.
This is the closest thing to a principled answer available.</p>
<div class="hardidea">🧠 <b>The honest position on validation.</b> Every internal measure above
scores how well the partition matches the assumptions of the method that produced it. Silhouette
rewards compact round clusters, so it will prefer k-means output on data with elongated groups,
even when the elongated grouping is the true one. No internal score can tell you whether the
clusters correspond to anything real. Only three things can: a downstream task that improves, a
stability check showing the same structure across resamples, or a domain expert recognizing the
groups. If none of those is available, report the clustering as a description of the dataset and
not as a discovery.</div>
<div class="worked"><b>Before any of this, scale your features.</b> All four methods rest on
distance. On unscaled data with income in the tens of thousands and age in the tens, every
distance is essentially the income difference and the clustering is a one-dimensional split on
income wearing a disguise.</div>
`,
 quiz:{title:'Quick check, clustering',questions:[
   {q:'k-means cannot find elongated clusters because:',
    options:['It requires k to be known beforehand','It assigns each point to exactly one cluster','Its objective is squared distance to a center','It converges before reaching them'],answer:2,whyWrong:['Needing k in advance is a real inconvenience, and it has nothing to do with cluster shape.','Hard assignment is what separates it from a GMM, and a GMM with round components has the same shape limitation.','','It converges to a genuine local optimum of its own objective. The objective is the problem.'],
    why:'Minimizing ‖x − μ‖² makes round, equally sized groups the only thing the objective rewards.'},
   {q:'DBSCAN differs from k-means most importantly by:',
    options:['Guaranteeing the global optimum is found','Producing soft rather than hard assignments','Finding arbitrary shapes and labeling noise','Running faster on very large datasets'],answer:2,whyWrong:['Neither guarantees a global optimum. DBSCAN is deterministic given its parameters, which is a different thing.','DBSCAN assigns hard labels. Soft assignment is what a GMM gives you.','','It is often slower, and speed is not why people reach for it.'],
    why:'Density-connected regions can be any shape, and points in no dense region are explicitly outliers.'},
   {q:'A high silhouette score tells you:',
    options:['The data was properly scaled beforehand','The partition is compact and well separated','The clusters correspond to something real','The correct k has definitely been found'],answer:1,whyWrong:['Scaling affects the distances the score is computed from, and the score itself cannot tell you whether you did it.','','Nothing about the geometry says the clusters mean anything. That takes domain knowledge.','It is one signal among several for choosing k, and it can peak at a k that is not the true one.'],
    why:'It measures the geometry of the partition against the assumptions that produced it. Reality needs outside evidence.'}
 ]}}
,

{id:'mlreg',
 title:'Regression beyond the straight line',
 body:`
<div class="ground"><span class="gTag">🎯 Same loop, seven different bets about the shape of the answer</span>
<p>Linear regression fits a straight line by minimizing squared error. Every variant below changes
exactly one of three things: the <b>shape</b> it is allowed to fit, the <b>penalty</b> applied to
the coefficients, or the <b>loss</b> used to measure being wrong. Knowing which of the three has
been changed is how you keep them straight.</p></div>

<h3>The starting point</h3>
<div class="mathblock">y&#770; = w<sup>T</sup>x + b, minimize  &Sigma;<sub>n</sub>(y<sub>n</sub> - y&#770;<sub>n</sub>)&sup2;

closed form:  w = (X<sup>T</sup>X)<sup>-1</sup>X<sup>T</sup>y</div>
<p>That closed form, the <b>normal equations</b>, exists because squared error is quadratic in
<code>w</code>, so setting the derivative to zero gives a linear system. Almost nothing else in
machine learning has this luxury, which is why linear regression is the one model you can solve
exactly rather than iterate toward.</p>
<div class="demystify"><b>When the closed form fails.</b> If two features are perfectly
correlated, <code>X<sup>T</sup>X</code> is singular and cannot be inverted, so there is no unique
answer. Near-collinearity is worse in practice than exact collinearity, because the inverse
exists but is enormous, giving wild coefficients that flip sign with a small change in the data.
Ridge regression fixes exactly this, and the fix falls out of its algebra below.</div>

<h3>1. Polynomial regression: change the shape, keep the machinery</h3>
<p>Add <code>x&sup2;, x&sup3;</code> and so on as extra features, then fit a linear model to
them. The curve is nonlinear in <code>x</code> and still <b>linear in the parameters</b>, which
is what "linear model" actually means, and why all the same mathematics applies.</p>
<p>Degree is a bias-variance dial. Degree 1 underfits a curve; degree 15 on 20 points will pass
through nearly all of them and oscillate violently between them. This is the standard
demonstration of overfitting and it is worth plotting once yourself.</p>

<h3>2, 3 and 4. Ridge, lasso and elastic net: change the penalty</h3>
<div class="mathblock">ridge (L2):  &Sigma;(y-y&#770;)&sup2; + &lambda;&Sigma;w<sub>j</sub>&sup2;        w = (X<sup>T</sup>X + &lambda;I)<sup>-1</sup>X<sup>T</sup>y

lasso (L1):  &Sigma;(y-y&#770;)&sup2; + &lambda;&Sigma;|w<sub>j</sub>|      no closed form

elastic net: &Sigma;(y-y&#770;)&sup2; + &lambda;<sub>1</sub>&Sigma;|w<sub>j</sub>| + &lambda;<sub>2</sub>&Sigma;w<sub>j</sub><sup>2</sup></div>
<p>Look at the ridge solution: the penalty adds <code>&lambda;I</code> to
<code>X<sup>T</sup>X</code> before inverting, which lifts every eigenvalue by
<code>&lambda;</code> and makes a near-singular matrix invertible. The regularization and the
numerical fix are the same act.</p>
<div class="hardidea">🧠 <b>Why lasso zeroes coefficients and ridge does not.</b> Picture the
constraint region. L2 is a circle, L1 is a diamond with corners on the axes. The optimum sits
where the elliptical contours of the squared-error loss first touch that region, and a diamond's
corners stick out, so contact very often happens exactly at a corner, where one coordinate is
zero. A circle has no corners, so contact almost never lands on an axis. The gradient view says
the same: L1's pull toward zero is a constant <code>&lambda;&middot;sign(w)</code> regardless of
size, so it can drive a small weight all the way to zero, while L2's pull is proportional and
fades as the weight shrinks.</div>
<p>So lasso does feature selection and ridge does not. Elastic net is for correlated groups of
features, where lasso arbitrarily keeps one and discards the rest, while elastic net keeps or
drops them together.</p>
<div class="worked"><b>Choosing λ.</b> Cross-validation, always, and never on the training error,
which is monotonic in λ and will always pick zero. Standardize the features first: the penalty
sums coefficients, and a coefficient's size depends on its feature's units, so without scaling
you are penalizing the choice of unit rather than the coefficient.</div>

<h3>5. Logistic regression, which is classification wearing the name</h3>
<p>It appears here only to place it. It fits <code>p = &sigma;(w<sup>T</sup>x + b)</code> and
minimizes cross-entropy, not squared error. It is a member of the same family, the
<b>generalized linear models</b>, where a linear predictor is passed through a link function
chosen to match the type of the target.</p>

<h3>6. Poisson and other GLMs: change the loss to match the target</h3>
<p>Predicting counts with ordinary least squares is a common error. Counts cannot be negative,
their variance grows with their mean, and squared error assumes Gaussian noise with constant
variance. Poisson regression assumes what is actually true of counts:</p>
<div class="mathblock">log &lambda; = w<sup>T</sup>x        loss = &Sigma;( &lambda;<sub>n</sub> - y<sub>n</sub> log &lambda;<sub>n</sub> )</div>
<p>The log link guarantees a positive prediction, and the loss is the negative Poisson
log-likelihood. Same idea, different assumption: gamma regression for positive skewed continuous
outcomes, binomial for proportions.</p>

<h3>7. Quantile and robust regression: change what "wrong" means</h3>
<p>Squared error assumes Gaussian noise, so a single extreme outlier can dominate the fit,
because the penalty grows with the square of the error. Two alternatives:</p>
<div class="mathblock">absolute error (L1):  &Sigma;|y - y&#770;|          fits the median, Laplace noise
Huber:                squared for small errors, linear beyond a threshold &delta;
quantile (pinball):   asymmetric, fits the &tau;-th quantile rather than a center</div>
<p>Quantile regression is the one people underuse. Fitting the 10th and 90th percentiles gives
you a prediction <b>interval</b> rather than a point, which is often what a decision actually
needs. Predicting that delivery takes four days is less useful than predicting it takes between
two and nine.</p>

<h3>8. Tree-based and kernel regression: abandon the linear form</h3>
<p>Random forest and gradient boosting regressors predict a number at each leaf, and produce a
piecewise-constant surface. They handle interactions and nonlinearity with no feature engineering
and cannot extrapolate at all: outside the range of the training data they return the nearest
leaf's constant, forever. <b>Support vector regression</b> fits a tube of width
<code>&epsilon;</code> and penalizes only points outside it, and with a kernel gives smooth
nonlinear fits.</p>

<h3>How to choose</h3>
<div class="mathblock">continuous target, few features    &rarr; linear, then ridge
many features, some irrelevant     &rarr; lasso or elastic net
correlated feature groups          &rarr; elastic net
counts                             &rarr; Poisson
outliers present                   &rarr; Huber or absolute error
you need an interval, not a number &rarr; quantile regression
tabular with interactions          &rarr; gradient boosting
need to extrapolate beyond the data &rarr; a linear model, and only a linear model</div>
<p>That last line is the one people forget. Trees are usually the strongest tabular method and
they are structurally incapable of predicting outside the range they were trained on. If your
problem requires extrapolation, no amount of boosting will help.</p>
`,
 quiz:{title:'Quick check, regression',questions:[
   {q:'Ridge regression makes XᵀX invertible because it:',
    options:['Uses gradient descent instead of a closed form','Adds λI, lifting every eigenvalue','Removes the correlated features first','Standardizes the features beforehand'],answer:1,whyWrong:['Ridge has a closed form too. The penalty is what makes the matrix invertible, not the solver.','','Nothing is removed. Ridge keeps every feature and shrinks their coefficients.','Standardising makes the penalty fair across features, and it does not fix a singular matrix.'],
    why:'(XᵀX + λI)⁻¹. The regularization and the numerical conditioning fix are literally the same operation.'},
   {q:'Lasso produces exactly-zero coefficients because:',
    options:['Its constraint region has corners on the axes','Its penalty grows faster than L2 does','It uses absolute error rather than squared error','It removes features before fitting begins'],answer:0,whyWrong:['','L2 grows faster for large coefficients, since it is squared. L1 wins here on the shape of its constraint region.','The loss is still squared error. It is the penalty that uses absolute values.','Selection happens as a consequence of fitting, not before it begins.'],
    why:'The diamond’s corners lie on the axes, so the contours very often first touch where a coordinate is zero.'},
   {q:'Gradient-boosted trees cannot extrapolate because:',
    options:['Boosting stops once residuals are small','They overfit before reaching the boundary','Each leaf returns a constant learned from data','Their loss is only defined on training data'],answer:2,whyWrong:['Boosting stops when you tell it to, and small residuals inside the data range say nothing about outside it.','Overfitting is a separate risk. Even a perfectly fitted ensemble is flat beyond the data.','','The loss is defined anywhere. It is the prediction that cannot leave the range of the leaf values.'],
    why:'The surface is piecewise constant. Outside the training range you get the nearest leaf’s value, unchanged forever.'}
 ]}}
]});

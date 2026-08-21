STREAMS.push({icon:'🤖',track:'ML & AI Track',title:'Classic Machine Learning: Your First Models',blurb:'The payoff. Everything the foundations built, vectors, gradients, probability, now becomes real models that learn from data. Built by hand, then the one-line library version.',requires:'tk4',requiresName:'the ML Toolkit (pandas, scikit-learn, plotting)',lessons:[
{id:'mlwhat',
 title:'What machine learning actually is: the fit → predict → evaluate loop',
 body:`
<div class="ground"><span class="gTag">🎯 What it does</span>
<p>You met the words in Orientation; now we make them real. <b>Machine learning is learning a
function from examples.</b> Instead of you writing rules ("if the email says FREE MONEY, it is
spam"), you show the computer many labeled examples and it <i>finds the rule itself</i> by
tuning knobs to reduce error. Every classic model, regression, classification, trees, is a
variation on one loop: <b>fit, predict, evaluate.</b></p></div>

<h3>The three words made concrete</h3>
<p><b>fit</b> (a.k.a. train): show the model the <i>training data</i>, features
<code>X</code> and their true labels <code>y</code>, and let it tune its knobs to match.
<b>predict</b>: give the trained model new features and it outputs its guess. <b>evaluate</b>:
measure how wrong those guesses are (the error/loss), ideally on data it has <i>never seen</i>,
so you know it will work in the real world, not just memorize.</p>
<div class="codeSample">model.fit(X_train, y_train)     # learn from labeled examples
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
<p>Two flavors cover most of classic ML: <b>regression</b> predicts a <i>number</i> (house
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
    options:['Guess at random, and keep guessing until the answers happen to be right','Compile the model, link its dependencies, then execute it on the data','Download a model, install its weights, and run it on your own data','fit on labeled examples, predict on new data, evaluate the error'],answer:3,whyWrong:['Guessing is where an untrained model starts. The loop is what moves it away from that.','That is the build cycle for a compiled program. Nothing in it learns from data.','That is how you obtain a tool, not how a model learns.',''],
    why:'Fit tunes the weights on training data; predict applies them to new data; evaluate measures how wrong, ideally on unseen data.'},
   {q:'In prediction = w · feature + b, the weight w is:',
    options:['The number of features the model was given to work with','How much that feature counts toward the prediction','Always 1, so that every feature contributes on equal terms','The error between the prediction and the true value'],answer:1,whyWrong:['The feature count is a property of your data. Each feature gets its own weight.','','A weight fixed at 1 would leave the model unable to learn anything.','The error is the gap between the prediction and the truth. The weight is what you adjust to shrink it.'],
    why:'Weights (= parameters = coefficients) are the knobs training tunes. "+18k per bedroom" is a weight. b is the baseline (bias/intercept).'},
   {q:'Predicting a house PRICE is regression; predicting SPAM/not-spam is:',
    options:['Also regression, since the model outputs a spam score','Classification, since the answer is a category','Clustering, since the messages are grouped by similarity','Not machine learning, since the answer is a yes or a no'],answer:1,whyWrong:['Regression predicts a number. Spam or not is a category with no ordering and no arithmetic.','','Clustering groups unlabelled data. Here you have labels saying which messages were spam.','It is a textbook supervised problem, and one of the first ever solved commercially.'],
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
    options:['Gradient descent, or the closed-form normal equations','Sorting the data so the best-fitting line can be read off directly','Enumerating every possible line and scoring each of them in turn','Guessing values at random and keeping whichever happens to fit best'],answer:0,whyWrong:['','Sorting rearranges the data and leaves the weights untouched.','There are infinitely many lines. You cannot enumerate them.','Random guessing never converges. The whole method is that each step is informed by the slope.'],
    why:'The line has two knobs; training walks them down the loss surface (gradient descent) or solves the normal equations directly.'},
   {q:'The gradient ∂Loss/∂w for MSE is (2/n)·Σ(errorᵢ·xᵢ). What is errorᵢ?',
    options:['The true label yᵢ, the value the model was aiming for','The prediction minus the actual, (w·xᵢ + b) − yᵢ','Always zero, once the model has been fitted properly','The learning rate, which scales the size of each step'],answer:1,whyWrong:['The true label is one half of the error. The error is what is left after subtracting the prediction from it.','','If the error were always zero there would be nothing left to learn.','The learning rate is a setting you choose. The error is measured from the data.'],
    why:'Error is prediction − actual. Multiplying it by xᵢ and averaging gives the slope of the loss in the w-direction, the nudge.'},
   {q:'If after training the loss stops decreasing, it means:',
    options:['The training loop crashed and stopped updating the loss','There is no data left for the model to learn anything further from','The learning rate has decayed to zero and no steps are being taken','The weights have settled near the bottom of the loss bowl'],answer:3,whyWrong:['A crash stops the program. A flat loss curve is the program working and finishing its job.','With no data there would be no loss to compute in the first place.','A learning rate of zero would leave the loss flat from step one, not after it had come down.',''],
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
    options:['Rounding the score to the nearest whole number','Sorting the scores and splitting them at the halfway point','Taking the absolute value and comparing it against a threshold','Passing it through the sigmoid, then thresholding the probability at 0.5'],answer:3,whyWrong:['Rounding a raw score gives an arbitrary integer with no probabilistic meaning.','Sorting the scores says which example is most likely, not whether any of them cross the line.','Absolute value throws away the sign, which is exactly the information that decides the class.',''],
    why:'Score → sigmoid → probability → decision. The sigmoid keeps the output a valid probability; 0.5 is the usual cut.'},
   {q:'Despite its name, logistic regression performs:',
    options:['Sorting, since it ranks examples by their score','Clustering, since it groups similar examples together','Regression, since it predicts a continuous quantity','Classification, since it predicts a category rather than a number'],answer:3,whyWrong:['Nothing is sorted. It produces a probability per example.','Clustering has no labels. Logistic regression is trained on them.','It produces a probability, and the decision it hands you is a category rather than a quantity.',''],
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
 exs:[{title:'Run one dataset through both paradigms',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`Three overlapping groups of points. The supervised half is written for you: a
   <code>LogisticRegression</code> gets <code>X</code> and <code>y</code> and scores about
   <code>0.878</code> on held-out data. Now do the same data without the labels.
   <ol>
   <li><code>clusters</code>, the assignments from <code>KMeans</code> with <code>n_clusters=3</code> fitted on <code>X</code> alone, with <code>y</code> never passed in,</li>
   <li>inside the loop, the class each cluster should be renamed to, namely the one it mostly contains (<code>matched_acc</code> then comes out around <code>0.843</code>),</li>
   <li><code>ari</code>, the <code>adjusted_rand_score</code> between <code>y</code> and the clusters (about <code>0.583</code>).</li>
   </ol>`,
   starter:`import numpy as np
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, adjusted_rand_score

# Three overlapping groups. y says which group each point came from.
centers = np.array([[0.0, 0.0], [4.0, 0.0], [1.0, 3.0]])
X, y = make_blobs(n_samples=300, centers=centers, cluster_std=1.4, random_state=1)

# Supervised: the answer key goes in.
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
clf = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
sup_acc = accuracy_score(y_te, clf.predict(X_te))

# 1) Unsupervised: the same X, and y is never passed in.
clusters =

# 2) How often does a cluster number happen to equal a class number?
raw_agree = float(np.mean(clusters == y))

# 3) Rename each cluster to the class it mostly contains. This step needs y.
renamed = np.zeros_like(clusters)
for c in range(3):
    renamed[clusters == c] =
matched_acc = float(np.mean(renamed == y))

# 4) How well does the partition line up with the classes, ignoring the names?
ari =

print("supervised test accuracy:", round(sup_acc, 3))
print("raw cluster/class agreement:", round(raw_agree, 3))
print("agreement after renaming:", round(matched_acc, 3))
print("adjusted Rand index:", round(ari, 3))
`,
   solution:`import numpy as np
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.cluster import KMeans
from sklearn.metrics import accuracy_score, adjusted_rand_score

# Three overlapping groups. y says which group each point came from.
centers = np.array([[0.0, 0.0], [4.0, 0.0], [1.0, 3.0]])
X, y = make_blobs(n_samples=300, centers=centers, cluster_std=1.4, random_state=1)

# Supervised: the answer key goes in.
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
clf = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
sup_acc = accuracy_score(y_te, clf.predict(X_te))

# 1) Unsupervised: the same X, and y is never passed in.
clusters = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X).labels_

# 2) How often does a cluster number happen to equal a class number?
raw_agree = float(np.mean(clusters == y))

# 3) Rename each cluster to the class it mostly contains. This step needs y.
renamed = np.zeros_like(clusters)
for c in range(3):
    renamed[clusters == c] = np.bincount(y[clusters == c]).argmax()
matched_acc = float(np.mean(renamed == y))

# 4) How well does the partition line up with the classes, ignoring the names?
ari = adjusted_rand_score(y, clusters)

print("supervised test accuracy:", round(sup_acc, 3))
print("raw cluster/class agreement:", round(raw_agree, 3))
print("agreement after renaming:", round(matched_acc, 3))
print("adjusted Rand index:", round(ari, 3))
`,
   tests:[
     {d:'the supervised model, handed the answer key, gets about 0.88 on points it never saw',expr:'sup_acc > 0.8'},
     {d:'cluster numbers agree with class numbers barely better than chance, because nothing told k-means what to call anything',expr:'raw_agree < 0.5'},
     {d:'renaming each cluster by its majority class lifts agreement to about 0.84, and that renaming was computed from y',expr:'matched_acc > 0.75'},
     {d:'the adjusted Rand index is about 0.58, so the partition recovers the three groups partly and not fully',expr:'0.4 < ari < 0.75'},
     {d:'the renaming is what made the clusters readable, and it needed labels: without them you have geometry and no names',expr:'matched_acc > 2 * raw_agree'}
   ],
   hints:[
     'KMeans takes only X. Fit it with KMeans(n_clusters=3, n_init=10, random_state=0).fit(X) and read .labels_.',
     'To rename a cluster, look at the true labels of the points inside it and take the most common one.',
     'renamed[clusters == c] = np.bincount(y[clusters == c]).argmax(), and ari = adjusted_rand_score(y, clusters).'
   ]}],
 quiz:{title:'Quick check, paradigms',questions:[
   {q:'The defining difference between supervised and unsupervised learning is:',
    options:['Whether the data is numeric or categorical','Whether the training data includes target labels','Whether the dataset is large or small','Whether the model is linear or nonlinear'],answer:1,whyWrong:['Both handle numeric and categorical data. The distinction is about targets, not feature types.','','Size affects how well either one works. It does not decide which one you are doing.','Both supervised and unsupervised methods come in linear and nonlinear forms.'],
    why:'Supervised has an answer key. Everything else about the two follows from that one fact.'},
   {q:'Self-supervised learning is best described as:',
    options:['Reinforcement learning with a delayed reward','Supervised learning on labels derived from the data','Training without any objective function at all','Clustering applied before a supervised model runs'],answer:1,whyWrong:['There is no reward and no environment. The labels come from the data itself.','','There is very much an objective. Predicting the hidden word is the objective.','That is a preprocessing pipeline, and the labels would still have to come from somewhere.'],
    why:'Mask a word and predict it. There is a target, so it is supervised, but nobody annotated anything.'},
   {q:'Running k-means on data with no real cluster structure will:',
    options:['Fail to converge within the iteration limit','Return k clusters and report no problem','Raise an error about insufficient separation','Return a single cluster containing everything'],answer:1,whyWrong:['It converges reliably, and converging is not the same as finding something meaningful.','','There is no such check. The algorithm has no notion of whether the structure is real.','It returns exactly the k you asked for, split however the geometry allows.'],
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
 exs:[{title:'Score a model on 40 rows without fooling yourself',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`Forty rows, two classes. Part one scores one model with a single train/test split,
   twenty times, changing nothing but the seed. Part two scores the same model by 5-fold
   cross-validation. Part three moves to a 95/5 dataset, where accuracy stops meaning anything.
   <ol>
   <li><code>spread</code>, the largest of the twenty accuracies minus the smallest (it comes out to <code>0.5</code>), and <code>split_sd</code>, their standard deviation, <code>std(ddof=1)</code>,</li>
   <li><code>cv_se</code>, the standard error of the five fold scores, <code>std(ddof=1) / sqrt(5)</code>,</li>
   <li>on the imbalanced set, <code>rec_imb</code>, the recall, and <code>majority_acc</code>, the accuracy you score by never predicting the rare class at all.</li>
   </ol>`,
   starter:`import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score

# Part 1: 40 rows, one split, twenty different seeds.
X, y = make_classification(n_samples=40, n_features=4, n_informative=2,
                           n_redundant=0, class_sep=0.9, random_state=1)
accs = []
for seed in range(20):
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25,
                                              random_state=seed, stratify=y)
    m = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
    accs.append(accuracy_score(y_te, m.predict(X_te)))
accs = np.array(accs)

# 1) how far apart are the best and worst seeds, and how much do they scatter?
spread =
split_sd =

# Part 2: the same model, scored by 5-fold cross-validation instead.
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
fold_scores = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=cv)

# 2) the averaged estimate, and the standard error of that average
cv_mean = float(fold_scores.mean())
cv_se =

print("single split: min", accs.min(), "max", accs.max(), "spread", round(spread, 3))
print("sd across splits:", round(split_sd, 3))
print("cross-validated:", round(cv_mean, 3), "standard error", round(cv_se, 3))

# Part 3: 95 percent of one class, 5 percent of the other.
Xi, yi = make_classification(n_samples=400, n_features=4, n_informative=2, n_redundant=0,
                             weights=[0.95, 0.05], flip_y=0.0, class_sep=1.0, random_state=0)
Xi_tr, Xi_te, yi_tr, yi_te = train_test_split(Xi, yi, test_size=0.5,
                                              random_state=0, stratify=yi)
pred = LogisticRegression(max_iter=1000).fit(Xi_tr, yi_tr).predict(Xi_te)

# 3) accuracy, recall, and the score for never predicting the rare class at all
acc_imb = accuracy_score(yi_te, pred)
rec_imb =
majority_acc =

print("imbalanced: accuracy", round(acc_imb, 3), "majority baseline", round(majority_acc, 3),
      "recall", round(rec_imb, 3))
`,
   solution:`import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score

# Part 1: 40 rows, one split, twenty different seeds.
X, y = make_classification(n_samples=40, n_features=4, n_informative=2,
                           n_redundant=0, class_sep=0.9, random_state=1)
accs = []
for seed in range(20):
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25,
                                              random_state=seed, stratify=y)
    m = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
    accs.append(accuracy_score(y_te, m.predict(X_te)))
accs = np.array(accs)

# 1) how far apart are the best and worst seeds, and how much do they scatter?
spread = float(accs.max() - accs.min())
split_sd = float(accs.std(ddof=1))

# Part 2: the same model, scored by 5-fold cross-validation instead.
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
fold_scores = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=cv)

# 2) the averaged estimate, and the standard error of that average
cv_mean = float(fold_scores.mean())
cv_se = float(fold_scores.std(ddof=1) / np.sqrt(5))

print("single split: min", accs.min(), "max", accs.max(), "spread", round(spread, 3))
print("sd across splits:", round(split_sd, 3))
print("cross-validated:", round(cv_mean, 3), "standard error", round(cv_se, 3))

# Part 3: 95 percent of one class, 5 percent of the other.
Xi, yi = make_classification(n_samples=400, n_features=4, n_informative=2, n_redundant=0,
                             weights=[0.95, 0.05], flip_y=0.0, class_sep=1.0, random_state=0)
Xi_tr, Xi_te, yi_tr, yi_te = train_test_split(Xi, yi, test_size=0.5,
                                              random_state=0, stratify=yi)
pred = LogisticRegression(max_iter=1000).fit(Xi_tr, yi_tr).predict(Xi_te)

# 3) accuracy, recall, and the score for never predicting the rare class at all
acc_imb = accuracy_score(yi_te, pred)
rec_imb = recall_score(yi_te, pred)
majority_acc = accuracy_score(yi_te, np.zeros_like(yi_te))

print("imbalanced: accuracy", round(acc_imb, 3), "majority baseline", round(majority_acc, 3),
      "recall", round(rec_imb, 3))
`,
   tests:[
     {d:'twenty splits of the same forty rows return accuracies all the way from 0.5 to 1.0',expr:'accs.min() <= 0.5 and accs.max() >= 1.0'},
     {d:'the spread across seeds is 0.5, so any one split reports a number that says almost nothing',expr:'spread >= 0.4'},
     {d:'cross-validation puts the model at about 0.83, having tested every row exactly once',expr:'0.7 < cv_mean < 0.95'},
     {d:'the standard error of the cross-validated estimate is less than half the scatter of single splits',expr:'cv_se < split_sd / 2'},
     {d:'on the 95/5 data the model beats the majority-class baseline on accuracy, 0.965 against 0.95',expr:'acc_imb > majority_acc'},
     {d:'and it still misses seven of the ten positives, which were the entire reason for building it',expr:'rec_imb <= 0.3'}
   ],
   hints:[
     'spread = accs.max() - accs.min(), and split_sd = accs.std(ddof=1), both on the array of twenty accuracies.',
     'The standard error of a mean of k numbers is their standard deviation divided by the square root of k.',
     'recall_score(y_true, pred) is the fraction of real positives the model found. accuracy_score(y_true, np.zeros_like(y_true)) scores a model that never predicts the rare class.'
   ]}],
 quiz:{title:'Quick check, small data',questions:[
   {q:'Small datasets are dominated by which error term?',
    options:['Irreducible noise in the measurements','All three contribute about equally','Variance, since the fit swings with the sample','Bias, since simpler models must be used'],answer:2,whyWrong:['Irreducible noise is fixed by the problem and does not grow as the sample shrinks.','They do not. Variance is the term a small sample inflates.','','Simpler models are the response to the problem, not the source of it.'],
    why:'Few rows means a different sample gives a noticeably different model. That is variance by definition.'},
   {q:'Feature selection based on correlation with the target should be done:',
    options:['Only when the dataset is large','After the model has been fitted','Inside each cross-validation fold','Once on the full dataset beforehand'],answer:2,whyWrong:['Size does not change the argument. Selecting on the full data leaks the answer at any size.','By then the selection has already decided what the model saw. It has to happen inside the fold.','','That is the leak. The held-out fold has already influenced which features you kept.'],
    why:'Doing it beforehand leaks the held-out labels into the selection and inflates every score that follows.'},
   {q:'With 200 rows and 20 positives, reporting accuracy is misleading because:',
    options:['Cross-validation cannot be used at all','The folds will not contain any positives','Accuracy is undefined for imbalanced data','Predicting the majority class already scores 90%'],answer:3,whyWrong:['Cross-validation works fine. It is the metric that is wrong, not the protocol.','Stratified folds keep the positives distributed. That is a separate concern, and a solvable one.','Accuracy is perfectly well defined here. It is just uninformative.',''],
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

<h3>1. k-nearest neighbors: no model at all</h3>
<p>To classify a new point, find the <code>k</code> closest training points and take a vote. That
is the entire algorithm. There is no training phase, which is why it is called
<b>lazy</b>: the training set <i>is</i> the model.</p>
<div class="mathblock">y&#770;(x) = majority vote over the k nearest x<sub>i</sub>, by some distance d(x, x<sub>i</sub>)</div>
<p><code>k</code> controls the bias-variance trade directly. <code>k = 1</code> gives a boundary
that wraps around every single point, which is maximum variance and zero bias. Large
<code>k</code> smooths the boundary toward the majority class, which is the opposite.</p>
<div class="demystify"><b>k-NN is not k-means, and the names cause real confusion.</b> k-NN is
<b>supervised</b> classification, where <code>k</code> is how many neighbors vote. k-means is
<b>unsupervised</b> clustering, where <code>k</code> is how many clusters exist. They share a
letter and nothing else.</div>
<div class="hardidea">🧠 <b>Why k-NN collapses in high dimensions.</b> In <code>d</code>
dimensions, the volume of a unit ball shrinks toward zero as <code>d</code> grows, so almost all
of a cube's volume sits in its corners. The practical consequence is that the distance to your
nearest neighbor and the distance to your farthest become nearly equal, so "nearest" stops
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
 exs:[{title:'Fit six classifiers on a boundary no line can draw',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`One class is a ring around the other, so no straight line separates them. Six models,
   the same two calls each.
   <ol>
   <li>fit every model in <code>models</code> on the training set and store its test accuracy in <code>acc[name]</code>,</li>
   <li><code>worst_curved</code>, the lowest accuracy among the five that are not logistic regression,</li>
   <li><code>best_name</code>, the name of the highest-scoring model, and <code>logistic_won</code>, whether that name is <code>logistic</code>.</li>
   </ol>
   Logistic regression should land near <code>0.47</code>, and everything else above <code>0.94</code>.`,
   starter:`import numpy as np
from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# One class is a ring around the other.
X, y = make_circles(n_samples=300, noise=0.12, factor=0.5, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

models = {
    'logistic': LogisticRegression(max_iter=1000),
    'knn': KNeighborsClassifier(n_neighbors=5),
    'naive_bayes': GaussianNB(),
    'tree': DecisionTreeClassifier(max_depth=5, random_state=0),
    'forest': RandomForestClassifier(n_estimators=30, random_state=0),
    'svm_rbf': SVC(kernel='rbf', random_state=0),
}

# 1) the identical two calls, six times
acc = {}
for name, model in models.items():
    model.fit(X_tr, y_tr)
    acc[name] =

acc_logistic = acc['logistic']
acc_tree = acc['tree']
acc_svm = acc['svm_rbf']

# 2) the weakest of the five that are allowed to bend
worst_curved =

# 3) which model actually won
best_name =
logistic_won = (best_name == 'logistic')

for name in models:
    print(name, round(acc[name], 3))
print("worst curved model:", round(worst_curved, 3), "best overall:", best_name)
`,
   solution:`import numpy as np
from sklearn.datasets import make_circles
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# One class is a ring around the other.
X, y = make_circles(n_samples=300, noise=0.12, factor=0.5, random_state=0)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)

models = {
    'logistic': LogisticRegression(max_iter=1000),
    'knn': KNeighborsClassifier(n_neighbors=5),
    'naive_bayes': GaussianNB(),
    'tree': DecisionTreeClassifier(max_depth=5, random_state=0),
    'forest': RandomForestClassifier(n_estimators=30, random_state=0),
    'svm_rbf': SVC(kernel='rbf', random_state=0),
}

# 1) the identical two calls, six times
acc = {}
for name, model in models.items():
    model.fit(X_tr, y_tr)
    acc[name] = accuracy_score(y_te, model.predict(X_te))

acc_logistic = acc['logistic']
acc_tree = acc['tree']
acc_svm = acc['svm_rbf']

# 2) the weakest of the five that are allowed to bend
worst_curved = min(v for k, v in acc.items() if k != 'logistic')

# 3) which model actually won
best_name = max(acc, key=acc.get)
logistic_won = (best_name == 'logistic')

for name in models:
    print(name, round(acc[name], 3))
print("worst curved model:", round(worst_curved, 3), "best overall:", best_name)
`,
   tests:[
     {d:'all six models fit and predict through the identical pair of calls',expr:'len(acc) == 6'},
     {d:'logistic regression lands at about 0.47, no better than a coin, because one straight line cannot cut a ring off from its center',expr:'acc_logistic < 0.6'},
     {d:'the RBF support vector machine reaches about 0.98, since its kernel makes the boundary curved',expr:'acc_svm > 0.9'},
     {d:'the decision tree reaches about 0.94 by stacking axis-aligned cuts into a box around the inner disc',expr:'acc_tree > 0.9'},
     {d:'every model that can bend beats the one that cannot by more than 40 points of accuracy',expr:'worst_curved > acc_logistic + 0.4'},
     {d:'the linear model does not win here, and no amount of tuning would make it: the shape of its boundary is the whole limitation',expr:'logistic_won == False'}
   ],
   hints:[
     'Every model in the dict takes the same two calls, model.fit(X_tr, y_tr) then model.predict(X_te). That uniformity is the point of the interface.',
     'acc[name] = accuracy_score(y_te, model.predict(X_te)).',
     'worst_curved is the smallest value in acc over the five keys that are not logistic, and best_name = max(acc, key=acc.get).'
   ]},
  {title:'Show that a linear boundary really is a line',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`Two interleaved crescents, fitted by logistic regression and by a decision tree. Predict
   on a 100 by 100 grid, which is what a decision-boundary plot draws, then interrogate the shape.
   The loop that traces where the predicted class flips, column by column, is written for you.
   <ol>
   <li><code>score</code>, the single linear combination <code>grid.dot(coef) + intercept</code>, one number per grid point (<code>matches_score</code> then comes out to exactly <code>1.0</code>),</li>
   <li><code>slope</code> and <code>intercept</code> of the line <code>np.polyfit</code> puts through the flip points it collected,</li>
   <li><code>tree_line_agree</code>, how much of the tree's grid prediction one straight line can reproduce.</li>
   </ol>`,
   starter:`import numpy as np
from sklearn.datasets import make_moons
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

X, y = make_moons(n_samples=300, noise=0.25, random_state=0)
linear = LogisticRegression(max_iter=1000).fit(X, y)
tree = DecisionTreeClassifier(max_depth=4, random_state=0).fit(X, y)

xs = np.linspace(-2.0, 3.0, 100)
ys = np.linspace(-2.0, 2.5, 100)
GX, GY = np.meshgrid(xs, ys)
grid = np.c_[GX.ravel(), GY.ravel()]

linear_pred = linear.predict(grid)
tree_pred = tree.predict(grid)

w1, w2 = linear.coef_[0]
b = linear.intercept_[0]

# 1) the one number the linear model actually looks at
score =
matches_score = float(np.mean(linear_pred == (score > 0).astype(int)))

# 2) trace the flip, column by column
grid_pred = linear_pred.reshape(GX.shape)
points = []
for j in range(len(xs)):
    flips = np.where(np.diff(grid_pred[:, j]) != 0)[0]
    if len(flips) == 1:
        points.append((xs[j], ys[flips[0]]))
points = np.array(points)

# 3) fit a straight line to those flip points and measure the worst gap
slope, intercept =
max_resid = float(np.abs(points[:, 1] - (slope * points[:, 0] + intercept)).max())
algebra_slope = -w1 / w2

# 4) can one straight line reproduce what the tree drew?
surrogate = LogisticRegression(max_iter=1000).fit(grid, tree_pred)
tree_line_agree =

print("grid points classified by sign(score):", matches_score)
print("boundary points found:", len(points))
print("fitted slope", round(slope, 4), "vs -w1/w2", round(algebra_slope, 4))
print("largest departure from that line:", round(max_resid, 4))
print("a straight line reproduces this much of the tree:", round(tree_line_agree, 3))
`,
   solution:`import numpy as np
from sklearn.datasets import make_moons
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier

X, y = make_moons(n_samples=300, noise=0.25, random_state=0)
linear = LogisticRegression(max_iter=1000).fit(X, y)
tree = DecisionTreeClassifier(max_depth=4, random_state=0).fit(X, y)

xs = np.linspace(-2.0, 3.0, 100)
ys = np.linspace(-2.0, 2.5, 100)
GX, GY = np.meshgrid(xs, ys)
grid = np.c_[GX.ravel(), GY.ravel()]

linear_pred = linear.predict(grid)
tree_pred = tree.predict(grid)

w1, w2 = linear.coef_[0]
b = linear.intercept_[0]

# 1) the one number the linear model actually looks at
score = grid.dot(linear.coef_[0]) + b
matches_score = float(np.mean(linear_pred == (score > 0).astype(int)))

# 2) trace the flip, column by column
grid_pred = linear_pred.reshape(GX.shape)
points = []
for j in range(len(xs)):
    flips = np.where(np.diff(grid_pred[:, j]) != 0)[0]
    if len(flips) == 1:
        points.append((xs[j], ys[flips[0]]))
points = np.array(points)

# 3) fit a straight line to those flip points and measure the worst gap
slope, intercept = np.polyfit(points[:, 0], points[:, 1], 1)
max_resid = float(np.abs(points[:, 1] - (slope * points[:, 0] + intercept)).max())
algebra_slope = -w1 / w2

# 4) can one straight line reproduce what the tree drew?
surrogate = LogisticRegression(max_iter=1000).fit(grid, tree_pred)
tree_line_agree = float(np.mean(surrogate.predict(grid) == tree_pred))

print("grid points classified by sign(score):", matches_score)
print("boundary points found:", len(points))
print("fitted slope", round(slope, 4), "vs -w1/w2", round(algebra_slope, 4))
print("largest departure from that line:", round(max_resid, 4))
print("a straight line reproduces this much of the tree:", round(tree_line_agree, 3))
`,
   tests:[
     {d:'every one of the 10,000 grid points is decided by the sign of a single number, w1·x1 + w2·x2 + b',expr:'matches_score == 1.0'},
     {d:'the boundary crosses all 100 columns of the grid exactly once each',expr:'len(points) == 100'},
     {d:'the slope fitted to those crossings matches -w1/w2, which is the slope the algebra says it must have',expr:'abs(slope - algebra_slope) < 0.01'},
     {d:'no crossing sits more than one grid step off that line, so the boundary is straight to the resolution you sampled it at',expr:'max_resid < 0.05'},
     {d:'the best straight line through the tree’s boundary recovers only about 88 percent of it, because a staircase is not a line',expr:'tree_line_agree < 0.95'}
   ],
   hints:[
     'linear.coef_[0] is a length-2 array, so grid.dot(linear.coef_[0]) + linear.intercept_[0] gives one score per grid point.',
     'np.polyfit(points[:, 0], points[:, 1], 1) returns the slope and intercept of the best line through the crossings.',
     'tree_line_agree = float(np.mean(surrogate.predict(grid) == tree_pred)), the fraction of the grid a linear stand-in gets right.'
   ]}],
 quiz:{title:'Quick check, classifiers',questions:[
   {q:'k-NN requires feature scaling because:',
    options:['Scaling reduces the number of neighbors needed','Distances are dominated by large-scale features','The vote would otherwise be tied too often','Training would take too long without it'],answer:1,whyWrong:['k is a setting you choose, and scaling does not change how many neighbors you need.','','Ties are handled by choosing an odd k or by a tie-break rule. Scaling addresses something else.','There is no training phase to speed up. k-NN stores the data and does the work at query time.'],
    why:'A feature in dollars swamps one in years. Distance has no idea the units differ.'},
   {q:'Random forests and gradient boosting differ mainly in that:',
    options:['Forests reduce variance, boosting reduces bias','Forests use shallow trees, boosting uses deep ones','Only boosting can handle categorical features','Forests require the data to be scaled first'],answer:0,whyWrong:['','It is usually the reverse. Forests grow deep trees and boosting grows shallow ones.','Both handle categorical features, depending on the implementation rather than the family.','Neither needs scaling. Trees split on thresholds, which are scale-invariant.'],
    why:'Averaging deep decorrelated trees cuts variance; sequentially fitting residuals with shallow trees cuts bias.'},
   {q:'The kernel trick works because the SVM dual depends on data only through:',
    options:['The class labels of the support vectors','The distances to the decision boundary','Inner products between pairs of points','The number of features in the input'],answer:2,whyWrong:['The labels appear in the dual as coefficients, and they are not what the kernel replaces.','Distances to the boundary are what the margin measures, and they come out of the solution rather than going into it.','','The feature count is precisely what the trick lets you ignore, since the space may be infinite-dimensional.'],
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
<p>Define a neighborhood radius <code>&epsilon;</code> and a minimum count
<code>minPts</code>. A point with at least <code>minPts</code> neighbors within
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
 exs:[{title:'Watch inertia fail to choose k',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`Three round blobs. Run k-means at every k from 2 to 8, record what each metric says, and
   see which of the two is capable of picking a winner.
   <ol>
   <li>inside the loop, append the within-cluster sum of squares to <code>inertias</code> and the silhouette score to <code>sils</code>,</li>
   <li><code>k_by_inertia</code> and <code>k_by_silhouette</code>, the k each metric would choose if you simply took its optimum.</li>
   </ol>
   One of those two will be <code>8</code>, and it would be <code>300</code> if the loop went that
   far.`,
   starter:`import numpy as np
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=300, centers=3, cluster_std=0.9, random_state=0)

ks = list(range(2, 9))
inertias = []
sils = []
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    # 1) the two numbers, one per k
    inertias.append()
    sils.append()

# 2) does inertia ever go back up?
falls_every_step = all(inertias[i + 1] < inertias[i] for i in range(len(inertias) - 1))

# 3) the k each metric would pick on its own
k_by_inertia =
k_by_silhouette =

# 4) the size of the first two steps down
drop_2_to_3 = inertias[0] - inertias[1]
drop_3_to_4 = inertias[1] - inertias[2]

for i, k in enumerate(ks):
    print(k, round(inertias[i], 1), round(sils[i], 3))
print("inertia falls every step:", falls_every_step)
print("k by inertia:", k_by_inertia, " k by silhouette:", k_by_silhouette)
`,
   solution:`import numpy as np
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=300, centers=3, cluster_std=0.9, random_state=0)

ks = list(range(2, 9))
inertias = []
sils = []
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    # 1) the two numbers, one per k
    inertias.append(km.inertia_)
    sils.append(silhouette_score(X, km.labels_))

# 2) does inertia ever go back up?
falls_every_step = all(inertias[i + 1] < inertias[i] for i in range(len(inertias) - 1))

# 3) the k each metric would pick on its own
k_by_inertia = ks[int(np.argmin(inertias))]
k_by_silhouette = ks[int(np.argmax(sils))]

# 4) the size of the first two steps down
drop_2_to_3 = inertias[0] - inertias[1]
drop_3_to_4 = inertias[1] - inertias[2]

for i, k in enumerate(ks):
    print(k, round(inertias[i], 1), round(sils[i], 3))
print("inertia falls every step:", falls_every_step)
print("k by inertia:", k_by_inertia, " k by silhouette:", k_by_silhouette)
`,
   tests:[
     {d:'inertia falls at every single step from k=2 to k=8, without exception',expr:'falls_every_step == True'},
     {d:'so its minimum is at the largest k you tried, and would keep moving if you kept going, all the way to one cluster per point',expr:'k_by_inertia == 8'},
     {d:'the fall from k=2 to k=3 is more than five times the fall from 3 to 4, which is the bend people read off an elbow plot',expr:'drop_2_to_3 > 5 * drop_3_to_4'},
     {d:'silhouette does have a real maximum, and it sits at k=3, the number of groups the data was built with',expr:'k_by_silhouette == 3'},
     {d:'at k=8 inertia says the fit improved while silhouette says the partition got worse, which is exactly why one of them can choose k and the other cannot',expr:'inertias[6] < inertias[1] and sils[6] < sils[1]'}
   ],
   hints:[
     'km.inertia_ is the within-cluster sum of squares after fitting. Append it once per k.',
     'silhouette_score(X, km.labels_) takes the data and the assignment, not the fitted model.',
     'k_by_inertia = ks[int(np.argmin(inertias))] and k_by_silhouette = ks[int(np.argmax(sils))]. One of those two will be 8 no matter what data you feed it.'
   ]},
  {title:'Break k-means on two crescents',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`Two interleaved crescents. Neither is round, which is the one assumption k-means cannot
   give up. <code>groups</code> records which crescent each point came from and is used only to
   score the result, never to fit.
   <ol>
   <li><code>db_labels</code>, the assignments from <code>DBSCAN(eps=0.2, min_samples=5)</code>, which takes no k at all,</li>
   <li><code>km_ari</code> and <code>db_ari</code>, each partition scored against <code>groups</code> with <code>adjusted_rand_score</code>.</li>
   </ol>
   k-means should come out near <code>0.23</code> and DBSCAN near <code>0.99</code>, on identical
   points.`,
   starter:`import numpy as np
from sklearn.datasets import make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import adjusted_rand_score

# Two interleaved crescents. Neither is round.
X, groups = make_moons(n_samples=300, noise=0.08, random_state=0)

# 1) two clusterings of the identical points
km_labels = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X).labels_
db_labels =

# 2) score each partition against the crescents it should have found
km_ari =
db_ari =

# 3) DBSCAN was never told how many groups to look for
n_db_clusters = len(set(db_labels) - {-1})
n_noise = int((db_labels == -1).sum())

# 4) how mixed is the better of the two k-means clusters?
worst_purity = min(max(float(np.mean(groups[km_labels == c] == 0)),
                       float(np.mean(groups[km_labels == c] == 1))) for c in (0, 1))

print("k-means ARI:", round(km_ari, 3))
print("DBSCAN ARI:", round(db_ari, 3))
print("DBSCAN found", n_db_clusters, "clusters and", n_noise, "noise point(s)")
print("purity of the cleanest k-means cluster:", round(worst_purity, 3))
`,
   solution:`import numpy as np
from sklearn.datasets import make_moons
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import adjusted_rand_score

# Two interleaved crescents. Neither is round.
X, groups = make_moons(n_samples=300, noise=0.08, random_state=0)

# 1) two clusterings of the identical points
km_labels = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X).labels_
db_labels = DBSCAN(eps=0.2, min_samples=5).fit(X).labels_

# 2) score each partition against the crescents it should have found
km_ari = adjusted_rand_score(groups, km_labels)
db_ari = adjusted_rand_score(groups, db_labels)

# 3) DBSCAN was never told how many groups to look for
n_db_clusters = len(set(db_labels) - {-1})
n_noise = int((db_labels == -1).sum())

# 4) how mixed is the better of the two k-means clusters?
worst_purity = min(max(float(np.mean(groups[km_labels == c] == 0)),
                       float(np.mean(groups[km_labels == c] == 1))) for c in (0, 1))

print("k-means ARI:", round(km_ari, 3))
print("DBSCAN ARI:", round(db_ari, 3))
print("DBSCAN found", n_db_clusters, "clusters and", n_noise, "noise point(s)")
print("purity of the cleanest k-means cluster:", round(worst_purity, 3))
`,
   tests:[
     {d:'k-means scores an adjusted Rand index of about 0.23 against the crescents, not far above the 0.0 of a random partition',expr:'km_ari < 0.4'},
     {d:'DBSCAN scores about 0.99 on the identical points, so the structure was there to be found all along',expr:'db_ari > 0.9'},
     {d:'and DBSCAN was never told there were two groups: it found two from the density alone',expr:'n_db_clusters == 2'},
     {d:'it also declined to place one point, labeling it noise instead of forcing it into a cluster',expr:'n_noise >= 1'},
     {d:'even the cleaner k-means cluster is about a quarter made of the wrong crescent, because minimizing distance to a center cuts the moons across rather than along',expr:'worst_purity < 0.85'}
   ],
   hints:[
     'DBSCAN(eps=0.2, min_samples=5).fit(X).labels_. Note that it takes no k at all.',
     'adjusted_rand_score(groups, labels) compares two partitions and ignores how each one numbered its clusters: 1.0 is a perfect match, 0.0 is chance.',
     'The k-means call is not wrong and there is nothing to tune. Its objective is squared distance to a center, and a crescent has no useful center.'
   ]}],
 quiz:{title:'Quick check, clustering',questions:[
   {q:'k-means cannot find elongated clusters because:',
    options:['It assigns each point to exactly one cluster','Its objective is squared distance to a center','It converges before reaching them','It requires k to be known beforehand'],answer:1,whyWrong:['Hard assignment is what separates it from a GMM, and a GMM with round components has the same shape limitation.','','It converges to a genuine local optimum of its own objective. The objective is the problem.','Needing k in advance is a real inconvenience, and it has nothing to do with cluster shape.'],
    why:'Minimizing ‖x − μ‖² makes round, equally sized groups the only thing the objective rewards.'},
   {q:'DBSCAN differs from k-means most importantly by:',
    options:['Producing soft rather than hard assignments','Finding arbitrary shapes and labeling noise','Running faster on very large datasets','Guaranteeing the global optimum is found'],answer:1,whyWrong:['DBSCAN assigns hard labels. Soft assignment is what a GMM gives you.','','It is often slower, and speed is not why people reach for it.','Neither guarantees a global optimum. DBSCAN is deterministic given its parameters, which is a different thing.'],
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
 exs:[{title:'Overfit a degree-15 polynomial, then penalize it',
   lang:'python',
   packages:['scikit-learn','numpy'],
   prompt:`Twenty noisy points from a sine curve, and two pipelines that differ in exactly one
   thing: the second one penalizes the size of the coefficients. Both build the same fifteen
   polynomial features, and the unpenalized pipeline is written for you.
   <ol>
   <li><code>ridge</code>, that same pipeline with <code>Ridge(alpha=0.1)</code> in the last slot, fitted on the same twenty points,</li>
   <li><code>plain_test</code> and <code>ridge_test</code>, the mean squared error of each against the sine curve underneath,</li>
   <li><code>ridge_size</code>, the sum of the squared coefficients ridge ended up with, to compare against <code>plain_size</code>.</li>
   </ol>`,
   starter:`import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_squared_error

rng = np.random.RandomState(0)
x = np.sort(rng.uniform(-1, 1, 20))
y = np.sin(2.5 * x) + rng.normal(0, 0.1, 20)
X = x.reshape(-1, 1)

x_test = np.linspace(x.min(), x.max(), 200)
y_test = np.sin(2.5 * x_test)
X_test = x_test.reshape(-1, 1)

# 1) and 2) the same fifteen features, one penalized and one not
plain = make_pipeline(PolynomialFeatures(15), StandardScaler(), LinearRegression()).fit(X, y)
ridge =

# 3) error on the points it saw, and on the curve underneath
plain_train = mean_squared_error(y, plain.predict(X))
plain_test =
ridge_train = mean_squared_error(y, ridge.predict(X))
ridge_test =

# 4) how big did the coefficients get?
plain_size = float(np.sum(plain.named_steps['linearregression'].coef_ ** 2))
ridge_size =

print("unpenalized: train", round(plain_train, 5), "test", round(plain_test, 2))
print("ridge:       train", round(ridge_train, 5), "test", round(ridge_test, 5))
print("sum of squared coefficients:", round(plain_size, 1), "vs", round(ridge_size, 3))
`,
   solution:`import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.metrics import mean_squared_error

rng = np.random.RandomState(0)
x = np.sort(rng.uniform(-1, 1, 20))
y = np.sin(2.5 * x) + rng.normal(0, 0.1, 20)
X = x.reshape(-1, 1)

x_test = np.linspace(x.min(), x.max(), 200)
y_test = np.sin(2.5 * x_test)
X_test = x_test.reshape(-1, 1)

# 1) and 2) the same fifteen features, one penalized and one not
plain = make_pipeline(PolynomialFeatures(15), StandardScaler(), LinearRegression()).fit(X, y)
ridge = make_pipeline(PolynomialFeatures(15), StandardScaler(), Ridge(alpha=0.1)).fit(X, y)

# 3) error on the points it saw, and on the curve underneath
plain_train = mean_squared_error(y, plain.predict(X))
plain_test = mean_squared_error(y_test, plain.predict(X_test))
ridge_train = mean_squared_error(y, ridge.predict(X))
ridge_test = mean_squared_error(y_test, ridge.predict(X_test))

# 4) how big did the coefficients get?
plain_size = float(np.sum(plain.named_steps['linearregression'].coef_ ** 2))
ridge_size = float(np.sum(ridge.named_steps['ridge'].coef_ ** 2))

print("unpenalized: train", round(plain_train, 5), "test", round(plain_test, 2))
print("ridge:       train", round(ridge_train, 5), "test", round(ridge_test, 5))
print("sum of squared coefficients:", round(plain_size, 1), "vs", round(ridge_size, 3))
`,
   tests:[
     {d:'the unpenalized degree-15 fit reaches a training error of 0.0039, below the 0.01 variance of the noise it was fitting, so it fitted the noise',expr:'plain_train < 0.005'},
     {d:'and its test error is in the thousands: between the twenty points it oscillates violently',expr:'plain_test > 100'},
     {d:'ridge is worse on the training data, which is what paying for the penalty looks like',expr:'ridge_train > plain_train'},
     {d:'and about 0.004 on the test curve, which is what you get back for paying it',expr:'ridge_test < 0.01'},
     {d:'the unpenalized coefficients run into the billions, and the penalty is the only thing holding them down',expr:'plain_size > 1e6 and ridge_size < 10'},
     {d:'so the model that fits the data you have best is not the model that predicts best, and that gap is the entire reason regularization exists',expr:'plain_train < ridge_train and plain_test > 1000 * ridge_test'}
   ],
   hints:[
     'The second pipeline is identical apart from the last step: Ridge(alpha=0.1) instead of LinearRegression().',
     'mean_squared_error(y, model.predict(X)) for the training error, mean_squared_error(y_test, model.predict(X_test)) for the test error.',
     'named_steps is keyed by the lowercased class name, so the ridge estimator is ridge.named_steps under the key ridge, and its coef_ squared and summed gives ridge_size.'
   ]}],
 quiz:{title:'Quick check, regression',questions:[
   {q:'Ridge regression makes XᵀX invertible because it:',
    options:['Adds λI, lifting every eigenvalue','Uses gradient descent instead of a closed form','Removes the correlated features first','Standardizes the features beforehand'],answer:0,whyWrong:['','Ridge has a closed form too. The penalty is what makes the matrix invertible, not the solver.','Nothing is removed. Ridge keeps every feature and shrinks their coefficients.','Standardizing makes the penalty fair across features, and it does not fix a singular matrix.'],
    why:'(XᵀX + λI)⁻¹. The regularization and the numerical conditioning fix are literally the same operation.'},
   {q:'Lasso produces exactly-zero coefficients because:',
    options:['It uses absolute error rather than squared error','Its penalty grows faster than L2 does','It removes features before fitting begins','Its constraint region has corners on the axes'],answer:3,whyWrong:['The loss is still squared error. It is the penalty that uses absolute values.','L2 grows faster for large coefficients, since it is squared. L1 wins here on the shape of its constraint region.','Selection happens as a consequence of fitting, not before it begins.',''],
    why:'The diamond’s corners lie on the axes, so the contours very often first touch where a coordinate is zero.'},
   {q:'Gradient-boosted trees cannot extrapolate because:',
    options:['Their loss is only defined on training data','They overfit before reaching the boundary','Each leaf returns a constant learned from data','Boosting stops once residuals are small'],answer:2,whyWrong:['The loss is defined anywhere. It is the prediction that cannot leave the range of the leaf values.','Overfitting is a separate risk. Even a perfectly fitted ensemble is flat beyond the data.','','Boosting stops when you tell it to, and small residuals inside the data range say nothing about outside it.'],
    why:'The surface is piecewise constant. Outside the training range you get the nearest leaf’s value, unchanged forever.'}
 ]}}
]});

/* ============================== GLOSSARY ==============================
   The vocabulary MLDojo actually teaches, grouped by the stream that
   introduces it. Reference data plus the small renderer that reads it, kept
   apart from app.js because it changes for entirely different reasons.

   Rule for entries: define the term the way you would say it out loud to
   someone who has just met it, then add the one thing that is easy to get
   wrong. A definition that only makes sense once you already know the term
   is not doing any work. */
const GLOSS=[

{domain:'Python & Arrays',icon:'🐍',groups:[
 {h:'Language basics',terms:[
  ['List','An ordered, changeable sequence. Indexed from 0, so the last item of a list of three is at index 2. Negative indices count from the end, and nums[-1] is the idiom for "the last one".'],
  ['Slice','A sub-sequence, written nums[start:stop]. The start is included and the stop is not, which is why nums[1:4] gives you three items rather than four.'],
  ['Comprehension','Building a list from an expression and a loop in one line, as in [x*x for x in range(5)]. The most common single line of code in data work.'],
  ['Dictionary','A map from keys to values. Lookup is by key rather than position, and .items() gives you both at once, which is the everyday way to walk one.'],
  ['Tuple','Like a list but immutable. Used for fixed-size groupings such as a shape (150, 4), and for returning several values at once from a function.'],
  ['Set','An unordered collection with no duplicates. Membership testing is fast even with millions of items, which is what it is usually there for.'],
  ['f-string','A string with values dropped into it, written f"{n} words". The standard way to build text out of variables.'],
  ['Module','A single .py file you can import from. A package is a folder of them. The dots in sklearn.linear_model mirror the folder structure.'],
  ['Class','A bundle of state and the functions that operate on it. self is the automatic first parameter of every method and refers to the particular object.'],
  ['Dunder method','A name wrapped in double underscores, such as __init__. Python calls them for you at defined moments rather than you calling them by name.'],
 ]},
 {h:'NumPy',terms:[
  ['Array (ndarray)','A grid of numbers of one type, with a shape. The unit of nearly all numerical work in Python, and the reason the loop disappears from your code.'],
  ['Shape','The size along each dimension, as a tuple. (150, 4) means 150 rows and 4 columns. Most bugs in numerical code are shape bugs.'],
  ['Vectorisation','Expressing an operation over a whole array at once rather than looping. The loop still happens, in compiled C, which is routinely hundreds of times faster.'],
  ['Broadcasting','NumPy stretching a smaller array across a larger one so shapes line up, as when you subtract a length-4 mean vector from a 150-by-4 matrix.'],
  ['Boolean mask','An array of True and False used to select rows, as in X[X[:, 1] > 200]. A question asked of every row at once.'],
  ['Axis','Which direction an operation runs. axis=0 collapses rows and gives you one number per column, axis=1 does the reverse. Worth checking rather than guessing.'],
 ]},
]},

{domain:'Linear Algebra',icon:'📐',groups:[
 {h:'Objects',terms:[
  ['Vector','An ordered list of numbers, and equally a direction with a length. One data point with four measurements is a vector in four dimensions.'],
  ['Matrix','A grid of numbers, rows by columns. Usually either a dataset, one row per example, or a transformation applied to vectors.'],
  ['Transpose','Flipping rows and columns, written Xᵀ. Mostly bookkeeping so that shapes line up, but it is what makes XᵀX square and therefore invertible.'],
  ['Identity matrix','Ones on the diagonal, zeros elsewhere. Multiplying by it changes nothing, which is what makes it the "1" of matrix multiplication.'],
  ['Inverse','The matrix that undoes another, so A A⁻¹ = I. Exists only when the determinant is non-zero, and computing it explicitly is usually the wrong move numerically.'],
 ]},
 {h:'Operations and properties',terms:[
  ['Dot product','Multiply matching entries and add. Measures alignment: large and positive when two vectors point the same way, zero when they are perpendicular.'],
  ['Matrix multiplication','Each output entry is a dot product of a row with a column. Not commutative, so AB and BA are different matrices and often different shapes.'],
  ['Norm','How big a vector is. The L2 norm is ordinary length. The L1 norm is the sum of absolute values and is what makes Lasso produce exact zeros.'],
  ['Determinant','The factor by which a matrix scales area or volume. Zero means the transformation flattens space, information is lost, and there is no inverse.'],
  ['Rank','The number of genuinely independent directions in a matrix. Less than full rank means some columns are combinations of others, which is duplicated information.'],
  ['Linear independence','No vector in the set can be built from the others. Each one adds a direction that was not already available.'],
  ['Basis','A set of independent vectors that can build everything in the space. Changing basis is changing the coordinates you describe the same thing in.'],
  ['Eigenvector','A direction a matrix only stretches, never turns. Its eigenvalue is the stretch factor. PCA is the search for the eigenvectors of a covariance matrix.'],
  ['Orthogonal','Perpendicular, meaning a dot product of zero. An orthogonal matrix has perpendicular unit columns, so it rotates and reflects without stretching.'],
  ['Least squares','The closed-form solution to linear regression, w = (XᵀX)⁻¹Xᵀy. Geometrically it projects the target onto the space the features can reach.'],
 ]},
]},

{domain:'Calculus & Optimization',icon:'📈',groups:[
 {h:'Derivatives',terms:[
  ['Derivative','The slope of a function at a point, meaning how fast the output moves when you nudge the input. Everything about training reduces to reading slopes.'],
  ['Partial derivative','The slope with respect to one input while the others are held still. What you compute per weight when there are millions of them.'],
  ['Gradient','The vector of all partial derivatives. It points in the direction of steepest increase, which is why training steps go the other way.'],
  ['Directional derivative','The rate of change along a chosen direction u, equal to ∇fᵀu. Largest when u lines up with the gradient, which is what makes the gradient special.'],
  ['Chain rule','If A affects B and B affects C, then A\'s effect on C is the two effects multiplied. Applied backwards through a network it is called backpropagation.'],
  ['Hessian','The matrix of second derivatives. Describes curvature, tells a minimum from a saddle point, and is usually too large to form for a real model.'],
  ['Jacobian','The matrix of first derivatives when a function has several outputs as well as several inputs. One row per output.'],
 ]},
 {h:'Finding the best answer',terms:[
  ['Gradient descent','Measure the slope, step against it, repeat. The engine under nearly every model that learns, from linear regression to a transformer.'],
  ['Learning rate','The stride length of each step. Too small and training crawls, too large and it overshoots and diverges. The first hyperparameter to suspect.'],
  ['Local minimum','A point lower than everything nearby but not the lowest overall. Less of a problem in high dimensions than intuition suggests, where saddle points dominate.'],
  ['Convexity','A bowl shape, where any local minimum is the global one. Linear and logistic regression are convex, neural networks are not.'],
  ['Constrained optimization','Maximizing or minimizing subject to a rule you are not allowed to break, such as probabilities summing to one or a vector having unit length.'],
  ['Lagrange multiplier','The scalar λ in ∇f = λ∇g. At a constrained optimum the two gradients are parallel, and λ absorbs the difference in their lengths.'],
  ['Lagrangian','The combined function L(x, λ) = f(x) − λ(g(x) − c). Setting every partial derivative to zero recovers both the tangency condition and the constraint itself.'],
  ['Shadow price','The reading of λ as a sensitivity: how much the best achievable value would improve if the constraint were relaxed by one unit. Often the number you actually wanted.'],
  ['KKT conditions','The extension to inequality constraints. Adds λ ≥ 0 and complementary slackness, λg(x) = 0, which says every constraint is either tight or irrelevant.'],
  ['Complementary slackness','Either a constraint is active and its multiplier is positive, or it is slack and its multiplier is zero. This is why an SVM depends only on its support vectors.'],
  ['Constraint qualification','The regularity condition, usually linear independence of the constraint gradients, that the Lagrange theorem needs. Without it the multipliers may not exist.'],
 ]},
 {h:'Logarithms',terms:[
  ['Logarithm','The power you raise a base to in order to get a number. log10(1000) = 3. Turns multiplication into addition, which is why it is everywhere in probability.'],
  ['Natural log','Log to base e. The one calculus prefers, because the derivative of ln x is exactly 1/x with no constant left over.'],
  ['Log-likelihood','The log of a product of probabilities, so a sum instead of a product. Taken because multiplying thousands of small numbers underflows to zero.'],
 ]},
]},

{domain:'Probability & Statistics',icon:'🎲',groups:[
 {h:'Foundations',terms:[
  ['Random variable','A quantity whose value depends on a random outcome. Discrete if it takes separate values, continuous if it takes any value in a range.'],
  ['Probability mass function (PMF)','For a discrete variable, the probability of each individual value. The values sum to one.'],
  ['Probability density function (PDF)','For a continuous variable, a curve whose area gives probability. The density at a point is not a probability and can exceed one.'],
  ['Cumulative distribution function (CDF)','F(x) = P(X ≤ x). Non-decreasing, runs from 0 to 1, and is the derivative relationship\'s other side: the PDF is its slope.'],
  ['Expectation','The long-run average, weighted by probability. Linear, so E[aX + bY] = aE[X] + bE[Y] whether or not X and Y are related.'],
  ['Variance','The average squared distance from the mean. How spread out the values are. Its square root, the standard deviation, is in the same units as the data.'],
  ['Covariance','How two variables move together. Positive when they rise together, negative when one rises as the other falls, zero when there is no linear relationship.'],
  ['Correlation','Covariance rescaled to lie between −1 and 1, so it can be compared across quantities measured in different units.'],
  ['Covariance matrix','All the pairwise covariances in one grid, with the variances on the diagonal. Symmetric, positive semi-definite, and the object PCA decomposes.'],
  ['Independence','Knowing one variable tells you nothing about the other, so P(A,B) = P(A)P(B). Stronger than zero correlation, which only rules out a linear relationship.'],
  ['Conditional probability','P(A|B), the probability of A given that B happened. The vertical bar is read "given".'],
  ['Bayes\' theorem','P(A|B) = P(B|A)P(A)/P(B). The rule for turning a likelihood into a posterior, and the reason a rare disease with an accurate test still yields mostly false positives.'],
  ['Marginalisation','Summing or integrating a joint distribution over one variable to get rid of it. How you go from p(x, z) to p(x).'],
 ]},
 {h:'Distributions',terms:[
  ['Bernoulli','One trial with two outcomes. One parameter p, mean p, variance p(1−p), largest when p is one half.'],
  ['Binomial','The number of successes in n independent Bernoulli trials. Mean np.'],
  ['Categorical','One draw from k outcomes with probabilities that sum to one. The distribution a softmax output layer represents.'],
  ['Poisson','Counts of events in a fixed interval when they occur independently at a constant rate. Mean and variance are both λ.'],
  ['Uniform','Every value in a range equally likely. The default when you want to express no preference.'],
  ['Exponential','The waiting time until the next event in a Poisson process. Memoryless, meaning how long you have already waited tells you nothing.'],
  ['Gaussian (normal)','The bell curve, parameterized by mean and variance. Appears everywhere because of the central limit theorem, and because it is the maximum-entropy distribution for a given mean and variance.'],
  ['Multivariate Gaussian','The Gaussian in several dimensions, with a mean vector and a covariance matrix. The covariance sets the orientation and width of the elliptical contours.'],
  ['Central limit theorem','Sums of many independent contributions tend toward a Gaussian regardless of what they were drawn from. Why measurement error is so often bell-shaped.'],
  ['Mahalanobis distance','Distance measured in units of standard deviation per direction, using Σ⁻¹. The right notion of "far" when the variables are correlated.'],
 ]},
 {h:'Inference and estimation',terms:[
  ['Likelihood','The probability of the observed data viewed as a function of the parameters. Not a probability distribution over the parameters, which is the usual confusion.'],
  ['Maximum likelihood (MLE)','Choosing the parameters that make the observed data most probable. Least squares is MLE under Gaussian noise, which is why the squared error is not arbitrary.'],
  ['Prior and posterior','What you believed before seeing the data, and what you believe after. Bayes\' theorem is the update rule between them.'],
  ['Latent variable','Something you never observe but which explains what you do observe, such as which component of a mixture produced a point.'],
  ['Mixture model','A distribution built by picking a component at random and then drawing from it. A Gaussian mixture can fit shapes no single Gaussian can.'],
  ['Expectation maximization (EM)','Alternating between guessing the latent variables given the parameters, and re-fitting the parameters given those guesses. Each round provably does not decrease the likelihood.'],
  ['Responsibility','In EM, the soft assignment of a data point to a component, meaning the posterior probability that the component produced it.'],
  ['Monte Carlo estimate','Approximating an expectation by sampling and averaging. Error falls like one over the square root of the number of samples, regardless of dimension.'],
  ['Entropy','The average surprise of a distribution, measured in bits or nats. Maximal when everything is equally likely, zero when one outcome is certain.'],
  ['Cross-entropy','The average cost of using the wrong distribution to encode outcomes drawn from the right one. The loss function of every classifier you will build.'],
  ['KL divergence','How far one distribution is from another, equal to cross-entropy minus entropy. Never negative, zero only when they match, and not symmetric.'],
 ]},
]},

{domain:'Machine Learning Concepts',icon:'🤖',groups:[
 {h:'The setup',terms:[
  ['Supervised learning','Learning from examples that come with the right answer attached. Classification when the answer is a category, regression when it is a number.'],
  ['Unsupervised learning','Learning structure from data with no answers attached. Clustering, dimensionality reduction, density estimation.'],
  ['Semi-supervised learning','Using a small labeled set together with a large unlabeled one. Worth reaching for when labels are the expensive part, which is most of the time.'],
  ['Self-supervised learning','Making labels out of the data itself, such as hiding a word and predicting it. How large language models are pretrained.'],
  ['Feature','One measured input, one column of the data. Feature engineering is choosing and constructing them, and it decides more outcomes than model choice does.'],
  ['Label (target)','The answer you are trying to predict, written y. One per example in supervised learning.'],
  ['Training, validation and test sets','Fit on training, choose hyperparameters on validation, and touch test once at the end. Looking at test while iterating quietly turns it into a validation set.'],
  ['Cross-validation','Rotating which slice is held out and averaging the results. Gives a more stable estimate than one split, and is what you use when the dataset is small.'],
  ['Hyperparameter','A setting you choose rather than learn, such as the learning rate, k, or the depth of a tree. Chosen on validation data, never on test.'],
 ]},
 {h:'Fit and generalization',terms:[
  ['Overfitting','Learning the noise as well as the signal. Training error keeps falling while validation error turns upward, which is the shape to watch for.'],
  ['Underfitting','The model is too simple to capture the pattern, so both training and validation error stay high. Fixed by more capacity or better features, not more data.'],
  ['Bias-variance trade-off','Error decomposes into bias, systematic wrongness from too simple a model, and variance, sensitivity to which data you happened to get.'],
  ['Regularization','Anything that penalizes complexity to improve generalization. L2 shrinks weights toward zero, L1 drives some of them exactly to zero.'],
  ['Generalization','Performance on data the model has not seen. The only thing that matters, and the only thing training error does not measure.'],
  ['Data augmentation','Making more training examples by transforming the ones you have in ways that leave the label unchanged. Cheap capacity against overfitting.'],
  ['Transfer learning','Starting from a model trained on a large dataset and fine-tuning it on your small one. Usually the right first move when data is scarce.'],
  ['Curse of dimensionality','In high dimensions everything is far from everything else and volume concentrates in the corners. Why distance-based methods degrade as features multiply.'],
  ['Class imbalance','One class vastly outnumbering another, so accuracy becomes meaningless. Judge with precision, recall and the confusion matrix instead.'],
  ['Leakage','Information from the answer sneaking into the features, or from test into training. Produces results that look excellent and do not survive deployment.'],
 ]},
 {h:'Measuring it',terms:[
  ['Loss function','The number training minimizes. Mean squared error for regression, cross-entropy for classification. It is the specification, so choose it deliberately.'],
  ['Accuracy','The fraction predicted correctly. Fine on balanced data and actively misleading on imbalanced data.'],
  ['Precision and recall','Precision is how often a positive prediction is right. Recall is how much of the positive class you found. Moving the threshold trades one for the other.'],
  ['F1 score','The harmonic mean of precision and recall, used when you need one number and both matter.'],
  ['Confusion matrix','Predicted against actual, counted. The first thing to look at when a classifier disappoints, because it shows which mistake is being made.'],
  ['ROC and AUC','The curve of true positive rate against false positive rate across thresholds, and the area under it. AUC is threshold-free, and it flatters models on imbalanced data.'],
  ['Baseline','The trivial predictor you must beat: the majority class, or the mean. A model that cannot beat it has learned nothing, and this check catches a lot.'],
 ]},
]},

{domain:'Classic Models',icon:'🧰',groups:[
 {h:'Regression',terms:[
  ['Linear regression','Fits a straight line or hyperplane by minimizing squared error. Has a closed-form solution and remains the right answer more often than people expect.'],
  ['Polynomial regression','Linear regression on powers of the features. Still linear in the parameters, which is why the same machinery works, and it overfits quickly as the degree rises.'],
  ['Ridge regression','Linear regression with an L2 penalty on the weights. Shrinks them toward zero, handles correlated features, and always has a unique solution.'],
  ['Lasso','Linear regression with an L1 penalty. The corner geometry of the constraint drives some weights to exactly zero, so it selects features as well as fitting.'],
  ['Elastic net','L1 and L2 penalties together. Keeps Lasso\'s sparsity while handling groups of correlated features more gracefully.'],
  ['Logistic regression','Classification despite the name. Puts a sigmoid on a linear score to produce a probability, and is trained with cross-entropy rather than squared error.'],
  ['Softmax regression','Logistic regression for more than two classes. Produces a probability per class, and they sum to one.'],
 ]},
 {h:'Classifiers',terms:[
  ['k-nearest neighbors (k-NN)','Classify by a vote of the k closest training points. No training phase at all, and it degrades badly as dimensions grow.'],
  ['Naive Bayes','Applies Bayes\' theorem while pretending the features are independent given the class. The assumption is false and it works anyway, especially on text.'],
  ['Decision tree','A sequence of threshold questions ending in a prediction. Readable by a human, and prone to overfitting unless the depth is limited.'],
  ['Random forest','Many trees on bootstrap samples with random feature subsets, averaged. Reduces variance sharply and is a strong default on tabular data.'],
  ['Gradient boosting','Trees fitted in sequence, each one correcting the residual errors of those before it. The usual winner on tabular problems.'],
  ['Support vector machine (SVM)','Finds the boundary with the widest margin. The dual formulation touches the data only through inner products, which is what allows the kernel trick.'],
  ['Support vector','A training point sitting on the margin, the only kind with a non-zero multiplier. Delete every other point and the boundary is identical.'],
  ['Kernel trick','Computing inner products in a high-dimensional space without ever going there. Buys curved boundaries from a linear algorithm.'],
 ]},
 {h:'Unsupervised',terms:[
  ['k-means','Alternates assigning points to the nearest center and moving each center to the mean of its points. Fast, and it assumes clusters are round and similarly sized.'],
  ['Gaussian mixture model (GMM)','Clustering with soft assignments, fitted by EM. Each cluster is a Gaussian with its own shape, so it handles elongated and overlapping clusters that k-means cannot.'],
  ['Hierarchical clustering','Repeatedly merging the closest clusters to build a tree. You choose the number of clusters after seeing the tree rather than before.'],
  ['DBSCAN','Density-based clustering. Finds clusters of any shape, needs no cluster count, and labels sparse points as noise rather than forcing them somewhere.'],
  ['Principal component analysis (PCA)','Finds the directions of greatest variance, which turn out to be the eigenvectors of the covariance matrix. The constrained-optimization problem behind it is solved with a Lagrange multiplier.'],
  ['Explained variance','The share of the total variance a component captures, equal to its eigenvalue over the sum of all of them. How you decide where to truncate.'],
  ['t-SNE and UMAP','Non-linear methods for projecting to two dimensions for viewing. Distances between well-separated clusters in the picture are not meaningful.'],
 ]},
]},

{domain:'Neural Networks',icon:'🧠',groups:[
 {h:'Building blocks',terms:[
  ['Neuron','A weighted sum of inputs plus a bias, passed through one function. Not a small brain. If you can multiply and add you already understand it.'],
  ['Weight and bias','The numbers a network learns. The weight scales an input, the bias shifts the output so the fit need not pass through the origin.'],
  ['Activation function','The non-linearity after the weighted sum. Without one, stacking layers collapses to a single linear layer no matter how many you use.'],
  ['ReLU','max(0, x). Cheap, does not saturate for positive inputs, and is the default hidden activation. Its dead-unit failure mode is why leaky variants exist.'],
  ['Sigmoid','Squashes any number into (0, 1). Used for a binary probability output, and avoided in hidden layers because its gradient vanishes at both ends.'],
  ['Softmax','Turns a vector of scores into a probability distribution over classes. Paired with cross-entropy, the combined gradient simplifies to prediction minus target.'],
  ['Layer','A group of neurons applied together, expressed as one matrix multiply plus a bias vector. Depth is how many of these are stacked.'],
  ['Parameter and hyperparameter','Parameters are learned by training. Hyperparameters are chosen by you. Counting the first tells you model size, choosing the second takes most of the time.'],
 ]},
 {h:'Training',terms:[
  ['Forward pass','Running the input through the network to get a prediction and a loss.'],
  ['Backpropagation','Applying the chain rule backwards through the network so every weight gets its gradient in one sweep rather than one sweep per weight.'],
  ['Epoch, batch, iteration','An epoch is one pass over the data, a batch is the subset used for one update, and an iteration is one update. Batch size trades noise against hardware efficiency.'],
  ['Stochastic gradient descent (SGD)','Gradient descent on a batch rather than the whole dataset. The noise is not only tolerable, it helps escape poor regions.'],
  ['Momentum','Accumulating a running average of past gradients so the step keeps some of its previous direction. Smooths oscillation across narrow valleys.'],
  ['Adam','Per-parameter step sizes from running averages of the gradient and its square, with a bias correction for the first few steps. The usual default optimizer.'],
  ['Vanishing and exploding gradients','Gradients shrinking or growing multiplicatively through depth. The reason for ReLU, careful initialization, normalization layers and residual connections.'],
  ['Initialization','The starting values of the weights. Scaled to keep signal variance stable through depth, and getting it wrong stops training before it starts.'],
  ['Batch normalization','Normalizing activations within a batch, then rescaling with learned parameters. Speeds up training and adds a little regularization as a side effect.'],
  ['Dropout','Randomly zeroing units during training so the network cannot depend on any one of them. Off at inference.'],
  ['Early stopping','Halting when validation error stops improving. The simplest regularization there is, and often the most effective.'],
 ]},
 {h:'Architectures',terms:[
  ['Perceptron','The 1958 single-layer model. Can only separate linearly separable data, which is what the XOR objection was about and what killed the first wave of the field.'],
  ['Multilayer perceptron (MLP)','Fully connected layers stacked with non-linearities between them. A universal approximator in principle, which says nothing about whether training will find the function.'],
  ['Convolution','Sliding a small set of weights across the input and computing a dot product at each position. The same feature detector everywhere, which is where the parameter saving comes from.'],
  ['Kernel (filter)','The small weight patch a convolution slides. Learned, not designed, and early layers reliably learn edge detectors.'],
  ['Stride and padding','How far the filter moves each step, and whether the edges are extended so the output keeps its size.'],
  ['Pooling','Downsampling a feature map, usually by taking the maximum in each window. Shrinks the representation and adds a little tolerance to position.'],
  ['Receptive field','How much of the original input a given unit can see. Grows with depth, which is why deep stacks capture large structures.'],
  ['Recurrent network (RNN)','Processes a sequence one step at a time, carrying a hidden state. Struggles with long dependencies, which LSTMs and GRUs partly address with gates.'],
  ['Attention','Letting every position look directly at every other and weight what it finds by relevance. Removes the distance penalty that recurrence imposes.'],
  ['Transformer','Attention plus feed-forward layers, with no recurrence, so the sequence is processed in parallel. The architecture behind modern language models.'],
  ['Embedding','A learned vector representing a discrete item such as a word. Similar items end up near each other because they are used in similar contexts.'],
  ['Residual connection','Adding a layer\'s input to its output so the gradient has a direct path backwards. What made networks hundreds of layers deep trainable.'],
 ]},
]},

{domain:'Reinforcement Learning',icon:'🕹',groups:[
 {h:'The setup',terms:[
  ['Agent and environment','The learner and the world it acts in. The agent picks actions, the environment returns a state and a reward, and that loop is the entire framework.'],
  ['State','What the agent can see now. Markov if it is enough to predict what comes next, so that the history adds nothing.'],
  ['Action','What the agent can do. The set may be discrete, continuous, or dependent on the state.'],
  ['Reward','The scalar the environment returns after an action. Evaluative rather than instructive: it scores what you did without saying what you should have done.'],
  ['Policy','The agent\'s behavior, a rule from states to actions. Deterministic or a distribution over actions. It is the thing you are actually trying to learn.'],
  ['Episode','One run from a start state to a terminal state. Continuing tasks have none, which is why the discount factor is not optional there.'],
  ['Return','The discounted sum of future rewards from here on. What the agent maximizes, and not the same thing as the next reward.'],
  ['Discount factor (γ)','How much future reward is worth now. Sets the planning horizon at roughly 1/(1−γ) steps, and it is a modeling decision rather than a knob.'],
  ['Markov decision process (MDP)','The formal object: states, actions, transition probabilities, rewards and a discount factor. Every algorithm in the field solves one, exactly or approximately.'],
  ['Credit assignment','Working out which earlier action is responsible for a reward arriving now. Most RL machinery exists to push that signal backwards in time.'],
 ]},
 {h:'Values and learning',terms:[
  ['Value function V(s)','The expected return from a state under a given policy. A state is not good in the abstract, only good if you play well from there.'],
  ['Action-value Q(s,a)','The expected return from taking an action and following the policy after. More useful than V for acting, because choosing the best action needs no model.'],
  ['Bellman equation','The value of where you are is the reward you get next plus the discounted value of where you land. Turns an exponential lookahead into one equation per state.'],
  ['Contraction','The property that each application of the Bellman operator shrinks the worst-case error by γ. It is why bootstrapping converges, and it is lost under function approximation.'],
  ['Policy iteration and value iteration','The two dynamic programming algorithms. Both need the model. One evaluates to convergence then improves, the other folds the improvement into every sweep.'],
  ['Monte Carlo methods','Estimate values by averaging returns from complete episodes. Unbiased, model-free, high variance, and unusable in a task that never ends.'],
  ['Temporal difference (TD)','Update from one step plus your own estimate of where you landed. No model and no waiting for the episode to end.'],
  ['TD error (δ)','r + γV(s′) − V(s). The surprise, meaning how much better or worse the step turned out than expected. Dopamine neurons appear to encode something very like it.'],
  ['Bootstrapping','Updating an estimate using another estimate. It works because each update also carries one real observed reward.'],
  ['SARSA','On-policy TD control, using the action actually taken next. Learns the value of the policy it is running, exploration and mistakes included.'],
  ['Q-learning','Off-policy TD control, using the best available next action. Learns the optimal policy from non-optimal experience, which is what makes replay buffers legitimate.'],
  ['On-policy and off-policy','Whether you learn about the policy you are following, or about a different one. Off-policy is what allows learning from logs, demonstrations, or another agent.'],
 ]},
 {h:'Modern methods',terms:[
  ['Exploration versus exploitation','Take what looks best, or take what you know less about. Every RL algorithm answers this somehow, and there is no way to have both.'],
  ['Multi-armed bandit','One state, several actions, no transitions. The cleanest setting for studying exploration, and the right model for a great many problems mislabeled as RL.'],
  ['Regret','How much worse you did than always taking the best action. Sublinear regret is the goal, and fixed ε-greedy does not achieve it.'],
  ['ε-greedy','Take the best action most of the time and a random one otherwise. Crude, effective, and usually decayed over training.'],
  ['Upper confidence bound (UCB)','Choose by an optimistic bound rather than the estimate, so uncertainty itself attracts attention. Achieves logarithmic regret, and drives the tree search in AlphaGo.'],
  ['Thompson sampling','Draw once from each arm\'s posterior and take the highest draw. Exploration falls out of the Bayesian bookkeeping with no parameter to tune.'],
  ['Deadly triad','Function approximation, bootstrapping and off-policy training. Any two are safe, all three together can diverge, and DQN is all three at once.'],
  ['Experience replay','Training on random minibatches from a buffer of past transitions. Decorrelates the data and reuses each transition many times. Only valid off-policy.'],
  ['Target network','A frozen copy of the network used to compute targets, refreshed periodically. Holds the regression target still so each interval is an ordinary supervised problem.'],
  ['Policy gradient','Optimizing the policy parameters directly by gradient ascent on expected return. The score function identity is what makes the gradient estimable by sampling.'],
  ['REINFORCE','If the episode went well make those actions more likely, otherwise less likely. Unbiased and very noisy.'],
  ['Baseline and advantage','Subtracting a state-dependent baseline changes nothing in expectation and cuts variance sharply. With V(s) as the baseline the weight becomes the advantage.'],
  ['Actor-critic','A policy that acts and a value function that evaluates. The TD error serves as the advantage, so the actor can update after one step.'],
  ['PPO','Policy gradient with a clipped probability ratio, so one update cannot move the policy too far. Not the most sample-efficient method, but the most forgiving, which is why it is the default.'],
  ['RLHF','Learning a reward model from human preference rankings, then optimizing the policy against it with PPO and a KL penalty toward the starting model.'],
  ['Reward hacking','Finding behavior that scores well under the reward function and is not what anyone meant. The reward function is the specification, and a capable optimizer will find where it comes apart from the intent.'],
 ]},
]},

];

/* ------------------------------ glossary view ------------------------------ */
function glossCount(d){return d.groups.reduce((a,g)=>a+g.terms.length,0);}
function glossTotal(){return GLOSS.reduce((a,d)=>a+glossCount(d),0);}
function renderGlossary(){
  cur={si:-4,li:-1};
  const total=glossTotal();
  const jump=GLOSS.map((d,i)=>`<button class="glossJump" onclick="glossJumpTo(${i})">${ico(d.icon)} ${esc(d.domain)} <span class="glossJumpN">${glossCount(d)}</span></button>`).join('');
  const body=GLOSS.map((d,i)=>`<details class="glossDom" id="gd${i}" open>
    <summary class="glossSum">${ico(d.icon)} ${esc(d.domain)}<span class="glossDomN">${glossCount(d)} terms</span></summary>
    ${d.groups.map(g=>`<div class="glossGrp">${esc(g.h)}</div><dl class="glossList">${g.terms.map(t=>`<div class="glossItem"><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`).join('')}</dl>`).join('')}
  </details>`).join('');
  document.getElementById('main').innerHTML=`
  <h1 class="lessonTitle">${ico('\u{1F4D6}')} Glossary</h1>
  <div class="lessonBody">
  <p>${total} terms, in the order the dojo teaches them. Every entry is written to be readable
  before you know the term, not after. If a definition here only makes sense once you already
  understand it, that is a bug worth reporting.</p>
  <div class="glossToolbar">
    <input id="glossSearch" class="glossSearch" placeholder="Filter ${total} terms…" oninput="filterGloss(this.value)" aria-label="Filter glossary terms">
    <button class="glossBtn" onclick="glossToggleAll(true)">Expand all</button>
    <button class="glossBtn" onclick="glossToggleAll(false)">Collapse all</button>
  </div>
  <div class="glossJumps">${jump}</div>
  <div id="glossBody">${body}</div>
  </div>`;
  document.getElementById('main').scrollTop=0;
  renderNav();
}
function glossJumpTo(i){
  const d=document.getElementById('gd'+i);
  if(d){d.open=true;d.scrollIntoView({behavior:'smooth',block:'start'});}
}
function glossToggleAll(open){
  document.querySelectorAll('#main .glossDom').forEach(d=>{d.open=open;});
}
function filterGloss(q){
  q=(q||'').trim().toLowerCase();
  document.querySelectorAll('#main .glossDom').forEach(dom=>{
    let domHits=0;
    dom.querySelectorAll('.glossList').forEach(list=>{
      let listHits=0;
      list.querySelectorAll('.glossItem').forEach(it=>{
        const hit=!q||it.textContent.toLowerCase().includes(q);
        it.style.display=hit?'':'none';
        if(hit)listHits++;
      });
      list.style.display=listHits?'':'none';
      const grp=list.previousElementSibling;
      if(grp&&grp.classList.contains('glossGrp'))grp.style.display=listHits?'':'none';
      domHits+=listHits;
    });
    dom.style.display=domHits?'':'none';
    if(q)dom.open=true;
  });
}

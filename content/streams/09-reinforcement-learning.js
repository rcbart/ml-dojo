STREAMS.push({icon:'🕹',track:'ML & AI Track',title:'Reinforcement Learning: learning from consequences',blurb:'The third kind of machine learning. Nobody tells the agent the right answer, it has to work out which of its own choices paid off, sometimes long after it made them. From the one-armed bandit to the algorithm that fine-tunes language models.',requires:'nn4',requiresName:'Neural Networks (through how a network learns)',lessons:[

{id:'rl0',
 title:'What reinforcement learning is, and why it is not supervised learning',
 body:`
<div class="ground"><span class="gTag">🎯 Nobody hands you the answers</span>
<p>Supervised learning gets a stack of examples with the right answer written next to each one.
Unsupervised learning gets a stack of examples with no answers and looks for structure.
<b>Reinforcement learning gets neither.</b> It gets a world it can act in, and a number that
occasionally tells it how well things are going. It has to work out for itself which of its own
past choices earned that number.</p></div>

<h3>The loop, which is the whole setup</h3>
<p>An <b>agent</b> observes the <b>state</b> of an <b>environment</b>, picks an <b>action</b>,
and the environment responds with a <b>reward</b> and a new state. Then it happens again. That
is the entire framework, and everything in this stream is a different answer to one question:
given only that loop, how do you get better at it?</p>
<div class="figure"><svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A loop: the agent sends an action to the environment, the environment returns a state and a reward to the agent">
  <rect x="40" y="60" width="140" height="70" rx="10" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
  <text x="110" y="100" font-size="15" fill="#4c1d95" text-anchor="middle" font-weight="600">Agent</text>
  <rect x="262" y="60" width="140" height="70" rx="10" fill="#ccfbf1" stroke="#0f766e" stroke-width="2"/>
  <text x="332" y="94" font-size="15" fill="#134e4a" text-anchor="middle" font-weight="600">Environment</text>
  <text x="332" y="113" font-size="11" fill="#134e4a" text-anchor="middle">(the world, or a simulator)</text>
  <path d="M 180 80 L 258 80" stroke="#e2711d" stroke-width="2.2" fill="none" marker-end="url(#rlah)"/>
  <text x="219" y="70" font-size="12" fill="#b45309" text-anchor="middle">action a</text>
  <path d="M 262 118 L 184 118" stroke="#0f766e" stroke-width="2.2" fill="none" marker-end="url(#rlah2)"/>
  <text x="223" y="140" font-size="12" fill="#0f766e" text-anchor="middle">state s, reward r</text>
  <defs>
    <marker id="rlah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#e2711d"/></marker>
    <marker id="rlah2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0f766e"/></marker>
  </defs>
</svg><div class="figCap">One step of the loop. Run it a few million times and the agent is supposed to get good.</div></div>

<h3>Three things that make this genuinely harder</h3>
<p><b>The feedback is evaluative, not instructive.</b> A supervised label says "the answer was
cat". A reward says "that went 3 units well". It never tells you what you should have done
instead, so you cannot compute an error and correct toward it. You can only try things and
compare.</p>
<p><b>The reward is delayed.</b> In chess the only unambiguous signal arrives at move sixty, and
the move that actually decided the game was move twelve. Working out which earlier choices
deserve the credit is called the <b>credit assignment problem</b>, and most of the algorithms in
this stream exist to solve it.</p>
<p><b>Your data depends on your behaviour.</b> Supervised learning gets a fixed dataset. An RL
agent generates its own, and a bad policy visits bad states and learns from them. If it never
tries the corridor on the left it will never find out the treasure is down there. That tension
has a name, <b>exploration versus exploitation</b>, and it gets its own lesson.</p>

<div class="demystify"><b>"Reinforcement" is borrowed from animal psychology.</b> Thorndike's
law of effect, 1911: behaviour followed by a satisfying result becomes more likely to recur.
Skinner built a career on it. The computational version keeps the name and the shape of the
idea, and drops the biology. When you read that an agent was "rewarded", nothing was
experienced. A number was added to a running total.</div>

<h3>Where it earns its keep, and where it does not</h3>
<p>RL is the right tool when the thing you want cannot be demonstrated, only judged.
Nobody can label the correct action for every board position in Go, but anyone can score the
final position, and that was enough for AlphaGo. Nobody can write down the correct torque for
every joint angle of a walking robot, but you can measure how far it got. Nobody can label the
single best reply to a prompt, but a person can say which of two replies they prefer, which is
the whole basis of RLHF at the end of this stream.</p>
<p>It is the wrong tool when a labelled dataset already exists or could exist. RL is spectacularly
sample-hungry: the Atari results that made the field famous needed tens of millions of frames to
learn games a person picks up in ten minutes. If you can pose your problem as supervised
learning, do that instead. Reach for RL when you genuinely cannot.</p>

<div class="hardidea">🧠 <b>The reward function is the specification, and it is where the bodies
are buried.</b> You are not telling the agent what to do, you are telling it what to score, and
it will find the highest-scoring behaviour whether or not that behaviour is what you meant. A
boat-racing agent trained on race score famously discovered it could ignore the race entirely
and spin in a lagoon collecting respawning pickups forever. It was not broken. It won. Every
practitioner has a story like this, and they all start with a reward function that seemed
obviously fine.</div>

<h3>What you should be able to say now</h3>
<p>RL learns from consequences rather than from answers. The signal is evaluative, delayed, and
generated by the agent's own behaviour. That combination is what makes it a separate field with
its own machinery, rather than supervised learning with extra steps.</p>
`,
 docs:[['Sutton and Barto, Reinforcement Learning: An Introduction, the standard text and free online','http://incompleteideas.net/book/the-book-2nd.html']],
 quiz:{title:'Quick check, what makes RL different',questions:[
   {q:'The core difference between a reward and a supervised label is that:',
    options:[
             'A reward arrives from a human annotator while a label is generated by a program',
             'A reward is optional during training whereas a label is required for every example',
             'A reward is always a single scalar while a label can be a vector of any width','A reward scores what you did without saying what you should have done instead'],answer:3,whyWrong:['Both can come from either place. A reward can be computed by a program and a label can come from an annotator.','Neither is optional. An agent with no reward signal has nothing to learn from at all.','Rewards are scalar by convention, but that is a fact about shape rather than the difference that matters.',''],
    why:'Evaluative rather than instructive feedback. You cannot subtract a reward from a target to get an error, so you have to compare outcomes across attempts instead.'},
   {q:'The credit assignment problem is:',
    options:[
             'Attributing a model failure to either the data or the choice of architecture','Deciding how to divide a reward between several agents acting at the same time',
             'Working out which of many earlier actions is responsible for a reward arriving now',
             'Choosing which training examples deserve a larger weight in the loss function'],answer:2,whyWrong:['That is model debugging. The RL version is about time: which of your own earlier actions earned this.','That is multi-agent credit assignment, a real problem, and the basic one already appears with a single agent.','','That is example weighting in supervised learning, which needs labels you do not have here.'],
    why:'The move that decided the chess game was move twelve, and the signal shows up at move sixty. Most of RL is machinery for pushing that signal backwards in time.'},
   {q:'Why is an RL agent said to generate its own training data?',
    options:[
             'Because the states it sees depend on the actions its current policy chooses',
             'Because data augmentation is standard practice in every RL pipeline',
             'Because rewards have to be synthesised whenever the environment does not supply one','Because simulators are cheaper to run than collecting real measurements'],answer:0,whyWrong:['','Augmentation stretches a fixed dataset. The point here is that the dataset is not fixed.','The environment supplies the reward. What the agent generates is the states and actions it visits.','Cost is a reason to prefer simulators, not the reason the data distribution moves with the policy.'],
    why:'A policy that never turns left never learns what is down the left corridor. The data distribution moves as the policy does, which is why exploration is a first-class concern.'},
   {q:'You have a large labelled dataset for your task. Should you use RL?',
    options:[
             'Yes, because RL can optimise the metric you care about rather than a proxy loss',
             'No, RL is far more sample-hungry and supervised learning already fits the problem',
             'Only after converting the labels into rewards so the agent can rank them','Yes, RL generalises better than supervised learning on the same data'],answer:1,whyWrong:['You can optimise the metric directly, and it is still the wrong trade when labels give a stronger signal per example.','','Converting labels to rewards throws information away. A label says what the answer was, a reward only scores what you did.','There is no such generalisation advantage. RL usually needs far more data to reach the same place.'],
    why:'RL is what you reach for when demonstrations do not exist and outcomes can only be judged. With labels in hand you already have the stronger signal.'}
 ]}}
,

{id:'rl1',
 title:'The vocabulary: states, actions, returns, and why the future is discounted',
 body:`
<div class="ground"><span class="gTag">🎯 Six words, and one of them is doing the real work</span>
<p>Every RL paper uses the same handful of terms. Learn them once here and the notation in the
rest of the stream reads itself. Five are straightforward. The sixth, the <b>return</b>, is the
one that carries all the difficulty, because it is about the future rather than the present.</p></div>

<h3>The five easy ones</h3>
<ul>
<li><b>State</b> <code>s</code>: what the agent can see right now. Board position, joint angles,
the current screen. Written <code>s<sub>t</sub></code> for the state at time step t.</li>
<li><b>Action</b> <code>a</code>: what it can do. Move left, bid 40, apply 2 newton-metres.
The set of legal actions may depend on the state.</li>
<li><b>Reward</b> <code>r</code>: the scalar the environment hands back after an action. It can
be zero for a long time, and usually is.</li>
<li><b>Policy</b> <code>&pi;</code>: the agent's behaviour, a rule from states to actions.
Deterministic, <code>a = &pi;(s)</code>, or stochastic,
<code>&pi;(a|s)</code>, a probability over actions. <b>The policy is the thing you are
actually trying to learn.</b> Everything else is scaffolding for improving it.</li>
<li><b>Episode</b>: one run from a start state to a terminal state. One game, one delivery, one
conversation. Some problems have no terminal state and simply continue, which matters more than
it sounds.</li>
</ul>

<h3>The hard one: the return</h3>
<p>The agent should not maximise the next reward, it should maximise the total reward from here
on. That total has a name, the <b>return</b>:</p>
<div class="mathblock">G<sub>t</sub> = r<sub>t+1</sub> + r<sub>t+2</sub> + r<sub>t+3</sub> + &hellip;</div>
<p>Which is fine for a game of chess and immediately broken for anything that does not end. A
thermostat runs forever, so that sum is infinite for every policy, and comparing two infinities
tells you nothing. Every policy is equally good, which is obviously wrong.</p>
<p>The fix is to shrink each future reward by a constant factor per step:</p>
<div class="mathblock">G<sub>t</sub> = r<sub>t+1</sub> + &gamma;r<sub>t+2</sub> + &gamma;&sup2;r<sub>t+3</sub> + &hellip; = &Sigma;<sub>k=0..&infin;</sub> &gamma;<sup>k</sup> r<sub>t+k+1</sub>&nbsp;&nbsp;&nbsp;&nbsp;0 &le; &gamma; &lt; 1</div>
<p><code>&gamma;</code> is the <b>discount factor</b>. If every reward is bounded by
<code>R<sub>max</sub></code>, the sum is bounded by
<code>R<sub>max</sub>/(1&minus;&gamma;)</code>, which is finite. That is the mathematical reason
it exists, and it is not the interesting one.</p>

<h3>What γ actually chooses</h3>
<p><code>&gamma;</code> sets how far ahead the agent cares. Read
<code>1/(1&minus;&gamma;)</code> as a rough planning horizon in steps:</p>
<div class="mathblock">&gamma; = 0&nbsp;&nbsp;&nbsp;&rarr;&nbsp; horizon 1 step&nbsp;&nbsp;&nbsp;&nbsp;purely greedy, next reward only
&gamma; = 0.9&nbsp;&rarr;&nbsp; horizon about 10 steps
&gamma; = 0.99&nbsp;&rarr;&nbsp; horizon about 100 steps
&gamma; = 0.999 &rarr;&nbsp; horizon about 1000 steps</div>
<p>This is a modelling decision disguised as a hyperparameter, and getting it wrong looks like an
algorithm failure. Too low and the agent will not accept a small cost now for a large payoff
later, which is exactly the behaviour you wanted. Too high and the return becomes a nearly flat
sum over thousands of steps, the differences between good and bad policies shrink into the
noise, and learning slows to a crawl. Choose it by asking how many steps separate an action from
its consequence in <i>your</i> problem, then set <code>&gamma;</code> so that horizon fits
comfortably inside it.</p>

<div class="worked"><b>Why the discount changes the answer.</b>
<p>Two doors. Door A pays 1 immediately and ends the episode. Door B pays 0 for four steps and
then pays 10.</p>
<div class="mathblock">&gamma; = 0.5&nbsp;&nbsp;&nbsp;A: 1&nbsp;&nbsp;&nbsp;B: 0.5&#8308; &times; 10 = 0.625&nbsp;&nbsp;&rarr;&nbsp; take A
&gamma; = 0.9&nbsp;&nbsp;&nbsp;A: 1&nbsp;&nbsp;&nbsp;B: 0.9&#8308; &times; 10 = 6.56&nbsp;&nbsp;&nbsp;&rarr;&nbsp; take B</div>
<p>Same environment, same rewards, opposite optimal policy. If your agent is being myopic and you
are hunting for a bug in the update rule, check <code>&gamma;</code> first.</p></div>

<h3>Two flavours of problem</h3>
<p><b>Episodic</b> tasks end. Chess, a maze, a delivery route. The return is a finite sum and
you can set <code>&gamma; = 1</code> if you want, treating all future reward equally.</p>
<p><b>Continuing</b> tasks do not end. Server autoscaling, portfolio management, a thermostat.
Here <code>&gamma; &lt; 1</code> is not optional, it is what makes the objective well defined.
The alternative formulation, maximising average reward per step, exists and is used in some
operations-research settings, but discounting is the default everywhere in this stream.</p>

<div class="hardidea">🧠 <b>Discounting is not "money is worth more today".</b> That analogy is
everywhere and it misleads. In finance the discount rate reflects a real interest rate. In RL
<code>&gamma;</code> mostly encodes uncertainty and horizon: a reward five hundred steps away is
downweighted because the world may have changed, the episode may have ended, and your estimate
of it is bad anyway. A useful way to read it: at each step, the episode continues with
probability <code>&gamma;</code>. Under that reading the discounted return is exactly the
expected undiscounted return of an episode with a geometric length. Same formula, and now the
number means something you can reason about.</div>

<h3>Notation you will meet</h3>
<div class="mathblock">S, A&nbsp;&nbsp;&nbsp;&nbsp;the sets of states and actions
s<sub>t</sub>, a<sub>t</sub>, r<sub>t+1</sub>&nbsp;&nbsp;&nbsp;&nbsp;state and action at t, and the reward they produce
&pi;(a|s)&nbsp;&nbsp;&nbsp;&nbsp;the policy, a distribution over actions given a state
G<sub>t</sub>&nbsp;&nbsp;&nbsp;&nbsp;the discounted return from t onward
&gamma;&nbsp;&nbsp;&nbsp;&nbsp;the discount factor</div>
<p>The reward index catches people out. <code>r<sub>t+1</sub></code>, not
<code>r<sub>t</sub></code>, because the reward arrives <i>after</i> the action, as a response
from the environment. Sutton and Barto are strict about this and so is most of the literature.</p>
`,
 quiz:{title:'Quick check, returns and discounting',questions:[
   {q:'Why does the discount factor exist at all?',
    options:['To slow learning early on, so the policy does not change too fast','To normalise rewards onto a common scale across environments','To keep the return finite, and to set how far ahead the agent looks','To offset the fact that early rewards are estimated less accurately'],answer:2,whyWrong:['The learning rate controls how fast the policy changes. The discount controls how far ahead it looks.','Reward scaling is done by clipping or normalising. The discount rescales nothing.','','It is the later rewards that are uncertain, and those are the ones the discount shrinks.'],
    why:'Without it, every policy in a continuing task scores infinity and none can be preferred. The horizon reading, roughly 1/(1−γ) steps, is what you actually tune against.'},
   {q:'Your agent keeps taking small immediate rewards and ignoring a large payoff twenty steps away. The first thing to check is:',
    options:[
             'The exploration schedule, which is probably decaying too quickly',
             'The network capacity, which is probably too small to represent the policy','The learning rate, which is probably too large for the reward scale',
             'The discount factor, which is probably too low for that horizon'],answer:3,whyWrong:['Faster decay shows up as a policy stuck on one action, not as one that consistently prefers near reward to far reward.','Capacity limits what the policy can express. Preferring the near payoff is a statement about the objective instead.','A learning rate that is too large usually shows up as instability or divergence rather than steady myopia.',''],
    why:'At γ = 0.9 a reward twenty steps out is worth 0.12 of its face value. Myopia is a γ symptom far more often than an algorithm bug.'},
   {q:'γ = 0.99 corresponds to roughly what planning horizon?',
    options:['About ten steps','About one thousand steps','About one hundred steps','About ten thousand steps'],answer:2,whyWrong:['Ten steps is γ = 0.9.','One thousand steps is γ = 0.999.','','Ten thousand steps would need γ = 0.9999, which is rare and usually a sign the problem needs restating.'],
    why:'1/(1 − γ) = 100. Useful as a sanity check: compare it against how many steps separate a decision from its consequence in your problem.'},
   {q:'Writing the reward as r_{t+1} rather than r_t is meant to signal that:',
    options:[
             'The reward is the environment responding to the action, so it belongs to the next tick',
             'Rewards and states are stored in separate buffers with offset indices','Rewards are always delayed by exactly one step in every environment',
             'The agent cannot observe the reward until the following episode begins'],answer:0,whyWrong:['','Nothing about storage is implied. The index records when the reward is produced, not where it is kept.','There is no fixed one-step delay. Rewards are often sparse and arrive many steps later.','The agent sees the reward immediately. The index just records that it came after the action.'],
    why:'Action at t, response at t+1. Getting the index wrong is a common source of off-by-one bugs when you implement the update rules later in this stream.'}
 ]}}
,

{id:'rl2',
 title:'Markov decision processes: the formal object underneath all of it',
 body:`
<div class="ground"><span class="gTag">🎯 One assumption buys you the whole theory</span>
<p>Everything so far was description. This lesson names the mathematical object, the <b>Markov
decision process</b>, and states the one assumption that makes it tractable. Every algorithm in
the rest of the stream is a way of solving an MDP, either exactly or approximately.</p></div>

<h3>The Markov property, in plain English</h3>
<p>A state is <b>Markov</b> if it contains everything you need to predict what happens next. The
history that got you there adds nothing. Formally:</p>
<div class="mathblock">P(s<sub>t+1</sub>, r<sub>t+1</sub> | s<sub>t</sub>, a<sub>t</sub>) = P(s<sub>t+1</sub>, r<sub>t+1</sub> | s<sub>t</sub>, a<sub>t</sub>, s<sub>t-1</sub>, a<sub>t-1</sub>, &hellip;, s<sub>0</sub>, a<sub>0</sub>)</div>
<p>A chess position is Markov, near enough. Where the pieces are is all you need, and the order
they arrived in does not change what is legal or what is good. A single frame of Pong is
<b>not</b> Markov, because the frame shows where the ball is but not which way it is moving. Two
identical-looking frames can demand opposite actions.</p>
<p>That example also shows the standard repair. The original DQN paper stacked the last four
frames and called the stack the state. Velocity is recoverable from four frames, so the stacked
state is Markov even though a single frame is not. <b>When the Markov property fails, the usual
fix is to put more history into the state rather than to abandon the framework.</b></p>

<h3>The formal object</h3>
<p>A finite MDP is a five-tuple <code>(S, A, P, R, &gamma;)</code>:</p>
<div class="mathblock">S&nbsp;&nbsp;&nbsp;&nbsp;a finite set of states
A&nbsp;&nbsp;&nbsp;&nbsp;a finite set of actions
P(s&prime; | s, a)&nbsp;&nbsp;&nbsp;&nbsp;transition probabilities, the dynamics
R(s, a, s&prime;)&nbsp;&nbsp;&nbsp;&nbsp;the expected reward for that transition
&gamma; &isin; [0, 1)&nbsp;&nbsp;&nbsp;&nbsp;the discount factor</div>
<p><code>P</code> and <code>R</code> together are the <b>model</b> of the environment. Whether
you have them is the single biggest fork in this stream:</p>
<ul>
<li><b>Model known.</b> You can compute the answer by dynamic programming without ever acting.
That is the next lesson, policy iteration and value iteration.</li>
<li><b>Model unknown.</b> You have to learn from experience. That is everything after it:
Monte Carlo, temporal difference, Q-learning, policy gradients. This is the realistic case.</li>
</ul>

<div class="demystify"><b>"Stochastic" here means the world, not the agent.</b> Two different
things in RL can be random and the notation looks similar. <code>&pi;(a|s)</code> random means the
agent deliberately varies its choices, usually to explore. <code>P(s&prime;|s,a)</code> random
means the environment does not always do the same thing when you take the same action: the robot
wheel slips, the market moves, the opponent picks something else. You can have either without
the other.</div>

<h3>What "solving" an MDP means</h3>
<p>Find a policy that maximises the expected return from every state. Two facts about MDPs make
this a well-posed problem rather than an open-ended search, and both are worth holding onto.</p>
<p><b>An optimal deterministic policy always exists.</b> For a finite MDP with
<code>&gamma; &lt; 1</code> there is at least one policy <code>&pi;*</code> that is at least as
good as every other policy in <i>every</i> state simultaneously, and it needs no randomness. So
when you see a stochastic policy in later lessons, it is there for exploration or because the
state is not really Markov, not because randomness is required for optimality.</p>
<p><b>The optimal policy depends only on the current state.</b> It does not need the history and
it does not need a clock. That is the Markov property paying for itself: it collapses the search
from "a rule over every possible history" to "one action per state", which is a finite table.</p>

<h3>Partial observability, briefly</h3>
<p>When the agent sees an <b>observation</b> rather than the true state, you have a POMDP, and
the guarantees above weaken considerably: the optimal policy may need memory, and it may need to
be stochastic. Poker is the standard example, where you cannot see the opponent's cards and any
deterministic strategy can be read and exploited. In practice most systems handle this with the
frame-stacking trick, or by feeding a recurrent network the observation sequence and letting the
hidden state stand in for a belief state.</p>

<div class="hardidea">🧠 <b>Most real RL failures are state-representation failures.</b> Before
blaming the algorithm, ask whether your state is Markov. If two situations that look identical
to the agent demand different actions, no algorithm in this stream can succeed, because you have
asked it to learn a function that is not a function. Debugging usually means adding to the state:
velocities, recent history, elapsed time, inventory, whatever you forgot.</div>
`,
 quiz:{title:'Quick check, MDPs',questions:[
   {q:'A state is Markov when:',
    options:['Every action taken from it leads to exactly one successor state',
             'It is enough to predict what comes next, so the history adds nothing',
             'It can be represented as a single integer index into a lookup table',
             'It is reachable from the start state by at least one sequence of actions'],answer:1,whyWrong:['That is determinism, a different property. A Markov state can have several possible successors.','','The representation can be a vector or an image. What matters is whether more history would change the prediction.','Reachability says the state can occur. It says nothing about whether it summarises the past.'],
    why:'Determinism is not required, and the state can be a huge vector. What matters is that conditioning on more history would not change the prediction.'},
   {q:'A single frame of Pong is not Markov. The standard repair is to:',
    options:[
             'Stack several recent frames and treat the stack as the state',
             'Slow the simulator down so the ball moves less between frames',
             'Add the reward from the previous step to the observation vector','Give the network more layers so it can infer velocity from one frame'],answer:0,whyWrong:['','Slowing the simulator changes the frame rate, not the fact that a single frame carries no velocity.','The previous reward tells you nothing about which way the ball is moving.','No amount of depth recovers information the input does not contain.'],
    why:'Velocity is recoverable from four consecutive frames. When Markov fails, the usual fix is to put the missing information into the state rather than to change algorithm.'},
   {q:'Knowing P and R (the model) matters because:',
    options:['It lets you solve the MDP by computation, without acting in the world at all',
             'It is what allows the reward signal to be delayed across many steps',
             'It removes the need to choose a discount factor for the problem',
             'It guarantees the optimal policy will be stochastic rather than deterministic'],answer:0,whyWrong:['','Delayed reward is handled by the return and the Bellman recursion, with or without a model.','You still have to choose γ. That is a modelling decision independent of knowing the dynamics.','For a finite MDP the optimal policy can always be taken deterministic, model or no model.'],
    why:'With the model, dynamic programming computes the answer directly. Without it you have to sample experience, which is the rest of the stream.'},
   {q:'For a finite MDP with γ < 1, the optimal policy:',
    options:['Must be stochastic in order to keep exploring the state space',
             'Depends on the full history of states and actions seen so far',
             'Can always be taken to be deterministic and to depend only on the current state',
             'Exists only when every state can reach a terminal state'],answer:2,whyWrong:['Exploration is a training concern. The optimal policy itself needs no randomness in a finite MDP.','The Markov property is exactly what removes the need for history.','','Continuing tasks with no terminal state still have an optimal policy, which is what γ < 1 buys you.'],
    why:'That is what makes the problem finite and searchable. Stochastic policies appear later for exploration, or because the state is not genuinely Markov.'}
 ]}}
,

{id:'rl3',
 title:'Value functions and the Bellman equation, the recursion at the centre of the field',
 body:`
<div class="ground"><span class="gTag">🎯 How good is it to be here?</span>
<p>You cannot improve a policy without a way to say which states and actions are better. That
measure is the <b>value function</b>, and it satisfies a recursion that almost every algorithm in
RL is a version of. If you take one equation from this stream, take this one.</p></div>

<h3>Two value functions</h3>
<p>The <b>state-value</b> function says how good it is to be in state s and follow policy
&pi; from there. The <b>action-value</b> function says how good it is to take action a in
state s and follow &pi; afterwards:</p>
<div class="mathblock">V<sup>&pi;</sup>(s) = E<sub>&pi;</sub>[ G<sub>t</sub> | s<sub>t</sub> = s ]
Q<sup>&pi;</sup>(s, a) = E<sub>&pi;</sub>[ G<sub>t</sub> | s<sub>t</sub> = s, a<sub>t</sub> = a ]</div>
<p>Both are expectations, because the environment and possibly the policy are random. And both
are tied to a specific policy, which is easy to forget: a state is not good in the abstract, it
is good <i>if you play well from here</i>. The same board position is worth very different
amounts to a grandmaster and to a beginner.</p>
<p><b>Q is the more useful of the two in practice,</b> for a reason worth stating plainly. If you
have <code>V</code> and want to act, you need to know where each action leads, which means you
need the model. If you have <code>Q</code>, you compare
<code>Q(s, a)</code> across the available actions and pick the best. No model needed. That single
fact is why Q-learning became the workhorse of model-free RL.</p>

<h3>The Bellman equation</h3>
<p>Here is the idea in one sentence, before any notation. <b>The value of where you are is the
reward you get next, plus the discounted value of wherever you end up.</b> The future is not one
enormous sum to evaluate, it is one step plus the same problem again.</p>
<div class="mathblock">V<sup>&pi;</sup>(s) = &Sigma;<sub>a</sub> &pi;(a|s) &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a) [ R(s,a,s&prime;) + &gamma; V<sup>&pi;</sup>(s&prime;) ]</div>
<p>Read it right to left and it is exactly the sentence. Take the reward for this transition, add
the discounted value of the state you land in, average over where the environment might put you,
then average over what your policy might do. The same relation for Q:</p>
<div class="mathblock">Q<sup>&pi;</sup>(s,a) = &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a) [ R(s,a,s&prime;) + &gamma; &Sigma;<sub>a&prime;</sub> &pi;(a&prime;|s&prime;) Q<sup>&pi;</sup>(s&prime;,a&prime;) ]</div>

<div class="worked"><b>Deriving it, which takes two lines.</b>
<p>Start from the definition and peel the first term off the return:</p>
<div class="mathblock">G<sub>t</sub> = r<sub>t+1</sub> + &gamma;r<sub>t+2</sub> + &gamma;&sup2;r<sub>t+3</sub> + &hellip;
&nbsp;&nbsp;&nbsp;&nbsp;= r<sub>t+1</sub> + &gamma;( r<sub>t+2</sub> + &gamma;r<sub>t+3</sub> + &hellip; )
&nbsp;&nbsp;&nbsp;&nbsp;= r<sub>t+1</sub> + &gamma; G<sub>t+1</sub></div>
<p>Take expectations of both sides conditioned on <code>s<sub>t</sub> = s</code>, use the tower
property of expectation on the second term, and <code>E[G<sub>t+1</sub>]</code> given the next
state is by definition <code>V<sup>&pi;</sup>(s&prime;)</code>. That is the whole derivation. The
recursion is not a clever trick, it is the geometric structure of the discounted sum.</p></div>

<h3>Why this is such a big deal</h3>
<p>Without the recursion, evaluating a policy means simulating every possible future and
averaging, which is exponential in the horizon and hopeless. With it, you have one linear
equation per state. For a finite MDP that is a linear system in
<code>|S|</code> unknowns:</p>
<div class="mathblock">v = r<sup>&pi;</sup> + &gamma;P<sup>&pi;</sup>v&nbsp;&nbsp;&nbsp;&rarr;&nbsp;&nbsp;&nbsp;v = (I &minus; &gamma;P<sup>&pi;</sup>)<sup>-1</sup> r<sup>&pi;</sup></div>
<p>The inverse exists whenever <code>&gamma; &lt; 1</code>, because <code>P<sup>&pi;</sup></code>
is a stochastic matrix, so its spectral radius is 1 and <code>&gamma;P<sup>&pi;</sup></code> has
spectral radius <code>&gamma; &lt; 1</code>. The discount factor is not just a modelling choice,
it is what makes the algebra work.</p>

<h3>Iterative policy evaluation</h3>
<p>Inverting an <code>|S| &times; |S|</code> matrix is fine for a gridworld and out of the
question for anything real. So instead, turn the equation into an assignment and apply it over
and over:</p>
<div class="mathblock">V<sub>k+1</sub>(s) &larr; &Sigma;<sub>a</sub> &pi;(a|s) &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a)[ R + &gamma;V<sub>k</sub>(s&prime;) ]</div>
<p>Start from anything, apply the update to every state, repeat. This converges to
<code>V<sup>&pi;</sup></code> from any starting point, and the reason is the piece of theory worth
knowing.</p>

<h3>Why it converges: the Bellman operator is a contraction</h3>
<p>Write the update as an operator <code>T<sup>&pi;</sup></code> acting on value functions. The
claim is that it shrinks distances:</p>
<div class="mathblock">&#8214; T<sup>&pi;</sup>u &minus; T<sup>&pi;</sup>v &#8214;<sub>&infin;</sub> &le; &gamma; &#8214; u &minus; v &#8214;<sub>&infin;</sub></div>
<p>where <code>&#8214;&middot;&#8214;<sub>&infin;</sub></code> is the largest difference at any
single state. The proof is short: the rewards cancel when you subtract, leaving
<code>&gamma;</code> times an average of differences, and an average is never larger than the
maximum. So each sweep multiplies the worst-case error by at most <code>&gamma;</code>.</p>
<p>Banach's fixed point theorem then gives you everything at once: a unique fixed point exists,
iteration converges to it from any starting value, and the error falls geometrically. That fixed
point is <code>V<sup>&pi;</sup></code>. This one argument underwrites value iteration,
Q-learning, and the convergence proofs for most of the tabular methods in this stream.</p>

<div class="hardidea">🧠 <b>The contraction is why bootstrapping works at all.</b> Every method
from here on updates an estimate using another estimate, which sounds like it should compound
errors and diverge. It does not, in the tabular case, precisely because each application shrinks
the error by γ. Once you leave the tabular case and approximate the value function with a
network, the contraction guarantee goes away. That is not a footnote, it is the root of the
instability that DQN had to engineer around, and it comes back in the function-approximation
lesson under the name "the deadly triad".</div>
`,
 exs:[{title:'Solve a two-state MDP by iterating the Bellman equation',
   lang:'python',
   prompt:`Two states, <code>A</code> and <code>B</code>, one action each, so the policy is
   fixed and you are only evaluating it. From <code>A</code> you always go to <code>B</code> and
   collect reward 1. From <code>B</code> you always go to <code>A</code> and collect reward 3.
   Use <code>gamma = 0.9</code>.<br><br>
   Apply the Bellman update <code>V(s) &larr; r + &gamma;V(s&prime;)</code> to both states
   200 times, starting from zero, and store the results in <code>vA</code> and <code>vB</code>.
   Then compute <code>check</code>, the residual <code>vA - (1 + gamma*vB)</code>, which should
   be essentially zero once you have reached the fixed point.`,
   starter:`gamma = 0.9

# reward, and the state you land in
# A --(r=1)--> B
# B --(r=3)--> A

vA = 0.0
vB = 0.0

for _ in range(200):
    # update BOTH from the previous values, then swap them in
    new_vA = 0.0
    new_vB = 0.0
    vA, vB = new_vA, new_vB

check = 0.0

print(vA, vB, check)
`,
   tests:[
     {d:'V(A) converges to about 19.47',expr:'abs(vA - 19.4737) < 0.01'},
     {d:'V(B) converges to about 20.53',expr:'abs(vB - 20.5263) < 0.01'},
     {d:'the Bellman residual at A is essentially zero, so this really is the fixed point',expr:'abs(check) < 1e-6'},
     {d:'B is worth more than A, because the larger reward comes sooner from B',expr:'vB > vA'}
   ],
   hints:[
     'new_vA = 1 + gamma * vB, because from A you collect 1 and land in B.',
     'new_vB = 3 + gamma * vA, by the same reading of the arrows.',
     'check = vA - (1 + gamma * vB). At the fixed point the two sides of the Bellman equation agree, so this is zero.'
   ]}],
 quiz:{title:'Quick check, values and Bellman',questions:[
   {q:'Q(s,a) is more useful than V(s) for acting because:',
    options:[
             'It is defined without reference to any particular policy','It is a smaller table and therefore cheaper to store in memory',
             'It converges faster than V under the same iterative update rule',
             'Choosing the best action needs no model, you just compare Q across actions'],answer:3,whyWrong:['Q carries a policy superscript too. Only Q* is policy-free, and then only because the optimum defines it.','Q is the larger table, one entry per state-action pair rather than one per state.','Convergence speed is not the distinction. Both satisfy the same kind of contraction.',''],
    why:'To act greedily on V you must know where each action leads, which means knowing P. Q has the action already folded in, which is what makes model-free control possible.'},
   {q:'In one sentence, the Bellman equation says:',
    options:['The value of a state is the reward now plus the discounted value of the next state',
             'The value of a state is the average reward collected over a complete episode',
             'The value of a state equals the value of the best action available from it',
             'The value of a state decays geometrically with the number of steps taken'],answer:0,whyWrong:['','That is the Monte Carlo estimate of a value, not the recursion that defines it.','That is the Bellman optimality equation, which uses a max. The plain one averages over the policy.','Values do not decay with time. It is the future rewards inside the return that are discounted.'],
    why:'One step plus the same problem again. That recursion turns an exponential lookahead into one linear equation per state.'},
   {q:'Iterative policy evaluation converges from any starting values because:',
    options:[
             'The Bellman operator is a γ-contraction, so each sweep shrinks the worst-case error',
             'The rewards are bounded, which forces the estimates into a fixed interval','The value function is convex in the policy parameters',
             'Every state is visited infinitely often as the sweeps continue'],answer:0,whyWrong:['','Bounded rewards keep the values finite, which is necessary and not enough to give a unique fixed point.','Policy evaluation does not optimise over policies at all, so convexity in them is beside the point.','Infinite visits matter for sampled methods. Policy evaluation sweeps every state by construction.'],
    why:'Contraction plus Banach gives a unique fixed point and geometric convergence to it. This one argument underwrites most of the tabular convergence results.'},
   {q:'V^π(s) is written with a superscript π because:',
    options:[
             'It distinguishes the estimated value from the true value of the state',
             'The superscript records how many iterations of the update have been applied',
             'A state has no value in the abstract, only under a specified way of playing on','π indicates which discount factor was used in the calculation'],answer:2,whyWrong:['An estimate is usually marked with a hat rather than a superscript.','Iteration counts are written as a subscript, as in V_k.','','γ is a separate symbol and appears in the equation itself.'],
    why:'The same chess position is worth different amounts to a grandmaster and a beginner. Dropping the superscript is a common source of confusion when comparing algorithms.'}
 ]}}
,

{id:'rl4',
 title:'Optimality: the Bellman optimality equation, policy iteration and value iteration',
 body:`
<div class="ground"><span class="gTag">🎯 From evaluating a policy to finding the best one</span>
<p>The last lesson worked out how good a given policy is. This one finds the best policy there
is. Two algorithms do it, both are short, and both assume you know the model. That assumption is
unrealistic, which is the point: understand the exact solution first, then every method after
this is a way of approximating it from experience.</p></div>

<h3>One change to the equation</h3>
<p>The Bellman equation averaged over what the policy might do. The optimal policy does not
average, it takes the best. Replace the sum over actions with a max:</p>
<div class="mathblock">V*(s) = max<sub>a</sub> &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a) [ R(s,a,s&prime;) + &gamma; V*(s&prime;) ]
Q*(s,a) = &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a) [ R(s,a,s&prime;) + &gamma; max<sub>a&prime;</sub> Q*(s&prime;,a&prime;) ]</div>
<p>These are the <b>Bellman optimality equations</b>. Note what changed and what did not: the
recursion is the same shape, but the equation is no longer linear, because <code>max</code> is
not a linear operation. So you cannot solve it by matrix inversion any more. You iterate.</p>
<p>Once you have <code>Q*</code> the optimal policy is free:</p>
<div class="mathblock">&pi;*(s) = argmax<sub>a</sub> Q*(s,a)</div>
<p>Acting optimally is one greedy lookup. All the difficulty is in getting <code>Q*</code>.</p>

<h3>Policy iteration</h3>
<p>Two steps, alternated until nothing changes.</p>
<ol>
<li><b>Evaluate.</b> Given the current policy &pi;, compute <code>V<sup>&pi;</sup></code> by
iterating the Bellman equation to convergence, exactly as in the last lesson.</li>
<li><b>Improve.</b> Build a new policy that acts greedily with respect to that value function:
<code>&pi;&prime;(s) = argmax<sub>a</sub> &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a)[R + &gamma;V<sup>&pi;</sup>(s&prime;)]</code>.</li>
</ol>
<p>Repeat. When the improve step returns the policy you already had, stop: you are at the
optimum.</p>
<p>The step that makes this work is the <b>policy improvement theorem</b>, and it is worth
seeing because the argument recurs throughout RL. If <code>&pi;&prime;</code> is greedy with
respect to <code>V<sup>&pi;</sup></code>, then
<code>Q<sup>&pi;</sup>(s, &pi;&prime;(s)) &ge; V<sup>&pi;</sup>(s)</code> at every state, by
construction of the argmax. Unroll that inequality one step at a time and you get
<code>V<sup>&pi;&prime;</sup>(s) &ge; V<sup>&pi;</sup>(s)</code> everywhere. Greedy improvement
never makes things worse, at any state, ever. And because a finite MDP has finitely many
deterministic policies and each round strictly improves unless it has stopped, policy iteration
terminates at the exact optimum in a finite number of rounds.</p>

<h3>Value iteration</h3>
<p>Policy iteration runs an inner loop to convergence before improving. That turns out to be
wasteful: the intermediate value function is only ever used to decide an argmax, and the argmax
usually settles long before the numbers do. So collapse the two steps into one and fold the max
directly into the update:</p>
<div class="mathblock">V<sub>k+1</sub>(s) &larr; max<sub>a</sub> &Sigma;<sub>s&prime;</sub> P(s&prime;|s,a) [ R(s,a,s&prime;) + &gamma; V<sub>k</sub>(s&prime;) ]</div>
<p>No explicit policy at all during the run. Sweep until the values stop moving, then read the
policy off with one greedy pass at the end. The optimality operator is a &gamma;-contraction by
the same argument as before, since a max of contractions is a contraction, so this converges to
<code>V*</code> from any starting point.</p>

<div class="demystify"><b>The two are the same algorithm at different settings.</b> Policy
iteration evaluates to convergence then improves once. Value iteration improves every sweep, with
exactly one evaluation step in between. In between sits <b>modified policy iteration</b>, which
does k evaluation sweeps then improves. Nobody needs to memorise three algorithms, there is one
knob: how much evaluation you do before you act on it.</div>

<h3>Why this does not scale, and what survives</h3>
<p>Every sweep touches every state, so the cost is
<code>O(|S|&sup2;|A|)</code> per sweep. Backgammon has around 10<sup>20</sup> states. Go has more
positions than atoms in the observable universe. Sweeping the state space is not slow, it is
impossible, and this is Bellman's own phrase, the <b>curse of dimensionality</b>.</p>
<p>Three ideas survive intact and carry into everything that follows:</p>
<ul>
<li><b>Bootstrapping</b>: update an estimate using other estimates rather than waiting for a
final outcome. TD learning is this idea applied to sampled experience.</li>
<li><b>Generalised policy iteration</b>: any interleaving of "make the value function match the
policy" and "make the policy greedy for the value function" converges. Almost every RL algorithm
is an instance of this, including the actor-critic methods at the end of the stream.</li>
<li><b>Greedy improvement is safe</b>: acting greedily on a correct value function never hurts.
This is what licenses the argmax in Q-learning.</li>
</ul>

<div class="hardidea">🧠 <b>Asynchronous updates are allowed, and that is what makes the rest
possible.</b> Nothing in the convergence argument requires you to sweep states in order, or to
update them all equally often. As long as every state keeps being updated eventually, the
iteration still converges. That is the permission slip for everything that follows: a real agent
updates only the states it actually visits, in whatever order it happens to visit them, and the
theory holds.</div>
`,
 quiz:{title:'Quick check, optimality and dynamic programming',questions:[
   {q:'The Bellman optimality equation differs from the Bellman equation by:',
    options:[
             'Removing the discount factor, since the optimal policy needs no horizon',
             'Conditioning on the action as well as the state throughout',
             'Summing over states instead of over the possible successor states','Replacing the average over actions with a maximum, which makes it non-linear'],answer:3,whyWrong:['γ is still there. An optimal policy needs a horizon as much as any other.','That gives you Q rather than V, and it is a separate question from optimality.','Both equations sum over successor states. That part is unchanged.',''],
    why:'That max is why you can no longer solve it by matrix inversion. It is also what turns evaluation into optimisation.'},
   {q:'The policy improvement theorem guarantees that acting greedily on V^π gives a policy that:',
    options:[
             'Converges only if the discount factor is below one half','Is optimal after a single improvement step',
             'Improves the average return but may be worse in some individual states',
             'Is at least as good as π in every state, never worse in any of them'],answer:3,whyWrong:['There is no such restriction. The theorem holds for any γ below one.','One step improves, it does not usually reach the optimum. Policy iteration repeats until nothing changes.','The guarantee is stronger than that. It holds state by state, not only on average.',''],
    why:'Every state, not on average. That is what makes the argmax in Q-learning safe, and it is the argument that recurs throughout the field.'},
   {q:'Value iteration is preferred to policy iteration mainly because:',
    options:[
             'It is guaranteed to find a stochastic policy rather than a deterministic one',
             'It skips running evaluation to convergence before every improvement step',
             'It converges in a provably finite number of iterations while policy iteration does not','It does not require knowing the transition probabilities'],answer:1,whyWrong:['Both find deterministic policies. Neither produces randomness of its own.','','Policy iteration is the one with the finite-termination guarantee, since a finite MDP has finitely many deterministic policies.','Both need the model. Neither of them is model-free.'],
    why:'The intermediate values are only used to pick an argmax, and the argmax settles long before the numbers do. Both still need the model.'},
   {q:'Dynamic programming cannot be applied to Go because:',
    options:[
             'The reward is delayed until the end, which dynamic programming cannot handle',
             'The transition model is stochastic and dynamic programming assumes determinism','The game is not a Markov decision process, since players alternate',
             'Every sweep touches every state and the state space is astronomically large'],answer:3,whyWrong:['Delayed reward is what the Bellman recursion is for, and dynamic programming handles it exactly.','Dynamic programming handles stochastic transitions directly, by averaging over them.','Alternating play can be modelled as an MDP against a fixed opponent. Size is the obstacle, not turn-taking.',''],
    why:'The curse of dimensionality, Bellman\'s own phrase. Sampling only the states you actually visit is the escape route, and it is what the rest of the stream is about.'}
 ]}}
,

{id:'rl5',
 title:'Monte Carlo methods: learn from finished episodes',
 body:`
<div class="ground"><span class="gTag">🎯 The first method that needs no model</span>
<p>Dynamic programming needed <code>P</code> and <code>R</code>. You almost never have them. But
notice what the value function actually is: an <i>average</i> return. And there is an obvious way
to estimate an average without knowing any probabilities at all. Run the thing many times and
take the mean.</p></div>

<h3>The method, in full</h3>
<p>Play a complete episode using the current policy. Write down the sequence of states, actions
and rewards. Then walk backwards from the end computing the actual return that followed each
state, and average those returns across all the episodes you have run:</p>
<div class="mathblock">V(s) &larr; average of G<sub>t</sub> over every visit to s across all episodes</div>
<p>That is it. No transition probabilities, no reward function, no model of anything. The
environment can be a black box or the real world, and you are estimating an expectation the way
statistics has always estimated expectations, by sampling.</p>
<p>Two variants, and the distinction matters when a state recurs inside one episode.
<b>First-visit MC</b> averages the return following only the first time s appears in each
episode. <b>Every-visit MC</b> averages over every appearance. First-visit gives independent
samples and is the easier one to prove things about, and both converge to
<code>V<sup>&pi;</sup></code> as the number of visits grows.</p>

<div class="worked"><b>One episode, worked through.</b>
<p>States and rewards: <code>A &rarr;(r=0) B &rarr;(r=0) C &rarr;(r=10) end</code>, with
<code>&gamma; = 0.9</code>. Walk backwards, keeping a running return:</p>
<div class="mathblock">G after C = 10
G after B = 0 + 0.9 &times; 10 = 9
G after A = 0 + 0.9 &times; 9 = 8.1</div>
<p>Three data points from one episode, and A gets credit for a reward it never touched. The
backwards pass is doing the credit assignment, at a cost of one multiply per step.</p></div>

<h3>Incremental form, which you will see everywhere</h3>
<p>Storing every return to average them is wasteful. The running mean has a standard incremental
form, and it is worth writing out because its shape recurs in every update rule from here on:</p>
<div class="mathblock">V(s) &larr; V(s) + (1/N(s)) [ G<sub>t</sub> &minus; V(s) ]</div>
<p>Read it as: nudge the estimate toward the sample, by an amount proportional to how wrong it
was. Replace <code>1/N(s)</code> with a fixed step size <code>&alpha;</code> and you get a
running average that forgets old data, which is what you want in a non-stationary problem, and
which is exactly the form every update in the rest of this stream takes:</p>
<div class="mathblock">NewEstimate &larr; OldEstimate + &alpha; [ Target &minus; OldEstimate ]</div>

<h3>What is good about it, and what is not</h3>
<p><b>Unbiased.</b> Each return is an actual sample of the thing you are estimating. Nothing is
assumed, nothing bootstraps off another guess, so there is no systematic error to accumulate.</p>
<p><b>Indifferent to Markov violations.</b> Since it never uses a successor state's estimate, it
does not care whether the state representation is Markov. In a partially observed problem MC
often degrades more gracefully than the methods in the next lesson.</p>
<p><b>You can start anywhere.</b> To evaluate one state you simply run episodes from it. Nothing
requires you to compute values for the whole state space, which is a genuine advantage when only
a small part of it matters.</p>
<p>Now the costs. <b>You must wait for the end of the episode</b> before you can learn anything
at all, so a task with long episodes learns slowly, and a continuing task with no episodes cannot
use MC at all. <b>Variance is high</b>, because a single return is the sum of many random
rewards along one particular path, and that sum swings wildly from episode to episode. It is
unbiased but noisy, and you may need a great many episodes before the average settles.</p>

<h3>Control, and the exploration problem in the open</h3>
<p>To improve a policy rather than just evaluate one, estimate <code>Q</code> instead of
<code>V</code> and act greedily on it. That immediately exposes a problem you cannot dodge: a
greedy policy never takes an action it currently believes is bad, so it never gathers the
evidence that would change its mind. An action that looks poor from two unlucky samples is
abandoned forever.</p>
<p>The simplest fix is <b>&epsilon;-greedy</b>: take the greedy action with probability
1&minus;&epsilon;, and a uniformly random action otherwise. Crude, effective, and still the
default in a lot of production code. The next lesson but one treats exploration properly.</p>

<div class="hardidea">🧠 <b>Bias and variance again, in a new costume.</b> Monte Carlo is
unbiased with high variance: it uses the real outcome, and the real outcome is noisy. Dynamic
programming was biased with zero variance: it used an estimate, and estimates are wrong but
stable. That is the trade-off the whole field lives on, and the next lesson introduces the method
that sits between the two and, in practice, beats both.</div>
`,
 quiz:{title:'Quick check, Monte Carlo',questions:[
   {q:'Monte Carlo methods need no model because:',
    options:[
             'They assume every transition is equally likely across the state space',
             'They only ever visit states whose dynamics are already known','They estimate the transition probabilities from counts before evaluating',
             'They average actual returns from sampled episodes, which needs no probabilities'],answer:3,whyWrong:['Nothing is assumed about the transition probabilities, which is precisely the point.','It visits wherever the policy takes it, known dynamics or not.','That would be model-based learning. Monte Carlo skips the model entirely.',''],
    why:'A value function is an expectation, and sampling is how you estimate an expectation without knowing the distribution.'},
   {q:'The main practical limitation of Monte Carlo is that:',
    options:['It cannot handle stochastic environments, only deterministic ones',
             'It cannot learn until an episode finishes, so continuing tasks are out',
             'It requires the state representation to satisfy the Markov property',
             'It is biased, and the bias grows with the length of the episode'],answer:1,whyWrong:['Stochastic environments are fine. Averaging over episodes is exactly how that randomness is handled.','','Monte Carlo is the method that tolerates a non-Markov state best, since it never bootstraps off a successor.','It is unbiased. High variance is its cost, not bias.'],
    why:'It is unbiased and it tolerates non-Markov states rather well. Waiting for the end, and the variance that comes with a whole-episode return, are the real costs.'},
   {q:'In the update V ← V + α[G − V], the bracketed term is:',
    options:[
             'The discounted sum of all future rewards in the episode','The error between the sampled outcome and the current estimate',
             'The gradient of the loss with respect to the value parameters',
             'The difference between two consecutive state values'],answer:1,whyWrong:['That is G itself, which is one of the two terms rather than the difference between them.','','It plays the role of a gradient in the tabular case, and what it literally is is an error.','That is closer to the TD error, and even that needs a reward term as well.'],
    why:'Nudge toward the sample in proportion to how wrong you were. Every update rule in the rest of this stream has this shape.'},
   {q:'A greedy policy combined with Monte Carlo control fails because:',
    options:['Greedy policies are deterministic and Monte Carlo requires randomness to sample',
             'The value estimates converge too slowly for the argmax ever to stabilise',
             'It never retries an action that looked bad, so it never collects evidence to the contrary',
             'Averaging returns under a changing policy mixes samples from different distributions'],answer:2,whyWrong:['Determinism is not the problem in itself. The problem is that it stops gathering evidence.','The estimates converge fine for the actions it keeps trying. The abandoned ones never get sampled again.','','That is a real complication in on-policy Monte Carlo, and it is not what makes pure greediness fail.'],
    why:'Two unlucky samples can retire an action permanently. ε-greedy is the crude fix, and exploration gets its own lesson shortly.'}
 ]}}
,

{id:'rl6',
 title:'Temporal difference learning: the central idea in reinforcement learning',
 body:`
<div class="ground"><span class="gTag">🎯 Learn from a guess, before you know the outcome</span>
<p>Monte Carlo waits for the end of the episode to find out what actually happened. Dynamic
programming does not wait at all, but needs a model. <b>Temporal difference learning takes one
step, looks at where it landed, and updates immediately using its own estimate of that state.</b>
No model, no waiting. Sutton has called it the one idea most central to RL, and it is the piece
that most people find genuinely strange the first time.</p></div>

<h3>The update</h3>
<p>Monte Carlo moved the estimate toward the actual return <code>G<sub>t</sub></code>, which you
only know at the end. TD replaces that target with a one-step guess: the reward you just got,
plus your current estimate of where you landed.</p>
<div class="mathblock">MC:&nbsp;&nbsp;V(s<sub>t</sub>) &larr; V(s<sub>t</sub>) + &alpha;[ G<sub>t</sub> &minus; V(s<sub>t</sub>) ]
TD:&nbsp;&nbsp;V(s<sub>t</sub>) &larr; V(s<sub>t</sub>) + &alpha;[ r<sub>t+1</sub> + &gamma;V(s<sub>t+1</sub>) &minus; V(s<sub>t</sub>) ]</div>
<p>The bracketed quantity in the second line is the <b>TD error</b>, written &delta;:</p>
<div class="mathblock">&delta;<sub>t</sub> = r<sub>t+1</sub> + &gamma;V(s<sub>t+1</sub>) &minus; V(s<sub>t</sub>)</div>
<p>It is the surprise. How much better or worse did this step turn out than I expected? A
positive &delta; means things went better than predicted, so raise the value of where you were. A
negative &delta; means the opposite. That is the whole algorithm, and it runs online, one step at
a time, on a stream of experience that never has to end.</p>

<div class="demystify"><b>Bootstrapping means learning from a guess.</b> It sounds like it
should not work, and the objection is reasonable: you are updating one estimate toward another
estimate, and both are wrong. What saves it is that the target contains one piece of real
information, the observed reward <code>r<sub>t+1</sub></code>. Every update injects a little bit
of truth, and the &gamma;-contraction from the Bellman lesson spreads that truth backwards
through the estimates until they are consistent with it. Guesses corrected by facts, repeatedly,
converge on the facts.</div>

<h3>The driving-home example, which is the one that makes it click</h3>
<p>You leave the office predicting a thirty-minute drive. Five minutes in you hit unexpected
traffic and revise your arrival estimate upward by fifteen minutes.</p>
<p>Monte Carlo does nothing with that. It waits until you are actually home, then adjusts. TD
updates the moment you see the traffic, because the revised prediction <i>is</i> the evidence. You
did not need to arrive to learn that leaving at that hour is worse than you thought.</p>
<p>People do this constantly and it is obviously the right behaviour. If a chess position turns
out badly at move thirty, you do not wait for checkmate to conclude that move twenty-two was a
mistake, you update as soon as the position sours. TD is that instinct written as an update
rule.</p>

<h3>Why TD usually wins</h3>
<ul>
<li><b>It learns online.</b> Every step produces an update, so it works in continuing tasks with
no episode boundaries, and it starts improving immediately rather than after the first episode
finishes.</li>
<li><b>Much lower variance.</b> The MC target sums many random rewards along one path. The TD
target contains exactly one random reward plus a stable estimate. Less noise per update means
faster convergence in practice, and this is usually the dominant effect.</li>
<li><b>It exploits the Markov property.</b> TD converges to the value function of the
maximum-likelihood MDP implied by the data. Where the state really is Markov this is a real
advantage, and it is why TD is more data-efficient than MC on well-posed problems.</li>
</ul>
<p>The cost is bias. The target <code>r + &gamma;V(s&prime;)</code> uses a current estimate, so
early in training every target is wrong. TD is biased with low variance, MC is unbiased with high
variance, and on most problems the variance reduction is worth far more than the bias costs.</p>

<h3>The middle ground: n-step and TD(λ)</h3>
<p>One step is not sacred. Take n real rewards before you bootstrap:</p>
<div class="mathblock">G<sub>t</sub><sup>(n)</sup> = r<sub>t+1</sub> + &gamma;r<sub>t+2</sub> + &hellip; + &gamma;<sup>n-1</sup>r<sub>t+n</sub> + &gamma;<sup>n</sup>V(s<sub>t+n</sub>)</div>
<p>n = 1 is TD, n = &infin; is Monte Carlo, and the interesting values are in between. Rather
than picking one n, <b>TD(&lambda;)</b> takes a geometrically weighted average of all of them,
with weight <code>(1&minus;&lambda;)&lambda;<sup>n-1</sup></code> on the n-step return.
&lambda; = 0 recovers TD, &lambda; = 1 recovers MC, and intermediate values usually beat both
ends.</p>
<p>Implemented naively that requires looking into the future. The <b>eligibility trace</b>
formulation gets the same result running forwards: keep a decaying trace
<code>e(s)</code> of how recently each state was visited, and apply every TD error to every state
in proportion to its trace. Recently visited states get most of the credit, older ones get a
geometrically smaller share. One backward pass, same answer.</p>

<div class="hardidea">🧠 <b>TD was validated in a place nobody expected: the brain.</b> In the
1990s Schultz, Dayan and Montague found that dopamine neurons in the primate midbrain fire in a
pattern that matches the TD error remarkably closely. They fire on an unexpected reward, stop
firing on a fully predicted one, and dip below baseline when a predicted reward fails to arrive.
That is not a reward signal, it is a <i>prediction error</i> signal, which is exactly &delta;. An
algorithm derived from dynamic programming turned out to describe one of the better understood
signals in neuroscience, and the finding has held up.</div>
`,
 exs:[{title:'Watch a TD estimate converge, one step at a time',
   lang:'python',
   prompt:`A single state <code>s</code> that always transitions to a terminal state and pays a
   reward drawn from a fixed list, cycled over and over. The true value is the mean of that
   list. Terminal states have value zero, so the TD target is just the reward.<br><br>
   Run <b>500</b> TD updates with <code>alpha = 0.05</code> starting from
   <code>v = 0.0</code>, store the final estimate in <code>v</code>, and store the TD error of
   the very first update in <code>first_delta</code>.`,
   starter:`rewards = [2.0, 8.0, 5.0, 1.0, 9.0]   # true mean is 5.0
alpha = 0.05
gamma = 0.9

v = 0.0
first_delta = None

for i in range(500):
    r = rewards[i % len(rewards)]
    # terminal successor, so V(s') = 0 and the target is just r
    delta = 0.0
    if first_delta is None:
        first_delta = delta
    # v = ...

print(v, first_delta)
`,
   tests:[
     {d:'the first TD error is the first reward minus zero, so 2.0',expr:'abs(first_delta - 2.0) < 1e-9'},
     {d:'the estimate converges to the mean reward, about 5.0',expr:'abs(v - 5.0) < 0.3'},
     {d:'it moved away from its starting value of zero',expr:'v > 1.0'}
   ],
   hints:[
     'delta = r + gamma * 0 - v, which is just r - v here because the successor is terminal.',
     'v = v + alpha * delta. That single line is temporal difference learning.',
     'Capture first_delta before you update v, otherwise you record the error after the correction.'
   ]}],
 quiz:{title:'Quick check, TD learning',questions:[
   {q:'The TD error δ = r + γV(s\') − V(s) measures:',
    options:[
             'The distance between the current policy and the optimal policy',
             'The gradient of the value function with respect to the state','The total reward remaining until the episode terminates',
             'How much better or worse this step turned out than expected'],answer:3,whyWrong:['No policy comparison is involved. δ comes from one transition and two value estimates.','There is no spatial gradient here. The state is an index, not a coordinate.','That is the return G, which is what Monte Carlo uses instead.',''],
    why:'It is the surprise. Positive means raise the value of where you were, negative means lower it, and the sign is all the direction the update needs.'},
   {q:'TD usually beats Monte Carlo in practice mainly because:',
    options:[
             'It does not need the Markov property to hold in the state representation',
             'It requires fewer stored values per state in the lookup table','It is unbiased whereas Monte Carlo carries a systematic error',
             'Its target contains one random reward instead of a whole episode, so variance is far lower'],answer:3,whyWrong:['The other way round. TD is the method that leans on the Markov property.','Both store one value per state. Storage is identical.','Also the other way round. TD is the biased one, because its target uses an estimate.',''],
    why:'TD is the biased one. The variance reduction usually dominates the bias cost, and it learns online rather than waiting for the episode to end.'},
   {q:'In TD(λ), setting λ = 1 gives you:',
    options:['One-step TD learning','Dynamic programming','Monte Carlo','A purely greedy policy'],answer:2,whyWrong:['That is λ = 0.','Dynamic programming needs the model. TD(λ) is model-free at every λ.','','λ controls how far the target looks ahead, not how the policy picks actions.'],
    why:'λ = 0 is TD, λ = 1 is MC, and the useful settings are usually in between. Eligibility traces are how you get that average without looking into the future.'},
   {q:'The dopamine finding is significant because those neurons appear to encode:',
    options:[
             'The probability that the chosen action was the greedy one','A prediction error rather than a reward, which is exactly what δ is',
             'The total reward accumulated so far within the current episode',
             'The value of the current state, tracking V directly'],answer:1,whyWrong:['Nothing in the finding concerns which action was greedy.','','Accumulated reward would keep the neurons firing as reward arrives. They go quiet once a reward is fully predicted.','Encoding V would mean firing in proportion to how good the state is. The signal tracks the change, not the level.'],
    why:'They fire on unexpected reward, go quiet on fully predicted reward, and dip when a predicted reward fails to arrive. That is the signature of δ, not of r.'}
 ]}}
,

{id:'rl7',
 title:'SARSA and Q-learning: on-policy and off-policy control',
 body:`
<div class="ground"><span class="gTag">🎯 Two algorithms that differ by one symbol</span>
<p>Apply TD to Q instead of V and you can control, not just predict. There are two ways to write
the target, they differ by a single term, and that difference produces two algorithms with
visibly different behaviour. Understanding why is the cleanest way into the on-policy versus
off-policy distinction that organises the whole field.</p></div>

<h3>The two updates, side by side</h3>
<div class="mathblock">SARSA:&nbsp;&nbsp;&nbsp;&nbsp;Q(s,a) &larr; Q(s,a) + &alpha;[ r + &gamma;Q(s&prime;, a&prime;) &minus; Q(s,a) ]
Q-learning:&nbsp;&nbsp;Q(s,a) &larr; Q(s,a) + &alpha;[ r + &gamma; max<sub>a&prime;</sub> Q(s&prime;, a&prime;) &minus; Q(s,a) ]</div>
<p>SARSA uses <code>a&prime;</code>, the action the agent <b>actually took next</b>. Q-learning
uses the max, the value of the best action available, <b>whether or not the agent takes it</b>.
That is the entire difference.</p>
<p>The name SARSA is just the tuple it needs:
<code>(s, a, r, s&prime;, a&prime;)</code>. You have to choose the next action before you can
update, which is worth noticing when you implement it.</p>

<h3>On-policy and off-policy</h3>
<p><b>On-policy</b> methods learn the value of the policy they are following, exploration and
all. SARSA is learning "how good is this state-action pair, given that I will keep taking random
actions 10% of the time".</p>
<p><b>Off-policy</b> methods learn the value of one policy while following another. Q-learning
follows an &epsilon;-greedy behaviour policy but the max in its target means it learns
<code>Q*</code>, the value of the fully greedy policy. It learns about optimal play from
non-optimal experience, which is a considerable thing to be able to do. It is what lets an agent
learn from a replay buffer, from another agent's games, or from a human demonstration.</p>

<div class="worked"><b>The cliff, where the difference becomes visible.</b>
<p>Standard gridworld. A path along the edge of a cliff is the shortest route to the goal.
Falling off costs &minus;100 and ends the episode. The agent explores with &epsilon;-greedy.</p>
<p><b>Q-learning</b> learns the optimal policy: walk the cliff edge. But while it is <i>acting</i>
with &epsilon;-greedy exploration, that random 10% occasionally shoves it off the edge, so its
online performance during training is poor.</p>
<p><b>SARSA</b> learns a longer, safer path away from the edge. Because its target uses the
action actually taken, the risk of the exploratory step is priced into the values of the cliff-edge
states, and those states end up looking bad. Its online return during training is better.</p>
<p>So SARSA learns a worse policy and gets a better score. Neither is broken. They are answering
different questions: Q-learning asks what is optimal, SARSA asks what is best <i>given that I am
going to keep making mistakes</i>. If exploration will continue in deployment, or mistakes are
expensive, SARSA is often the one you want.</p></div>

<h3>Convergence, and the honest version of it</h3>
<p>Tabular Q-learning converges to <code>Q*</code> with probability 1, under two conditions.
Every state-action pair must be visited infinitely often, and the step sizes must satisfy the
Robbins-Monro conditions:</p>
<div class="mathblock">&Sigma;<sub>t</sub> &alpha;<sub>t</sub> = &infin;&nbsp;&nbsp;&nbsp;&nbsp;&Sigma;<sub>t</sub> &alpha;<sub>t</sub>&sup2; &lt; &infin;</div>
<p>The first says the steps must stay large enough for long enough to reach anywhere. The second
says they must shrink fast enough to settle. <code>&alpha;<sub>t</sub> = 1/t</code> satisfies
both. Note that this holds regardless of the behaviour policy, as long as it keeps exploring,
which is the formal content of "off-policy".</p>
<p>The theorem is about tables. Replace the table with a neural network and it does not apply.
That is not pedantry, it is the reason DQN needed several engineering tricks before Atari worked,
which is two lessons from here.</p>

<div class="hardidea">🧠 <b>The max makes Q-learning optimistic, and that is a real bug.</b>
<code>max<sub>a</sub> Q(s,a)</code> over noisy estimates is biased upward: with several actions
whose true values are equal, the max of their noisy estimates is above the true value in
expectation. So Q-learning systematically overestimates, and the error compounds through
bootstrapping. <b>Double Q-learning</b> is the standard fix: keep two independent estimates, use
one to choose the action and the other to evaluate it. The noise in the choice is then independent
of the noise in the evaluation, and the bias largely cancels. This is not a small correction,
Double DQN was a clear improvement on DQN across the Atari suite.</div>

<h3>Expected SARSA, briefly</h3>
<p>A third option sits between them. Instead of the action actually taken, or the max, use the
expectation over the policy:</p>
<div class="mathblock">Q(s,a) &larr; Q(s,a) + &alpha;[ r + &gamma;&Sigma;<sub>a&prime;</sub> &pi;(a&prime;|s&prime;)Q(s&prime;,a&prime;) &minus; Q(s,a) ]</div>
<p>This removes the variance caused by randomly sampling <code>a&prime;</code>, at the cost of a
sum over actions. It generally performs at least as well as SARSA and can be run on-policy or
off-policy depending on which &pi; you put in the sum. With &pi; greedy it <i>is</i>
Q-learning, which is a tidy way to see that these three are one family.</p>
`,
 quiz:{title:'Quick check, SARSA and Q-learning',questions:[
   {q:'The single difference between the SARSA and Q-learning targets is:',
    options:[
             'SARSA updates after the episode ends, Q-learning updates every step',
             'SARSA uses the action actually taken, Q-learning uses the best available action',
             'SARSA learns V while Q-learning learns Q','SARSA discounts the next value while Q-learning does not'],answer:1,whyWrong:['Both update every step. Neither waits for the episode to end.','','Both learn Q, which is what makes them control methods rather than prediction methods.','Both discount the next value by γ.'],
    why:'a′ versus max over a′. Everything else about the two updates is identical, and that one term is what makes one on-policy and the other off-policy.'},
   {q:'On the cliff-walking task SARSA scores better during training because:',
    options:[
             'It prices the cost of its own exploratory mistakes into the risky states',
             'It never takes random actions once the value estimates have stabilised','It converges to the optimal policy faster than Q-learning does',
             'It uses a smaller effective learning rate for the same value of alpha'],answer:0,whyWrong:['','ε-greedy keeps taking random actions throughout training, however settled the values are.','It does not converge to the optimal policy at all while ε stays positive. It converges to the best ε-greedy one.','The learning rate is whatever you set, and it is the same in both algorithms.'],
    why:'It learns the value of the policy it is actually running, exploration included, so the cliff edge looks dangerous. Q-learning learns the better policy and scores worse while exploring.'},
   {q:'"Off-policy" means the algorithm can:',
    options:[
             'Operate without ever computing an explicit policy at all',
             'Update its values without receiving any reward signal','Learn about one policy while behaving according to a different one',
             'Switch to a new policy without discarding the value function'],answer:2,whyWrong:['Plenty of on-policy methods have no explicit policy either, and value iteration is one of them.','No method learns values without reward. The reward is the only ground truth in the loop.','','Reusing a value function across policies is ordinary policy iteration, and it is on-policy.'],
    why:'That is what makes replay buffers, learning from demonstrations, and learning from another agent\'s games possible.'},
   {q:'Q-learning overestimates action values because:',
    options:[
             'The max over noisy estimates sits above the true maximum in expectation',
             'Rewards are usually positive, which biases the running average upward',
             'Bootstrapping propagates the initial optimistic values through the table','The discount factor compounds small errors across many steps'],answer:0,whyWrong:['','Sign has nothing to do with it. The bias appears just as readily with rewards that are all negative.','Optimistic initialisation washes out as the estimates are updated. This bias persists at convergence.','γ shrinks propagated error rather than growing it. The bias comes from the max, not the discount.'],
    why:'Double Q-learning separates choosing the action from evaluating it, so the two noise terms are independent and the bias largely cancels.'}
 ]}}
,

{id:'rl8',
 title:'Exploration and exploitation: bandits, and the cost of not knowing',
 body:`
<div class="ground"><span class="gTag">🎯 The only decision every RL agent has to make</span>
<p>Take the action that looks best, or take one you know less about? Exploit and you may keep
collecting a mediocre reward forever, never having discovered the better option. Explore and you
pay for the information with reward you could have banked. There is no way to have both, and
the tension appears in every RL algorithm ever written. It is cleanest to study on its own, in a
setting stripped of everything else.</p></div>

<h3>The multi-armed bandit</h3>
<p>One state. <code>k</code> actions, called arms. Each arm pays from its own fixed but unknown
distribution. Pull arms, maximise total reward. No transitions, no delayed consequences, no
credit assignment. The name is from slot machines, and the canonical application is which of
three headlines to show a reader, or which of five drug doses to assign the next patient.</p>
<p>The measure of success is <b>regret</b>: how much worse you did than always pulling the best
arm.</p>
<div class="mathblock">L<sub>T</sub> = T&middot;&mu;* &minus; &Sigma;<sub>t=1..T</sub> E[ r<sub>t</sub> ]</div>
<p>Regret that grows linearly in T means you never found the best arm and are losing a fixed
amount every round. The goal is <b>sublinear</b> regret, so the average loss per round goes to
zero. Lai and Robbins showed in 1985 that no algorithm can do better than logarithmic regret, and
the good algorithms achieve it.</p>

<h3>Four strategies, in order of sophistication</h3>
<p><b>&epsilon;-greedy.</b> Best arm with probability 1&minus;&epsilon;, uniformly random
otherwise. Trivial to implement, and it has linear regret because it keeps spending &epsilon; of
its pulls on arms it has already established are bad. Decaying &epsilon; toward zero fixes the
asymptotics and is what most people actually run.</p>
<p><b>Optimistic initialisation.</b> Set every initial estimate far above any plausible value.
Every arm then looks brilliant until tried, so the agent sweeps through all of them early and
settles down on its own. One line of code, no parameter to tune, no explicit randomness. It only
works in a stationary problem, since the optimism is spent once and never returns.</p>
<p><b>Upper confidence bound.</b> Do not choose by the estimate, choose by an optimistic bound on
it:</p>
<div class="mathblock">a<sub>t</sub> = argmax<sub>a</sub> [ Q&#770;(a) + c &radic;( ln t / N(a) ) ]</div>
<p>The second term is large for arms tried rarely and shrinks as evidence accumulates. So an arm
gets tried either because it looks good or because you are unsure about it, which is the right
principle: <b>be optimistic in the face of uncertainty</b>. UCB achieves the logarithmic regret
bound, and the same idea is the tree-search rule inside AlphaGo.</p>
<p><b>Thompson sampling.</b> Keep a posterior distribution over each arm's value. Each round,
draw one sample from each posterior and pull the arm with the highest draw. An arm with a wide
posterior sometimes draws high and gets tried; as its posterior narrows it stops winning by luck.
Exploration falls out of the Bayesian bookkeeping with no exploration parameter at all. It is
from 1933, it was ignored for eighty years, and it is now often the best-performing option in
practice.</p>

<div class="worked"><b>Why ε-greedy has linear regret, in one line.</b>
<p>With <code>k</code> arms and a fixed &epsilon;, the probability of pulling a suboptimal arm
never falls below <code>&epsilon;(k&minus;1)/k</code>, no matter how certain the agent becomes. Over
T rounds that is a constant fraction of pulls wasted, so regret grows in proportion to T.
Decaying &epsilon; as <code>1/t</code> recovers logarithmic regret, which is why almost every
implementation you will read decays it.</p></div>

<h3>Back to the full problem</h3>
<p>In a real MDP exploration is harder than in a bandit, for a reason worth naming. In a bandit
every arm is one pull away. In an MDP the interesting state may be <b>fifty coordinated actions
deep</b>, and no amount of per-step randomness will stumble into it. Random exploration is a
random walk, and a random walk covers distance proportional to the square root of the number of
steps, which is hopeless when the reward is a hundred steps away behind a specific sequence.</p>
<p>This is the hard-exploration problem, and Montezuma's Revenge became its benchmark: an Atari
game where DQN scored zero for years, because the first reward requires a specific long sequence
of moves that random play never produces. The approaches that work add a second, internal reward
for novelty:</p>
<ul>
<li><b>Count-based bonuses</b>: add a term like <code>1/&radic;N(s)</code> to the reward, so
rarely visited states are intrinsically attractive. Extended to large state spaces with
pseudo-counts from a density model.</li>
<li><b>Curiosity</b>: keep a model that predicts the next state, and reward the agent in
proportion to that model's error. Prediction error is high where the agent does not yet understand
the dynamics, which is where learning is available.</li>
<li><b>Random network distillation</b>: reward the error of a small network trying to match a
fixed random network on the current state. That error is high on states the predictor has not seen
and near zero on familiar ones, which gives a novelty signal that is cheap and hard to game.</li>
</ul>

<div class="hardidea">🧠 <b>Curiosity has a failure mode that is worth remembering, because it
generalises.</b> An agent rewarded for prediction error will happily park itself in front of a
source of unpredictable noise, a television showing static, and collect intrinsic reward forever.
Nothing is learned and the error never falls. This is called the noisy-TV problem, and it is the
same failure as the boat spinning in the lagoon from the first lesson: <b>the agent optimised
exactly what you asked for, and what you asked for was not what you wanted.</b> Every objective
you write down is a proxy, and a sufficiently capable optimiser will find where the proxy comes
apart from the intent.</div>
`,
 exs:[{title:'Regret: ε-greedy against a decaying schedule',
   lang:'python',
   prompt:`Three arms with true means <code>[0.2, 0.5, 0.75]</code>, and rewards that are
   deterministic (so you can see the behaviour without the noise). Run <b>2000</b> rounds of
   &epsilon;-greedy with a fixed <code>eps = 0.1</code>, using a deterministic stand-in for
   randomness so the result is reproducible: explore on every round where
   <code>t % 10 == 0</code>, cycling through the arms.<br><br>
   Track <code>total</code>, the reward collected, and compute <code>regret</code>, which is
   <code>2000 * 0.75 - total</code>. Store the index of the arm with the highest estimate in
   <code>best</code>.`,
   starter:`means = [0.2, 0.5, 0.75]
eps_period = 10          # explore on every 10th round
rounds = 2000

Q = [0.0, 0.0, 0.0]      # value estimate per arm
N = [0, 0, 0]            # pull count per arm
total = 0.0

for t in range(rounds):
    if t % eps_period == 0:
        a = (t // eps_period) % 3        # cycle the arms while exploring
    else:
        a = 0                            # replace: the greedy choice
    r = means[a]
    N[a] += 1
    # incremental mean: Q[a] = Q[a] + (1/N[a]) * (r - Q[a])
    total += r

best = 0
regret = 0.0

print(total, regret, best)
`,
   tests:[
     {d:'the agent identifies arm 2 as the best',expr:'best == 2'},
     {d:'it collected more than 1400, so it is exploiting the good arm most of the time',expr:'total > 1400'},
     {d:'regret is positive, the price paid for the 10% of rounds spent exploring',expr:'regret > 0'},
     {d:'regret stays under 200, so exploration is costing about what the schedule implies',expr:'regret < 200'}
   ],
   hints:[
     'The greedy choice is a = Q.index(max(Q)).',
     'Update the estimate inside the loop: Q[a] = Q[a] + (1.0 / N[a]) * (r - Q[a]).',
     'best = Q.index(max(Q)), and regret = rounds * 0.75 - total.'
   ]}],
 quiz:{title:'Quick check, exploration',questions:[
   {q:'Regret that grows linearly in T means:',
    options:[
             'The algorithm converges, but more slowly than the theoretical optimum allows',
             'The reward distributions are non-stationary and shifting over time',
             'The estimates are unbiased but their variance grows without bound','The algorithm keeps losing a fixed amount per round and never settles on the best arm'],answer:3,whyWrong:['Linear regret means it never settles at all. Slow convergence would still give sublinear regret.','Non-stationarity is a different problem. Fixed ε has linear regret on a perfectly stationary bandit.','Variance does not grow. The estimates converge, and the algorithm keeps spending pulls anyway.',''],
    why:'Sublinear regret is the goal, so average loss per round goes to zero. Fixed ε has linear regret because it never stops wasting a constant share of pulls.'},
   {q:'The principle behind UCB is:',
    options:['Try every arm the same number of times before committing to one',
             'Prefer arms whose estimated value has the smallest variance',
             'Choose by an optimistic upper bound, so uncertainty itself attracts attention',
             'Decay the exploration rate in proportion to the number of arms'],answer:2,whyWrong:['That is uniform exploration, which wastes pulls on arms already shown to be poor.','UCB does the opposite. High variance raises the bound and makes an arm more attractive, not less.','','The bonus depends on how often each arm was pulled, not on how many arms there are.'],
    why:'Optimism in the face of uncertainty. The bonus term shrinks as evidence accumulates, and the same idea drives the tree search inside AlphaGo.'},
   {q:'Random exploration fails on Montezuma\'s Revenge because:',
    options:[
             'The episodes are too short for a return to be computed','The reward signal is too noisy for the value estimates to converge',
             'The first reward needs a long specific sequence that random play never produces',
             'The state space is continuous rather than discrete'],answer:2,whyWrong:['The episodes are long. Length is not what stops the agent, the absence of any early reward is.','The reward is not noisy, it is absent. There is nothing to converge to until the first one arrives.','','The state space is discrete pixels. Continuity is not the obstacle.'],
    why:'A random walk covers distance like the square root of the number of steps. Hard exploration needs an intrinsic signal that makes novelty itself rewarding.'},
   {q:'The noisy-TV problem shows that a curiosity bonus:',
    options:['Decays too quickly to sustain exploration over a long episode',
             'Can be maximised forever by unpredictable noise that teaches nothing',
             'Requires a model of the environment dynamics to be computed at all',
             'Only works when the state space is small enough to count visits'],answer:1,whyWrong:['The opposite. In front of static the bonus never decays, which is exactly the failure.','','Some curiosity methods need a dynamics model and some do not, and random network distillation is one that does not.','That is count-based exploration. Curiosity was introduced precisely to avoid needing counts.'],
    why:'Prediction error stays high in front of static. Same failure as the boat in the lagoon: the agent optimised the proxy you wrote, not the thing you meant.'}
 ]}}
,

{id:'rl9',
 title:'Function approximation: leaving the table behind, and the deadly triad',
 body:`
<div class="ground"><span class="gTag">🎯 What breaks when Q stops being a lookup table</span>
<p>Everything so far assumed one stored number per state, or per state-action pair. Backgammon
has 10<sup>20</sup> states. A camera image has more states than you can enumerate in any
notation. So you replace the table with a function, usually a neural network, and you get
generalisation for free. You also lose every convergence guarantee in this stream, and it is
worth being precise about why.</p></div>

<h3>The change</h3>
<div class="mathblock">tabular:&nbsp;&nbsp;&nbsp;&nbsp;Q(s,a) is a stored number
approximate:&nbsp; Q(s,a;&theta;) is a function with parameters &theta;</div>
<p>The update stops being an assignment and becomes a gradient step. Treat the TD target as if
it were a supervised label and do regression on it:</p>
<div class="mathblock">L(&theta;) = E[ ( r + &gamma; max<sub>a&prime;</sub> Q(s&prime;,a&prime;;&theta;) &minus; Q(s,a;&theta;) )&sup2; ]
&theta; &larr; &theta; &minus; &alpha; &nabla;<sub>&theta;</sub> L(&theta;)</div>
<p>The gain is generalisation, and it is not a small one. Updating one state now moves nearby
states too, which is the only reason learning from images is possible at all. You will never
visit the same camera frame twice, so without generalisation you would learn nothing.</p>

<h3>What breaks</h3>
<p>Three things go wrong, and they compound.</p>
<p><b>The target moves.</b> In supervised learning the labels sit still. Here the target
<code>r + &gamma;max Q(s&prime;;&theta;)</code> is computed from the same parameters you are
updating, so every gradient step changes the thing you were regressing toward. You are chasing a
target that runs away as you approach it.</p>
<p><b>The data is correlated and non-stationary.</b> Consecutive frames of experience are nearly
identical, which violates the independence that stochastic gradient descent assumes. Worse, as
the policy improves the agent visits different states, so the input distribution shifts under
the learner.</p>
<p><b>The contraction is gone.</b> The Bellman operator shrinks distances in the max norm.
Function approximation projects the result back onto what your network can represent, and that
projection is a contraction in a <i>different</i> norm, the weighted L2 norm. Composing two
contractions in two different norms is not a contraction in either. The proof does not merely
fail to apply, the conclusion is false: there are small, explicit counterexamples where TD with
linear function approximation diverges to infinity.</p>

<h3>The deadly triad</h3>
<p>Sutton and Barto name the three ingredients whose combination causes divergence:</p>
<ol>
<li><b>Function approximation</b>, generalising across states rather than storing each one.</li>
<li><b>Bootstrapping</b>, updating an estimate from another estimate rather than a real outcome.</li>
<li><b>Off-policy training</b>, learning about one policy from data generated by another.</li>
</ol>
<p><b>Any two are safe. All three together can diverge.</b> That is the useful form of the
result, because it tells you what to give up when things blow up. Drop bootstrapping and use
Monte Carlo returns: stable, higher variance. Drop off-policy and use SARSA or a policy gradient
method: stable, less sample-efficient because you cannot reuse old data. Drop function
approximation: not an option on anything interesting.</p>
<p>Notice that plain DQN is all three at once. It is squarely inside the danger zone, which is
why the next lesson is mostly a list of engineering devices for surviving there.</p>

<div class="demystify"><b>Linear approximation is not a toy, and it is where the theory lives.</b>
Write <code>Q(s,a) = w<sup>T</sup>x(s,a)</code> with hand-built features <code>x</code>. On-policy
TD with linear features has a genuine convergence guarantee, to within a bounded factor of the
best representable value function. Tile coding and radial basis functions were the standard
feature constructions for years, and gradient-TD methods extended the guarantees to the off-policy
case. If you need a system whose behaviour you can argue about rather than merely test, linear
features are still a defensible choice.</div>

<div class="hardidea">🧠 <b>"It diverged" is usually a triad problem, not a bug.</b> When
Q-values climb to 10<sup>8</sup> and the policy collapses, the instinct is to hunt for an
indexing error. Check for one, then stop: the loop is often correct and the algorithm is doing
what the triad predicts. The fixes are structural, not textual. Slow the target down with a
separate target network, decorrelate the data with a replay buffer, clip the TD error, or step
back to a method that only has two of the three.</div>
`,
 quiz:{title:'Quick check, function approximation',questions:[
   {q:'The three members of the deadly triad are:',
    options:[
             'High learning rate, high discount factor, and sparse rewards',
             'Exploration, exploitation, and delayed reward','Function approximation, bootstrapping, and off-policy training',
             'Correlated data, non-stationary targets, and a large action space'],answer:2,whyWrong:['All three are ordinary hyperparameter or problem properties. None of them causes divergence by combination.','Those are the tensions RL manages, not the three ingredients whose combination breaks convergence.','','Those are consequences that replay and target networks address. The triad is the underlying cause.'],
    why:'Any two are safe. All three together can diverge, and DQN is all three at once, which is why it needed the engineering in the next lesson.'},
   {q:'Tabular convergence proofs stop applying under function approximation because:',
    options:['The learning rate can no longer satisfy the Robbins-Monro conditions',
             'The state space becomes continuous and expectations are no longer well defined',
             'Composing the Bellman contraction with a projection in a different norm need not contract',
             'Neural networks are non-convex, so gradient descent cannot reach a global optimum'],answer:2,whyWrong:['You can still satisfy Robbins-Monro. The step-size schedule is not what breaks.','Continuity is fine. Linear function approximation diverges on small finite MDPs too.','','Non-convexity costs you the global optimum. The triad costs you convergence to anything at all.'],
    why:'It is not just that the proof fails. There are small explicit counterexamples where linear TD diverges to infinity.'},
   {q:'The main thing function approximation buys you is:',
    options:[
             'Generalisation, so an update at one state moves similar states too',
             'Freedom from having to choose a discount factor',
             'The ability to learn without any reward signal at all','A guaranteed reduction in the variance of the value estimates'],answer:0,whyWrong:['','γ is still a choice you have to make, table or network.','Nothing removes the need for reward. Function approximation changes the representation, not the signal.','There is no such guarantee. Approximation often increases variance rather than reducing it.'],
    why:'You never see the same camera frame twice. Without generalisation across states there would be nothing to learn from.'},
   {q:'Your Q-values are climbing to 1e8. The most likely cause is:',
    options:['The reward function is unbounded above',
             'The replay buffer is too large and holds stale transitions',
             'The exploration rate decayed before the values converged',
             'The triad, so the fix is structural rather than a bug in the loop'],answer:3,whyWrong:['Unbounded reward would be worth checking, and it produces large values rather than the runaway growth the triad causes.','A large buffer holds stale data, which slows learning rather than sending values to infinity.','Premature decay leaves you stuck on a mediocre policy, not with values climbing without bound.',''],
    why:'Slow the target with a target network, decorrelate with replay, clip the error, or drop to a method with only two of the three ingredients.'}
 ]}}
,

{id:'rl10',
 title:'Deep Q-networks: what it took to make Atari work',
 body:`
<div class="ground"><span class="gTag">🎯 Q-learning plus a convolutional network, plus two tricks that mattered more than either</span>
<p>In 2013 and 2015 DeepMind trained a single architecture to play forty-nine Atari games from
raw pixels and a score, reaching human level or better on most of them. The algorithm was
Q-learning, which was twenty-six years old. The network was a convnet, which was older than
that. What was new were two engineering devices for surviving the deadly triad, and they are
worth understanding because the same devices show up everywhere since.</p></div>

<h3>The setup</h3>
<p>Input: four consecutive game frames, greyscaled and downsampled to 84 by 84, stacked so that
velocity is recoverable and the state is Markov. Output: one Q-value per joystick action, all of
them from a single forward pass, so the argmax costs nothing. Reward: the change in game score,
clipped to &minus;1, 0 or +1 so that one set of hyperparameters works across games with wildly
different scoring scales. One architecture, one hyperparameter set, forty-nine games, no
per-game tuning.</p>

<h3>Trick one: experience replay</h3>
<p>Do not learn from the transition you just took. Push
<code>(s, a, r, s&prime;)</code> into a buffer of the last million transitions and train on
random minibatches drawn from it.</p>
<p>Three things this buys, and the third is the one people forget:</p>
<ul>
<li><b>Decorrelation.</b> A random minibatch spans thousands of different moments, which restores
something close to the independence that stochastic gradient descent assumes. Learning from
consecutive frames is learning from a near-duplicate sample over and over.</li>
<li><b>Sample efficiency.</b> Each transition is reused many times instead of being used once and
discarded. In an environment where interaction is the expensive part, this alone is worth a great
deal.</li>
<li><b>Smoothing the data distribution.</b> Without replay, a policy drifting toward one behaviour
sees only the states that behaviour produces, and the training distribution swings with it.
Averaging over a large buffer damps that feedback loop.</li>
</ul>
<p>Replay only works because Q-learning is off-policy. The transitions in the buffer were
generated by older, worse policies, and an on-policy method could not legitimately learn from
them. This is the clearest practical payoff of the distinction from the SARSA lesson.</p>
<p><b>Prioritised replay</b> is the standard refinement: sample transitions in proportion to the
size of their TD error, so surprising transitions get revisited more. It needs an importance-
sampling correction, because non-uniform sampling biases the expectation.</p>

<h3>Trick two: the target network</h3>
<p>The moving-target problem from the last lesson, addressed directly. Keep a second copy of the
network, <code>&theta;<sup>-</sup></code>, frozen. Compute targets from the frozen copy and
update only the live one:</p>
<div class="mathblock">L(&theta;) = E[ ( r + &gamma; max<sub>a&prime;</sub> Q(s&prime;,a&prime;;&theta;<sup>-</sup>) &minus; Q(s,a;&theta;) )&sup2; ]</div>
<p>Copy <code>&theta;</code> into <code>&theta;<sup>-</sup></code> every ten thousand steps.
Between copies the target sits still, so each interval is an ordinary supervised regression
problem with fixed labels. The chase becomes a sequence of short, stable pursuits.</p>
<p>It is a crude device and it works remarkably well. The soft variant, used by DDPG and most
continuous-control methods since, updates the target continuously with
<code>&theta;<sup>-</sup> &larr; &tau;&theta; + (1&minus;&tau;)&theta;<sup>-</sup></code> for
small &tau;, which achieves the same lag without the discontinuity.</p>

<h3>What came after</h3>
<ul>
<li><b>Double DQN</b>: use the live network to choose the action and the target network to
evaluate it, cancelling most of the max-operator overestimation from the Q-learning lesson.</li>
<li><b>Duelling architecture</b>: split the head into a state-value stream and an advantage
stream, <code>Q = V + A</code>. In states where the action barely matters, the network can learn
V once instead of learning k nearly identical Q-values.</li>
<li><b>Distributional RL (C51)</b>: predict the whole distribution of returns rather than its
mean. A surprisingly large improvement, and the mechanism is still argued about.</li>
<li><b>Noisy nets</b>: learnable noise in the weights replaces &epsilon;-greedy, so the amount of
exploration is learned per state instead of scheduled by hand.</li>
<li><b>Rainbow</b>: all of the above together, and the combination is better than any single
component, which is not usually how these things go.</li>
</ul>

<div class="hardidea">🧠 <b>Read the Atari result carefully, because it was oversold at the
time.</b> DQN needed roughly 200 million frames, about 39 days of game time, to reach human level
on games a person is competent at within minutes. It learned nothing transferable: forty-nine
separate agents, no shared knowledge, and a network trained on Breakout was useless at Pong. And
it failed completely on the games that need exploration or long-horizon planning, scoring zero on
Montezuma's Revenge for years. The achievement was real and it was narrow: one algorithm learning
many tasks from pixels, not one agent that understood games. Sample efficiency remains the
field's central unsolved problem.</div>
`,
 quiz:{title:'Quick check, DQN',questions:[
   {q:'Experience replay helps mainly because:',
    options:[
             'It removes the need for a discount factor by storing full episodes',
             'It converts the off-policy problem into an on-policy one',
             'It decorrelates the training data and lets each transition be reused many times','It compresses the transitions so more of them fit in memory'],answer:2,whyWrong:['γ is orthogonal to how transitions are stored, and the buffer holds single transitions rather than episodes.','It goes the other way. Replay is only legitimate because the algorithm is already off-policy.','','Nothing is compressed. The buffer stores transitions as they were.'],
    why:'And it only works because Q-learning is off-policy. The buffer is full of transitions from older, worse policies that an on-policy method could not use.'},
   {q:'The target network exists to:',
    options:[
             'Hold the regression target still between periodic copies',
             'Halve the compute needed for each forward pass',
             'Provide a second opinion that is averaged with the live network','Explore more efficiently than an ε-greedy schedule can'],answer:0,whyWrong:['','Compute goes up rather than down, because there are now two networks to evaluate.','There is no averaging. The frozen copy computes the target and the live copy is what learns.','It does not touch action selection at all. Exploration is handled separately.'],
    why:'Between copies it is an ordinary supervised problem with fixed labels. The soft variant does the same thing continuously with a small blending factor.'},
   {q:'DQN clips rewards to −1, 0 and +1 because:',
    options:['Large rewards would overflow the network output layer',
             'The Bellman equation requires bounded rewards to converge',
             'Clipping is what makes the value function a probability distribution',
             'One hyperparameter set has to work across games with very different score scales'],answer:3,whyWrong:['Nothing overflows. Networks handle large values, they just need retuning for each scale.','Bounded rewards help the theory, and DQN\'s problem here is practical: one configuration across many games.','Clipping rewards has nothing to do with probabilities. That is what softmax does, in a different setting.',''],
    why:'It costs information, since the agent can no longer tell a small win from a large one, and it was worth it for a single configuration across forty-nine games.'},
   {q:'The fairest summary of the Atari result is:',
    options:[
             'Exploration was solved for games with sparse reward signals',
             'A single agent learned to play all forty-nine games at once','One algorithm learned many games from pixels, slowly and without transfer',
             'Reinforcement learning matched human sample efficiency for the first time'],answer:2,whyWrong:['Exploration was not solved. DQN scored zero on Montezuma\'s Revenge for years.','There were forty-nine separate agents, one per game, with nothing shared between them.','','It needed roughly 200 million frames per game, which is the opposite of human sample efficiency.'],
    why:'Forty-nine separate agents, about 200 million frames each, no transfer between games, and zero on Montezuma\'s Revenge for years. Real and narrow.'}
 ]}}
,

{id:'rl11',
 title:'Policy gradients: optimise the policy directly',
 body:`
<div class="ground"><span class="gTag">🎯 Skip the value function and adjust the behaviour itself</span>
<p>Everything so far learned a value function and read a policy off it. There is another route:
parameterise the policy directly as <code>&pi;(a|s;&theta;)</code> and do gradient <i>ascent</i>
on expected return. It sounds circular, since the return depends on the environment and you
cannot differentiate through that. One identity makes it work, and it is the basis of every
method used on large models today, including the one that fine-tunes chatbots.</p></div>

<h3>Why bother, when Q-learning exists</h3>
<ul>
<li><b>Continuous actions.</b> <code>max<sub>a</sub> Q(s,a)</code> over a continuous action space
is itself an optimisation problem at every single step. A policy network just outputs the action,
or the parameters of a distribution over actions.</li>
<li><b>Stochastic policies come naturally.</b> Sometimes randomness is genuinely optimal, in
poker or rock-paper-scissors or any partially observed setting, and a value-greedy policy cannot
express it.</li>
<li><b>Smooth improvement.</b> A small parameter change produces a small behaviour change. With
&epsilon;-greedy on Q, a tiny value change can flip an argmax and change the policy discontinuously,
which is a real source of instability.</li>
<li><b>Direct optimisation.</b> You are ascending the objective you care about, rather than
minimising a value error and hoping the argmax follows.</li>
</ul>

<h3>The objective, and the problem</h3>
<div class="mathblock">J(&theta;) = E<sub>&tau;~&pi;<sub>&theta;</sub></sub>[ G(&tau;) ]&nbsp;&nbsp;&nbsp;&nbsp;maximise over &theta;</div>
<p>The expectation is over trajectories, and the distribution over trajectories depends on
&theta;. So you cannot push the gradient inside the expectation, which is what you would normally
do. You also cannot differentiate through the environment, which is a black box and possibly the
physical world.</p>

<h3>The score function trick</h3>
<p>The identity that unlocks it is three lines. Start with the gradient of an expectation,
multiply and divide by the density, and recognise the derivative of a logarithm:</p>
<div class="mathblock">&nabla;<sub>&theta;</sub> E[f(x)] = &nabla;<sub>&theta;</sub> &int; p<sub>&theta;</sub>(x) f(x) dx = &int; &nabla;<sub>&theta;</sub>p<sub>&theta;</sub>(x) f(x) dx
&nbsp;&nbsp;&nbsp;&nbsp;= &int; p<sub>&theta;</sub>(x) [&nabla;<sub>&theta;</sub>p<sub>&theta;</sub>(x) / p<sub>&theta;</sub>(x)] f(x) dx
&nbsp;&nbsp;&nbsp;&nbsp;= E[ f(x) &nabla;<sub>&theta;</sub> log p<sub>&theta;</sub>(x) ]</div>
<p>The gradient of an expectation became an expectation of a gradient, which you can estimate by
sampling. Apply it to trajectories, and the environment dynamics drop out of the log because they
do not depend on &theta;. What survives is the <b>policy gradient theorem</b>:</p>
<div class="mathblock">&nabla;<sub>&theta;</sub>J(&theta;) = E[ &Sigma;<sub>t</sub> G<sub>t</sub> &nabla;<sub>&theta;</sub> log &pi;(a<sub>t</sub>|s<sub>t</sub>;&theta;) ]</div>
<p>No model, no differentiating through physics. Just the log-probability of the actions you
actually took, weighted by how well things went.</p>

<h3>REINFORCE, and how to read it</h3>
<p>The algorithm is four steps: run an episode with the current policy, compute the return
following each step, take a gradient ascent step on
<code>G<sub>t</sub> &nabla; log &pi;(a<sub>t</sub>|s<sub>t</sub>)</code>, repeat.</p>
<p>The plain-English reading is short and it is worth saying out loud. <b>If the episode went
well, make every action you took more likely. If it went badly, make them all less likely.</b>
That is obviously crude, since a good episode probably contained some bad moves and they all get
reinforced together. It works because over many episodes the bad moves appear in poor episodes
too, and the effects average out. Slowly.</p>

<h3>Variance, and the baseline</h3>
<p>REINFORCE is unbiased and extremely noisy, because the return of a whole episode is a very
rough measure of one action's quality. The standard fix is to subtract a <b>baseline</b>:</p>
<div class="mathblock">&nabla;<sub>&theta;</sub>J = E[ (G<sub>t</sub> &minus; b(s<sub>t</sub>)) &nabla;<sub>&theta;</sub> log &pi;(a<sub>t</sub>|s<sub>t</sub>;&theta;) ]</div>
<p>Any function of the state works, because
<code>E[b(s)&nabla;log&pi;] = b(s)&nabla;&Sigma;<sub>a</sub>&pi;(a|s) = b(s)&nabla;1 = 0</code>.
The baseline is free: it changes nothing in expectation and can cut the variance dramatically.</p>
<p>The natural choice is <code>b(s) = V(s)</code>, the average return from that state. Then the
weight becomes <code>G<sub>t</sub> &minus; V(s<sub>t</sub>)</code>, an estimate of the
<b>advantage</b>: how much better this action was <i>than average from here</i>. That is a far
more informative signal than the raw return. An action worth 100 in a state where everything is
worth 100 deserves no reinforcement at all, and the baseline is what encodes that.</p>

<div class="hardidea">🧠 <b>The baseline is why "reward everything in a winning episode" stops
being absurd.</b> Without it, in a game where every score is between 900 and 1000, every action
gets a large positive push and the policy barely moves in any useful direction. Subtract the
average and only the actions that beat the average get reinforced. Same information, a different
zero point, and the difference between an algorithm that works and one that does not.</div>
`,
 quiz:{title:'Quick check, policy gradients',questions:[
   {q:'The score function trick lets you:',
    options:[
             'Replace the discount factor with a learned per-state horizon','Differentiate through the environment dynamics using a learned model',
             'Compute the exact policy gradient without collecting any episodes',
             'Turn the gradient of an expectation into an expectation you can sample'],answer:3,whyWrong:['γ is fixed by you and appears in the return. Nothing about the identity touches it.','It avoids differentiating through the environment altogether, which is why no model is needed.','It gives you an estimator you can sample. You still have to collect episodes to evaluate it.',''],
    why:'∇E[f] = E[f ∇log p]. The environment terms do not depend on θ, so they drop out of the log and never need to be differentiated.'},
   {q:'REINFORCE in one sentence:',
    options:[
             'Fit a model of the dynamics, then plan through it',
             'Follow the gradient of the TD error with respect to the value parameters',
             'If the episode went well make those actions more likely, otherwise less likely','Estimate Q for every action, then take the largest'],answer:2,whyWrong:['That is model-based RL. REINFORCE never builds a model of anything.','That is TD learning on a value function. REINFORCE updates the policy parameters directly.','','That is Q-learning. REINFORCE never estimates action values.'],
    why:'Crude but unbiased. A good episode reinforces its bad moves too, and only averaging over many episodes sorts that out.'},
   {q:'Subtracting a baseline b(s) from the return is valid because:',
    options:[
             'It is small enough that the resulting bias can be ignored in practice',
             'It only changes the scale of the gradient, not its direction',
             'The learning rate is adjusted to compensate for the shift','It cancels in expectation, since the expected score function is zero'],answer:3,whyWrong:['There is no bias to ignore. The correction is exact, not approximate.','It changes the weight on each term, which changes direction as well as scale. That is the whole benefit.','Nothing is adjusted to compensate, because nothing needs compensating.',''],
    why:'E[b(s)∇log π] = b(s)∇1 = 0. It is genuinely free: unbiased, and often a large reduction in variance.'},
   {q:'With b(s) = V(s), the weight G − V(s) estimates:',
    options:['The entropy of the policy at that state','The advantage, how much better that action was than average','The probability that the action taken was the optimal one','The temporal difference error at that single step'],answer:1,whyWrong:['Entropy measures how spread out the policy is, and it does not appear in this expression.','','No probability of optimality is computed anywhere. The quantity is a difference of returns.','The TD error is a one-step quantity. G is the full return, so this is the Monte Carlo advantage.'],
    why:'An action worth 100 in a state where everything is worth 100 deserves no push. The advantage is what encodes that, and it is the signal actor-critic methods use.'}
 ]}}
,

{id:'rl12',
 title:'Actor-critic, advantage, and PPO: what everyone actually runs',
 body:`
<div class="ground"><span class="gTag">🎯 Combine the two families, then stop the update from going too far</span>
<p>Value methods are sample-efficient and awkward with continuous actions. Policy methods handle
anything but are noisy and throw their data away after one use. Actor-critic takes both: a
policy that acts, and a value function that criticises. Add one more idea, a limit on how far the
policy may move in a single update, and you have PPO, which is the default in most of the field
and the algorithm behind RLHF.</p></div>

<h3>The two components</h3>
<p>The <b>actor</b> is the policy <code>&pi;(a|s;&theta;)</code>. It chooses. The <b>critic</b> is
a value function <code>V(s;w)</code>. It evaluates. Each trains the other: the critic learns by
TD on the actor's experience, and the actor takes policy-gradient steps weighted by the critic's
assessment.</p>
<p>The point is that the critic replaces the whole-episode return with a one-step estimate. Use
the TD error as the advantage:</p>
<div class="mathblock">A&#770;<sub>t</sub> = r<sub>t+1</sub> + &gamma;V(s<sub>t+1</sub>) &minus; V(s<sub>t</sub>) = &delta;<sub>t</sub>
&theta; &larr; &theta; + &alpha; &delta;<sub>t</sub> &nabla;<sub>&theta;</sub> log &pi;(a<sub>t</sub>|s<sub>t</sub>;&theta;)
w &larr; w + &beta; &delta;<sub>t</sub> &nabla;<sub>w</sub> V(s<sub>t</sub>;w)</div>
<p>The same &delta; drives both updates, which is neat and also a good way to remember them.
Because the advantage is available after one step, the actor can update online rather than
waiting for the episode to finish, and the variance is far below REINFORCE's.</p>
<p>Between one-step TD and the full return sits <b>generalised advantage estimation</b>, which
takes an exponentially weighted average of n-step advantages with parameter &lambda;. It is the
same bias-variance dial as TD(&lambda;), applied to the advantage, and in practice GAE with
&lambda; around 0.95 is close to universal.</p>

<h3>The problem PPO exists to solve</h3>
<p>Policy gradient steps are dangerous in a way supervised steps are not. A step that is too
large produces a much worse policy, that worse policy collects worse data, and you learn from the
worse data. There is no fixed dataset to fall back on. A single bad update can destroy a run that
took hours, and recovery is not guaranteed.</p>
<p><b>TRPO</b> attacked this properly: maximise the objective subject to a constraint that the new
policy stays within a KL-divergence trust region of the old one. It works and the theory is good.
It is also awkward, requiring a conjugate-gradient solve and a line search inside every update.</p>
<p><b>PPO</b> gets most of the benefit with a clip. Let
<code>r<sub>t</sub>(&theta;)</code> be the probability ratio between the new and old policy for the
action actually taken:</p>
<div class="mathblock">r<sub>t</sub>(&theta;) = &pi;(a<sub>t</sub>|s<sub>t</sub>;&theta;) / &pi;(a<sub>t</sub>|s<sub>t</sub>;&theta;<sub>old</sub>)
L(&theta;) = E[ min( r<sub>t</sub>A&#770;<sub>t</sub>,&nbsp; clip(r<sub>t</sub>, 1&minus;&epsilon;, 1+&epsilon;)A&#770;<sub>t</sub> ) ]</div>
<p>Read the min carefully, because the asymmetry is the whole design. If the advantage is
positive and the ratio has already grown past <code>1+&epsilon;</code>, the clipped term is
smaller, the min selects it, and the gradient vanishes: you have moved far enough toward this
action, stop. If the advantage is negative and the ratio has fallen below
<code>1&minus;&epsilon;</code>, the same logic stops you pushing further away. But if the ratio
has moved in the <i>wrong</i> direction, the unclipped term is smaller and the min selects it, so
the correction is not clipped. <b>PPO limits how far you can go on purpose and never limits how
far you can come back.</b></p>
<p>With the clip in place, the same batch of data can be reused for several gradient epochs
without the policy running away from the data that generated it. That is where PPO's sample
efficiency comes from, and &epsilon; is typically 0.2.</p>

<h3>The full objective, as implemented</h3>
<div class="mathblock">L = L<sup>clip</sup> &minus; c<sub>1</sub>L<sup>value</sup> + c<sub>2</sub>H[&pi;]</div>
<p>Three terms. The clipped policy objective. A value-function regression loss for the critic,
usually sharing a trunk with the actor. And an <b>entropy bonus</b>, which rewards the policy for
staying uncertain and is the standard defence against premature collapse onto one action. Drop
the entropy term and a run will often converge confidently to something mediocre.</p>

<div class="demystify"><b>The alphabet soup, sorted.</b> <b>A2C</b> is advantage actor-critic run
across parallel environments. <b>A3C</b> is the older asynchronous version, largely superseded
once people realised the synchronous variant was simpler and no worse. <b>DDPG</b>, <b>TD3</b> and
<b>SAC</b> are the off-policy continuous-control family; SAC adds an entropy term to the objective
itself rather than as a bonus, and is the usual first choice for robotics. <b>PPO</b> is on-policy
and is the default for almost everything else, including language models. If you need one
algorithm to try first, it is PPO.</div>

<div class="hardidea">🧠 <b>PPO is not the best algorithm, it is the most forgiving one.</b> On
many benchmarks SAC or TD3 beat it on sample efficiency, and the clip has no strong theoretical
guarantee of the kind TRPO has. What PPO has is robustness: it works across an unusually wide
range of problems without much tuning, and it degrades gently when the hyperparameters are wrong.
For a field where reproducing published results is notoriously hard, that is worth more than a
few points on a benchmark, and it is why it became the default.</div>
`,
 quiz:{title:'Quick check, actor-critic and PPO',questions:[
   {q:'The critic\'s job in an actor-critic method is to:',
    options:[
             'Provide a low-variance advantage estimate to weight the policy gradient','Choose which action the agent takes at each step',
             'Decide when the episode should be terminated early',
             'Store past transitions so they can be replayed later'],answer:0,whyWrong:['','That is the actor\'s job. The critic never selects anything.','Termination comes from the environment. Neither component decides it.','That is a replay buffer, and standard actor-critic methods are on-policy and do not use one.'],
    why:'The TD error δ serves as the advantage, so the actor can update after one step instead of waiting for the whole return.'},
   {q:'PPO\'s clipped objective is asymmetric because it:',
    options:['Applies a smaller clip range to negative advantages than to positive ones',
             'Clips the value loss but leaves the policy loss untouched',
             'Uses a different learning rate for the actor and the critic',
             'Limits how far you can move toward an action but not how far you can move back'],answer:3,whyWrong:['The clip range is the same on both sides. The asymmetry comes from the min, not from the range.','The clip applies to the policy ratio. The value loss is a separate term with no clip of this kind.','Different learning rates are common and have nothing to do with the shape of the clipped objective.',''],
    why:'The min picks the clipped term only when the ratio has moved too far in the intended direction. A correction in the wrong direction is never clipped.'},
   {q:'The entropy bonus in the PPO objective is there to:',
    options:[
             'Normalise the advantage estimates across parallel environments','Keep the policy from collapsing onto one action too early',
             'Compensate for the bias introduced by the clip',
             'Ensure the value function and the policy converge at the same rate'],answer:1,whyWrong:['Advantage normalisation is a separate implementation detail, applied to the advantages themselves.','','The clip introduces no bias that entropy could offset. They address different problems.','Nothing ties their convergence rates together, and the entropy term does not act on the critic.'],
    why:'It rewards staying uncertain. Drop it and runs frequently converge confidently onto something mediocre.'},
   {q:'PPO became the default mainly because:',
    options:[
             'It is robust across a wide range of problems without much tuning',
             'It is the only algorithm that supports continuous action spaces',
             'It is the most sample-efficient method available','It has the strongest theoretical guarantees of any policy gradient method'],answer:0,whyWrong:['','SAC, TD3 and DDPG all handle continuous actions, and several of them better than PPO does.','SAC and TD3 usually beat it on sample efficiency. Robustness is what PPO trades for.','TRPO has the stronger theory. PPO is the practical approximation to it.'],
    why:'SAC and TD3 often beat it on sample efficiency, and TRPO has the better theory. PPO tolerates bad hyperparameters, which in this field matters more.'}
 ]}}
,

{id:'rl13',
 title:'RLHF: how reinforcement learning ended up inside language models',
 body:`
<div class="ground"><span class="gTag">🎯 When you cannot write the reward, learn it</span>
<p>Every algorithm in this stream assumed a reward function existed. For "write a helpful,
honest reply" no such function can be written down. But a person can look at two replies and say
which is better, reliably and quickly. <b>Reinforcement learning from human feedback</b> turns
those comparisons into a reward model and then optimises against it. It is the step that turned
a text predictor into something you can hold a conversation with.</p></div>

<h3>Three stages</h3>
<p><b>1. Supervised fine-tuning.</b> Start from a pretrained language model and fine-tune it on a
few thousand high-quality demonstrations of the behaviour you want. Ordinary supervised learning,
no RL yet. This gets the model into the right neighbourhood, and skipping it makes everything
after it harder.</p>
<p><b>2. Train a reward model.</b> Sample several responses to the same prompt and ask people to
rank them. Train a model <code>r<sub>&phi;</sub>(prompt, response)</code> to score responses so
that the ranking is reproduced. The standard loss comes from the Bradley-Terry model of pairwise
preference:</p>
<div class="mathblock">L(&phi;) = &minus;E<sub>(x, y<sub>w</sub>, y<sub>l</sub>)</sub>[ log &sigma;( r<sub>&phi;</sub>(x, y<sub>w</sub>) &minus; r<sub>&phi;</sub>(x, y<sub>l</sub>) ) ]</div>
<p>where <code>y<sub>w</sub></code> won the comparison and <code>y<sub>l</sub></code> lost. Note
that only the <i>difference</i> of scores is constrained, so the absolute scale is arbitrary,
which is fine because policy gradients only ever use differences too.</p>
<p><b>Why rankings rather than scores.</b> Ask ten people to rate a response out of ten and you
get ten incompatible scales, drifting within each person across a session. Ask which of two is
better and agreement is far higher. The preference format is chosen because it is the question
humans answer consistently.</p>
<p><b>3. Optimise the policy with PPO.</b> The language model is the policy. A state is the
prompt plus the tokens generated so far, an action is the next token, and the reward model scores
the completed response. This is a proper RL problem with an enormous action space, one reward at
the end of the episode, and it is exactly what PPO was built to survive.</p>

<h3>The KL penalty, which is the part that matters</h3>
<p>Optimise the reward model hard enough and the policy finds its flaws. The reward model is a
neural network trained on a finite sample of human judgements, and it is wrong in places; a
sufficiently determined optimiser will locate those places and camp there. The output scores
brilliantly and reads as gibberish, sycophancy, or a particular phrase repeated. This is
<b>reward hacking</b>, and it is the boat spinning in the lagoon from the first lesson, in a
different suit.</p>
<p>The standard defence is a penalty for drifting away from the model you started from:</p>
<div class="mathblock">R(x, y) = r<sub>&phi;</sub>(x, y) &minus; &beta; KL[ &pi;<sub>&theta;</sub>(y|x) &#8214; &pi;<sub>SFT</sub>(y|x) ]</div>
<p>The reward model is only trustworthy near the distribution it was trained on. The KL term
keeps the policy in that neighbourhood, and &beta; is the dial between "optimise the proxy" and
"stay somewhere the proxy is still measuring the right thing". Set it too low and you get reward
hacking. Set it too high and the model barely changes.</p>

<h3>What came after, and why</h3>
<p><b>DPO</b> (direct preference optimisation) observes that the PPO stage has a closed-form
optimum given the reward model, and that you can therefore optimise the policy on the preference
data directly, with a supervised-looking loss and no reward model and no RL loop. It is much
simpler and much cheaper, and it is now common. Whether it fully matches PPO at scale is still
being argued.</p>
<p><b>RLAIF</b> replaces some human labels with model-generated ones, judged against a written set
of principles. Constitutional AI is the well-known version. The motivation is cost and throughput:
human preference data is slow and expensive, and it is the bottleneck.</p>

<div class="hardidea">🧠 <b>RLHF optimises what the labellers rewarded, which is not the same as
what is true.</b> If annotators mildly prefer confident answers, the model learns to sound
confident, including when it should not. If they prefer agreement, it learns to agree, which is
where sycophancy comes from. If they prefer longer answers, everything gets longer, and length
bias in preference data is well documented. None of this is a bug in the algorithm. The algorithm
did exactly what it was asked. <b>The reward function is the specification</b>, which is where
this stream started, and at this scale the specification is the aggregate of what a few thousand
people clicked while tired.</div>
`,
 quiz:{title:'Quick check, RLHF',questions:[
   {q:'Human preference data is collected as rankings rather than numeric ratings because:',
    options:['Rankings can be collected from more people in parallel',
             'People agree far more with each other on comparisons than on absolute scores',
             'The reward model can only be trained on discrete labels',
             'Numeric ratings would make the reward scale unbounded'],answer:1,whyWrong:['Parallelism is the same either way. The difference is in how consistent the answers are.','','Reward models train perfectly well on continuous targets. The constraint is on what humans can give reliably.','Only the differences between scores are constrained anyway, so the absolute scale was never the issue.'],
    why:'Ratings out of ten drift between people and within one person across a session. "Which is better" is the question humans answer consistently.'},
   {q:'The KL penalty against the initial model is there to:',
    options:[
             'Ensure the generated responses stay within a fixed token budget',
             'Reduce the variance of the policy gradient estimates','Keep the policy where the reward model is still a trustworthy measure',
             'Prevent the model from forgetting its pretraining vocabulary'],answer:2,whyWrong:['Length is controlled by generation settings, not by a divergence penalty.','Variance is handled by the advantage estimator and the clip. The KL term is about staying in distribution.','','Vocabulary is not at risk. What is at risk is drifting to where the reward model no longer measures anything real.'],
    why:'The reward model is a network fitted to finite data and is wrong in places. Optimise hard enough and the policy finds them. β is the dial between optimising the proxy and staying where the proxy still measures the right thing.'},
   {q:'In the PPO stage of RLHF, what plays the role of an action?',
    options:['The reward model score','A single generated token','The complete response to the prompt','The human preference label'],answer:1,whyWrong:['The score is the reward, not the action.','','The whole response is the episode. Each token is one step within it.','The preference label trains the reward model, and it is not part of the RL loop at all.'],
    why:'State is prompt plus tokens so far, action is the next token, reward arrives once at the end. Enormous action space and one terminal reward, which is what PPO was built to survive.'},
   {q:'Sycophancy in an RLHF-trained model is best understood as:',
    options:[
             'A property of the pretraining corpus rather than the fine-tuning','A failure of the PPO clipping range to constrain the update',
             'The model optimising exactly what annotators rewarded',
             'Evidence that the KL penalty was set too high during training'],answer:2,whyWrong:['Pretraining produces a text predictor, not an agreeable one. The agreeableness is learned in the preference stage.','The clip constrains how far each update moves. It does not decide what the objective rewards.','','A high KL penalty would keep the model closer to where it started, which is the opposite of this drift.'],
    why:'If labellers mildly prefer agreement, the trained model agrees. The algorithm worked. The specification was the aggregate of what a few thousand tired people clicked.'}
 ]}}
,

{id:'rl14',
 title:'What reinforcement learning is still bad at, and when not to use it',
 body:`
<div class="ground"><span class="gTag">🎯 The honest summary</span>
<p>RL has produced some of the most striking results in machine learning and it remains difficult
to deploy. Knowing where the difficulty lives is what separates someone who has read about it
from someone who has shipped it. Most of what follows is not solved, and being clear about that
is more useful than a list of successes.</p></div>

<h3>Sample efficiency</h3>
<p>This is the central problem. DQN needed around 200 million Atari frames. OpenAI Five played
the equivalent of hundreds of years of Dota per day. AlphaStar's training consumed decades of
StarCraft. Humans reach competence in these games in hours.</p>
<p>The consequence is practical rather than philosophical: <b>RL is mostly restricted to problems
you can simulate</b>. If every interaction costs a real robot movement, a real advertising spend,
or a real patient, you cannot afford millions of them. Model-based RL and offline RL are the two
serious lines of attack, and neither is finished.</p>

<h3>Reward specification</h3>
<p>You are not specifying behaviour, you are specifying a score, and the agent will find the
highest-scoring behaviour whether or not it resembles what you meant. Every practitioner
collects examples: the boat spinning in the lagoon, the simulated robot that learned to fall over
in the direction of the goal rather than walk, the cleaning agent that learned to knock things
over so it could tidy them again.</p>
<p><b>Reward shaping</b>, adding intermediate rewards to guide learning, is the usual response and
it is dangerous. Add a reward for approaching the ball and the agent may learn to approach the
ball and stop. There is one safe form, <b>potential-based shaping</b>: any term of the form
<code>&gamma;&Phi;(s&prime;) &minus; &Phi;(s)</code> provably leaves the optimal policy unchanged.
Anything else changes what is optimal, and you had better be sure you meant to.</p>

<h3>The reproducibility problem</h3>
<p>Deep RL results are unusually hard to reproduce. Published papers have shown the same algorithm
with different random seeds producing performance ranges wider than the gaps between algorithms.
Implementation details that appear in the code but not the paper often matter more than the
stated contribution: observation normalisation, advantage normalisation, learning rate annealing,
how the last step of a truncated episode is handled.</p>
<p>The practical advice that follows is unglamorous and it is real. Run several seeds and report
the spread, never a single curve. Start from a maintained implementation rather than writing your
own. And when comparing algorithms, be suspicious of any gap smaller than the seed variance.</p>

<h3>Safety during learning</h3>
<p>An agent learns by making mistakes. In a simulator that is free. On a real robot, a real
network, or a real financial position, some mistakes are not recoverable. Constrained MDPs, safe
exploration and shielding all address this, and the honest state of the art is that most
production deployments avoid the problem instead: train in simulation, transfer to reality, and
never let the live system explore.</p>

<h3>When to use it, and when not to</h3>
<p><b>Reach for RL when</b>: the decision is sequential and early choices constrain later ones;
you can judge outcomes but cannot demonstrate correct behaviour; you can simulate cheaply, or you
have a large log of past decisions and their outcomes; and the objective is genuinely capturable
as a number.</p>
<p><b>Do not reach for RL when</b>: a labelled dataset exists or could be built, which makes
supervised learning both easier and better; each interaction is expensive or irreversible;
you cannot state the objective precisely enough to defend it under optimisation pressure; or a
simple rule, a bandit, or an optimiser would do. A great many problems described as reinforcement
learning are contextual bandits, and contextual bandits are far easier to get right.</p>

<div class="notebox">📌 <b>What to take away from the stream.</b> The loop is agent, action,
state, reward. The return is the discounted sum, and &gamma; is a modelling decision rather than a
knob. The Bellman equation turns an exponential lookahead into one linear equation per state, and
its contraction property is why bootstrapping works. TD learns from a guess corrected by a fact.
Q-learning learns the optimal policy from non-optimal behaviour, which is what makes replay
possible. Policy gradients optimise behaviour directly, and a baseline turns a crude signal into
an advantage. PPO limits how far one update may move. And the reward function is the
specification, which is the sentence to keep if you keep only one.</div>
`,
 quiz:{title:'Quick check, limits and judgement',questions:[
   {q:'The main practical consequence of RL\'s sample inefficiency is that:',
    options:[
             'Rewards have to be clipped to a fixed range','Value functions must be approximated rather than tabulated',
             'It is largely restricted to problems you can simulate cheaply',
             'Exploration has to be scheduled rather than left to chance'],answer:2,whyWrong:['Clipping is a convenience for cross-task hyperparameters, and it is unrelated to how many samples are needed.','Approximation is forced by the size of the state space, not by how many interactions you can afford.','','Exploration needs a schedule whether samples are cheap or expensive.'],
    why:'Millions of interactions are free in a simulator and unaffordable with a real robot, a real budget, or a real patient. Model-based and offline RL are the two serious attacks on it.'},
   {q:'Potential-based reward shaping is safe because:',
    options:[
             'It leaves the optimal policy unchanged, provably',
             'It decays to zero as training progresses',
             'It is applied only to states the agent has already visited','It only ever adds positive reward, so the agent cannot be discouraged'],answer:0,whyWrong:['','Decay is not what makes it safe, and a decaying non-potential term can still change the optimal policy.','It applies to every transition, and where it applies is not what preserves the optimum.','It is signed. Φ(s′) can be smaller than Φ(s), and that is exactly what makes the sum telescope.'],
    why:'Terms of the form γΦ(s′) − Φ(s) cannot change what is optimal. Any other shaping term can, and usually does.'},
   {q:'The reproducibility advice that follows from seed variance in deep RL is:',
    options:[
             'Prefer on-policy methods, which have lower variance across seeds','Fix the random seed so results are deterministic and comparable',
             'Run several seeds, report the spread, and distrust gaps smaller than it',
             'Report the best run, since it shows what the algorithm can achieve'],answer:2,whyWrong:['On-policy methods vary across seeds too. The variance is not a property of one family.','Fixing one seed hides the variance rather than measuring it, and the number you report is then arbitrary.','','Reporting the best run is how the problem got this bad. It measures luck as much as method.'],
    why:'Published work has shown seed-to-seed ranges wider than the gaps between algorithms, and unreported implementation details often matter more than the stated contribution.'},
   {q:'A team wants to pick which of five banner images to show each visitor, with the outcome known immediately. The right tool is:',
    options:[
             'Deep Q-learning with a replay buffer over visitor sessions',
             'PPO with a reward model trained on click preferences',
             'Monte Carlo control with an ε-greedy policy over sessions','A contextual bandit, since there is no sequential structure to exploit'],answer:3,whyWrong:['Deep Q-learning assumes state transitions worth planning through. Here each visitor is independent.','Preferences are not needed. The click is a direct reward, so there is nothing for a reward model to infer.','Monte Carlo control is for episodes with delayed outcomes. This outcome arrives immediately.',''],
    why:'One decision, immediate feedback, no state transitions. A great many problems described as reinforcement learning are contextual bandits, and bandits are far easier to get right.'}
 ]}}

]});

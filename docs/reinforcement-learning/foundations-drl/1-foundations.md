---
sidebar_position: 1
---

# Foundations on Reinforcement Learning

This lecture covers Markov Decision Processes (MDPs) and exact solution methods, laying the groundwork for understanding key concepts. We'll define the main components of MDPs—states, actions, transition probabilities, and rewards—and look at exact solution methods like dynamic programming. While these methods work well for small-scale problems, they don't scale effectively to larger ones, pointing to the need for advanced techniques that we'll discuss in later lectures. We'll also introduce the maximum entropy formulation, an approach that improves exploration and robustness in reinforcement learning (RL) agents.

## Motivation

The excitement around deep reinforcement learning (DPRL) began in 2013 when DeepMind showed that neural net agents using DPRL could learn to play various Atari games. This breakthrough was significant as previous RL results were limited to small, simple problems. Suddenly, agents could process visual inputs and learn to play different games without specific programming for each.

At Berkeley, researchers explored DPRL in robotics, particularly with simulated robots like the swimmer, hopper, and 2D walker. These robots learned their tasks—swimming, hopping, and running—through trial and error. Initially, they struggled, but over time, they improved significantly, mastering their skills through RL. In 2015, a major milestone was reached when DeepMind's AlphaGo defeated the human world champion in Go, an achievement many thought was years away, with RL at its core.

Berkeley's researchers continued to push the boundaries with simulated robots, moving from 2D to full 3D robots learning to run. These robots improved through repeated trials, learning from their experiences. Transitioning from simulations to real robots, BRETT (Berkeley Robot for the Elimination of Tedious Tasks) learned tasks like inserting blocks into matching openings through RL. Running the same algorithms on multiple robots, they discovered that robots could share data and learn faster, demonstrating the power of RL in physical robots.

In 2017, OpenAI's bot succeeded in the complex game of Dota 2, beating top human players, showing that DPRL could handle much more complex video games beyond Atari. At Berkeley, researchers showed that simulated robots could learn a wide range of acrobatic skills through trial and error, even for non-human robots like a simulated lion. In 2019, DeepMind's AlphaStar demonstrated near top human-level performance in Starcraft, combining imitation learning and RL. Another highlight from OpenAI was a robot hand learning to solve a Rubik's Cube through RL, showcasing DPRL's practical applications and potential.

These examples illustrate the potential of RL. It's not just about the impressive final results but the fact that these agents acquire skills through their own trial and error learning, demonstrating robust learning capabilities that can adapt to new tasks. This progress in DPRL is both exciting and promising for the future of artificial intelligence and robotics.

## Markov Decision Processes (MDPs)

RL operates within the framework of Markov Decision Processes (MDPs). This framework provides a structured environment where an agent interacts by choosing actions that influence the state of the environment, which in turn provides feedback in the form of rewards.

In an MDP, the agent's interaction cycle involves observing the current state, taking an action, and receiving a reward based on the new state. This reward assesses how favorable the new state is. For example, in a video game, the score might serve as the reward, while for a running robot, the distance covered could determine the reward. The agent's objective is to maximize its cumulative reward by learning the optimal action for each situation through repeated interactions.

<!-- <center>
<p>
    <img src="/assets/images/rl/mdp.png" alt="MDP agent-environment interaction. Source: Adapted from the lecture slides." width="75%" height="auto">
    <p>MDP agent-environment interaction. Source: Adapted from the lecture slides.</p>
</p>
</center> -->

The key components that define an MDP are:

1. **Set of States ($S$):** The different situations the agent can encounter.
2. **Set of Actions ($A$):** The possible actions the agent can take.
3. **Transition Function ($P(s'\|s,a)$):** This defines the probability of transitioning to a new state (s') given the current state (s) and action (a).
4. **Reward Function ($R(s,a,s')$):** This assigns a reward based on the transition from state s to state s' via action a.
5. **Start State ($s_0$):** The initial state or distribution of states where the agent begins.
6. **Discount Factor ($\gamma$):** This factor accounts for the preference of immediate rewards over future rewards. For example, if rewards are monetary, money available now can be invested to grow, making future money less valuable in comparison. Thus, future rewards are discounted.
7. **Horizon ($H$):** The length of time over which the agent will operate and make decisions.

:::info Goal

The goal is for the agent to learn a policy that maximizes its expected discounted reward over time:

$$
\underset{\pi}{max}\ \mathbb E[\displaystyle\sum_{t=0}^H \gamma^t \cdot R(S_t, A_t, S_{t+1})|\pi]
$$

:::

:::tip Examples
1. Consider a cleaning robot where the **states** include the robot's position and the layout of the house. **Actions** might include moving or picking up objects. The **transition model** describes the outcome probabilities of these actions, and the **reward function** could be based on cleanliness or organization.

2. For a running robot, **states include** joint angles and velocities, with motor torques as **actions**. The **reward** might be for staying still or moving forward.

    In both cases, the **discount factor** and **horizon** are chosen based on the desired timeframe for evaluating performance.

3. Other examples include balancing a pole, playing games like Tetris or Go, managing server requests, or navigating self-driving cars. Each of these problems can be mapped onto the MDP framework, allowing the use of reinforcement learning algorithms to find optimal policies.
:::

:::note Grid World
Throughout the course, a canonical example called grid world will be used to build intuition about MDPs and reinforcement learning algorithms. In grid world, an agent navigates a grid to reach a goal while avoiding obstacles and pitfalls, with rewards assigned to reaching specific squares. This simple environment allows for fast experimentation and helps visualize optimal policies. The discount factor in grid world incentivizes the shortest path to the goal, demonstrating the importance of timely actions in maximizing rewards.


<!-- <center>
<p>
    <img src='/assets/images/rl/grid-world-intro.png' alt='Grid World example. Source: Adapted from the lecture slides.' width='70%' height='auto'>
    <p>Grid world example. Source: Adapted from the lecture slides.</p>
</p>
</center> -->

:::

## Exact Solution Methods

### Value Iteration

**Optimal Value Function $V^*$**

The core concept of value iteration revolves around the optimal value function $V^*(s)$. This function represents the maximum expected discounted sum of rewards that can be achieved from state $s$ by following the optimal policy. Essentially, it quantifies the best possible outcome starting from any given state.

$$
V^*(s) = \underset{\pi}{max}\ \mathbb E[\displaystyle\sum_{t=0}^H \gamma^t \cdot R(s_t, a_t, s_{t+1})|\pi, s_0=s]
$$

:::note Grid World
To illustrate this, consider our grid world example. The agent in this world can move in four directions, except into boundaries. If it lands on a minus-one square, it receives a reward of -1 and the episode ends; if it lands on a plus-one square, it receives a reward of +1 and the episode ends.

<!-- <center>
<p>
    <img src='/assets/images/rl/grid-world-actions.png' alt='Possible action in grid world. Source: Adapted from the lecture slides.' width='70%' height='auto'>
</p>
</center> -->

Let's imagine three different scenarios:

1. A deterministic environment with no discounting ($\gamma$ = 1) and a horizon $H$ of 100 steps, we can calculate the value function as follows:
   - $V^*(4,3)$: The agent immediately collects the +1 reward.
   - $V^*(3,3)$: The agent moves right to collect the +1 reward in one step.
   - $V^*(2,3)$: The agent moves right twice to collect the reward, still yielding a value of +1 due to no discounting.
   - $V^*(1,1)$: It takes five steps to reach the reward, but still has a value of +1.
   - $V^*(4,2)$: The agent is stuck in the bomb and receives a reward of -1.<br/><br/>


2. Introducing a discount factor gamma of 0.9, where actions are still deterministic:
   - $V^*(4,3)$: The value remains 1 because the reward is immediate.
   - $V^*(3,3)$: The reward is delayed by one step, so the value is $0.9^1 \times 1 = 0.9$.
   - $V^*(2,3)$: The value is delayed by two steps, so the value is $0.9^2 \times 1 = 0.81$.
   - $V^*(1,1)$: The value is $0.9^5 \times 1 = 0.59$.
   - $V^*(4,2)$: The value remains -1 due to the bomb.<br/><br/>


3. Adding further complexity, if the action success probability drops to 0.8, the agent faces uncertainty:
   - $V^*(4,3)$: The value remains 1 since grabbing the prize is certain.
   - $V^*(3,3)$: Moving right has an 80% success rate. If successful, the value is $0.9 \times 1$. With a 20% chance, the agent may stay in place (trying to move up), move down or move left, affecting the value recursively based on neighboring squares.


This recursive dependency on neighboring values is the essence of value iteration. The value of each state is updated based on expected values from possible actions and their outcomes, iterating until convergence.
:::

:::tip Algorithm

Start with $V^*_0(s)=0$ for all $s$.<br/>
For $k=1, \cdots, H$ steps:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For all states $s$ in $S$:

$$
\begin{gather}
V_k^*(s) \leftarrow \max_a \sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma V^*_{k-1}(s')) \\
\pi_k^*(s) \leftarrow \underset{a}{\operatorname{argmax}} \sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma V^*_{k-1}(s'))
\end{gather}
$$

:::


**Value Iteration Convergence**


Value iteration demonstrates a key property: **convergence**. As iterations progress, the value function gradually stops changing, indicating convergence. This means that running the algorithm long enough will yield a stationary optimal policy and the infinite horizon value, even without needing to run infinite iterations. The speed of convergence is influenced by the discount factor $\gamma$. A lower discount factor (closer to 0) accelerates convergence, while a higher discount factor (closer to 1) slows it down.

:::note Theorem
Value iteration converges. At convergence, we have found the optimal value function $V^*$ for the discounted infinite horizon problem, which satisfies the Bellman equations.

$$
\forall s \in S: V^*(s)=\max_A

\sum_{s'} T(s,a,s')[R(s,a,s')+\gamma V^*(s')]
$$

:::


Running value iteration until convergence produces $V^\*$, from which we can extract the optimal action using the Bellman equation or by storing the optimal action during the algorithm’s execution. Importantly, the infinite horizon policy is stationary: the optimal action for any state $s$ remains the same over time. This efficiency in storage means we only need to store an action for each state, not for each time step, creating a convenient policy $\pi^\*$ that prescribes the optimal action for each state.

$$
\pi^*(s)=\underset{a\ \in\ A}{\operatorname{argmax}}

\sum_{s'}T(s,a,s')[R(s,a,s')+\gamma V^*(s')]
$$


:::tip Why does value iteration converge?

$V^\*(s)$ represents the expected sum of rewards starting from state $s$ and acting optimally over infinite steps. Similarly, $V^\*_H(s)$ is the expected sum of rewards starting from state $s$ and acting optimally over $H$ steps. The additional rewards collected beyond $H$ steps can be expressed as a geometric series, discounted by $\gamma$:

$$
\gamma^{H+1}R(s_{H+1})+\gamma^{H+2}R(s_{H+2})+\cdots 

\le

\gamma^{H+1}R_{\max} + \gamma^{H+2}R_{\max} + \cdots

= \frac{\gamma^{H+1}}{1-\gamma}R_{\max}
$$

Where $R_{\text{max}}$ is the maximum possible reward. As the horizon $H$ increases, $\gamma^{H+1}$ shrinks because $\gamma$ is less than 1. Consequently, the difference between the optimal value $V^\*$ for infinite horizon and the optimal value $V^\*_H$ for finite horizon $H$ decreases, becoming negligible as $H$ grows larger. This guarantees that value iteration converges, as the difference between $V^\*$ and $V^\*_H$ approaches zero.

:::


:::tip Convergence through Contractions

Another way to understand the convergence of value iteration is through contractions. The key idea involves defining a norm, such as the max norm:

$$
||U|| = \max_s |U(s)|
$$

Where the max norm of a vector is the maximum absolute value among all its entries. 

An update operation is a $\gamma$-contraction in the max norm if, for any two vectors $U_i$ and $V_i$, the updated vectors $U_{i+1}$ and $V_{i+1}$ are closer together by a factor of $\gamma$ compared to the original vectors $U_i$ and $V_i$.

$$
||U_{i+1}-V_{i+1}|| \le \gamma ||U_i-V_i||
$$

A theorem states that a contraction converges to a unique fixed point regardless of initialization. Intuitively, this means that no matter where you start, the vectors get pulled closer together over time, eventually converging to the same point.

Value iteration is a $\gamma$-contraction in the max norm. When applying a Bellman update to two different starting points, the resulting value functions are brought closer together. As a contraction, running the updates long enough ensures convergence to the optimal value function, $V^*$.

Additionally, you can bound the error during the iteration process. The size of the update indicates how close you are to convergence. If the update is small, it means future changes will also be small, allowing you to estimate the error even with a finite number of iterations. This means you can stop value iteration once the updates are sufficiently small, indicating that you're close enough to the optimal value function.

$$
||V_{i+1}-V_i|| \le \epsilon, \Rightarrow ||V_{i+1}-V^*|| \lt \frac{2\epsilon\gamma}{(1-\gamma)}
$$

:::
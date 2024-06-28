---
title: Foundations of Deep RL
author: Lucas Cruz
date: 2024-06-14
category: reinforcement-learning
layout: post
permalink: /foundations-drl
---

This post is based on the [Foundations of Deep RL](https://www.youtube.com/playlist?list=PLwRJQ4m4UJjNymuBM9RdmB3Z9N5-0IlY0) series, from professor Pieter Abbeel's channel.

<!-- prettier-ignore -->
> **WIP - Update 28/06/24:** Content written up to Lecture 1
{: .block-danger }

<h1>Table of Contents</h1>

<!-- no toc -->
- [MDPs, Exact Solution Methods, Max-ent RL](#mdps-exact-solution-methods-max-ent-rl)
  - [Motivation](#motivation)
  - [Markov Decision Processes (MDPs)](#markov-decision-processes-mdps)
  - [Exact Solution Methods](#exact-solution-methods)
  - [Maximum Entropy Formulation](#maximum-entropy-formulation)
- [Deep Q-Learning](#deep-q-learning)
- [Policy Gradients and Advantage Estimation](#policy-gradients-and-advantage-estimation)
- [TRPO and PPO](#trpo-and-ppo)
- [DDPG and SAC](#ddpg-and-sac)
- [Model-based RL](#model-based-rl)


# MDPs, Exact Solution Methods, Max-ent RL

## Motivation

- 2013 - Atari (DQN) [Deepmind]
- 2014 - 2D locomotion (TRPO) [Berkeley]
- 2015 - Alphago [Deepmind]
- 2016 - 3D locomotion (TRPO + GAE) [Berkeley]
- 2016 - Real Robot Manipulation (GPS) [Berkeley]
- 2017 - Dota 2 (PPO)
- 2018 - Deepmimic [Berkeley]
- 2019 - Alphastar [Deepmind]
- 2019 - Rubik’s cube (PPO + DR) [Open AI]

## Markov Decision Processes (MDPs)

The agent gets to choose an action based on the observations of the environment, then the environment changes returning a reward. This process is repeated and the agent learns the best actions to maximize its rewards.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/500e27ac-a6df-4cd3-bdc3-8860fcc844e0/Untitled.png)

An MDP is defined by:

- Set of States **$S$**
- Set of Actions **$A$**
- Transition function **$P(s'|s,a)$**
- Reward function **$R(s,a,s')$**
- Start state $s_0$
- Discount factor $\gamma$
- Horizon $H$

**Goal: find a policy that maximizes the expected discounted reward over time.**

$$
\underset{\pi}{max}\ \mathbb E[\displaystyle\sum_{t=0}^H \gamma^t \cdot R(S_t, A_t, S_{t+1})|\pi]
$$

### Examples

- Cleaning robot
- Walking robot
- Pole balancing
- Games: Tetris, backgammon
- Server management
- Shortest path problems
- Model for animals, people

## Exact Solution Methods

### Value Iteration

#### Optimal Value Function $V^*$

Optimal Value Function $V^*$: Sum of discounted rewards when starting from state $s$ and acting optimally

$$
V^*(s) = \underset{\pi}{max}\ \mathbb E[\displaystyle\sum_{t=0}^H \gamma^t \cdot R(s_t, a_t, s_{t+1})|\pi, s_0=s]
$$

To know the value of one state, we get a recursive equation in terms of the neighboring states that we might transition to. 

#### Value Iteration

We have to initialize the value function:

- $V^*_0(s)$ is the optimal value for state $s$ when $H=0$, which means when there are no time steps in the future.
    - $V_0^*(s) = 0\ \forall s$
- $V^*_1(s)$ is the optimal value for state $s$ when $H=1$, when there is 1 time step in the future.
    - $V_1^*(s) = \displaystyle \max_a \sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma V^*_0(s'))$. We look at all actions available in that state and sum over all future states.
- $V^*_2(s)$ is the optimal value for state $s$ when $H=2$.
    - $V_2^*(s) = \displaystyle \max_a \sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma V^*_1(s'))$.

So for each action, we check what the expected reward we would get right away. And then we average (weighted by the transition dynamics) the rewards we would get in the future.

- $V^*_k(s)$ is the optimal value for state $s$ when $H=k$.
    - $V_2^*(s) = \displaystyle \max_a \sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma V^*_{k-1}(s'))$.

#### Algorithm

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e169eb52-5751-42e6-9e41-5ef419d5167e/Untitled.png)

#### Value Iteration Convergence

> **Theorem.** Value iteration converges. At convergence, we have found the optimal value function $V^*$ for the discounted infinite horizon problem, which satisfies the Bellman equations.
> 

$$
\forall s \isin S: V^*(s)=\max_A

\sum_{s'} T(s,a,s')[R(s,a,s')+\gamma V^*(s')]
$$

- Now we know how to act for an infinite horizon with discounted rewards!
    - Run value iteration till convergence.
    - This produces $V^*$, which in turn tells us how to act (or we can store and compute in the iteration), namely the following:
    
    $$
    \pi^*(s)=\argmax_{a\ \isin\ A}
    
    \sum_{s'}T(s,a,s')[R(s,a,s')+\gamma V^*(s')]
    $$
    
- Note: the infinite horizon optimal policy is stationary, i.e., the optimal action at a state $s$ is the same action at all times (efficient to store!).

#### Convergence: Intuition

Given:

- $V^*(s)=$ expected sum of rewards accumulated starting from state $s$, acting optimally for $\infty$ steps.
- $V^*_H(s)=$ expected sum of rewards accumulated starting from state $s$, acting optimally for $H$ steps.
- Additional reward collected over time steps $H+1, H+2,\cdots$  goes to zero as $H$ goes to infinity. Hence $V^*_H \xrightarrow{H\rarr \infty} V^*$.

$$
\gamma^{H+1}R(s_{H+1})+\gamma^{H+2}R(s_{H+2})+\cdots 

\le

\gamma^{H+1}R_{\max} + \gamma^{H+2}R_{\max} + \cdots

= \frac{\gamma^{H+1}}{1-\gamma}R_{\max}
$$

The rewards collected are bounded by the maximum reward achievable, and as we increase our horizon, that is the number of iterations we run our value iteration algorithm, the numerator will keep shrinking since gamma is smaller than 1. So the difference between optimal value $V^*$ for infinite horizon and $V^*_H$ for finite horizon $H$ is bounded.

If the rewards can be negative, we have to redo the derivation with the absolute value of the rewards.

#### Convergence and Contractions

- Definition: max-norm:

$$
||U|| = \max_s |U(s)|
$$

- Definition: An update operation is a $\gamma$-contraction in max-norm if and only if for all $U_i, V_i$:

$$
||U_{i+1}-V_{i+1}|| \le \gamma ||U_i-V_i||
$$

There is, we are bringing $U$ and $V$ closer together over time (subscript $i$) by a factor gamma each step.

- Theorem: A contraction converges to a unique fixed point, no matter the initialization.
- Fact: the value iteration update is a $\gamma$-contraction in max-norm.
- Corollary: value iteration converges to a unique fixed point.
- Additional fact:
    - I.e. once the update is small, it must also be close to converged.

$$
||V_{i+1}-V_i|| \le \epsilon, \Rightarrow ||V_{i+1}-V^*|| \lt \frac{2\epsilon\gamma}{(1-\gamma)}
$$

#### Q-Values

Analogously to the Value function, we have Q-Values, that are going to be important in the future, and help us solve small MDPs, where we can loop through all the states and actions repeatedly.

$Q^*(s,a)=$ expected utility starting in $s$, taking action $a$, and (thereafter) acting optimally.

Bellman Equation:

$$
Q^*(s,a)=\sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma \max_{a'}Q^*(s',a'))
$$

Q-Value Iteration:

$$
Q^*_{k+1}(s,a) \larr \sum_{s'}P(s'|s,a)(R(s,a,s')+\gamma\max_{a'}Q^*_k(s',a'))
$$

### Policy Iteration

Some of the approximate methods we are going to see in the future are built on Value Iteration, but some are built on Policy Iterations.

#### Policy Evaluation

In policy evaluation, we fix a policy and sample the action from that policy, we do not maximize the expected reward by choosing action.

- Policy evaluation for a given $\pi(s)$:

$$
V^\pi_k(s) \larr \sum_{s'} P(s'|s,\pi(s))(R(s,\pi(s),s')+

\gamma V^\pi_{k-1} (s))
$$

At convergence:

$$
\forall s \ V^\pi(s) \larr \sum_{s'} P(s'|s,\pi(s))(R(s,\pi(s),s')+

\gamma V^\pi (s))
$$

For a stochastic policy, we have the iteration:

$$
V^\pi_{k+1}(s) \larr \sum_{s'} \sum_a

\pi(a|s)P(s'|s,a) (

R(s,a,s')+\gamma V^\pi_k(s')

)
$$

#### Policy Iteration

- Policy evaluation for current policy $\pi_k$:
    - Iterate until convergence

$$
V^{\pi_k}_{i+1}(s) \larr \sum_{s'} P(s'|s,\pi_k(s))(R(s,\pi_k(s),s')+

\gamma V^{\pi_k}_{i} (s'))
$$

- Policy improvement: find the best action according to a one-step look-ahead:

$$
\pi_{k+1}(s) \larr \argmax_a \sum_{s'} P(s'|s,a)[R(s,a,s')+

\gamma V^{\pi_k} (s')]
$$

So we choose an action that maximizes the immediate reward and then we follow the previous policy to get the discounted value.

We repeat until policy converges. At convergence: optimal policy; and converges faster than value iteration under some conditions.

#### Policy Iteration Guarantees

- **Theorem.** Policy iteration is guaranteed to converge and at convergence, the current policy and its value function are the optimal policy and the optimal value function.

Proof Sketch:

- *Guarantee to converge:* in every step, the policy improves. This means that a given policy can be encountered at most once. This means that after we have iterated as many times as there are different policies, i.e., $(\text{number of actions})^{(\text{number of states})}$, we must be done and hence have converged.
- *Optimal at convergence:* by definition, at convergence $\pi_{k+1}(s) = \pi_k(s)$ for all states $s$, This means $\forall s \ V^{\pi_k}(s)-\max_a\sum_{s'}T(s,a,s')[R(s,a,s')+\gamma V_i^{\pi_k}(s')]$. Hence $V^{\pi_k}$ satisfies the Bellman equation, which means $V^{\pi_k}$ is equal to the optimal value function $V^*$.

## Maximum Entropy Formulation

This is another method to frame MDPs, and some methods in the future will borrow ideas from this method.

#### What if we could find a distribution over near-optimal solutions?

- More robust policy: if the environment changes, the distribution over near-optimal solutions might still have some good ones for the new situation.
- More robust learning: if we can retain a distribution over near-optimal solutions our agent will collect more interesting exploratory data during learning.

#### Entropy

Entropy is the measure of uncertainty over a random variable $X$, the number of bits required to encode $X$, on average. Log 2 is used in the case of bits, but it can be measured with a natural log.

$$
\mathcal{H}(X) = \sum_ip(x_i)\log_2\frac{1}{p(x_i)}=-\sum_ip(x_i) \log_2 p(x_i)
$$

#### Maximum Entropy MDP

- Regular formulation:

$$
\max_\pi \mathbb{E} [\sum_{t=0}^Hr_t]
$$

- Max-ent formulation (discount is left out for simplification):

$$
\max_\pi \mathbb{E} [\sum_{t=0}^Hr_t + \beta \mathcal{H}(\pi(\cdot|s_t))]
$$

So we a maximizing the expected reward plus the entropy of the policy. The policy gives the action to take in each state. Beta is a trade-off factor, the more we can control our actions, the more precise the agent is in what it achieves and the reward it gets. The larger the beta, the more we focus on the entropy and the less reward we are going to get.

#### Constrained Optimization

- Original problem:

$$
\begin{aligned}
\max_x \ & f(x)\\
\textrm{s.t.} \ & g(x)=0\\
\end{aligned}
$$

- Lagrangian:

$$
\max_x\min_\lambda\mathcal{L}(x,\lambda)=f(x)+\lambda g(x)
$$

- At optimum:

$$
\frac{\partial\mathcal{L}(x,\lambda)}{\partial x} = 0 \\

\frac{\partial\mathcal{L}(x,\lambda)}{\partial \lambda} = 0
$$

#### Max-ent for 1-step problem

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88df98cf-9ad2-4d6f-852f-31623533c662/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1a97dc7-7a06-4320-b4b1-717f1be10ad7/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10decfca-6ae6-458d-835c-af0bc024f4c5/Untitled.png)

# Deep Q-Learning

# Policy Gradients and Advantage Estimation

# TRPO and PPO

# DDPG and SAC

# Model-based RL
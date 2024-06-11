---
title: Basic Statistical Concepts
author: Lucas Cruz
date: 2024-06-11
category: statistics
layout: post
permalink: /basic-stats
---

> WIP
{: .block-danger }

## Random Variable
A random variable is a variable whose values depend on outcomes of a random process. It is a mathematical function that assigns a numerical value to each outcome in a sample space of a random experiment.

**Types of Random Variables:**
- **Discrete Random Variable:** Takes on a countable number of distinct values. Example: The number of heads in 10 coin flips.
- **Continuous Random Variable:** Takes on an infinite number of possible values. Example: The time taken for a computer to process a task.

## Probability Distributions
A probability distribution describes how the values of a random variable are distributed. It gives the probability that a random variable will take on each of its possible values.

### Types of Probability Distributions:
- **Discrete Probability Distributions:** Include probability mass functions (PMFs) which assign probabilities to discrete outcomes.
  - **Example:** **Binomial Distribution** - Describes the number of successes in a fixed number of Bernoulli trials.
  - **Formula:** $$ P(X = k) = \binom{n}{k} p^k (1-p)^{n-k} $$
  
- **Continuous Probability Distributions:** Include probability density functions (PDFs) which describe the likelihood of a continuous random variable falling within a particular range of values.
  - **Example:** **Normal Distribution** - Often referred to as the bell curve.
  - **Formula:** $$ f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} $$

## Mean, Variance, and Expected Values
These are fundamental concepts in statistics that describe the central tendency and variability of a probability distribution.

### Mean
The mean (or expected value) of a random variable provides a measure of the central tendency. For a discrete random variable $$X$$ with a probability mass function $$P(x)$$:

$$ E(X) = \sum x \cdot P(x) $$

For a continuous random variable $$X$$ with a probability density function $$f(x)$$:

$$ E(X) = \int_{-\infty}^{\infty} x \cdot f(x) \, dx $$

### Variance
Variance measures the spread or dispersion of a set of values. It is the expected value of the squared deviation of a random variable from its mean.

$$ \text{Var}(X) = E[(X - E(X))^2] $$

### Standard Deviation
The standard deviation is the square root of the variance and provides a measure of the dispersion in the same units as the mean.

$$ \sigma = \sqrt{\text{Var}(X)} $$

## Sampling and Sampling Distributions
Sampling involves selecting a subset of data from a population to estimate characteristics of the whole population.

### Sampling Distribution
The sampling distribution is the probability distribution of a statistic (such as the sample mean) obtained from a large number of samples drawn from a specific population.

### Central Limit Theorem
The central limit theorem states that the sampling distribution of the sample mean will approximate a normal distribution, regardless of the shape of the population distribution, provided the sample size is sufficiently large (usually $$ n > 30 $$).

$$ \bar{X} \sim \mathcal{N}(\mu, \frac{\sigma^2}{n}) $$

By understanding these basic statistical concepts, one can effectively analyze and interpret data to make informed decisions in various fields such as ecommerce, digital systems, and machine learning.
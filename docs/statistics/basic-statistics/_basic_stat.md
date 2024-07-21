---
title: (Not that) Basic Statistical Concepts
---

{% include admonition.html type="abstract" title="Table of Contents" body="

- [Random Variable](#random-variable)
- [Probability Distributions](#probability-distributions)
  - [Types of Probability Distributions:](#types-of-probability-distributions)
- [Mean, Variance, and Expected Values](#mean-variance-and-expected-values)
  - [Mean](#mean)
  - [Variance](#variance)
  - [Standard Deviation](#standard-deviation)
- [Sampling and Sampling Distributions](#sampling-and-sampling-distributions)
  - [Sampling Distribution](#sampling-distribution)
  - [Central Limit Theorem](#central-limit-theorem)
- [Hypothesis Testing](#hypothesis-testing)
  - [P-Value](#p-value)

"%}

# Random Variable
A random variable is a variable whose values depend on outcomes of a random process. It is a mathematical function that assigns a numerical value to each outcome in a sample space of a random experiment.

> **Definition**
>
> A random variable $\mathcal{X}$ is a function from the sample space $\Omega$ to the set of real numbers $\mathbb{R}$:
> 
> $$
>  \mathcal{X}: \Omega \rightarrow \mathbb{R}
> $$
> 
> <br>
{: .block-tip }

**Types of Random Variables:**
- **Discrete Random Variable:** Takes specific, discrete values.
  - **Example:** The number of heads when flipping a coin 10 times. You can get 0, 1, 2, ..., or 10 heads, but not 3.5 heads.
- **Continuous Random Variable:** Takes on an infinite number of possible values.
  - **Example:** The time it takes to run a race. It could be 12.3 seconds, 12.31 seconds, 12.315 seconds, etc.

# Probability Distributions
A probability distribution describes how the values of a random variable are distributed. It gives the probability that a random variable will take on each of its possible values.

## Types of Probability Distributions:
- **Discrete Probability Distributions:** Include probability mass functions (PMFs) which assign probabilities to discrete outcomes, such that:

    $$
    \begin{gather*}
        0 \le \mathbb{P}(x) \le 1 \qquad \forall x \\
        \mathbb{P}(x=y)=\mathbb{P}(y) \qquad \forall y \\
        \sum_X \mathbb{P}(x) = 1
    \end{gather*}
    $$

    For example:

  - **Bernoulli Distribution:** The Bernoulli distribution describes experiments that have binary outcomes, e.g., result in either a success or a failure.
    - **Example:** Flipping a coin once, where heads is considered a success.
    - **Formula:**
       
        $$
        \mathbb{P}(x = k) = p^k (1-p)^{1-k} \quad \forall k \in \{0,1\}
        $$

    Where $p$ is the probability of success, $1-p$ is the probability of failure, and $k$ can be either 0 (failure) or 1 (success).

![Bernoulli distribution](/assets/images/stat/bernoulli.png)
<!-- {% include stat/bernoulli.html %} -->

  - **Poisson Distribution:** The Poisson distribution describes the number of events occurring within a fixed interval of time or space when these events happen independently of each other and at a constant rate.
    - **Example:** The number of emails you receive in an hour.
    - **Formula:**
       
        $$
        \mathbb{P}(x = k) = \frac{\lambda^k e^{-\lambda}}{k!}
        $$

    Where $\lambda$ is the average number of events in the interval, $k$ is the number of occurrences, and $e$ is the Euler's constant.


![Poisson distribution](/assets/images/stat/poisson.png)
<!-- {% include stat/poisson.html %} -->

- **Continuous Probability Distributions:** Include probability density functions (PDFs) which describe the likelihood of a continuous random variable falling within a particular range of values, such that:

    $$
    \begin{gather*}
        0 \le f(x) \\
        \mathbb{P}(a \le x \le b) = \int_a^b f(x) \,dx \\
        \int_\infty^{-\infty} f(x) \,dx = 1
    \end{gather*}
    $$

    For example:
  
  - **Uniform Distribution:** The uniform distribution describes an equal probability for all values within a specified range.
    - **Example:** The probability of randomly selecting a number between 1 and 10.
    - **Formula:**
    
    $$
    f(x) = 
    \begin{cases} 
    \frac{1}{b-a} & \text{for } a \leq x \leq b \\
    0 & \text{otherwise}
    \end{cases}
    $$

    Where $a$ and $b$ are the minimum and maximum values of the range.

![Uniform distribution](/assets/images/stat/uniform.png)
<!-- {% include stat/uniform.html %} -->

  - **Normal Distribution:** The normal distribution, often referred to as the Gaussian distribution or bell curve, describes data that clusters around a mean.
    - **Example:** Heights of people in a population.
    - **Formula:**
    
    $$
    f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
    $$

    Where $\mu$ is the mean and $\sigma$ is the standard deviation.

![Normal distribution](/assets/images/stat/normal.png)
<!-- {% include stat/normal.html %} -->

  - **Student's t-Distribution:** The Student's t-distribution is used to estimate population parameters when the sample size is small and the population standard deviation is unknown.
    - **Example:** The distribution of the sample mean for small sample sizes.
    - **Formula:**
    
    $$
    f(x) = \frac{\Gamma \left(\frac{\nu+1}{2}\right)}{\sqrt{\nu \pi} \Gamma \left(\frac{\nu}{2}\right)} \left(1 + \frac{x^2}{\nu}\right)^{-\frac{\nu+1}{2}}
    $$

    Where $\nu$ is the degrees of freedom, and $\Gamma$ the gamma function.

![T-distribution](/assets/images/stat/t-dist.png)
<!-- {% include stat/t-dist.html %} -->

# Mean, Variance, and Expected Values
These are fundamental concepts in statistics that describe the central tendency and variability of a probability distribution.

## Mean
The mean, $\mu$, of a probability provides a measure of the central tendency. For a discrete random variable $$X$$ with a probability mass function $$\mathbb{P}(x)$$:

$$ \mu = \sum_X x \cdot \mathbb{P}(x) $$

For a continuous random variable $$X$$ with a probability density function $$f(x)$$:

$$ \mu = \int_{-\infty}^{\infty} x \cdot f(x) \, dx $$

The mean can also be expressed in term of the **expected value**, i.e. the weighted average value of all possible outcomes of the random variable.

$$
    \mu = E(X)
$$

## Variance
Variance measures the spread or dispersion of a set of values. It is the expected value of the squared deviation of a random variable from its mean.

$$ \text{Var}(X) = \sigma^2 = E[(X - \mu)^2] $$

$$
\sigma^2 = 
\begin{cases}
    \int_{-\infty}^\infty(x-\mu)^2f(x)\,dx  & \text{$x$ continuous}\\
    \sum_X (x-\mu)^2\mathbb{P}(x) & \text{$x$ discrete}
\end{cases}
$$

## Standard Deviation
The standard deviation is the square root of the variance and provides a measure of the dispersion in the same units as the mean.

$$ \sigma = \sqrt{\text{Var}(X)} $$

# Sampling and Sampling Distributions
Sampling involves selecting a subset of data from a population to estimate characteristics of the whole population.

## Sampling Distribution
The sampling distribution is the probability distribution of a statistic (such as the sample mean) obtained from a large number of samples drawn from a specific population.

> WIP
{: .block-danger }


## Central Limit Theorem
The central limit theorem states that the sampling distribution of the sample mean will approximate a normal distribution, regardless of the shape of the population distribution, provided the sample size is sufficiently large (usually $$ n > 30 $$).

$$ \bar{X} \sim \mathcal{N}(\mu, \frac{\sigma^2}{n}) $$

> WIP
{: .block-danger }

# Hypothesis Testing

## P-Value

> WIP
{: .block-danger }
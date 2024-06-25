---
title: Designing Machine Learning Systems
author: Lucas Cruz
date: 2024-06-18
category: machine-learning
layout: post
permalink: /ml-systems
mermaid: true
---

This content is a summary and my key takeaways from the excellent book [Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/) by Chip Huyen.

<!-- prettier-ignore -->
> **Note:** This document is a very condensed version of the book, reflecting the points I found most relevant.
>
> For a more comprehensive coverage of the topics, **I highly recommend reading the full book**.
{: .block-warning }

<h1>Table of Contents</h1>

- [Chapter 1: Overview of Machine Learning Systems](#chapter-1-overview-of-machine-learning-systems)
  - [When to Use Machine Learning](#when-to-use-machine-learning)
  - [Machine Learning in Research Versus Production](#machine-learning-in-research-versus-production)
- [Chapter 2: Introduction to Machine Learning Systems Design](#chapter-2-introduction-to-machine-learning-systems-design)
  - [Business and ML Objectives](#business-and-ml-objectives)
  - [Requirements for ML Systems](#requirements-for-ml-systems)
  - [Iterative Process](#iterative-process)
  - [Objective Functions](#objective-functions)
    - [Decoupling Objectives](#decoupling-objectives)
  - [Mind Versus Data](#mind-versus-data)
- [Chapter 3: Data Engineering Fundamentals](#chapter-3-data-engineering-fundamentals)
- [Chapter 4: Training Data](#chapter-4-training-data)
  - [Sampling](#sampling)
  - [Labeling](#labeling)
    - [Hand Labels](#hand-labels)
    - [Natural Labels](#natural-labels)
    - [Handling the Lack of Labels](#handling-the-lack-of-labels)
  - [Class Imbalance](#class-imbalance)
    - [Challenges of Class Imbalance](#challenges-of-class-imbalance)
    - [Handling Class Imbalance](#handling-class-imbalance)
  - [Data Augmentation](#data-augmentation)
- [Chapter 5: Feature Engineering](#chapter-5-feature-engineering)
- [Chapter 6: Model Development and Offline Evaluation](#chapter-6-model-development-and-offline-evaluation)
- [Chapter 7: Model Deployment and Prediction Service](#chapter-7-model-deployment-and-prediction-service)
- [Chapter 8: Data Distribution Shifts and Monitoring](#chapter-8-data-distribution-shifts-and-monitoring)
- [Chapter 9: Continual Learning and Test in Production](#chapter-9-continual-learning-and-test-in-production)
- [Chapter 10: Infrastructure and Tooling for MLOps](#chapter-10-infrastructure-and-tooling-for-mlops)
- [Chapter 11: The Human Side of Machine Learning](#chapter-11-the-human-side-of-machine-learning)

# Chapter 1: Overview of Machine Learning Systems

## When to Use Machine Learning

Before starting a machine learning (ML) project, it is essential to determine if it is necessary or cost-effective.

<!-- prettier-ignore -->
> Machine Learning is an approach to (1) _learn_ (2) _complex patterns_ from (3) _existing data_ and use these patterns to make (4) _predictions_ on (5) _unseen data_.
{: .block-tip }

1. **Learn:** Most ML algorithms learn from data, meaning they can adjust the model's state based on feedback from the model's performance relative to the data. This learning process generally aims at approximating a desired function.
2. **Complex patterns:** ML algorithms are particularly useful when there is a complex mapping between input data and the desired output. This complexity makes it difficult to manually craft heuristics, as seen in tasks like image classification.
3. **Existing data:** Data must be available or feasible to collect. Without data, training an ML model is impossible. However, it is possible to launch an ML system without initial data in continual learning scenarios, where models are updated as data arrives in production.
4. **Predictions:** An ML model makes estimates to answer questions without existing answers. The key is to reframe the question as a predictive problem.
5. **Unseen data:** An ML model is only useful if it can generalize to new data. This implies that production and training data should come from similar, if not the same, distributions. We can only assume the distribution remains stable and monitor future performance to either trigger retraining or assess continual learning.

ML solutions are particularly suited to problems that:

6. **Are repetitive:** When a pattern appears frequently, machines can learn it more easily.
7. **Have a low cost of wrong predictions:** The consequences of incorrect predictions should be manageable.
8. **Are at scale:** The problem should be significant enough to justify the use of ML.

## Machine Learning in Research Versus Production

The focus in research is on optimizing a metric to excel in a benchmark. In production, the focus shifts to optimizing one or multiple business metrics, even if this means accepting lower F1 scores or other traditional ML metrics. Stakeholders may require constraints such as limited response time or maximized revenue, necessitating a balance of all requirements.

Computational priorities also differ: research prioritizes faster training with high parallelization and throughput, while production prioritizes fast inference with low latency and response time. Techniques like ensemble learning are less suited for production compared to methods that speed up inference, such as quantization, distillation, or low-rank factorization.

Other differences include time spent on data. In research, data is typically cleaned and ready for use in benchmark optimization. In production, significant effort is required for cleaning, labeling, feature engineering, and data collection. Additionally, production systems must consider model fairness from the start, and interpretability is crucial. If people do not trust the model, they will not use it.

# Chapter 2: Introduction to Machine Learning Systems Design

## Business and ML Objectives

<!-- prettier-ignore -->
> Most companies don't care about the fancy ML metrics.
{: .block-tip }

For an ML project to succeed within an organization, it's crucial to tie the performance of an ML system to business metrics. Most companies assess the impact of different ML models through experimentation, like A/B testing, and choose the model that leads to better business metrics, regardless of whether the model has better ML metrics.

The business metrics optimized by experiments can impact profit either directly (i.e., conversion rate or cost reduction) or indirectly (i.e., higher customer satisfaction or increased time spent on the site). Many companies create their own metrics to map business metrics to ML metrics, such as [Netflix's _take rate_](https://netflixtechblog.com/artwork-personalization-c589f074ad76).

## Requirements for ML Systems

Most ML systems should satisfy 4 common requirements: reliability, scalability, maintainability, and adaptability.

1. **Reliability:** The system should continue to perform correctly at the desired level of performance, even in the face of adversity (hardware, software, or human errors). ML systems can fail silently, and methods to monitor them are discussed in Chapter 8.
2. **Scalability:** An ML system should be able to scale up or down according to demand and manage all artifacts, models, and data produced.
3. **Maintainability:** Workloads should be structured so that people from different backgrounds and expertise can contribute and use the same tools. Code should be documented, and code, data, and artifacts should be versioned. Models should be reproducible.
4. **Adaptability:** ML systems should be able to evolve in response to data shifts, changes in targets, or business objectives without service interruption.

## Iterative Process

<center>
<p>
    <img src="/assets/gitbook/images/ml-sys/ml_design_process.png" alt>
    <p>Iterative process of an ML system design. Source: Adapted from the book.</p>
</p>
</center>

Brief description of the steps of an ML system design process:

1. **Project Scoping:** Define objectives, goals, constraints, resources needed, and stakeholders.
2. **Data Engineering:** After defining initial requirements, work with the data. This includes curation through sampling techniques, labeling, and defining data pipelines.
3. **ML Model Development:** Engineer features and develop initial models (the “fun” part).
4. **Deployment:** Make the trained models available to users.
5. **Monitoring and continual learning:** Monitor performance in production, ensuring the system remains reliable, scalable, maintainable, and adaptable.
6. **Business Analysis:** Evaluate model performance against business goals and generate new business insights.

## Objective Functions

### Decoupling Objectives

Models often need to optimize multiple objectives. Traditionally, this is done by combining objectives during loss calculation and tuning $\alpha$ and $\beta$:

$$
loss = \alpha \, \text{objective}_1 + \beta \, \text{objective}_2
$$

A better practice is to train different models for each objective and then weight the outputs by $\alpha$ and $\beta$. This allows changing system behavior without retraining and applying different monitoring policies for each model, improving maintainability.

$$
\text{score} = \alpha \, \text{score}_1 + \beta \, \text{score}_2
$$

## Mind Versus Data

The discussion of mind versus data revolves around approaches to ML systems development. The "mind" approach favors spend more time researching inductive bias and architectural designs, while the "data" approach favors getting more data and computation. There are arguments supporting both data-centric and model-centric development of ML systems.

<!-- prettier-ignore -->
> Here are some recommended readings:
>
> 1. [Anand Rajaraman, "More data usually beats better algorithms"](https://anand.typepad.com/datawocky/2008/03/more-data-usual.html)
> 2. [Richard Sutton, "The Bitter Lesson"](https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf)
> 3. [Judea Pearl, "The book of Why"](https://bayes.cs.ucla.edu/WHY/)
> 4. [Discussion between Yann LeCun and Christopher Manning about Deep Learning and Innate Priors](https://www.youtube.com/watch?v=fKk9KhGRBdI)
> 5. [Alon Halevy, Peter Norvig, and Fernando Pereira, "The Unreasonable Effectiveness of Data"](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf)
{: .block-tip}

# Chapter 3: Data Engineering Fundamentals

<!-- prettier-ignore -->
> This chapter is very introductory. The recommendation is Martin Kleppmann's book [Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/), which I plan on writing about on this blog in the future.
{: .block-tip}

Key topic from the chapter:

- **Modes of Dataflow**
  - **Data Passing Through Databases:** The simplest mode, but the slowest because it relies on multiple processes to read/write from the same database.
  - **Data Passing Through Services:** This is a _request-driven_ architecture. Data is passed from service A to B directly through request. The main issue with this architecture is that it become excessively complicated the more services you have depending on each other's data synchronously.
  - **Data Passing Through Real-Time Transport:** The _event-driven_ architecture bypass that issue because the services writing and reading messages/events are decoupled, the communication is made through a broker. Also, we use the in-memory storage to broker data. The two most common types of real-time transport are pubsub (publish-subscribe) and message queue:
    - **PubSub:** Any service can read or write to different topics in a real-time transport, and the service that generated the event doesn't care about the services consuming it. Common solutions for PubSub are Apache Kafka, Amazon Kinesis, and Google Cloud Pub/Sub.
    - **Message Queue:** Often an event (or message) generated is destined for a specific consumer, and the message queue is responsible for delivering the right message for the right consumer. Common solutions for message queue are Apache RocketMQ and RabbitMQ.

# Chapter 4: Training Data

## Sampling

Sampling occurs at several stages of an ML project lifecycle (e.g., sampling real-world data to create training data; sampling from a dataset to create training/validation/test splits; sampling events for better monitoring the ML system, etc.) and is often overlooked in typical ML coursework. Choosing the right sampling method helps mitigate possible biases and improves data efficiency.

**Nonprobability Sampling**

Nonprobability sampling is not based on any probability criteria. The samples selected are not representative and are often riddled with selection bias. Common methods include:

- **Convenience sampling:** Samples of data are selected based on their availability.
- **Snowball sampling:** Future samples are selected based on existing samples. For example, when scraping legitimate Twitter accounts, you start with a small number of accounts, then you scrape all accounts they follow.
- **Judgment sampling:** Experts decide which samples to include.
- **Quota sampling:** Samples are selected based on quotas for slices of data without randomization or knowledge of the underlying distribution.

Examples of applications that use this kind of sampling include large language models (text available on Wikipedia, Common Crawl, and Reddit); sentiment analysis (data collected from IMDB reviews or Amazon, which are biased toward users who leave reviews online); and self-driving cars (initially with data only available in areas where regulation permitted, e.g., Phoenix, Arizona, and the Bay Area).

**Simple Random Sampling**

Simple random sampling draws samples uniformly, regardless of the data distribution. Models trained with data sampled in this way might think rare classes don't exist due to the lack of representatives in the training data.

**Stratified Sampling**

This method splits data into groups we care about (e.g., groups related to the classes/labels or a specific feature) and then samples data from these groups. This ensures representation of each group in the training data. The drawback is that in some cases, this is not possible, such as in multi-label tasks.

**Weighted Sampling**

In weighted sampling, we assign each sample a probability of being selected. This allows us to leverage domain expertise to change a model's decision boundary. We can assign more weight to more relevant samples (e.g., more recent samples) or to mimic the distribution of the real world that is not represented in the collected data.

**Reservoir Sampling**

Reservoir sampling is a technique used when dealing with streaming data or when the total number of data points is unknown. It allows for maintaining a random sample of a fixed size from a potentially large or infinite stream of data. This is particularly useful when it's impractical to store the entire dataset in memory. The algorithm is:

1. Initialize a reservoir of size $k$;
2. Fill the reservoir with the first $k$ data points;
3. For each subsequent data point, the $n^{\text{th}}$ data point (where $n > k$), generate a random number $i \in [1, n]$, and replace the $i^\text{th}$ element of the reservoir if $i \le k$.

This ensures that each data point has an equal probability, $k/n$, of being included in the sample.

<center>
<p>
    <img src="/assets/gitbook/images/ml-sys/reservoir.png" alt>
    <a href="https://towardsdatascience.com/reservoir-sampling-for-efficient-stream-processing-97f47f85c11b">Source</a>
</p>
</center>

**Importance Sampling**

Importance sampling is a statistical technique used to estimate properties of a target distribution by sampling from a different distribution. This method is particularly useful in situations where it is difficult to sample directly from the target distribution, but easier to sample from an auxiliary distribution. So, if we have a distribution P(x) that is really expensive, slow, or unfeasible to sample from, we can define a _proposal distribution_ or _importance distribution_ $Q(x)$ that we can sample and weight this sample by $P(x)/Q(x)$. The following equation shows that, in expectation, $x$ sampled from $P(x)$ is equal to $x$ sampled from $Q(x)$ weighted by $P(x)/Q(x)$:

$$

\mathbb{E}_{P(x)}[x]  =  \sum_x P(x)x = \sum_x Q(x)x\frac{P(x)}{Q(x)} = \mathbb{E}_{Q(x)} \bigg[ x\frac{P(x)}{Q(x)} \bigg]


$$

Importance sampling is highly applicable in reinforcement learning, specially in off-policy algorithms, where the agent's behavior and target policies differ. That is, the agent learns from data collected by a different policy that the one it is currently trying to optimize. Importance sampling allows us to correct the bias by weighting the returns according to the probability of actions under the new policy, and then reuse historical data.

## Labeling

Labeling is a core component of any supervised ML system. The performance of an ML model depends heavily on the quantity and quality of the labeled data it's trained on.

### Hand Labels

Hand-labeling data can be expensive, especially if the data requires subject matter expertise (SME). For instance, labeling chest X-rays would require board-certified radiologists, whose time is limited and costly. Additionally, data privacy concerns must be addressed.

Manual labeling is also a very slow process. For example, to achieve an accurate transcription of speech utterance at the phonetic level, it is estimated to take 400 times longer than the duration of the utterance. This can make the system less adaptive to changing environments and requirements.

**Label Multiplicity**

When different sources or annotators provide data, it's common to have conflicting labels for a data instance, especially if the level of expertise required is high. Establishing ground rules and providing training to align labelers is essential.

**Data Lineage**

The system must be capable of differentiating data from multiple sources and labeling techniques using _data lineage_. This helps flag potential biases in the data and debug the models effectively.

### Natural Labels

Some tasks have natural ground truth labels, such as stock prediction or recommendation systems. Even if a task doesn't have natural labels, it can often be reframed to generate feedback on the predictions. For instance, offering users the option to submit a different translation in a translation system or using a like button in a newsfeed ranking task are forms of generating new labels.

**Feedback Loop Length**

Choosing the appropriate length for the feedback loop requires careful consideration and depends heavily on the task. It's a trade-off between speed and accuracy. For instance, a recommendation system on Amazon might receive feedback within minutes, while systems dealing with longer content, such as YouTube videos or blog posts, might have longer feedback loops. A short window allows for quicker detection of issues and faster adjustments, but it may also lead to premature labeling of recommendations before receiving complete feedback.

Feedback can come in different formats and at various stages of the system. For example, in an e-commerce application, feedback could include clicking on a product, adding a product to the cart, purchasing a product, rating, leaving a review, or returning a previously bought product.

### Handling the Lack of Labels

| Method            |                              How                               |                                                                             Ground truths required?                                                                              |
| ----------------- | :------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Weak Supervision  |     Leverages (often noisy) heuristics to generate labels.     |                                             No, but a small number of labels are recommended to guide the development of heuristics.                                             |
| Semi-Supervision  |      Leverages structural assumptions to generate labels.      |                                                     Yes, a small number of initial labels as seeds to generate more labels.                                                      |
| Transfer Learning | Leverages models pretrained on another task for your new task. | No for zero-shot learning. Yes for fine-tuning, though the number of ground truths required is often much smaller than what would be needed if you train the model from scratch. |
| Active Learning   |    Labels data samples that are most useful to your model.     |                                                                                       Yes.                                                                                       |

**Weak Supervision**

One of the most popular tools for weak supervision is Snorkel, developed by the Stanford AI Lab. This tool relies on the concept of labeling functions (LFs), which encode heuristics. These heuristics can be based on _keywords_, _regular expressions_, _database lookups_, the _outputs of other models_, etc.

**Semi-supervision**

Several semi-supervised techniques have been developed over the years. One of them is _self-training_, where you start by training a model on your existing set of labeled data and use this model to make predictions for unlabeled samples. You can expand your training set with high-probability labels and continue this process until you're satisfied with the results.

Additionally, clustering algorithms can label samples based on similarity with labeled samples. Another method is the perturbation-based approach, where you add perturbations to labeled samples to generate new samples with the same label, assuming the perturbations don't change the labels. This method is further discussed in the data augmentation section.

**Transfer Learning**

In transfer learning, a base model is trained on a base task with abundant training data (e.g., language modeling with next-token prediction). This model can then be used in a _zero-shot_ scenario or _fine-tuned_ for a downstream task. Fine-tuning involves tweaking the base model, such as continuing its training on data from the target task.

**Active Learning**

Active learning involves labeling data samples that are most useful to the model, based on specific metrics or heuristics. The most straightforward metric is uncertainty measurement, where you label the examples the model is least certain about, hoping they will help the model learn the decision boundary better. Another method is _query-by-committee_, which is based on the disagreement among an ensemble of candidate models.

<!-- prettier-ignore -->
> For a more comprehensive review of active learning methods, it's recommended to read Burr Settles's [Active Learning Literature Survey](https://burrsettles.com/pub/settles.activelearning.pdf).
{: .block-tip}

## Class Imbalance

Class imbalance is a common issue in many machine learning problems, where certain classes are significantly underrepresented compared to others. This can lead to models that perform well on the majority class but poorly on the minority class, resulting in biased and ineffective predictions. And in some applications, you're interested on the performance on the rare cases (i.e., detecting lung cancer).

### Challenges of Class Imbalance

1. **Biased Predictions:** The model tends to be biased towards the majority class, often ignoring the minority class, leading to poor performance on the latter. In the extreme case where there is no instance of the rare class in the training set, the model might assume these rare classes don't exist.
2. **Skewed Metrics and Overfitting:** The model might overfit to the majority class, failing to generalize well to the minority class or unseen data. It's easier for the model get stuck in a nonoptimal solution by exploiting simple heuristics, for example, if the model learns to always outputs the majority class and its accuracy is already 99%.
3. **Asymmetric Costs of Error:** The cost of a wrong prediction on a sample of the rare class might be much higher than a wrong prediction on a sample of the majority class, such as in the lung cancer detection example. Misclassification on an X-ray with cancerous cells is much more dangerous than misclassification on an X-ray of a normal lung.

### Handling Class Imbalance

Addressing class imbalance involves various techniques at both the data and algorithm levels to ensure that the model can learn effectively from imbalanced data.

<!-- prettier-ignore -->
> For a more comprehensive review of class imbalance methods, it's recommended to read Johnson and Khoshgoftaar's [Survey on deep learning with class imbalance](https://journalofbigdata.springeropen.com/articles/10.1186/s40537-019-0192-5).
{: .block-tip}

**Using the Right Evaluation Metrics**

Instead of relying on accuracy, use evaluation metrics that provide a clearer picture of the model's performance on imbalanced data:

- **Precision and Recall:** Measure the accuracy of positive predictions and the ability to find all positive instances.
- **F1 Score:** The harmonic mean of precision and recall, providing a single metric that balances both.

F1, precision, and recall are asymmetric metrics, which means that their values change depending on which class is considered the positive class.

- **Area Under the ROC Curve (AUC-ROC):** Evaluates the trade-off between true positive and false positive rates.


- **Area Under the Precision-Recall Curve (AUC-PR):** Particularly useful for imbalanced datasets, focusing on the performance for the minority class.


**Data-Level Methods: Resampling**



**Algorithm-Level Methods**

- **Cost-sensitive learning:**
- **Class-balanced loss:**

## Data Augmentation

<!-- prettier-ignore -->
> WIP
{: .block-danger }

# Chapter 5: Feature Engineering

# Chapter 6: Model Development and Offline Evaluation

# Chapter 7: Model Deployment and Prediction Service

# Chapter 8: Data Distribution Shifts and Monitoring

# Chapter 9: Continual Learning and Test in Production

# Chapter 10: Infrastructure and Tooling for MLOps

# Chapter 11: The Human Side of Machine Learning

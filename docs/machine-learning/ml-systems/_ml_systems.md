---
title: Designing Machine Learning Systems
author: Lucas Cruz
date: 2024-06-18
category: machine-learning
layout: post
permalink: /ml-systems
mermaid: true
---

{% include admonition.html type="info" title="Info"

body="This content is a summary and my personal takeaways from the excellent book <a href='https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/'>Designing Machine Learning Systems</a> by Chip Huyen. It reflects the points I found most relevant along with my own conclusions on the topics discussed.<br/><br/>

For a more comprehensive coverage of the topics, <b>I highly recommend reading the full book.</b>" %}

{% include admonition.html type="warninig" title="Warning" body="
**WIP - Update 28/06/24:** Content written up to Chapter 6.2
"%}


{% include admonition.html type="abstract" title="Table of Contents" body="

- [Chapter 1: Overview of Machine Learning Systems](#chapter-1-overview-of-machine-learning-systems)
  - [1.1 When to Use Machine Learning](#11-when-to-use-machine-learning)
  - [1.2 Machine Learning in Research Versus Production](#12-machine-learning-in-research-versus-production)
- [Chapter 2: Introduction to Machine Learning Systems Design](#chapter-2-introduction-to-machine-learning-systems-design)
  - [2.1 Business and ML Objectives](#21-business-and-ml-objectives)
  - [2.2 Requirements for ML Systems](#22-requirements-for-ml-systems)
  - [2.3 Iterative Process](#23-iterative-process)
  - [2.4 Mind Versus Data](#24-mind-versus-data)
- [Chapter 3: Data Engineering Fundamentals](#chapter-3-data-engineering-fundamentals)
- [Chapter 4: Training Data](#chapter-4-training-data)
  - [4.1 Sampling](#41-sampling)
  - [4.2 Labeling](#42-labeling)
    - [4.2.1 Hand Labels](#421-hand-labels)
    - [4.2.2 Natural Labels](#422-natural-labels)
    - [4.2.3 Handling the Lack of Labels](#423-handling-the-lack-of-labels)
  - [4.3 Class Imbalance](#43-class-imbalance)
    - [4.3.1 Challenges of Class Imbalance](#431-challenges-of-class-imbalance)
    - [4.3.2 Handling Class Imbalance](#432-handling-class-imbalance)
      - [4.3.2.1 Using the Right Evaluation Metrics](#4321-using-the-right-evaluation-metrics)
      - [4.3.2.2 Data-Level Methods: Resampling](#4322-data-level-methods-resampling)
      - [4.3.2.3 Algorithm-Level Methods](#4323-algorithm-level-methods)
  - [4.4 Data Augmentation](#44-data-augmentation)
    - [4.4.1 Simple Label-Preserving Transformations](#441-simple-label-preserving-transformations)
    - [4.4.2 Perturbation](#442-perturbation)
    - [4.4.3 Data Synthesis](#443-data-synthesis)
- [Chapter 5: Feature Engineering](#chapter-5-feature-engineering)
  - [5.1 Learned Features Versus Engineered Features](#51-learned-features-versus-engineered-features)
  - [5.2 Common Feature Engineering Operations](#52-common-feature-engineering-operations)
    - [5.2.1 Handling Missing Values](#521-handling-missing-values)
    - [5.2.2 Scaling](#522-scaling)
    - [5.2.3 Discretization](#523-discretization)
    - [5.2.4 Encoding Categorical Features](#524-encoding-categorical-features)
    - [5.2.5 Feature Crossing](#525-feature-crossing)
    - [5.2.6 Discrete and Continuous Positional Embeddings](#526-discrete-and-continuous-positional-embeddings)
  - [5.3 Data Leakage](#53-data-leakage)
    - [5.3.1 Common Causes for Data Leakage](#531-common-causes-for-data-leakage)
    - [5.3.2 Detecting Data Leakage](#532-detecting-data-leakage)
  - [5.4 Engineering Good Features](#54-engineering-good-features)
    - [5.4.1 Feature Importance](#541-feature-importance)
    - [5.4.2 Feature Generalization](#542-feature-generalization)
- [Chapter 6: Model Development and Offline Evaluation](#chapter-6-model-development-and-offline-evaluation)
  - [6.1 Six Tips for Model Selection](#61-six-tips-for-model-selection)
  - [6.2 Ensembles](#62-ensembles)
  - [6.3 Experiment Tracking and Versioning](#63-experiment-tracking-and-versioning)
  - [6.4 Distributed Training](#64-distributed-training)
  - [6.5 AutoML](#65-automl)
  - [6.6 Model Offline Evaluation](#66-model-offline-evaluation)
    - [6.6.1 Baselines](#661-baselines)
    - [6.6.2 Evaluation Methods](#662-evaluation-methods)
- [Chapter 7: Model Deployment and Prediction Service](#chapter-7-model-deployment-and-prediction-service)
- [Chapter 8: Data Distribution Shifts and Monitoring](#chapter-8-data-distribution-shifts-and-monitoring)
- [Chapter 9: Continual Learning and Test in Production](#chapter-9-continual-learning-and-test-in-production)
- [Chapter 10: Infrastructure and Tooling for MLOps](#chapter-10-infrastructure-and-tooling-for-mlops)
- [Chapter 11: The Human Side of Machine Learning](#chapter-11-the-human-side-of-machine-learning)

"%}

# Chapter 1: Overview of Machine Learning Systems


Machine learning (ML) has become a cornerstone of modern technology, driving advancements in various fields such as healthcare, finance, marketing, and more. However, the decision to use machine learning and the approach to building and deploying ML systems requires careful consideration and planning. This chapter provides a foundational overview of when to use machine learning, the differences between research and production environments, and the essential factors that influence the success of ML projects.


## 1.1 When to Use Machine Learning

Before starting a machine learning (ML) project, it is essential to determine if it is necessary or cost-effective.

{% include admonition.html type="quote" title="Quote"

body="Machine Learning is an approach to (1) _learn_ (2) _complex patterns_ from (3) _existing data_ and use these patterns to make (4) _predictions_ on (5) _unseen data_." %}


1. **Learn:** Most ML algorithms learn from data, meaning they can adjust the model's state based on feedback from the model's performance relative to the data. This learning process generally aims at approximating a desired function.
2. **Complex patterns:** ML algorithms are particularly useful when there is a complex mapping between input data and the desired output. This complexity makes it difficult to manually craft heuristics, as seen in tasks like image classification.
3. **Existing data:** Data must be available or feasible to collect. Without data, training an ML model is impossible. However, it is possible to launch an ML system without initial data in continual learning scenarios, where models are updated as data arrives in production.
4. **Predictions:** An ML model makes estimates to answer questions without existing answers. The key is to reframe the question as a predictive problem.
5. **Unseen data:** An ML model is only useful if it can generalize to new data. This implies that production and training data should come from similar, if not the same, distributions. We can only assume the distribution remains stable and monitor future performance to either trigger retraining or assess continual learning.

{% include admonition.html type="tip" title="ML solutions are particularly suited to problems that:" body="

1. **Are repetitive:** When a pattern appears frequently, machines can learn it more easily.
2. **Have a low cost of wrong predictions:** The consequences of incorrect predictions should be manageable.
3. **Are at scale:** The problem should be significant enough to justify the use of ML.
" %}

## 1.2 Machine Learning in Research Versus Production

The focus in research is on optimizing a metric to excel in a benchmark. In production, the focus shifts to optimizing one or multiple business metrics, even if this means accepting lower F1 scores or other traditional ML metrics. Stakeholders may require constraints such as limited response time or maximized revenue, necessitating a balance of all requirements.

Computational priorities also differ: research prioritizes faster training with high parallelization and throughput, while production prioritizes fast inference with low latency and response time. Techniques like ensemble learning are less suited for production compared to methods that speed up inference, such as quantization, distillation, or low-rank factorization.

Other differences include time spent on data. In research, data is typically cleaned and ready for use in benchmark optimization. In production, significant effort is required for cleaning, labeling, feature engineering, and data collection. Additionally, production systems must consider model fairness from the start, and interpretability is crucial. If people do not trust the model, they will not use it.

# Chapter 2: Introduction to Machine Learning Systems Design


Designing machine learning systems requires a holistic approach that encompasses both business objectives and technical requirements. A well-designed ML system not only delivers accurate predictions but also aligns with the overall goals of the organization. This chapter delves into the essential aspects of ML systems design, starting from aligning ML objectives with business goals to understanding the critical requirements for building robust and scalable systems. Additionally, it discusses the iterative nature of ML system development and the ongoing debate between data-centric and model-centric approaches in machine learning.


## 2.1 Business and ML Objectives

{% include admonition.html type="quote" title="Quote" body="
Most companies don't care about the fancy ML metrics.
" %}


For an ML project to succeed within an organization, it's crucial to tie the performance of an ML system to business metrics. Most companies assess the impact of different ML models through experimentation, like A/B testing, and choose the model that leads to better business metrics, regardless of whether the model has better ML metrics.

The business metrics optimized by experiments can impact profit either directly (i.e., conversion rate or cost reduction) or indirectly (i.e., higher customer satisfaction or increased time spent on the site). Many companies create their own metrics to map business metrics to ML metrics, such as [Netflix's _take rate_](https://netflixtechblog.com/artwork-personalization-c589f074ad76).

{% include admonition.html type="tip" title="Decoupling Objectives" body="
Models often need to optimize multiple objectives. Traditionally, this is done by combining objectives during loss calculation and tuning $\alpha$ and $\beta$:

$$
loss = \alpha \, \text{objective}_1 + \beta \, \text{objective}_2
$$

A better practice is to train different models for each objective and then weight the outputs by $\alpha$ and $\beta$. This allows changing system behavior without retraining and applying different monitoring policies for each model, improving maintainability.

$$
\text{score} = \alpha \, \text{score}_1 + \beta \, \text{score}_2
$$
" %}

## 2.2 Requirements for ML Systems

Most ML systems should satisfy 4 common requirements: reliability, scalability, maintainability, and adaptability.

1. **Reliability:** The system should continue to perform correctly at the desired level of performance, even in the face of adversity (hardware, software, or human errors). ML systems can fail silently, and methods to monitor them are discussed in Chapter 8.
2. **Scalability:** An ML system should be able to scale up or down according to demand and manage all artifacts, models, and data produced.
3. **Maintainability:** Workloads should be structured so that people from different backgrounds and expertise can contribute and use the same tools. Code should be documented, and code, data, and artifacts should be versioned. Models should be reproducible.
4. **Adaptability:** ML systems should be able to evolve in response to data shifts, changes in targets, or business objectives without service interruption.

## 2.3 Iterative Process

<center>
<p>
    <img src="/assets/images/ml-sys/ml_design_process.png" alt>
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

## 2.4 Mind Versus Data

The discussion of mind versus data revolves around approaches to ML systems development. The "mind" approach favors spend more time researching inductive bias and architectural designs, while the "data" approach favors getting more data and computation. There are arguments supporting both data-centric and model-centric development of ML systems.


{% include admonition.html type="reading" title="Recommended Readings" body=" "
refs="https://anand.typepad.com/datawocky/2008/03/more-data-usual.html||Anand Rajaraman, More data usually beats better algorithms;;;
https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf||Richard Sutton, The Bitter Lesson;;;
https://bayes.cs.ucla.edu/WHY/||Judea Pearl, The book of Why;;;
https://www.youtube.com/watch?v=fKk9KhGRBdI||Discussion between Yann LeCun and Christopher Manning about Deep Learning and Innate Priors;;;
https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/35179.pdf||Alon Halevy, Peter Norvig, and Fernando Pereira, The Unreasonable Effectiveness of Data
" %}


# Chapter 3: Data Engineering Fundamentals


{% include admonition.html type="reading" title="Recommended Readings" body="This chapter is very introductory. The recommendation is Martin Kleppmann's book:"
refs="https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/||Designing Data-Intensive Applications" %}

Key topic from the chapter:

- **Modes of Dataflow**
  - **Data Passing Through Databases:** The simplest mode, but the slowest because it relies on multiple processes to read/write from the same database.
  - **Data Passing Through Services:** This is a _request-driven_ architecture. Data is passed from service A to B directly through request. The main issue with this architecture is that it become excessively complicated the more services you have depending on each other's data synchronously.
  - **Data Passing Through Real-Time Transport:** The _event-driven_ architecture bypass that issue because the services writing and reading messages/events are decoupled, the communication is made through a broker. Also, we use the in-memory storage to broker data. The two most common types of real-time transport are pubsub (publish-subscribe) and message queue:
    - **PubSub:** Any service can read or write to different topics in a real-time transport, and the service that generated the event doesn't care about the services consuming it. Common solutions for PubSub are Apache Kafka, Amazon Kinesis, and Google Cloud Pub/Sub.
    - **Message Queue:** Often an event (or message) generated is destined for a specific consumer, and the message queue is responsible for delivering the right message for the right consumer. Common solutions for message queue are Apache RocketMQ and RabbitMQ.

# Chapter 4: Training Data

The quality and quantity of training data are critical to the success of any machine learning project. Effective sampling, labeling, handling class imbalance, and data augmentation are essential techniques to prepare robust datasets that improve model performance and generalization. This chapter explores various methods for creating and refining training datasets, ensuring they are comprehensive, representative, and suitable for training accurate and reliable machine learning models.

## 4.1 Sampling

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
    <img src="/assets/images/ml-sys/reservoir.png" alt>
    <a href="https://towardsdatascience.com/reservoir-sampling-for-efficient-stream-processing-97f47f85c11b">Source</a>
</p>
</center>

**Importance Sampling**

Importance sampling is a statistical technique used to estimate properties of a target distribution by sampling from a different distribution. This method is particularly useful in situations where it is difficult to sample directly from the target distribution, but easier to sample from an auxiliary distribution. So, if we have a distribution P(x) that is really expensive, slow, or unfeasible to sample from, we can define a _proposal distribution_ or _importance distribution_ $Q(x)$ that we can sample and weight this sample by $P(x)/Q(x)$. The following equation shows that, in expectation, $x$ sampled from $P(x)$ is equal to $x$ sampled from $Q(x)$ weighted by $P(x)/Q(x)$:

$$

\mathbb{E}_{P(x)}[x]  =  \sum_x P(x)x = \sum_x Q(x)x\frac{P(x)}{Q(x)} = \mathbb{E}_{Q(x)} \bigg[ x\frac{P(x)}{Q(x)} \bigg]


$$

Importance sampling is highly applicable in reinforcement learning, specially in off-policy algorithms, where the agent's behavior and target policies differ. That is, the agent learns from data collected by a different policy that the one it is currently trying to optimize. Importance sampling allows us to correct the bias by weighting the returns according to the probability of actions under the new policy, and then reuse historical data.

## 4.2 Labeling

Labeling is a core component of any supervised ML system. The performance of an ML model depends heavily on the quantity and quality of the labeled data it's trained on.

### 4.2.1 Hand Labels

Hand-labeling data can be expensive, especially if the data requires subject matter expertise (SME). For instance, labeling chest X-rays would require board-certified radiologists, whose time is limited and costly. Additionally, data privacy concerns must be addressed.

Manual labeling is also a very slow process. For example, to achieve an accurate transcription of speech utterance at the phonetic level, it is estimated to take 400 times longer than the duration of the utterance. This can make the system less adaptive to changing environments and requirements.

**Label Multiplicity**

When different sources or annotators provide data, it's common to have conflicting labels for a data instance, especially if the level of expertise required is high. Establishing ground rules and providing training to align labelers is essential.

**Data Lineage**

The system must be capable of differentiating data from multiple sources and labeling techniques using _data lineage_. This helps flag potential biases in the data and debug the models effectively.

### 4.2.2 Natural Labels

Some tasks have natural ground truth labels, such as stock prediction or recommendation systems. Even if a task doesn't have natural labels, it can often be reframed to generate feedback on the predictions. For instance, offering users the option to submit a different translation in a translation system or using a like button in a newsfeed ranking task are forms of generating new labels.

**Feedback Loop Length**

Choosing the appropriate length for the feedback loop requires careful consideration and depends heavily on the task. It's a trade-off between speed and accuracy. For instance, a recommendation system on Amazon might receive feedback within minutes, while systems dealing with longer content, such as YouTube videos or blog posts, might have longer feedback loops. A short window allows for quicker detection of issues and faster adjustments, but it may also lead to premature labeling of recommendations before receiving complete feedback.

Feedback can come in different formats and at various stages of the system. For example, in an e-commerce application, feedback could include clicking on a product, adding a product to the cart, purchasing a product, rating, leaving a review, or returning a previously bought product.

### 4.2.3 Handling the Lack of Labels

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

{% include admonition.html type="reading" title="Recommended Readings" body="For a more comprehensive review of active learning methods, it's recommended to read Burr Settles's paper:"
refs="https://burrsettles.com/pub/settles.activelearning.pdf||Active Learning Literature Survey" %}

## 4.3 Class Imbalance

Class imbalance is a common issue in many machine learning problems, where certain classes are significantly underrepresented compared to others. This can lead to models that perform well on the majority class but poorly on the minority class, resulting in biased and ineffective predictions. And in some applications, you're interested on the performance on the rare cases (i.e., detecting lung cancer).

### 4.3.1 Challenges of Class Imbalance

1. **Biased Predictions:** The model tends to be biased towards the majority class, often ignoring the minority class, leading to poor performance on the latter. In the extreme case where there is no instance of the rare class in the training set, the model might assume these rare classes don't exist.
2. **Skewed Metrics and Overfitting:** The model might overfit to the majority class, failing to generalize well to the minority class or unseen data. It's easier for the model get stuck in a nonoptimal solution by exploiting simple heuristics, for example, if the model learns to always outputs the majority class and its accuracy is already 99%.
3. **Asymmetric Costs of Error:** The cost of a wrong prediction on a sample of the rare class might be much higher than a wrong prediction on a sample of the majority class, such as in the lung cancer detection example. Misclassification on an X-ray with cancerous cells is much more dangerous than misclassification on an X-ray of a normal lung.

### 4.3.2 Handling Class Imbalance

Addressing class imbalance involves various techniques at both the data and algorithm levels to ensure that the model can learn effectively from imbalanced data.


{% include admonition.html type="reading" title="Recommended Readings" body="For a more comprehensive review of class imbalance methods, it's recommended to read Johnson and Khoshgoftaar's paper:"
refs="https://journalofbigdata.springeropen.com/articles/10.1186/s40537-019-0192-5||Survey on deep learning with class imbalance" %}

#### 4.3.2.1 Using the Right Evaluation Metrics

Instead of relying on accuracy, use evaluation metrics that provide a clearer picture of the model's performance on imbalanced data:

- **Precision and Recall:** Measure the accuracy of positive predictions and the ability to find all positive instances.
- **F1 Score:** The harmonic mean of precision and recall, providing a single metric that balances both.

F1, precision, and recall are asymmetric metrics, which means that their values change depending on which class is considered the positive class.

- **Area Under the ROC Curve (AUC-ROC):** Evaluates the trade-off between true positive and false positive rates.

- **Area Under the Precision-Recall Curve (AUC-PR):** Particularly useful for imbalanced datasets, focusing on the performance for the minority class.


#### 4.3.2.2 Data-Level Methods: Resampling

Data-level methods modify the distribution of the training data to reduce imbalance. There are two primary techniques: undersampling the majority class and oversampling the minority class.

- **Undersampling:** This involves reducing the number of samples in the majority class. The simplest method is to randomly remove samples. Another technique is **Tomek links**, where samples from the majority class that are close to minority class samples are removed, helping to clarify the decision boundary. However, this can make the model less robust to subtle differences between classes.

- **Oversampling:** This involves increasing the number of samples in the minority class. The simplest method is to randomly duplicate existing samples. A more sophisticated technique is **SMOTE** (Synthetic Minority Oversampling Technique), which generates new minority class samples by interpolating between existing samples. SMOTE works well with low-dimensional data but can introduce noise if overused.

Both Tomek links and SMOTE, along with other techniques like Near-Miss and one-sided selection, are effective for low-dimensional data.

**Avoiding Overfitting**

Overfitting is a risk when using resampling techniques. Oversampling can lead to overfitting on the resampled training data, while undersampling can result in the loss of valuable information. To mitigate these risks, consider the following strategies:

- **Two-Phase Learning:** Train the model initially on the resampled data, then fine-tune it on the original data. This helps the model generalize better.
- **Dynamic Sampling:** Adjust the sampling strategy dynamically during training. For example, oversample low-performing classes and undersample high-performing classes to balance the learning process. This method helps the model focus on areas it hasn't learned well yet.

#### 4.3.2.3 Algorithm-Level Methods

Algorithm-level methods keep the data distribution intact but alter the learning algorithm to make it more robust to imbalance. These methods often adjust the weights for samples in the loss function, emphasizing the learning of minority class instances.

- **Cost-sensitive learning:** Define a cost matrix to specify the cost of each possible outcome of the model concerning the correct label. For example:


| | Actual Negative | Actual Positive |
| :--: | :--: | :--: |
| Predicted Negative | $C_{00}$ | $C_{10}$ |
| Predicted Positive | $C_{01}$ | $C_{11}$ |

We then have the loss function:

$$

\mathcal{L}(x;\theta) = \sum_j C_{ij} \, P(j|x;\theta)

$$

- **Class-balanced loss:** This method modifies the loss function to weigh the contributions of each class based on their prevalence in the dataset. This ensures that the minority class has more influence on the loss. A more advanced version of this method accounts for the overlap among existing samples, such as the class-balanced loss based on the effective number of samples:

$$

\begin{gather*}
  W_i = \frac{N}{\text{number of samples of class i}}, \qquad \text{where N is the total number of training samples} \\ \\
  \mathcal{L}_{\text{weighted}}(x;\theta) = W_i \sum_j P(j|x;\theta) \, \mathcal{L}(x,j)
\end{gather*}

$$

- **Focal loss:** Focal loss increases the weight for instances that are harder for the model to classify (i.e., those with lower prediction probabilities). The formula for focal loss, compared to cross-entropy, is:


$$
\begin{gather*}
CE(\rho_t) = - \log(\rho_t) \\
FL(\rho_t) = - (1-\rho_t)^\gamma \log(\rho_t)
\end{gather*}
$$


<center>
<p>
    <img src="/assets/images/ml-sys/loss.png" alt>
</p>
<a href="https://arxiv.org/abs/1708.02002">Source</a>
</center>



## 4.4 Data Augmentation

Data augmentation is a technique used to artificially increase the size and diversity of a training dataset without collecting new data. Data augmentation is particularly useful in scenarios where data collection is expensive or time-consuming. However, even when data is abundant, augmented data can make our models more robust to noise and even adversarial attacks.

### 4.4.1 Simple Label-Preserving Transformations

Simple label-preserving transformations involve applying basic modifications to the existing data that do not alter the underlying class label. These transformations are particularly useful for image and text data.

**Image Data**

- **Rotation:** Rotating images by a certain degree (e.g., 90°, 180°, 270°).
- **Translation:** Shifting images horizontally or vertically.
- **Scaling:** Resizing images.
- **Flipping:** Mirroring images horizontally or vertically.
- **Color Jittering:** Randomly changing the brightness, contrast, saturation, and hue.
- **Cropping:** Randomly cropping and resizing images back to the original size.

**Text Data**

- **Synonym Replacement:** Replacing words with their synonyms.
- **Random Insertion:** Inserting random words into the text.
- **Random Deletion:** Deleting random words from the text.
- **Shuffling:** Shuffling the order of words or phrases in the text.

### 4.4.2 Perturbation

Perturbation-based augmentation involves adding small, controlled changes to the data that preserve the original label. These changes are usually subtle and designed to simulate natural variations in the data or even be make to fool a neural network. [Su at al.](https://arxiv.org/abs/1710.08864) showed that 67.97% of the natural images in the Kaggle CIFAR-10 test dataset and 16.04% of the ImageNet test images can be misclassified by changing just one pixel.

Perturbation can be injected by adding noise, either random noise or by search strategy (i.e., DeepFool). One of the most notable examples is [BERT](https://arxiv.org/abs/1810.04805), where the model chooses 15% of all tokens in each sequence at random and chooses to replace 10% of the chosen tokens with random words.


{% include admonition.html type="reading" title="Recommended Readings" body=" "
refs="https://arxiv.org/abs/1412.6572||Goodfellow et al., Explaining and Harnessing Adversarial Examples;;;
https://arxiv.org/abs/1511.04599||Moosavi-Dezfooli et al., DeepFool: a simple and accurate method to fool deep neural networks;;;
https://arxiv.org/abs/1704.03976||Miyato et al., Virtual Adversarial Training: A Regularization Method for Supervised and Semi-Supervised Learning" %}

### 4.4.3 Data Synthesis

Data synthesis involves generating entirely new data points based on the distribution of the existing dataset. This technique can be particularly useful when dealing with rare classes or when collecting new data is impractical.

- **Generative Adversarial Networks (GANs):** GANs can generate new data points by training a generator network to produce realistic samples that can fool a discriminator network. This method is widely used for image synthesis but can also be applied to other data types.
- **Mixup:** Combining two data points to create a new one by taking a weighted average of their features and labels. This encourages the model to learn more linear decision boundaries.

  Example of Mixup:

  $$
  \begin{gather*}
  
  \tilde{x} = \lambda x_i + (1 - \lambda) x_j \\
  \tilde{y} = \lambda y_i + (1 - \lambda) y_j

  \end{gather*}
  $$

  Where $x_i, x_j$ are input data points, $y_i, y_j$ are their labels, and $\lambda$ is a random value between 0 and 1.

{% include admonition.html type="reading" title="Recommended Readings" body=" "
refs="https://arxiv.org/abs/1710.09412||Zang et al., mixup: Beyond Empirical Risk Minimization;;;
https://www.nature.com/articles/s41598-019-52737-x||Sandfort et al., Data augmentation using generative adversarial networks (CycleGAN) to improve generalizability in CT segmentation tasks;;;
https://journalofbigdata.springeropen.com/articles/10.1186/s40537-019-0197-0||Shorten et al., A survey on Image Data Augmentation for Deep Learning" %}

# Chapter 5: Feature Engineering

Feature engineering involves creating new features or transforming existing ones to improve the performance of models. Well-engineered features tend to give the models the biggest performance boost compared to algorithmic techniques such as hyperparameter tuning. This chapter explores the types of features, common feature engineering operations, strategies to avoid data leakage, and best practices for creating robust and generalizable features.

## 5.1 Learned Features Versus Engineered Features

In machine learning, features can be broadly categorized into two types: learned features and engineered features.

- **Learned Features:** These are features automatically extracted by models, typically deep learning models, during the training process. Convolutional Neural Networks (CNNs) for image data and Large Language Models (LLMs) for text are examples where features are learned from the raw input data. However, not all features can be automatically learned.
- **Engineered Features:** These are features created manually based on domain-specific knowledge and insights into the data. Feature engineering involves transforming raw data into meaningful inputs that can improve the performance of machine learning algorithms.

While learned features can capture complex patterns directly from raw data, engineered features leverage human expertise and can often lead to more interpretable models.

## 5.2 Common Feature Engineering Operations

This section presents some of the most common feature engineering operations, but is nowhere near being comprehensive.

### 5.2.1 Handling Missing Values

Missing values are a common issue in datasets and need to be addressed, but not all missing values are equal:

- **Missing not at random (MNAR):** This is when the reason a value is missing is because of the true value itself. For instance, respondents to a form with higher income might be less prone to disclose it.
- **Missing at random (MAR):** This is when the reason a value is missing is not due to the value itself, but due to another observed variable. For instance, respondents from gender A might be less prone to disclosure their age.
- **Missing completely at random (MCAR):** This is when there's no pattern in when the value is missing.

There are two primary methods to handle missing values: deletion and imputation.

**Deletion**

- **Column deletion:** Remove the feature that have high missing value rate. The drawback is that you can be removing important information and reducing the model's accuracy.
- **Row deletion:** Remove the sample that has missing value(s). This method works best when the missing values are completely at random (MCAR) and the number of examples with missing values is small.

**Imputation**

- **Default value:** Fill the missing values with the default value. For example, if the job is missing, you might fill it with an empty string “".
- **Mean, Median or Mode Imputation:** Replace missing values with the mean, median, or mode (most frequent value) of the non-missing values. This method is simple but can introduce bias if the data is not normally distributed.
- **Advanced Techniques:** Use more sophisticated models like interpolation, regression, iterative imputation, or machine learning algorithms (such as KNN) to predict and fill in missing values.

In general, you want to avoid filling missing values with possible values, such as the missing number of children with 0. It makes it hard to distinguish between people whose information is missing and people who don't have children.

### 5.2.2 Scaling

Scaling transforms features to a common scale without distorting differences in the range of values. This is particularly important for algorithms sensitive to the scale of input data, such as Support Vector Machines (SVM), gradient-boosted trees, and logistic regression.

- **Min-Max Scaling:** Scale features to a fixed range, typically $[0, 1]$, but you can define arbitrary values $[a, b]$ (i.e., $[-1, 1]$).

  $$
  \begin{gather*}
    \tilde{x} = \frac{x - \min(x)}{\max(x) - \min(x)} \\
    or \\
    \tilde{x} = a + \frac{(x - \min(x))(b-a)}{\max(x) - \min(x)} \\
  \end{gather*}
  $$

- **Standardization:** Scale features to have a mean of $\bar{x}$ and a standard deviation of $\sigma$. If you think that your variable might follow a normal distribution, it might be helpful to normalize them with zero mean and unit variance.

  $$
  \tilde{x} = \frac{x-\bar{x}}{\sigma}
  $$

- **Log Scaling:** This method is useful for transforming skewed data to reduce the impact of outliers and make the distribution more normal. It involves taking the logarithm of the feature values.

  $$
  \begin{gather}
    \tilde{x} = \log(x) \\
    or \\
    \tilde{x} = \log(x + c)
  \end{gather}
  $$

  Where $c$ is a constant added to ensure all values are positive before applying the logarithm.

{% include admonition.html type="note" title="Note" body="
1. Scaling is a major source of data leakage (covered in the section 5.3).
2. It requires global statistics, calculated with training data, and saved to be used in test and inference. If the new data has changed significantly compared to the training, these statistics won't be very helpful. Therefore, it's important to retrain your model often to account for these changes.
" %}

### 5.2.3 Discretization

Discretization (or quantization) transforms continuous features into discrete buckets or bins. This can help models learn simpler representations and make them more interpretable. By converting continuous variables into discrete categories, we can enable models to treat similar feature values uniformly, potentially improving performance on certain tasks.

### 5.2.4 Encoding Categorical Features

Categorical features must be encoded into numerical values before being used in machine learning models. One challenge is that categories are not always static. For instance, if you treat product brands as categories, new brands can emerge that your model didn't encounter during training. You can create an “UNKNOWN” category in your training data to prevent the model from crashing, but this approach treats all unseen brands, whether luxurious or sketchy, the same.

**The Hashing Trick**

One solution for handling dynamic categories is the *hashing trick*. A hash function generates a hashed value for each category, which becomes the index for that category. By specifying the hash space, you can fix the number of encoded values for a feature in advance, without needing to know the exact number of categories.

One problem with hashed functions is that different categories may hash to the same index. However, collisions are random and spread across the hash space. According to research done by Booking.com, even with 50% colliding features, the performance loss was less than 0.5%. [Source](https://booking.ai/dont-be-tricked-by-the-hashing-trick-192a6aae3087)

### 5.2.5 Feature Crossing

Feature crossing creates new features by combining existing ones to capture interactions between features. This can help models learn non-linear relationships in the data. It's helpful with model that are bad or even can't learn non-linear representations, such as linear regression, logistic regression, and tree-based models. It's less helpful in neural networks, but it could still help the model learn faster. DeepFM and xDeepFM are the family of models that have successfully leverage explicit feature interactions for recommender systems and click-through rate prediction.

### 5.2.6 Discrete and Continuous Positional Embeddings

{% include admonition.html type="tip" title="Embedding" body="
An embedding represents a piece of data as a vector. Word embeddings, for instance, map words to vectors in a continuous space. Similarly, positional embeddings map the position of each token in a sequence to a vector.
" %}

Introduced in the paper “Attention Is All You Need” (Vaswani et al., 2017), positional embeddings are essential for tasks in NLP and computer vision. They help models understand the order of inputs.

In models like transformers, words are processed in parallel, so positional information must be explicitly provided. We avoid using absolute positions (0, 1, 2, …) directly because neural networks don't perform well with such inputs.

**Learned Position Embeddings**

One way to handle position embeddings is to treat it like we'd treat word embedding, by using an embedding matrix. Each position gets an embedding that is learned during training.

**Fixed Position Embeddings**

Another way to handle position embeddings is to use predefined functions, typically sine and cosine, to encode positions. This method, from the original Transformer paper, ensures positional embeddings capture relative positions effectively.

Fixed embeddings can be extended to continuous spaces using Fourier features, which are effective for tasks involving coordinates (or positions).

{% include admonition.html type="reading" title="Recommended Readings" body=" " refs="https://arxiv.org/abs/2006.10739||Tancik et al., Fourier Features Let Networks Learn High Frequency Functions in Low Dimensional Domains" %}


## 5.3 Data Leakage

Data leakage occurs when information (i.e., the label) “leaks” from outside into the training dataset is used to create the model, leading to overly optimistic performance estimates during training but poor performance in production. It can happen because of how data are collected, handled, or even due to the innate origin of data (i.e., hospital A always sends patients with suspect of having lung cancer to a specific CT scan machine that outputs slightly different images).

### 5.3.1 Common Causes for Data Leakage

- **Splitting time-correlated data randomly instead of by time:** When working with time-series data (or time-correlated data, e.g., the time the data is generated affects its label distribution), splitting the data randomly can cause the model to learn from future information. Always split by time to ensure the model only has access to past information during training.
- **Scaling before splitting:** Performing scaling operations on the entire dataset before splitting can leak information from the test set into the training set. Scale the training data independently and apply the same transformation to the test set.
- **Filling in missing data with statistics from the test split:** Imputing missing values using statistics (e.g., mean, median) computed from the entire dataset can lead to leakage. Compute statistics only from the training data and use them to fill missing values in both training and test sets.
- **Poor handling of data duplication before splitting:** Duplicates in the dataset can cause leakage if not handled properly. Remove duplicates before splitting the data to ensure that no information from the test set influences the training process.
- **Group leakage:** When samples are grouped together, information from one sample can inadvertently leak into another if not split correctly. For example, in object detection task, photos taken milliseconds apart may land in different splits. Ensure that groups of related samples are kept entirely within either the training or test set.
- **Leakage from data generation process:** If the process used to generate the data unintentionally includes target information, it can cause leakage, just like in the CT scan machine example. Review the data generation process to ensure that no target information is inadvertently included in the features, and don't forget to include subject matter experts, who have more contexts on how data is collected and used.

### 5.3.2 Detecting Data Leakage

Investigate the importance of each feature. If a feature has an unusually high importance that doesn't make logical sense, it might be leaking information from the target. Keep an eye out the impact of new features on you model's performance, if it improves a lot, the feature is very good or just contains leakage. Finally, be careful every time you look at the test split, only use it to report a model's final performance.

## 5.4 Engineering Good Features

Effective feature engineering can significantly enhance the performance and robustness of machine learning models. This involves creating features that are both informative and generalizable while minimizing the number of features needed to train the model. By focusing on fewer, high-quality features, we reduce the risk of data leakage, decrease the likelihood of overfitting, and lower the memory requirements for serving the model. Additionally, this approach diminishes latency in feature extraction, particularly for online processing, and reduces technical debt, making the overall system more efficient and maintainable.

### 5.4.1 Feature Importance

- **Model-Based Methods:** Algorithms like Random Forest, Gradient Boosting, and XGBoost provide built-in feature importance metrics. These methods assess the importance of each feature based on how often they are used to make splits in decision trees or their impact on the loss function.
- **SHAP Values (SHapley Additive exPlanations):** SHAP values provide a unified measure of feature importance by considering the contribution of each feature to every prediction made by the model.
- **LIME (Local Interpretable Model-agnostic Explanations):** LIME approximates the model locally around a prediction to understand the contribution of each feature.

### 5.4.2 Feature Generalization

Feature generalization ensures that the features used in the model are not overly specific to the training data and can generalize well to new, unseen data. Overall, there are two aspects to consider regarding generalization: feature coverage and the distribution of feature values.

- **Coverage:** Feature coverage refers to the extent to which the features represent the entire input space. Ensuring broad coverage means that the model has seen a diverse range of examples during training, making it more likely to perform well on new data.

- **Distribution:** The distribution of feature values should be consistent between the training and test datasets. Features should not only cover the input space broadly but also follow the same statistical properties across different datasets.


# Chapter 6: Model Development and Offline Evaluation



## 6.1 Six Tips for Model Selection

1. **Avoid the state-of-the-art trap:** Don’t be swayed by the latest and most complex algorithms just because they are state-of-the-art. Often, simpler models can perform just as well or better, especially if they are well-tuned and well-understood. Remember that researchers often evaluate models in academic settings, which we discussed in Chapter 1.

2. **Start with the simplest models:** Begin with simple models like linear regression or decision trees. These models are easier to interpret and debug. Once you establish a baseline performance and ensure your training and prediction pipelines are consistent, you can move to more complex models if necessary. While you can start with more complex models that require little effort to get started (e.g., a pretrained version of BERT from Hugging Face's Transformers), always test simpler models to verify that the more complex solution indeed outperforms them.

  {% include admonition.html type="quote" title="Quote" body="
  Simple is better than complex
  " %}

3. **Avoid human biases in selecting models:** Ensure that model selection is based on objective performance metrics rather than subjective preferences or biases. If an engineer is more enthusiastic about a specific solution, they may spend more time tuning it. Make sure to compare architectures under similar setups.


4. **Evaluate good performance now versus good performance later:** Consider both short-term and long-term performance. Some models might perform well initially but degrade over time, while others might improve as more data is collected. Regularly monitor model performance and be prepared to update or replace models as necessary.


5. **Evaluate trade-offs:** Every model comes with trade-offs. Consider factors such as training time, inference time, scalability, interpretability, and resource requirements, as well as the trade-off between false positives and false negatives. Choose a model that balances these factors in a way that aligns with your project goals.


6. **Understand your model's assumptions:** Each model makes specific assumptions about the data. Ensure that these assumptions hold for your dataset. For example:
   1. *Prediction assumption:* It's possible to predict $Y$ based on $X$.
   2. *IID:* Neural Networks assume that examples are independent and identically distributed.
   3. *Smoothness:* If an input $X$ produces an output $Y$, then an input close to $X$ would produce an output proportionally close to $Y$.
   4. *Tractability:* Let $X$ be the input and $Z$ be the latent representation of $X$. Every generative model makes the assumption that it's tractable to compute the probability $\mathbb{P}(Z\|X)$.
   5. *Boundaries:* A linear classifier assumes that decision boundaries are linear.
   6. *Conditional independence:* A naive Bayes classifier assumes that the attribute values are independent of each other given the class.
   7. *Normally distributed:* Many statistical methods assume that data is normally distributed.

## 6.2 Ensembles

Ensemble methods combine multiple models to improve overall performance, robustness, and generalization capabilities. By leveraging the strengths of different models, ensemble techniques can often achieve better results than individual models (base learners). The effectiveness of an ensemble depends on the diversity and independence of the individual models: the less correlated the models, the better the ensemble performance. Thus, creating an ensemble with different architectures of models can significantly boost performance.

Although ensemble methods can provide substantial performance improvements, they are less favored in production due to their complexity in deployment and maintenance. However, they remain common in scenarios where even a small performance boost can lead to significant financial gains, such as predicting click-through rates for advertisements.

**Bagging**

Bagging, or *Bootstrap Aggregating*, aims to reduce variance and prevent overfitting by training multiple instances of the same model on different subsets of the training data. These subsets are generated by random sampling with replacement (bootstrap sampling). The predictions of these models are then aggregated, typically by averaging for regression tasks or majority voting for classification tasks.

Random Forests are a popular implementation of bagging, where multiple decision trees are trained on different subsets of the data and their predictions are averaged or voted upon to produce the final output. Random Forests also introduce additional randomness by selecting a random subset of features at each split in the trees, further reducing correlation among trees.

<center>
<p>
    <img src="/assets/images/ml-sys/bagging.png" alt>
</p>
<a href="https://www.geeksforgeeks.org/bagging-vs-boosting-in-machine-learning/">Source</a>
</center>

**Boosting**

Boosting aims to reduce bias and improve model accuracy by sequentially training models, where each new model attempts to correct the errors made by the previous models. This process focuses more on difficult instances that were misclassified or had higher errors in previous iterations. The final prediction is typically a weighted sum of the predictions from all models.

AdaBoost, short for *Adaptive Boosting*, assigns weights to each training instance and adjusts them after each iteration. Misclassified instances receive higher weights, forcing the next model to focus more on those hard-to-classify cases. The final model is a weighted sum of the individual models' predictions.

Gradient Boosting builds models sequentially, with each new model being trained to predict the residuals (errors) of the previous models. By minimizing these residuals, Gradient Boosting effectively improves the model's accuracy over iterations. Gradient Boosting Machines (GBMs), such as XGBoost, LightGBM, and CatBoost, are popular implementations that offer efficient training and strong performance.

<center>
<p>
    <img src="/assets/images/ml-sys/boosting.png" alt>
</p>
<a href="https://www.geeksforgeeks.org/bagging-vs-boosting-in-machine-learning/">Source</a>
</center>

**Stacking**

Stacking, or Stacked Generalization, involves training multiple base models and then using their predictions as inputs to a higher-level meta-model. The meta-model learns to combine the predictions and make the final predictions. The meta-model can be either a heuristic or another model. This approach allows for leveraging different types of models and their unique strengths.

<center>
<p>
    <img src="/assets/images/ml-sys/stacking.png" alt>
</p>
<a href="https://supunsetunga.medium.com/stacking-in-machine-learning-357db1cfc3a">Source</a>
</center>

## 6.3 Experiment Tracking and Versioning

Experiment tracking and versioning are practices in machine learning to ensure reproducibility, facilitate debugging, and manage the iterative nature of model development. By systematically tracking experiments you can compare different setups (architecture, hyperparameters, initialization, etc.) and better understand how changes affect your model's performance.

**Experiment Tracking**

Experiment tracking involves recording all aspects of an experiment, including configurations, code, data, results, and metrics. This helps in comparing different experiments, understanding what changes lead to performance improvements, and ensuring reproducibility. A short list of things you might want to consider tracking for each experiment during its training:

- The **configuration** for the experiment, such as: hyperparameters, model architecture, data preprocessing steps, and other configuration settings.
- The **loss curve** corresponding to the train split and each of the eval splits.
- The **model performance metrics** such as accuracy, loss, precision, recall, F1 score, and any custom metrics relevant to the project.
- The log of **corresponding sample, prediction, and ground truth label**. This comes in handy for ad hoc analytics and sanity checks.
- The **speed** of your model, evaluated by the number of steps per second or, if your data is text, the number of tokens processed per second.
- **System performance metrics** such as memory usage and CPU/GPU utilization. They're important to identify bottlenecks and avoid wasting system resources.

**Versioning**

Versioning ensures that different versions of datasets, code, and models are systematically managed and can be reproduced or reverted to as needed.

**Debugging ML Models**

{% include admonition.html type="reading" title="Recommended Readings" body="For more comprehensive understanding of the topic, it's recommended Andrej Karpathy's blog post:" refs="https://karpathy.github.io/2019/04/25/recipe/||A Recipe for Training Neural Networks" %}


Some steps and strategies for debugging ML models according to Karpathy's blog:

1. **Become One with the Data**
   - Spend significant time understanding and visualizing the data.
   - Look for patterns, imbalances, biases, and outliers.
   - Write code to filter, sort, and visualize data distributions and outliers.

2. **Set Up End-to-End Training and Evaluation Skeleton**
   - Start with a simple model (e.g., a linear classifier) to set up the training and evaluation pipeline.
   - Fix random seeds to ensure reproducibility.
   - Disable unnecessary features like data augmentation initially.
   - Verify that the initial loss and model behavior are as expected.
   - Use human-interpretable metrics and baselines for comparison.
   - Overfit a single batch to verify the model can learn properly.

3. **Overfit**
   - Initially, focus on overfitting a large model to the training data to ensure it can achieve a low error rate.
   - Choose a well-established model architecture related to your problem.
   - Use a forgiving optimizer like Adam with an appropriate learning rate.
   - Gradually introduce complexity and verify performance improvements.

4. **Regularize**
   - Once the model overfits, introduce regularization to improve validation accuracy.
   - Add more data if possible, as it is the best way to regularize.
   - Use data augmentation and pretrained models.
   - Reduce input dimensionality and model size if appropriate.
   - Apply techniques like dropout, weight decay, and early stopping.

5. **Tune**
   - Explore a wide range of hyperparameters using random search rather than grid search.
   - Consider hyperparameter optimization tools for more systematic tuning.

6. **Squeeze Out the Juice**
   - Once the best model and hyperparameters are found, use ensembles to boost performance.
   - Let models train longer than initially expected, as they often continue to improve.

## 6.4 Distributed Training

As models are getting bigger and more resource-intensive, companies care a lot more about training at scale. It's common to train a model using data that doesn't fit into memory. In these cases, our algorithms for preprocessing, shuffling, and batching data will need to run out-of-core and in parallel.

In some cases, a single data sample is so large it can't fit into memory, and we'll have to use something like gradient checkpointing. Even when a sample fits into memory, using checkpointing can allow you to fit more samples into a batch, which might allow you to train your model faster.

**Data Parallelism**

Data parallelism involves splitting the dataset into smaller chunks and distributing them across multiple devices (e.g., GPUs or nodes). Each device trains a copy of the model on its subset of the data, and you accumulate the gradients across devices to update the model parameters. 

{% include admonition.html type="tip" title="Synchronous Stochastic Gradient Descent (SGD)" body="
In synchronous SGD, all devices wait until every device has completed its gradient computation for the current batch before averaging the gradients and updating the model parameters. This ensures that each device is working with the same model parameters at each step, leading to more stable convergence.
" %}

{% include admonition.html type="tip" title="Asynchronous Stochastic Gradient Descent (SGD)" body="
In asynchronous SGD, devices do not wait for each other to complete their gradient computations. Instead, each device independently updates the model parameters as soon as it finishes its computations. This approach can lead to faster training times as devices are not idly waiting, but it can introduce inconsistencies in the model parameters across devices, potentially affecting convergence stability.
" %}

<center>
<p>
    <img src="/assets/images/ml-sys/data_parallel.png" alt>
</p>
<a href="https://www.oreilly.com/content/distributed-tensorflow/">Source</a>
</center>

Asynchronous SGD theoretically converges with more steps than synchronous SGD. However, in practice, with a large number of weights, gradient updates are typically sparse, affecting only small fractions of the parameters. This reduces conflicts between updates from different machines. Consequently, gradient staleness is minimized, and the model converges similarly for both synchronous and asynchronous SGD.

**Model Parallelism**

Model parallelism involves splitting the model itself across multiple devices. Different parts of the model are assigned to different devices, and the forward and backward passes are executed across these devices. This approach is useful when the model is too large to fit into the memory of a single device.

<center>
<p>
    <img src="/assets/images/ml-sys/model_parallel_1.png" alt>
</p>
<a href="https://papers.nips.cc/paper_files/paper/2012/hash/6aca97005c68f1206823815f66102863-Abstract.html">Source</a>
</center>

*Pipeline parallelism* involves splitting the model into stages and distributing these stages across multiple devices. Each device processes a different part of the model, passing intermediate results to the next device in the pipeline.

<center>
<p>
    <img src="/assets/images/ml-sys/model_parallel_2.png" alt>
</p>
<a href="https://arxiv.org/abs/1811.06965">Source</a>
</center>

In practice, combining both data parallelism and model parallelism can be beneficial, especially for very large models and datasets.

## 6.5 AutoML

Automated Machine Learning (AutoML) encompasses techniques and tools designed to automate parts of the machine learning pipeline. AutoML can significantly reduce the time and expertise required to build high-performing models by automating tasks such as hyperparameter tuning, feature selection, and model selection. AutoML can be broadly categorized into Soft AutoML and Hard AutoML.

**Soft AutoML: Hyperparameter tuning**

Hyperparameter tuning involves finding the best set of hyperparameters that maximize model performance. Soft AutoML focuses on automating this process to enhance efficiency and performance.

Key Techniques in Hyperparameter Tuning:

- **Grid Search:** Exhaustively searches over a specified parameter grid to find the optimal hyperparameters. While thorough, it can be computationally expensive.
- **Random Search:** Randomly samples hyperparameter combinations within a specified range. It is more efficient than grid search and can often find good hyperparameters with fewer iterations.
- **Bayesian Optimization:** Uses a probabilistic model to predict the performance of hyperparameter combinations and iteratively improves this model to find the optimal set. This method balances exploration and exploitation, making it more efficient than random search.
- **Hyperband:** Combines random search with an early stopping strategy to allocate resources to promising hyperparameter configurations while discarding poor performers early.

{% include admonition.html type="danger" title="Danger" body="
Never use your test split to tune hyperparameters. Choose the best set of hyperparameters for a model basedon a validation split, then report the model's final performance on a test split.
" %}

**Hard AutoML: Architecture search and learned optimizer**

Hard AutoML involves more complex tasks, such as neural architecture search (NAS) and the development of learned optimizers, to automate the design and training of machine learning models.

A NAS setup consists of three components:

1. **A Search Space:** Defines possible model architectures, the building block to choose from and constraints on how they can be combined.
2. **A Performance Estimation Strategy:** To evaluate the performance of a candidate architecture without having to train each candidate architecture from scratch until convergence.
3. **A Search Strategy:** Some common approaches are random search, reinforcement learning (rewarding the choices that improve performance estimation) and evolution (adding mutations to an architecture, choosing the best-performing ones, and so on).

Learned optimizers are trained on various tasks to develop effective optimization strategies that generalize across different problems. The creation process involves training a meta-optimizer on a diverse set of tasks, this meta-optimizer can then be applied to new tasks, improving convergence rates and overall model performance. The beauty of this approach is that this learned optimizer can then be used to train a better-learned optimizer.

## 6.6 Model Offline Evaluation

### 6.6.1 Baselines

### 6.6.2 Evaluation Methods

# Chapter 7: Model Deployment and Prediction Service

# Chapter 8: Data Distribution Shifts and Monitoring

# Chapter 9: Continual Learning and Test in Production

# Chapter 10: Infrastructure and Tooling for MLOps

# Chapter 11: The Human Side of Machine Learning

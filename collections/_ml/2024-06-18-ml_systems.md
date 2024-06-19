---
title: Designing Machine Learning Systems
author: Lucas Cruz
date: 2024-06-18
category: machine-learning
layout: post
permalink: /ml-systems
---

This content is a summary and my key takeaways from the excellent book [Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/) by Chip Huyen.

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
  - [Framing ML Problems](#framing-ml-problems)
    - [Multiple Ways to Frame a Problem](#multiple-ways-to-frame-a-problem)
  - [Objective Functions](#objective-functions)
    - [Decoupling Objectives](#decoupling-objectives)
  - [Mind Versus Data](#mind-versus-data)
- [Chapter 3: Data Engineering Fundamentals](#chapter-3-data-engineering-fundamentals)
- [Chapter 4: Training Data](#chapter-4-training-data)
- [Chapter 5: Feature Engineering](#chapter-5-feature-engineering)
- [Chapter 6: Model Development and Offline Evaluation](#chapter-6-model-development-and-offline-evaluation)
- [Chapter 7: Model Deployment and Prediction Service](#chapter-7-model-deployment-and-prediction-service)
- [Chapter 8: Data Distribution Shifts and Monitoring](#chapter-8-data-distribution-shifts-and-monitoring)
- [Chapter 9: Continual Learning and Test in Production](#chapter-9-continual-learning-and-test-in-production)
- [Chapter 10: Infrastructure and Tooling for MLOps](#chapter-10-infrastructure-and-tooling-for-mlops)
- [Chapter 11: The Humam Side of Machine Learning](#chapter-11-the-humam-side-of-machine-learning)


# Chapter 1: Overview of Machine Learning Systems

## When to Use Machine Learning

Before starting a machine learning (ML) project, it is essential to determine if it is necessary or cost-effective.

> Machine Learning is an approach to (1) *learn* (2) *complex patterns* from (3) *existing data* and use these patterns to make (4) *predictions* on (5) *unseen data*.
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

> Most companies don't care about the fancy ML metrics
{: .block-tip }

For an ML project succeed within an organization, it's crucial to tie the performance of an ML system to the business metrics. Most companies assess the impact of different ML models through experimentation, like A/B testing, and choose the model that leads to better business metrics, regardless of whether the model has better ML metrics.

The business metrics optimized by the experiment can impact profit either directly, such as conversion rate or cutting cost, or indirectly such as higher customer satisfaction or increasing the time spend on the site. Most companies create their own metrics to map business metrics to ML metrics, such as [Netflix's *take rate*](https://netflixtechblog.com/artwork-personalization-c589f074ad76).

## Requirements for ML Systems

Most ML systems should satisfy 4 common requirements: reliability, scalability, maintainability, and adaptability.


> WIP
{: .block-danger }
1. **Reliability:**
2. **Scalability:**
3. **Maintainability:**
4. **Adaptability:**

## Iterative Process

## Framing ML Problems

### Multiple Ways to Frame a Problem

## Objective Functions

### Decoupling Objectives

## Mind Versus Data

# Chapter 3: Data Engineering Fundamentals

This chapter is very introductory. The recommendation is Martin Kleppmann's book [Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/), which I plan on writing about on this blog in the future.

Key topic from the chapter:
- **Modes of Dataflow**
  - **Data Passing Through Databases:** The simplest mode, but the slowest because it relies on multiple processes to read/write from the same database.
  - **Data Passing Through Services:** This is a *request-driven* architecture. Data is passed from service A to B directly through request. The main issue with this architecture is that it become excessively complicated the more services you have depending on each other's data synchronously.
  - **Data Passing Through Real-Time Transport:** The *event-driven* architecture bypass that issue because the services writing and reading messages/events are decoupled, the communication is made through a broker. Also, we use the in-memory storage to broker data. The two most common types of real-time transport are pubsub (publish-subscribe) and message queue:
    - **PubSub:** Any service can read or write to different topics in a real-time transport, and the service that generated the event doesn't care about the services consuming it. Common solutions for PubSub are Apache Kafka, Amazon Kinesis, and Google Cloud Pub/Sub.
    - **Message Queue:** Often an event (or message) generated is destined for a specific consumer, and the message queue is responsible for delivering the right message for the right consumer. Common solutions for message queue are Apache RocketMQ and RabbitMQ.

# Chapter 4: Training Data

> WIP
{: .block-danger }

# Chapter 5: Feature Engineering

# Chapter 6: Model Development and Offline Evaluation

# Chapter 7: Model Deployment and Prediction Service

# Chapter 8: Data Distribution Shifts and Monitoring

# Chapter 9: Continual Learning and Test in Production

# Chapter 10: Infrastructure and Tooling for MLOps

# Chapter 11: The Humam Side of Machine Learning
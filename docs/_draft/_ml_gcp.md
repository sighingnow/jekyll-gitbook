# Production Machine Learning Systems

Transcript
00:00
Welcome to the Advanced Machine Learning on Google Cloud specialization.
00:05
In this specialization, you will learn how to apply machine learning at scale and how to build specialized machine-learning models for images, sequences, and recommendations.
00:17
The first course is on building production machine learning systems.
00:22
We look at what to consider when building production machine learning models and provide an overview of static
00:26
training, dynamic training, static inference, dynamic inference, and distributed training using TensorFlow 2.0, which uses the Keras API.
00:39
The second course is all about building image models.
00:43
You will learn about convolutional neural networks and build image classification models of various types.
00:50
The third course is on building sequence models.
00:54
Sequence models are used to address a variety of applications, including financial time series prediction, speech recognition, music generation, sentiment classification, and machine translation.
01:08
We’ll focus on models used in natural language problems, like text classification and translation.
01:15
Finally, we end the specialization with building real-world recommendation systems.
01:21
This brings together all the concepts that were covered in both the previous specialization and in this one.


Transcript
00:00
Welcome to Production ML Systems, the first course in the Advanced Machine Learning on Google Cloud specialization.
00:07
This course focuses on building production machine learning models and the considerations behind them.
00:14
We'll be covering what ML architectures are composed of and the why and how of making good systems design decisions.
00:21
Real-world production ML systems are large ecosystems, of which the model code is just a small part.
00:27
The rest consists of code that performs critical functions, like data extraction, feature engineering, monitoring, and a serving infrastructure.
00:37
This course is devoted to exploring the characteristics that make for a robust ML system beyond its ability to make good predictions.
00:47
In the first module, Architecting Production ML Systems, we’ll explore what an ML system should be able to do and the components that take responsibility for those actions.
00:59
In module two, Designing Adaptable ML Systems, you’ll see how change can affect an ML system and what can be done to mitigate those effects.
01:09
In module three, Designing High-performance ML Systems, we’ll explore how to optimize the performance of an ML system by choosing the right hardware and removing bottlenecks.
01:20
And finally, in module four, Building Hybrid ML Systems, you’ll learn about the technology behind hybrid systems
01:26
that allows you to run your workloads on the cloud, on the edge using mobile devices, or on-premises.

## Architecting Production ML Systems

Transcript
00:00
Person: Welcome to "Architecting ML Systems," the second module of the Production Machine Learning Systems course.
00:08
In this module, we'll explore what makes up an architecture and why and how to make good systems design decisions.
00:16
Let me ask you a question.
00:30
You'll recall from earlier in this specialization, we showed how time is distributed among the different tasks
00:36
necessary to launch an ML model, and surprisingly, modeling accounted for far less than most people expect.
00:44
The same is true with respect to the code.
00:48
So the answer is that ML model code typically accounts for about 5% of the overall code base.
00:56
ML models account for such a small percentage because keeping a system running in production
01:02
requires many more actions than just computing the model's outputs for a given set of inputs.
01:09
In this module, you'll see what else a production ML system needs to do and how you can meet those needs.
01:16
Upon completing this module, you should know how to choose an appropriate training and serving paradigm, serve ML models scalably, and design an architecture from scratch.
01:28
And although our focus is on Google Cloud, it's important that you always try to reuse generic systems-- many of which are open-source frameworks-- when possible.
01:38
What's true of software frameworks like TensorFlow, Spark, or Apache Beam is also true of the underlying infrastructure on which you execute them.
01:47
Instead of spending time and effort provisioning infrastructure, you can use manage services such as Dataproc, AI Platform, or Dataflow to execute your Spark, TensorFlow, and Beam code.


Transcript
00:02
person: After you define the business use case and establish the success criteria, the process of delivering an
00:07
ML model to production typically involves several steps, which can be completed manually or by an automated pipeline.
00:17
The first three steps deal with data.
00:20
Data must be ingested, which means it's extracted from a raw data source.
00:26
With data extraction, you retrieve the data from various sources.
00:31
Those sources can be streaming, in real time, or batch.
00:37
For example, you might extract data from a customer relationship management system, or CRM, to analyze customer behavior.
00:47
This data might be structured where the file is in a CSV, TXT, JSON, or XML format.
00:55
Or you might have an unstructured data source with images of your products or text comments from chat sessions with your customers.
01:03
You might have to extract streaming data from your company's transportation vehicles that are equipped with sensors transmitting data in real time.
01:11
If the data you want to train your model on or get predictions for is structured, you
01:15
might retrieve it from a data warehouse, such as BigQuery, or you can use Apache Beam's IO module.
01:23
In this data flow example, we're loading data from BigQuery, calling predict on every record, and then writing the results back into BigQuery.
01:33
In data analysis, you analyze the data you've extracted.
01:37
For example, you can use exploratory data analysis, or EDA.
01:42
This involves using graphics and basic sample statistics to explore your data, such as looking for outliers or anomalies, trends, and data distributions.
01:54
This step helps you identify those features that can aid in increasing the predictive power of your machine learning model.
02:01
The way changes in the distribution of your data could affect your model might not be apparent, so let's consider a scenario.
02:09
In this scenario, an upstream data source encodes a categorical feature using a number, such as a product number.
02:17
One day, the product number and convention changes, and now the customer uses a totally different mapping with some old numbers and some new numbers.
02:26
How would you know that this had happened?
02:29
How would you debug your ML model?
02:32
The output of your model would tell you whether there's a drop in performance, but it won't tell you why.
02:38
The raw inputs themselves would appear valid because you're still getting numbers.
02:43
In order to recognize this change, you would need to look at changes in the distribution of your inputs.
02:50
In doing so, you might find that earlier, the most commonly occurring value was four.
02:55
In the new distribution, four might never occur, and the most commonly occurring value might be ten.
03:02
Depending on how you implemented your feature columns, these new values might be mapped to one component of a one-hot encoded vector or to many components.
03:12
If, for example, you used a categorical column with a hash bucket, the new values would be distributed according to the hash function.
03:20
And so one hash bucket might now get more and different values than before.
03:26
If you used a vocabulary, the new values would map to OOV buckets.
03:32
But what's important is that for a given tensor, its relationship to the label before and its relationship to the label now are probably very different.
03:43
So after you've extracted and analyzed your data, the next step in the process is data preparation.
03:50
Data preparation includes data transformation and feature engineering, which is the process of changing or converting the format, structure, or values of data you've extracted into another format or structure.
04:04
Most ML models require categorical data to be in a numerical format, but some models work either with numerical or categorical features, while others can handle mixed type features.
04:16
For example, here are three types of preprocessing for dates using SQL in BigQuery ML: Where
04:22
we are extracting the parts of the date into different columns, year, month, day, etc., extracting the
04:29
time period between the current date and columns in terms of years, months, days, etc., and extracting
04:35
some specific features from the date, name of the weekday, weekend or not, holiday or not, etc.
04:43
Now, here is an example of the day of week and hour of day queries extracted using SQL and visualized as a table in Data Studio.
04:54
Please note that for all non-numeric columns other than timestamp, BigQuery ML performs a one-hot encoding transformation.
05:03
This transformation generates a separate feature for each unique value in the column.


Transcript
00:01
The next step in the workflow is choosing a model that you'll train.
00:06
In model training, you implement different machine learning algorithms with the prepared data to train various ML models.
00:14
Essentially, model training is the process of feeding an ML algorithm with data to help it identify and learn good values for the feature set.
00:23
So you use your data to incrementally improve your model's predictive ability.
00:29
Model evaluation aims to estimate the generalization accuracy of a model on future, unseen, or out-of-sample data.
00:38
Although training a model is a key step in the pipeline, how the model generalizes
00:42
on unseen data is an equally important aspect that should be considered in every machine-learning pipeline.
00:50
This means that we need to know whether the model actually works and, consequently, whether we can trust its predictions.
00:58
Could the model be merely memorizing the data it's fed with, and therefore unable to make
01:02
good predictions on future samples or samples that it hasn't seen before, such as the test set?
01:10
Model evaluation consists of a person or a group of people evaluating or assessing the model
01:15
with respect to some business-relevant metric like AUC, area under the curve, or cost weighted error.
01:23
If the model meets their criteria, it is moved from the assessment phase to development.
01:28
For example, in the development phase, you may want to modify hyperparameter values to increase the model's performance, which correlates to improvements in evaluation results.
01:40
After development, the model is then ready for a live experiment or real-world test of the model.
01:47
In contrast to the model evaluation component, which is performed by humans, the model validation component evaluates the model against fixed thresholds and alerts engineers when things go wrong.
01:59
One common test is to look at performance by slice.
02:04
Let's say, for example, business stakeholders care strongly about a particular geographic market region.
02:12
An alert can be set to notify engineers when the accuracy by country begins to skew downward.
02:18
The model evaluation and validation components have one responsibility: to ensure that the models are good before moving them into a production environment.


Transcript
00:02
person: The output of model validation is a trained model that can be pushed to the model registry.
00:08
The machine learning model registry is a centralized tracking system that stores linage, versioning, and related metadata for published machine learning models.
00:19
A registry may capture governance data required for auditing purposes, such as who trained and published a model, which
00:25
datasets were used for training, the values of metrics measuring predictive performance, and when the model was deployed to production.
00:34
It's a place to find, publish, and use ML models or model pipeline components.
00:40
Machine learning uses data to answer questions.
00:44
So prediction, or inference, is the step where we get to answer the questions we posed, whether they are about a business problem or an academic research problem.
00:53
The trained model is served as a prediction service to production.
00:58
It's important to note that the process is concerned only with deploying the trained model as a
01:03
prediction service, for example, a microservice with a REST API, instead of deploying the entire ML system.
01:11
For example, Google's AI Platform Prediction service has an API for serving predictions from machine learning models.
01:20
In this particular example, AI Platform Prediction retrieves the trained model and saves it as a PKL in Cloud Storage.
01:28
PKL is the standard method of serializing objects in Python.
01:33
Trained models deployed in AI Platform Prediction service are exposed as REST endpoints that can be invoked from any standard client that supports HTTP, such as JupyterLab Notebook.
01:45
The AI Platform Prediction service can host models trained in popular machine learning frameworks, including TensorFlow, XGBoost, and Scikit-Learn.
01:55
As a best practice, you need a way to actively monitor the quality of your model in production.
02:01
Monitoring lets you detect model performance degradation or model staleness.
02:06
The output of monitoring for these changes then feeds into the data analysis component, which
02:09
can serve as a trigger to execute the pipeline or to execute a new experimental cycle.
02:17
For example, monitoring should be designed to detect data skews, which occur when your model training data is not representative of the live data.
02:26
That is, the data that you used to train the model in the research or production environment does
02:31
not represent the data that you actually have in your live system, and this leads to model staleness.
02:38
To understand other performance metrics, you can configure Google's Cloud monitoring to monitor your model's traffic patterns, error rates, latency, and resource utilization.
02:50
This can help spot problems with your models and find the right machine type to optimize latency and cost.


Transcript
00:00
person: One of the key decisions you'll need to make about your production ML system concerns training.
00:06
Here's a question.
00:07
How is physics unlike fashion?
00:11
If we assume that science is about discovering relationships that already exist in the world, the answer is that physics is constant whereas fashion isn't.
00:21
To see some proof, just look at some old pictures of yourself.
00:25
Now you might be asking, why is this relevant?
00:28
Well, when making decisions about training, you have to decide whether the phenomenon you're modeling is more like physics or like fashion.
00:38
When training your model, there are two paradigms: static training and dynamic training.
00:45
In static training, we do what we did in the last specialization.
00:49
We gather our data, we partition it, we train our model, and then we deploy it.
00:55
In dynamic training, we do this repeatedly as more data arrives.
01:01
This leads to the fundamental trade-off between static and dynamic.
01:07
Static is simpler to build and test, but will probably become stale.
01:12
Whereas dynamic is harder to build and test, but will adapt to changes.
01:17
And the tendency to become or not become stale is what we alluded to earlier when we contrasted physics and fashion.
01:25
If the relationship you're trying to model is constant, like physics, a statically trained model may be sufficient.
01:32
If, in contrast, the relationship you're trying to model is one that changes, like fashion, the dynamically trained model might be more appropriate.
01:42
Part of the reason the dynamic is harder to build and test is that new data may have all sorts of bugs in it.
01:49
And that's something we'll talk about more deeply in a later module on designing adaptable ML systems.
01:56
Engineering might also be harder, because we need more monitoring, model rollback, and data quarantine capabilities.
02:04
Let's explore some use cases and think about which sort of training style would be most appropriate.
02:10
The first use case concerns spam detection.
02:13
And the question you should ask yourself is, how fresh does spam detection need to be?
02:19
You could do this as static, but spammers are a crafty and determined bunch.
02:24
They will probably discover ways of passing whatever filter you impose within a short time.
02:29
So dynamic is likely to be more effective over time.
02:33
What about Android voice to text?
02:36
Note that this question has some subtlety.
02:40
For a global model, training off-line is probably fine.
02:44
But if you want to personalize the voice recognition, you may need to do something online, or at least different, on the phone.
02:52
So this could be static or dynamic, depending on whether you want global or personalized transcription.
02:58
What about ad conversion rate?
03:01
The interesting subtlety here is that conversions may come in very late.
03:05
For example, if I'm shopping for a car online, I'm unlikely to buy for a very long time.
03:12
This system could use dynamic training.
03:14
Then regularly going back at different intervals to catch up on new conversion data that has arrived for the past.
03:21
So in practice, most of the time you'll need to use dynamic, but you might start with static because it's simpler.
03:28
In a reference architecture for static training, models are trained once and then pushed to AI platform.
03:36
Now for dynamic training, there are three potential architectures to explore: Cloud Functions, App Engine, or Dataflow.
03:46
In a general architecture for dynamic training using Cloud Functions, a new data file appears in Cloud Storage, and then the Cloud Function is launched.
03:55
After that, the Cloud Function starts the AI Platform training job.
03:59
And then the AI Platform writes out a new model.
04:04
In a general architecture for dynamic training using App Engine, when a user makes a web request from a dashboard to
04:09
App Engine, an AI Platform training job is launched, and the AI Platform job writes a new model to Cloud Storage.
04:18
From there, the statistics of the training job are displayed to the user when the job is complete.
04:24
The Dataflow pipeline is also possibly invoking the model for predictions.
04:29
Here, the streaming topic is ingested into Pub/Sub from subscribers.
04:33
Messages are then aggregated with Dataflow, and aggregated data is stored in BigQuery.
04:39
AI Platform is launched on the arrival of new data in BigQuery, and then an updated model is deployed.


Transcript
00:00
Person: Just as the use case determines appropriate training architecture, it also determines the appropriate serving architecture.
00:08
In designing our serving architecture, one of our goals is to minimize average latency.
00:14
Just as in operating systems where we don't want to be bottlenecked by slow disk IO, when serving models, we don't want to be bottlenecked by slow to decide models.
00:25
Remarkably, the solution for serving models is very similar to what we do to optimize IO performance.
00:31
We use a cache.
00:33
In this case, instead of faster memory, we'll use a table.
00:37
Static serving then computes the label ahead of time and serves by looking it up in the table.
00:44
Dynamic serving in contrast computes the label on demand.
00:49
There's a space-time trade-off.
00:51
Static serving is space intensive, resulting in higher storage costs because we store precomputed predictions with a low, fixed latency and lower maintenance costs.
01:02
Dynamic serving, however, is compute intensive.
01:06
It has lower storage costs, higher maintenance, and variable latency.
01:11
The choice of whether to use static or dynamic serving is determined by considering how important costs are with regard to latency, storage, and CPU.
01:23
Sometimes it can be hard to express the relative important of these three areas.
01:28
As a result, it might be helpful to consider static and dynamic serving through another lens, peakedness and cardinality.
01:37
Peakedness in a data distribution is a degree to which data values are concentrated around the mean, or in this case, how concentrated the distribution of the prediction workload is.
01:50
You can also think of it as inverse entropy.
01:53
For example, a model that predicts the next word based on the current word, which you might find in your
01:58
mobile phone keyboard app would be highly peaked because a small number of words account for the majority of words used.
02:08
In contrast, a model that predicted quarterly revenue for all sales verticals in order to populate a report would be right on the same verticals.
02:17
And with the same frequently for each.
02:18
And so, it would be very flat.
02:23
Cardinality refers to the number of values in a set.
02:26
In this case, the set is composed of all the possible things we might have to make predictions for.
02:33
So, a model predicting sales revenue given organization division number would have fairly low cardinality.
02:41
A model predicting lifetime value given a user friendly e-commerce platform would have high cardinality because
02:46
the number of users and the number of characters of each user are probably quite large.
02:53
Taken together peakedness and cardinality create a space.
02:58
When the cardinality is sufficiently low, we can store the entire expected prediction workload.
03:03
For example, the predicted sales revenue for all divisions in a table and use static serving.
03:09
When the cardinality is high because the size of the input space is large and the workload is not very peaked, you probably want to use dynamic training.
03:19
In practice though, a hybrid of static and dynamic is often chosen, where you statically cache some of the predictions while responding on demand for the long tail.
03:29
This works best when the distribution is sufficiently peaked.
03:33
The striped area above the curve and not inside the blue rectangle is suitable for
03:37
a hybrid solution, with the most frequently requested predictions cached and the tail computed on demand.
03:46
Let's try to estimate training and inference needs for the same use cases that we saw in the previous lesson.
03:52
The first use case is predicting whether an e-mail is spam.
03:56
What inference style is needed?
03:58
Well, first we need to consider how peaked the distribution is.
04:02
The answer is not at all.
04:03
Most e-mails are probably different, although they may be very similar if generated programmatically.
04:10
Depending on the choice of representation, the cardinality might be enormous, so this would be dynamic.
04:18
The second use case is Android voice-to-text.
04:21
This is, again, subtle.
04:21
Inference is almost certain on line because there's such a long tail of possible voice clips.
04:28
But maybe with sufficient signal processing, some key phrases like, "Okay, Google," may have pre-computed answers.
04:36
So, this would be dynamic or hybrid.
04:39
And the third use case is shopping ad conversion rate.
04:42
The set of all ads doesn't change much from day to day, assuming users are comfortable waiting for a short while after uploading their ads.
04:49
This could be done statically.
04:52
And then the back script could be run at regular intervals throughout the day.
04:55
This would be static.
04:59
In practice, you'll often use a hybrid approach.
05:03
You might not have realized it, but dynamic serving is what we have learned so far.
05:08
Think back to the architecture of the systems we've used to make predictions.
05:10
A model that lived in AI Platform was sent one or more instances and returned predictions for each.
05:19
If you want to build a static serving system, you want to make three design changes.
05:24
First, you need to change your call to AI Platform from an online prediction job to a batch prediction job.
05:31
Second, you need to make sure that your model accepted and passed through keys as input.
05:37
These keys will allow you to join your request to prediction at serving time.
05:42
And third, you write the predictions to a data warehouse like BigQuery, and create an API to read from it.
05:50
Although the details for each of these instructions are beyond the scope of this lesson, we've provided links in
05:54
the course resources on submitting a batch prediction job, enabling pass-through features in your model, and loading data into BigQuery.


Transcript
00:00
person: In this section, we'll apply what we've learned to a new use case.
00:03
Let's pretend the head of a municipal transit system has contacted you to build a system that predicts the traffic levels on roads.
00:10
As part of your preparation for this task, you're trying to thoroughly understand the business constraints in order to make the appropriate system design tradeoffs.
00:18
The data available consists of sensors deployed all over the city, which record whenever a car passes by.
00:24
For each sensor, we know where it is.
00:26
We also know the characteristics of the road that it's on.
00:30
What sort of training architecture is appropriate?
00:34
Well, you should ask yourself, what is the relationship between the features and the labels?
00:38
Is it more like physics or fashion?
00:42
In this case, it's more like fashion trends.
00:44
Cities are very complex systems.
00:46
If a train stops service, people will still need to get home.
00:49
Technology's also always changing.
00:51
On demand taxi services have reshaped urban transit in ways we didn't anticipate a decade ago.
00:56
And there are also episodic changes, like sports events and parades, for example.
01:00
For dynamic relationships, we need to use dynamic training.
01:03
Which sort of serving architecture is appropriate?
01:08
Well, you should ask yourself, is the distribution of prediction requests likely to be more peaked or less peaked?
01:14
In this case, it's likely to be more peaked.
01:17
The distribution of demand is peaked, because it's likely to be dominated by the request for the most heavily trafficked roads.
01:25
Is the cardinality of the set of all prediction requests likely to be low, moderate, high, or perhaps need more info?
01:33
In this case, you'll need more info.
01:35
Why is that?
01:36
What does it depend upon?
01:39
Consider historical traffic data, problem framing, or the variance of traffic levels.
01:47
In this case, the answers are both historical traffic data and the problem framing, but not the variance of traffic levels.
01:54
The reason that the cardinality depends upon the framing of the problem is that we don't know whether the task is to make predictions for every minute, hour, or day.
02:01
And similarly, we don't know how big a region of space each prediction should correspond to.
02:06
It could be anything from a few feet to a few blocks.
02:09
As we learned in the first specialization, machine learning is all about generalization-- the leap of faith into unseen input.
02:15
And what we don't know is whether our users wanna generalize in space, i.e. by making predictions far away
02:20
from the sensors, in time, by making predictions in the future with finer granularity than the historical data, or both.
02:28
In all likelihood, you'd start conservatively, which corresponds to a lower, rather than a higher, cardinality.
02:34
Variance of traffic levels wouldn't matter, because that's a label and not a feature.


Transcript
00:00
As you’ve seen from previous videos, the machine learning ecosystem requires decision making at every stage.
00:07
You need to determine how to handle and prepare data, and also how to design, build, evaluate, train, and monitor a model’s performance.
00:18
Decisions around workflow processes, how to implement or execute those processes, and the management of the workflow itself are required to solve machine learning problems.
00:30
One of the most interesting details about the ML ecosystem is that ML code accounts for only a small percentage of it.
00:38
To keep a system running in production requires a lot more than just computing the model’s outputs for a given set of inputs.
00:46
This means that each component of the ML ecosystem requires not only decisions and processes, but also people.
00:55
According to the International Data Corporation, in 2020, a lack of staff with the right expertise, a lack of
01:03
production-ready data, and a lack of an integrated development environment were reported as primary reasons that machine learning technologies fail.
01:13
So, how do you ensure success for your machine learning or AI use case?
01:19
And how can you or your team prepare and manage your data, build your models, deploy them into production, and then manage them?
01:28
A solution is to use a unified platform that brings all the components of the machine learning ecosystem and workflow together.
01:36
And in this case, that platform is Vertex AI.
01:42
Vertex AI brings together the Google Cloud services for building ML under one unified  user interface and application programming interface, or API.
01:53
With Vertex AI, you can access a dashboard, datasets, features, labeling tasks, notebooks, pipelines, training, experiments, models, endpoints, batch predictions, and metadata.
02:11
Let’s take a closer look at the datasets, notebooks, training, and models sections of the Vertex
02:16
AI navigation bar that help you to prepare your data and build and deploy your models.
02:25
Vertex AI has a unified data preparation tool that supports image, tabular, text, and video content.
02:33
Uploaded datasets are stored in a Cloud Storage bucket that acts as an input for both AutoML and custom training jobs.
02:42
Let’s explore an example where you have sample source data from a BigQuery table about movies and their features.
02:50
First, there is a movie_id column header that can map to an entity type called movie.
02:56
For each movie entity, features include an average_rating, title, and genres.
03:02
The values in each column map to specific instances of an entity type or features, which are called entities and feature values.
03:11
The update_time column indicates when the feature values were generated.
03:16
In the featurestore, the timestamps are an attribute of the feature values, not a separate resource type.
03:24
If all feature values were generated at the same time, you don’t need to have a timestamp column.
03:29
You can specify the timestamp as part of your ingestion request.
03:34
When you use the data to train a model, Vertex AI examines the source data type and feature values and infers how it will use that feature in model training.
03:44
This is called the  transformation for that feature.
03:49
If needed, you can specify a different supported transformation for any feature.
03:55
After you prepare your dataset, you can develop models using Notebooks.
04:00
Notebooks is a managed service that offers an integrated and secure JupyterLab environment for data scientists and machine learning developers to experiment, develop, and deploy models into production.
04:13
Notebooks enable you to create and manage virtual machine (VM) instances because they come pre-installed with the latest data science and machine learning frameworks.
04:23
They also come with a pre-installed suite of deep learning packages, including support for the TensorFlow and PyTorch frameworks.
04:32
Either can be configured for CPU-only or GPU-enabled instances.
04:38
With regard to security, Notebooks instances are protected by Google Cloud authentication and authorization and
04:43
are available using a Notebooks instance URL, which is part of the metadata of the VM.
04:51
Now let’s shift our focus to training.
04:54
With Vertex AI, you can train and compare models using AutoML or custom code training,  with all models stored in  one central model repository.
05:05
Training pipelines are the primary model training workflow in Vertex AI, which can use training pipelines to create an AutoML-trained model or a custom-trained model.
05:16
For custom-trained models, training pipelines orchestrate custom training jobs and hyperparameter tuning in conjunction with steps like adding a dataset or uploading the model to Vertex AI for prediction serving.
05:31
Custom jobs specify how Vertex AI runs custom training code, including worker pools, machine types, and settings related to a Python training application and custom container.
05:44
Alternatively, hyperparameter tuning searches for the best combination of hyperparameter values by optimizing metric values across a series of trials.
05:55
Both custom jobs and hyperparameter tuning, however, are only used by custom-trained models.
06:02
They are not used by AutoML models.
06:06
Next up are models.
06:08
Models are built from datasets or unmanaged data sources.
06:12
Many different types of machine learning models are available with Vertex AI.
06:17
The right choice will depend on the use case  and your level of experience  with machine learning.
06:23
A new model can be trained, or an existing model can be imported.
06:28
After the model has been imported into Vertex AI, it can be deployed to an endpoint and then used to request predictions.
06:36
AutoML can be used to train a new model with minimal technical effort.
06:40
It can be used to quickly prototype models  and explore new datasets before  investing in development.
06:47
For example, you might use AutoML to determine the good features in a dataset.
06:53
Generally speaking, custom training is used to create a training application optimized for a targeted outcome, because it allows for complete control over training application functionality.
07:05
You can target any objective, use any algorithm, develop your own loss functions or metrics, or carry out any other customization.
07:16
And finally, let’s explore Endpoints.
07:20
Endpoints are machine learning models made available for online prediction requests.
07:26
An endpoint is an HTTPS endpoint that clients can call to receive the inferencing (scoring) output of a trained model.
07:36
They can provide timely predictions from many users, for example, in response to an application request.
07:41
They can also request batch predictions if immediate results aren’t required.
07:49
Multiple models can be deployed to an endpoint, and a single model can be deployed to multiple endpoints to split traffic.
07:57
You might deploy a single model to multiple endpoints to test out a new model before serving it to all traffic.
08:05
Either way, it’s important to emphasize that a model must be deployed to an endpoint before that model can be used to serve online predictions.
08:14
To make that happen, you must define an endpoint in Vertex AI by giving it a name and location
08:19
and deciding whether the access is Standard, which makes the endpoint available for prediction serving through a REST API.
08:29
This has been a brief introduction to Vertex AI, Google Cloud’s unified ML platform.
08:35
For more information, please see cloud.google.com/vertex-ai.

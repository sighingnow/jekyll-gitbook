---
title: Lab 7 - Google Dialogflow & TTS 
author: Chandramouli Vaithiyanathan & Kevin Simpson
date: 2022-07-07
layout: post
---
```
Last modified: Thu, 30 March 2023
```

### Overview of the lab:

In this Lab, we will go through the tasks that are required to setup **Contact Center AI with the Voice Bot and Text-to-Speech (TTS) capabilities**. 

## Table of Contents


| Topic                                                                         | Lab Type      | Difficulty Level | Estimated length |
| ----------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Setup the Google Account](#setup-the-google-account)        | Practical Lab | EASY            | 20 min           |
| [Setup Dialogflow Agent \& Google Connector](#setup-dialogflow-agent--google-connector) | Practical Lab | MID            | 20 min            |
| [TTS, EWT \& PIQ](#tts-ewt--piq)                                           | Practical Lab | MID            | 20 min            |
| [Virtual Agent](#virtual-agent)                   | Practical Lab | MID            | 15 min           |



## Introduction

### Lab Objective

- This lab is designed to help you configure a Google Dialogflow Agent using CCAI (Contact Center AI) on Webex Contact Center and utilize TTS (Text-to-Speech) capabilities.

- At the end of this lab, you should have a fully functioning bot front-ending the Webex Contact Center and text to speech prompts.

### Prerequisites

- You must have a Google Account created.

- A credit/debit card (American Express, Mastercard or Visa) is needed to create the Google Billing account.
> **Note:** No card will be automatically billed any cost, but a billing account needs to be setup to be able to utilize TTS.

- Lab 2 ([IVR Contact Routing Lab](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/IVR.html)) should be completed, as same call flows will be used and expanded upon.


### Quick Links

> Control hub: **[https://admin.webex.com](https://admin.webex.com){:target="_blank"}**

> Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal){:target="_blank"}**

> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com/){:target="_blank"}**

> Google Cloud Console: **[https://console.cloud.google.com](https://console.cloud.google.com/){:target="_blank"}**

> Dialogflow: **[https://dialogflow.cloud.google.com](https://dialogflow.cloud.google.com/){:target="_blank"}**



## Lab Section

# Setup the Google Account

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/h2-dWC5yo-U?rel=0" title="Google CCAI Integration Lab: Setup Google Account" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Login to [Google Cloud Console](https://console.cloud.google.com/) with your Google Account credentials.

- Click on **Select a project** on top and then on **NEW PROJECT** on the pop-up window.

- Enter a name for your project, e.g. `TS2021-CCAI` and click on **CREATE**.

- Make sure you have this project selected. 

- On the navigation bar on the left, click on **Billing**.

- Click on **LINK A BILLING ACCOUNT** and then on **CREATE BILLING ACCOUNT**.

- Enter your Account Information (`Country`, `Mobile Phone`), accept the Terms of Service and click on **CONTINUE**.

- Enter your credit/debit card details and click on **START MY FREE TRIAL**. 

- Click on **CLOSE** on the next pop-up window.

- On the search bar, type `text to speech` and click on the **Cloud Text-to-Speech API**.

- Click on **ENABLE**.

- Click on **CREATE CREDENTIALS** on the top-right. 

- If prompted,choose **Cloud Text-to-Speech API** from the dropdown menu and check the **Application Data** option and **No, I'm not using them** and then click on **NEXT**.

- On the **Service account details**, enter a name for the service account, e.g. `TS2021_TTS_SA` and then click on **CREATE AND CONTINUE**. 

- On **Grant this service account access to project**, search and choose the **DialogFlow API Admin** role and then click on **CONTINUE** and then on **DONE**.

- Similarly, now on the search bar type `dialogflow API` and click on the **Dialogflow API**.

- Click on **ENABLE**.

- Click on **CREATE CREDENTIALS** on the top-right. 

- If prompted,choose **Dialogflow API** from the dropdown menu and check the **Application Data** option and **No, I'n not using them** and then click on **NEXT**.

- On the **Service account details**, enter a name for the service account, e.g. `TS2021_CCAI_SA` and then click on **CREATE AND CONTINUE**. 

- On **Grant this service account access to project**, search and choose the **DialogFlow API Admin** role and then click on **CONTINUE** and then on **DONE**.

- To generate the required .json keys, click on the service account you created (e.g. **ts2021-ccai-sa@ts2021-ccai.iam.gserviceaccount.com**).

- Click on the **KEYS** tab and then on **ADD KEY** > **Create new key**.

- Choose the **JSON** key type and click on **CREATE**. Make sure you have the key saved locally.

- Click on **Service Accounts** on the left and follow the same procedure to download the TTS JSON key as well.


# Setup Dialogflow Agent & Google Connector

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/Q0j13mrjKrw?rel=0" title="Google CCAI Integration Lab: Setup Dialogflow Agent & Google Connector" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Open [Control Hub Admin](https://admin.webex.com/) page.

- Go to **Contact Center** > **Connectors** and click **Set Up** on **Google connector**.

- Give a name to the connector, e.g. `techsummit_google_tts` and click on **Upload Authentication Key** to upload the .json file key downloaded before. Click on **Done**.

- Go to **Features** tab and click on **New** template.

- Click on **Virtual Agent**.

- Check only **Use For Voice** and click on **Next**.

- Choose **Yes, I have a preconfigured Dialogflow agent.**

- Click on **Download Intents** and save the .zip file with the two intents locally.

- Open a new tab and go to [Dialogflow page](https://dialogflow.cloud.google.com/) and login with your Google credentials.

- Click on **Create an Agent**.

- On the **GOOGLE PROJECT**, give a name to the agent, e.g. `TS_DF_Agent`,  choose the project created in the previous step and click on **CREATE**.

- On the next page, click on the dots on the top right (next to **CREATE INTENT**) and choose **Upload Intent**.

- Unzip the two intents you downloaded from Control Hub (**escalation.json** & **handled.json**) and upload them here.

- Go back to the Control Hub tab and click on **Next**.

- Give a name to your virtual agent, e.g. `TS_CCAI_Agent` and click on **Next**.

- Upload the CCAI/Dialogflow .json key downloaded in the previous part and click on **Validate**. If all is good, click on **Next**.

- Skip the avatar step and click **Next**.

- Click on **Finish** to complete the Virtual Agent creation.


# TTS, EWT & PIQ 

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/0XFQfwzPhzw?rel=0" title="Google CCAI Integration Lab: TTS EWT PIQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Open Flow 3 in the Flow Designer from Lab 2 ([IVR Contact Routing Lab](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/IVR.html)).

- In the **Success** Play Message block, chose **Enable Text-to-Speech** under Prompt, choose your created connector (e.g. `techsummit_google_tts`) and set language as **en-GB-Standard-A**.

- Type "Thanks \{\{Customer_Name\}\}, we got your information" as your TTS message.

- Make a new test call and verify that you get a personalized message with the customer's name based on the PIN provided.

- For **EWT**, after the **QueueContact1** node, add a **Get Queue info** block.

- Under **Queue Information**, select **Static Queue** and enter your queue.

- On success path, add a new **Play Message** block. Name it **EWT_PIQ**.

- Add the TTS connector to it similar to the step above and type "You Estimated Wait Time is \{\{GetQueueInfo.EWT\}\} and your position in Queue is \{\{GetQueueInfo.PIQ\}\}" as message.

- Similarly, for the **Insufficient Information** block, add a new **Play Message** block and name it **PIQ**.

- Again, add the TTS connector and type "Your position in Queue is \{\{GetQueueInfo.PIQ\}\}" as message.

- Save and publish the flow. Test the call flow and make sure you hear the PIQ prompt.

> **Note:** Make sure no agent is available to handle the call to be able to listen to the PIQ prompt.

# Virtual Agent

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/QHkKbr2DsMA?rel=0" title="Google CCAI Integration Lab: Virtual Agent" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Create a new call flow in the Flow Designer.

- Create a flow logic similar to the video guide, i.e. first add a **Virtual Agent** block after the **New Phone Contact**.

- Under **Conversational Experience**, add the virtual agent you have created (e.g. `TS_CCAI_Agent`) and enable **Make Prompts Interruptible**.

- For `Handled` output from Virtual Agent, which means that self-service was successful, connect the output to a **Play Message** block and add a "Call successfully handled by virtual agent!" TTS message to it. 

- Connect that Play Message to a **Disconnect Contact** block.

- Respectively, for `Escalated` output, which means that self-service was not sufficient and we need to escalate this to an agent, connect the output to a **Queue Contact** block and assign your Queue to that block.

- Add a **Play Music** block with some music on hold and loop it to itself to use as MOH while customer is waiting for an available agent.

- Map that flow to your entry point to be able to make test calls.

- Make a test call and when virtual agent greets you and asks you what you would want, answer with `I don't need any more help`. This will trigger the **Handled** output and terminate the call after a message from the bot.

- Make another test call. This time, answer with `I need help with billing`. This will trigger the **Escalated** output and search for an available agent.

- Optionally, you can send the transcript of the conversation between the customer and the virtual agent to the agent when connected. To do so, you would need to **Enable Conversation Transcipt** under Advanced Settings in the Virtual Agent block.

- Also, you would need to create a CAD Variable to save the **TranscriptURL** output variable from the Virtual Agent block and pass it to the desktop.

- Feel free to play around with various phrases as responses to the virtual agent and see if it is able to handle them properly.


---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

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

# Configure Dialogflow CX Virutal Agent

## Table of Contents

<ul>
  <li><a href="#Introduction to Webex Contact Center with Dialogflow CX">Introduction to Webex Contact Center with Dialogflow CX</a></li>
  <li><a href="#addresses-and-credentials">Addresses and Credentials</a></li>
  <li><a href="#provisioning">Provisioning</a>
    <ul>
      <li><a href="#objectives-provisioning">Objectives</a></li>
      <li><a href="#introduction-to-provisioning">Introduction to Provisioning</a></li>
    </ul>
  </li>
  <li><a href="#create-dialogflow-cx-virtual-agent">Create Dialogflow CX Virtual Agent</a>
    <ul>
      <li><a href="#objectives-create-dialogflow-cx-virtual-agent">Objectives</a></li>
      <li><a href="#Task 1. Create new Virtual Agent">Task 1. Create new Virtual Agent</a></li>
      <li><a href="#task-2">Task 2. Assign the agent that you created for the Conversational profile.</a></li>
      <li><a href="#task-3">Task 3. Configure Google Contact Center AI connector</a></li>
      <li><a href="#task-4">Task 4. Create Contact Center AI config</a></li>
    </ul>
  </li>
  <li><a href="#configure-dialogflow-cx-virtual-agent">Configure Dialogflow CX Virtual Agent</a>
    <ul>
      <li><a href="#objectives-configure-dialogflow-cx-virtual-agent">Objectives</a></li>
      <li><a href="#task-1-1">Task 1. Navigate to Dialogflow CX Agent flow builder and customize the initial greeting.</a></li>
      <li><a href="#task-2-1">Task 2. Create new page to collect the caller name</a></li>
      <li><a href="#task-3-1">Task 3. Create new page Agent_or_Estimate and connect it with the Caller_Name page.</a></li>
      <li><a href="#task-4-1">Task 4. Configure Route in Agent_or_Estimate page to move the call to new page What_Kind_Of_Agent.</a></li>
      <li><a href="#task-5">Task 5. Configure Route for Estimate branch and Connect Agent_or_Estimate to new page Estimate_Details.</a></li>
      <li><a href="#task-6">Task 6. Configure Estimate_Details page with Parameters and Route</a></li>
      <li><a href="#task-7">Task 7. Configure Estimate_Details page with Routes.</a></li>
    </ul>
  </li>
  <li><a href="#configure-flow-with-virtual-agent-in-webex-contact-center-management-portal">Configure Flow with Virtual Agent in Webex Contact Center Management Portal</a>
    <ul>
      <li><a href="#objectives-configure-flow">Objectives</a></li>
      <li><a href="#task-1-2">Task 1. Create new flow.</a></li>
      <li><a href="#task-2-2">Task 2. Configured Handled path to extract estimate data for the Analyzer report.</a></li>
      <li><a href="#task-3-2">Task 3. Configured Escalated to move the call to the appropriate Queue with live agents.</a></li>
      <li><a href="#task-4-2">Task 4. Add the flow to you Entry Point.</a></li>
      <li><a href="#task-5-1">Task 5. Test your configurations.</a></li>
    </ul>
  </li>
  <li><a href="#related-information">Related Information</a></li>
</ul>


## Introduction to Webex Contact Center with Dialogflow CX

The Webex Contact Center with Google CCAI is the integration that allows the use of Google Text-To-Speech, Natural Language Understanding and Virtual Agent technologies with Webex Contact Center.

Dialogflow CX is designed for building complex, multi-turn conversations that involve multiple steps and decision points. It provides tools for creating conversational flows, managing context, handling user intents and entities, and integrating with other applications. Think of conversations that have many turns and where you want to track the interaction content very deeply. These types of conversations typically happen on the phone line to a Contact Center where people ask all types of questions, and the Virtual Agent needs to listen in and provide the answers. It does not mean that you cannot build complex flow using Dialogflow Essentials, which is another version of Dialogflow, but you would need to use a lot of code around it to build a whole framework to achieve complicated logic. But with Dialogflow CX flow builder interface it is no longer the case as the graphical interface lets developers design and build conversational AI applications without requiring extensive coding skills.

Webex Contact Center now supports Dialogflow CX integration and using this article, you can configure and test the solution.

The integration requires you to do configuration in multiple portals: Google Cloud Platform and Google Dialogflow CX, Webex Control Hub, and Webex Contract Center.

## Addresses and Credentials

- <a href="https://admin.webex.com">Webex Control Hub</a>

- <a href="https://portal-v2.wxcc-us1.cisco.com/portal">Webex Contact Center Management Portal</a>

- <a href="https://console.cloud.google.com">Google Cloud Portal Console</a>

- <a href="https://dialogflow.cloud.google.com/cx">Google Dialogflow CX</a>


## Provisioning
 
### Objectives

The objective of this section is to introduce you to Provisioning process which would require to obtain Google CCAI licence for Webex Contact Center.

### Introduction to Provisioning

For billing purposes, you need to provision Webex Contact Center with Google CCAI.

Google provides these APIs for integration of Dialogflow Virtual Agent and Text-to-Speech technologies:

- Dialogflow API
- Cloud Speech-to-Text API
- Cloud Natural Language API
- Cloud Text-to-Speech API
 
These APIs are not necessarily free and can require a billing account on Google Cloud Portal. The main reason of the Provisioning process is to create the billing account between Cisco and Google for the user, so all user billing goes directly through the Cisco Accounting team. It means the user pays to Cisco and Cisco pays to Google.

<img src="/assets/images/CX/2023-12-23_22h21_31.png">

The process takes a couple of days, so you are not going to complete the Provisioning process in this section. For your information in the next screenshot, you can see the high-level diagram with the required steps to complete the Provisioning.

<img src="/assets/images/CX/2023-12-23_22h22_46.png">

If you would like to read more about the Provisioning process, refer to <a href="https://www.cisco.com/c/en/us/support/docs/contact-center/webex-contact-center/217594-provision-google-ccai-with-webex-contact.html">Provision Google CCAI for WxCC</a> article.


## Create Dialogflow CX Virtual Agent

### Objectives 

This section describes how to navigate Dialogflow CX and Webex Control Hub portals to create a new agent and bind the agent to the Webex environment by creating a new Contact Center AI Config.

### Task 1.  Create new Virtual Agent

Step 1. Log into Dialogflow CX portal using your user account and password. Select project CL2024AMS. (If you experience any difficulties with logging in please clear the catch and cookies on the browser you use.)

Step 2. Click <b>Create Agent</b>. Then select <b>Build your own</b>.

<img src="/assets/images/CX/2023-12-23_22h25_09.png">

Step 3. Provide the name for the new agent using this format: <b>{Your Name}_Virtual_Agent</b> . Select location global <b>(Global serving, data-at-rest in US)</b>.

<img src="/assets/images/CX/2023-12-23_22h27_26.png">

### Task 2.  Assign the agent that you created for the Conversational profile.

Note: <i>A Dialogflow Conversation profile is a set of configuration settings that define the behavior of the virtual agent in a conversation with a user</i>.

Step 1. On the left top corner click <b>Menu</b> icon.

<img src="/assets/images/CX/2023-12-23_22h28_19.png">

Step 2. From the <b>Menu</b> options, select <b>Agent Assist</b>.

<img src="/assets/images/CX/2023-12-23_22h29_20.png">

Step 3. In the next window click on the <b>Conversation profile</b> under the DATA section. Now create a new Conversation profile for your section.

<img src="/assets/images/CX/2023-12-23_22h30_08 (1).png">

Step 4. Create the name for your <b>Conversation profile</b> using this format: <b>{Your Name}_Conversational_Profile</b>.

<img src="/assets/images/CX/2023-12-23_22h30_56.png">

Step 5. Scroll down and enable the virtual agent for this <b>Conversation profile</b>. Click on the <b>Agents</b> field and select the agent that you created in the previous task and then click <b>Create</b>.

<img src="/assets/images/CX/2023-12-23_22h31_32.png">

Step 6. Once the <b>Conversation profile</b> is created, copy the profile ID past it to a notepad, or just know that this is the place where you can get the <b>Conversation Profile ID</b> as you need it the Task 4 of this section when configuring the AI config in Webex Control Hub.

<img src="/assets/images/CX/2023-12-23_22h32_10.png">

### Task 3.  Configure Google Contact Center AI connector

<b>(This Task is information only)</b>
Log into Webex Control Hub using your user account, select Contact Center service and open Connectors. You can see the Google Contact Center AI card. This connector is used specifically for Dialogflow CX agents. Only users with permissions to Cisco Project can create this connector. For security reasons, the users for this section do not have such permission so this connector is preconfigured for you. For the demo purposes Dialogflow-CX connector can be used. 

<img src="/assets/images/CX/2023-12-23_22h32_59.png">

## Task 4.  Create Contact Center AI config

Step 1. In <a href="https://admin.webex.com">Webex Control Hub</a>, go to the <b>Contact Center service</b>, select <b>Feature</b>, and click <b>New</b>.

<img src="/assets/images/CX/2023-12-23_22h33_57.png">

Step 2. On the next window, select <b>Contact Center AI Config</b>.

<img src="/assets/images/CX/2023-12-23_22h34_37.png">

Step 3. Give the name for the feature using this format: <b>{Your Name}_WxCC__Virtual_Agent</b>. Select Dialogflow CX as the <b>Google Contact Center AI Connector</b> and post the <b>Conversation profile ID</b> that you had previously in Task 2.

<img src="/assets/images/CX/2023-12-23_22h35_31.png">

Step 4. You can now see the <b>Feature</b> was created.

<img src="/assets/images/CX/2023-12-23_22h36_12.png">

<h2 id="configure-dialogflow-cx-virtual-agent">Configure Dialogflow CX Virtual Agent</h2>

<h3 id="objectives-configure-dialogflow-cx-virtual-agent">Objectives</h3>

This section describes how to configure the Virtual Agent to have a conversation with a caller and decide whether to send the call directly to the queue with human agents or collect estimate information and send the data to the Analyzer report.

In the next screenshot, you can see a functional diagram of the flow for this section.

<img src="/assets/images/CX/2023-12-27_10h47_01.png">

<h3 id="task-1-1">Task 1. Navigate to Dialogflow CX Agent flow builder and customize the initial greeting.</h3>

Step 1. Log in to <a href="https://dialogflow.cloud.google.com/cx">Google Dialogflow CX</a> portal using your user account and password. Select project <b>CL2024AMS</b>.

Step 2. Select the <b>Virtual Agent</b> that you created earlier.

<img src="/assets/images/CX/2023-12-23_22h38_41.png">

Step 3. In the Dialogflow CX builder click on the Start page.

<i>Note: In Dialogflow CX, a page is a set of instructions that holds one or more related conversational turns. It represents a single step in a conversation flow, and it can contain various types of content, including text responses, prompts for user input, fulfillment actions, and more. Pages are connected together to create a conversation flow that guides the user through a conversation with the Dialogflow CX agent.</i>

<img src="/assets/images/CX/2023-12-23_22h39_19.png">

Step 4. In the <b>Start</b> page click on <b>Default Welcome Intent Route<//b>. On the right window, scroll down, delete all the default Agent responses, and click on the field to <b>Enter</b> agent dialog.

<i>Note: A route is a mapping between an intent and a specific page or flow within a conversation. Routes define how a conversation can flow based on the user input and the intent that is matched.</i>

<img src="/assets/images/CX/2023-12-23_22h40_10.png">

Step 5. Provide your customized message to let the caller know that they reached an organization that provides sales services of Webex Contact Center. You can type something like: Hello! Thank you for calling. Here you know all about Webex Contact Center. In Dialogflow CX, the changes are not saved automatically, so you need to save the page every time you make a change.

<i>Note: Agent responses are the messages or actions that an agent sends back to the user or caller during a conversation. When a user or caller sends a message or makes a request to a Dialogflow CX agent, the agent analyses the input and determines the appropriate response to send back.</i>

<img src="/assets/images/CX/2023-12-23_22h40_56.png">

Step 6. Test the agent response that you just created. Click <b>Test Agent</b> and type a greeting message such as Hello.

<img src="/assets/images/CX/2023-12-23_22h44_11.png">

<h3 id="task-2-1">Task 2. Create new page to collect the caller name</h3>

Step 1. Close the <b>Start</b> page and <b>Test Agent</b> windows and click the plus icon <b>(+)</b> to create a new page. Name the page <b>Caller_Name</b> and confirm the creation.

<img src="/assets/images/CX/2023-12-23_22h46_25.png">

Step 2. Connect the <b>Start</b> page and <b>Caller_Name</b> page. For this, click the <b>Default Welcome Intent</b> route on the <b>Start</b> page. Scroll down on the right side and select that you would like the conversation to go to the next page.

<img src="/assets/images/CX/2023-12-23_22h47_09.png">

Step 3. From the drop-down list, select <b>Caller_Name</b> page. Do not forget to <b>Save</b> the change.

<img src="/assets/images/CX/2023-12-23_22h47_44.png">

Step 4. Configure the <b>Caller_Name</b> page to collect the name from the caller and store it in the parameter. In the <b>Caller_Name</b> page click <b>Entry Fulfillment</b> and type message in which you ask the caller name. Click <b>Add</b> and <b>Save</b> the change.

<i>Note: Entry Fulfillment is needed to provide a message to the caller once the call is moved to a new page to let the caller know where they are in the conversation and set the right expectations.</i>

<img src="/assets/images/CX/2023-12-23_22h48_24.png">

Step 5. While on the <b>Caller_Name</b> page, click on <b>Parameters</b>, type <b>Name</b> as the parameter’s name, select <b>sys.any</b>  from the list of preconfigured Entities, and click on <b>Save</b>.

<i>Note: A Parameter is a named entity or value that is extracted from user input during a conversation. Parameters can be used to store information that is relevant to the user request, such as their name, date of birth, or preferred language. Parameters can also be used to pass data to other parts of your application such as Contact Center.</i>

<img src="/assets/images/CX/2023-12-23_22h49_33.png">

Step 6. Configure <b>Routes</b> in the <b>Caller_Name</b> page. Click <b>Route</b>, on the right window scroll down to <b>Condition</b> and set the condition <b>$page.params.status ="FINAL"</b>. Click <b>Save</b>. By setting this condition, you can expect the call to move to the next page once the <b>Name</b> parameter which you created in the previous step is filled with a value. For example, if the caller says Nick then the call can move forward. 

<i>Note: A Condition in the Dialogflow Routes configuration is a rule or set of rules that define when the route must be triggered. The Condition can be based on various factors such as user input, context, parameters, and session data.</i>

<img src="/assets/images/CX/2023-12-23_22h50_16.png">

Step 7. Using the <b>Test</b> Agent option on the right top side, test if the flow is working as designed at this point.

<img src="/assets/images/CX/2023-12-23_22h51_16.png">

<h3 id="task-3-1">Task 3. Create new page Agent_or_Estimate and connect it with the Caller_Name page.</h3>

Step 1. On the left bottom side, click to add a new page, name it <b>Agent_or_Estimate</b>, and confirm the creation.

<img src="/assets/images/CX/2023-12-23_22h52_03.png">

Step 2. Connect <b>Caller_Name</b> and <b>Agent_or_Estimate</b> pages. Open the <b>Caller_Name</b> page, and select the route that you created in the previous step, on the right side scroll down and select the page <b>Agent_or_Estimate</b>. Do not forget to <b>Save</b> the change.

Remember in Task 2 of this section you configured the condition that once the parameter is filled it triggers an action. By selecting the next page you specify what action it is, in this example the call moves to the page <b>Agent_or_Estimate</b>.

<img src="/assets/images/CX/2023-12-23_22h52_45.png">




























---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

#

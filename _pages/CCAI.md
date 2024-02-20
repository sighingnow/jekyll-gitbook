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
| [Setup Dialogflow ES Agent \& Google Connector](#setup-dialogflow-es-agent--google-connector) | Practical Lab | MID            | 20 min            |
| [Configure TTS, EWT \& PIQ](#configure-tts-ewt--piq)                                           | Practical Lab | MID            | 20 min            |
| [Configure Dialogflow ES Virutal Agent](#configure-dialogflow-es-virutal-agent)                   | Practical Lab | MID            | 15 min           |
| [Configure Dialogflow CX Virutal Agent](#configure-dialogflow-cx-virutal-agent)                   | Practical Lab | MID            | 90 min           |


Configure Dialogflow CX Virutal Agent


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


# Setup Dialogflow ES Agent & Google Connector

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


# Configure TTS, EWT & PIQ

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

# Configure Dialogflow ES Virutal Agent

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
  <li><a href="#introduction123">Introduction to Webex Contact Center with Dialogflow CX</a></li>
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
      <li><a href="#task-1">Task 1. Create new Virtual Agent</a></li>
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
</ul>


<h2 id="introduction123">Introduction to Webex Contact Center with Dialogflow CX</h2>

The Webex Contact Center with Google CCAI is the integration that allows the use of Google Text-To-Speech, Natural Language Understanding and Virtual Agent technologies with Webex Contact Center.

Dialogflow CX is designed for building complex, multi-turn conversations that involve multiple steps and decision points. It provides tools for creating conversational flows, managing context, handling user intents and entities, and integrating with other applications. Think of conversations that have many turns and where you want to track the interaction content very deeply. These types of conversations typically happen on the phone line to a Contact Center where people ask all types of questions, and the Virtual Agent needs to listen in and provide the answers. It does not mean that you cannot build complex flow using Dialogflow Essentials, which is another version of Dialogflow, but you would need to use a lot of code around it to build a whole framework to achieve complicated logic. But with Dialogflow CX flow builder interface it is no longer the case as the graphical interface lets developers design and build conversational AI applications without requiring extensive coding skills.

Webex Contact Center now supports Dialogflow CX integration and using this article, you can configure and test the solution.

The integration requires you to do configuration in multiple portals: Google Cloud Platform and Google Dialogflow CX, Webex Control Hub, and Webex Contract Center.

<h2 id="addresses-and-credentials">Addresses and Credentials</h2>

- <a href="https://admin.webex.com">Webex Control Hub</a>

- <a href="https://portal-v2.wxcc-us1.cisco.com/portal">Webex Contact Center Management Portal</a>

- <a href="https://console.cloud.google.com">Google Cloud Portal Console</a>

- <a href="https://dialogflow.cloud.google.com/cx">Google Dialogflow CX</a>


<h2 id="provisioning">Provisioning</h2>
 
<h3 id="objectives-provisioning">Objectives</h3>

The objective of this section is to introduce you to Provisioning process which would require to obtain Google CCAI licence for Webex Contact Center.

<h3 id="introduction-to-provisioning">Introduction to Provisioning</h3>

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


<h2 id="create-dialogflow-cx-virtual-agent">Create Dialogflow CX Virtual Agent</h2>

<h3 id="objectives-create-dialogflow-cx-virtual-agent">Objectives</h3>

This section describes how to navigate Dialogflow CX and Webex Control Hub portals to create a new agent and bind the agent to the Webex environment by creating a new Contact Center AI Config.

<h3 id="task-1">Task 1. Create new Virtual Agent</h3>

Step 1. Log into Dialogflow CX portal using your user account and password. Select project CL2024AMS. (If you experience any difficulties with logging in please clear the catch and cookies on the browser you use.)

Step 2. Click <b>Create Agent</b>. Then select <b>Build your own</b>.

<img src="/assets/images/CX/2023-12-23_22h25_09.png">

Step 3. Provide the name for the new agent using this format: <b>{Your Name}_Virtual_Agent</b> . Select location global <b>(Global serving, data-at-rest in US)</b>.

<img src="/assets/images/CX/2023-12-23_22h27_26.png">

<h3 id="task-2">Task 2. Assign the agent that you created for the Conversational profile.</h3>

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

<h3 id="task-3">Task 3. Configure Google Contact Center AI connector</h3>

<b>(This Task is information only)</b>
Log into Webex Control Hub using your user account, select Contact Center service and open Connectors. You can see the Google Contact Center AI card. This connector is used specifically for Dialogflow CX agents. Only users with permissions to Cisco Project can create this connector. For security reasons, the users for this section do not have such permission so this connector is preconfigured for you. For the demo purposes Dialogflow-CX connector can be used. 

<img src="/assets/images/CX/2023-12-23_22h32_59.png">

<h3 id="task-4">Task 4. Create Contact Center AI config</h3>

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

Step 3. Configure <b>Entry Fulfillment</b> for <b>Agent_or_Estimate</b> page. Open up <b>Agent_or_Estimate</b> page, and click <b>Entry Fulfillment</b>. In the Agent response type: Hi $session.params.Name, please let me know if you would like to speak with an agent or if you would to create an estimate?

Do not forget to <b>Save</b> the change.

<i>Note: If you cannot copy and paste the suggested fulfillment just start typing in the Agent Response field, then you can paste the text, then delete unnecessary text.</i>

<img src="/assets/images/CX/2023-12-23_22h54_20.png">

Step 4. Test if the conversation flow is configured properly at this point. Click <b>Test Agent</b> and in the <b>Talk to Agent</b> field type Hello and then type your name.

<img src="/assets/images/CX/2023-12-23_22h55_05.png">

<h3 id="task-4-1">Task 4. Configure Route in Agent_or_Estimate page to move the call to new page What_Kind_Of_Agent.</h3>

Step 1. Open up the <b>Agent_or_Estimate</b> page, click on <b>Create New Route</b>, and then click on <b>Create New Intent</b>.

<i>Note: An intent is a mapping between what a user says or types and a specific action or response that the conversational agent can take. Intents help the agent understand the user request and determine the appropriate response or action to take.</i>

<img src="/assets/images/CX/2023-12-23_22h55_56.png">

Step 2. Name the Intent <b>Agent_intent</b>. Provide 3-5 training phrases, something like agent, representative, escalate, real person. Do not forget to save the change of the page.

<img src="/assets/images/CX/2023-12-23_22h56_39.png">

Step 3. Create new page and name it <b>What_Kind_Of_Agent</b>.

<img src="/assets/images/CX/2023-12-23_22h57_12.png">

Step 4. Click on <b>Agent_or_Estimate</b> page. Add a new <b>Route</b>, select the <b>Intent</b>.

<img src="/assets/images/CX/2023-12-23_22h57_50.png">

Step 5. On the <b>Routes</b> settings scroll down and select action to move the call to the page <b>What_Kind_Of_Agent</b>.

<img src="/assets/images/CX/2023-12-23_22h58_23.png">

Step 6. For a better communication experience you need to add no-input-default <b>Event handlers</b> otherwise the system detects no input even before you have a chance to provide input. While on the <b>Agent_or_Estimate</b> page, click on <b>Add state handler</b>, select <b>Event handlers</b>, and click on <b>Apply</b>.

<i>Note: An Event handlers is a type of intent that is triggered when a specific event occurs. For example, if the Virtual Agent does not receive any input or it does not recognize the input, the event handler is used to trigger no-input intent which helps to continue the conversation.</i>

<img src="/assets/images/CX/2023-12-23_22h58_57.png">

Step 7. Click on <b>Add New Event handlers</b>, select from the <b>No-input default</b> list and save the change.

<img src="/assets/images/CX/2023-12-23_22h59_34.png">

<h3 id="task-5">Task 5. Configure Route for Estimate branch and Connect Agent_or_Estimate to new page Estimate_Details.</h3>

Step 1. Create <b>Estimate_Intent</b>. While on <b>Agent_or_Estimate</b> page click the plus icon <b>(+)</b> to add new <b>Route</b> and create new <b>Intent</b>.

<img src="/assets/images/CX/2023-12-23_23h00_31.png">

Step 2. Name the intent as <b>Estimate_Intent</b> and provide some training phrases. As for the training phrases you can add statements like estimate, price calculation, I need to know how much it cost. Save the intent.

<img src="/assets/images/CX/2023-12-23_23h01_08.png">

Step 3. Create new page with the name <b>Estimate_Details</b>. Connect <b>Agent_or_Estimate</b> and <b>Estimate_Details</b> pages when <b>Estimate_Intent</b> is triggered.

<img src="/assets/images/CX/2023-12-23_23h01_43.png">

Step 4. Click the <b>Agent_or_Estimate</b> page. Add new <b>Route</b>, and select the Intent <b>Estimate_Intent</b>.

<img src="/assets/images/CX/2023-12-23_23h02_22.png">

Step 5. Scroll a bit down and add the agent response that the caller hears once the <b>Estimate_Intent</b> is triggered. You can type something like, let me collect some information for the estimate.

<img src="/assets/images/CX/2023-12-23_23h03_07.png">

Step 6. Scroll all the way down and select the transaction to the page <b>Estimate_Details</b> once the intent is triggered. Save the page configuration.

<img src="/assets/images/CX/2023-12-23_23h03_39.png">

<h3 id="task-6">Task 6. Configure Estimate_Details page with Parameters and Route</h3>

Step 1. Similar to how you created the Parameter for the caller name, create the <b>Parameter</b> for the number of agents which the caller needs the estimate for. Click on the <b>Estimate_Details</b> page, add the <b>Parameter</b>, name it <b>Number_of_agents</b>, and select from the list the standard <b>Entity</b> type <b>sys.number</b>. Do not forget to save the change.

<img src="/assets/images/CX/2023-12-23_23h04_25.png">

Step 2. Configure the <b>Entry Fulfillment</b> for the caller to understand what information the <b>Virtual Agent</b> is looking for. You can type something like, please let me know how many agents you are planning to have in your Contact Center.

<i>Note: If you cannot copy and paste the suggested fulfillment just start typing in the Agent Responses field, then you can paste the text, then delete unnecessary text.</i>

<img src="/assets/images/CX/2023-12-23_23h04_55.png">

Step 3. Select the condition which triggers the action on the <b>Estimate_Details</b> page. While on the <b>Estimate_details</b> page, click on add new <b>Route</b>, on the right window scroll down a bit and configure the condition <b>$page.params.status =“FINAL”</b>.

<img src="/assets/images/CX/2023-12-23_23h05_26.png">

Step 4. Scroll more down and add the <b>Virtual Agent</b> response. Type: I am putting together the estimate request details for <b>$session.params.Number_of_agents</b>  agents.

<img src="/assets/images/CX/2023-12-23_23h06_08.png">

Step 5. Add dialogue option and select <b>Custom payload</b> from the list.

<img src="/assets/images/CX/2023-12-25_11h32_46.png">

Post this next syntax to the Custom payload section and save the configurations.

{

  "Execute_Request": {

    "Data": {

      "Params": {

        "Estimate_Agents_Count": "$session.params.Number_of_agents"

      }

    }

  }

}

<i>Note: In JSON data format, a variable is a key-value pair that represents a property of an object. The key is a string that identifies the property, and the value is the data associated with the property.</i>

The <b>Custom payload</b> contains the key <b>Estimate_Agents_Count</b> and the value is the <b>Parameter $session.params.Number_of_agents</b>. This <b>Parameter</b> is changed depending on the caller response.

<img src="/assets/images/CX/2023-12-25_11h34_03.png">

Step 6. Scroll more down on the <b>Route</b> section and set up <b>Transition</b> to <b>End Flow</b>.

<img src="/assets/images/CX/2023-12-25_11h34_59.png">

It terminates the session on the Dialogflow side and transfers the call to WxCC where it continues from the <b>Virtual Agent Handled</b> path.

<img src="/assets/images/CX/2023-12-25_11h35_26.png">

Step 7. Test your Virtual Agent flow at this point.

<img src="/assets/images/CX/2023-12-25_11h35_51.png">

<h3 id="task-7">Task 7. Configure Estimate_Details page with Routes.</h3>

Step 1. Create two additional intents, <b>TAC_Intent</b> and <b>Sales_Intent</b>. Click on <b>Manage</b>, select Intents from the <b>Resources</b> list, and then click on <b>Create</b>.

<img src="/assets/images/CX/2023-12-25_11h36_35.png">

Name the intent and provide some training phrases. For example, for <b>TAC_Intent<b> you can add the phrases like: TAC Engineer, Technical Support.

<img src="/assets/images/CX/2023-12-25_11h37_10.png">

For <b>Sales_Intent</b> you can specify something like Price, Sales, and so on.

<img src="/assets/images/CX/2023-12-25_11h38_06.png">

Step 2. Add <b>Route</b> for the TAC queue. Go back to the queue and click on the <b>What_Kind_Of_Agent</b> page. Then click on <b>Add New Route</b> and select the intent you created in the previous step for the TAC queue. Save the route settings.

<img src="/assets/images/CX/2023-12-25_11h39_35.png">

Step 3. Scroll down and add the agent response that the caller hears once the intent is triggered.

<img src="/assets/images/CX/2023-12-25_11h40_34.png">

Step 4. Add the dialog option to move the call to the live agent by selecting Live agent <b>handoff</b>.

<img src="/assets/images/CX/2023-12-25_11h41_16.png">

By selecting this option, the call moves out of the Escalate output of the Virtual Agent V2 block in the flow builder.

<img src="/assets/images/CX/2023-12-25_11h41_42.png">

Step 5. In the <b>Live agent handoff</b> payload field, you can add the data in the JSON format which you can later parse in the WxCC flow. In this case, you need to add <b>Type_Of_Agent (TAC)</b>. TAC  which helps you to make the routing decision to the correct queue in the flow.

{

  "dialogflow.ccai.live-agent-escalation": {

    "Type_Of_Agent": "TAC"

  }

}


<img src="/assets/images/CX/2023-12-25_11h42_11.png">


Step 6. End the flow on the Dialogflow side once the call is moved to the WxCC flow.

<img src="/assets/images/CX/2023-12-25_11h42_47.png">

Step 7. Do the same steps to configure the <b>Route</b> for the Sales queue. Click on <b>Add New Route</b>. Select <b>Sales_Intent</b> and save the <b>Route</b> settings.

<img src="/assets/images/CX/2023-12-25_11h43_17.png">

Step 8. Add the <b>Agent</b> response and <b>Live agent handoff</b> dialog option.

<img src="/assets/images/CX/2023-12-25_11h43_53.png">

Step 9. End the flow for this page once the intent is triggered and the call is moved to the WxCC flow.

<img src="/assets/images/CX/2023-12-25_11h44_32.png">

Step 10. Add the <b>Entry Fulfillment</b> to the <b>What_Kind_Of_Agent</b> page so the caller knows what kind of answer the <b>Virtual Agent</b> expects. Click on the <b>Entry Fulfillment</b> field and type, please let me if you would like to speak with a Technical Support Engineer or you would like to talk about sales.

<img src="/assets/images/CX/2023-12-25_11h45_02.png">

Step 11. Test your Virtual Agent.

<h2 id="configure-flow-with-virtual-agent-in-webex-contact-center-management-portal">Configure Flow with Virtual Agent in Webex Contact Center Management Portal</h2>

<h3 id="objectives-configure-flow">Objectives</h3>

In this section, you can see how to build flow in Webex Contact Center Flow Builder with the <b>Virtual Agent</b> block which moves the call to queue with live agents or to estimate branch where data about the number of agents for the estimate can be extracted and used for <b>Analyzer</b> report.  

<h3 id="task-1-2">Task 1. Create new flow.</h3>

Step 1. In the Webex Contact Center Admin portal open up the  <b>Routing Strategy Module</b> and  <b>Create New Flow </b> entry window.

<img src="/assets/images/CX/2023-12-25_11h45_58.png">

Step 2. Call the flow <b>{Your Name}_Virtual_Agent_Flow</b>.

<img src="/assets/images/CX/2023-12-25_11h46_25.png">

<h3 id="task-2-2">Task 2. Configured Handled path to extract estimate data for the Analyzer report.</h3>

Step 1. Move the <b>Virtual Agent V2</b> to the flow and connect it with the <b>NewPhoneContact</b> block.

<img src="/assets/images/CX/2023-12-25_11h46_58.png">

Step 2. Click on <b>Virtual Agent V2</b> block and under the block settings select <b>Contact Center AI Config</b> which you created earlier or use the preconfigured <b>Virtual Agent Dan_User1_Virtual_Agent</b>. Also, click <b>Advanced Settings</b> and increase the <b>Termination Delay</b> time from 3 to 5 seconds.

<i>Note: Termination Delay is the time range that must be set to allow completion of the audio prompt from the Virtual Agent in Dialogflow before the contacts move to the Webex Contact Center. For example, if in Dialogflow VA config there is a long response before the call goes to Live agent handoff, it cuts the response not finished and the call moves to the queue.</i>

<img src="/assets/images/CX/2023-12-25_11h47_31.png">

Step 3. <b>(Informational only)</b> Understand how the call-related data is moving from Dialogflow to Webex Contact Center.

When the conversation is transferred from Dialogflow to WxCC, it creates some output variable with data in JSON format which has been generated in the Dialogflow portal while the caller was interacting with the <b>Virtual Agent</b>. One of the output variables is <b>VirtualAgentV2.MetaData</b>. You can see it by clicking anywhere on the grey area in the <b>Flow Builder</b> and scroll down on the right window. This output variable contains the data you specified in the <b>Custom payload</b>.

<img src="/assets/images/CX/2023-12-25_11h48_04.png">

The goal here is to extract the information about how many agents the caller requested for the estimate. In the previous section, you have created the parameter with the name <b>Number_of_Agents</b>.

<img src="/assets/images/CX/2023-12-25_11h48_43.png">

And you configure the <b>Route</b> with <b>Custom payload</b> where once the parameter is filled, the value of the parameter is assigned to the key <b>Estimate_Agents_Count</b> and then the call is moved to WxCC side.

<img src="/assets/images/CX/2023-12-25_11h49_14.png">

Step 4. Configure <b>Virtual Agent Handled</b> path to extract the estimate data and associate it with <b>Global Variable</b>. By parsing JSON data from the <b>VirtualAgentV2_MetaData</b> variable you can extract the value of the <b>Number_of_Agents</b> parameter value and assign it to the new variable on the WxCC environment. You also want the variable to be reportable, so you need to use a <b>Global Variable</b>. While in WxCC flow builder, cick anywhere on the grey area, and on the right window click on <b>Add Global Variable</b>.

<img src="/assets/images/CX/2023-12-25_11h49_48.png">

The <b>Global Variable Estimate_Number_of_Agents</b> needs to be created earlier in the WxCC Admin Portal. Then you just need to select it and click Add. This makes this <b>Global Variable</b> available for you to use in your flow. 

<img src="/assets/images/CX/2023-12-25_11h50_19.png">

Step 5. Add the <b>Parse</b> node. In the <b>Parse</b> node select <b>VirtualAgentV2.MetaData</b> as the <b>Input Variable</b>, select from the list the <b>Global Variable</b> you added to the flow in the previous step as the <b>Output Variable</b>, and use this next string to parse the JSON data <b>$.Params.Estimate_Agents_Count</b>.

<img src="/assets/images/CX/2023-12-25_11h50_52.png">

Step. 6. Use the <b>Play Message</b> node to validate the result and notify the caller. Add the <b>Play Message</b> node, <b>Enable Text-to-Speech</b> feature, select the TTS connector and choose <b>Output Voice</b> from the list.

<img src="/assets/images/CX/2023-12-25_11h51_27.png">

Step 7. <b>Add Disconnect Contact</b> node. Then click in the <b>Play Message</b> again, and add this Text-to-Speech Message, in the TTS field type, thank you. The estimate request for <b>{{Estimate_Number_of_Agents}}</b>  agents was created, and your team can reach out to you soon with the results.

Delete the <b>Audio File</b> option and publish the flow.

<img src="/assets/images/CX/2023-12-25_11h51_58.png">

<h3 id="task-3-2">Task 3. Configured Escalated to move the call to the appropriate Queue with live agents.</h3>

Step 1. Create Flow variable and name it <b>Queue_Routing</b>.

<img src="/assets/images/CX/2023-12-25_11h52_40.png">

Step 2. Add the <b>Parse</b> node and configure it to assign the value of the <b>Type_Of_Agent</b> variable from Dialogflow to the <b>Queue_Routing</b> flow variable.

<img src="/assets/images/CX/2023-12-25_11h53_14.png">

Step 3 Add the <b>Case</b> node and configure it with the variable <b>Queue_Routing</b>. In the link, Description configure values <b>TAC</b> and <b>Sales</b> as these are two values you move from the <b>Dialogflow</b> portal.

<img src="/assets/images/CX/2023-12-25_11h53_44.png">

Step 4. Add <b>Play Message</b> nodes to verify the call goes to the TAC queue. Configure the <b>Play Message</b> node with TTS and type the text similar to this, Thank ou for waiting. The TAC engineer can be with you shortly.

<img src="/assets/images/CX/2023-12-25_11h54_25.png">

Step 5. Do the same for the <b>Sales</b> queue. Let the caller know that the call can be connected to the <b>Sales</b> agent shortly.

<img src="/assets/images/CX/2023-12-25_11h55_03.png">

Step 6. Add <b>Queue</b> Contact block and configure it with the <b>TAC_Queue</b>.

<img src="/assets/images/CX/2023-12-25_11h55_36.png">

Step 7. Add additional <b>Queue Contact</b> and configure it with the <b>Sales_Queue</b>.

<img src="/assets/images/CX/2023-12-25_12h01_53.png">

Step 8. Point <b>Default</b> output on the Case node to the <b>Play Message</b> related to the <b>Sales Queue</b>. Validate and click <b>Publish the Flow</b>.

<img src="/assets/images/CX/2023-12-25_12h02_38.png">

<h3 id="task-4-2">Task 4. Add the flow to you Entry Point.</h3>

Step 1. Go to <b>Entry Points</b> and select your <b>Entry Point</b>. Click on three dots to edit the <b>Entry Point</b>.

<img src="/assets/images/CX/2023-12-25_12h03_13.png">

Step 2. Select the flow and other required fields and save the <b>Entry Point</b>.

<img src="/assets/images/CX/2023-12-25_12h03_52.png">

Step 3. Configure Entry Point mapping for your <b>Entry Point</b>.

<img src="/assets/images/CX/2023-12-25_12h04_54.png">

<h3 id="task-5-1">Task 5. Test your configurations.</h3>

After all these configurations are completed, call the DN related to your Entry Point and test the integration.







---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

#

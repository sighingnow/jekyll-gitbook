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

## <h1>Table of Contents</h1>

<ul>
  <li><a href="#introduction">Introduction to Webex Contact Center with Dialogflow CX
</a></li>
  <li><a href="#addresses-and-credentials"Addresses and Credentials</a></li>
  <li><a href="#introduction-to-webex-contact-center-with-google-ccai">Introduction to Webex Contact Center with Google CCAI</a>
    <ul>
      <li><a href="#provisioning">Provisioning</a></li>
      <li><a href="#objectives">Objectives</a></li>
      <li><a href="#introduction-to-provisioning">Introduction to Provisioning</a>
        <ul>
          <li><a href="#create-dialogflow-cx-virtual-agent">Create Dialogflow CX Virtual Agent</a></li>
          <li><a href="#objectives-1">Objectives</a></li>
          <li><a href="#task-1">Task 1. Create new Virtual Agent</a></li>
          <li><a href="#task-2">Task 2. Assign the agent that you created for the Conversational profile.</a></li>
          <li><a href="#task-3">Task 3. Configure Google Contact Center AI connector</a></li>
          <li><a href="#task-4">Task 4. Create Contact Center AI config</a></li>
          <li><a href="#configure-dialogflow-cx-virtual-agent">Configure Dialogflow CX Virtual Agent</a></li>
          <li><a href="#objectives-2">Objectives</a></li>
          <li><a href="#task-1-1">Task 1. Navigate to Dialogflow CX Agent flow builder and customize the initial greeting.</a></li>
          <li><a href="#task-2-1">Task 2. Create new page to collect the caller name</a></li>
          <li><a href="#task-3-1">Task 3. Create new page Agent_or_Estimate and connect it with the Caller_Name page.</a></li>
          <li><a href="#task-4-1">Task 4. Configure Route in Agent_or_Estimate page to move the call to new page What_Kind_Of_Agent.</a></li>
          <li><a href="#task-5">Task 5. Configure Route for Estimate branch and Connect Agent_or_Estimate to new page Estimate_Details.</a></li>
          <li><a href="#task-6">Task 6. Configure Estimate_Details page with Parameters and Route</a></li>
          <li><a href="#task-7">Task 7. Configure Estimate_Details page with Routes.</a></li>
          <li><a href="#configure-flow-with-virtual-agent-in-webex-contact-center-management-portal">Configure Flow with Virtual Agent in Webex Contact Center Management Portal</a></li>
          <li><a href="#objectives-3">Objectives</a></li>
          <li><a href="#task-1-2">Task 1. Create new flow.</a></li>
          <li><a href="#task-2-2">Task 2. Configured Handled path to extract estimate data for the Analyzer report.</a></li>
          <li><a href="#task-3-2">Task 3. Configured Escalated to move the call to the appropriate Queue with live agents.</a></li>
          <li><a href="#task-4-2">Task 4. Add the flow to you Entry Point.</a></li>
          <li><a href="#task-5-1">Task 5. Test your configurations.</a></li>
        </ul>
      </li>
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

## Configure Dialogflow CX Virtual Agent

<h2>Configure Dialogflow CX Virtual Agent</h2>
<h2>&nbsp;</h2>
<h3>Objectives</h3>
<p>This section describes how to configure the <strong>Virtual Agent</strong>&nbsp;to have a conversation with a caller and decide whether to send the call directly to the queue with human agents or collect estimate information and send the data to the <strong>Analyzer</strong> report.</p>
<p>&nbsp;</p>
<p>In the next screenshot, you can see a functional diagram of the flow for this section.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="468" alt="2023-12-27_10h47_01.png" align="inline" id="412033i05B86D59E02D9E25" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 1.&nbsp; Navigate to Dialogflow CX Agent flow builder and customize the initial greeting.</h3>
<p>&nbsp;</p>
<p>Step 1. Log in to <a href="https://dialogflow.cloud.google.com/cx%20" target="_blank" rel="noopener">Dialogflow CX</a> portal&nbsp;using your user account and password. Select project <strong>CL2024AMS</strong>.</p>
<p>&nbsp;</p>
<p>Step 2. Select the&nbsp;<strong>Virtual Agent</strong>&nbsp;that you created earlier.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="417" alt="2023-12-23_22h38_41.png" align="inline" id="411724iB83358A9053ACE9F" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 3. In the Dialogflow CX builder click on the Start page.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: In Dialogflow CX, a page is a set of instructions that holds one or more related conversational turns. It represents a single step in a conversation flow, and it can contain various types of content, including text responses, prompts for user input, fulfillment actions, and more. Pages are connected together to create a conversation flow that guides the user through a conversation with the Dialogflow CX agent.</p>
</div>
</div>
<p>&nbsp;</p>
<p><em>&nbsp;</em></p>
<p><em><li-image width="999" height="349" alt="2023-12-23_22h39_19.png" align="inline" id="411725i2CCA2B0C7CBD9CAC" size="large" sourceType="new"></li-image></em></p>
<p>&nbsp;</p>
<p>Step 4. In the <strong>Start</strong> page click on <strong>Default Welcome Intent Route</strong>. On the right window, scroll down, delete all the default Agent responses, and click on the field to <strong>Enter</strong> agent dialog.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: A route is a mapping between an intent and a specific page or flow within a conversation. Routes define how a conversation can flow based on the user input and the intent that is matched.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><li-image width="999" height="480" alt="2023-12-23_22h40_10.png" align="inline" id="411726iC3DFBD31AD442F0A" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 5. Provide your customized message to let the caller know that they reached an organization that provides sales services of Webex Contact Center. You can type something like: Hello! Thank you for calling. Here you know all about Webex Contact Center. In Dialogflow CX, the changes are not saved automatically, so you need to save the page every time you make a change.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: Agent responses are the messages or actions that an agent sends back to the user or caller during a conversation. When a user or caller sends a message or makes a request to a Dialogflow CX agent, the agent analyses the input and determines the appropriate response to send back.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><em>&nbsp;<li-image width="999" height="441" alt="2023-12-23_22h40_56.png" align="inline" id="411727iB1E31B9BE6C39FAE" size="large" sourceType="new"></li-image></em></p>
<p>&nbsp;</p>
<p>Step 6. Test the agent response that you just created. Click <strong>Test Agent</strong> and type a greeting message such as Hello.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="483" alt="2023-12-23_22h44_11.png" align="inline" id="411728i329817EE749F3B78" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 2.&nbsp; Create new page to collect the caller name</h3>
<p>&nbsp;</p>
<p>Step 1. Close the <strong>Start</strong> page and <strong>Test Agent</strong> windows and click the plus icon (<strong>+</strong>)&nbsp;to create a new page. Name the page <strong>Caller_Name</strong> and confirm the creation.</p>
<p><li-image width="999" height="498" alt="2023-12-23_22h46_25.png" align="inline" id="411729iBE246BA3A276390E" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Connect the <strong>Start</strong> page and <strong>Caller_Name</strong> page. For this, click the <strong>Default Welcome Intent</strong> route on the <strong>Start</strong> page. Scroll down on the right side and select that you would like the conversation to go to the next page.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="453" alt="2023-12-23_22h47_09.png" align="inline" id="411730iE4E3AD14ECC17C87" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 3. From the drop-down list, select <strong>Caller_Name</strong> page. Do not forget to <strong>Save</strong> the change.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="440" alt="2023-12-23_22h47_44.png" align="inline" id="411731i3F53A5CDF59C6C93" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 4. Configure the <strong>Caller_Name</strong> page to collect the name from the caller and store it in the parameter. In the <strong>Caller_Name</strong> page click <strong>Entry Fulfillment</strong> and type message in which you ask the caller name. Click <strong>Add</strong> and <strong>Save</strong> the change.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: <strong>Entry Fulfillment</strong> is needed to provide a message to the caller once the call is moved to a new page to let the caller know where they are in the conversation and set the right expectations.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><li-image width="999" height="492" alt="2023-12-23_22h48_24.png" align="inline" id="411732i0925818D39ADF19F" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 5. While on the <strong>Caller_Name</strong> page, click on <strong>Parameters</strong>, type <strong>Name</strong> as the parameter&rsquo;s name, select <strong><code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;">sys.any </code></strong>&nbsp;from the list of preconfigured Entities, and click on <strong>Save</strong>.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: A <strong>Parameter</strong> is a named entity or value that is extracted from user input during a conversation. Parameters can be used to store information that is relevant to the user request, such as their name, date of birth, or preferred language. Parameters can also be used to pass data to other parts of your application such as Contact Center.</p>
</div>
</div>
<p>&nbsp;</p>
<p><em>&nbsp;</em></p>
<p><li-image width="999" height="452" alt="2023-12-23_22h49_33.png" align="inline" id="411733i62D45BCA81A98FAF" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 6. Configure <strong>Routes</strong> in the <strong>Caller_Name</strong> page. Click <strong>Route</strong>, on the right window scroll down to <strong>Condition</strong> and set the condition <strong><code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;">$page.params.status ="FINAL"</code></strong>. Click <strong>Save</strong>. By setting this condition, you can expect the call to move to the next page once the <strong>Name</strong> parameter which you created in the previous step is filled with a value. For example, if the caller says Nick then the call can move forward.&nbsp;</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: A <strong>Condition</strong> in the Dialogflow Routes configuration is a rule or set of rules that define when the route must be triggered. The <strong>Condition</strong> can be based on various factors such as user input, context, parameters, and session data.</p>
</div>
</div>
<p>&nbsp;</p>
<p><li-image width="999" height="467" alt="2023-12-23_22h50_16.png" align="inline" id="411734i9625E1278A5DAFE7" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 7. Using the <strong>Test Agent</strong> option on the right top side, test if the flow is working as designed at this point.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="475" alt="2023-12-23_22h51_16.png" align="inline" id="411735i97B590577FCE5A22" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 3.&nbsp; Create new page Agent_or_Estimate and connect it with the Caller_Name page.</h3>
<p>&nbsp;</p>
<p>Step 1. On the left bottom side, click to add a new page, name it <strong>Agent_or_Estimate</strong>, and confirm the creation.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="439" alt="2023-12-23_22h52_03.png" align="inline" id="411736iB1F5674B6D64FBA0" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Connect <strong>Caller_Name</strong> and <strong>Agent_or_Estimate</strong> pages. Open the <strong>Caller_Name</strong> page, and select the route that you created in the previous step, on the right side scroll down and select the page <strong>Agent_or_Estimate</strong>. Do not forget to <strong>Save</strong> the change.</p>
<p>Remember in Task 2 of this section you configured the condition that once the parameter is filled it triggers an action. By selecting the next page you specify what action it is, in this example the call moves to the page <strong>Agent_or_Estimate</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="495" alt="2023-12-23_22h52_45.png" align="inline" id="411737i0FC253A486CD7927" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 3. Configure <strong>Entry Fulfillment</strong> for <strong>Agent_or_Estimate</strong> page. Open up <strong>Agent_or_Estimate</strong> page, and click <strong>Entry Fulfillment</strong>. In the Agent response type: Hi $session.params.Name, please let me know if you would like to speak with an agent or if you would to create an estimate?</p>
<p>&nbsp;</p>
<p>Do not forget to <strong>Save</strong> the change.</p>
<p>&nbsp;</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: If you cannot copy and paste the suggested fulfillment just start typing in the <strong>Agent Response</strong> field, then you can paste the text, then delete unnecessary text.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><li-image width="999" height="479" alt="2023-12-23_22h54_20.png" align="inline" id="411738i8A72604F2D2292CF" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 4. Test if the conversation flow is configured properly at this point. Click <strong>Test Agent</strong> and in the <strong>Talk to Agent</strong> field type Hello and then type your name.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="483" alt="2023-12-23_22h55_05.png" align="inline" id="411739i37AD9A4004A7AC4B" size="large" sourceType="new"></li-image></p>
<div id="tinyMceEditormdanylch_32" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<h3>Task 4.&nbsp; Configure Route in Agent_or_Estimate page to move the call to new page What_Kind_Of_Agent.</h3>
<p>&nbsp;</p>
<p>Step 1. Open up the <strong>Agent_or_Estimate</strong> page, click on <strong>Create New Route</strong>, and then click on <strong>Create New Intent</strong>.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: An intent is a mapping between what a user says or types and a specific action or response that the conversational agent can take. Intents help the agent understand the user request and determine the appropriate response or action to take.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div id="tinyMceEditormdanylch_33" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p><li-image width="999" height="484" alt="2023-12-23_22h55_56.png" align="inline" id="411740i7618C5D9EC1A8E3E" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Name the <strong>Intent Agent_intent</strong>. Provide 3-5 training phrases, something like agent, representative, escalate, real person. Do not forget to save the change of the page.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="480" alt="2023-12-23_22h56_39.png" align="inline" id="411741iEC1970EC37637A68" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 3. Create new page and name it&nbsp;<strong>What_Kind_Of_Agent</strong> .</p>
<p>&nbsp;</p>
<p><li-image width="999" height="497" alt="2023-12-23_22h57_12.png" align="inline" id="411742i01AE3BC80DF707FD" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 4. Click on <strong>Agent_or_Estimate</strong> page. Add a new <strong>Route</strong>, select the <strong>Intent</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="444" alt="2023-12-23_22h57_50.png" align="inline" id="411743i6430A7C4CDF9F3EB" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 5. On the <strong>Routes</strong> settings scroll down and select action to move the call to the page&nbsp;<strong>What_Kind_Of_Agent&nbsp;</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="459" alt="2023-12-23_22h58_23.png" align="inline" id="411744i650CEE5583C83E61" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 6. For a better communication experience you need to add no-input-default <strong>Event handlers</strong>&nbsp;otherwise the system detects no input even before you have a chance to provide input. While on the <strong>Agent_or_Estimate</strong> page, click on <strong>Add state handler</strong>, select <strong>Event handlers</strong>, and click on <strong>Apply</strong>.</p>
<p>&nbsp;</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: An <strong>Event handlers</strong> is a type of intent that is triggered when a specific event occurs. For example, if the <strong>Virtual Agent</strong> does not&nbsp;receive any input or it does not&nbsp;recognize the input, the event handler is used to trigger no-input intent which helps to continue the conversation.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><em>&nbsp;<li-image width="999" height="416" alt="2023-12-23_22h58_57.png" align="inline" id="411745i5037142FBA6702C3" size="large" sourceType="new"></li-image></em></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 7. Click on <strong>Add New Event handlers</strong>, select from the <strong>No-input default</strong> list and save the change.</p>
<p><li-image width="999" height="472" alt="2023-12-23_22h59_34.png" align="inline" id="411746iCD0EAFF062D41611" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3>Task 5.&nbsp; Configure Route for Estimate branch and Connect Agent_or_Estimate to new page Estimate_Details</h3>
<p>&nbsp;</p>
<p>Step 1. Create <strong>Estimate_Intent</strong>. While on <strong>Agent_or_Estimate</strong> page click the plus icon (<strong>+</strong>) to add new <strong>Route</strong> and create new <strong>Intent</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="465" alt="2023-12-23_23h00_31.png" align="inline" id="411747i1DE58EAF0A88EFB4" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Name the intent as <strong>Estimate_Intent</strong> and provide some training phrases. As for the training phrases you can add statements like estimate, price calculation, I need to know how much it cost. Save the intent.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="448" alt="2023-12-23_23h01_08.png" align="inline" id="411748i8198846F350B45AE" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 3. Create new page with the name <strong>Estimate_Details</strong>. Connect <strong>Agent_or_Estimate</strong> and <strong>Estimate_Details</strong> pages when <strong>Estimate_Intent</strong> is triggered.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="420" alt="2023-12-23_23h01_43.png" align="inline" id="411749i75DB8BF92FB166C4" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 4. Click the <strong>Agent_or_Estimate</strong> page. Add new <strong>Route</strong>, and select the <strong>Intent Estimate_Intent </strong>.</p>
<p>&nbsp;</p>
<p><li-image width="200" height="200" alt="2023-12-23_23h02_22.png" align="inline" id="411750i9B020C3EE6B94A70" size="small" resized="false" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 5. Scroll a bit down and add the agent response that the caller hears once the <strong>Estimate_Intent</strong> is triggered. You can type something like, let me collect some information for the estimate.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="473" alt="2023-12-23_23h03_07.png" align="inline" id="411751iD25B49DF3F8C6DE8" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 6. Scroll all the way down and select the transaction to the page <strong>Estimate_Details</strong> once the intent is triggered. Save the page configuration.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="460" alt="2023-12-23_23h03_39.png" align="inline" id="411752i0984DDE10D26D591" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 6.&nbsp; Configure Estimate_Details page with Parameters and Route</h3>
<p>&nbsp;</p>
<p>Step 1. Similar to how you created the <strong>Parameter</strong> for the caller name, create the <strong>Parameter</strong> for the number of agents which the caller needs the estimate for. Click on the <strong>Estimate_Details</strong> page, add the <strong>Parameter</strong>, name it <strong>Number_of_agents</strong>, and select from the list the standard <strong>Entity</strong> type <strong><code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;">sys.number</code></strong>&nbsp;. Do not forget to save the change.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="428" alt="2023-12-23_23h04_25.png" align="inline" id="411753iC7181FA3BC69FABD" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Configure the <strong>Entry Fulfillment</strong> for the caller to understand what information the <strong>Virtual Agent</strong> is looking for. You can type something like, please let me know how many agents you are planning to have in your Contact Center.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: If you cannot copy and paste the suggested fulfillment just start typing in the <strong>Agent Responses</strong> field, then you can paste the text, then delete unnecessary text.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><li-image width="999" height="423" alt="2023-12-23_23h04_55.png" align="inline" id="411754i201C3BDFDCB35521" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<div id="tinyMceEditormdanylch_47" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 3. Select the condition which triggers the action on the <strong>Estimate_Details</strong> page. While on the <strong>Estimate_details</strong> page, click on add new <strong>Route</strong>, on the right window scroll down a bit and configure the condition <code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;"><strong>$page.params.status =&ldquo;FINAL&rdquo;</strong></code>&nbsp;.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="478" alt="2023-12-23_23h05_26.png" align="inline" id="411755i59D773D301673D6B" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 4. Scroll more down and add the <strong>Virtual Agent</strong> response. Type: I am putting together the estimate request details for <code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;"><strong>$session.params.Number_of_agents</strong></code>&nbsp; agents.</p>
<div id="tinyMceEditormdanylch_49" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p><li-image width="999" height="469" alt="2023-12-23_23h06_08.png" align="inline" id="411756i24863FDCC0C0D372" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 5. Add dialogue option and select <strong>Custom payload</strong> from the list.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="429" alt="2023-12-25_11h32_46.png" align="inline" id="411828i0211915BE1D2075A" size="large" sourceType="new"></li-image></p>
<div id="tinyMceEditormdanylch_50" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p>&nbsp;</p>
<p>Post this next syntax to the <strong>Custom</strong> <strong>payload</strong> section and save the configurations.</p>
<pre>{<br /><br />&nbsp; "Execute_Request": {<br /><br />&nbsp;&nbsp;&nbsp; "Data": {<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Params": {<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Estimate_Agents_Count": "$session.params.Number_of_agents"<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br /><br />&nbsp;&nbsp;&nbsp; }<br /><br />&nbsp; }<br /><br />}</pre>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: In JSON data format, a variable is a key-value pair that represents a property of an object. The key is a string that identifies the property, and the value is the data associated with the property.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>The&nbsp;<strong>Custom payload</strong> contains the key <strong>Estimate_Agents_Count</strong> and the value is the <strong>Parameter</strong> <code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;"><strong>$session.params.Number_of_agents</strong></code>. This <strong>Parameter</strong> is changed depending on the caller response.</p>
<p><li-image width="999" height="437" alt="2023-12-25_11h34_03.png" align="inline" id="411829i3AA66168F986A61A" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 6. Scroll more down on the <strong>Route</strong> section and set up <strong>Transition</strong> to <strong>End Flow</strong>.</p>
<div id="tinyMceEditormdanylch_52" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p><li-image width="999" height="490" alt="2023-12-25_11h34_59.png" align="inline" id="411830i771B49CA78A3CBA0" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>It terminates the session on the Dialogflow side and transfers the call to WxCC where it continues from the&nbsp;<strong>Virtual Agent Handled</strong> path. <br /><br /></p>
<p><li-image width="999" height="638" alt="2023-12-25_11h35_26.png" align="inline" id="411831iBDA90D96C08E1370" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 7. Test your <strong>Virtual Agent</strong> flow at this point.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="489" alt="2023-12-25_11h35_51.png" align="inline" id="411832i73D6BAAF9911099A" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 7. Configure Estimate_Details page with Routes.</h3>
<p>&nbsp;</p>
<p>Step 1. Create two additional intents,&nbsp;<strong>TAC_Intent</strong> and <strong>Sales_Intent</strong>. Click on <strong>Manage</strong>, select Intents from the <strong>Resources</strong> list, and then click on <strong>Create</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="518" alt="2023-12-25_11h36_35.png" align="inline" id="411833i6B4962038C93422E" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Name the intent and provide some training phrases. For example, for <strong>TAC_Intent</strong> you can add the phrases like: TAC Engineer, Technical Support.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="518" alt="2023-12-25_11h37_10.png" align="inline" id="411834iC06D4E5948E1635D" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>For <strong>Sales_Intent</strong> you can specify something like Price, Sales, and so on.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="495" alt="2023-12-25_11h38_06.png" align="inline" id="411835iD4864EBBE1632A16" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Add <strong>Route</strong> for the TAC queue. Go back to the queue and click on the <strong>What_Kind_Of_Agent</strong> page. Then click on <strong>Add New Route</strong> and select the intent you created in the previous step for the TAC queue. Save the route settings.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="485" alt="2023-12-25_11h39_35.png" align="inline" id="411836i3086D60B2E54EE63" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 3. Scroll down and add the agent response that the caller hears once the intent is triggered.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="388" alt="2023-12-25_11h40_34.png" align="inline" id="411837i78A7BA4FF77CF9B4" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 4. Add the dialog option to move the call to the live agent by selecting <strong>Live agent&nbsp;handoff</strong> .</p>
<p>&nbsp;</p>
<p><li-image width="999" height="390" alt="2023-12-25_11h41_16.png" align="inline" id="411838i7282B7E77A405681" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>By selecting this option, the call moves out of the <strong>Escalate</strong> output of the <strong>Virtual Agent V2</strong> block in the flow builder.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="524" alt="2023-12-25_11h41_42.png" align="inline" id="411839iD527127D6B75B860" size="large" sourceType="new"></li-image></p>
<div id="tinyMceEditormdanylch_61" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p>&nbsp;</p>
<p>Step 5. In the <strong>Live agent handoff</strong> payload field, you can add the data in the JSON format which you can later parse in the WxCC flow. In this case, you need to add <strong>Type_Of_Agent (TAC)</strong>. <strong>TAC</strong>&nbsp; which helps you to make the routing decision to the correct queue in the flow.</p>
<pre>{<br /><br />&nbsp; "dialogflow.ccai.live-agent-escalation": {<br /><br />&nbsp;&nbsp;&nbsp; "Type_Of_Agent": "TAC"<br /><br />&nbsp; }<br /><br />}</pre>
<div id="tinyMceEditormdanylch_62" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p><li-image width="999" height="405" alt="2023-12-25_11h42_11.png" align="inline" id="411840i1D1B4BF392FA08D5" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 6. End the flow on the Dialogflow side once the call is moved to the WxCC flow.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="454" alt="2023-12-25_11h42_47.png" align="inline" id="411841iE3C7E3961179F6DA" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 7. Do the same steps to configure the <strong>Route</strong> for the <strong>Sales</strong> queue. Click on <strong>Add New Route</strong>. Select <strong>Sales_Intent</strong> and save the <strong>Route</strong> settings.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="488" alt="2023-12-25_11h43_17.png" align="inline" id="411842i1DE78DA35F145018" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 8. Add the <strong>Agent</strong> response and <strong>Live agent handoff</strong> dialog option.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="434" alt="2023-12-25_11h43_53.png" align="inline" id="411843i475C4F4A6ED9C4B5" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 9. End the flow for this page once the intent is triggered and the call is moved to the WxCC flow.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="417" alt="2023-12-25_11h44_32.png" align="inline" id="411844iA8D39DF30ED4BC32" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Step 10. Add the <strong>Entry Fulfillment</strong> to the <strong>What_Kind_Of_Agent</strong> page so the caller knows what kind of answer the <strong>Virtual Agent</strong> expects. Click on the <strong>Entry Fulfillment</strong> field and type, please let me if you would like to speak with a Technical Support Engineer or you would like to talk about sales.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="405" alt="2023-12-25_11h45_02.png" align="inline" id="411845i807246B353681962" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 11. Test your Virtual Agent.</p>
<p>&nbsp;</p>
<h2>Configure Flow with Virtual Agent in Webex Contact Center Management Portal</h2>
<h1>&nbsp;</h1>
<h3>Objectives</h3>
<p>&nbsp;</p>
<p>In this section, you can see how to build flow in Webex Contact Center Flow Builder with the <strong>Virtual Agent</strong> block which moves the call to queue with live agents or to estimate branch where data about the number of agents for the estimate can be extracted and used for <strong>Analyzer</strong> report.&nbsp;&nbsp;</p>
<p>&nbsp;</p>
<h3>Task 1. Create new flow.</h3>
<p>&nbsp;</p>
<p>Step 1. In the Webex Contact Center Admin portal open up the <strong>Routing Strategy Module</strong> and <strong>Create New Flow</strong> entry window.</p>
<div id="tinyMceEditormdanylch_69" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p><li-image width="999" height="351" alt="2023-12-25_11h45_58.png" align="inline" id="411846i0B402D582FB3DD2B" size="large" sourceType="new"></li-image></p>
<p>Step 2. Call the flow <strong><code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;">{Your Name}_Virtual_Agent_Flow</code></strong>&nbsp;.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="404" alt="2023-12-25_11h46_25.png" align="inline" id="411847i26A9F01ED4EB9143" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3>Task 2. Configured Handled path to extract estimate data for the Analyzer report.</h3>
<p>&nbsp;</p>
<p>Step 1. Move the <strong>Virtual Agent V2</strong> to the flow and connect it with the <strong>NewPhoneContact</strong> block.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="455" alt="2023-12-25_11h46_58.png" align="inline" id="411848i102F130FAF11C803" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Click on <strong>Virtual Agent V2</strong> block and under the block settings select <strong>Contact Center AI Config</strong> which you created earlier or use the preconfigured <strong>Virtual Agent</strong> <strong><code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;">Dan_User1_Virtual_Agent</code>&nbsp;</strong>.&nbsp;Also, click <strong>Advanced Settings</strong> and increase the <strong>Termination Delay</strong> time from 3 to 5 seconds.</p>
<div style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px; margin-top: 20px;"><img style="margin-top: -10px;" class="custom-image-class" src="https://www.cisco.com/c/dam/en/us/td/i/templates/note.gif" border="0" alt="note-icon" />
<div style="margin-left: 38px; margin-top: -25px;">
<p><strong>Note</strong>: <strong>Termination Delay</strong> is the time range that must be set to allow completion of the audio prompt from the <strong>Virtual Agent</strong> in Dialogflow before the contacts move to the Webex Contact Center. For example, if in Dialogflow VA config there is a long response before the call goes to <strong>Live agent handoff</strong>,&nbsp;it cuts the response not finished and the call moves to the queue.</p>
</div>
</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><li-image width="999" height="486" alt="2023-12-25_11h47_31.png" align="inline" id="411849iBD6B578758B3B6C1" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 3. (Informational only) Understand how the call-related data is moving from Dialogflow to Webex Contact Center.</p>
<p>When the conversation is transferred from Dialogflow to WxCC, it creates some output variable with data in JSON format which has been generated in the Dialogflow portal while the caller was interacting with the <strong>Virtual Agent</strong>. One of the output variables is <strong>VirtualAgentV2.MetaData</strong>. You can see it by clicking anywhere on the grey area in the <strong>Flow Builder</strong> and scroll down on the right window. This output variable contains the data you specified in the <strong>Custom payload</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="454" alt="2023-12-25_11h48_04.png" align="inline" id="411850i7B53380879C7100B" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>The goal here is to extract the information about how many agents the caller requested for the estimate. In the previous section, you have created the parameter with the name <strong>Number_of_Agents</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="391" alt="2023-12-25_11h48_43.png" align="inline" id="411851iD2EFF306C42D20F1" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>And you configure the <strong>Route</strong> with <strong>Custom payload</strong> where once the parameter is filled, the value of the parameter is assigned to the key <strong>Estimate_Agents_Count</strong> and then the call is moved to WxCC side.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="441" alt="2023-12-25_11h49_14.png" align="inline" id="411852i68A86E47CB395988" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 4. Configure <strong>Virtual Agent Handled</strong> path to extract the estimate data and associate it with <strong>Global Variable</strong>. By parsing JSON data from the <strong>VirtualAgentV2_MetaData</strong> variable you can extract the value of the <strong>Number_of_Agents</strong> parameter value and assign it to the new variable on the WxCC environment. You also want the variable to be reportable, so you need to use a <strong>Global Variable</strong>. While in WxCC flow builder, cick anywhere on the grey area, and on the right window click on <strong>Add Global Variable</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="450" alt="2023-12-25_11h49_48.png" align="inline" id="411853i864AAAC94D5ECEDD" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>The <strong>Global Variable</strong> <strong>Estimate_Number_of_Agents</strong> needs to be created earlier in the WxCC Admin Portal. Then you just need to select it and click Add. This makes this <strong>Global Variable</strong> available for you to use in your flow.&nbsp;</p>
<p>&nbsp;</p>
<p><li-image width="999" height="492" alt="2023-12-25_11h50_19.png" align="inline" id="411854iDDFE26FAFDBACC78" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 5. Add the <strong>Parse</strong> node. In the <strong>Parse</strong> node select <strong>VirtualAgentV2.MetaData</strong> as the <strong>Input Variable</strong>, select from the list the <strong>Global Variable</strong> you added to the flow in the previous step as the <strong>Output Variable</strong>, and use this next string to parse the JSON data <strong><code class="cCN_CmdName" style="white-space: pre-wrap !important; color: unset !important; border-radius: unset !important; padding: unset !important; font-family: unset !important;">$.Params.Estimate_Agents_Count</code>&nbsp;</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="457" alt="2023-12-25_11h50_52.png" align="inline" id="411855iE9BDDF2A0CCCC17B" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step. 6. Use the <strong>Play Message</strong> node to validate the result and notify the caller. Add the <strong>Play Message</strong> node, <strong>Enable Text-to-Speech</strong> feature, select the TTS connector and choose <strong>Output Voice</strong> from the list.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="442" alt="2023-12-25_11h51_27.png" align="inline" id="411856i0F10D57788529407" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 7. Add <strong>Disconnect Contact</strong> node. Then click in the <strong>Play Message</strong> again, and add this Text-to-Speech Message, in the TTS field type, thank you. The estimate request for <strong>{{Estimate_Number_of_Agents}}</strong>&nbsp; agents was created, and your team can reach out to you soon with the results.</p>
<p>Delete the <strong>Audio File</strong> option and publish the flow.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="495" alt="2023-12-25_11h51_58.png" align="inline" id="411857i7776D0D3DC020F6A" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 3. Configured Escalated to move the call to the appropriate Queue with live agents.</h3>
<p>&nbsp;</p>
<p>Step 1. Create Flow variable and name it <strong>Queue_Routing</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="487" alt="2023-12-25_11h52_40.png" align="inline" id="411858i38F3BD534BBF590C" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 2. Add the <strong>Parse</strong> node and configure it to assign the value of the <strong>Type_Of_Agent</strong> variable from Dialogflow to the <strong>Queue_Routing </strong>flow variable.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="497" alt="2023-12-25_11h53_14.png" align="inline" id="411859i6D38D9D36911C3AE" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 3 Add the <strong>Case</strong> node and configure it with the variable <strong>Queue_Routing</strong>. In the link, Description configure values <strong>TAC</strong> and <strong>Sales</strong> as these are two values you move from the <strong>Dialogflow</strong> portal.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="486" alt="2023-12-25_11h53_44.png" align="inline" id="411860i53913B972CCA8926" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 4. Add <strong>Play Message</strong> nodes to verify the call goes to the TAC queue. Configure the <strong>Play Message</strong> node with TTS and type the text similar to this, Thank ou for waiting. The TAC engineer can be with you shortly.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="494" alt="2023-12-25_11h54_25.png" align="inline" id="411861iAB49CF7F0D3AD2CD" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 5. Do the same for the <strong>Sales</strong> queue. Let the caller know that the call can be connected to the <strong>Sales</strong> agent shortly.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="492" alt="2023-12-25_11h55_03.png" align="inline" id="411862i3CE8FF2C2F372CC9" size="large" sourceType="new"></li-image></p>
<p><br />Step 6. Add <strong>Queue Contact</strong> block and configure it with the <strong>TAC_Queue</strong>.</p>
<p><br /><li-image width="999" height="492" alt="2023-12-25_11h55_36.png" align="inline" id="411863iF8BE76E620D1FC2F" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 7. Add additional <strong>Queue Contact</strong> and configure it with the <strong>Sales_Queue</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="487" alt="2023-12-25_12h01_53.png" align="inline" id="411864iC868519DC2BA6EDB" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 8. Point <strong>Default</strong> output on the <strong>Case</strong> node to the <strong>Play Message</strong> related to the <strong>Sales Queue</strong>. Validate and click <strong>Publish the Flow</strong>.</p>
<p><br /><li-image width="999" height="495" alt="2023-12-25_12h02_38.png" align="inline" id="411865i04FDF8F5C585B870" size="large" sourceType="new"></li-image></p>
<div id="tinyMceEditormdanylch_88" class="mceNonEditable lia-copypaste-placeholder">&nbsp;</div>
<p>&nbsp;</p>
<h3>Task 4. Add the flow to you Entry Point.</h3>
<p>&nbsp;</p>
<p>Step 1. Go to <strong>Entry Points</strong> and select your <strong>Entry Point</strong>. Click on three dots to edit the <strong>Entry Point</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="414" alt="2023-12-25_12h03_13.png" align="inline" id="411866iDC9E61396DC8DF49" size="large" sourceType="new"></li-image></p>
<p><br />Step 2. Select the flow and other required fields and save the <strong>Entry Point</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="459" alt="2023-12-25_12h03_52.png" align="inline" id="411867i318EA898B536B0AF" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<p>Step 3. Configure <strong>Entry Point</strong> mapping for your <strong>Entry Point</strong>.</p>
<p>&nbsp;</p>
<p><li-image width="999" height="435" alt="2023-12-25_12h04_54.png" align="inline" id="411869iBBD77D6684447D89" size="large" sourceType="new"></li-image></p>
<p>&nbsp;</p>
<h3>Task 5. Test your configurations. &nbsp;</h3>
<p>&nbsp;</p>
<p>After all these configurations are completed, call the DN related to your <strong>Entry Point</strong> and test the integration.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h2>Related Information</h2>
<p>&nbsp;</p>
<ul>
<li><a href="https://www.cisco.com/c/en/us/support/index.html?referring_site=bodynav" target="_blank" rel="noopener"><strong>Cisco Technical Support &amp; Downloads</strong></a></li>
</ul>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div id="tecz_2097_autosave" class="2097_autosave" style="display: none;" data-templete_id="ce" data-language_id="en_us">&nbsp;</div>

















---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

#

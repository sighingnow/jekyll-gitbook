---
title: Lab 8 - Webex Experience Management
author: Ankan Dutta & Gagarin Sathiyanarayanan & Niko Theologitis
date: 2022-08-08
layout: post
---

## Overview of the lab: Update all the abreviations

In this Lab, we will go through the tasks that are required to build a Webex Experience Management connecter and use that to send a survey to customers so that they can provide feedback on their interaction with the contact center. Also, we will look at how the agent can get this feedback on their agent desktop to provide appropriate level of service to end customers. This will enhance their customer satisfaction level which will positively impact their business.

# Table of Contents - update to table

-   [Part 1: WxM Connector setup](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#part-1-wxm-connector-setup----not-need-to-complete-it-already-configured)
    -   [1. Identify the API key from WxM](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#1-identify-the-api-key-from-wxm)
    -   [2. Configure WxM connector in Control hub](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#2-configure-wxm-connector-in-control-hub)
-   [Part 3: Enable WxM widgets in Desktop Layout](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#part-3-enable-wxm-widgets-in-desktop-layout)
    -   [1. Enable wxmConfigured flag](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#1-enable-wxmconfigured-flag)
    -   [2. Enable Customer Experience Journey Widget](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#2-enable-customer-experience-journey-widget)
    -   [3. Enable Customer Experience Analytics Widget](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#3-enable-customer-experience-analytics-widget)
    -   [4. Check Widgets in Agent Desktop](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#4-check-widgets-in-agent-desktop)
-   [Part 4: Configure Feedback node in Flow](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#part-4-configure-ivr-feedback-node-in-flow----dont-change-the-logic-of-the-flow)
    -   [1. Configure Feedback Node](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#1-configure-feedback-node)
    -   [2. Test Voice interaction and confirm that voice survey is forwarded to the ANI](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#2-test-voice-interaction-and-confirm-that-voice-survey-is-forwarded-to-the-ani)
    -   [3. Validate that the survey filled by the caller is recorded properly in WxM](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html#3-validate-that-the-survey-filled-by-the-caller-is-recorded-properly-in-wxm)

# Introduction

## Lab Objective

-   **Explore the WxM console** and its features
    
-   Edit the **Desktop Layout for configuring the WxM widget**
    
-   Learn how to configure a **flow for geting feedback**
    

## Pre-requisites

1.  You have **completed Lab 1 - Admin Experience:**
    -   You are familiar with how to create a new user in Control Hub
2.  You have **completed Lab 2 - IVR Contact Routing:**
    -   You are familiar with creating and modifying flows
3.  You have **completed Lab 3 - Agent Desktop:**
    -   You are familiar with editing and updating desktop layout JSON
4.  You have **Webex Calling installed** in your mobile phone and supervisor created in Lab 1 from which you can make calls to the contact center

> **RECOMMENDED**: To have more information and undestanding about the WxM solution, follow this **[online training](https://salesconnect.cisco.com/#/mylearningmap/SC_LMS_1689)** first

## Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com/)**  
> Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal)**  
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com/)**  
> WxM Console: **[https://xm.webex.com](https://xm.webex.com/)** WxM Documentation: **[https://xm.webex.com/docs/webex_cc/pcs_ivr_setup](https://xm.webex.com/docs/webex_cc/pcs_ivr_setup)**

# Lab Section - remove u&p

> Due to limitation with the number of WxM tenants, all the participants will use the same tenant (**Pod29**) for this lab.


**Account** | **Username** | **Password**
--- | --- | ---
WxM admin | wxmdemoadmin | Login@123
Pod29 admin | admin1pod29@email.carehybrid.com | WxCC_ASEAN2021!


## Part 1: WxM Connector setup – Not need to complete it, already configured!

-   **We have configured the WxM Connector for you**.
    
-   You just need to login in Control Hub with Pod29 credentials, navigate to _Services -> Contact Center -> Connectors_ and **check that the WxM Connector is already created**.
    
-   However, we recommend you to **have a look to the video and configuration steps below**, to get an idea of how WxM Connector is configured
    
-   For more details, review the **[WxM Documentation](https://xm.webex.com/docs/webex_cc/pcs_ivr_setup)**
    

> The following video outlines the steps required to create the WxM connector. WxCC uses this connector to read the dispatches that are configured in WxM. This connector is also used to load the widgets into the agent desktop and FeedBack is triggered via the same.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GI4nzVLLFCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 1. Identify the API key from WxM

-   Login to the **[WxM console](https://cx.cloudcherry.com/)**
-   Enter the **WxM admin credentials**
-   Dismiss informative alerts if any
-   In the top-left corner select **_CX Setup_**
-   Open the **_Account Settings_** section and navigate to **_Users_**
-   In the table, look for the **username with _`system`_** as a suffix in the username
    
    > **Note**: Webex XM automatically creates ‘Machine sub-users’ in the account to be used to integrate with any platform
    
-   Copy the username and the **API Key**
-   If the API key is not present, click on **Create** and then copy the key.

### 2. Configure WxM connector in Control hub

-   Login to [Control Hub](https://admin.webex.com/)
-   Enter the Customer admin email id and the password.
-   Navigate to **_Contact Center_** Card
-   Click on **_Connectors_**
-   Click on **Set Up** on Webex Experience Management card.
-   Provide a unique identifier in the Name text area
-   Provide the **WxM username** (copied above which has _`system`_ as a suffix)
-   Paste the **API Key** (copied above)
-   Click on **Save** and then **Close**.



## Part 2: Enable WxM widgets in Desktop Layout

> The following video shows how the Agent Desktop Layout JSON has to be modified with the appropriate values of the WxM dashboard, so that they are loaded into the widgets. The Space ID and the Metrics ID extracted from WxM decide which widget will be loaded for the agent. This lab section assumes that you are familiar with how the agent desktop layout can be modified and applied to a team.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Njie8PrB6Kk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 1. Enable wxmConfigured flag

-   **Download the current desktop default layout** of the team used by the newly created Agent.
-   Edit the JSON file in an editor and search for the key **_wxmConfigured_**.
-   If not changed already, change the value to **True**

### 2. Enable Customer Experience Journey Widget

-   Login to the **[WxM console](https://cx.cloudcherry.com/)** with the WxM admin credentials
-   Enter the **WxM admin credentials**.
-   Dismiss informative alerts if any.
-   Navigate to the **Overall Experience** response page.
-   Click the Vertical Ellipsis on the right side of the screen and **Export To Cisco Contact Center**
-   From the information pane, **copy the Space Id** and update this in the **Customer Experience Journey section** of the layout JSON.
-   Since Customer Experience Journey, does not have metricsId **you can use the space Id copied here as the metrics Id**. Else you can copy the metrics Id of Customer Experience Analytics and paste it here (which you will get in the below steps)

### 3. Enable Customer Experience Analytics Widget

-   Navigate to the **Agent Dashboard** page.
-   Make sure you have **Customer Experience Analytics** selected under **Metrics** tab top-left corner
-   Click the Vertical Ellipsis on the right side of the screen and **Export To Cisco Contact Center**
-   From the information pane, copy the **Space Id** and update this in the **Customer Experience Analytics section** of the layout JSON.
-   From the information pane, copy the **Metrics Id** and update this in the **Customer Experience Analytics section** of the layout JSON.
-   Save this JSON file and **upload** it in the appropriate layout used by the Test Agents Team.
-   Now if you login as an agent and test Voice interactions, you will be able to access both the Customer Experience Analytics widget and Customer Experience Journey widget.

### 4. Check Widgets in Agent Desktop

-   Login in the **[Agent Desktop](https://desktop.wxcc-us1.cisco.com/)** with the recently created agent credentials
-   Confirm that the **WxM widgets are visible on Agent Desktop.**

## Part 3: Configure Feedback node in Flow – Don’t change the logic of the flow!

-   **We have created the Flow and configured the Feedback node for you.**
    
-   Login in the Tenant Portal, navigate to Routing Strategies and open the **`WxM_Feedback_Flow`** to see how the Flow Diagram is buit. **DO NOT change the logic of the flow**, since the pod is shared with all partners
    
-   You can also **see the video and the Configure Feedback Node section** to know the configuration steps needed.
    
-   **THE VIDEO EXPLAINS HOW TO CONFIGURE EMAIL/SMS FEEFBACK. For IVR Feedback configuration, follow the steps written below.**
    

> The video does a quick demo on how the Feedback node should be implemented such that the caller receives an email with the survey link after completion of the call. The same steps can be followed to trigger an SMS with the survey link to the call ANI.

<iframe width="560" height="315" src="https://www.youtube.com/embed/qGW6lRI7AA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### 1. Configure IVR Feedback Node

-   Login to portal with admin credential and navigate to **`Routing Strategy`**
-   Click on **`Flows` and open the WxM_Feedback_Flow**
-   Create **2 custom variables** and hardcode values that will be used as **Customer ID and Email**.
-   Under Main flow, ensure that a **`Global_FeedbackSurveyOptin`** variable is given **`TRUE`** value either by menu choice or prompt for customer to opt-in.
-   Navigate to **`Event Flows` and Drag the Feedback V2** note from the library on the left and **connect it the AgentDisconnected event**
-   Within the Feedback V2 settings on the right-hand side, select the **Survey Method as Voice based, and choose the survey named “Contact Center IVR Feedback”**
-   Under the Set Language button, **select English (US)** from the drop-down.
-   From the drop-down select appropriate values for **`Customer ID` (custom variable), `Email` (custom variable) and `Phone Number` (NewPhoneContact.ANI)**
-   **Validate the flow and publish it.**

### 2. Test Voice interaction and confirm that voice survey is forwarded to the ANI

-   Login in the **[Agent Desktop](https://desktop.wxcc-us1.cisco.com/)** with the recently created agent credentials
-   **Trigger a voice call** from the Webex Calling app to the Dial Number mapped to the Entry Point: **`+14402308308`**
-   End the call **from the Agent Desktop and select a Wrap-Up option**
-   A **voice surver should be played** in the caller user phone
-   Complete the voice survey **dialing a number** in the Webex Calling app from where you made the call
-   After testing the call interaction **move the Agent to non-Available status**, so the rest of attendees can also complete this task

### 3. Validate that the survey filled by the caller is recorded properly in WxM

-   Login to the **[WxM console](https://cx.cloudcherry.com/)**
-   Enter the **WxM admin credentials.**
-   Navigate to the **`Overall Experience`** dashboard and ensure that the feedback you provided is recorded


## Part 4: XM v2
- We announced on October 14th, 2022, the End of Sale of WXM V1 Standalone and End of Life WXM V1 Standalone will be on November 14th, 2024.
- We are currently working on the next version, Webex Experience Management v2, which will be directly integrated into WxCC and WxCCE to provide improved abilities to collect explicit/implicit feedback and data, store and visualize customer feedback data through surveys over various channels and displays information in user friendly dashboards.
- XM v2 will be available in the next 3-5 months tentatively.
- Here is a preview of how XM v2 could look and function, this is an example of Post Interaction Surveys using Digital channels of Webex Connect. **Disclaimer: The look and feel, and even certain functionalities, at the time of release, may differ from what is shown in this short preview, as the feature is still under development.

<iframe src="https://app.vidcast.io/share/embed/eafc4ea3-e5a2-4075-a83c-29da713631c3" width="560" height="350" title="Post Interaction Surveys using Digital Channels" frameborder="0" loading="lazy" allowfullscreen ></iframe>

---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

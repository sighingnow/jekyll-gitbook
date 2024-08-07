---
title: Lab 8 - Feedback and Journey
author: Ankan Dutta & Gagarin Sathiyanarayanan
date: 2022-08-08
layout: post
---

```
Last modified: Tue, 6 Aug 2024
```

## Table of Contents

| Topic                                                                                                                  | Lab Type           | Difficulty Level | Estimated length |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | ---------------- |
| [Introduction to Experience Management](#introduction-to-experience-management-post-interaction-and-post-call-surveys) | Watch & Understand | EASY             | 7 min            |
| [Configure Post Call IVR Survey](#configure-post-call-ivr-survey)                                                      | Practical Lab      | EASY             | 10 min           |
| [Configure Post Interaction Digital Survey](#configure-post-interaction-digital-survey)                                | Practical Lab      | EASY             | 10 min           |
| [Customer Journey Data Services (JDS) Introduction](#customer-journey-data-services-cjds)                              | Watch & Understand | EASY             | N/A              |
| [JDS Feature Overview](#jds-feature-overview)                                                                          | Watch & Understand | EASY             | 10 min           |
| [Setup JDS](#setup-jds)                                                                                                | Watch & Understand | EASY             | N/A              |
| [Desktop Customer Journey Widget](#desktop-customer-journey-widget)                                                    | Watch & Understand | EASY             | N/A              |
| [JDS APIs](#jds-apis)                                                                                                  | Practical Lab      | MEDIUM           | 40 min           |
| [JDS Use Case Samples](#jds-use-case-samples)                                                                          | Practical Lab      | MEDIUM           | 60 min           |

## Overview of the lab:

In this lab, we will configure all the required elements to collect and view end-customer feedback using the new Experience Management.

### Lab Objective

- Create a basic survey
- Upload audio files to the survey
- Configure the survey in flow designer
- Simulate a customer interaction with survey feedback
- Download and verify survey feedback

  ***

### Pre-requisites

1.  You have **completed Lab 1 - Admin Experience:**
    - You are familiar with Control Hub and navigation within Control Hub
2.  You have **completed Lab 2 - IVR Contact Routing:**
    - You are familiar with creating and modifying flows
3.  You have **completed Lab 3 - Agent Desktop:**
    - You are familiar with logging in as an Agent and accepting inbound interactions
4.  You have **Webex Calling installed** in your mobile phone and supervisor created in Lab 1 from which you can make calls to the contact center

    ***

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\

---

## Introduction

# Introduction to Experience Management Post Interaction and Post Call Surveys

> Experience Management is a next-gen tool that facilitates post interaction surveys and outcomes. It allows you to track and measure customer satisfaction using anchor metrics like Net Promoter Score (NPS), Customer Effort Score (CES), and Customer Satisfaction (CSAT). Webex Contact Center brings in an integration of Experience Management for its post call survey interactive voice response (PCS IVR) and digital channels.

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/0049a028-85b6-4b56-90f7-1fc696201ea3" width="100%" height="100%" title="Introduction to Experience Management" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

## Lab Section

# Configure Post Call IVR Survey

### Create a survey

1. Click on Contact Center under Services from Control Hub
   > <img src="/assets/images/EM/contactCenter.gif" width="200">
2. Under Contact Center, click on Surveys
   > <img src="/assets/images/EM/survey.gif" width="200">
3. Click the "Create new survey" button on the top-right corner of the Survey page
   > Select Survey type as IVR
   >
   > > <img src="/assets/images/EM/surveyType.gif">
   > >
   > > Provide a name for your survey appended with your Attendee ID
   > > <img src="/assets/images/EM/surveyName.gif">
   > >
   > > Choose the additional languages for the survey from the drop-down (optional)
   > > <img src="/assets/images/EM/languageSupport.png">
   > >
   > > Click on Next
4. Add audio files to the Welcome and Thank you notes ([Audio Files](https://webexcc.github.io/assets/files/Survey_wav.zip){:target="\_blank"})
   > Click on the pencil icon to the right
   >
   > >  <img src="/assets/images/EM/welcomeThankyou.gif">
   > >
   > > Select Choose a file when the note expands, pick the audio file (Welcome.wav) and upload
   > > <img src="/assets/images/EM/uploadWelcome.gif">
   > >
   > > Repeat steps for Thank you note (Thankyou.wav)
5. Add a question to your survey
   > Select the NPS question from the drop-down by clicking + Add a question
   >
   > > <img src="/assets/images/EM/addNPS.gif" width="200">
   > >
   > > Choose the corresponding audio file, nps.wav for the NPS question and upload ([Audio Files](https://webexcc.github.io/assets/files/Survey_wav.zip){:target="\_blank"})
   > > <img src="/assets/images/EM/uploadNPS.gif">
   > >
   > > Under Question to show on reporting type the column name as "NPS Score"
   > > <img src="/assets/images/EM/NPSReporting.gif">
6. Update Error handling settings (optional)
   > Upload audio files for Invalid Input and Timeout by clicking on Choose a file under each section
   >
   > Set the maximum number of invalid inputs and timeouts allowed from the drop-down
   >
   > Choose an audio file for exceeding maximum tries
7. Save the survey from the bottom right corner

---

### Add the feedback activity to your flow

> **NOTE:** Refer to the Lab 2 - IVR Contact Routing if you are unfamiliar with working on flow designer
> {: .block-warning }

1. Open your flow created from Lab 2 - IVR Contact Routing
2. Introduce a Menu into your main flow to prompt the caller to opt-in for the survey in between the NewPhoneContact event and the Queue Contact node
   > Activity Label: surveyOptin
   >
   > Prompt: OptinMenu.wav ([Audio Files](https://webexcc.github.io/assets/files/Survey_wav.zip){:target="\_blank"})
   >
   > Make Prompt Interruptible: True
   >
   > Digit Number - 1
   >
   > > Link Description: Opt-In
   >
   > Digit Number - 2
   >
   > > Link Description: Opt-Out
3. Assign true and false values for the Global_FeedbackSurveyOptin variable
   > Drag and drop two Set Variable nodes into your main flow after the Menu
   >
   > Click on the first Set Variable node
   >
   > > Activity Label: OptIn
   > >
   > > Variable: Global_FeedbackSurveyOptin
   > >
   > > Set Value: TRUE
   >
   > Click on the second Set Variable node
   >
   > > Activity Label: OptOut
   > >
   > > Variable: Global_FeedbackSurveyOptin
   > >
   > > Set Value: False
4. Connect the nodes together
   > Connect Custom Menu Links for digit 1 to the Set Variable node with Global_FeedbackSurveyOptin set as true
   >
   > Connect Digit 2 and error handling links to the Set Variable node with Global_FeedbackSurveyOptin set as false
   >
   > Connect the Set Variable blocks back to your flow before Queue Contact
   >
   > Example Flow
   >
   > > <img src="/assets/images/EM/surveyOptin.png">
5. Navigate to the Event Flows tab
6. Add the Feedback V2 node
   > Connect the Feedback V2 node to the AgentDisconnected Activity
   >
   > Click on the Feedback V2 node
   >
   > > Activity Label: PCS_IVR
   > >
   > > Survey Method: Voice Based
   > >
   > > Select survey created earlier from drop-down
   > >
   > > Timeout: 10
7. Complete the flow by adding a Disconnect Contact node after the Feedback V2 node
   > Example Flow
   >
   > > <img src="/assets/images/EM/feedbackV2.png">
8. Validate and Publish the flow

---

### Provide a survey response

> **NOTE:** Refer to the section Basic Features in Lab 3 - Agent Desktop if you are unfamiliar with testing an incoming call
> {: .block-warning }

1. Login to your Agent Desktop and make your state Available
2. Dial your designated DN and accept the incoming voice interaction
3. Provide the DTMF input 1 to opt-in to the survey
4. End the interaction from the Agent Desktop
5. Provide a rating on the scale 0-9

---

### Download and validate the survey response

1. Navigate to the Surveys page on Control Hub
2. Click on the download button on the far right of your survey
   > <img src="/assets/images/EM/downloadResponse.gif">
3. Select the date range for the survey response period as Last 7 days and click Download
   > <img src="/assets/images/EM/downloadDate.gif">
4. Verify your response in the excel sheet to the one you provided on the call
   > <img src="/assets/images/EM/surveyReport.png">

---

# Configure Post Interaction Digital Survey

> Coming soon. ETA is December 2024.
> {: .block-warning }

---

# Customer Journey Data Services (CJDS)

### Overview of the Lab

In this lab, we will understand what is the Customer Journey Data Services (JDS) feature, how we can set it up and configure it in the Control Hub and how to enable the JDS Desktop widget for agents. Furthermore, we will see the Customer Journey Widget in action from an agent perspective and we will delve into all the API capabilities that the features offers.

Finally, we will become familiar with the JDS Use Case library that Cisco has created to showcase how JDS can help you take your customers' journey to the next level.

### Lab Objective

At the end of this lab, you will be able to:

- Enable JDS feature and the Customer Journey Widget in your tenant.
- Create and manipulate an end-user database with your customer information.
- Add the Customer Journey Widget to your Agent Desktop and take advantage of it during a customer interaction.
- Utilize the JDS APIs to enhance the customer journey experience with additional insights & actions.

### Pre-requisites

1.  You have **completed** `Lab 1 - Admin Experience`:
    - You are familiar with Control Hub and navigation within Control Hub, logging in as an administrator.
2.  You have **completed** `Lab 2 - IVR Contact Routing`:
    - You are familiar with creating and modifying flows
3.  You have **completed** `Lab 3 - Agent Desktop`:
    - You are familiar with logging in as an Agent and accepting inbound interactions.
    - You are familiar with creating a custom Desktop Layout
4.  You have **Webex Calling installed** in your device and can make calls to the contact center.

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\
> Developer Portal: **[https://developer.webex-cx.com/documentation/getting-started](https://developer.webex-cx.com/documentation/getting-started){:target="\_blank"}**\

## JDS Feature Overview

CJDS is an API-first service that enables organizations to:

- `Listen`: Integrate with any data source or third-party applications to listen to disparate data sources (e.g. customer called Support ...).
- `Identify`: Create a dynamic customer profile capturing propensity drivers, such as a customer's preferred mode of communication or preferred language (e.g. how many times has the customer contacted us in the last week?...).
- `Analyze`: Apply different aggregation techniques to all customer data collected (e.g. What is the CSAT score of the customer interaction? Is he using telephony,chat or other channel to contact? ...).
- `Act`: Use the data and insights within CJDS to dynamically change the flow within Webex Contact Center Flow Control and personalize the customer experience at a granular level. These insights are visible to customer-facing teams in real time through Agent Desktop. (e.g. bypass normal queue when customer calls for the third time in 24 hours and offer premium support...)

A comprehensive summary of the feature is available in the [Developer Portal](https://developer.webex-cx.com/documentation/guides/journey---getting-started), where you can find all the vital information & step-by-step guide to enable JDS for the first time in your own tenant. CJDS is currently in `Limited Availability` for **US and EMEA based tenants** only. Rest of the regions (ANZ, Canada, Japan, Singapore) are expected to come within the year.

## Setup JDS

1. You need to fill out this [form](https://app.smartsheet.com/b/form/7776df72239e47d0bbb73a392e32927f) to get CJDS enabled, as it **not** by default enabled in all tenants in the Limited Availability regions. If applicable, please work together with your CSM to ensure a smooth process and enablement.Post the initial request, the Cisco team will assist you with CJDS instance setup within 72 hours

2. When JDS is provisioned for the tenant, - `Customer Journey Data` tab appears in the Control Hub

![jdschtab](/assets/images/JDS/jds_ch_tab.png)


## Desktop Customer Journey Widget
The customer Journey widget provides a single pane of glass view to the customer’s journey across all channels and applications, giving you the necessary contextual data for a more personalized customer experience and reducing average handling time. 

### Create a journey project and Activate Webex Contact Center connector
1. Sign in to Control Hub and go to Customer Journey Data > Journey projects
2. You can use the default Sandbox Project or Click Create a journey project
3. Enter a name and a description for the journey project
4. Select a journey project that you created in previous step
5. Toggle the Activate connector in the Webex Contact Center section to on

![jdsactivateproject](/assets/images/JDS/jds_activate_project.png)



### Add user identities to a journey project.
1. Select a journey project for which connector was activated 
2. Select Identities .Click Add identities

![jdsaddidentities](/assets/images/JDS/jds_add_identities.png)



3. Download sample template

![uploadcsvjds](/assets/images/JDS/upload_csv_jds.png)


4. In CSV file download, add the Customer identities [First Name,Last Name,Email Addresses,Phone Numbers,Customers Ids]
Each customer identity must have at least an email address, phone number, or customer ID or else the CSV file will return an error.
If you want to add multiple email addresses, phone numbers or customer IDs, you need to use the pipe “|” delimiter between them. For example, try to add your phone number both with and without a plus sign
For the Id column, make sure to leave each row empty. When you upload the CSV file, this field will auto-generate

![jdscreatedcsv](/assets/images/JDS/jds_created_csv.png)


5. Upload a CSV file that you created for customer identities, and then click Next
6. If the CSV file is valid, a window appears to show you if the import was successful. Once you're done, select Close. You should see a list of all the uploaded customer identities


### Enable customer journey widget on an agent desktop

1. Download the following Desktop Layout JSON file [JDSDesktopLayout](/assets/files//JDSDesktopLayout10.json) 

- If you are interested in adding the CJDS Widget to your existing desktop layout, get below code snippet

CJDS Widget Code Block
```json
          {
            "comp": "md-tab",
            "attributes": {
              "slot": "tab",
              "class": "widget-pane-tab"
            },
            "children": [
              {
                "comp": "span",
                "textContent": "Customer Journey"
              }
            ]
          },
          {
            "comp": "md-tab-panel",
            "attributes": {
              "slot": "panel",
              "class": "widget-pane"
            },
            "children": [
              {
                "comp": "customer-journey-widget",
                "script": "https://journey-widget.webex.com",
                "attributes": {
                  "show-alias-icon": "true",
                  "condensed-view": "true"
                },
                "properties": {
                  "interactionData": "$STORE.agentContact.taskSelected",
                  "bearerToken": "$STORE.auth.accessToken",
                  "organizationId": "$STORE.agent.orgId",
                  "dataCenter": "$STORE.app.datacenter"
                },
                "wrapper": {
                  "title": "Customer Journey Widget",
                  "maximizeAreaName": "app-maximize-area"
                }
              }
            ]
          },
```
Here is a screenshot of the block in place (notice it is after IVR_TRASNCRIPT and before WXM_JOURNEY_TAB

![JDSWidgetCode](/assets/images/JDS/JDS_Widget_Code.png)


2. Sign in to Control Hub and go to Contact Center > Desktop Layouts.

3. Create a new Layout

4. Assign an agent team

5. Upload the Desktop Layout JSON file that you downloaded in step 1

4. Click Save


### View customer journey widget on an Agent desktop

1. Login as an Agent into Agent Desktop.

2. On Accepting an incoming request,CJDS Widget will appear in the right hand side

The widget displays insights such as the number of times the customer has called or was contacted across all channels during a given duration. It also displays the channel history with wrap-up code, queue name, agent ID, and so on, and customizable event history such as third-party events and custom icons.

The progressive profile allows for alignment of different phone numbers and emails under one profile, ensuring accurate and comprehensive interaction data 

![JDSWidgetDesktop](/assets/images/JDS/JDS_Widget_Desktop.png)

## JDS APIs

### API Documentation & Definitions

AS JDS is an API-first solution, there is a wide range of APIs available. All the APIs can be found in the [Developer Portal](https://developer.webex-cx.com/documentation/journey), where -as with all APIs- there is information on how to create the API request, the path/query parameters, the expected response as well as a sample code example. For more information on Webex Contact Center APIs & Authentication, you can follow and the complete the [API Lab - Lab 11](https://webexcc.github.io/pages/API/).

![JourneyDevPortal](/assets/images/JDS/JDS_Dev_Portal.png)

To be able to understand all the capabilities these APIs offer, it is important to become familiar with a few terms used in them:

- `Project / Workspace`: A uniquely identified entity that includes a specific set of JDS configurations and data sources.
  - At any given moment, only one project can be active per tenant (i.e. listen to events).
- `Subscription`: The events that JDS listens on, e.g. all the agent activity state changes/logins/logouts are one default JDS subscription.
- `Identity / Person`: A unique customer, all the events that the same customer (e.g. call, chat, email, visit website) creates are marked under the same identity.
- `Alias`: Different ways we can identify the same customer/person (e.g. email, phone number, Customer ID). Customer **must have at least one alias**.
- `Profile Template`: A profile template defines the kind of aggregation technique we want to see for a customer (e.g. contacts within last 24 hours).
- `Progressive Profile`: The values that correspond to an identity’s profile template at that particular moment of time (e.g. contacts within last 24 hours = 10).
- `Actions`: Actions can mean two different things in the concept of JDS:
  - The logical concept of differentiating the experience based on the result of Analyze (e.g. Call priority for repeated callers).
  - An automated programmatic response to events (e.g. send an SMS to a repeated caller).

### JDS API Collection

As there a lot of different APIs available in JDS, to make the introduction to them easier, Cisco has created a [JDS API Collection](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/customer-journey-samples/cjds-postman-example/JDS%20CiscoLive.postman_collection.json) as a starting point. In this segment, we will download this collection and import it to `Postman`, but any other API design platform can be used.

1. Download the JDS Postman collection, by going to the [GitHub samples page](https://github.com/WebexSamples/webex-contact-center-api-samples/blob/main/customer-journey-samples/cjds-postman-example/JDS%20CiscoLive.postman_collection.json).

2. Click on **Download raw file**.
   ![JDSDownloadRaw](/assets/images/JDS/JDSDownloadRaw.png)

3. Open the `Postman` app and click on the **Import** button.

4. Select the **downloaded JSON file** in the appeared window.
   ![JDSImport](/assets/images/JDS/JDSImport.png)

5. Once the JDS collection is imported, select the root folder of the imported collection in the left menu, then navigate to the **Variables**, and define the values.

6. Once the values are defined, click the **Save** button.
   ![JDSSave](/assets/images/JDS/JDSSave.png)

7. Go to **Authorization** and click on **Get New Access Token** button. The Postman will redirect you to the Auth page where you need to define your Admin account which was used for the App creation in the dev portal. As a result, you should get the message **Authentication complete**. Click **Proceed** and on the next page click on **Use Token** button.
   ![JDSAuth](/assets/images/JDS/authJDS.gif)

After successfully saving your JDS API collection in Postman, you can also check on the following video that shows how to use combinations of these APIs to manage your JDS profiles and templates.

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/9c7f0d45-d860-4962-99d2-d5d818fde573" width="100%" height="100%" title="JDS Postman Collection" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### JDS API Example

> Work in progress. ETA is August 2024.
> {: .block-warning }

## JDS Use Case Samples

### Journey Based Queue Priority

> Work in progress. ETA is August 2024.
> {: .block-warning }

### More Use Cases

More use case samples that utilize the Customer Journey Data Services (JDS) can be found in the Cisco Webex Contact Center samples [GitHub page](https://github.com/WebexSamples/webex-contact-center-api-samples/tree/main/customer-journey-samples).

We highly suggest you **bookmark** this page as more use cases will be added in the future.

---

<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>

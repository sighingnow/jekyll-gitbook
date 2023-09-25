---
title: Lab 8 - Feedback and Journey
author: Ankan Dutta & Gagarin Sathiyanarayanan
date: 2022-08-08
layout: post
---
```
Last modified: Tue, 27 Jul 2023
```

## Table of Contents 

| Topic                                                                                    | Lab Type      | Difficulty Level | Estimated length |
| ---------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [[#Introduction to Experience Management Post Interaction and Post Call Surveys]] | Watch & Understand | EASY            | 7 min            |
| [[#Configure Post Call IVR Survey]] | Practical Lab | EASY | 10 min |
| [[#Configure Post Interaction Digital Survey]] | Practical Lab | EASY | 10 min |
| [Customer Journey Data Services Introduction](customer-journey-data-services-introduction) | Watch & Understand | EASY | 5 min |

## Overview of the lab:
In this lab, we will configure all the required elements to collect and view end-customer feedback using the new Experience Management.


### Lab Objective

- Create a basic survey
- Upload audio files to the survey
- Configure the survey in flow designer
- Simulate a customer interaction with survey feedback
- Download and verify survey feedback

  ---

### Pre-requisites

1.  You have **completed Lab 1 - Admin Experience:**
    -   You are familiar with Control Hub and navigation within Control Hub
2.  You have **completed Lab 2 - IVR Contact Routing:**
    -   You are familiar with creating and modifying flows
3.  You have **completed Lab 3 - Agent Desktop:**
    -   You are familiar with logging in as an Agent and accepting inbound interactions
4.  You have **Webex Calling installed** in your mobile phone and supervisor created in Lab 1 from which you can make calls to the contact center
  
    ---

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\

  ---

## Introduction

# Introduction to Experience Management Post Interaction and Post Call Surveys
> Experience Management is a next-gen tool that facilitates post interaction surveys and outcomes. It allows you to track and measure customer satisfaction using anchor metrics like Net Promoter Score (NPS), Customer Effort Score (CES), and Customer Satisfaction (CSAT). Webex Contact Center brings in an integration of Experience Management for its post call survey interactive voice response (PCS IVR) and digital channels.

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="" width="100%" height="100%" title="Introduction to Experience Management" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

## Lab Section
# Configure Post Call IVR Survey

### Create a survey
1. Click on 
    ---
2. Click 
    > Name your 
    >
    > Description: optional
    >
    > Channel Type: Telephony
    >
    > Queue Routing Type: Longest Available Agent
    > 
    > Call Distribution:
    >> Click Add Group
    >>
    >> Select <w class="attendee_out">Your_Attendee_ID</w>_Team1
    >>
    >> Save Group
    >>
    >> Create second group
    >>
    >> Select <w class="attendee_out">Your_Attendee_ID</w>_Team2
    >>
    >> After: 60 Seconds in queue
    >>
    >> Add Group as: Last
    >>
    >> Save Group
    >>
    >> Click Close
    >
    > ---
    >
    > []()
    >
    > Save

    ---

### Add the feedback activity to your flow
1. Download the [Flow Template](https://webexcc.github.io/../../../assets/files/flow_template.json){:target="\_blank"}
   > The file will open in a separate window.  
   >
   > If using Firefox, Select the save option.
   >
   > <img src="/assets/images/IVR/saveJson.gif">
   >
   > If using Chrome or Edge, right click and select save.
   >
   ><img src="/assets/images/IVR/saveJsonChrome.gif" width="243">
   
2. Click Routing Strategy <img src="/assets/images/IVR/rsToFlow.gif" Align= "right" height="200">
3. Click on Flows in the top ribbon 
4. Click Import
5. Select flow_template
6. Click the ellipsis next to the newly imported flow_template and select Open 
   > <img src="/assets/images/IVR/openFlow.JPG" height="40">
   > 
   > Rename the flow to <w class="attendee_out">AttendeeID</w>_TechSummit by clicking on the pencil icon at the top of the screen, next to the flow name
   >
   > Click on the Play Message node
   >> Audio File: welcome.wav 
   >
   > ---
   > Click on the Queue Contact node
   >> Select Static Queue
   >>
   >> Queue: Q_<w class="attendee_out">AttendeeID</w>
   >>
   > ---
   >
   > Click on the Play Music node
   >> Select Static Audio File
   >>
   >> Music File: defaultmusic_on_hold.wav
   >>
   >  ---
   >
   > Click the Validation switch to turn on validation
   >
   > Click Publish Flow
   > 
   > Add a Publish Note of your choosing
   >
   > Click Publish Flow
   >
   > Click Return to Flow
   > 
   > Turn off Validation 

    ---

### Provide a survey response

1. Click on Provisioning > Entry Points/Queues > Entry point
2. Click Create new Entry point [Show Me](https://webexcc.github.io/../../../assets/images/IVR/openEP.gif){:target="\_blank"}
    > Name your Entry Point EP_<w class="attendee_out">AttendeeID</w>
    >
    > Description: optional
    >
    > Channel Type: telephony
    >
    > Service Level Threshold: 60
    >
    > Flow: <w class="attendee_out">AttendeeID</w>_TechSummit
    >
    > Music on Hold: defaultmusic_on_hold.wav
    >
    > Click Save
    >

---
### Download and validate the survey response

1. Click on Provisioning > Entry Points/Queues > Entry point
2. Click Create new Entry point [Show Me](https://webexcc.github.io/../../../assets/images/IVR/openEP.gif){:target="\_blank"}
    > Name your Entry Point EP_<w class="attendee_out">AttendeeID</w>
    >
    > Description: optional
    >
    > Channel Type: telephony
    >
    > Service Level Threshold: 60
    >
    > Flow: <w class="attendee_out">AttendeeID</w>_TechSummit
    >
    > Music on Hold: defaultmusic_on_hold.wav
    >
    > Click Save
    >

---
# Configure Post Interaction Digital Survey 

>Coming soon. ETA is December 2023. 
{: .block-warning }

---
## Introduction
# Customer Journey Data Services Introduction

>Work in progress. ETA is August 2023. 
{: .block-warning }



## Lab Section

>Work in progress. ETA is August 2023. 
{: .block-warning }


---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

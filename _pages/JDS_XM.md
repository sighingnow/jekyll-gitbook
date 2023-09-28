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
| [Introduction to Experience Management](#introduction-to-experience-Management-Post-Interaction-and-Post-Call-Surveys) | Watch & Understand | EASY            | 7 min            |
| [Configure Post Call IVR Survey](#Configure-Post-Call-IVR-Survey) | Practical Lab | EASY | 10 min |
| [Configure Post Interaction Digital Survey](#Configure-Post-Interaction-Digital-Survey) | Practical Lab | EASY | 10 min |
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
	<iframe src="https://app.vidcast.io/share/embed/0049a028-85b6-4b56-90f7-1fc696201ea3" width="100%" height="100%" title="Introduction to Experience Management" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>


## Lab Section
# Configure Post Call IVR Survey

### Create a survey
1. Click on Contact Center under Services from Control Hub 
    > <img src="/assets/images/EM/contactCenter.gif">
    > 
2. Under Contact Center, click on Surveys
    > <img src="/assets/images/EM/survey.gif">
    > 
3.  Click the "Create new survey" button on the top-right corner of the Survey page
    >Select Survey type as IVR
    >> <img src="/assets/images/EM/surveyType.gif">
    >>
    >Provide a name for your survey appended with your Attendee ID
    >> <img src="/assets/images/EM/surveyName.gif">
    >>
    >Choose the additional languages for the survey from the drop-down (optional)
    >> <img src="/assets/images/EM/languageSupport.png">
    >>
    >Click on Next
    >
4. Add audio files to the Welcome and Thank you notes ([Audio Files](https://webexcc.github.io/assets/files/lab_wav.zip){:target="\_blank"})
    >Click on the pencil icon to the right
    >>  <img src="/assets/images/EM/welcomeThankyou.gif">
    >>
    >Select Choose a file when the note expands, pick the audio file (Welcome.wav) and upload
    >> <img src="/assets/images/EM/uploadWelcome.gif">
    >>
    >Repeat steps for Thank you note (Thankyou.wav)
    >>
5. Add a question to your survey
    >Select the NPS question from the drop-down by clicking + Add a question
    >><img src="/assets/images/EM/addNPS.gif">
    >>
    >Choose the corresponding audio file, nps.wav for the NPS question and upload  ([Audio Files](https://webexcc.github.io/assets/files/lab_wav.zip){:target="\_blank"})
    >><img src="/assets/images/EM/uploadNPS.gif">
    >>
    >Under Question to show on reporting type the column name as "NPS Score"
    >><img src="/assets/images/EM/NPSReporting.gif">
    >>
6. Update Error handling settings (optional)
    >Upload audio files for Invalid Input and Timeout by clicking on Choose a file under each section
    >
    >Set the maximum number of invalid inputs and timeouts allowed from the drop-down
    >
    >Choose an audio file for exceeding maximum tries
    >
7. Save the survey from the bottom right corner

---

### Add the feedback activity to your flow

> **NOTE:** Refer to the Lab 2 - IVR Contact Routing if you are unfamiliar with working on flow designer
{: .block-warning }

1. Open your flow created from Lab 2 - IVR Contact Routing
2. Introduce a Menu into your main flow to prompt the caller to opt-in for the survey in between the NewPhoneContact event and the Queue Contact node
    > Activity Label: surveyOptin
    >
    > Prompt: OptinMenu.wav  ([Audio Files](https://webexcc.github.io/assets/files/lab_wav.zip){:target="\_blank"})
    >
    > Make Prompt Interruptible: True
    >
    > Digit Number - 1 
    >>Link Description: Opt-In
    >
    > Digit Number - 2 
    >>Link Description: Opt-Out
    >
3.  Assign true and false values for the Global_FeedbackSurveyOptin variable
    >Drag and drop two Set Variable nodes into your main flow after the Menu
    >
    >Click on the first Set Variable node
    >>Activity Label: OptIn
    >>
    >>Variable: Global_FeedbackSurveyOptin
    >>
    >>Set Value: TRUE
    >>
    >
    >Click on the second Set Variable node
    >>Activity Label: OptOut
    >>
    >>Variable: Global_FeedbackSurveyOptin
    >>
    >>Set Value: False
    >>
    >
4. Connect the nodes together
    >Connect Custom Menu Links for digit 1 to the Set Variable node with Global_FeedbackSurveyOptin set as true
    >
    >Connect Digit 2 and error handling links to the Set Variable node with Global_FeedbackSurveyOptin set as false
    >
    >Connect the Set Variable blocks back to your flow before Queue Contact
    >
    >Example Flow
    >><img src="/assets/images/EM/surveyOptin.png">
    >>
5. Navigate to the Event Flows tab
6. Add the Feedback V2 node
    >Connect the Feedback V2 node to the AgentDisconnected Activity
    >
    >Click on the Feedback V2 node
    >>Activity Label: PCS_IVR
    >>
    >>Survey Method: Voice Based
    >>
    >>Select survey created earlier from drop-down
    >>
    >>Timeout: 10
    >>
    >
7. Complete the flow by adding a Disconnect Contact node after the Feedback V2 node
    >Example Flow
    >><img src="/assets/images/EM/feedbackV2.png">
    >>
8. Validate and Publish the flow
   
   
---

### Provide a survey response

> **NOTE:** Refer to the section Basic Features in Lab 3 - Agent Desktop if you are unfamiliar with testing an incoming call
{: .block-warning }

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
    >
3. Select the date range for the survey response period as Last 7 days and click Download
    > <img src="/assets/images/EM/downloadDate.gif">
    >
4. Verify your response in the excel sheet to the one you provided on the call
    > <img src="/assets/images/EM/surveyReport.png">
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

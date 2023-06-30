---
title: Lab 4 - Supervisor Desktop
author: Benjamin Bollaert & Yurii Ulianov & Iranthi Ulluwishewa
date: 2022-04-04
layout: post
---
```
Last modified: Mon, 10 Apr 2023
```

## Table of Contents

| Topic                                                                              | Lab Type      | Difficulty Level | Estimated length |
| ---------------------------------------------------------------------------------- | ------------- | ---------------- | ---------------- |
| [Assign supervisor license to the user](#assign-supervisor-license-to-the-user)        | Practical Lab | EASY             | 5 min           |
| [Configure supervisor in Management Portal](#configure-supervisor-in-management-portal) | Practical Lab | EASY             | 10 min            |
| [Supervisor Experience](#supervisor-experience)                                          | Practical Lab | EASY             | 15 min            |      |



## **Introduction**

#### **Lab Objective**

This lab is designed to introduce the audience to the Extensible Supervisor Desktop (ESD), its configuration and capabilities. In addition this lab contains demo which shows user experience when working with ESD.

#### **Pre-requisite**

1.  Admin credentials to login to Control Hub and Webex Contact Center administration portal.
2.  At least one admin and one supervisor users with extensions have been created on Control Hub  according to the instructions provided in ***Lab 1 - Admin Experience***.
4.  Standard or Premium agent license is assigned to agent's account on Control Hub.
5.  Agent account is configured on Webex CC management portal and you are able to sign in as an agent.

#### Example of agent and supervisor users on Control Hub 

| **User Role** | **User email**                                                                | **User Extension** |
| ------------- | ----------------------------------------------------------------------------- | ------------------ |
| Agent         | <w class="attendee_out">Your_Attendee_ID</w>_agent1@Your_Domain      | <w class= "agentEXT_out">Your Agent Extension</w> |
| Supervisor    | <w class="attendee_out">Your_Attendee_ID</w>_supervisor1@Your_Domain | <w class= "supervisorEXT_out">Your Supervisor Extension</w> |


>**Note:** Please refer ***Lab 1 - Admin Experiense*** if you need to add agent or supervisor users on Control Hub.

#### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com/)**  
> Webex CC Management Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal)**  
> Agent / Supervisor Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com/)**  

# Assign supervisor license to the user

-  Login to Control Hub under organization admin account.
-  Go to ***Users***, click on supervisor's account, scroll dow to ***Licenses*** section and press ***Edit Licenses*** button.

![Lab_4_Supervisor_Config_1](/assets/images/DC_Lab_4_Supervisor_Config_1.png)

-  Press ***Edit Licenses*** button on ***Edit services*** page.

![Lab_4_Supervisor_Config_2](/assets/images/DC_Lab_4_Supervisor_Config_2.png)

-  Go to ***Contact Center*** tab, tick ***Licenses Agent*** checkbox and assign ***Premium Agent - Supervisor Role*** license. Then save changes.

![Lab_4_Supervisor_Config_3](/assets/images/DC_Lab_4_Supervisor_Config_3.png)

-  Check and make sure supervisor license has been assigned. Then click on ***Close*** button to return to the user settings.

![Lab_4_Supervisor_Config_4](/assets/images/DC_Lab_4_Supervisor_Config_4.png)

-  Check and make sure supervisor license is displayed in ***Licenses*** section of user seetings on Control Hub.

![Lab_4_Supervisor_Config_5](/assets/images/DC_Lab_4_Supervisor_Config_5.png)

-  Go to ***Contact Center*** -> ***Settings*** and press ***Synchronize Users*** button to sync all changes from Control Hub to Webex CC Management Portal.

![Lab_4_Supervisor_Config_6](/assets/images/DC_Lab_4_Supervisor_Config_6.png)


# Configure supervisor in Management Portal

-  Download [Desktop Layout JSON](https://webexcc.github.io/assets/files/ESD_default_layout.json.zip) file for supervisor from GitHub.
-  Open the file in any JSON editor, check and make sure it contains ***supervisor*** and ***supervisorAgent*** sections.
	- ***supervisor*** section is used when the user signs in to supervisor desktop with ***Supervisor*** role.
	- ***supervisorAdmin*** section is used when the user signs in to supervisor desktop with ***Supervisor and Agent*** role.

![Lab_4_WebexCC_Config_1](/assets/images/DC_Lab_4_Supervisor_WebexCC_1.png)

-  Go to ***Provisioning*** -> ***Desktop Layout*** and click on ***New Layout***.

![Lab_4_WebexCC_Config_2](/assets/images/DC_Lab_4_Supervisor_WebexCC_2.png)

-  Provide ***Name***, press ***Upload*** button and select JSON layout file downloaded above. After the file is uploaded check and make sure the validation is completed successfully and save desktop layout.

![Lab_4_WebexCC_Config_3](/assets/images/DC_Lab_4_Supervisor_WebexCC_3.png)

-  Go to ***Provisioning*** -> ***Teams*** and click on ***New Team***.

![Lab_4_WebexCC_Config_4](/assets/images/DC_Lab_4_Supervisor_WebexCC_4.png)

-  Choose proper ***Site*** from drop-down list according to the lab guide, provide ***Name***, select ***Desktop Layout*** for supervisor created at the previous step and save the team.

![Lab_4_WebexCC_Config_5](/assets/images/DC_Lab_4_Supervisor_WebexCC_5.png)

-  Go to ***Provisioning*** -> ***User Profiles***, find default ***Supervisor Profile***, click on ***...*** button next to it, then on ***Copy***.

![Lab_4_WebexCC_Config_6](/assets/images/DC_Lab_4_Supervisor_WebexCC_6.png)

-  Provide proper user profile name and go to ***Module Settings*** tab.

![Lab_4_WebexCC_Config_7](/assets/images/DC_Lab_4_Supervisor_WebexCC_7.png)

-  Select ***Module Access*** as ***Specific***. Check and make sure ***Send Messages*** and ***Mid-Call Monitor*** capabilities are enabled.

![Lab_4_WebexCC_Config_8](/assets/images/DC_Lab_4_Supervisor_WebexCC_8.png)

-  Scroll to the bottom of the page and save supervisor profile.

![Lab_4_WebexCC_Config_9](/assets/images/DC_Lab_4_Supervisor_WebexCC_9.png)

-  Go to **Provisioning*** -> ***Users***, find your supervisor user, click on ***...*** button next to it, then on ***Edit***.

![Lab_4_WebexCC_Config_10](/assets/images/DC_Lab_4_Supervisor_WebexCC_10.png)

-  Set the following parameters and save changes: 

| **Parameter Name**             | **Parameter Value**                               |
| -------------------------- | --------------------------------------------- |
| Contact Center Enabled     | Yes                                           |
| Primary Team               | Select supervisor team created above          |
| Site                       | Select proper site according the to lab guide |
| Teams                      | Add teams which supervisor can use when signing in as an agent |
| Agent Profile              | Select the default one - ***Agent-Profile***        |
| Multimedia Profile         | Select the default one - ***Default_Multimedia_Profile*** | 

![Lab_4_WebexCC_Config_11](/assets/images/DC_Lab_4_Supervisor_WebexCC_11.png)


# Supervisor Experience

In this section you will act as a supervisor and perform activities. The Supervisor Desktop provides a holistic supervisor experience within a centralized interface. It enables supervisors to manage, monitor, assess, guide, and assist agents. It also enables administrators to customize the Supervisor Desktop with widgets to address specific Contact Center business needs


<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/2d7fd721-b192-43d1-83f9-68c7f2d544b3" width="100%" height="100%" title="Supervisor Desktop Demonstration" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>
<br>

#### **Pre-requisite**

1.  a supervisor user configured as described above
2.  one agent logged in and in conversation with a customer so you can monitor the call.

#### **Supervisor Log in**

- Sign in to the **Supervisor Desktop**: https://desktop.wxcc-us1.cisco.com with your supervisor credentials.

- In the next window, set your role as **supervisor** and your **own extension**. Please note that you can set your role either as **supervisor** or **agent and supervisor**. We will select this second option at the end of this lab.


![Lab_4_ESD](/assets/images/Lab4_ESD_11.png)

- When you sign in to the **Supervisor Desktop**, the appearance depends on how the Webex Contact Center administrator has configured the desktop layout. The **Supervisor Desktop** display size must be greater than 500 x 500 pixels (width x height). You must set your web browser zoom to 100% for the best experience with the Supervisor Desktop. With this lab layout you get : 

1. **Home Page**: Displays a user friendly interface that provides a consolidated view of key contact center metrics and filters. This is the default landing page in the Supervisor Desktop. The administrator can customize the Home Page in the layout JSON file.
2. **Task**: Displays all the tasks when you sign in to the Desktop in dual role (supervisor and agent) or as a supervisor, interactions such as voice, chat, email, and social messaging conversations, along with monitoring. The icon displays a badge indicating the number of requests that you have not accepted across various channels.
3. **Team Performance**: Displays real-time information about an agent and a consolidated view of an agent’s performance as part of the team. You can also monitor and send 1:1 messages to an agent.
  
Note the **Supervisor Desktop** UI supports localization in 30 languages. The following are the supported languages:
Bulgarian, Catalan, Chinese (China), Chinese (Taiwan), Croatian, Czech, Danish, Dutch, English (UK), English (US),Finnish,French, German, Hungarian, Italian,Japanese, Korean, Norwegian,Polish,Portuguese (Brazil), Portuguese (Portugal), Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swedish, Turkish, and Ukrainian. The Supervisor Desktop UI language is based on the language preference settings on your browser. For example, let us consider that you have selected the preferred language as French on the Google Chrome browser. When you launch the Supervisor Desktop in the Google Chrome browser, the Supervisor Desktop UI appears in Français (French).

- **Home Page** : 

![Lab_4_ESD](/assets/images/Lab4_ESD_2.png)

- click on the third menu option, you now see the **Team Performance Details** page where your agents activities are displayed : status, call duration, team, ... In the last column, you are presented two options : **chat** or **monitor**. The monitoring option is obvisously only enabled when an agent is in conversation with a customer otherwise the icon will be greyed.
  
![Lab_4_ESD](/assets/images/Lab4_ESD_3.png)

- The columns displayed are the following 

|  **Column**            | **Description**                                     |
| ---------------------- | ------------------------------------------ |
| Agent Name             | Displays name and avatar (Webex image) of the agent.|
| Agent State            | The work status while using the Supervisor Desktop. The agent availability state includes Available, Idle codes, or RONA. |
| Agent State Duration   | The time that the agent has been in the current state. The state timer format is hh:mm:ss (for example, 01:10:25).|
| Phone Number           | Dial number or extension of the agent signed in.|
| Site                   | Name of the site with which the agent is associated.|
| Team                   | Name of the team with which the agent is associated.|
| Channels               | The mode of communication through which an agent can communicate.For example, voice call.|
| Contact Queue          | Name of the queue from where the agent receives the incoming call.|
| Contact Status         | The status of the agent in an active call. Example: Connected, Consulting, Conference, or Wrap up|
| Time in Contact Status | The time spent by an agent in an active call. For example, the time an agent is in conference call.|
| Total Contact Duration  | Total duration of the contact from when it was first connected (including any other state like consult or conference in the same contact). The time elapsed since the agent accepted the request. The connected timer format is hh:mm:ss (for example, 01:10:25).|
| Sign In Time           | The time an agent has signed in to theSupervisor Desktop. The date and time format is dynamic and displays according to location.|
| Action                 | You can perform the following actions:• Review and Monitor - Based on the privilege provided by Administrator as part of user profile, you can review and monitor an ongoing agent call silently. • Send1:1 message to Agent – Based on the privilege provided by Administrator as part of user profile, you can send 1:1 message to an agent.|

- you can customize this view to show / hide columns or group information at your convenience.

![Lab_4_ESD](/assets/images/Lab4_ESD_32.png)


#### **Chat with your agents**

Collaboration between agents and supervisors can help your Contact Center to be more effective and efficient for your customers and this is why we have enabled Webex messaging features in both Agent and Supervisor desktops.

- Click on the **Send Message** button
    
![Lab_4_ESD](/assets/images/Lab4_ESD_4_chat.png)

- Fill the chat window with a message to send to your agent

![Lab_4_ESD](/assets/images/Lab4_ESD_5_chat.png)

- On the agent side, observe the message notification received

![Lab_4_ESD](/assets/images/Lab4_ESD_6_chat.png)

- If, as an agent, you want to answer to the supervisor, your will need to click on the **Webex logo** to open the Webex app embedded in the **Agent Desktop**. You can then reply to the supervisor directly.
  
![Lab_4_ESD](/assets/images/Lab4_ESD_7_chat.png)

- On the supervisor side, observe the message notification received
  
![Lab_4_ESD](/assets/images/Lab4_ESD_8_chat.png)


#### **Monitor calls**

- As a supervisor, the **Team Performance Details** page allows you to see all connected agents and decide to monitor calls by clicking on the **Review and Monitor** icon.

![Lab_4_ESD](/assets/images/Lab4_ESD_9_monitor.png)

- The following popup will be displayed. Click on **Start Monitoring**. Please note a supervisor can monitor other call types such as callbacks, outdial calls, outbound preview campaign calls. 

![Lab_4_ESD](/assets/images/Lab4_ESD_10_monitor.png)

- In your **Supervisor Desktop**, an incoming popover window will be displayed and your softphone will ring as Webex Contact Center is now trying to reach you. You recognize the agent you want to monitor and other call variables are displayed. The Flow configuration defines variables to display on this popover (max 6). Accept the call on your supervisor softphone.

![Lab_4_ESD](/assets/images/Lab4_ESD_11_monitor.png)

- As a supervisor, the call you are now monitoring is displayed in your desktop with agent and customer details of which the call variables so you are aware of the context of the call. You can view  previous communications with a customer across all channels (voice, email, chat, and social) in the **Contact History** pane. The pane displays details for the last 24 hours.
  
![Lab_4_ESD](/assets/images/Lab4_ESD_12_monitor.png)

- You can pause the monitoring and start is again if you will
  
![Lab_4_ESD](/assets/images/Lab4_ESD_13_monitor.png)

#### **Particular case when a supervisor is also an agent**

- When you sign in to the Supervisor Desktop, you can - depending or your team assignement - choose either the supervisor role or supervisor AND agent role.

![Lab_4_ESD](/assets/images/Lab4_ESD_14_monitor.png)

- In the case, the supervisor experience is a bit different as your agent status appears in the header section of the Desktop.

![Lab_4_ESD](/assets/images/Lab4_ESD_15_monitor.png)

- If, as a supervisor, you chose to monitor a call, your status is set to **Engaged** and you cannot take other calls as an agent.

![Lab_4_ESD](/assets/images/Lab4_ESD_16_monitor.png)





---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

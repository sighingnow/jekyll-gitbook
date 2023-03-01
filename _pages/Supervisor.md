---
title: Lab 4 - Supervisor Desktop
author: Benjamin Bollaert & Yurii Ulianov & Iranthi Ulluwishewa
date: 2022-04-04
layout: post
---

## **Introduction**

#### **Lab Objective**

This lab is designed to introduce the audience to the Extensible Supervisor Desktop (ESD), its configuration and capabilities. In addition this lab contains demo which shows user experience when working with ESD.

#### **Pre-requisite**

1.  Admin credentials to login to Control Hub and Webex Contact Center administration portal.
2.  At least one admin and one supervisor users with extensions have been created on Control Hub  according to the instructions provided in ***Lab 1 - Admin Experience***.
4.  Standard or Premium agent license is assigned to agent's account on Control Hub.
5.  Agent account is configured on Webex CC management portal and you are able to sign in as an agent.

#### Example of agent and supervisor users on Control Hub 

| **User Role** | **User email**                                     |
| ------------- | ------------------------------------------ |
| Agent         | <w class = "attendee-class">your_attendee_ID</w>\_agent1@\<your domain\>      |
| Supervisor    | <w class = "attendee-class">your_attendee_ID</w>\_supervisor1@\<your domain\> |

>**Note:** Please refer ***Lab 1 - Admin Experiense*** if you need to add agent or supervisor users on Control Hub.

#### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com/)**  
> Webex CC Management Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal)**  
> Agent / Supervisor Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com/)**  

## **1. Assign supervisor license to the user**

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


## **2. Configure supervisor in Webex CC**

-  Download desktop laout JSON file for supervisor from GitHub using the following link: https://cisco.app.box.com/s/ndgusl7aez4o16rkyjq6xskfh5xd7x75
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


## **3. Supervisor Experience**

#### **Lab Objective**

In this section you will act as a supervisor and perform activities. The Supervisor Desktop provides a holistic supervisor experience within a centralized interface. It enables supervisors to manage, monitor, assess, guide, and assist agents. It also enables administrators to customize the Supervisor Desktop with widgets to address specific Contact Center business needs

#### **Pre-requisite**

1.  a supervisor user configured as described above
2.  one agent logged in and in conversation with a customer so you can monitor the call.

#### **Supervisor Log in**

- Sign in to the **Supervisor Desktop**: https://desktop.wxcc-us1.cisco.com with your supervisor credentials.

- In the next window, set your role as **supervisor** and your **own extension**. Please note that you can set your role either as **supervisor** or **agent and supervisor**.


![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_11.png)

- When you sign in to the **Supervisor Desktop**, the appearance depends on how the Webex Contact Center administrator has configured the desktop layout. The **Supervisor Desktop** display size must be greater than 500 x 500 pixels (width x height). You must set your web browser zoom to 100% for the best experience with the Supervisor Desktop.
  
- The default page highlights a **dashboard** of your Contact Center activity with a couple of filters to narrow your analysis. 

- Note the **Supervisor Desktop** UI supports localization in 30 languages. The following are the supported languages:
Bulgarian, Catalan, Chinese (China), Chinese (Taiwan), Croatian, Czech, Danish, Dutch, English (UK), English (US),Finnish,French, German, Hungarian, Italian,Japanese, Korean, Norwegian,Polish,Portuguese (Brazil), Portuguese (Portugal), Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swedish, Turkish, and Ukrainian. The Supervisor Desktop UI language is based on the language preference settings on your browser. For example, let us consider that you have selected the preferred language as French on the Google Chrome browser. When you launch the Supervisor Desktop in the Google Chrome browser, the Supervisor Desktop UI appears in Français (French).

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_2.png)

- if your now click on the third menu option, you can see the **Team Performance Details** page where your agents activities are displayed : status, call duration, team, ... In the last column, you are presented two options : **chat** or **monitor**.
  
![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_3.png)

- you can customize this view to show / hide columns or group information

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_32.png)


#### **Chat with your agents**

- Click on the **Send Message** button
    
![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_4_chat.png)

- Fill the chat window with a message to send to your agent

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_5_chat.png)

- On the agent side, observe the message notification received

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_6_chat.png)

- If, as an agent, you want to answer to the supervisor, your will need to click on the **Webex logo** to open the Webex app embedded in the **Agent Desktop**. You can then reply to the supervisor directly.
  
![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_7_chat.png)

- On the supervisor side, observe the message notification received
  
![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_8_chat.png)


#### **Monitor calls**

- As a supervisor, the **Team Performance Details** page allows you to see all connected agents and decide to monitor calls by clicking on the **Review and Monitor** icon.

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_9_monitor.png)

- The following popup will be displayed. Click on **Start Monitoring**.

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_10_monitor.png)

- In your **Supervisor Desktop**, an incoming popover window will be displayed and your softphone will ring as Webex Contact Center is now trying to reach you. Accept the call on your supervisor softphone.

![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_11_monitor.png)

- As a supervisor, the call you are now monitoring is displayed in your desktop with agent and customer details of which the call variables so you are aware of the context of the call.
  
![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_12_monitor.png)

- You can pause the monitoring and start is again if you will
  
![Lab_4_WebexCC_Config_12](/assets/images/Lab4_ESD_13_monitor.png)


## **4. Providing the Supervisor capabilities feedback**

We are seeking your feedback on the Agent and Supervisor capabilities. By participating in this survey, you will help us to improve the quality of our products. 
<iframe width="1024" height="800" src="https://app.smartsheet.com/b/form/adb4f91491ec4a4a9c2dc106c7b65db0" title="Webex Contact Center – Partner Survey" frameborder="0" allow="accelerometer; clipboard-write; gyroscope; picture-in-picture" allowfullscreen></iframe>




---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

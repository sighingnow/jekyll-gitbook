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
2.  At least one admin and one supervisor users are created on Control Hub.
3.  Standard or Premium agent license is assigned to agent's account on Control Hub.
4.  Agent account is configured on Webex CC management portal and you are able to sign in as an agent.

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


## **2. Assign desktop layout for supervisor**

-  Download desktop laout JSON file for supervisor from GitHub using the following link: https://cisco.app.box.com/s/ndgusl7aez4o16rkyjq6xskfh5xd7x75
-  Open the file in any JSON editor, check and make sure it contains ***supervisor*** and ***supervisorAgent*** sections.
	- ***supervisor*** section is used when the user signs in to supervisor desktop in <> mode
	- ***supervisorAdmin*** section is used when the user signs in to supervisor desktop in <> mode



-  Go to ***Provisioning*** -> ***Desktop Layout*** and click on ***New Layout***.



-  Provide ***Name***, press ***Upload*** button and select JSON layout file downloaded above. After the file is uploaded check and make sure the validation is completed successfully and save desktop layout.



-  Go to ***Provisioning*** -> ***Teams*** and click on ***New Team***.



-  Choose proper ***Site*** from drop-down list, provide ***Name***, select ***Desktop Layout*** for supervisor created at the previous step and save the team.



-  




<iframe width="1024" height="800" src="https://app.smartsheet.com/b/form/adb4f91491ec4a4a9c2dc106c7b65db0" title="Webex Contact Center – Partner Survey" frameborder="0" allow="accelerometer; clipboard-write; gyroscope; picture-in-picture" allowfullscreen></iframe>




---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

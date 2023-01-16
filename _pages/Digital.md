---
title: Lab 12 - Digital Channels
author: Davide Telari & Yurii Ulianov & Iranthi Ulluwishewa & David Ng & Naveen Kumar Narasimhan Almeti
date: 2022-12-12
layout: post 
---

This page is under development

# Digital Channels Architecture Overview and Provisioning

## **Table of Contents**

1.  Webex Connect architecture
2.  Webex Connect Provisioning
3.  Webex Connect Provisioning verification

## **Introduction**

#### **Lab Objective**

This lab is designed to introduce the audience to the digital channels (Webex Connect) platform, its architecture and its provisioning. In addition this lab will provide the instructions to verify if Webex Connect has been provisioned successfully.

#### **Pre-requisite**

1.  Admin credentials to login to Control Hub and Webex Contact Center administration portal.

## **1. Webex Connect architecture**

Webex Connect consists of 2 main components, Connect and Engage, which are directly integrated with the Webex Contact Center platform (as per the drawing).  
The access to Webex Connect is restricted to Administrators only.

![Diagram
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

**Connect** serves as the entry point for all the messages received through any digital channel (email, chat, SMS, Messenger Facebook, WhatsApp) and as the intelligence for routing them. It hosts most of the configuration the Admin will create: flows, assets, bots, scheduled events and webhooks.  
The access to Connect happens via a dedicated URL which is generated and provided to the administrator at the time of the initial provisioning.  
Users in Connect are added and managed locally.

**Engage** serves as the host for media and agents. Agents which are configured in Webex Contact Center gets automatically synchronized with Engage. In CPaaS (the standalone version of Webex Connect) Engage provides a dedicated agent console solution, while with Webex Contact Center it leaves that control to the native Webex Agent Desktop. Within Engage the Admin can customize some cosmetics of each channel and create templated responses agents can select and use inside their Agent Desktop.  
The access to Engage happens via a dedicated icon inside the Webex Contact Center Management Portal.  
Users in Engage are automatically synchronized with Webex Control Hub.

## **2. Webex Connect Provisioning**

-   Go to https://admin.webex.com
-   Login with tenant administrator credentials
-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’

-   Verify under ‘Service Details’ > ‘Digital Channel’ is set to ‘IMI Digital’

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png)

_In case the ‘Digital Channel’ section prompts a different value you will need to reach out Cisco for support to get this setting corrected before proceeding further._

-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘Digital’

-   Select the button ‘Provision Digital Channels’

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)

-   Then select from the list of administrators the account who will become the Owner of the new Webex Connect Tenant > Click on ‘Select

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png)

-   Wait approximately 5 minute for the automated provisioning process to complete. After this time, the selected administrator will receive an activation email.

-   Open the email and click on ‘JOIN THE TEAM’

![Graphical user interface, application, Teams
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image005.png)

-   Follow the instructions to activate your account and set a local password.
-   Once the activation is completed you will access the Connect portal > bookmark the website URL

_For security reason, the activation is only valid for 24 hours since its delivery. Please activate your account immediately. In case you don’t receive the activation email, or not use it within 24 hours, will need to reach out Cisco for support._

## **3. Webex Connect Provisioning verification**

-   Go to https://admin.webex.com
-   Login with tenant administrator credentials
-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘Digital’

-   Verify Digital channels setup for Webex Contact Center is completed.

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image006.png)

-   Return to ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’ > ‘Advanced Configuration’ > Select ‘Go to Webex Contact Center Management Portal’ to cross launch to administration portal
-   In Administration portal, select ‘New Digital Channels’ to cross launch into the new component ‘Engage’

-   No additional login(or credentials) are required. The login to Engage portal should be seamless

![Graphical user interface, application, Teams
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image007.png)

-   In Engage portal, select Users > Search
-   Verify that users with Administrator and Premium Agent previleges are replicated with role type ‘Administrative’ and ‘Customer Care’ roles
-   Please note that the user account with which you have logged in will not show up in the engage user list. This is expected behaviour.

![Banner](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image008.jpg)

---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**



---


<p style="text-align:center"><strong>Congratulations, you have completed **ALL section**. Well done!!!</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

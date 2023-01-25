---
title: Lab 12 - Digital Channels
author: Davide Telari, Yurii Ulianov, Iranthi Ulluwishewa, David Ng, Naveen Kumar Narasimhan Almeti & Gajanan Pande.
date: 2022-12-12
layout: post 
---

This page is under developments

| Topic                                                                                                                        | Lab Type          | Dificulty Level | Estimated length |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------- | --------------- | ---------------- |
| [Architecture Overview and Provisioning](#lab121---architecture-overview-and-provisioning) | Read & Understand + Practical Lab     | EASY            | 15 min           |
| [Connect GUI overview](#lab122---connect-gui-overview) | Practical Lab     | EASY            | 15 min           |
| [Engage GUI overview](#lab123---) | Read & Understand | EASY            | 15 min           |
| [User Management in Connect](#lab124---) | Read & Understand | EASY            | 15 min           |
| [Digital Channels Pre-configuration](#lab125---) | Read & Understand | EASY            | 15 min           |
| [Flow Builder](#lab126---) | Read & Understand | EASY            | 15 min           |
| [Email Channel Configuration](#lab127---) | Practical Lab | EASY            | 15 min           |
| [Chat Channel Configuration](#lab128---) | Practical Lab | EASY            | 15 min           |
| [Facebook Messenger Channel Configuration](#lab129---) | Practical Lab | EASY            | 15 min           |
| [SMS Channel Configuration](#lab1210---) | Practical Lab | EASY            | 15 min           |
| [WhatsApp Channel Configuration](#lab1211---) | Practical Lab | EASY            | 15 min           |
| [Connect Templates](#lab1212---) | Practical Lab | EASY            | 15 min           |
| [Engage Templates](#lab1213---) | Practical Lab | EASY            | 15 min           |
| [Introduction to BOTs](#lab1214---) | Practical Lab | MID            | 15 min           |
| [Q&A BOTs](#lab1215---) | Practical Lab | MID            | 15 min           |
| [Task BOTs](#lab1216---) | Practical Lab | HARD            | 15 min           |
| [Event Scheduler](#lab1217---) | Practical Lab | MID            | 15 min           |
| [Inbound Webhooks](#lab1218---) | Practical Lab | HARD            | 15 min           |
| [Troubleshooting](#lab1219---) | Practical Lab | MID            | 15 min           |
| [Custom Nodes](#lab1220---) | Practical Lab | HARD            | 15 min           |
| [Events and Triggers](#lab1221---) | Practical Lab | MID            | 15 min           |
| [Flow and Global variables](#lab1222---) | Practical Lab | MID            | 15 min           |




# Lab.12.1 - Architecture Overview and Provisioning

## **Table of Contents**

| Topic                                                                                 | Lab Type | Dificulty Level | Estimated length |
| ------------------------------------------------------------------------------------- | -------- | --------------- | ---------------- |
| [Webex Connect architecture](#1-Webex-Connect-architecture)                           | Read & Understand         | EASY                | 5 min                 |
| [Webex Connect provisioning](#2-Webex-Connect-Provisioning)                           | Practical Lab         | EASY                | 5 min                 |
| [Webex Connect provisioning verification](#3-Webex-Connect-Provisioning-verification) | Practical Lab         | EASY                | 5 min                 |


## **Introduction**

#### **Lab Objective**

This lab is designed to introduce the audience to the digital channels (Webex Connect) platform, its architecture and its provisioning. In addition this lab will provide the instructions to verify if Webex Connect has been provisioned successfully.

#### **Pre-requisite**

1.  Admin credentials to login to Control Hub and Webex Contact Center administration portal.

## **1. Webex Connect architecture**

Webex Connect consists of 2 main components, Connect and Engage, which are directly integrated with the Webex Contact Center platform (as per the drawing).  
The access to Webex Connect is restricted to Administrators only.

![Architecture](/assets/images/DC_Architecture.png)

**Connect** serves as the entry point for all the messages received through any digital channel (email, chat, SMS, Messenger Facebook, WhatsApp) and as the intelligence for routing them. It hosts most of the configuration the Admin will create: flows, assets, bots, scheduled events and webhooks.  
The access to Connect happens via a dedicated URL which is generated and provided to the administrator at the time of the initial provisioning.  
Users in Connect are added and managed locally.

**Engage** serves as the host for media and agents. Agents which are configured in Webex Contact Center gets automatically synchronized with Engage. In CPaaS (the standalone version of Webex Connect) Engage provides a dedicated agent console solution, while with Webex Contact Center it leaves that control to the native Webex Agent Desktop. Within Engage the Admin can customize some cosmetics of each channel and create templated responses agents can select and use inside their Agent Desktop.  
The access to Engage happens via a dedicated icon inside the Webex Contact Center Management Portal.  
Users in Engage are automatically synchronized with Webex Control Hub.

## **2. Webex Connect provisioning**

-   Go to https://admin.webex.com
-   Login with tenant administrator credentials
-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’
-   Verify under ‘Service Details’ > ‘Digital Channel’ is set to ‘IMI Digital’

![Provisioning1](/assets/images/DC_Provisioning1.png)

> In case the ‘Digital Channel’ section prompts a different value you will need to reach out Cisco for support to get this setting corrected before proceeding further.

-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘Digital’
-   Select the button ‘Provision Digital Channels’

![Provisioning1](/assets/images/DC_Provisioning2.png)

-   Then select from the list of administrators the account who will become the Owner of the new Webex Connect Tenant > Click on ‘Select

![Provisioning1](/assets/images/DC_Provisioning3.png)

-   Wait approximately 5 minute for the automated provisioning process to complete. After this time, the selected administrator will receive an activation email.
-   Open the email and click on ‘JOIN THE TEAM’

![Provisioning1](/assets/images/DC_Invite.png)

-   Follow the instructions to activate your account and set a local password.
-   Once the activation is completed you will access the Connect portal > bookmark the website URL

> For security reason, the activation is only valid for 24 hours since its delivery. Please activate your account immediately. In case you don’t receive the activation email, or not use it within 24 hours, will need to reach out Cisco for support.

## **3. Webex Connect provisioning verification**

-   Go to https://admin.webex.com
-   Login with tenant administrator credentials
-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘Digital’
-   Verify Digital channels setup for Webex Contact Center is completed.

![Provisioning1](/assets/images/DC_Provisioned1.png)

-   Return to ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’ > ‘Advanced Configuration’ > Select ‘Go to Webex Contact Center Management Portal’ to cross launch to administration portal
-   In Administration portal, select ‘New Digital Channels’ to cross launch into the new component ‘Engage’
-   No additional login(or credentials) are required. The login to Engage portal should be seamless

![Provisioning1](/assets/images/DC_Provisioned2.png)

-   In Engage portal, select Users > Search
-   Verify that users with Administrator and Premium Agent previleges are replicated with role type ‘Administrative’ and ‘Customer Care’ roles
-   Please note that the user account with which you have logged in will not show up in the engage user list. This is expected behaviour.

![Provisioning1](/assets/images/DC_Provisioned3.png)

---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


# Lab.12.2 - Connect GUI overview

## **Table of Contents**

| Topic                                                             | Lab Type | Dificulty Level | Estimated length |
| ----------------------------------------------------------------- | -------- | --------------- | ---------------- |
| [Overview of Connect menu items](#Overview–of-Connect–menu-items) | Read & Understand         | EASY                | 15 min                 |


#### **Introduction**

This lab is designed to introduce the Connect interface, which is used for the configuration and orchestration of all digital channels. In this lab you will not find configuration steps, the goal is to understand the purpose and use of each menu item.

#### **Pre-requisite**

1.  Connect URL for browser access.
2.  Admin credentials to login to Connect administration portal.


## **Overview of Connect menu items**

Connect interface is divided in two main parts: the main menu on the left side and the configuration of the selected object in the center-right side.  
Move your mouse pointer on each icon of the menu to see its name and the available options. Click on the ‘>>’ icon in the left bottom of the menu to expand the menu and see the description of each item in addition to the shortcut icons.

This is the introduction video. It walks through the menu items and explains the purposes of each tab.

#### **1. Services**

Services are containers for all the flows the administrator will typically configure to orchestrate and route incoming messages from customers to agents. The administrators can create, name and arrange Services following their preferences.

-   After login into Connect, Services will be automatically selected. You can click on any of the existing services to explore their content. Use the search toolbar on the top to navigate and filter the available services when there are many.
-   To create your own service click on **SERVICES** > **CREATE NEW SERVICE** button. Please set the **SERVICE NAME** with a name of your choice.
-   You will be redirected to your service configuration. In the **DASHBOARD** tab, at the right bottom, you can see the traffic statistic per each channel, flow execution, and Messaging API statistic.
-   Click on a second tab **FLOWS** to see the list of all flows created for that service. You should not have any pre-built services right now.
-   Click on the **RULES** tab to see which triggers are configured for which flows. Again, there are no triggers right now.
-   Click on **API** tab. Here you can get the **SERVICE ID** and **SERVICE SECRET** which are needed for external applications which are using API that are meant to trigger flows within this service.
-   Click on the **SETTINGS** tab. Here you can rename or delete the service. You can add a description for better organization and even select the checkbox under ‘Service Locking’ so to prevent other users to apply any uncontrolled changes to it.

#### **2. Reports**

While the official platform for the Contact Center solution remains Analyzer, Connect offers the possibility to generate historical utilization reports for the existing flows.

-   Click on the next item in menu **REPORTS** > select the desired service in **ENTITY** (use the search bar on the top to navigate and filter the available services when there are many) > select one Channel (will collect data from all flows of the same kind) or one specific Flow > Select the desired Time Period > click on the “**GET REPORTS**” button. If there is no data, you will get a “No records found.” message. Later you can find here such data as numbers of Submitted, Rejected, Delivered, Read, and Failed messages.

#### **3. Assets**

Assets function as triggers and they are very similar to Entry Points in the Webex Contact Center Management Portal.

-   Go to the next item in menu **ASSETS** > **Numbers**. This will show you the list of SMS numbers added to the platform. SMS numbers are provided upon request by Cisco. Admin is not required to apply any configuration here.
-   Now click on **ASSETS** > **Apps**. This section allows the administrator to add and manage the ‘trigger’ for each channel (except SMS). Apps require dedicated configuration to function properly.
-   Click on next item **ASSETS** > **Integrations**. This section contains the list of all integrations configured for different events, which allow Connect to communicate with other components. By default, you will find two integrations: Webex CC Task (which allows Connect to communicate with the Webex Contact Center backend) and Webex CC Engage (which allows Connect to communicate with the Engage backend)

#### **4. Tools**

The Tools section contains several additional capabilities, but just few of them are commonly used.

-   Click on **TOOLS** > **Download SDKs**. Here you can download SDK if you want to build your own application.
-   Go to **TOOLS** > **Templates**. Here you can create new templated messages that will be triggered inside the desired flows so to programmatically respond to customers and collect the desired information.
-   Now go to **TOOLS >** **Export Logs**. This section allow the administrator to collect detailed logs for either Inbound or Outbound messages received/sent in a desired time frame. This option becomes very useful during troubleshooting. To consult the logs, select your Service name, select your Channel, time period, and click **DOWNLOAD** button. Wait few seconds for the report to be generated (the Status will change to ‘Ready for download’)

#### **5. Debug**

The Debug section is extremely useful when troubleshooting any ongoing issues. It offers the possibility to check some detailed information about incoming and outgoing messages, which can help the administrators to better understand what could be the root cause of occurring problems.

-   Click on **DEBUG**.
-   Use **Query by Transaction ID** when looking for a specific conversation (this ID is retrievable inside the flow designer, this will be covered in another lab).
-   Use **Query by Destination ID** when looking for outbound messages (typically from agent to customer) toward a specific destination (i.e. number, email, etc).
-   Use **Historical Log** for a more generic search, select the query Channel type and date range. Click on the **SEARCH** button and check if you have any data.

#### **6. Help**

The Help section provides access to the available documentation.

-   Go to the next menu item by clicking on **HELP** > **Documentation** which redirects to the Webex Connect documentation portal. All menu items are documented in that documentation.
-   Go to the second item in the **HELP** menu by clicking on **API Reference**. This will forward you to the API documentation portal.
-   Now switch to the **Change Log** item in the same menu. Here you can find the updates of the product.

#### **7. App Tray**

Use the App Tray to access advanced platform capabilities.

-   Click on the **APP TRAY** > **Bot Builder**. This will redirect you to the Bot Builder tool where you will create the bots to automate the customers interactions. This section is covered in detail in a dedicated lab.
-   Click on the **APP TRAY** > Event Scheduler. This will redirect you to the Scheduler tool where you will create the events and related schedule to programmatically trigger flows. This section is commonly used for outbound campaign on digital channels, and it’s covered in detail in a separated lab.

#### **8. Settings**

The Settings session allows the administrator to review and manage users and team settings. More details on user management will be provided in a dedicated lab.

-   Click on the next item **Settings** > **Profile Settings** and check the Profile settings.
-   Go to **SETTINGS** > **Tenant Settings** and verify the configured Time Zone and Date Format.
-   Open **SETTINGS** > **Usage** to see the general statistic of the entire tenant.
-   Click on the next item **SETTINGS** > **Contact Support**. Here you can check the support contact details in case you need to escalate any query.
-   Click on the next item **SETTINGS** > **Teammates**. From here you can add more users to Connect or change the permissions for existing users.
-   Go to **SETTINGS** > **Groups/Teams** where you can create a new group or team. Please refer to _“here”_ link to see the explanation of Groups and Teams.
-   As the final step click on the **Logout** in the **SETTINGS** menu and make sure that you are signed out from the Connect.

---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


# Lab.12.3 - Engage GUI overview

## **Table of Contents**

| Topic                                                           | Lab Type | Dificulty Level | Estimated length |
| --------------------------------------------------------------- | -------- | --------------- | ---------------- |
| [Overview of Engage menu items](#Overview-of-Engage-menu-items) | Read & Understand         | EASY                | 15 min                 |

## **Introduction**

#### **Lab Objective**

This lab is designed to introduce the Connect interface, which is used for the configuration and orchestration of all digital channels. In this lab you will not find configuration steps, the goal is to understand the purpose and use of each menu item.

#### **Pre-requisite**

1.  Admin credentials to login to Control Hub and Webex Contact Center administration portal.

## **Overview of Engage menu items**

Engage interface is divided in two main parts: the main menu on the left side and the configuration of the selected object in the center-right side.  
In addition, Engage has two different ‘portals’: the Admin portal (which is automatically loaded when logging-in) and the Customer Care portal. Both are accessible by clicking on the user icon on the top-right of the browser window.  
Move your mouse pointer on each icon of the menu to see its name and the available options.  
Within Engage not all the options in the menus are required to be known and used: this lab will cover the commonly used settings.      

This is the introduction video. It walks through the menu items and explains the purposes of each tab.

#### **1. Engage login**

-   In order to access Engage, login to Webex Control Hub > Navigate to ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’ > ‘Advanced Configuration’ > Select ‘Go to Webex Contact Center Management Portal’ to cross launch to administration portal
-   Once logged in, click on the ‘hamburger’ icon on left, go to the last section and click on ‘New Digital Channels’
-   You will be automatically redirected to the Engage portal on a new browser tab.

#### **2. Dashboard**

The Dashboard provides a real-time view of all the ongoing chats.

-   After login into Engage, Dashboard will be automatically selected. From the drop down menu on the top-right check the ‘Select All’ entry to display all the data available for all the agents.
-   Customize the views and filters in the dashboard as per your need to review the desired information.

#### **3. Settings**

Within the setting section the administrator can control if and which type of attachments can be exchanged in every channel.  
IMPORTANT: since Webex Connect is a PCI compliant application only text-based files are allowed to be transferred. In case a document contains images in addition to plain text, such document will be rejected and not attached to the conversation.

-   In case you decide to do not allow any files to be exchanged, toggle the green switch ‘Enable Attachment’ > Click the **Submit** button to save the changes.
-   If you would like to edit the support of attachments for a specific channel, click on the pencil icon under actions for your desired channel type > A pop-up window will appear > Edit the size and number of the attachments as needed > Add or Remove the extension type from the ‘Supported File Formats’ > Click the **OK** button to save the changes.

#### **4. Users**

The Users section lists all the licenses Contact Center Administrators and Agent users from Control Hub, except the user that is being used to login at that time.

-   Use the Role Type, Status or search bar to filter the list of users. The list will show if the agents are currently logged in and their role.
-   In case any user is missing, return to Control Hub and verify the proper license is assigned to it.

-   If the proper license is assigned > Temporarily remove the license to the affected user > Navigate to ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’ > Click on Synchronize Users > Return to the User and re-assign the license > Return to to ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’ > Click on Synchronize Users. The user will now re-appear in the Engage Users list.

#### **5. Assets**

Assets contains required and optional configuration for Assets and agents.

-   Select **Channel Assets** > here you will see all the Assets that are configured in Connect which are automatically synced with Engage. This section will be used especially for the Web Chat widget configuration.
-   Select **Templates** > here you can add and manage templated message the agents can select from their agent console to quickly reply to customers.

#### **6. Customer Care portal**

After logging into Engage Admin portal (from the Webex Contact Center Management Portal) click on the user icon on the top-right of the browser window and select Customer Care.

#### **6.1. Dashboard**

The Dashboard provides a real-time view of all the ongoing conversations and agents.

-   After login into Engage, Dashboard will be automatically selected.
-   You can retrieve and download a conversation transcript by searching for a specific conversation ID (such ID can be retrieved from Connect)

#### **6.2. Settings**

Within the setting section the administrator can control some additional useful settings.

-   Select **Settings** > **MANAGE** > **Template** > You will see the same templates configured on the Admin view
-   Select **Settings** > **MANAGE** > **Blocklist** > You can edit or add specific words which will be blocked from the conversation
-   Select **Settings** > **CONFIGURE** > **Working Hours** > You can edit the ‘named’ operating hours of your service. This setting will have an actual impact only on the Chat widget layout (more details provided in the dedicated lab).

---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


# Lab.12.4 - User Management in Connect

## **Table of Contents**

| Topic                                                                            | Lab Type | Dificulty Level | Estimated length |
| -------------------------------------------------------------------------------- | -------- | --------------- | ---------------- |
| [User Roles and Permissions](1-User-Roles–and-Permissions)                       | Read & Understand         | EASY                | 4 min                 |
| [Users organization](2-Users-organization)                                       | Read & Understand         | EASY                | 1 min                 |
| [Login to Connect portal](3-Login-to-Connect-portal)                             | Practical Lab         | EASY                | 1 min                 |
| [Add new users with administrator role](4-Add-new-users-with-administrator-role) | Practical Lab         | EASY                | 2 min                 |
| [New user activation](5-New-user-activation)                                     | Practical Lab         | EASY                | 2 min                 |

## **Introduction**

**Lab Objective**

This lab is designed to introduce the Connect User Management structure. Throughout this lab you will learn how to add new administrator users in Connect and how to arrange user accesses.

**Pre-requisite**

1.  Connect portal URL
2.  Tenant Owner credentials to login to IMI Connect portal

## **1. User Roles and Permissions**

Connect allows its administrators to add local users and set the with different level of permissions. Here below the list of available roles:

-   Owner - first configured users (is the account that has been indicated at the time of the provisioning of Webex Connect tenant). The Owner has full permissions in the tenant. Only 1 Owner can exist in a tenant.
-   Full Access – this is the most commonly used role for all other administrators that need access to Connect.
-   Limited Access
-   Read Only
-   Restricted

To review in details the permission assigned to each role please refer to the official documentation [https://help.imiconnect.io/docs/user-roles-and-hierarchy](https://help.imiconnect.io/docs/user-roles-and-hierarchy)

The Owner is the only role who can provide the permission to other users to Decrypt Log (which is an essential permission to view logs when troubleshooting).  
If an Owner leaves your organization, please reach out to your support contact the Partner Success team (PSM) to request the Owner change.  
Connect shall be accessed only by system administrators and not by agents or supervisors.

## **2. Users organization**

Connect allows the Owner to create local users in containers called **Groups** and **Teams**. Users created within a Group or a Team will be able to access the configuration created within such container and below, but not to the configuration created at levels above. Users can be create in one of the following containers:

-   Tenant level – can contain users and Groups
-   Group – can contain users and Teams
-   Team – can contain users only

## **3. Login to Connect portal**

-   Access Connect URL (this is specific to the tenant you are using)
-   Login the provided credentials

> Please contact the Partner Success team (PSM) if there are any challenges identifying the Connect Owner details

![UserLogin](assets/images/DC_Login.png)

## **4. Add new users with administrator role**

-   Once logged in to Connect, go to ‘Settings’ > ‘Teammates’
-   Add a new user (must be a working emailID) and select ‘Full access’ role and click ‘Invite user’

![AddUser](assets/images/DC_AddUser.png)

## **5. New user activation**

-   Click ‘Join the team’ link in the welcome email to complete user registration.
-   Provide your name and setup the passwords, click ‘Next’.
-   Fill out additional details about yourself and click ‘Next’.
-   The user will automatically login into the Connect portal.
-   The user will have to inform the tenant Owner about the successful creation of the account > the Owner will go to ‘Settings’ > ‘Teammates’ > click ‘Edit’ for the specified user > mark the checkbox for Decrypt Logs > click ‘Save’

![UserActivation](assets/images/DC_UserActivation.png)


---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


---
# Lab.12.7 Email Configuration
---

## Table of Contents
- [Step 1. Gmail account configuration](#step-1-gmail-account-configuration)
- [Step 2. Create Email Asset and Register to WebeXCC](#step-2-create-email-asset-and-register-to-webexcc)
- [Step 3. Email Entry Point and Queue creation](#step-3-email-entry-point-and-queue-creation)
- [Step 4. Create/Upload Email flow](#step-4-createupload-email-flow)
- [Verification: Send an Email and accept the task](#verification-send-an-email-and-accept-the-task)


## Introduction

#### Lab Objective

In this Lab, we will go through the tasks that are required to complete the basic email configuration. You will be able to initiate an email to the Contact Center and be able to accept/respond to the email by logging in as an agent.  

In this lab you will be configuring **Gmail** Account settings, Email Assets, Entry Point and corresponding workflows. All those steps are required for connecting the Email account with our application.  

#### Pre-requisite

1. You received an admin credentials to configure in Management Portal and Webex Connect.
2. You received Email account credentials.
3. You have successfully completed the previous Lab1 **Preconfiguration**.

#### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com)**\
> Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal)**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com)**\
> Gmail: **[https://mail.google.com](https://mail.google.com)**\
> Workflows: **[GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels)**\
> Webex Connect: https://cl1pod<ID\>.imiconnect.io/ (where \<ID\> is your POD number) 


# Lab Section

#### Configuration Order

![DC_Lab.12.7_Email_ConfigurationOrder](/assets/images/DC_Lab.12.7_Email_ConfigurationOrder.png)

## Step 1. Gmail account configuration
Starting from May 30 the **Less Secure Apps** feature was disabled on all Google accounts. As long as this setting was enabled, it was possible to send emails via Gmail SMTP. In this lab, we will be using new OAuth 2.0 authentication for outbound email functionality.

>**Note**: For this lab, we have created a Gmail account. Optionally, use your own account for polling and handling the emails. It can be a Gmail account or Office 365 account or any account which has email forwarding. The instructions below are applicable only for the Gmail accounts.


#### 1. Gmail forwarding activation (for incoming emails)

| **User email**                       |
| ------------------------------------ | 
| cl1webex**\<ID\>**@gmail.com   | 

> **Note:** Your \<ID\> was provided to you personally.  \<ID\> is the unique number equal to your POD.

- Login to the Gmail account with the credentials above [https://mail.google.com](https://mail.google.com). The password is the same as for Webex admin account. During first login select **Turn off smart features** 

- Enable POP3/IMAP setting by clicking on settings icon on top right corner and selecting **See all settings**.

![DC_Lab.12.7_Gmail_account_configuration_1](/assets/images/DC_Lab.12.7_Gmail_account_configuration_1.png)

- Now Click on **Forwarding and POP/IMAP**, enable the `POP Download` and `IMAP access` then click **Save Changes**.

![DC_Lab.12.7_Gmail_account_configuration_2](/assets/images/DC_Lab.12.7_Gmail_account_configuration_2.png)


#### 2. Create a project at Google API Console 
We need to activate API if we want to use Gmail account for outbound emails. 

- Login to [Google Developers Console](https://console.developers.google.com/) with the credentials above. The password is the same as for Webex Contact Center admin account.

- You will have to agree with the Terms of Service and pick their Country of residence. Then click **Select a project** and create a **NEW PROJECT**.

![DC_Lab.12.7_Create_new_project_at_Google_API_Console_1](/assets/images/DC_Lab.12.7_Create_new_project_at_Google_API_Console_1.png)

- Keep the default project's name and press **Create** at the bottom. Make sure that now you have selected this project. 

![DC_Lab.12.7_Create_new_project_at_Google_API_Console_2](/assets/images/DC_Lab.12.7_Create_new_project_at_Google_API_Console_2.png)

#### 3. Enable Gmail API (for outgoing emails)

- Enter `Gmail API` in the search bar and click on it once found.

![DC_Lab.12.7_Enable_Gmail_API_1](/assets/images/DC_Lab.12.7_Enable_Gmail_API_1.png)

- You need to enable the API for your project by clicking on **ENABLE** button.

![DC_Lab.12.7_Enable_Gmail_API_2](/assets/images/DC_Lab.12.7_Enable_Gmail_API_2.png)

#### 4. Configure OAuth Consent Screen and Scopes

- Once the API is enabled, you’ll be taken to a nice dashboard that says, `"To use this API, you may need credentials"`.

![DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_1](/assets/images/DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_1.png)

- To create an OAuth client ID, you must first configure your consent screen. Under the APIs and Services section, click on **OAuth Consent Screen**, set the user type as `External` and click **CREATE** button.

![DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_2](/assets/images/DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_2.png)

-  It will bring you to a page with many fields. Just enter the **App name** as `WebexCCEmails`, choose your **User support email** and enter the same email in the **Developer contact information**. In the end press **SAVE AND CONTINUE**.

![DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_3](/assets/images/DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_3.png)

- On the next screen, you need to provide Auth 2.0 Scopes for Google APIs. Click the **Add Or Remove Scopes** button and add https://www.googleapis.com/auth/gmail.send to the list of scopes since we only want to send emails from Gmail and not read any user data. Click **SAVE AND CONTINUE**.

![DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_4](/assets/images/DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_4.png)

- On the test user page, click **ADD USERS** and enter your Gmail address. Click **Save and Continue**.

![DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_5](/assets/images/DC_Lab.12.7_Configure_OAuth_Consent_Screen_and_Scopes_5.png)


#### 5. Credentials and authentication with OAuth 2.0

Now create a new client ID that will be used to identify your application to Google’s OAuth servers.

- In the APIs & Services section, click on **Credentials** and then pick **OAuth client ID** from the drop-down list of the **CREATE CREDENTIALS** button. 

![DC_Lab.12.7_Credentials_and_authentication_with_OAuth_2.0_1](/assets/images/DC_Lab.12.7_Credentials_and_authentication_with_OAuth_2.0_1.png)

- Select `Web application` in the **Application type**

- You can leave the default name. The name of your OAuth 2.0 client is only used to identify the client in the Google Cloud console and will not be shown to application users. 

- In the **Authorized redirect URIs** section click **ADD URI** button and set `https://cl1pod\<ID\>.imiconnect.io/callback` where \<ID\> is your tenant number. Click **CREATE** button in the end.

![DC_Lab.12.7_Credentials_and_authentication_with_OAuth_2.0_2](/assets/images/DC_Lab.12.7_Credentials_and_authentication_with_OAuth_2.0_2.png)

- Download a JSON file with your credentials – you’ll need it later.

![DC_Lab.12.7_Credentials_and_authentication_with_OAuth_2.0_3](/assets/images/DC_Lab.12.7_Credentials_and_authentication_with_OAuth_2.0_3.png)


## Step 2. Create Email Asset and Register to WebexCC

#### 1. Create Email Asset

- As an admin, login to Webex Connect UI using the provided URL https://cl1pod**\<ID\>**.imiconnect.io/ (where **\<ID\>** is your POD number).

- Select **Assets** -> **Apps** -> **CONFIGURE NEW APP** -> **Email**.

![DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC](/assets/images/DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC_1.gif)

- Set the settings according to the table below:

| **Entity**          | **Name** |
| ------------------- | -------- |
| Asset Name | EmailAsset   |
| Email ID   | cl1webex**\<ID\>**@gmail.com  |
| Authentication Type | OAuth 2.0   |
| SMTP Server  | smtp.gmail.com |
| Username     | cl1webex**\<ID\>**@gmail.com |
| Port     | 465 |
| Security     | SSL |
| Client ID | \<client_id from JSON file\>   |
| client Secret | \<client_secret from JSON file\>    |
| Authorization URL | https://accounts.google.com/o/oauth2/auth |
| Scope | https://mail.google.com/ https://www.googleapis.com/auth/gmail.send |
| Access Token URL | https://oauth2.googleapis.com/token |
| Refresh Token URL | [https://accounts.google.com/o/oauth2/auth](https://accounts.google.com/o/oauth2/auth) |

> where \<ID\> is your POD ID

- Click **GENERATE TOKEN** and follow the step on the screenshot:

![DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC](/assets/images/DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC_2.gif)

- Verify that the **ACCESS TOKEN** and **REFRESH TOKEN** are generated and click **SAVE**.

![DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC](/assets/images/DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC.png)

- Click on **REGISTER TO WEBEX CC** and Select the service **My First Service**. In the end click **REGISTER**.

![DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC](/assets/images/DC_Lab.12.7_Create_Email_Asset_and_Register_to_WebexCC_3.gif)

#### 2. Add forwarding Address

- Copy the forwarding address from the created asset in previous step and in Gmail account. 
 
![DC_Lab.12.7_Add_forwarding_Address_1](/assets/images/DC_Lab.12.7_Add_forwarding_Address_1.png)

- Go back to the Gmail account and click on settings icon on top right corner -> Select **See all settings**.

![DC_Lab.12.7_Add_forwarding_Address_2](/assets/images/DC_Lab.12.7_Add_forwarding_Address_2.png)

- Click on **Forwarding and POP/IMAP** -> click on **Add a forwarding address** -> Paste the copied forwarding address from the created asset. Then click on **Next**. In a new pop up tab click **Proceed** and then click **OK** when it prompts.

![DC_Lab.12.7_Add_forwarding_Address_3](/assets/images/DC_Lab.12.7_Add_forwarding_Address_3.gif)

- Go back to Webex Connect and click on **Tools** -> **Export Logs**. 

- Under Inbound logs, Select the App that was created -> Select Channel Event as `Incoming Email` -> Select the period as `Today`. Wait until status is changed to **Ready for download** and click **Download** icon. 

![DC_Lab.12.7_Add_forwarding_Address_4](/assets/images/DC_Lab.12.7_Add_forwarding_Address_4.gif)

- Once a log file is downloaded, open the log file, under the **Subject** column, copy the confirmation code. 

![DC_Lab.12.7_Add_forwarding_Address](/assets/images/DC_Lab.12.7_Add_forwarding_Address_5.png)

- Go back to the Gmail account, paste the code in the email account verification section and click verify.

![DC_Lab.12.7_Add_forwarding_Address](/assets/images/DC_Lab.12.7_Add_forwarding_Address_6.png)

- Select **Forward a copy of incoming mail to** the verified address and click **Save Changes**.

![DC_Lab.12.7_Add_forwarding_Address](/assets/images/DC_Lab.12.7_Add_forwarding_Address_7.png)

## Step 3. Email Entry Point and Queue creation

#### 1. Create Entry Point in Management Portal 

- Click on **_Provisioning_** and select **_Entry Points/Queues_** > **_Entry Point_**.

- Click on `New Entry Point`.

- Input **_Name_** as `Email_EP`.

- Select `Email` in the **_Channel Type_** section.

- Leave the **_Asset Name_** as appeared value `EmailASSET`.

- Set **_Service Level Threshold_** as `2` hours.

- The **_Time Zone_** can stay as default value.

- Click on **Save** after comparing your values with the screenshot below.

![DC_Lab.12.7_Email_Entry_Point_and_Queue_creation](/assets/images/DC_Lab.12.7_Email_Entry_Point_and_Queue_creation_1.png)

#### 2. Create Two Queues in Management Portal 

- Click on **_Provisioning_** and select **_Entry Points/Queues_** > **_Queue_**.

- Click on `New Queue`.

- Input **_Name_** as `Email_Q`.

- Select `Email` in the **_Channel Type_** section.

- Leave the **_Queue Routing Type_** as default value `Longest Available Agent`.

- In the **_Email Distribution_** click on **Add Group** and select `Team1`.

- Set **_Service Level Threshold_** as `2` hours.

- Set **_Maximum Time in Queue_** as `3` hours.

- The **_Time Zone_** can stay as default value.

- Click on **Save** after comparing your values with the screenshot below.

![DC_Lab.12.7_Email_Entry_Point_and_Queue_creation](/assets/images/DC_Lab.12.7_Email_Entry_Point_and_Queue_creation_2.png)

- Create a second queue by repeating the same steps as above.

- Input **_Name_** as `Email_Q2`.

- Select `Email` in the **_Channel Type_** section.

- In the the **_Email Distribution_** click on **Add Group** and select `Team2`.

![DC_Lab.12.7_Email_Entry_Point_and_Queue_creation](/assets/images/DC_Lab.12.7_Email_Entry_Point_and_Queue_creation_3.png)

## Step 4. Create/Upload Email flow

- Download the email flow from the [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels).

- Navigate to **Webex Connect Flows** -> **v2.1** -> **Email Inbound Flow.workflow.zip**, select the zip file and click download.

- Unzip the downloaded file.

- Go to Webex Connect, click on **Services** and select the service in which the Asset is created in step 2. It should be **My First Service**

- In the service click on **FLOWS** -> **CREATE FLOW** .

- Enter the **FLOW NAME** as **Email Inbound Flow**, select the **TYPE** as **Work Flow** and under **METHOD** select **Upload a flow**.

- Drag and drop the **Email Inbound Flow.workflow** flow that is downloaded in zip file, click **CREATE** and then click **SAVE**.

![DC_Lab.12.7_Create-Upload_Email_flow](/assets/images/DC_Lab.12.7_Create-Upload_Email_flow_1.png)

- Click **Save** and in the created workflow find the **Queue Task**, click twice, select the **QUEUE NAME** as **Email_Q** and click on **SAVE**.

![DC_Lab.12.7_Create-Upload_Email_flow](/assets/images/DC_Lab.12.7_Create-Upload_Email_flow_2.png)

- Click **Settings** on top right corner and switch to **Custom variables** tab. Here in the **bizemailid** row, update the default value with your email address of the Gmail account. Click **SAVE**.

![DC_Lab.12.7_Create-Upload_Email_flow](/assets/images/DC_Lab.12.7_Create-Upload_Email_flow_3.png)

- Finally click on Make Live on top right corner -> Select the Application/Asset that we have created and click Make Live.

![DC_Lab.12.7_Create-Upload_Email_flow](/assets/images/DC_Lab.12.7_Create-Upload_Email_flow_4.png)

[To top of this lab](#table-of-contents)

## Verification: Send an Email and accept the task

- Go to personal email account and send an email to the support email address that was initially configured in the Email Asset.

- Go to the Agent Desktop and make the agent Available. 

![DC_Lab.12.7_Verification_-_Send_an_Email_and_accept_the_task](/assets/images/DC_Lab.12.7_Verification_-_Send_an_Email_and_accept_the_task_1.png)

- The Email will be offered to the agent. Click **Accept** to handle the email. Click "Reply" or Reply All" to the email and hit send button.

![DC_Lab.12.7_Verification_-_Send_an_Email_and_accept_the_task](/assets/images/DC_Lab.12.7_Verification_-_Send_an_Email_and_accept_the_task_2.png)

- Add wrap up and close the task.



---
# Lab.12.8 Chat Configuration
---

## Introduction

#### Lab Objective

In this Lab, we will go through the tasks that are required to complete the basic web chat configuration. You will be able to initiate a chat to the Contact Center and be able to accept/respond to the chat by logging in as an agent. 

We will be configuring Service, Chat Assets, Entry Point, Queue, Chat Template, Website Settings, and corresponding workflows.

#### Pre-requisite

1. Webex CC Portal, Agent Desktop and Webex Connect URL.
2. Admin credentials to complete configurations in Webex CC portal and Webex Connect.
3. Agent Credentials to handle the Chat.

## Step 1. Create Chat Asset

#### 1. \[Optional\] Create a service 

>**Note**: This step should be performed only if **_My First Service_** service does not exist in Webex Connect.

-  Log into Webex Connect UI using provided URL **_https://cl1pod\<ID\>.imiconnect.io/_** (where **\<ID\>** is your POD number).

-  Go to **_Services_** and press **_Create New Service_** button ar the right top corner.

-  Input the name **`My First Service`** and press **_Create_** button.

![DC_Lab.12.8_Create_Service](/assets/images/DC_Lab_12.8._Create_Service.png)

#### 2. Chat Asset configuration and Register to Webex CC in Webex Connect

-  Log into Webex Connect UI.

-  Go to **_Assets_** -> **_Apps_**, press **_Configure New App_** and select **_Mobile / Web_** option.

![DC_Lab.12.8_Create_Asset_1](/assets/images/DC_Lab_12.8._Create_Asset_1.png)

-  Input **_Name_** as **`ChatAsset`**.

-  Toggle/enable **_Live Chat / In-AppMessaging_** to **_ON_** and choose **_Primary Transport Protocol_** as **`MQTT`** & **_Secondary Transport Protocol_** as **`Web Socket`** then tick **_Use Secured Port_** checkbox and press **_Save_** button.

>**Note**: If there is an error that your request cannot be processed, please press **_Save_** button one more time.

![DC_Lab.12.8_Create_Asset_2](/assets/images/DC_Lab_12.8._Create_Asset_2.png)

-  Once asset is saved, press **_Register To Webex Engage_** at the top, choose **_My First Service_** service from the drop-down list and press **_Register_** button.

![DC_Lab.12.8_Create_Asset_3](/assets/images/DC_Lab_12.8._Create_Asset_3.png)

-  Check and make sure the asset has been succesfully registered to the service and  **_Register To Webex Engage_** button has been greyed out.

![DC_Lab.12.8_Create_Asset_4](/assets/images/DC_Lab_12.8._Create_Asset_4.png)

### 3. Create Entry Point for Chat

-  Log into Webex CC Management Portal URL with the credentials and access the menu **_Provisioning_** -> **_Entry Point/Queues_** -> **_Entry Point_**.

-  Press **_New Entry Point_** button.

![DC_Lab.12.8_Create_Entry_Point_1](/assets/images/DC_Lab_12.8._Create_Entry_Point_1.png)

-  Input **_Name_** as **`Chat_EP`**.

-  Select **`Chat`** from the **_Channel Type_** drop-down list.

-  Select **`ChatAsset`** as an **_Asset Name_**.

-  Set **_Service Level Threshold_** as **`7200`** seconds (2 hours).

-  The **_Time Zone_** can stay as default value.

-  Click on **Save** after comparing your values with the screenshot below.

![DC_Lab.12.8_Create_Entry_Point_2](/assets/images/DC_Lab_12.8._Create_Entry_Point_2.png)

### 4. Create Queue for Chat

-  On Webex CC Management Portal access the menu **_Provisioning_** -> **_Entry Point/Queues_** -> **_Queue_**.

-  Click on **_New Queue_**.

![DC_Lab.12.8_Create_Queue_1](/assets/images/DC_Lab_12.8._Create_Queue_1.png)

-  Input **_Name_** as **`Chat_Q`**.

-  Select **`Chat`** in the **_Channel Type_** section.

-  Leave the **_Queue Routing Type_** as default value **`Longest Available Agent`**.

-  In the **_Chat Distribution_** click on **_Add Group_** and select `Team1`.

![DC_Lab.12.8_Create_Queue_2](/assets/images/DC_Lab_12.8._Create_Queue_2.png)

-  Set **_Service Level Threshold_** as **`7200`** seconds (2 hours).

-  Set **_Maximum Time in Queue_** as **`10800`** seconds (2 hours).

-  The **_Time Zone_** can stay as default value.

-  Click on **Save** after comparing your values with the screenshot below.

![DC_Lab.12.8_Create_Queue_3](/assets/images/DC_Lab_12.8._Create_Queue_3.png)

### 5. Create Chat Template

-  Login to Webex Connect UI.

-  Go to **_Tools_** -> **_Templates_** and press **_Add new Template_** button.

![DC_Lab.12.8_Create_Template_1](/assets/images/DC_Lab_12.8._Create_Template_1.png)

-   Provide **_Name_** as **`Chat_Template`** and choose **_Channel_** as **_Live Chat / In-App Messaging_**

-   Select **_Message Type_** as **_Form_**.

-   Provide the **_Title_** as **`Welcome to Webex CC Chat`** and this will be the welcome message.

-   Click on **_Add Field_** and add ***First Name*** field with the following parameters into the form:

| **Parameter Name**  | **Parameter Value** |
| --------------- | --------------- |
| Type            | Text            |
| Name            | firstName       |
| Label           | First Name      |
| Mandatory Field | On              |

![DC_Lab.12.8_Create_Template_2](/assets/images/DC_Lab_12.8._Create_Template_2.png)

-   Click on **_Add Field_** and add ***Last Name*** field with the following parameters into the form:

| **Parameter Name**  | **Parameter Value** |
| --------------- | --------------- |
| Type            | Text            |
| Name            | lastName        |
| Label           | Last Name       |
| Mandatory Field | On              |

![DC_Lab.12.8_Create_Template_3](/assets/images/DC_Lab_12.8._Create_Template_3.png)

-   Click on **_Add Field_** button and add ***Email*** field with the following parameters into the form:

| **Parameter Name**  | **Parameter Value** |
| --------------- | --------------- |
| Type            | Email           |
| Name            | email           |
| Label           | Email           |
| Mandatory Field | On              |

![DC_Lab.12.8_Create_Template_4](/assets/images/DC_Lab_12.8._Create_Template_4.png)

-   Click on **Save** after comparing your values with the screenshot below.

![DC_Lab.12.8_Create_Template_5](/assets/images/DC_Lab_12.8._Create_Template_5.png)



---
# Lab.12.9 Facebook Messenger Configuration
---


# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
    - [Lab Objective](#lab-objective)
    - [Pre-requisite](#pre-requisite)
    - [Quick Links](#quick-links)
- [Lab Section](#lab-section)
  - [Step 1 Facebook Page configuration](#step-1-facebook-page-configuration)
  - [Step 2. Facebook Messenger Asset creation & register to Webex CC](#step-2-facebook-messenger-asset-creation--register-to-webex-cc)
  - [Step 3. Create Entry Point and Queue](#step-3-create-entry-point-and-queue)
    - [1. Create Entry Point in Management Portal](#1-create-entry-point-in-management-portal)
    - [2. Create Queue in Management Portal](#2-create-queue-in-management-portal)
  - [Step 4. Create/Upload Facebook Messenger flow](#step-4-createupload-facebook-messenger-flow)
    - [1. Initial flow loading](#1-initial-flow-loading)
    - [2. Start node and Custom Variables](#2-start-node-and-custom-variables)
    - [3. Edit Queue Task node](#3-edit-queue-task-node)
  - [Step 5. Verification - start Facebook Chat and accept the request](#step-5-verification---start-facebook-chat-and-accept-the-request)
  - [Back to top](#back-to-top)
    - [Congratulations, you have completed this section!](#congratulations-you-have-completed-this-section)


# Introduction

#### Lab Objective

In this Lab, we will go through the tasks that are required to complete the basic Facebook Messenger (FBM) integration. You will be able to initiate a Facebook contact to the Contact Center from Facebook Messenger and be able to accept/respond to the contact by logging in as an agent.  

In this lab you will be configuring Service, Chat Assets, Entry Point, Queue, Chat Template, Website Settings, and corresponding workflows.


#### Pre-requisite

1. You received an admin credentials to configure in Management Portal and Webex Connect.
2. You have successfully completed the previous Lab **Preconfiguration**
3. You have a Facebook Account

#### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com)**\
> Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal)**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com)**\
> Workflows: **[GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels)**\
> Connect: https://cl1pod**\<ID\>**.imiconnect.io/ (where **\<ID\>** is your POD number)

# Lab Section

## Step 1 Facebook Page configuration

- Customer/Partner should have a Facebook account to create a Facebook Business page

- Login to Facebook and create a business page that can be used in Webex Contact Center for polling and handling the messenger chats Additional details of Facebook page setup is available here: [Facebook Business page setup](https://www.facebook.com/business/pages/set-up)

- Click on `Create a Page` button

![DC_Lab_12.9_Facebook_Page_configuration](/assets/images/DC_Lab_12.9_Facebook_Page_configuration1.jpg)

- If you are logged in already to Facebook, you will be presented with the Business Page creation tool. Simply give the page a Name and a Category then Click `Create Page` button

![DC_Lab_12.9_Facebook_Page_configuration](/assets/images/DC_Lab_12.9_Facebook_Page_configuration2.jpg)

[Back to top](#table-of-contents)

## Step 2. Facebook Messenger Asset creation & Register to Webex CC

- Login to your respective Webex Connect UI using the provided URL https://cl1pod**X**.imiconnect.io/ (where **X** is your POD number).

- Navigate to `Assets` > `Apps` > `Configure New App` > `Messenger` and Click on `Add Messenger Page` button

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC1.gif)

- If you haven't done already, authenticate with your FB account where you have a page already created. Then select the respective page that you want to integrate

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC2.jpg)

- Accept all default permissions

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC3.jpg)

- That completes the linking of the Facebook connect with Webex Connect

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC4.jpg)

- Finally select the Business Page you want to link to the Asset

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC5.jpg)

-  Provide the name and click `Save`

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC6.jpg)

-  Click `Register to Webex Engage`  in the ‘Configure New App-Messenger’ window ->  In the resulting window select the service and click `Register`.

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC7.jpg)

- Confirm that registration with Webex CC completed successfully

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC8.jpg)

- Scroll down and take note of the M.Me link in the `Page Discovery Addons` section. We will use that link to trigger the Facebook Messenger interaction from the Customer end. Also take note of the numeric string parameter in the M.Me link. That's the `Facebook Page ID` which we will also need later when configuring the flow.

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC9.jpg)

- Click on the back arrow to go back to the list of Assets Apps. Then take note of the application ID (app id) we just created. We will also need that app ID in the flow

![DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC](/assets/images/DC_Lab_12.9_Facebook_Messenger_Asset_creation_&_register_to_Webex_CC10.jpg)

[Back to top](#table-of-contents)

## Step 3. Create Entry Point and Queue

#### 1. Create Entry Point in Management Portal 

- Click on **_Provisioning_** and select **_Entry Points/Queues_** > **_Entry Point_**.

- Click on `New Entry Point`.

- Input **_Name_** as `FBM_EP`.

- Select `Social Channel` in the **_Channel Type_** section.

- Select `Facebook Messenger` in the **_Social Channel Type_** section.
- 
- Leave the **_Asset Name_** as the configured value earlier.

- The **_Time Zone_** can stay as default value.

- Click on **Save** after comparing your values with the screenshot below.

![DC_Lab_12.9_Create_Entry_Point_and_Queue](/assets/images/DC_Lab_12.9_Create_Entry_Point_and_Queue1.jpg)

#### 2. Create Queue in Management Portal 

- Click on **_Provisioning_** and select **_Entry Points/Queues_** > **_Queue_**.

- Click on `New Queue`.

- Input **_Name_** as `FBM_Q`.

- Select `Social Channel` in the **_Channel Type_** section.

- Set Queue Routing Type to Longest Available Agent

- Click `Add Group` in the **_Conversation distribution_** section.

- Select the Agent based teams created in the previous lab and click `Save` . Once saved, click `Close` to exit this window. 

- Input **_Maximum Time in Queue_** as `300`.

- The **_Time Zone_** can stay as default value.

- Click on **Save** after comparing your values with the screenshot below.

![DC_Lab_12.9_Create_Entry_Point_and_Queue](/assets/images/DC_Lab_12.9_Create_Entry_Point_and_Queue2.jpg)

[Back to top](#table-of-contents)

## Step 4. Create/Upload Facebook Messenger flow

#### 1. Initial flow loading

- Download the default Facebook Inbound flow from the [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels).

- Navigate to **Webex Connect Flows** -> **v2.1** -> **Facebook Inbound Flow.workflow.zip**, select the zip file and click download.

- Unzip the downloaded file.

- Go to Webex Connect, click on **Services** and select the service in which the Asset is created in step 2. It should be **My First Service**

- In the service click on **FLOWS** -> **CREATE FLOW** .

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow1.jpg)

- Enter the **FLOW NAME** as **FBM Inbound Flow**, select the **TYPE** as **Work Flow** and under **METHOD** select **Upload a flow**.

- Drag and drop the **Facebook Inbound Flow.workflow** flow file that you unzipped, click **CREATE** and then click **SAVE**.

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow2.jpg)

#### 2. Start node and Custom Variables

- A page will load with the imported workflow. We must make some changes to the default inbound flow based on our setup.
  
- First Click `Save` in the `Configure APP Event` page that loaded, this defines what will trigger the flow and the default settings are already good.

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow3.jpg)

- Click on the gear button on the top right to load the flow settings dialog

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow4.jpg)

- Select the Custom Variables tab and set the following Default Values:

*FBPageID*: to the numeric string in the M.Me link we saved earlier in Step 2.
*appid*: Application ID (appID) from the FBM Asset from Step 2

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow5.jpg)

- Click `Save`

#### 3. Edit Queue Task node

- In the created workflow find the **Queue Task**, click twice, select the **QUEUE NAME** as **FBM_Q** and click on **SAVE**.

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow6.jpg)

- Finally click on Make Live on top right corner
  
![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow7.jpg)

- Select the Application/Asset that we have created and click `Make Live`.

![DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow](/assets/images/DC_Lab_12.9_Create-Upload_Facebook_Messenger_flow8.jpg)

- Wait for 2 minutes and verify that the flow is published successfully.

[Back to top](#table-of-contents)

## Step 5. Verification - start Facebook Chat and accept the request

- Open a new tab and login to the Agent Desktop if you haven't done already and make the agent Available (if you haven't done already in Lab2). 

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request1.png)

- Open a new tab on the same browser session to make sure you are still authenticated to Facebook. Go to the M.Me URL you copied in Step 2 and the following FBM page should load with the Facebook Business page chat you created earlier

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request2.jpg)

- Start chatting and that should trigger a contact into Webex Contact Center that will get routed according to the flow we configured in Step 4. A notification should appear that should help you switch to the agent desktop tab to accept the contact

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request3.jpg)

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request4.jpg)

- Type a response and hit send button.

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request5.jpg)

- Response will be received in the other tab where the FBM page is:

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request6.jpg)

- End the contact

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request7.jpg)

- Add wrap up and close the task. 

![DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request](/assets/images/DC_Lab_12.9_Verification_-_start_Facebook_Chat_and_accept_the_request8.jpg)



---
# Lab.12.11 WhatsApp Configuration


# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
    - [Lab Objective](#lab-objective)
    - [Pre-requisite](#pre-requisite)
- [Lab Section](#lab-section)
  - [Step 1. Verify WhatsApp Number Assignment](#step-1-verify-WhatsApp-number-assignment)
  - [Step 2. WhatsApp Asset registration to WebexCC](#step-2-WhatsApp-asset-registration-to-webexcc)
  - [Step 3. WhatsApp Entry Point and Queue creation](#step-3-WhatsApp-entry-point-and-queue-creation)
  - [Step 4. Create/Upload WhatsApp flow](#step-4-createupload-WhatsApp-flow)
  - [Verification - send WhatsApp message and accept the request](#verification---send-WhatsApp-message-and-accept-the-request)
  - [Back to top](#back-to-top)
    - [Congratulations, you have completed this section!](#congratulations-you-have-completed-this-section)
 
# Introduction

#### Lab Objective

In this Lab, we will go through the tasks that are required to complete the basic WhatsApp integration. You will be able to initiate a WhatsApp contact to the Contact Center and be able to accept/respond to the contact by logging in as an agent.  

In this lab you will be configuring **WhatsApp** number settings, Assets, Entry Point and corresponding workflows. All these steps are required for integrating WhatsApp with our application.  

#### Pre-requisite

1. You received an admin credentials to configure in Management Portal and Webex Connect.
2. You received the WhatsApp number associated with your tenant.
3. You have successfully completed the previous Lab **Preconfiguration**
4. **Note**: WhatsApp Numbers cannot be procured directly from the Webex Contact Center integrated Webex Connect tenant. For production use, please note that customers will have to work with Partners to go through a procurement process to enable WhatsApp and get numbers assigned to the tenant.

# Lab Section

## Step 1. Verify WhatsApp Number Assignment

- Login to your respective Webex Connect UI using the provided URL https://cl1pod**X**.imiconnect.io/ (where **X** is your POD number).

- Navigate to Assets > App and verify that the tenant you are using has a SMS number assigned 

![DC_Lab_12.11_Verify_Whatsapp_Number_Assignment](/assets/images/DC_Lab_12.11_Verify_Whatsapp_Number_Assignment1.png)


- Identify and make note of the APP ID (We will need this later in the flow configuration)

![DC_Lab_12.11_Verify_Whatsapp_Number_Assignment](/assets/images/DC_Lab_12.11_Verify_Whatsapp_Number_Assignment2.png)

- Select actions and click **Manage**

![DC_Lab_12.11_Verify_Whatsapp_Number_Assignment](/assets/images/DC_Lab_12.11_Verify_Whatsapp_Number_Assignment3.png)

- Identify and make a note of the **Number** and **WABA ID** (We will need this later in the flow configuration)

![DC_Lab_12.11_Verify_Whatsapp_Number_Assignment](/assets/images/DC_Lab_12.11_Verify_Whatsapp_Number_Assignment4.png)

## Step 2. WhatsApp Asset registration to WebexCC

- In the WhatsApp number assigned, under actions select the 'Manage' option 

![DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC1](/assets/images/DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC1.png)

- Click 'Register to WebexCC option' 

![DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC1](/assets/images/DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC2.png)

- In the resulting window, select a service under which this asset would be managed

![DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC1](/assets/images/DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC3.png)

- Verify that the 'Register to Webex CC' option is now disabled and there is a message indicating the time when the asset was registered along with the service to which it is assigned. 

![DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC1](/assets/images/DC_Lab_12.11_Whatsapp_Asset_registration_to_WebexCC4.png)

## Step 3. WhatsApp Entry Point and Queue creation

- Login to Webex Contact Centre administration portal 

- Click on **_Provisioning_** and select **_Entry Points/Queues_** > **_Entry Point_**.

- Click on `New Entry Point`.

![DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation](/assets/images/DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation1.jpg)

- Input **_Name_** as `WhatsApp_EP`.

- Select `Social Channel` in the **_Channel Type_** section.

- Select `WhatsApp` in the **_Social Channel Type_** section.

- Leave the **_Asset Name_** as appeared value `WhatsApp Asset assigned in your Connect tenant`.

- The **_Time Zone_** can stay as default value.

- Click on **Save** after comparing your values with the screenshot below.

![DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation](/assets/images/DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation2.png)

- Click on **_Provisioning_** and select **_Entry Points/Queues_** > **_Queue_**.

- Click on `New Queue`.

![DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation](/assets/images/DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation3.jpg)

- Input **_Name_** as `WhatsApp_Queue`.

- Select `Social Channel` in the **_Channel Type_** section.

- Click `Add Group` in the **_Conversation distribution_** section.

![DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation](/assets/images/DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation4.png)

- Select the Agent based teams created in the previous lab and click `Save` . Once saved, click `Close` to exit this window. 

![DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation](/assets/images/DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation5.png)

- Input **_Maximum Time in Queue_** as `300`.

- The **_Time Zone_** can stay as default value.

- Click on **Save** after comparing your values with the screenshot below.

![DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation](/assets/images/DC_Lab_12.11_Whatsapp_Entry_Point_and_Queue_creation6.png)

## Step 4. Create/Upload WhatsApp flow

- Download the WhatsApp flow from the [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels).

- Navigate to **Webex Connect Flows** -> **v2.1** -> **WAB Inbound Flow.workflow.zip**, select the zip file and click download.

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow1.png)

- Unzip the downloaded file.

- Go to Webex Connect, click on **Services** and select the service in which the Asset is created in step 2. It should be **My First Service**

- In the service click on **FLOWS** -> **CREATE FLOW** 

- Enter the **FLOW NAME** as **WhatsApp Inbound Flow**, select the **TYPE** as **Work Flow** and under **METHOD** select **Upload a flow**.

- Drag and drop the **WAB Inbound Flow.workflow** flow that is downloaded in zip file, click **CREATE**

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow2.png)

- Once the flow is saved, the 'Configure WhatsApp Event' node will open. Select incoming message as trigger and click **Save**

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow3.png)

- Open Custom variables and update the value for **WANumber** , **WANumber_Countrycode** and **appid** (These are the values that were identified in Step-1)

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow4.png)

- In the created workflow find the **Queue Task**, click twice, select the **QUEUE NAME** as **WhatsApp_Queue** and click on **SAVE**.

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow5.png)

- Finally click on Make Live on top right corner and click Make Live.

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow6.png)

- Wait for 2 minutes and verify that the flow is published successfully. 

![DC_Lab_12.11_Create-Upload_Whatsapp_flow](/assets/images/DC_Lab_12.11_Create-Upload_Whatsapp_flow7.png)

[To top of this lab](#table-of-contents)

## Verification - send WhatsApp message and accept the request

- Login to the Agent Desktop and make the agent Available. 

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request1.png)

- In your personal mobile phone, add the WhatsApp number configured in the previous step as a new contact. (The screenshot is for reference. Please use the number assigned to your pod)

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request2.png)

- Open WhatsApp and look up the contact created in the previous step

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request3.png)

- Send a message to the contact identified in the previous step to initiate the conversation. 

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request4.png)

- The WhatsApp contact will be offered to the agent. Click "Accept" to handle the contact.

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request5.png)

- Type a response and hit send button.

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request6.png)

- End the contact

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request7.png)

- Add wrap up and close the task. 

![DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request](/assets/images/DC_Lab_12.11_Verification_-_send_Whatsapp_message_and_accept_the_request8.png)






# Lab.12.5 - Digital Channel required configuration

## Table of Contents

| Topic                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------- |
| [Configuring your Tenant](#Configuring-your-Tenant)                                                               |
| [Node Authorization for Webex CC Task and Engage nodes](#1-Node-Authorization-for-Webex-CC-Task-and-Engage-nodes) |
| [Download and upload CA flows in Connect](#2-Download-and-upload-CA-flows-in-Connect)                             |
|                                                                                                                   |

## Introduction

#### Lab Objective

In this Lab, we will go through the tasks that are required to complete the general pre-configuration of a tenant. These tasks are to be undertaken by an administrator. By following each of the steps, you would have prepared your tenant to begin configuring different services offered by the platform. The lab contains multiple exercises to make you familiar with Control Hub, Management portal UI and Webex Connect. At the end of the lab, you should be able to log in to an agent interface.

#### Pre-requisites

-   You have received the access credentials with a full admin access
-   You have received the access to the agent and supervisor account.

#### Quick Links

Control Hub: [**https://admin.webex.com**](https://admin.webex.com)  
Portal: [**https://portal.wxcc-us1.cisco.com/portal**](https://portal.wxcc-us1.cisco.com/portal)  
Agent Desktop: [**https://desktop.wxcc-us1.cisco.com**](https://desktop.wxcc-us1.cisco.com)  
Webex Connect: https://cl1pod**<ID>**.imiconnect.io/ (where **<ID>** is your POD number)

## Configuring your Tenant

#### Configuration Order

![A picture containing graphical user interface
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

## 1. Node Authorization for Webex CC Task and Engage nodes

Webex Connect is required to provide a valid access token for using various Webex Contact Center and Webex Engage APIs. The access token is generated using the authorization details configured within the ‘Node Runtime Authorization’ field that Webex Contact Center users are required to provide during flow configuration.

·       To authorize a pre-built integration go to **Assets** -> **Integrations**. The integrations which are not yet authorized show the status as **Authorization Pending**.

·       In front of **Webex CC Engage** Click **Actions** -> **Manage**.

![Graphical user interface, text, application, email
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.gif)

·       On the Manage Integrations page, scroll down to the **Node Authorizations** section. This section lists all the authorizations mapped to this integration.

·       Click **Action** → **Add Authorization** associated with the **WxCC Engage Authorisation**, where Auth Type is oauth2 and Status is Authorization Pending.

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)

-   Enter the Authorization Name and click **Authorize**. In that example we use **WxCC Engage Authorisation**.

![Graphical user interface, application, Teams
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image004.png)

-   Click on the back button for being redirected back to **Integrations** page and in front of **Webex CC Task** Click **Actions** → **Manage**.

![Table
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image005.gif)

-   On the Manage Integrations page, scroll down to the **Node Authorizations** section. This section lists all the authorizations mapped to this integration. Click **Action** → **Add Authorization** associated with the **WxCC Authorisation**, where Auth Type is oauth2 and Status is Authorization Pending.

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image006.png)

-   Enter the **Authorization Name** (for example: **WxCC Authorisation**) and click **Authorize**. As the result the pop-up appears where you need to enter your Cisco admin email address (cl1admin**<ID>**@email.carehybrid.com) and click **Sign in**.

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image007.png)

-   Click back button for being redirected back to **Integrations** page. Verify that the status of the authorizations is changed to **Authorized**. ![A picture containing graphical user interface
    Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image008.gif)

## 2. Download and upload CA flows in Connect

Every tenant must include CA flows. CA flows can be imported from the template folder in this [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels). CA flow can be added only once and will be automatically be used by all existing channel specific flows in the tenant when needed. Recommended to add these flow in a dedicated Service named “Agnostic Flows - DO NOT MODIFY”

The agnostic flows consist of:  
• Task Routed - Adding an agent participant to a conversation;  
• Task Modified - Adding an agent to or removing an agent from an ongoing conversation (e.g., for chat transfer or conference);  
• Task Close - Closing the conversation;

1) Download all flows from the [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels).

2) Navigate to **Webex Connect Flows** -> **v2.1**.

![](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image009.gif)

3) Unzip All Files.

4) Login to the **Webex Connect** portal with the admin account.

5) Navigate to **Services** and click on **CREATE NEW SERVICE**.

![Graphical user interface, text, application, Teams
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image010.png)

6) Set your name **Agnostic Flows DO NOT MODIFY** in the Service Name and press on **CREATE** button. This will create a new service.

**Note** You can choose a different Service name. It is just an example.

7) In the service click on **FLOWS** -> **CREATE FLOW**.

![Graphical user interface, text, application, email
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image011.png)

8) In the **FLOW NAME** section set **Task Close Flow**.

9) In the **METHOD** select **Upload a flow**. In **ATTACHMENT** click on **CHOOSE FILE** and select the **Task Close Flow.workflow** file.

10) Now you can click on **CREATE** button.

![Graphical user interface, text, application, email
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image012.png)

11) In the new menu click **SAVE** and then **MAKE LIVE**. On pop up window click on **MAKE LIVE** again.

![Graphical user interface, text, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image013.gif)

12) Go back and repeat steps 7 - 11 for **Task Routed flow** and **Task Modified Flow**. Select the corresponding names.

## Step 3. Setup agents in Portal (Agents, Team, MMP)

This step shows how to access the admin portal and navigate the different configuration menus to create a Site, Team, and Multimedia Profile that will be assigned to the Contact Center user.

### Users

The users have the following pre-configuration

**User Role**

**User email**

Agent

cl1agent**<ID>**@email.carehybrid.com

Supervisor

cl1sup**<ID>**@email.carehybrid.com

**Note:** Your <ID> was provided to you personally. <ID> is the unique number equal to your POD.

### User Settings

**Entity**

**Name**

Multimedia Profiles

MMP

Site

Site

Team1

Team1

Team2

Team2

### 1. Create new MultiMedia Profile

·       Login to Management Portal by accessing [https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal).

·       Enter the admin email address (cl1admin<ID>@email.carehybrid.com) and click **Sign in**.

·       Click on _**Provisioning**_ and select _**Multimedia Profiles**_.

·       Click on `+ New Multimedia Profile` to open Multimedia Profile configuration page.

·       Input Name as `MMP`.

·       In the Media Details section, select the blended multimedia profile and input `1` for _**Voice**_, `3` for _**Chat**_, `3` for _**Email**_, , `3` for _**Social Channel**_ and click on _**Save**_ button.

![Graphical user interface, text, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image014.png)

### 2. Create new Site

·       Navigate to _**Provisioning**_ and select _**Site**_.

·       Click on `+ New Site` button and provide the Name as `Site`.

·       Select `MMP` in the _**Multimedia Profile**_ drop down and hit _**Save**_.

![Graphical user interface, text, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image015.png)

### 3. Create new Teams

·       Navigate to _**Provisioning**_ and select _**Team**_.

·       Click on `+ New Team`.

·       Select `Site` from the _**Site**_ drop-down.

·       Input _**Name**_ as `Team1`.

·       Use the default _**Type**_ `Agent Based`.

·       Select `MMP` in the _**Multimedia Profile**_ drop-down.

·       Left as a default value _**Global Layout**_ in the _**Desktop Layout**_ drop-down and hit _**Save**_.

![Graphical user interface, text, application, chat or text message
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image016.png)

-   Please follow the same steps as above to add an extra Team as `Team2`.

[To top of this lab](https://wxcctechsummit.github.io/wxcclabguides/LTRCCT-2013/Lab1_Preconfiguration.html#table-of-contents)

### 4. User Configuration

·       Click on _**Provisioning**_ and select _**Users**_.

·       Click on `...` for the **Agent** user, to launch the _**Edit**_ view for a particular User configuration.

·       Make sure that the _**User Profile**_ is set as _**Premium Agent User Profile**_.

·       Click on _**Contact Center Enabled**_ toggle to move it to _**On**_.

·       In the _**Agent Settings**_ section, select `Site` in the _**Site**_ drop-down.

·       Click the _**Teams**_ area and select `Team1` and `Team2`.

·       Select `Agent Profile` in the _**Agent Profile**_ drop-down list.

·       Select `MMP` in the _**Multimedia Profile**_ drop-down and hit _**Save**_.

·       Make sure that the user are now shown with the _**Contact Center Enabled**_ flag as `Yes` and _**Status**_ as `Active`.

![Graphical user interface, text, application, email
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image017.png)

-   Please follow the same steps for **Supervisor** user.

[To top of this lab](https://wxcctechsummit.github.io/wxcclabguides/LTRCCT-2013/Lab1_Preconfiguration.html#table-of-contents)

## Step 4. Setup RONA timers

If an agent doesn’t answer a contact request, the contact request will return to the queue and the agent state will change to **Redirection on No Answer (RONA)**. In this task, you will play with the feature that allows administrators to override the default RONA timeout values at the tenant level for every channel type to suit the business needs of the organization. The available channels are:

-   Telephony
-   Chat
-   Email

·       Social (Facebook and WhatsApp)

·       Log in to the Control Hub at [https://admin.webex.com](https://admin.webex.com)

·       Navigate to **Services** -> **Contact Center** -> **Settings** -> **Desktop** -> **RONA Timeouts**. ![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image018.png)

-   Modify the existing timers by putting the values from the tables below:

**Channel**

**New Values**

**Limitations**

Telephony

18

1 - 120 seconds

Chat

60

1 - 6000 seconds

Email

90

1 - 6000 seconds

Social

60

1 - 6000 seconds

## Verification: Access to the Agent Desktop

**Note**: To log in to the agent desktop, use either a separate web browser or a new incognito web page. This will prevent any browser caching issues with admin and agent credentials.

·       Navigate to [**https://desktop.wxcc-us1.cisco.com/**](https://desktop.wxcc-us1.cisco.com/) in a new browser or in incognito mode.

·       Enter the agent’s **email ID** `cl1agent**\<ID\>**@email.carehybrid.com`.

·       Enter the **Password** for the appropriate Username.

·       In the _**Station Login**_ pane, select **“Extension”** and put any number, for instance 1000.

**Note:** The Webex Calling service is not activated at this tenant we need to set a dummy extension only once during the login.

-   Select the `Team1` and click _**Submit**_. Make sure that you are successfully logged in to the Agent Desktop. Now you can continue with the Next Lab.

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image019.gif)


---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


# Lab.6 Flow Builder Overview

## Table of Contents


## Introduction

#### Lab Objective

This lab is designed to introduce the logic and methodology behind building flows that will handle incoming conversation via digital channels. Throughout this lab you will learn how to navigate the flow designer, understand how to read and configure nodes and how flows are being executed. In this lab you will not find configuration steps, the goal is to understand how to approach the build of a new flow.

#### Pre-requisites

1.  Connect URL for browser access.
2.  Admin credentials to login to Connect administration portal.

## Understanding Connect Flows

#### 1. Flow Types

Inside connect there are two types of flows:

·      Channel Agnostics (CA) Flows

o   Every tenant must include the following CA flows:

§  **Task Routed** – The flow is invoked automatically by the agent when accepting an incoming conversation on the agent desktop.

§  **Task Modified** - The flow is invoked automatically by the agent when adding or removing an agent from an ongoing conversation on the agent desktop (e.g., for chat transfer or conference).

§  **Close Task** - The flow is invoked automatically by the agent when closing an ongoing conversation on the agent desktop.

o   These three CA flows are required to be added only once per tenant. Recommendation: Create and reserve a dedicated Service named “Agnostic Flows – DO NOT MODIFY” specifically for these 3 flows. Once the flows are added lock the service (from the Settings section) to avoid any accidental changes.

o   The latest version of the CA flows can be collected from CA flows can be imported from this [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels/tree/main/Webex%20Connect%20Flows/v2.1).

·      Channel Specific (CS) Flows

o   CS flows can be freely build by the admin following customers’ requirement

o   CS flows can be located in any Service, the Admin is free to organize Flows and Services following the desired order and naming convention.

o   CS flows can be triggered by Assets, Events or Webhooks.

o   Every time a customer sends a new message, the associated Asset and CS Flow are triggered from their starting node.

o   CS flows do not automatically associate incoming messages from the same users as part of the same thread.

o   As reference, CS sample flows for each digital channel can be imported from this GitHub page.

#### 2. Create new flows

You can create a new flow from scratch to explore the flow designer interface and its nodes. To create a new flow:

·      Access your Connect tenant

·      Navigate to Service > select or create your service >  select the Flows tab > click on any of the two ‘Create Flow’ buttons

·      Enter the a name inside the ‘Flow Name’ > under Type select ‘Work Flow’ > under Method select ‘New Flow’ > Select the ‘Start From Scratch’ icon > click on Create

·      From the ‘Select Trigger Category’ select any of the channels (i.e. Email)

·      You will be redirected to the flow canvas, already inside the first node in the flow > click on Cancel

#### 3. Flow designer and node navigation

The flow designer is divided in three main section:

·      Toolbar on top – containing the flow name and status, the settings, save and ‘make live’ buttons.

·      Canvas in the middle – where the administrator can arrange the node to execute the desired workflow.

·      Node menu on the left – containing all the nodes the admin can use (by dragging them inside the Canvas)

Nodes are categorized between Utilities, Channels and Integrations depending on their use but they all follow the same structure. To check a node simply drag and drop it into the canvas and double click on it. Inside each node you will find the:

·      Node Name – Can be edited by clicking on the pencil icon.

·      Configuration tab – Every node needs to be properly configured to be executed. Each node has its own set of required Variables to be set. The details about how to configure each parameter can be found in the nodes’ specific documentation inside the Connect Help page.

·      Transition Actions tab – use to configure additional activities before or after the node is executed (i.e. set desired values to additional variables).

·      Node ID – Indicates the unique number identifier for this node.

·      Input Variables section – Click on it to expand the section. You will see a list of all the Output and Custom Variables (grouped by node of origin) from the previously connected nodes.

·      Output Variables section – Click on it to expand the section. You will see a list of variables (and their names) the node generates when successfully executed.

·      Node Outcomes section – Click on it to expand the section. You will see a list of which and how many outcomes (exit connections) the node has. When closing the node configuration you will notice coloured dots on the right side of the node indicating the Outcomes. Drag those dots onto other nodes to connect them together, or into an empty point of the canvas if no further actions are needed.

When using nodes’ Output Variables inside the configuration of other nodes, administrator will have to use the following syntax: $(nX.outputvariablename), where X is the node ID that has generated that variable.

#### 4. Building a new Channel Specific flow

As for any contact center flow, before proceeding building a new flow it’s always recommended to collect all the requirements as well as a draft of the intended workflow.  
In addition to this, for the digital channels it’s crucial to distinguish the type of use for the flow: as mentioned in the chapter 1, Connect flows are executed from their starting node any time they are triggered [excepts when using a Receive Node inside the flow itself, beyond the scope of this lab].  
For this reason the administrator should initially clarify if the flow shall be always triggered by distinct and unrelated sources or if multiple messages could come from the same source as part of a unique conversation. For most of the cases, when customers need to interact with your services, especially when expecting to connect with an agent, all their messages must be grouped into a uniquely identifiable thread. In Connect this is called **Conversation ID**.  
For all the flows where you expect to have an ongoing conversation, your flow shall be built with an initial check, ideally after the starting node, where you will need to check if the incoming message is part, or not of an existing conversation, so to appropriately manage and route it accordingly. Here below a recommended flow structure:

1.     Accept incoming message via dedicated channel node.

2.     Check (using the ‘Search Conversation’ node) if the incoming message

a.     Is part to an active/ongoing conversation with an agent. If so, use the ‘Append Conversation’ node to add the incoming message at the bottom of the appropriate ongoing conversation.

b.     Comes from a customer who is reaching the flow for the first time. If so, Create a new Conversation ID using the ‘Create Conversation’ node, and eventually route it to an agent.

c.     Comes from a customer who was in a past and terminated conversation. If so, restart the previous conversation by using the ‘Re-open Conversation’ node, and eventually route it again to an agent.

Before sending a new conversation to the desired queue, you have to create a Task ID: while the Conversation ID is used by Connect to group all incoming massage in a unique thread, the Task ID is used for the Webex Contact Center to map that conversation with a specific queue and then an agent. Use the Create Task node to create such ID and then connect it to the Queue Task node.

When building a flow it is also recommend to appropriately handle the potential failure of each node by:

·      Including messages back to the customer informing them about an ongoing issue.

·      Terminating (Closing) any active conversation or task.

#### 5. Activating a flow

When a flow is being edited, its status appear as ‘Working Draft’ on the top-left of the browser window. Once the editing has been completed and you wish to start using the flow, you can click the Save button to save the latest changes. If there’s any missing or incorrect connection between nodes, a prompt will appear on the right side, listing all the occurring issue (misconfiguration inside each node won’t be detected here).  
Once all the issues have been addressed, the Admin shall click on the ‘Make Live’ button to activate a flow in Working Draft status. A new pop-up will appear: select or modify the Application that will be triggering this flow, optionally add comments, and click ‘Make Live’.  
Once a flow is set to go live, it will take approx. 2 minute before showing the correct ‘LIVE’ status on the top-left. In the meantime, it will show the ‘Publishing’ status, meaning that any messages received in the meantime will either be handled through the previous flow version or be rejected if no previous version is available.


---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


# Flow Builder Overview

## Table of Contents

UPDATE

## Introduction

#### Lab Objective

This lab is designed to introduce the logic and methodology behind building flows that will handle incoming conversation via digital channels. Throughout this lab you will learn how to navigate the flow designer, understand how to read and configure nodes and how flows are being executed. In this lab you will not find configuration steps, the goal is to understand how to approach the build of a new flow.

#### Pre-requisites

1.  Connect URL for browser access.
2.  Admin credentials to login to Connect administration portal.

## Understanding Connect Flows

#### 1. Flow Types

Inside connect there are two types of flows:

·      Channel Agnostics (CA) Flows

o   Every tenant must include the following CA flows:

§  **Task Routed** – The flow is invoked automatically by the agent when accepting an incoming conversation on the agent desktop.

§  **Task Modified** - The flow is invoked automatically by the agent when adding or removing an agent from an ongoing conversation on the agent desktop (e.g., for chat transfer or conference).

§  **Close Task** - The flow is invoked automatically by the agent when closing an ongoing conversation on the agent desktop.

o   These three CA flows are required to be added only once per tenant. Recommendation: Create and reserve a dedicated Service named “Agnostic Flows – DO NOT MODIFY” specifically for these 3 flows. Once the flows are added lock the service (from the Settings section) to avoid any accidental changes.

o   The latest version of the CA flows can be collected from CA flows can be imported from this [GitHub page](https://github.com/CiscoDevNet/webexcc-digital-channels/tree/main/Webex%20Connect%20Flows/v2.1).

·      Channel Specific (CS) Flows

o   CS flows can be freely build by the admin following customers’ requirement

o   CS flows can be located in any Service, the Admin is free to organize Flows and Services following the desired order and naming convention.

o   CS flows can be triggered by Assets, Events or Webhooks.

o   Every time a customer sends a new message, the associated Asset and CS Flow are triggered from their starting node.

o   CS flows do not automatically associate incoming messages from the same users as part of the same thread.

o   As reference, CS sample flows for each digital channel can be imported from this GitHub page.

#### 2. Create new flows

You can create a new flow from scratch to explore the flow designer interface and its nodes. To create a new flow:

·      Access your Connect tenant

·      Navigate to Service > select or create your service >  select the Flows tab > click on any of the two ‘Create Flow’ buttons

·      Enter the a name inside the ‘Flow Name’ > under Type select ‘Work Flow’ > under Method select ‘New Flow’ > Select the ‘Start From Scratch’ icon > click on Create

·      From the ‘Select Trigger Category’ select any of the channels (i.e. Email)

·      You will be redirected to the flow canvas, already inside the first node in the flow > click on Cancel

#### 3. Flow designer and node navigation

The flow designer is divided in three main section:

·      Toolbar on top – containing the flow name and status, the settings, save and ‘make live’ buttons.

·      Canvas in the middle – where the administrator can arrange the node to execute the desired workflow.

·      Node menu on the left – containing all the nodes the admin can use (by dragging them inside the Canvas)

Nodes are categorized between Utilities, Channels and Integrations depending on their use but they all follow the same structure. To check a node simply drag and drop it into the canvas and double click on it. Inside each node you will find the:

·      Node Name – Can be edited by clicking on the pencil icon.

·      Configuration tab – Every node needs to be properly configured to be executed. Each node has its own set of required Variables to be set. The details about how to configure each parameter can be found in the nodes’ specific documentation inside the Connect Help page.

·      Transition Actions tab – use to configure additional activities before or after the node is executed (i.e. set desired values to additional variables).

·      Node ID – Indicates the unique number identifier for this node.

·      Input Variables section – Click on it to expand the section. You will see a list of all the Output and Custom Variables (grouped by node of origin) from the previously connected nodes.

·      Output Variables section – Click on it to expand the section. You will see a list of variables (and their names) the node generates when successfully executed.

·      Node Outcomes section – Click on it to expand the section. You will see a list of which and how many outcomes (exit connections) the node has. When closing the node configuration you will notice coloured dots on the right side of the node indicating the Outcomes. Drag those dots onto other nodes to connect them together, or into an empty point of the canvas if no further actions are needed.

When using nodes’ Output Variables inside the configuration of other nodes, administrator will have to use the following syntax: $(nX.outputvariablename), where X is the node ID that has generated that variable.

#### 4. Building a new Channel Specific flow

As for any contact center flow, before proceeding building a new flow it’s always recommended to collect all the requirements as well as a draft of the intended workflow.  
In addition to this, for the digital channels it’s crucial to distinguish the type of use for the flow: as mentioned in the chapter 1, Connect flows are executed from their starting node any time they are triggered [excepts when using a Receive Node inside the flow itself, beyond the scope of this lab].  
For this reason the administrator should initially clarify if the flow shall be always triggered by distinct and unrelated sources or if multiple messages could come from the same source as part of a unique conversation. For most of the cases, when customers need to interact with your services, especially when expecting to connect with an agent, all their messages must be grouped into a uniquely identifiable thread. In Connect this is called **Conversation ID**.  
For all the flows where you expect to have an ongoing conversation, your flow shall be built with an initial check, ideally after the starting node, where you will need to check if the incoming message is part, or not of an existing conversation, so to appropriately manage and route it accordingly. Here below a recommended flow structure:

1.     Accept incoming message via dedicated channel node.

2.     Check (using the ‘Search Conversation’ node) if the incoming message

a.     Is part to an active/ongoing conversation with an agent. If so, use the ‘Append Conversation’ node to add the incoming message at the bottom of the appropriate ongoing conversation.

b.     Comes from a customer who is reaching the flow for the first time. If so, Create a new Conversation ID using the ‘Create Conversation’ node, and eventually route it to an agent.

c.     Comes from a customer who was in a past and terminated conversation. If so, restart the previous conversation by using the ‘Re-open Conversation’ node, and eventually route it again to an agent.

Before sending a new conversation to the desired queue, you have to create a Task ID: while the Conversation ID is used by Connect to group all incoming massage in a unique thread, the Task ID is used for the Webex Contact Center to map that conversation with a specific queue and then an agent. Use the Create Task node to create such ID and then connect it to the Queue Task node.

When building a flow it is also recommend to appropriately handle the potential failure of each node by:

·      Including messages back to the customer informing them about an ongoing issue.

·      Terminating (Closing) any active conversation or task.

#### 5. Activating a flow

When a flow is being edited, its status appear as ‘Working Draft’ on the top-left of the browser window. Once the editing has been completed and you wish to start using the flow, you can click the Save button to save the latest changes. If there’s any missing or incorrect connection between nodes, a prompt will appear on the right side, listing all the occurring issue (misconfiguration inside each node won’t be detected here).  
Once all the issues have been addressed, the Admin shall click on the ‘Make Live’ button to activate a flow in Working Draft status. A new pop-up will appear: select or modify the Application that will be triggering this flow, optionally add comments, and click ‘Make Live’.  
Once a flow is set to go live, it will take approx. 2 minute before showing the correct ‘LIVE’ status on the top-left. In the meantime, it will show the ‘Publishing’ status, meaning that any messages received in the meantime will either be handled through the previous flow version or be rejected if no previous version is available.

---


<p style="text-align:center"><strong>Congratulations, you have completed **ALL section**. Well done!!!</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	


# Lab 12.15 - QnA BOT

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/X2HnaG3PVeo" title="Part1: Agent Desktop Overview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Table of Contents

| Topic                                                                                    | Lab Type      | Dificulty Level | Estimated length |
| ---------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| Navigate to BOT Builder and Create bot | Practical Lab | MID          | 5 min           |
| Preview | Practical Lab | MID          | 5 min           |
| Bot testing | Practical Lab | MID        | 10 min           |
| Curation | Practical Lab | MID         | 15 min           |
| Demo | Demo | NA          | 15 min           |

## Introduction

## Lab Objective

This lab is designed to complete a new QnA bot creation, new article creation and previewing the same. We will also test the bot, add new test cases and learn about curation.

## Pre-requisite

-   WxCC Portal, Agent Desktop and IMI connect URL.
-   Admin credentials to complete configurations in WxCC portal and IMI connect.
-   Agent Credentials to Handle FBM digital contact

### 1.     Navigate to BOT Builder and Create bot

-   Log on to Connect portal and navigate to BOT Builder
    
-   On the top right you have 2 options QnA BOT and Task BOT
    
-   Create new QnA Bot
    
-   Give name and enable agent handoff option
    

### 2.     Preview

-   Navigate to Article -> click on 3 dot -> import from catalogue
    
-   Once the Article is added, click on preview on top right and test the BOT
    
-   Click on Session to check to user input matching with Article
    

### 3.     Bot testing

-   Open BOT Builder
    
-   Log on to Connect portal and navigate to BOT Builder
    
-   Click on the BOT created on Lab 1
    
-   Click on Testing and add test case
    
-   Execute the test case
    
-   Click on session to validate the test case
    

### 4.     Curation

-   Make sure feedback to BOT is enabled under sessions
    
-   Open preview option and run few input to test the article
    
-   If BOT is not giving expected response, click on red down thumb to downvote the article
    
-   Open curation menu
    
-   BOT Admin has an option to change response, add new article or attach response with an existing Article

<p style="text-align:center"><strong>Congratulations, you have completed **ALL section**. Well done!!!</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>


# Lab 12.20 - Creating Custom Nodes
## Table of Contents

| Topic                                                                                    | Lab Type      | Dificulty Level | Estimated length |
| ---------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| Adding a Custom Node | Practical Lab | MID           | 15 min           |
| Demo via calling EP into Webhook to invoke Custom Node | Demo | NA          | 15 min           |

## Quick Links

-   [https://help.imiconnect.io/docs/custom-nodes](https://help.imiconnect.io/docs/custom-nodes)
-   [https://help.imiconnect.io/docs/configure-custom-integration-node](https://help.imiconnect.io/docs/configure-custom-integration-node)

## Lab Objective

This lab walks you through the creation of custom node and a demo of its usage. Custom nodes allow you to configure reusable integrations with your existing business system or with third-party applications using REST/SOAP APIs. In this sample example, we are going to show how you can integrate with WxCC and update Site name via calling into Entry Point.

## Pre-requisite

-   Admin credentials to login to Webex Connect portal

Vidcast: [https://app.vidcast.io/share/44d5e84f-e110-4c3b-acc6-3b482198ab53](https://app.vidcast.io/share/44d5e84f-e110-4c3b-acc6-3b482198ab53)

## Adding a Custom Node

### 1.     Navigate to Integrations in Webex Connect

-   Login in to Webex Connect portal

-   From left column, navigate to “Integrations”

![Lab12.20_CustomNodeIntegrations](/assets/images/Lab12.20_CustomNodeIntegrations.png)

### 2.     Add Custom Node

-   In Integrations, click ‘Add Integration’

-   Select ‘Custom Node’

![Lab12.20_CustomNodeAddIntegrations](/assets/images/Lab12.20_CustomNodeAddIntegrations.png)

-   Name your Custom Node, select ‘Custom Nodes’ under Node Category and click OK

![Lab12.20_CustomNodeCreateNew](/assets/images/Lab12.20_CustomNodeCreateNew.png)

### 3.     Configure REST API under Settings tab. These settings are specific to the requirement of your existing business system or with third-party applications you are trying to integrate.

-   Step 1: Configure Authorization

-   Step 2: Configure Headers

-   Step 3: Configure Body

-   Step 4: Configure Response

### 4.     Configure Node UI tab (optional)

-   This setting are specific to the requirement of your existing business system or with third-party applications you are trying to integrate.

## Demo via calling EP into Webhook to invoke custom node to update WxCC Site name

Vidcast: [https://app.vidcast.io/share/fe9230a8-3dfe-4177-b804-3065218a1873](https://app.vidcast.io/share/fe9230a8-3dfe-4177-b804-3065218a1873)

![Lab12.20_CustomNodeDemo](/assets/images/Lab12.20_CustomNodeDemo.png)


<p style="text-align:center"><strong>Congratulations, you have completed **ALL section**. Well done!!!</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>


# Lab 12.24 - Global and Flow variable support in Digital channels

## Table of Contents

| Topic                                                                                    | Lab Type      | Dificulty Level | Estimated length |
| ---------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| Fetching and Reporting Global variable | Practical Lab | MID           | 15 min           |
| Configuring Flow variable| Practical Lab | MID           | 15 min           |
| Transfer Global and Flow variable values between Webex Connect flows | Practical Lab | MID           | 15 min           |

## Quick Links
-   [https://help.imiconnect.io/docs/set-variable](https://help.imiconnect.io/docs/set-variable)

## Lab Objective

This lab walks through the configuration of Global and Flow variables for digital channels. The behaviour of these variables are the same as how they would work for telephony flows. Global variables are centrally configured and reported in WxCC and they are fetch via flows in Webex Connect. Flow variables are configured locally within Webex Connect flows and are not reportable.

Both variables are transferable between flows. In the second part of this lab in 12.24.3, we will configure the transfer of chat form entries received in the inbound chat flow to routed flow when agent accepts the inbound chat.

## Pre-requisite

-   Admin credentials to login to WxCC and Webex Connect portal

-   Working inbound chat and routed flow

-   Knowledge of WxCC Global variables and Analyzer

## Fetching and Reporting Global Variable

Fetching GV Vidcast: [https://app.vidcast.io/share/39203703-097c-4b2c-83f9-96b4c091e813](https://app.vidcast.io/share/39203703-097c-4b2c-83f9-96b4c091e813)

### 1.     Login in to Webex CC administration portal

-   From left column, navigate to “Global Variables”

![Lab12.24.1_GVFirst](/assets/images/Lab12.24.1_GVFirst.png)

-   Create a new OR select an existing Global Variable with the following configurations:

	-   Variable Type: String
	-   Default Value: _your prefered value_
	-   Make Reportable: Yes
	-   Make Agent Viewable: Yes
	-   Desktop Label: _your prefered value_
	-   Agent Editable: Yes

### 2.     Next, login to Webex Connect portal and open your inbound chat flow

-   Click “Edit” on the top right of the flow
-   Delete connection between “Queue Task” and “Update Conversation”
-   Drag the “Set Variable” from the left panel and drop between “Queue Task” and “Update Conversation” nodes and connect them as shown in the video

![Lab12.24.1_GVSecond](/assets/images/Lab12.24.1_GVSecond.png)

-   Configure “Set Variable” with the following:

	-   Method Name: Select Global Variable
	-   Node Runtime Authorization: _Configured for your tenant_
	-   Task ID: $(flid)
	-   Select the Global Variable configured earlier in WxCC Portal
	-   Set Variable: _Leave as default value configured_


-   Save and make the flow live

-   Start a new chat session and observe the Global variable value appearing in the interaction panel of Agent Desktop

-   Capture the Session ID appearing at the address bar of the Agent Desktop upon accepting the chat session

### 3.     Configure Analyzer to report the Global Variables configured in Webex Connect flow

Reporting GV vidcast: [https://app.vidcast.io/share/2b9504eb-a908-4453-9134-6fd6a0734043](https://app.vidcast.io/share/2b9504eb-a908-4453-9134-6fd6a0734043)

-   Navigate to “Reporting and Analytics” at the left column of WxCC portal
![Lab12.24.1_GVThird](/assets/images/Lab12.24.1_GVThird.png)

-   Create a new visualization with the following fields:

	-   Session ID
	-   _Global Variable defined in WxCC portal_ (In the video example, the Globle variable is _DavidGV1_)
	-   Create a report filter with the captured Session ID

-   Run the report and observe the Global variable value

### 4.     Repeat a new chat sessions with the following scenario:

-   Chat session 2 use case: Prior to starting the chat session, open the specific flow again in Webex Connect. Edit the “Set Variable” value of the Global variable in the “Set Variable” node to something other than the default. Capture the Session ID for Analyzer report filter.

-   Re-run the Anayzer report after adding the Session ID and observe the reported value of the Global variable.

## Configuring Flow Variables

Vidcast: [https://app.vidcast.io/share/741c4912-2c79-453f-8cdc-2f0afa3ea4f3](https://app.vidcast.io/share/741c4912-2c79-453f-8cdc-2f0afa3ea4f3)

### Login in to Webex Connect portal and open your inbound chat flow

-   Click “Edit” on the top right of the flow

-   Delete connection between “Set Variable” and “Update Conversation”

-   Drag a second “Set Variable” from the left panel and drop between the earlier “Set Variable” and “Update Conversation” nodes and connect them as shown in the video

-   Configure “Set Variable” with the following:

	-   Method Name: Select Flow Variable
	-   Node Runtime Authorization: _Configured for your tenant_
	-   Task ID: $(flid)
	-   Set Variable:
	
		-   Name: _your prefered value_
		-   Type: String
		-   Value:
		-   Enable “Make agent viewable”
		-   Description: _your prefered value_
		-   Desktop Label: _your prefered value_
		-   Check “Agent Editable”

-   Click Save

-   Save and make the flow live.

-   Start a new chat session and observe the Flow variable value appearing in the interaction panel of Agent Desktop.
-   Note that Flow variables are not reportable in Analyzer.

## Transfer Global and Flow variable values between Webex Connect flows

Vidcast: [https://app.vidcast.io/share/ccecf093-f0a9-4ae3-823b-ae74b515e513](https://app.vidcast.io/share/ccecf093-f0a9-4ae3-823b-ae74b515e513)

## Lab Objective

To transfer chat form input and Global variable values from inbound chat flow to channel-agnostic routed flow for Agent Desktop screen pop

### Login in to Webex Connect portal and open your routed flow

-   Click “Edit” on the top right of the flow

-   Click on the gear icon at the top right of the screen and navigate to Custom Variables
![Lab12.24.3_TxFirst](/assets/images/Lab12.24.3_TxFirst.png)

-   Add the Global variable and Flow variable specific to your configuration (Note that the variables are case-sensitive)

![Lab12.24.3_TxBetweenFirstSecond](/assets/images/Lab12.24.3_TxBetweenFirstSecond.png)

-   Next, double-click on the “Extract Task Variables” node and insert the following Javascript under Configuration tab just before the last line (Note: the italized words are specific to your variable name):

`// function to extract fields into flow usable variables

function extractVariable(varname) {

    for (var i = 0; i < responseArray.length; i++) {

        var object = responseArray[i];

        if (object.name == varname) {

            return object.value;

        }

    }

}

//Extracting _NatureOfRequest_ and _DavidGV1_ variables set in the live chat inbound flow

var _natureOfRequest_ = extractVariable("_NatureOfRequest_");

var _davidGV1_ = extractVariable("_DavidGV1_");`

![Lab12.24.3_TxAftBetweenFirstSecond](/assets/images/Lab12.24.3_TxAftBetweenFirstSecond.png)

-   Within the same “Extract Task Variables” node, navigate to the second option “Transition Actions (Optional)” and add the Custom variables under “Time: On-leave” and “Action: Set variable” created above to the extracted Global and Flow variables:
![Lab12.24.3_TxSecond](/assets/images/Lab12.24.3_TxSecond.png)

-   Scroll down the same page and add both variables to the Debug Log for troubleshooting purposes if required.

-   Save the settings and double-click on the Screen Pop node

-   Add the following under “Query Parameters”:
![Lab12.24.3_TxThird](/assets/images/Lab12.24.3_TxThird.png)

-   Save and make the flow live.

-   Start a new chat session and observe the Screen Pop address bar upon Agent Desktop accepting the chat session. Both Global and Flow variables from the channel specific inbound chat flow are transfered to the routed flow.

![Lab12.24.3_TxLast](/assets/images/Lab12.24.3_TxLast.png)

<p style="text-align:center"><strong>Congratulations, you have completed **ALL section**. Well done!!!</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>
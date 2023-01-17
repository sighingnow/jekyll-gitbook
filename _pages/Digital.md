---
title: Lab 12 - Digital Channels
author: Davide Telari, Yurii Ulianov, Iranthi Ulluwishewa, David Ng, Naveen Kumar Narasimhan Almeti & Gajanan Pande.
date: 2022-12-12
layout: post 
---

This page is under developments

| Topic                                                                                                                        | Lab Type      | Dificulty Level | Estimated length |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Digital Channels Architecture Overview and Provisioning](#lab121---digital-channels-architecture-overview-and-provisioning) | Practical Lab | EASY            | 15 min           |
| [Connect GUI overview](#lab122---connect-gui-overview)  | Practical Lab | EASY            | 15 min           |                                                                                                                             |               |                 |                  |


# Lab.12.1 - Digital Channels Architecture Overview and Provisioning

## **Table of Contents**

| Topic                                                      |
| ---------------------------------------------------------- |
| [Webex Connect architecture](1-Webex-Connect-architecture) |
| [Webex Connect Provisioning](2-Webex-Connect-Provisioning) |
| [Webex Connect Provisioning verification](3-Webex-Connect-Provisioning-verification) |


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

## **2. Webex Connect Provisioning**

-   Go to https://admin.webex.com
-   Login with tenant administrator credentials
-   Under ‘Services’ select ‘Contact Center’ > ‘Settings’ > ‘General’

-   Verify under ‘Service Details’ > ‘Digital Channel’ is set to ‘IMI Digital’

![Provisioning1](/assets/images/DC_Provisioning1.png)

_In case the ‘Digital Channel’ section prompts a different value you will need to reach out Cisco for support to get this setting corrected before proceeding further._

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

_For security reason, the activation is only valid for 24 hours since its delivery. Please activate your account immediately. In case you don’t receive the activation email, or not use it within 24 hours, will need to reach out Cisco for support._

## **3. Webex Connect Provisioning verification**

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

ADD IT HERE

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

ADD IT HERE

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

1.  User Roles and Permissions
2.  Users organization New user activation
3.  ADD MORE HERE

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

Connect allows the Owner to create local users in container groups called Groups and Teams. Users created within a Group or a Team will be able to access the configuration created within such container and below, but not to the configuration created at levels above. Users can be create in one of the following containers:

-   Tenant level – can contain users and Groups
-   Group – can contain users and Teams
-   Team – can contain users only

## **3. Login to Connect portal**

-   Access Connect URL (this is specific to the tenant you are using)
-   Login the provided credentials

-   Please contact the Partner Success team (PSM) if there are any challenges identifying the Connect Owner details

![Graphical user interface
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image001.png)

## **4. Add new users with administrator role**

-   Once logged in to Connect, go to ‘Settings’ > ‘Teammates’
-   Add a new user (must be a working emailID) and select ‘Full access’ role and click ‘Invite user’

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image002.png)

## **5. New user activation**

-   Click ‘Join the team’ link in the welcome email to complete user registration.
-   Provide your name and setup the passwords, click ‘Next’.
-   Fill out additional details about yourself and click ‘Next’.
-   The user will automatically login into the Connect portal.
-   The user will have to inform the tenant Owner about the successful creation of the account > the Owner will go to ‘Settings’ > ‘Teammates’ > click ‘Edit’ for the specified user > mark the checkbox for Decrypt Logs > click ‘Save’

![Graphical user interface, application
Description automatically generated](file:////Users/dtelari/Library/Group%20Containers/UBF8T346G9.Office/TemporaryItems/msohtmlclip/clip_image003.png)


---

**Congratulations, you have completed this section!**

**We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete a short survey.**


# Lab.12.5 - Digital Channel required configuration

## Table of Contents

ADD IT HERE

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

#### Step 1. Node Authorization for Webex CC Task and Engage nodes

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

## Step 2. Download and upload CA flows in Connect

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

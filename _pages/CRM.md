---
title: Lab 6 - CRM Integration
author: Neha Wuthoo & Pawan Kumar & Arunabh Bhattacharjee
date: 2022-06-06
layout: post
---


# Introduction

### Lab Objective

This lab covers Webex Contact Center Agent Desktop integration with the most popular CRM solutions (Salesforce, Microsoft Dynamics 365 and Zendesk) which allows you to launch the Agent Desktop from within the CRM, providing an integrated Agent Experience for inbound and outbound calls.


# Table of Contents

[4.1 Salesforce integration](#41-salesforce-integration)
- [Optional: Create Salesforce Account](#optional-create-salesforce-account)
- [Part 1: Connector Installation](#part-1-connector-installation)
    * [1. Connector Installation From Salesforce AppExchange](#1-connector-installation-from-salesforce-appexchange)
    * [2. Connector Installation Verification](#2-connector-installation-verification)
- [Part 2: Call Center Configuration](#part-2-call-center-configuration)
    * [3. Salesforce Call Center Configuration](#3-salesforce-call-center-configuration)
    * [4. Adding Call Center Users To Salesforce Call Center Application](#4-adding-call-center-users-to-salesforce-call-center-application)
- [Part 3: Softphone & Task Layout Configuration](#part-3-softphone-task-layout-configuration)
    * [5. Create Salesforce Softphone Layout Configuration](#5-create-salesforce-softphone-layout-configuration)
    * [6. Salesforce Softphone Layout Assignment](#6-salesforce-softphone-layout-assignment)
    * [7. Salesforce Task Layout Configuration](#7-salesforce-task-layout-configuration)
- [Part 4: Reports](#part-4-reports)
    * [8. WebexCC Salesforce Desktop Report View](#8-webexcc-salesforce-desktop-report-view)
- [Part 5: WebexCC Desktop Layout](#part-5-webexcc-dekstop-layout)
    * [9. WebexCC Salesforce Desktop Layout Configuration](#9-webexcc-salesforce-desktop-layout-configuration)
- [Login Agent and Make a Test Call](#login-agent-make-call)

[4.2 Microsoft Dynamics 365 integration](#42-microsoft-dynamics-365-integration)
- [Optional: Start Microsoft Dynamics Trial](#optional-start-microsoft-dynamics-trial)
- [Part 1: Install applications for MS Dynamics 365 environment](#part-1-install-applications-for-ms-dynamics-365-environment)
    * [1. Install Channel Integration Framework from AppSource](#1-install-channel-integration-framework-from-appsource)
    * [2. Install Cisco Webex Contact Center for Microsoft Dynamics from AppSource](#2-install-cisco-webex-contact-center-for-microsoft-dynamics-from-appsource)
- [Part 2: Configure applications for MS Dynamics 365 environment](#part-2-configure-applications-for-ms-dynamics-365-environment)
    * [3. Configure Channel Integration Framework](#3-configure-channel-integration-framework)
    * [4. Create Desktop Layout file](#4-create-desktop-layout-file)
    * [5. Upload Desktop Layout to Webex Contact Center Mangement Portal](#5-upload-desktop-layout-to-webex-contact-center-management-portal)
    * [6. Update Security Policy on Control Hub](#6-update-security-policy-on-control-hub)
- [Part 3: Test Webex Contact Center Agent Desktop for MS Dynamics 365](#part-3-test-webex-contact-center-agent-desktop-for-ms-dynamics-365)
    * [7. Sign into Webex Contact Center for Microsoft Dynamics 365](#7-sign-into-webex-contact-center-for-microsoft-dynamics-365)
    * [8. Create new contact record in MS Dynamics](#8-create-new-contact-record-in-ms-dynamics)
    * [9. Make inbound test calls](#9-make-inbound-test-calls)

[4.3 Zendesk integration](#43-zendesk-integration)
- [Optional: Start Zendesk Trial](#optional-start-zendesk-trial)
- [Part 1: Install application for Zendesk](#part-1-install-application-for-zendesk)
    * [1. Install Cisco Webex Contact Center application for Zendesk from Marketplace](#1-install-cisco-webex-contact-center-application-for-zendesk-from-marketplace)
- [Part 2: Configure Webex Contact Center tenant and Zendesk instance](#part-2-configure-webex-contact-center-tenant-and-zendesk-instance)
    * [2. Create Desktop Layout for Zendesk](#2-create-desktop-layout-for-zendesk)
    * [3. Create new Organization in Zendesk](#3-create-new-organization-in-zendesk)
    * [4. Create new Customer in Zendesk](#4-create-new-customer-in-zendesk)
- [Part 3: Test Webex Contact Center Agent Desktop for Zendesk](#part-3-test-webex-contact-center-agent-desktop-for-zendesk)
    * [5. Sign into Webex Contact Center for Zendesk](#5-sign-into-webex-contact-center-for-zendesk)
    * [6. Make inbound test calls](#6-make-inbound-test-calls)


# 4.1 Salesforce integration

### Pre-requisites

1. Administrator/ Supervisor with Salesforce access.
2. Administrator/ Supervisor with WebexCC portal access.
3. New user (Agent) is already created.
4. Agent is able to login to agent desktop.
5. Agent should be part of a team.
6. Basic knowledge of JSON format.
7. Salesforce Custom Desktop Layout.
8. Use any online [JSON validator](https://jsonlint.com/) to validate the file.
9. Lab 2 (IVR and Contact Routing) completed.


## Optional: Create Salesforce Account

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/_4ZgHUSsp4U?rel=0" title="CRM Integration Lab: Salesforce Account Creation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>

- Navigate to [Salesforce Developer](https://developer.salesforce.com) website and click on **Sign Up**.

- Complete the form with your personal details and click on **Sign me up** to create your account.

> **Note:** Username needs to be in the form of an e-mail address. This address does not need to be a real e-mail address.

- Go to your e-mail inbox and wait for the confirmation e-mail regarding your account. Click on **Verify Account**.

- Enter a **password** as well as an **answer** to the security question. This will successfully create your account and log you in the Salesforce platform.


## Part 1: Connector Installation

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/T1MQ161bTSs?rel=0" title="CRM Integration Lab Part 1: Connector Installation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 
### 1. Connector Installation From Salesforce AppExchange

- Login to your [Salesforce](https://login.salesforce.com) instance and go to **Setup**.

- In the search box, type `AppExchange Marketplace`.

- In the AppExchange Marketplace type `Cisco Webex Contact Center for Salesforce`.

- Click on the Cisco Webex Contact Center App and the click on **Get It Now**.

- On the pop-up window, click on **Open Login Screen**. If prompted, login again with your credentials and **Allow** access to the `appx_api`.

- After verifying your login, choose the **Intall in This Org** option.

- Fill in the required fields with your details and accept the Terms and Conditions to be able to proceed with installation.

- Choose **Install for All Users** option and then click on **Install**.

- If asked, grant access to third party web site `_cpc.ccone.net_` by clicking on the checkbox and then on **Continue**. 

- After the installation is complete, click **Done**.

### 2. Connector Installation Verification

- In Salesforce, navigate to **Setup**.

- In the search box, type `Installed Packages`.

- In the Installed Packages list, check for **Webex Contact Center**.

- If found, then installation was successful.


## Part 2: Call Center Configuration

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/-pKYj1z2E7U?rel=0" title="CRM Integration Lab Part 2: Call Center Configuration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 3. Salesforce Call Center Configuration

- In Salesforce, navigate to **Setup**.

- In the search box, type `Call Centers` and click on **Continue**.

- Click the **Edit** link corresponding to the **Webex Contact Center Agent Desktop**.

- Click on **Edit** to set up the CTI settings.

- Update the **Display Name** field if you want to change the Display name of the call center.

- Configure the following CTI Adapter URL: https://desktop.wxcc-us1.cisco.com/ .

- Configure `Softphone Height: 600` and `Softphone Width: 550`. 

- Click **Save**


### 4. Adding Call Center Users To Salesforce Call Center Application

- Click on **Manage Call Center Users** to open the Manage Users page.

- Click on **Add More Users** button to add users to Call Center application.

- **Search for New Users** page opens where you can apply filters to find Call Center users. Click on **Find** to list all the available users.

- Select your user from the list and click on the **Add to Call Center** button.

- You will be redirected to the **Manage Users** page, where your user should now be listed.


## Part 3: Softphone & Task Layouts

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/w0tCjlyEWEY?rel=0" title="CRM Integration Lab Part 3: Softphone & Task Layouts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 5. Create Salesforce Softphone Layout Configuration

- In Salesforce, navigate to **Setup**.

- In the search box, type `Softphone Layout` and click on **Continue**.

- Click on the **New** button to open the **Softphone Layout Configuration page** and create a softphone layout to use as `default`.
 
- Enter a `Name` for the Softphone Layout Configuration. 

- Select the **Is Default Layout** checkbox to make this Softphone layout default for all the call center application.

- On the **salesforce.com objects**, remove `Lead` from the selections and add `Opportunity`.

- On the **Screen Pop Settings**, choose `Pop to new Contact` for **No matching records**, `Pop detail page` for **Single-matching records** and `Pop to search page` for **Multiple-matching records**.

- Click **Save** to create the Softphone Layout configuration.

### 6. Salesforce Softphone Layout Assignment

- If not already there, in the search box type `Softphone Layout` and click on **Continue** to reach the Softphone Layout page.

- Click on the **Softphone Layout Assignment** Button, it opens the Softphone Layout Assignment page. 

- Assign the Softphone Layout configuration you created to the **System Administrator** profile.

- Click **Save** to assign the Softphone Layouts.

### 7. Salesforce Task Layout Configuration 

- In Salesforce, navigate to **Setup**.

- In the search box, type `Object Manager` and click on it. 

- Filter the list page by typing `Task` in the **Quick Find** search box and click on the **Task button link**.

- Select **Page Layouts** on the left of the Task details page.

- Click on **Page Layout Assignment** on top-right and then on **Edit Assignment**.

- Select the **System Administrator** profile from the displayed list in the Profiles column.

- Select the **Cisco Webex Contact Center Task Layout** from the **Page Layout To Use** drop-down list on top.

- Apply the same page layout to **Standard User** and **Standard Platform User** profiles as well.

- Click **Save** to assign the Task Layout.


## Part 4: Reports

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/jLw92srDV2I?rel=0" title="CRM Integration Lab Part 4: Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 8. WebexCC Salesforce Desktop Report View 

- In Salesforce, click **App Launcher** on top left and then choose **Webex Contact Center**.

- From the Navigation Apps drop-down list, select **Reports**.

> **Note:** If Reports is not listed, click **Edit** > **Add More Items** and add the **Reports**.

- To see all the existing reports, click **All Reports**. 

> **Note:** There is a default call activity report that installs with Cisco Webex Contact Center for Salesforce client.


## Part 5: WebExCC Salesforce Desktop Layout

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/wCzcAIL6w3Y?rel=0" title="CRM Integration Lab Part 5: WebExCC Salesforce Desktop Layout" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 9. WebexCC Salesforce Desktop Layout Configuration 

- Login to [WebexCC Admin Portal](https://portal.wxcc-us1.cisco.com/portal/home.html).

- Go to **Provisioning** >  **Desktop Layout** > **New Layout**.

- Enter Name and Description for the desktop layout.

- Status by default will be **Active**. 

- Add the **Teams** to Desktop layout. Agents associated with that team will get the Salesforce Desktop Layout.

- Upload the custom desktop layout for WebexCC Salesforce Desktop.
[WebexCC_Salesforce_Desktop.zip](https://github.com/wxcctechsummit/wxcclabguides/raw/08fb8082092b2552ec89e1b42dbe84b12214a805/WebexCC_Salesforce_Desktop.zip)

- Click **Save**. This will create a custom Desktop Layout named Salesforce in WebexCC.

## Login Agent and Make a Test Call

- Back on Salesforce page, click on **App Launcher** icon on top left and then click on **Webex Contact Center**.

- On the bottom left, click on **Phone** and then **Sign In**.

- Sign in an agent that is part of the team that the Dekstop Layout was associated with previously. You can use the agent, EPs and flow created in Lab 2 Part 2 (IVR and Contact Routing) for the queued to agent scenario.

- Make sure the agent is in available state and make a test call to your EP.

- Upon accepting the call, we will see account information populated for this call. A `task activity` should also be created and visible upon accepting the call. 


# 4.2 Microsoft Dynamics 365 integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/). 
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. An MS Dynamics Sales instance. For the details, refer the next section "Start Microsoft Dynamics Trial"
4. Access to the [Webex Contact Contact Center Desktop Layout for Microsoft Dynamics](https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples/Layouts/MS Dynamics/) JSON.
5. Lab 2 (IVR and Contact Routing) completed.


## Optional: Start Microsoft Dynamics Trial

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/tXRt5PmWCAw?rel=0" title="CRM Integration Lab: Start Microsoft Dynamics Trial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>

- Navigate to [Dynamics 365 Free Trial](https://dynamics.microsoft.com/en-us/dynamics-365-free-trial/) website

- Scroll down and click on **Try for free** under "Dynamics 365 Sales".

- Enter your email address at "Let's get started" page and press **Start your free trial** button.

> **Note:** If there is a notification about using work account, click on **set up** link to create new account. Then follow the wizard.

- Enter the same email address at the first step of account creation wizard and press **Next**.

- Complete the form with your personal details and click on **Next** to continue.

- Verify your account using either SMS or phone call.

- Enter username, subdomain name under ".onmicrosoft.com" domain and password. Then press **Next** button.

- Copy and note your username at the last step of the wizard and click on **Get Started** button to create an account.

- Sing into Power Platform Admin Center under created account by providing username (in the form of an e-mail address) and password.

- In "New environment" dialog enter "Name", choose "Region" and press **Next**.

- In "Add database" dialog choose the language if needed and press **Save** to create an environment.

- Use **Refresh** button at the top of "Environments" page and wait untill the status of new envornment is changed to "Ready".

- Go to your e-mail inbox and click **Start your trial** link to activate trial.

- Once you are forwarded to "Microsoft 365 admin center" make sure that "Subscription status" is "Active".


## Part 1: Install applications for MS Dynamics 365 environment

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/h3RWXoFZDJg?rel=0" title="CRM Integration Lab: Install applications for MS Dynamics 365 environment" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 1. Install Channel Integration Framework from AppSource

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment you created for this lab.

- Click on **Dynamics 365 apps** link under "Resources" section of your environment.

- Click on **Open AppSource** at the top of the apps page.

- Search for "channel" on the AppSource page and choose "Dynamics 365 Channel Integration Framework" from the list.

- Press **Get it now** button on the app page to install it.

- Sign into AppSource if needed using your username (in the form of an e-mail address). Then press **Get it now** on the app page one more time.

- Complete the form by choosing Country/region, tick the checkbox to grant permission and press **Continue** button to proceed.

- Select an environment, tick both checkboxes and press **Install** button to start the installation.

- Use **Refresh** button at the top of "Dynamics 365 apps" page and wait untill the status of "Dynamics 365 Channel Integration Framework" app is changed to "Installed".


### 2. Install Cisco Webex Contact Center for Microsoft Dynamics from AppSource

- Click on **Open AppSource** at the top of the apps page one more time in order to navigate to AppSource.

- Search for "webex" on the AppSource page and choose **Cisco Webex Contact Center for Microsoft Dynamics** from the list.

- Press **Get it now** button on the app page to install it.

- Tick the checkbox to grant permission and press **Continue** button to proceed.

- Select an environment, tick both checkboxes and press **Install** button to start the installation.

- Use **Refresh** button at the top of "Dynamics 365 apps" page and wait untill the status of "Cisco Webex Contact Center for Microsoft Dynamics" app is changed to "Installed".


## Part 2: Configure applications for MS Dynamics 365 environment

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/Ku3-ek0o4_0?rel=0" title="CRM Integration Lab: Configure applications for MS Dynamics 365 environment" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 3. Configure Channel Integration Framework

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment you created for this lab.

- Click on **Open Environment** at the top of the environment page.

- Choose **Channel Integration Framework** on the page with published apps.

- Press **New** button at the top of "Channel Providers" page to create new channel provider.

- Complete channel provider configuration by providing the following details:

| Parameter Name                | Parameter Value                    |
| -----                         | -----                              |
| Name                          | Cisco Webex Contact Center         |
| Label                         | Cisco Webex Contact Center         |
| Channel URL                   | https://desktop.wxcc-us1.cisco.com |
| Enable Outbound Communication | Yes                                |
| Channel Order                 | 1                                  |
| API version                   | 1.0                                |
| Trusted Domain                | https://desktop.wxcc-us1.cisco.com |

- Select "Customer Services Hub" as Unified Interface Apps for the Channel.

- Select all roles available for the channel.

- Press "Save & Close" button at the top of the page to save changes.


### 4. Create Desktop Layout file

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment you created for this lab.

- Rigth-click on the link under "Environment URL" and copy link value. For example: **https://org2a50d69e.crm11.dynamics.com/** <br/>
Then paste this URL into the text editor and save - we will need it later when creating Desktop Layout JSON file.

- Navigate to [MS Dynamics Layout](https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples/Layouts/MS%20Dynamics) page.

- Click to "MSDynamics_Desktop.json" file. Copy the content of the file and paste it into any text editor.

- Find "hostname" key and replace the value of this key by Environment URL which you noted before. For example:
```
"hostName":"https://org2a50d69e.crm11.dynamics.com/"
```

- Save the file with .json extension. For example, **MSDynamics_Desktop.json**


### 5. Upload Desktop Layout to Webex Contact Center Management Portal

- Sing into [Webex Contact Center Managemnt Portal](https://portal.wxcc-us1.cisco.com/) of your lab pod.

- Go to **Provisioning** -> **Desktop Layout** and press **New Layout** button.

- Enter layout name (for example, "MS Dynamics 365"), press "Upload" and choose JSON file with layout you have created above. Once file is uploaded, make sure it is validated successfully.

- Click on "Teams" row and choose one or more teams.

> **Note:** The agent you will use to test the integration with Dynamics 365 must be the part of the team chosen above.

- Press **Save** to create the layout. Once layout is created make sure it is "Active".


### 6. Update Security Policy on Control Hub

- Sign into [Webex Control Hub](https://admin.webex.com/) of your lab pod.

- Go to **Contact Center** -> **Settings** -> **Security** and scroll down to "Content Secuity Policy Allowed List".

- If the **\*.dynamics.com** value is not added, paste it into the text field and press **Add** button. Make sure the value has been added.


## Part 3: Test Webex Contact Center Agent Desktop for MS Dynamics 365

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/PVJiQeNd2NQ?rel=0" title="CRM Integration Lab: Test Webex Contact Center Agent Desktop for MS Dynamics 365" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 7. Sign into Webex Contact Center for Microsoft Dynamics 365

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment you created for this lab.

- Click on **Open Environment** at the top of the environment page to see the list of published apps on the Apps page.

> **Note:** If you are forwarded to Channel Integration Framework page intead of Apps page, just click to **Channel Integration Framework** link at the top of the page near "Dynamics 365" title. Then you will see Apps page with the list of published apps.

- Click on "Customer Service Hub" app and you will be redirected to Dashboards tab of Customer Service Hub.

- Press **Sign In** button within "Cisco Webex Contact Center" app on the right-hand side and provide agent credentials in new borwser tab.

- Once authentication is completed, provide "Dialed Number" / "Extension" and choose proper team within "Cisco Webex Contact Center" app.

> **Note:** This team must have Desktop Layout for Dynamics 365 applied in Webex Contact Center Management Portal in the previous part of this lab.

- Make agent desktop "Available" by selecting corresponding state.


### 8. Create new contact record in MS Dynamics

> **Note:** You may create new contact record in Dynamics 365 to test the scenario when calling number matches or does not match phone number of the contact.

- Go to "Contacts" tab of Customer Service Hub and press "New" button at the top to create new account.

- Complete contact form with the details:
    * First Name
    * Last name
    * Mobile Phone (please enter calling number which you will use to make test call to Webex Contact Center later)

- Press "Save & Close" button to save the contact.


### 9. Make inbound test calls

- Initiate a call from the calling number which matches the one configured under new contact created on the previous step.

- Answer the call by the agent and make sure you see screen pop with the details of new contact created above.

- Answer the call and wait few seconds. Then hang up and wrap-up the call.

- Make sure you see activity record with call details created within MS Dynamics. "Call From" must be pre-populated with contact name.

- Initiate one more call from calling number which does not match any contact in MS Dynamics and compare the behavior.

- Answer the call by the agent and make sure you see screen pop with "No results found" notification.

- Answer the call and wait few seconds. Then hang up and wrap-up the call.

- Make sure you see activity record with call details created within MS Dynamics. "Call From" must be empty.

- Go to "Activities" and make sure you see both records created after the calls.


# 4.3 Zendesk integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/). 
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. Zendesk instance. For the details, refer the next section "Start Zendesk Trial".
4. Access to the [Webex Contact Contact Center Desktop Layout for Zendesk](hhttps://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples/Layouts/Zendesk/) JSON.
5. Lab 2 (IVR and Contact Routing) completed.


## Optional: Start Zendesk Trial

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/nhTgM2OQQCY?rel=0" title="CRM Integration Lab: Start Zendesk Trial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>

> **Note:** Zendesk free trial is valid for 14 days only. So, you need to complete the configuration and all tests within this time frame.

- Navigate to [Zendesk](https://www.zendesk.com/) website

- Click on **Free Trial** on the main page of the website.

- Enter your email address at "Start your free Zendesk trial" page, choose **No** under the option to get occasional emails and press **Next** button.

- Provide your First Name, Last Name and Phone number on the second step of the wizard and press **Next** button.

> **Note:** The phone number is mandatory, but it is not used for any kind of verification, authentication or authorization. Thus you may provide any number.

- On the last step of the wizard fill in the following fields:
    * Company Name
    * Number of employees (it is recommended to choose **1-9**)
    * Purpose of the solution
    * Zendesk subdomain
Then choose Language, enter new Password and click on **Complete trial signup**.

> **Note:** It is recommended to use host part of your eamil as Zendesk subdoamin for simplicity. For example, if your email is testemail@customer.com. try to use **testemail** (user portion of it as a subdomain). In case this subdomain is already occupied, wizard will propose another form of this name to you.

- Wait few minutes, then check and make sure that you have received 2 emails:
    * Welcome to Zendesk: Verify your email
    * Welcome to your 14-day Zendesk trial

- Once free trial provisioning is completed, go to verification email and click on **Verify your account**.

> **Note:** If you received both emails from Zendesk mentioned above, but free trial provisioning is still not completed in 3-5 minutes (there is spinning circle at the last step of the wizard), please go to verification email and click on **Verify your account**.

- Once you are redeirected to **Welcome to Zendesk Suite** page, press **Get started** button to proceed.
 
- Press **Next** on "Help your customers on any channel". Then click on **Skip tour and go to setup** on "See how ticketing works" page to get to your Zendesk instance.


## Part 1: Install application for Zendesk

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/gxQtY3OC97w?rel=0" title="CRM Integration Lab: Install Cisco Webex Contact Center application for Zendesk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 1. Install Cisco Webex Contact Center application for Zendesk from Marketplace

- Sign into your Zendesk instance. URL should have format - **https://<your-zendesk-subdomain>.zendesk.com**
 
> **Note:** You may find URL of your Zendesk trial instance within "Welcome to your 14-day Zendesk trial" email. It is printed next to "Your account:" section.

- Once, signed into Zendesk, click on "Admin" menu item (gear icon at the botton) of the vertical menu bar on the left. Then click on **Marketplace** under **Apps** section. Zendesk Marketplace will be opened in new tab of the web browser.

- Search for "webex" on Marketplace and click on **Cisco Webex Contact Center** application.

- Click on **Install** on the page of "Cisco Webex Contact Center" application. Then choose an account to install this app from drop-down list (if you started free trial, there should be only one item in the list) and click on "Install" one more time. You will be redirected to "Zendesk Admin Center".

- Check and make sure "AgentDesktopHostUrl" field contains **https://desktop.wxcc-us1.cisco.com** value for Cisco Webex Contact Center app in Zendesk Admin Center. Then scroll donw and press "Install" buttonat the bottom of the page.

- Wait few seconds untill installation is completed and "Cisco Webex Contact Center" appears in the list of currently installed apps.


## Part 2: Configure Webex Contact Center tenant and Zendesk instance

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/OJp6-lKnDX4?rel=0" title="CRM Integration Lab: Configure Webex Contact Center tenant and Zendesk instance" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 2. Create Desktop Layout for Zendesk

- Navigate to [Zendesk Layout](https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples/Layouts/Zendesk) page.

- Click to "Zendesk_Desktop.json" file. Copy the content of the file, paste it into any text editor and save with .json extension. For example, **Zendesk_Desktop.json**

- Sing into [Webex Contact Center Managemnt Portal](https://portal.wxcc-us1.cisco.com/) of your lab pod.

- Go to Provisioning -> Desktop Layout and press **New Layout** button.

- Enter layout name (for example, "Zendesk Desktop Layout"), press **Upload** and choose JSON file with layout you have created above. Once file is uploaded, make sure it is validated successfully.

- Click on "Teams" row and choose one or more teams.

> **Note:** The agent you will use to test the integration with Zendesk must be the part of the team chosen above.

- Press **Save** to create the layout. Once layout is created make sure it is "Active".


### 3. Create new Organization in Zendesk

- Sign into your Zendesk instance.

- Click on "Organizations" item of the vertical menu bar on the left.

- Hover over **+ Add** button and choose **Organization** item from the pop-up menu.

- Enter organization name and domain, then click **Save**.

- Go to "Organizations" tab one more time to make sure new organization is successfully added.


### 4. Create new Customer in Zendesk

- In Zendesk instance click on "Customers" item of the vertical menu bar on the left.

- Hover over **+ Add** button and choose **User** item from the pop-up menu.

- Enter user name and email. Choose user type "End User" and press **Add** button.

- Click on **+ add contact** link on the left and enter calling number which you will use to make test call to Webex Contact Center later.

- Go to "Customers" tab one more time to make sure new user is successfully added.


## Part 3: Test Webex Contact Center Agent Desktop for Zendesk

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/9-TmtxanubU?rel=0" title="CRM Integration Lab: Test Webex Contact Center Agent Desktop for Zendesk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 5. Sign into Webex Contact Center for Zendesk

- Sign into your Zendesk instance.

- Click to "Cisco Webex Contact Center" icon (grey square with white circle inside) at the top right corner of Zendesk window to see agent desktop.

- Press **Sign In** button within "Cisco Webex Contact Center" app on the right-hand side and provide agent credentials in new borwser tab.

- Once authentication is completed, provide "Dialed Number" / "Extension" and choose proper team within "Cisco Webex Contact Center" app.

> **Note:** This team must have Desktop Layout for Zendesk applied in Webex Contact Center Management Portal in the previous part of this lab.

- Make agent desktop "Available" by selecting corresponding state.


### 6. Make inbound test calls

- Initiate a call from the calling number which matches the one configured under Zendesk user created in the previous part of this lab.

- Answer the call by the agent and make sure you see screen pop with the details of the user created in the previous part of this lab and new ticket. "Requester" filed of the ticket must be pre-populated with user's name.

- Answer the call and wait few seconds. Then hang up and wrap-up the call.

- Make sure the ticket is completed with call details.

- Initiate one more call from calling number which does not match any user in Zendesk and compare the behavior.

- Answer the call by the agent and make sure you see screen pop with the details of new user created just after answering the call and new ticket. "Requester" filed of the ticket must be pre-populated with new user's name.

- Answer the call and wait few seconds. Then hang up and wrap-up the call.

- Make sure the ticket is completed with call details.

- Click on "Views" item of the vertical menu bar on the left. Then click on "All unresolved tickets" and make sure you see both records created after test calls.



---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	



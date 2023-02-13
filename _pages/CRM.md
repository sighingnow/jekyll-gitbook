---
title: Lab 6 - CRM Integration
author: Neha Wuthoo & Pawan Kumar & Arunabh Bhattacharjee
date: 2022-06-06
layout: post
---

# Introduction

### Lab Objective

This lab covers Webex Contact Center Agent Desktop integration with the most popular CRM solutions (Salesforce, Microsoft Dynamics 365, Service Now and Zendesk) which allows you to launch the Agent Desktop from within the CRM, providing an integrated Agent Experience for both inbound and outbound calls.

# Table of Contents

[6.1 Salesforce integration](#61-salesforce-integration)

- [Optional: Create Salesforce Account](#optional-create-salesforce-account)
- [Part 1: Connector Installation](#part-1-connector-installation)
  - [1. Connector Installation From Salesforce AppExchange](#1-connector-installation-from-salesforce-appexchange)
  - [2. Connector Installation Verification](#2-connector-installation-verification)
- [Part 2: Call Center Configuration](#part-2-call-center-configuration)
  - [3. Salesforce Call Center Configuration](#3-salesforce-call-center-configuration)
  - [4. Adding Call Center Users To Salesforce Call Center Application](#4-adding-call-center-users-to-salesforce-call-center-application)
- [Part 3: Softphone & Task Layout Configuration](#part-3-softphone-task-layout-configuration)
  - [5. Create Salesforce Softphone Layout Configuration](#5-create-salesforce-softphone-layout-configuration)
  - [6. Salesforce Softphone Layout Assignment](#6-salesforce-softphone-layout-assignment)
  - [7. Salesforce Task Layout Configuration](#7-salesforce-task-layout-configuration)
- [Part 4: Reports](#part-4-reports)
  - [8. WebexCC Salesforce Desktop Report View](#8-webexcc-salesforce-desktop-report-view)
- [Part 5: WebexCC Desktop Layout](#part-5-webexcc-dekstop-layout)
  - [9. WebexCC Salesforce Desktop Layout Configuration](#9-webexcc-salesforce-desktop-layout-configuration)
- [Login Agent and Make a Test Call](#login-agent-make-call)

[6.2 Microsoft Dynamics 365 integration](#62-microsoft-dynamics-365-integration)

- [Optional: Start Microsoft Dynamics Trial](#optional-start-microsoft-dynamics-trial)
- [Part 1: Install applications for MS Dynamics 365 environment](#part-1-install-applications-for-ms-dynamics-365-environment)
  - [1. Install Channel Integration Framework from AppSource](#1-install-channel-integration-framework-from-appsource)
  - [2. Install Cisco Webex Contact Center for Microsoft Dynamics from AppSource](#2-install-cisco-webex-contact-center-for-microsoft-dynamics-from-appsource)
- [Part 2: Configure applications for MS Dynamics 365 environment](#part-2-configure-applications-for-ms-dynamics-365-environment)
  - [3. Configure Channel Integration Framework](#3-configure-channel-integration-framework)
  - [4. Create Desktop Layout file](#4-create-desktop-layout-file)
  - [5. Upload Desktop Layout to Webex Contact Center Mangement Portal](#5-upload-desktop-layout-to-webex-contact-center-management-portal)
  - [6. Update Security Policy on Control Hub](#6-update-security-policy-on-control-hub)
- [Part 3: Test Webex Contact Center Agent Desktop for MS Dynamics 365](#part-3-test-webex-contact-center-agent-desktop-for-ms-dynamics-365)
  - [7. Sign into Webex Contact Center for Microsoft Dynamics 365](#7-sign-into-webex-contact-center-for-microsoft-dynamics-365)
  - [8. Create new contact record in MS Dynamics](#8-create-new-contact-record-in-ms-dynamics)
  - [9. Make inbound test calls](#9-make-inbound-test-calls)

[6.3 Zendesk integration](#64-zendesk-integration)

- [Optional: Start Zendesk Trial](#optional-start-zendesk-trial)
- [Part 1: Install Webex Contact Center application on Zendesk instance](#part-1-install-webex-contact-center-application-on-zendesk-instance)
  - [Install Webex Contact Center application for Zendesk from Marketplace](#install-webex-contact-center-application-for-zendesk-from-marketplace)
- [Part 2: Configure Webex Contact Center tenant and Zendesk instance](#part-2-configure-webex-contact-center-tenant-and-zendesk-instance)
  - [Create Custom Desktop Layout for Zendesk](#create-custom-desktop-layout-for-zendesk)
  - [Create new Customer in Zendesk](#create-new-customer-in-zendesk)
- [Part 3: Test Webex Contact Center Agent Desktop for Zendesk](#part-3-test-webex-contact-center-agent-desktop-for-zendesk)
  - [Sign into Webex Contact Center for Zendesk](#sign-into-webex-contact-center-for-zendesk)
  - [Make inbound test call from a number registered in Zendesk CRM](#a-make-inbound-test-call-from-a-number-registered-in-zendesk-crm)
  - [Make inbound test call from a number NOT registered in Zendesk CRM](#b-make-inbound-test-call-from-a-number-not-registered-in-zendesk-crm)

# 6.1 Salesforce integration

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

- Go to **Provisioning** > **Desktop Layout** > **New Layout**.

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

# 6.2 Microsoft Dynamics 365 integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/).
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. An MS Dynamics Sales instance. For the details, refer the next section [Start Microsoft Dynamics Trial](#optional-start-microsoft-dynamics-trial)
4. Access to the [Webex Contact Contact Center Desktop Layout for Microsoft Dynamics](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/MS Dynamics) JSON.
5. Lab 2 (IVR Contact Routing) completed.

## Optional: Start Microsoft Dynamics Trial

### Part 1 - Create Dynamics 365 Sales account

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/e2f95e82-93ab-4175-982f-339c9c8a05f3" width="100%" height="100%" title="Start Microsoft Dynamics Trial" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Navigate to [Dynamics 365 Free Trial](https://dynamics.microsoft.com/en-us/dynamics-365-free-trial/) website

- Scroll down and click on **Try for free** under "Dynamics 365 Sales".

- Enter your email address at "Let's get started" page and press **Start your free trial** button.

> **Note:** If there is a notification about using work account, click on **set up** link to create new account. Then follow the wizard.

- To verify your email address, click **Next**.

- In the next window, click **Create account**.

- Create a password and click **Next**.

- Create a password and click **Next**.

- Enter the security code that you have received in your email to verify and click **Next**.

- Complete the form with your personal details and click **Next** to continue.

- Complete the next form with your organization details and click **Save**.

- Next, enter any random number when asked for "Tax ID or PAN registeration number" and click **Save**.

- On the next page, click on **Launch Trial** to open your Dynamics 365 trial account.

> **Note:** Do not log out / refresh the browser at this point (without getting Microsoft-created user account details).

### Part 2 - Get Microsoft-created user account details and login to Power Platform Admin center

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/a03c6589-4d5d-49f8-a4d8-92c8cf7d14b3" width="100%" height="100%" title="Start Microsoft Dynamics Trial, Part 2" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- In your Dynamics 365 trial account, click on the gear icon on the top right corner to go to **Settings** and then select **Personalization Settings** from the list.

- In the pop-up window, scroll down to the end and click on **user information** hyperlink. This will open user details in a new browser window.

- Copy and save the **User Name** displayed on that page. This user is created by microsoft and has microsoft domain added in the user name.

> **Note:** If you see your email ID in the user name, wait for sometime. It may take upto 20 minutes to update the Microsoft-created user details there.

- Next step is to Sign in to [**Power Platform Admin Center**](admin.powerplatform.microsoft.com/) with the user name we got from the last step and click **Next**.

- Since we do not have the password of this user yet, click **Forgot my password** and follow the wizard to create a new password.

- After creating the new password, click on **Sign in with your new password**

- Enter the user name and password to login to **Power Platform Admin center**

- Click on **Environments** from the left side navigation bar. You should be able to see a **Sales Trial** environment created with the Type - **Trial (subscription-based)**

> **Note:** If you do not see Trial (subscription-based) enviornment created, follow the below steps to create one :
>
> - Under **Environments**, click on **New** button on the top.
> - In "New environment" dialog enter "Name", choose "Region", "Type" should be "Trial (subscription-based)" and press **Next**.
> - Choose "Language", "Currency". Toggle Dynamics 365 apps to enable it. Do not choose any apps to automatically deploy and press **Save** to create an environment.
> - Use **Refresh** button at the top of "Environments" page and wait untill the status of new envornment is changed to "Ready".

## Part 1: Install applications for MS Dynamics 365 environment

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/e2e20b2c-cf18-48b5-bfb8-b2dbdde07823" width="100%" height="100%" title="Install Channel Integration Framework from AppSource" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

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

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/39a8b835-0ed7-4ed3-97c3-26fb1c6d35f3" width="100%" height="100%" title="Configure Channel Integration Framework" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### 3. Configure Channel Integration Framework

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment you created for this lab.

- Click on **Open Environment** at the top of the environment page.

- Choose **Channel Integration Framework** on the page with published apps.

- Press **New** button at the top of "Channel Providers" page to create new channel provider.

- Complete channel provider configuration by providing the following details:

| Parameter Name                | Parameter Value                    |
| ----------------------------- | ---------------------------------- |
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

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/f41ce761-8672-41dd-b286-e18a1fba4913" width="100%" height="100%" title="Create Desktop Layout file" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

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

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/9e5991cb-f16e-4f54-94ef-839d27916d63" width="100%" height="100%" title="MSD Call test 1.ABC" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br/>

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/b834ac8b-d54f-444e-b077-4be1569d6be3" width="100%" height="100%" title="MSD Call Test 1.DE" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

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

  - First Name
  - Last name
  - Mobile Phone (please enter calling number which you will use to make test call to Webex Contact Center later)

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

# 6.3 Service Now integration

# 6.4 Zendesk integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/).
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. Zendesk instance. For the details, refer the next section [Start Zendesk Trial](#optional-start-zendesk-trial).
4. Access to the [Webex Contact Center Desktop Layout for Zendesk](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/Zendesk) JSON.
5. Lab 2 (IVR Contact Routing) completed.

## Optional: Start Zendesk Trial

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
    <iframe src="https://app.vidcast.io/share/embed/df78bfe5-195d-48c3-bb82-4cf4346ecf33" width="100%" height="100%" title="Start Zendesk Trial" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br/>

> ##### NOTE :
>
> Zendesk free trial is valid for 14 days only. So, you need to complete the configuration and all tests within this time frame.
> {: .block-tip }

- Navigate to [Zendesk](https://www.zendesk.com/) website.

- Click on **Free Trial** on the main page of the website.

- Enter your email address at "Start your free Zendesk trial" page.

- Provide your First Name, Last Name, Phone number and Job title on the second step of the wizard and press **Next** button.

> **Note:** The phone number is mandatory, but it is not used for any kind of verification, authentication or authorization. Thus you may provide any number.

- On the last step of the wizard fill in the following fields:

  - Company Name
  - Number of employees
  - Purpose of the account
  - Zendesk subdomain

  Then choose Language, enter new Password and click on **Complete trial signup**.

- You should receive an email saying **Welcome to Zendesk: Verify your email**. Click on **Verify your account**.

- You will be redirected to **Improve your trial experience** page, select any answer or Click on **No thanks** button to proceed.

- You will be taken to your Zendesk instance.

## Part 1: Install Webex Contact Center application on Zendesk instance

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/5f58f249-f316-4ec3-9d98-2be79781d2e3" width="100%" height="100%" title="Install Webex Contact Center application on Zendesk instance" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Install Webex Contact Center application for Zendesk from Marketplace

- Sign into your Zendesk instance. URL should have format - **https://< your-zendesk-subdomain >.zendesk.com**
  (This is the same page where you were at the end of last section)

- Once signed into Zendesk, click on "Admin" icon (gear icon at the bottom of the vertical menu bar on the left). Then click on **Go to Admin Center**

- You will be routed to the admin portal. Now, click on **Apps and integrations**. Then click on **Marketplace**.
  Zendesk Marketplace will be opened in a new tab of the web browser.

- Search for "Webex" on Marketplace and click on **Webex Contact Center** application.

- Click on **Install** on the page of "Webex Contact Center" application. Then choose an account to install this app from drop-down list (Since you have already created Zendesk instance, you should be able to see your account name in the list) and click on "Install" one more time. You will be redirected to "Zendesk Admin Center" for the app installation.

- The URL for "AgentDesktopHostUrl" is specific to your geographic location. By default, its value is **https://desktop.wxcc-us1.cisco.com**. Then scroll down and press "Install" button at the bottom of the page.

- You can set the height and width of the connector widget here or can customize it later.

- Wait few seconds until installation is completed and "Webex Contact Center" appears in the list of currently installed apps.

## Part 2: Configure Webex Contact Center tenant and Zendesk instance

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/1dc62037-6473-4a65-9686-57d65a02a123" width="100%" height="100%" title="Configure Webex Contact Center tenant and Zendesk instance" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Create Custom Desktop Layout for Zendesk

- Navigate to [Zendesk Layout](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/Zendesk) GitHub page.

- Click on "Zendesk_Desktop_xxxxx.json" file. Copy the contents of the file, paste it in any text editor and save with .json extension. For example, **Zendesk_Desktop.json**

- Sign into [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/) of your lab pod.

- Go to Provisioning -> Desktop Layout and press **New Layout** button.

- Enter layout name (for example, "Zendesk Desktop Layout"), press **Upload** and choose JSON file you have created above. Once file is uploaded, make sure it is validated successfully.

- Click on "Teams" row and choose one or more teams.

> **Note:** The agent, you will use to test the integration with Zendesk, must be the part of the team chosen above.

- Press **Save** to create the layout. Once layout is created make sure it is "Active".

### Create new Customer in Zendesk

- In Zendesk instance, click on "Customers" icon in the vertical menu bar on the left.

- Click on **Add customer** button. Provide the Customer Name and Email ID (optional) and press **Add** button.

- Customer will be created and its info page will be opened. Click on **+add contact** link on the left side and enter the calling number which you will use to make test call to Webex Contact Center.

- Go to "Customers" tab one more time to make sure new customer is successfully added. If you are unable to see the new customer there, just refresh the browser.

## Part 3: Test Webex Contact Center Agent Desktop for Zendesk

### Sign into Webex Contact Center for Zendesk

- Sign into your Zendesk instance.

- Click on Webex icon (grey square with Webex logo inside) at the top right corner of Zendesk window to launch embedded agent desktop in the CRM.

- Press **Sign In** button within "Webex Contact Center" app and provide agent credentials in the new browser tab.

- Once authentication is completed, provide "Dial Number" / "Extension" and choose proper team within "Webex Contact Center" app.

> **Note:** This team must have the Custom Desktop Layout for Zendesk applied in Webex Contact Center Management Portal (covered in the previous part of this lab).

- Make the agent "Available" by selecting corresponding state.

### a. Make inbound test call from a number registered in Zendesk CRM

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/0bd7c450-020c-4187-b06f-b152ca8595e3" width="100%" height="100%" title="Call Test Part 1" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Initiate a call from the calling number which should be the same as the phone number of Zendesk customer created in the previous part of this lab.

- Answer the call on the agent's end. You will be able to see the screen pop with the details of the customer created in the previous part of this lab and a new ticket will be created.

- "Requester" field of the ticket will be pre-populated with the customer's name.

- Now hang up and wrap-up the call.

- The ticket that was created at the start of the call will be updated with call details after call wrap up.

### b. Make inbound test call from a number NOT registered in Zendesk CRM

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/b5e6a197-5389-4e35-93ba-418f5a5656d3" width="100%" height="100%" title="Call Test Part 2" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Initiate one more call from the calling number which does not match any customer in Zendesk and compare the behavior.

- Answer the call on the agent's end. A new customer will be created and the customer details page will be opened as the screen pop. Also, a new ticket will be created.

- "Requester" field of the ticket will be pre-populated with the new customer's name.

- Now hang up and wrap-up the call.

- The ticket that was created at the start of the call will be updated with call details after call wrap up.

- Click on "Views" icon on the vertical menu bar on the left. You should be able to see both the tickets created after making the test calls.

> **Note:** For Custom Desktop Layout configurations, kindly check out [help.webex docs](https://help.webex.com/en-us/article/jg2krv/Integrate-Webex-Contact-Center-with-Zendesk#customize)

---

<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>

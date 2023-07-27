---
title: Lab 6 - CRM Integration
author: Neha Wuthoo & Pawan Kumar & Arunabh Bhattacharjee
date: 2022-06-06
layout: post
---
```
Last modified: Wed, 3 May 2023
```

## Introduction

### Lab Objective

This lab covers Webex Contact Center Agent Desktop integration with the most popular CRM solutions (Salesforce, Microsoft Dynamics 365, Service Now and Zendesk) which allows you to launch the Agent Desktop from within the CRM, providing an integrated Agent Experience for both inbound and outbound calls.

## Table of Contents

| Topic                                                                     | Lab Type      | Difficulty Level | Estimated length |
| ------------------------------------------------------------------------- | ------------- | ---------------- | ---------------- | 
| [Salesforce integration](#salesforce-integration)                         | Practical Lab | MID              | 35 min           |
| [Microsoft Dynamics 365 integration](#microsoft-dynamics-365-integration) | Practical Lab | MID              | 30 min           |
| [Service Now integration](#service-now-integration)                       | Practical Lab | MID              | TBD              |     |
| [Zendesk integration](#zendesk-integration)                               | Practical Lab | MID              | 25 min           | 

# Salesforce integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/).
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. Salesforce instance. For the details, refer the next section [Create Salesforce Account](#optional-create-salesforce-account).
4. Access to the [Webex Contact Center Desktop Layout for Salesforce](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/Salesforce) JSON.
5. Lab 2 (IVR Contact Routing) completed.

## Optional: Create Salesforce Account

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/1dd3ccfb-ac40-4a4c-a72e-0da16fe113c3" width="100%" height="100%" title="PART 0 - Create Salesforce Account" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br/>

- Navigate to Salesforce Developer [Signup Page](https://developer.salesforce.com/signup).

- Complete the form with your personal details and click on **Sign me up** to create your account.

> **Note:** Username needs to be in the form of an e-mail address. This address does not need to be a real e-mail address.

- Go to your e-mail inbox and wait for the confirmation e-mail regarding your account. Click on **Verify Account** in the confirmation email.

- Set up your Salesforce account **password** and **security question**. This will successfully create your account and log you in the Salesforce platform.

## Part 1: Connector Installation

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/778b9e9e-b336-4628-9288-5065882859f3" width="100%" height="100%" title="PART 1 - Connector Installation" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>
 
### Connector Installation From Salesforce AppExchange

- Login to your [Salesforce](https://login.salesforce.com) instance and go to **Setup**.

- In the search box, type `AppExchange Marketplace`.

- In the AppExchange Marketplace type `Webex Contact Center for Salesforce`.

- Click on the Webex Contact Center App and then click on **Get It Now**.

- On the pop-up window, click on **Open Login Screen**. If prompted, login again with your credentials and **Allow** access to the `appx_api`.

- After verifying your login, choose the **Intall in This Org** option.

- Fill in the required fields with your details and accept the **Terms and Conditions** check box to be able to proceed with installation.

- Choose **Install for All Users** option and then click on **Install**.

- If asked, grant access to third party web site `_cpc.ccone.net_` by clicking on the checkbox and then click on **Continue**.

- After the installation is completed, click **Done**.

### Connector Installation Verification

- In Salesforce, navigate to **Setup**.

- In the search box, type `Installed Packages`.

- In the Installed Packages list, check for **Webex Contact Center**.

- If found, then installation was successful.

## Part 2: Call Center Configuration

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/dae6c6c0-0140-481a-8d93-53380d729e03" width="100%" height="100%" title="PART 2 - Call Center Configuration" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Salesforce Call Center Configuration

- In Salesforce, navigate to **Setup**.

- In the search box, type `Call Centers` and click on **Continue**.

- Click the **Edit** link corresponding to the **Webex Contact Center Agent Desktop** to edit the Call Center Configurations.

- Update the **Display Name** field, if you want to change the Display name of the call center.

- Configure the CTI Adapter URL with the Agent Desktop URL. Use the relevant data center.
  e.g. - https://desktop.wxcc-us1.cisco.com/ .

- Click **Save**

### Adding Call Center Users To Salesforce Call Center Application

- Open the Call Center Definition file again (not in Edit mode). Just click on the Call Center File name.

- At the bottom of the page, click on **Manage Call Center Users** to open the Manage Users page.

- Click on **Add More Users** button to add users to the Call Center application.

- On the **Search for New Users** page, either apply filters to find specific Call Center users or click on **Find** to list all the available users.

- Select your user from the list and click on the **Add to Call Center** button.

- You will be redirected to the **Manage Users** page, where your user should now be listed.

## Part 3: Softphone & Task Layouts

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/f434bc8b-9498-4861-a914-3141ed682153" width="100%" height="100%" title="PART 3 - Softphone & Task Layouts" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Create Salesforce Softphone Layout Configuration

- In Salesforce, navigate to **Setup**.

- In the search box, type `Softphone Layout` and click on **Continue**.

- Click on the **New** button to open the **Softphone Layout Configuration page** and create a softphone layout to use as `default`.

- Enter a `Name` for the Softphone Layout Configuration.

- Select the **Is Default Layout** checkbox to make this Softphone layout default for all the call center application.

- On the **Display these salesforce.com objects**, remove `Lead` from the selections and add `Case`.

- On the **Screen Pop Settings**, choose `Don't pop any screen` for **No matching records**, `Pop detail page` for **Single-matching records** and `Pop to search page` for **Multiple-matching records**.

- Click **Save** to create the Softphone Layout configuration.

- In the Call Center Configuration file, make the changes (if required) under **Screenpop Settings** (for No Matching Records) as per the business use-case.

### Salesforce Softphone Layout Assignment

- If not already there, in the search box type `Softphone Layout` and click on **Continue** to reach the Softphone Layout page.

- Click on the **Softphone Layout Assignment** Button, it opens the Softphone Layout Assignment page.

- Assign the Softphone Layout configuration you created to the **System Administrator** or your user profile.

- Click **Save** to assign the Softphone Layout.

### Salesforce Task Layout Configuration

- In Salesforce, navigate to **Setup**.

- In the search box, type `Object Manager` and click on it.

- Filter the list page by typing `Task` in the **Quick Find** search box and click on the **Task** button link.

- Select **Page Layouts** on the left of the Task details page.

- Click on **Page Layout Assignment** on top-right and then on **Edit Assignment**.

- Select the **System Administrator** profile or your user profile from the displayed list in the Profiles column.

- Select the **Webex Contact Center Task Layout** from the **Page Layout To Use** drop-down list on top.

- Click **Save** to assign the Custom Task Layout.

## Part 4: Reports

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/89bdbffa-ee60-4f82-b6ec-ac5b3c46dff3" width="100%" height="100%" title="PART 4 - Reports" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### WebexCC Salesforce Desktop Report View

- In Salesforce, click **App Launcher** on top left and then choose **Webex Contact Center**.

- From the Navigation Apps drop-down list, select **Reports**.

> **Note:** If Reports is not listed, click **Edit** > **Add More Items** and add the **Reports**.

- To see all the existing reports, click **All Reports**.

> **Note:** There is a default call activity report that is configured alongwith Webex Contact Center app installation.

## Part 5: WebExCC Salesforce Desktop Layout

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/f5b8bc81-87b1-48e9-91b2-b2df8c090913" width="100%" height="100%" title="PART 5 - WebexCC Salesforce Custom Desktop Layout" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### WebexCC Salesforce Desktop Layout Configuration

- Download the latest Custom Desktop Layout file from the [Github Repo](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/Salesforce)

- Save it on your machine as JSON file.

- Login to [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/portal/home.html).

- Go to **Provisioning** > **Desktop Layout** > **New Layout**.

- Enter Name and Description for the desktop layout.

- Add the **Teams** to the Desktop layout. Only the agents associated with that team will get the Salesforce Desktop Layout.

- Upload the custom desktop layout file saved earlier.

- Click **Save**. This will create a Custom Desktop Layout in Webex Contact Center.

## Part 6: Test Webex Contact Center Agent Desktop for Salesforce

### Call Center Definition File - Advanced Configurations

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/77eb5100-9fe6-4fae-ba9f-b6dca835e613" width="100%" height="100%" title="PART 6(a) - Call Center Definition File - Advanced Configurations" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br/>

- This document covers customization of each field of call center definition file, its description and possible values :
  [Integrate Webex Contact Center with Salesforce](https://help.webex.com/en-us/article/nhxw7kfb/Integrate-Webex-Contact-Center-with-Salesforce#Cisco_Reference.dita_053158ba-52cb-437e-9243-64d28a3c9845)

### Login to Salesforce Agent Desktop and Make a Test Call

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/ad3757df-3eff-49bb-b2c8-a1ec6f9899c3" width="100%" height="100%" title="PART 6(b) - Test Webex Contact Center Salesforce Agent Desktop" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- On Salesforce page, click on **App Launcher** icon on top left and then click on **Webex Contact Center**.

- On the bottom left, click on **Phone** and then on **Sign In**.

- Sign in to Webex Contact Center Agent Desktop using agent credentials. This agent user needs to be part of the same team with which we had associated the Desktop Layout previously.

- Make sure the agent is in available state and make a test call to your EP.

- Upon accepting the call, you should be able to see a screenpop as per the configurations in the Call Center Definiton file.

- A Phone Call Activity Record will be created for every call and will be associated with the Salesforce Record.

# Microsoft Dynamics 365 integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/).
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. An MS Dynamics Sales instance. For the details, refer the next section [Start Microsoft Dynamics Trial](#optional-start-microsoft-dynamics-trial)
4. Access to the [Webex Contact Center Desktop Layout for Microsoft Dynamics](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/MS%20Dynamics) JSON.
5. Lab 2 (IVR Contact Routing) completed.

## Optional: Start Microsoft Dynamics Trial

### Step 1 : Create Dynamics 365 Sales account

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

### Step 2 : Get Microsoft-created user account details and Login to Power Platform Admin center

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/a03c6589-4d5d-49f8-a4d8-92c8cf7d14b3" width="100%" height="100%" title="Start Microsoft Dynamics Trial, Part 2" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- In your Dynamics 365 trial account, click on the gear icon on the top right corner to go to **Settings** and then select **Personalization Settings** from the list.

- In the pop-up window, scroll down to the end and click on **user information** hyperlink. This will open user details in a new browser window.

- Copy and save the **User Name** displayed on that page. This user is created by microsoft and has microsoft domain added in the user name.

> **Note:** If you see your email ID in the user name, wait for sometime. It may take upto 20 minutes to update the Microsoft-created user details there.

- Next step is to Sign in to [Power Platform Admin Center](https://admin.powerplatform.microsoft.com) with the user name we got from the last step and click **Next**.

- Since we do not have the password of this user yet, click **Forgot my password** and follow the wizard to create a new password.

- After creating the new password, click on **Sign in with your new password**

- Enter the user name and password to login to **Power Platform Admin center**

- Click on **Environments** from the left side navigation bar. You should be able to see a **Sales Trial** environment created with the Type - **Trial (subscription-based)**

> **Note:** If you do not see Trial (subscription-based) enviornment created, follow the below steps to create one :
>
> - Under **Environments**, click on **New** button on the top.
> - In "New environment" dialog enter "Name", choose "Region", "Type" should be "Trial (subscription-based)" and press **Next**.
> - Choose "Language", "Currency". **Toggle Dynamics 365 apps to enable it.** Do not choose any apps to automatically deploy and press **Save** to create an environment.
> - Use **Refresh** button at the top of "Environments" page and wait untill the status of new envornment is changed to "Ready".

## Part 1: Install applications for MS Dynamics 365 environment

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/e2e20b2c-cf18-48b5-bfb8-b2dbdde07823" width="100%" height="100%" title="Install Channel Integration Framework from AppSource" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Install Channel Integration Framework from AppSource

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment named **Sales Trial**.

- Click on **Dynamics 365 apps** link under "Resources" section of your environment.

- Click on **Open AppSource** at the top of the apps page.

- Search for "channel" on the AppSource page and choose **Dynamics 365 Channel Integration Framework** from the list.

- Press **Get it now** button on the app page to install it.

- Sign into AppSource if needed using your username (with microsoft doamin in it). Then press **Get it now** on the app page one more time.

- Choose the "Sales Trial" environment, tick both checkboxes and press **Install** button to start the installation.

- Use **Refresh** button at the top of "Dynamics 365 apps" page and wait untill the status of "Dynamics 365 Channel Integration Framework" app is changed to "Installed".

### Install Cisco Webex Contact Center for Microsoft Dynamics from AppSource

- Click on **Open AppSource** at the top of the apps page one more time in order to navigate to AppSource.

- Search for "webex" on the AppSource page and choose **Webex Contact Center for Microsoft Dynamics** from the list.

- Press **Get it now** button on the app page to install it.

- Select an environment, tick both checkboxes and press **Install** button to start the installation.

- Use **Refresh** button at the top of "Dynamics 365 apps" page and wait untill the status of "Cisco Webex Contact Center for Microsoft Dynamics" app is changed to "Installed".

## Part 2: Configure applications for MS Dynamics 365 environment

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/39a8b835-0ed7-4ed3-97c3-26fb1c6d35f3" width="100%" height="100%" title="Configure Channel Integration Framework" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Configure Channel Integration Framework

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment named **Sales Trial**

- Click on **Open Environment** at the top of the environment page.

- Choose **Channel Integration Framework** on the page with published apps.

- Press **New** button at the top of "Channel Providers" page to create a new channel provider.

- Complete channel provider configuration by providing the following details:

| Parameter Name                | Parameter Value                    |
| ----------------------------- | ---------------------------------- |
| Name                          | Webex Contact Center               |
| Label                         | Webex Contact Center               |
| Channel URL                   | https://desktop.wxcc-us1.cisco.com |
| Enable Outbound Communication | Yes                                |
| Channel Order                 | 1                                  |
| API version                   | 1.0                                |
| Trusted Domain                | https://desktop.wxcc-us1.cisco.com |

- Select "Customer Services Hub" as Unified Interface Apps for the Channel.

- Select the relevant roles for the channel.

- Press "Save & Close" button at the top of the page to save changes.

### Create Custom Desktop Layout file

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/f41ce761-8672-41dd-b286-e18a1fba4913" width="100%" height="100%" title="Create Desktop Layout file" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment named **Sales Trial**

- Note down the "Environment URL" under "Details" section. For example: **https://org2a50d69e.crm11.dynamics.com/** <br/>
  We will need it while creating Custom Desktop Layout JSON file.

- Navigate to [MS Dynamics Layout](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/MS%20Dynamics) page.

- Click on "MSDynamics_Desktop_xxxxx.json" file. Copy the contents of the file, paste it in any text editor.

- Find "hostname" key and replace the value of this key by Environment URL which you noted before. For example:

```
"hostName":"https://org2a50d69e.crm11.dynamics.com/"
```

- Save the file with .json extension. For example, **MSDynamics_Desktop.json**

### Upload Custom Desktop Layout to Webex Contact Center Management Portal

- Sing into [Webex Contact Center Managemnt Portal](https://portal.wxcc-us1.cisco.com/) of your lab pod.

- Go to **Provisioning** -> **Desktop Layout** and press **New Layout** button.

- Enter layout name (for example, "MS Dynamics 365"), press "Upload" and choose JSON file you have created above. Once file is uploaded, make sure it is validated successfully.

- Click on "Teams" row and choose one or more teams.

> **Note:** The agent you will use to test the integration with Dynamics 365 must be the part of the team chosen above.

- Press **Save** to create the layout. Once layout is created make sure it is "Active".

### Update Security Policy on Control Hub

- Sign into [Webex Control Hub](https://admin.webex.com/) of your lab pod.

- Go to **Contact Center** -> **Settings** -> **Security** and scroll down to "Content Secuity Policy Allowed List".

- If the **\*.dynamics.com** value is not added, paste it into the text field and press **Add** button. Make sure the value has been added.

## Part 3: Test Webex Contact Center Agent Desktop for MS Dynamics 365

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/9e5991cb-f16e-4f54-94ef-839d27916d63" width="100%" height="100%" title="Sign into Webex Contact Center for Microsoft Dynamics 365" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### Sign into Webex Contact Center for Microsoft Dynamics 365

- Sign into [Microsoft Power Platform Admin Center](https://admin.powerplatform.microsoft.com).

- Go to "Environments" and click on the environment named **Sales Trial**

- Click on **Open Environment** at the top of the environment page to see the list of published apps on the Apps page.

> **Note:** If you are forwarded to Channel Integration Framework page intead of Apps page, just click on **Channel Integration Framework** link at the top of the page near "Dynamics 365" title. Then you will see Apps page with the list of published apps.

- Click on "Customer Service Hub" app and you will be redirected to Dashboards tab of Customer Service Hub.

- Click on the icon on the right side bar to open the embedded **Webex Contact Center** app inside the Dynamics CRM.

- Press **Sign In** button and provide agent credentials in a new browser tab.

- Once authentication is completed, provide "Dial Number" / "Extension" and choose the proper team within "Webex Contact Center" app.

> **Note:** This team must have the Custom Desktop Layout for Dynamics 365 applied in Webex Contact Center Management Portal in the previous part of this lab.

- Make agent "Available" by selecting corresponding state.

### Create new contact record in MS Dynamics

> **Note:** You may create new contact record in Dynamics 365 to test the scenario when calling number matches phone number of the contact.

- Go to "Contacts" tab of Customer Service Hub and press "New" button at the top to create new account.

- Complete contact form with the details:

  - First Name
  - Last name
  - Mobile Phone (please enter calling number which you will use to make test call to Webex Contact Center later)

- Press "Save & Close" button to save the contact.

### Make inbound test calls

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/b834ac8b-d54f-444e-b077-4be1569d6be3" width="100%" height="100%" title="Make inbound test calls" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Initiate a call from the calling number which matches the one configured under new contact created on the previous step.

- Answer the call by the agent. You should see the screen pop with the details of new contact created above.

- Answer the call and wait few seconds. Then hang up and wrap-up the call.

- You should see an activity record created with call details captured within MS Dynamics. “Call From” must be pre-populated with contact name.

- Initiate one more call from calling number which does not match any contact in MS Dynamics and compare the behavior.

- Answer the call by the agent. You should see the screen pop with "No results found" notification.

- Answer the call and wait few seconds. Then hang up and wrap-up the call.

- You should see an activity record created with call details captured within MS Dynamics. “Call From” must be empty.

- Go to "Activities" and you should see both records created after the calls.

# Service Now integration

### Pre-requisites

1. Administrator access to the organization on [Control Hub](https://admin.webex.com/) and [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/).
2. An agent account with access to [Agent Desktop](https://desktop.wxcc-us1.cisco.com/).
3. Service Now instance. For the details, refer the next section [Start Service Now Trial](#optional-start-service-now-trial).
4. Access to the [Webex Contact Center Desktop Layout for Service Now](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/ServiceNow) JSON.
5. Lab 2 (IVR Contact Routing) completed.

> ##### NOTE :
>
> This lab is for Developer Instances only. For Licensed Instances, please refer :
> <br/> https://help.webex.com/en-us/article/54vvw/Integrate-Webex-Contact-Center-with-ServiceNow >> Integrate tab >> Install ServiceNow for licensed enterprise instances.
> {: .block-tip }

## Optional: Start Service Now Trial

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/63aeb2e0-4503-4df8-bd6e-ff045dcd66e3" width="100%" height="100%" title="Servicenow CRM Trial Account" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br/>

- Navigate to [Service Now Developer Portal](https://developer.servicenow.com).

- Click on **Sign up and Start Building**.

- Fill the form with requested information. Accept the **Terms and Conditions** check box and click on **Sign Up**.

- Verify the account by clicking on the verification link received on the email.

- Now, login to the developer portal.

- Click on **Request Instance** button and select the appropriate region to request for a Personal Development Instance (PDI).

- You will be on waitlist for the instance. You will get an email once an instance is assigned to you.

## Part 1: Install the OpenFrame Interface

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/1ff4a677-bf6e-4de0-94cb-426ac75431c3" width="100%" height="100%" title="Install the OpenFrame Interface" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Sign in to your ServiceNow developer portal.

- From the **Filter navigator** at the upper left side of the window, navigate to **Plugins**.

- Scroll down and search for **Openframe** plugin.

- Click on **Install** button to install the Openframe plugin.

- In the Activate Plugin dialog box, click on **Activate** button.

- Once the plugin activation is completed, click on **Close & Reload Form** button.

- To verify the plugin activation, from the **Filter navigator** at the upper left side of the window, search for OpenFrame.
  If you are able to see OpenFrame >> Configurations listed there, the plugin installation is verified.

## Part 2: Commit the Update Set & Edit System Properties

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/a65f5d73-a95f-4529-9d00-bc1cdc63dce3" width="100%" height="100%" title="Update Commit & Editing System Properties" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### a. Commit the Update Set

- Navigate to [Github page](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/ServiceNow) to download the latest System Update Set XML file.

- Save the file **webexcc-servicenow-update-setv(X).xml** on your machine.

- On your ServiceNow Developer Instance, from the **Filter navigator** at the upper left side of the window, navigate to System Update Sets >> **Update Sets to Commit**.

- Click the **Import Update Set from XML** link.

- Click **Choose File**, select the System Update Set XML file saved from the previous step, and click on **Upload**.

- The update set appears in the Retrieved Update Sets list and is in the Loaded state. Click the **Update Set File Name (link)** to open the Update Set.

- Click **Preview Update Set** to check the update set for any issues.

- Click **Close** on the dialog box once preview is completed.

- Click on **Commit Update Set**.

- Click **Close** on the dialog box once Update Set Commit is completed.

### b. Edit System Properties

- In the **Filter navigator** at the upper left side of the window, type **sys_properties.list** and press enter.

- On the System Properties page, search for **agentdesktop_url** and click on it to open.

- In the value field, enter the URL for the **Webex Contact Center Agent Desktop** according to the region of operation.

  - North America: https://desktop.wxcc-us1.cisco.com
  - UK: https://desktop.wxcc-eu1.cisco.com
  - EU: https://desktop.wxcc-eu2.cisco.com
  - APJC: https://desktop.wxcc-anz1.cisco.com

- Click on **Update** to save the changes.

### c. Optional : Change the Activity Table Name

- In the **Filter navigator** at the upper left side of the window, type **sys_properties.list** and press enter.

- On the System Properties page, search for **webexccactivitytable** and click on it to open.

- Change the value field as required. Click on **Update** to save the changes.

### d. Optional : Add User Groups

- In the **Filter navigator** at the upper left side of the window, navigate to **Groups** under System Security.

- Create a new user group or use an existing one.

- Click on the User Group Name to open it. Click on **Edit** button.

- Search for **sn_openframe_user** under Collection and move it to your user group.

- Click on **Save**.

## Part 3: OpenFrame Configurations and Service Now Desktop Layout setup

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/9475bd0b-4445-4ee5-8baa-601f52be2cc3" width="100%" height="100%" title="OpenFrame Configuration and Desktop layout setup" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

### a. OpenFrame Configurations

- From the **Filter navigator**, navigate to OpenFrame >> Configurations.
- Click **New**.
- Enter the following values in the form:

| Parameter Name | Parameter Value              |
| -------------- | ---------------------------- |
| Name           | Webex Contact Center Desktop |
| Title          | Webex Contact Center         |
| Width          | 550 (Recommended)            |
| Height         | 600 (Recommended)            |

- To the right of the URL field, click on the **Lock button** and add **agentdesktop.do** as the URL.

- Click **Submit**.

### b. Service Now Desktop Layout setup

- Navigate to [Github page](https://github.com/CiscoDevNet/webex-contact-center-crm-integrations/tree/main/ServiceNow) to download the latest Desktop Layout file.

- Click on **ServiceNow_Desktop_xxxxx.jso** file. Copy the contents of the file, paste it in any text editor.

- Update the properties in the Desktop Layout file, if required. Save the file with **.json extension**.

- Sign into [Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com/).

- Go to Provisioning -> Desktop Layout and press **New Layout** button.

- Enter layout name (for example, "ServiceNow Desktop Layout"), press **Upload** and choose JSON file created in the previous step. Once the file is uploaded, make sure it is validated successfully.

- Click on "Teams" row and choose one or more teams.

> **Note:** The agent, you will use to test the integration with Service Now, must be the part of the team chosen above.

- Press **Save** to create the layout. Once the layout is created make sure it is "Active".

## Part 4: Test Webex Contact Center Service Now Agent Desktop

### a. Make an inbound test call from a number NOT registered in ServiceNow CRM

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
    <iframe src="https://app.vidcast.io/share/embed/c6630fe1-ba1b-47aa-ac99-40418126efe3" width="100%" height="100%" title="Test Inbound Calls Part 1 (Updated 2nd May)" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- From the **Filter navigator**, navigate to **Agent Workspace Home**.

- Click on the phone icon on the bottom left corner and then on **Sign In**.

- Sign in to Webex Contact Center Agent Desktop using agent credentials. This agent user needs to be part of the same team with which we had associated the Desktop Layout previously.

- Make sure the agent is in available state and make a test call to your EP.

- Upon accepting the call, you should be able to see the screenpop with a **new interaction** created.

- "Opened For" field in the interaction will be blank as there is no matching customer record.

- **Activity details** can be seen in the second vertical section and will be updated with the interaction.

- If required, an incident can be created by clicking on the **Create Incident** button on the top right corner of the page.

- Now hang up and wrap-up the call.

### b. Make an inbound test call from a number registered in ServiceNow CRM

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
    <iframe src="https://app.vidcast.io/share/embed/5718590a-f798-4155-bc9f-55c3a24db0b3" width="100%" height="100%" title="Test Inbound Calls Part 2" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br/>

> **Note:** To create a new user, login to the Developer Portal.
>
> Navigate to Users (under System Security) and click on New button.

- From the **Filter navigator**, navigate to **Agent Workspace Home**.

- Click on the phone icon on the bottom left corner and then on **Sign In**.

- Sign in to Webex Contact Center Agent Desktop using agent credentials. This agent user needs to be part of the same team with which we had associated the Desktop Layout previously.

- Make sure the agent is in available state and make a test call to your EP.

- Upon accepting the call, you should be able to see the screenpop with a **new interaction** created.

- The interaction will be mapped with the matching customer record and "Opened For" field will be pre-populated with the customer name.

- **Activity details** can be seen in the second vertical section and will be updated with the interaction.

- If required, an incident can be created by clicking on the **Create Incident** button on the top right corner of the page.

- Now hang up and wrap-up the call.

# Zendesk integration

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

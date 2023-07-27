---
title: Lab 1 - Admin Experience
author: Dmitry Bokatov & Mike Turnbow
date: 2022-01-10
layout: post
---
```
Last modified: Wed, 21 Jun 2023
```

<script>
    function update(){them = Array.from(document.querySelectorAll("input")).reduce((acc, input) => ({...acc, [input.id + "_out"] : input.value}),{});
	Object.entries(them).forEach((entry) => {
    Array.from(document.getElementsByClassName(entry[0])).forEach((element,index) => 
    {
      console.log(document.getElementsByClassName(entry[0])[index].innerHTML); 
      document.getElementsByClassName(entry[0])[index].innerHTML = entry[1];
    })})

  event.preventDefault()
  if(document.forms["IVRdeets"][0].value != "Your EP DN"){
    localStorage.setItem("EPDN",document.forms["IVRdeets"][0].value)
  }
  if(document.forms["IVRdeets"][1].value != "Your Attendee ID"){
    localStorage.setItem("attendeeID",document.forms["IVRdeets"][1].value)
  }  
  if(document.forms["IVRdeets"][2].value != "Agent Email"){
    localStorage.setItem("agentEmail",document.forms["IVRdeets"][2].value)
  } 
  if(document.forms["IVRdeets"][3].value != "Agent Extension"){
    localStorage.setItem("agentEXT",document.forms["IVRdeets"][3].value)
  }
  if(document.forms["IVRdeets"][4].value != "Supervisor Email"){
    localStorage.setItem("supervisorEmail",document.forms["IVRdeets"][4].value)
  } 
  if(document.forms["IVRdeets"][5].value != "Supervisor Extension"){
    localStorage.setItem("supervisorEXT",document.forms["IVRdeets"][5].value)
  }
  }
</script>

## Table of Contents

| Topic                                                                                 | Lab Type           | Difficulty Level | Estimated length |
| ------------------------------------------------------------------------------------- | ------------------ | ---------------- | ---------------- |
| [Introduction to the new Admin Experience](#introduction-to-the-new-admin-experience) | Watch & Understand | EASY             | 10 min           |
| [Control Hub User Management Tasks](#control-hub-user-management-tasks)               | Practical Lab      | EASY             | 10 min           |
| [Contact Center User Configuration](#contact-center-user-configuration)               | Practical Lab      | EASY             | 5 min            |
| [Bulk Operations](#bulk-operations)                                                   | Practical Lab      | EASY             | 5 min            |
| [Access to the Agent Desktop](#access-to-the-agent-desktop)                           | Practical Lab      | EASY             | 10 min           |
| [Bonus: Single Sign-on- OKTA IdP ](#bonus-single-sign-on)                             | Practical Lab (optional)      | MID              | 15 min           |


## Overview of the lab:

In this Lab, we will go through the tasks that are required to complete the general pre-configuration of a tenant. These tasks are to be undertaken by a customer administrator. By following each of the steps, you would have prepared your tenant to begin configuring different services offered by the platform. At the end of the lab, you should be able to log in to an agent interface with the configured user extension.
You can do the tasks from the lab guide either on the **Lab Tenant** (you need to request access from the lab support team) or you can do it directly on your **Gold Tenant**.

## Introduction

### Lab Objective

- This lab is designed to help you do the initial setup and configuration of the tenant.
- The lab contains multiple exercises on Control Hub and Admin Portal to make you comfortable with the Webex Contact Center application.

### Pre-requisites

- You have Admin access to Control Hub (Lab Tenant or Gold Tenant)
- You have the dialed number registered on the Control Hub

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\

## Lab Section

# Introduction to the new Admin Experience

> The overall aim of admin consolidation is to provide a single pane of glass (SPOG) experience for administrators so that admins need not have frequent context switch by having to traverse different applications. The following video outlines the new features of a new admin experience. This introduces, the new left navigation panel for Webex Contact Center in Control Hub as well as other configuration settings which were migrated from the Management Portal.



<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/8c40da99-5967-465a-8efb-092949d76c73" width="100%" height="100%" title="Introduction to the new Admin Experience" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>


# Control Hub User Management Tasks

> The following video outlines the process to manage different types of users to the Customer tenant. Following the steps, you will add new users and set the Calling extension. While adding the user, we will see how to select user roles.

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/715d21da-91cf-4890-82c9-c60da5c5e883" width="100%" height="100%" title="Control Hub User Management Tasks" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>



### 1. Define your Attendee ID and Other parameters

>Please skip the task 1 if you are doing the labs on the Gold Tenant. The task below is only for the Lab Tenant option where you have received an email with the Lab tenant credentials. In a such case, please copy and paste the data from the email into the corresponding fields.
{: .block-tip }

<form id="IVRdeets">

  <label for="DN">EP DN you were assigned:</label>
  <input type="tel" id="DN" name="DN" onChange="update()"><br>

  <label for="attendee">Attendee ID:</label>
  <input type="text" id="attendee" name="attendee" onChange="update()"><br>

  <label for="agent">Agent Email Address:</label>
  <input type="email" id="agent" name="agent" onChange="update()"><br>

  <label for="agentEXT">Agent Extension:</label>
  <input type="number" id="agentEXT" name="agentEXT" onChange="update()"><br>

  <label for="supervisor">Supervisor Email Address:</label>
  <input type="email" id="supervisor" name="supervisor" onChange="update()"><br>

  <label for="supervisorEXT">Supervisor Extension:</label>
  <input type="number" id="supervisorEXT" name="supervisorEXT" onChange="update()"><br>
<br>

  <button onclick="update()">Save</button>
</form>

<script>
document.forms["IVRdeets"][0].value = localStorage.getItem("EPDN") || "Your EP DN"
document.forms["IVRdeets"][1].value = localStorage.getItem("attendeeID") || "Your Attendee ID" 
document.forms["IVRdeets"][2].value = localStorage.getItem("agentEmail") || "Agent Email"
document.forms["IVRdeets"][3].value = localStorage.getItem("agentEXT") || "Agent Extension"
document.forms["IVRdeets"][4].value = localStorage.getItem("supervisorEmail") || "Supervisor Email"
document.forms["IVRdeets"][5].value = localStorage.getItem("supervisorEXT") || "Supervisor Extension"

update()
</script>


### 2. Add agent and supervisor users and set the calling extensions

> As a result of the task below you should add two new users to the Control Hub and assign Webex CC Agent and Supervisor licenses. 
> For agent and supervisor, you can use the [https://maildrop.cc/](https://maildrop.cc/){:target="\_blank"} which allows you to create a temporary account without registration. We allow to use of maildrop registrations on the current **Lab Tenant** only without admin permissions (only for agents and supervisors). 

> We don't recommend using the maildrop accounts on your **Gold Tenant** due to security reasons (an attacker can easily gain access to your tenant). 
{: .block-warning }


| **User Role** | **User email**                                                                | **User Extension** |
| ------------- | ----------------------------------------------------------------------------- | ------------------ |
| Agent         | <w class="attendee_out">AttendeeID</w>_agent@maildrop.cc      | <w class= "agentEXT_out">Your Agent Extension</w> |
| Supervisor    | <w class="attendee_out">AttendeeID</w>_supervisor@maildrop.cc | <w class= "supervisorEXT_out">Your Supervisor Extension</w> |



- Login to the [Control Hub](https://admin.webex.com){:target="\_blank"} with the admin account.

- In the left navigation pane go to **_Users_** under **Management**.

- Click on **_Manage Users_** button.

- Select **_Manually add users_**.

- Set the agent's **First name**, **Last name** and input the **Email addresses** of the agent.

- Click on `+` sign and add the supervisor in the same way.

- For consistency, verify that the **Email addresses** are same as in the table above and click **_Next_**.

- In **Step 2: Assign license for users** select **_Webex Calling (Professional)_** & **_Contact Center (Premium Agent)_**.

- On the next page, make sure that the **_Location_** is selected under **_Assign Numbers_**. The correct value should be already selected by default.

- The **_Phone Number_** left as **None**.

- On the same page, Enter the correct `Extension` under **_Assign Numbers_**. The correct Extensions should be provided to you with the admin credentials.

- In step **Step 4: Review** verify the data and Click **_Add users_**.

- On the next page, you should get confirmation **"2 users added"**. Confirm the same by pressing **_Close_**.

- Now select the supervisor user and modify his role to **_Premium Agent - Supervisor Role_** by clicking the **_Edit Licenses_** button in the **_Licenses_** section.

- Click **_Save_** and **_Close_** to confirm the changes.

- Validate the users by going to the email account (such as [https://maildrop.cc/](https://maildrop.cc/){:target="\_blank"}). Open the Control Hub validation email and follow the **Cisco Webex** instructions to activate the both accounts. 

![mailinator](/assets/images/maildrop.gif)
 
- Refresh the **_Users_** page in the Control Hub, make sure that both users are in **Active** status.

# Contact Center User Configuration

> The following video outlines how to create a Site, Team, and Multimedia Profile that will be assigned to the Contact Center users. We will also see how to navigate to the Webex Contact Center Configuration and how to associate customer-created Site, Team, and Multi-Media Profile with new users.

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/84f8c6ad-5812-4e8b-85e6-935c49f1fcc3" width="100%" height="100%" title="February 07, 2023 at 10:22 AM" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

| **Entity**          | **Name**                                                |
| ------------------- | ------------------------------------------------------- |
| Multimedia Profiles | <w class="attendee_out">Your_Attendee_ID</w>_MMP   |
| Site                | <w class="attendee_out">Your_Attendee_ID</w>_Site  |
| Team1               | <w class="attendee_out">Your_Attendee_ID</w>_Team1 |



> **NOTE:** If you are using the **Lab Tenant** the **Attendee ID** should be user as a prefix in the name for all your configurations.
> {: .block-tip }

### 1. Create new Multimedia Profile

- Login with admin credentials to Control Hub by accessing [https://admin.webex.com](https://admin.webex.com){:target="\_blank"}.

- In the left pane navigate to **_Contact Center_** card.

- Click **_Settings_** in the upper menu.

- Scroll down in the left navigation panel to the **_DESKTOP EXPERIENCE_** section and click on **_Multimedia Profiles_**.

- Click on `Create Multimedia Profile` button.

- Input Name as **<w class="attendee_out">Your_Attendee_ID</w>_MMP**.

- In the Media Details section, leave the **Blended** mode and input `1` for **_Voice_**, `3` for **_Chat_**, `3` for **_Email_**, `3` for **_Social_**, and click **_Create_** button in the lower right corner.

### 2. Create new Site

- Navigate to **_USER MANAGEMENT_** in the left navigation panel and select **_Sites_**.

- Click on `Create Site` button and provide the Name as **<w class="attendee_out">Your_Attendee_ID</w>_Site**.

- Select your MMP in the **_Multimedia profile_** drop down list and hit **_Create_**.

### 3. Create new Team

- Navigate to **_Teams_** under the **_USER MANAGEMENT_**.

- Click on `Create Team`.

- Input _Name_ as **<w class="attendee_out">Your_Attendee_ID</w>_Team1**.

- Select your site from the **_Parent Site_** drop-down.

- Select the **_team type_** `Agent Based`.

- Select your **_Multimedia profile_**.

- Left as a default value **_Global Layout_** in the **_Desktop layout_** drop-down and click on **_Create_** button.

### 4. Activate the Contact Center Settings for the users 

- Navigate to **_Contact Center Users_** under the **_USER MANAGEMENT_**.

- Find your and select the agent, to launch the **_Edit_** view for a particular User configuration.

- Click on **_Contact Center Enabled_** toggle to move it to **_On_**.

- In the **_Agent Settings_** section, select your site in the **_Site_** drop-down.

- Click the **_Teams_** area and select your team

- Select the default **_Agent-Profile_** in the **_Desktop Profile_** drop-down list.

- Choose the **_Multimedia Profile_** and hit **_Save_**.

- In the User's table make sure that the agent is now shown with the **_Contact Center Enabled_** flag as `Yes` and **_Status_** as `Active`.

- Repeat the steps above for the supervisor.

# Bulk Operations

> In this section you will learn how to use the Bulk Configuration in Control Hub by creating a second team. As an administrator, you can use Bulk Operations to create, modify, import, or export configuration objects in Webex Contact Center. This feature provides greater speed and efficiency to deploy and configure Webex Contact Center systems.

Bulk Operations is available for the following configuration object types:

| ------------------- | -------------------- |
| ------------------- | -------------------- |
| Entry Point         | Auxiliary Code       |
| Queue               | Agent Profile        |
| Outdial Entry Point | Address Book         |
| Outdial Queue       | Outdial ANI          |
| Site                | Skill Definition     |
| Team                | Skill Profile        |
| Users               | Entry Point Mappings |
| User Profiles       | Audio Files          |
| Work Types          | Global Variable      |




### Create the second Team

- Go to the Control Hub by accessing [https://admin.webex.com](https://admin.webex.com){:target="\_blank"}.

- In the left pane navigate to **_Contact Center_** card.

- Select **_Bulk Operations_** in the Webex CC navigation pane from the left.

- Click **_Create Bulk Operations_** button in the right upper corner.

![Bulk Menue](/assets/images/Bulk-1.gif)

- In Step 1 select the configuration object **_Team_** in the drop-down list.

- In the Export section enter the **MyTeam** as the file name and click **Next** button.

- Once the task is **Completed** click on **_Download export file_** button under the **Action** and open the csv file in the notepad.

- The first line is the headers, it is mandatory to have it during the import process. Remove all lines from the CSV file except the first line with headers and the line with **<w class="attendee_out">Your_Attendee_ID</w>_Team1**.

```csv
NAME,SITE,TYPE,MULTIMEDIA PROFILE,SKILL PROFILE,DN,CAPACITY,DESKTOP LAYOUT
xxxx_team1,pod110_Site,AGENT,pod110_MMP,,,,Global Layout
```

- Rename the Team1 to **<w class="attendee_out">Your_Attendee_ID</w>_Team2** and save the file. You should have only 2 rows in the file.
  Example:

```csv
NAME,SITE,TYPE,MULTIMEDIA PROFILE,SKILL PROFILE,DN,CAPACITY,DESKTOP LAYOUT
xxxx_team2,pod110_Site,AGENT,pod110_MMP,,,,Global Layout
```

- Go back to the **Bulk Operations** menu and click **_Create Bulk Operations_** button again.

- In step 1, select the **_Team_** configuration object from the drop-down list and **import** the CSV file by dragging it into the Import section.

- Click **Next** button and wait the results. The status should be shown as **Completed**.

- Go to the Management Portal, click on **_Provisioning_** -> **_Team_** and verify that the **<w class="attendee_out">Your_Attendee_ID</w>_Team2** is created.

- In the Management Portal directly associate the **<w class="attendee_out">Your_Attendee_ID</w>_Team2** with your agent and supervisor by adding your users to that team (__Advanced Settings -> Agents__).


# Access to the Agent Desktop

> By following the steps below, you will log in to the Agent Desktop with your credentials and indicate the number where you want to receive the calls.

> The Lab Tenant is located in the US datacenter. It does not allow outbound international calls. If you have the US numbers you can use that for sign in as an agent or supervisor. Otherwise, please download the Webex App according to the steps below.
{: .block-warning }

### 1. Download and Login in the Webex app for PC or Mac

> **Note:** You would need two Webex app for placing calls to Entry Point and accepting on the agent side. Alternatively, if you have a US number, you can use it as an agent's extension. This tenant does not allow numbers outside of the United States. In this lab, we will use the Webex app for your PC or Mac for the **agent** account.
{: .block-warning }

- Download the Webex app from **[https://www.webex.com/downloads.html](https://www.webex.com/downloads.html){:target="\_blank"}**.

![Webex App](/assets/images/Lab1-AD-1.png)

- Install the application on your PC/Mac.

- Open Webex app and сlick **Sign In**. Specify the agent credentials.

### 2. Download and Login in the Webex app for mobile

> **Note:** If you are using the **Lab Tenant**, you will need 2 Webex apps. One for placing a call to Entry Point (it is needed for making free calls to EP) and another for accepting the call on the agent side. In this lab, we will use, as an example, the Webex mobile app for the **supervisor** account.
{: .block-tip }

- Open the Application Manager (**Play Store** or **App Store**) on your mobile phone.

- Search for **_Webex_**.

- **Download** and **Open** the Webex app.

- Set **_Email address_** and **_Password_** of the supervisor account.

> **Note:** Make sure that you give access to the phone's microphone for the webex app.

### 3. Agent Desktop Login

> **Note**: To log in to the agent desktop, use either a different web browser or a new incognito web page. This will prevent any browser caching issues with admin and agent credentials.
> Depending on your tenant's location the agent ULR link can be different. The example below is for the US DC.
{: .block-tip }

- Navigate to **[https://desktop.wxcc-us1.cisco.com/](https://desktop.wxcc-us1.cisco.com/){:target="\_blank"}** in the different browser or in incognito mode.

- Enter the agent’s **email ID** which you created in the previous task.

- Enter the **Password** for the appropriate username.

- In the **_Station Credentials_** pane, select **"Extension"** and input the configured number for that user.

> **Note:** If you have the US number, you can use it instead of the agent's Extension during sign-in. 
{: .block-tip }

- Select the team **<w class="attendee_out">Your_Attendee_ID</w>_Team1**.

- Click **_Submit_**. Make sure that you are successfully logged in to the Agent Desktop.
![Agent Sign In](/assets/images/AG-2.gif)


Now you can continue with Lab 2 or try the bonus SSO task below.

# Bonus: Single Sign-on -OKTA IdP

>In this section you will learn how to enable Single sign-on (SSO) in Control Hub. It enables users to sign in to Webex securely by authenticating to your organizations common identity provider (IdP). The Webex App uses the Webex service to communicate with the Webex Platform Identity Service. The identity service authenticates with your identity provider (IdP)

> **NOTE:** Please skip that task If you are using the **Lab Tenant**, this task can be configured only on your Gold Tenant. Inform other users on your tenant since the non SSO accounts will be deactivated.
> {: .block-warning }
 
- From the customer view in [https://admin.webex.com](https://admin.webex.com/), go to Management > Organization Settings, and then scroll to Authentication, and then toggle on the Single sign-on setting to start the setup wizard.

- Select SAML as the identity provider and click Next.

![SSO1](/assets/images/SSO/1.png)

-  Choose the self signed by Cisco certificate and download the metadata and click Next.

![SSO2](/assets/images/SSO/2.png)

- Sign in to the Okta Tenant (example.okta.com, where example is your company or organization name) as an administrator, go to Applications, and then click Browse App Catalog. Search for "Cisco Webex" and add the application to your tenant.

![SSO4](/assets/images/SSO/4.png)

- Click Next and then click SAML 2.0.

- In your browser, open the metadata file that you downloaded from Control Hub. Copy the URLs for the **entityID** (at the top of the file) and the **assertionConsumerService location** (at the bottom of the file)

![SSO5](/assets/images/SSO/5.png)
![SSO6](/assets/images/SSO/6.png)

-On the **Cisco Webex** tab in Okta, click on **Sign On** and then click on edit.Scroll to **Advanced Sign-on Settings**, and then paste the Entity ID and Assertion Consumer Service values that you copied from the Control Hub metadata file and then save changes.

![SSO7](/assets/images/SSO/7.png)

- Click **Sign On** and then download the Okta metadata file. You'll import this file back into your Control Hub instance

![SSO8](/assets/images/SSO/8.png)


- Click **Assignments**, choose all the users and any relevant groups that you want to associate with apps and services managed in Control Hub, click **Assign** and then click **Done**.

![SSO9](/assets/images/SSO/9.png)

- Return back to Contro Hub.If Control Hub is no longer open in the browser tab, from the customer view in [https://admin.webex.com](https://admin.webex.com/), go to Management > Organization Settings, scroll to Authentication, and then choose Actions > Import Metadata

- On the Import IdP Metadata page, either drag and drop the IdP metadata file onto the page or use the file browser option to locate and upload the metadata file. Click Next.

![SSO10](/assets/images/SSO/10.png)
 - At the next page just click Next

- Select **Test SSO setup**, and when a new browser tab opens, authenticate with the IdP by signing in.

![SSO12](/assets/images/SSO/12.png)


- Return to the Control Hub browser tab. If the test was successful, select Successful test. Turn on SSO and click Next.

![SSO13](/assets/images/SSO/13.png)

***Congratulations! You have successfully turned on SSO for your tenant***


---

<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>

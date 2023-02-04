---
title: Lab 1 - Admin Experiense
author: Dmitry Bokatov & Mike Turnbow 
date: 2022-01-10
layout: post
---

## Table of Contents


| Topic                                                                                    | Lab Type      | Dificulty Level | Estimated length |
| ---------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Control Hub User Management Admin Task](#part-1-control-hub-user-management-admin-task) | Practical Lab | EASY            | 15 min           |
| [Managment Portal User Configuration](#managment-portal-user-configuration)              | Practical Lab | EASY            | 7 min           |
| [Bulk Configuration](#bulk-configuration)                                                | Practical Lab | EASY            | 5 min            |
| [Access to the Agent Desktop](#part-4-access-to-the-agent-desktop)                       | Practical Lab | EASY            | 15 min            |


## Overview of the lab:

In this Lab, we will go through the tasks that are required to complete the general pre-configuration of a tenant. These tasks are to be undertaken by a customer administrator. By following each of the steps, you would have prepared your tenant to begin configuring different services offered by the platform. At the end of the lab, you should be able to log in to an agent interface with the configured user extension.


## Introduction

### Lab Objective

- This lab is designed to help you do the initial setup and configuration for your GOLD tenant and to be familiar with the control hub and admin portal UI.
- The lab contains multiple exercises on Control Hub and Admin Portal to make you comfortable with the Webex Contact Center application.

### Pre-requisites

- You have Admin access to Control Hub
- You have the dialed number registered on the Control Hub


### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="_blank"}**\


## Lab Section

# Control Hub User Management Tasks


> The following video outlines the process to manage different types of users to the Customer tenant. Following the steps, you will add new users and set the Calling extension. While adding the user, we will see how to select user roles. 


<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/0p37TL5wtCY?rel=0" title="WxCC Lab #1 Part 1: Control Hub User Management Admin Task" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

| **User Role** | **User email**                                                          | **User Extension** |
| ------------- | ----------------------------------------------------------------------- | ------------------ |
| Agent         | <w class = "attendee-class">your_attendee_ID</w>_agent1@\<your domain\> | \<your assign DN\> |
| Supervisor    | <w class = "attendee-class">your_attendee_ID</w>_supervisor1@\<your domain\> | \<your assign DN\> |

> Don't use the domain **mailinator.com** for the user accounts in Control Hub. For security reasons, such accounts will be automatically deleted.
{: .block-danger }

### 1.  Define your Attendee ID

<div class="alert"></div>
<form id="attendee-form">
      <label for="attendee-id">Attendee ID</label>
      <input type="text" name="attendee-id" id="attendee-id" />
      <button type="submit" id="save">SAVE</button>
</form>
<script src="/assets/gitbook/form.js"></script>

>**NOTE:** the **Attendee ID** should be provided with the admin credentionals. You can share your tenant and dial number with your colleagues so they can do the configuration in parallel. In that case, the **Attendee ID** is the same for all of you, but you can use a sub prefix with the number. Ex: _attendeeID**1**_agent1, attendeeID**2**_agent1, etc._
{: .block-tip }
	
### 2.  Add agent and supervisor users and set the calling extensions

- Login to the [Control Hub](https://admin.webex.com){:target="_blank"} with the admin account.

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

- On the next page, you should get confirmation **"2  users added"**. Confirm the same by pressing **_Close_**.

- Now select the supervisor user and modify his role to **_Premium Agent - Supervisor Role_** by clicking the  **_Edit Licenses_** button in the **_Licenses_** section. 

- Click **_Save_** and **_Close_** to confirm the changes.

- Validate the users by going to the assigned email account. Open the Control Hub validation email and follow the **Cisco Webex** instructions to activate the both accounts.

- Refresh the **_Users_** page in the Control Hub, make sure that both users are in **Active** status.


# Managment Portal User Configuration

> The following video outlines how to access the managment portal and navigate the different configuration menus to create a Site, Team, and Multimedia Profile that will be assigned to the Contact Center users. We will also see how to navigate to the Webex Contact Center Management Portal and how to associate customer-created Site, Team, and Multi-Media Profile with new users. 


<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/92ou5Yias-8?rel=0" title="WxCC Lab #1 Part 2: Admin Portal Multimedia Profile, Site and Team Configuration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

| **Entity**          | **Name** |
| ------------------- | -------- |
| Multimedia Profiles | <w class = "attendee-class">your_attendee_ID</w>_MMP   |
| Site                | <w class = "attendee-class">your_attendee_ID</w>_Site  |
| Team1               | <w class = "attendee-class">your_attendee_ID</w>_Team1 |

>**NOTE:** the **Attendee ID** should be provided with the admin credentionals. You can share your tenant and dial number with your colleagues so they can do the configuration in parallel. In that case, the **Attendee ID** is the same for all of you, but you can add a sub prefix with the number. _Ex: attendeeID**1**_MMP, attendeeID**2**_MMP, etc.
{: .block-tip }

### 1. Create new Multimedia Profile

- Login with admin credentionals to Control Hub by accessing [https://admin.webex.com](https://admin.webex.com){:target="\_blank"}.

- In the left pane navigate to **_Contact Center_** card.

- Click **_Settings_** in the upper menu.

- Scroll down to the **_Advanced Configuration_** section and click on **_Go to Webex Contact Center Management Portal_**.

- Ensure that browser pop up blockers are not blocking the **_Admin Portal_** pop up.

- In the Management Portal click on **_Provisioning_** and select **_Multimedia Profiles_**.

- Click on `+ New Multimedia Profile` to open Multimedia Profile configuration page.

- Input Name as **<w class = "attendee-class">your_attendee_ID</w>_MMP**.

- In the Media Details section, select the **Blended** mode and input `1` for **_Voice_**, `3` for **_Chat_**, `3` for **_Email_**, and click **_Save_**.

### 2. Create new Site

- Navigate to **_Provisioning_** and select **_Site_**.

- Click on `+ New Site` button and provide the Name as **<w class = "attendee-class">your_attendee_ID</w>_Site**.

- Select **<w class = "attendee-class">your_attendee_ID</w>_MMP** in the **_Multimedia Profile_** drop down list and hit **_Save_**.

### 3. Create new Team

- Navigate to **_Provisioning_** and select **_Team_**.

- Click on `+ New Team`.

- Select **<w class = "attendee-class">your_attendee_ID</w>_Site** from the **_Site_** drop-down.

- Input **_Name_** as **<w class = "attendee-class">your_attendee_ID</w>_Team1**.

- Use the default **_Type_** `Agent Based`.

- Select **<w class = "attendee-class">your_attendee_ID</w>_MMP** in the **_Multimedia Profile_** drop-down.

- Left as a default value **_Global Layout_** in the **_Desktop Layout_** drop-down and **_Save_** the configuration.

### 4. Activate users in the Management Portal

- Click on **_Provisioning_** and select **_Users_**.

- Click on `...` for the agent, to launch the **_Edit_** view for a particular User configuration.

- Click on **_Contact Center Enabled_** toggle to move it to **_On_**.

- In the **_Agent Settings_** section, select **<w class = "attendee-class">your_attendee_ID</w>_Site** in the **_Site_** drop-down.

- Click the **_Teams_** area and select **<w class = "attendee-class">your_attendee_ID</w>_Team1**.

- Select the **_Agent-Profile_** in the **_Agent Profile_** drop-down list.

- Choose **<w class = "attendee-class">your_attendee_ID</w>_MMP** in the **_Multimedia Profile_** drop-down and hit **_Save_**.

- Make sure that the user are now shown with the **_Contact Center Enabled_** flag as `Yes` and **_Status_** as `Active`.

- Repeate the same steps as above for your supervisor.


# Bulk Configuration
> The following video outlines how to use the Bulk Configuration in Control Hub. As an administrator, you can use Bulk Operations to create, modify, import, or export configuration objects in Webex Contact Center. 

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/r_A-BPhoTaA?rel=0" title="WxCC Lab #1 Part 3: Admin Portal User Configuration" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Create the second Team 

- Go to the Control Hub by accessing [https://admin.webex.com](https://admin.webex.com){:target="\_blank"}.

- In the left pane navigate to **_Contact Center_** card.

- Select **_Buld Operations_** in the upper menu.

- Click **_Create Bulk Operations_** button in the right corner.

- In Step 1 select the configuration object **_Team_** in the drop-down list.

- In the Export secotion enter the **MyTeam** as the file name and click **Next** button.

- Once the task is **Completed** click on **_Download export file_** and open the csv file in the notepad.

- The first line is the headers, it is mandatory to have it during the import process. Remove all lines from the CSV file except the first line with headers and the line with **<w class = "attendee-class">your_attendee_ID</w>_Team1**.

- Rename the Team1 to **<w class = "attendee-class">your_attendee_ID</w>_Team2** and save the file.

- Go back to the **Bulk Operations** menu and click **_Create Bulk Operations_** button again.

- In step 1, select the **_Team_** configuration object from the drop-down list and **import** the CSV file by dragging it into the Import section.

- Click **Next** button and wait the results. The status should be shown as **Completed**.

- Go to the Management Portal, click on **_Provisioning_** and  **_Team_** and verify that the **<w class = "attendee-class">your_attendee_ID</w>_Team2** is created. 



# Access to the Agent Desktop
>The following video explains the process to access the Agent Desktop. Following the steps, you will log in with your credentials and indicate the number where you want to receive the calls. 

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/2bmoiAfxpTU?rel=0" title="WxCC Lab #2 Part 4: Access to the Agent Desktop" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 1. Activate Webex Calling

- Login the **[Control Hub](https://admin.webex.com/){:target="_blank"}** with your admin credentials.

- Navigate to **_Users_**.

- Select the **Agent** user 

- In the User settings, make sure that the following **_Services_** are listed:
   -  **_Messaging_** as **Advanced Messaging**.
   -  **_Calling_** as **Webex Calling (Professional)**.
   -  **_Contact Center_**.

- Scroll down to **_Calling Behaviour_** and select **_Webex Calling app_**. Click **_Save_**.

- Repeat the same steps for **Supervisor** user. Make sure that **_Webex Calling app_** has been activated.

### 2. Download and Login in the Webex Calling app for PC or Mac

> **Note:** You need two Webex Calling app for placing a call to Entry Point and accepting on the agent side. Alternatively, if you have a US number, you can use it as an agent's extension. This tenant does not allow numbers outside of the United States. In this lab, we will use the Webex Calling app for PC or Mac for **agent** account.

- Login to **[https://settings.webex.com/](https://settings.webex.com/){:target="_blank"}** by using account `agent1`.

- Click on **_Webex Calling_** this will cross launch CUP in a new browser tab.

- Go to **_My Apps_**.

- Click `Download` the Webex Calling Client **Desktop Software**.

- Install the application on your PC/Mac.

- Open Webex Calling and сlick **Sign In**. Specify the agent credentials for `agent1`.

- Depending on your operation system, navigate to the Webex Callin Menu **_Edit Server Address_** and make sure you have selected **North America** region.

### 3. Download and Login in the Webex Calling app for mobile

> **Note:** You need two Webex Calling app for placing a call to Entry Point and accepting on the agent side. In this lab, we will use the Webex Calling app for mobile for **supervisor** account.

- Open the Application Manager (**Play Store** or **App Store**) on your mobile phone.

- Search for **_webex calling_**.

- **Download** and **Open** the app. Click `Get Started`.

- Login in the app by selecting **_Region_** as **North America**.

- Set **_Email address_** and **_Password_** as the supervisor account `supervisor1`.

> **Note:** Make sure that you give access to the phone's microphone for the calling app.


![WxCallingAndroid](/assets/images/wxcallingandroid.png)

### 4. Agent Desktop Login
> **Note**: To log in to the agent desktop, use either a separate web browser or a new incognito web page. This will prevent any browser caching issues with admin and agent credentials.

- Navigate to **[https://desktop.wxcc-us1.cisco.com/](https://desktop.wxcc-us1.cisco.com/){:target="_blank"}** in a new browser or in incognito mode.

- Enter the agent’s **email ID** `agent1` which you created in the previous lab.

- Enter the **Password** for the appropriate Username.

- In the **_Station Login_** pane, select **"Extension"** and input the configured number for that user. 

> **Note:** Please use Webex Callin Extension for this lab. Optionally, if you have a US number, you can use it from the agent's desktop. This tenant does not allow numbers outside of the United States.

- Select the `Team1_2022_TS`, with default desktop layout.

- Click **_Submit_**. Make sure that you are successfully logged in to the Agent Desktop. Now you can continue with the next section.






---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	
	


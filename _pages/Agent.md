---
title: Lab 3 - Agent Desktop
author: Gorka Antona Santamaria & Neha Wuthoo
date: 2022-03-03
layout: post
---

```
Last modified: Mon, 9 Aug 2023
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
   if(document.forms["attendee-form"][1].value != "Your Attendee ID"){
    localStorage.setItem("attendeeID",document.forms["attendee-form"][1].value)
  }  
  }
</script>

## Overview of the lab:

In this lab, we will go through the Agents Desktop portal use in their daily basis. We will review how to complete some of the most common tasks and some more advance features will be introduced.

At the end of the lab, you should be able to handle calls as an agent, perform some useful agent tasks and create your cutomized Agent Desktop.

## Table of Contents

| Topic                                             | Lab Type      | Dificulty Level | Estimated length |
| ------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Agent Desktop Overview](#agent-desktop-overview) | Demo          | EASY            | 10 min           |
| [Basic Features](#basic-features)                 | Practical Lab | EASY            | 15 min           |
| [Custom Desktop Layouts](#custom-desktop-layout)  | Practical Lab | MEDIUM          | 30 min           |

## Introduction

### Lab Objective

- The objective of this lab is to get an idea about the Agents user journey, to familiarize with the platform they use and to explore some of the most useful new features they offer.

- In the first part of the lab we will focus on explaining the different parts and and possible functions of Agent Desktop interface

- In the second part of the lab, you will learn some of the basic functions that a user can perform as an agent: handle Incoming calls, making outdial calls and configure some User Profile setting

- In the third part of the lab we will customize Horizontal header of the platform and also add some custom widget in the Navigarion bar section.

### Pre-requisite

1. You need **2 devices** where you can install **Webex App** (example: your laptop and mobile phone).

   - You will need an extra device (your personal phone for example) to test Consult and Conference functionalities

2. For doing this lab, you must first complete the **Lab 1: Control Hub and Admin Portal:**

   - You have the administrator's access to the Tenant Management Portal.
   - Agent and Supervisor users created and configured
   - You have agent's access to the Agent Desktop
   - You have the supervisor's access to the Tenant Management Portal.
   - Agent is part of 2 Teams.
   - Webex Calling extensions are assigned to a WxCC users (agent and supervisor).

3. You also must complete the **Lab 2: IVR Contact Routing:**
   - Simple flow configured and making a call tested
   - Global variables created as Agent Editable

4. For Part 3 - Custom Desktop Layour, you should have a Webex Contact Center Analyzer Report. You can use the Stock Reports created by default or use your own custom Reports
	> [How to create Analyzer Report on Webex Contact Center Analyzer](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/iframe-widget-sample)

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\
> Developer Portal: **[https://developer.webex-cx.com](https://developer.webex-cx.com/){:target="\_blank"}**\
> API Samples Git Repository: **[https://github.com/CiscoDevNet/webex-contact-center-api-samples](https://github.com/CiscoDevNet/webex-contact-center-api-samples){:target="\_blank"}**\
> Widgets Samples Git Repository: **[https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples](https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples){:target="\_blank"}**\

## Lab Section

> 
> Please submit the form with your Attendee ID. All configuration items in the lab guide will be renamed with that prefix.
{: .block-tip }

<div class="alert"></div>
<form id="attendee-form">
      <label for="attendee-id">Attendee ID</label>
      <input type="text" name="attendee-id" id="attendee-id" onChange="update()"/>
      <button onclick="update()">SAVE</button>
      
</form>
<script src="/assets/gitbook/form.js"></script>

<script>
document.forms["attendee-form"][1].value = localStorage.getItem("attendeeID") || "Your Attendee ID" 
update()
</script>

# Agent Desktop Overview

## Station Login

- In order to access to the Agent Desktop you can do it either via the Management Portal (Desktop module) or navigating to the direct URL: https://desktop.wxcc-<DC\>.cisco.com/

- Once you're in the login page, enter the agent credentials (username and password)

- Agents will need to input the number where they need to receive incoming and outdial calls
  - If your administrator configures the default Dial Number (DN), the default DN is prepopulated in the Dial Number and Extension fields.
  - If your administrator restricts the DN to the default DN, you cannot edit the prepopulated DN when signing in to the Agent Desktop.

- They can choose between Dial Number or Extension
	- Extension: Just in case the agent is using Webex Calling or some other softphone as calling endpoint

    - Dial Number: E.164 format phone number
    	- If you check the __International Dialing Format__ box, you can choose the country code based on your geographical location from the drop-down list. You can also enter a country code or country name to filter the list. Dial numbers are validated based on the country code

- Select one of the possible teams from the list. Agents can belong to multiple teams, but they can only receive calls of 1 specific teams

- Check the **Remember My Credentials** box to save your station credential details for future sign-ins

- Be aware that agents cannot access the Agent Desktop from multiple browsers or multiple tabs of the same browser window. In that case, a warning message will be displayed

> The video below shows a demo about the agent login process and the available options:
{: .block-tip }

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/e4b450ff-9d3f-424d-96bb-2f0988b81743" width="100%" height="100%" title="Station Login" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

## Agent Desktop Interface

> The Desktop UI language is based on the language preference settings on your browser. Currently, it supports 29 languages:
> 	Bulgarian, Catalan, Chinese (China), Chinese (Taiwan), Croatian, Czech, Danish, Dutch, English (UK), English (US), Finnish, French, German, Hungarian, Italian, Japanese, Korean, Norwegian, Polish, Portuguese (Brazil), Portuguese (Portugal), Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, Swedish, and Turkish.
{: .block-tip }
<br>
<br>

> Watch the following video, where each of the sections and their main options are explained. You will get a better idea of how the Agent Desktop look like and how to use it:
{: .block-tip }

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/dc341488-94ab-4659-8951-4b4ba1412373" width="100%" height="100%" title="Agent Desktop Interface" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>
<br>
![Image1](/assets/images/AgentDesktopOverview.png)


The Agent Desktop is divided in **6 sections**. In the image above you can see a general view of the Agent Desktop and where each section is located. We explain them all shortly:

1. **Task List**: When a request is routed to your queue and you are _Available_, a new request appears in your Task List pane. You must accept the requests to start communication with the customer.

2. **Horizontal Header**: Basic functionalities such as: Title and logo, Agent availability state, Notification Center, Outdial and User Profile. We will explain more in detail some User Profile options in the next section of the lab.

3. **Interaction Control**: When you accept a voice call (inbound or outbound), by default, the Interaction Control pane is expanded. This pane includes: customer information (CAD variables), timers (for example: connected and call on hold time) and call control buttons (Record, Hold, Transfer...).

4. **Auxiliary Information**: The center pane displays details based on your selection of the contact card in the Task List panel. For Voice requests, it will display the customer contacts history. Whereas for any digital channels (email, chat or social messaging), you will see the whole conversation with the customer and you will be able to send new messages.

5. **Agent Interaction History**: You can view your previous contacts of the agent across all the channels (voice, email, chat, and social) in this pane. The pane displays details for the last 24 hours. Moreover, for Voice channel you can callback to the contact phone number.

6. **Navigation bar**: By default you can find the following icons here: Home, Agent Performance Statistics and Help. However, you can customize it and add some additional icons and widgets.

## Calls Handling

> In the following video you will see how to handle incoming calls and what are the different agent states:
{: .block-tip }

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/f5a79811-eb60-4925-b11a-a8586760a3d3" width="100%" height="100%" title="Calls Handling" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>
<br>
#### Agent states:

- **Available**: Indicates that you are ready to accept and respond to contact requests that are routed to you. After you sign in, you must select Available from the drop-down list to accept voice call, chat, email, and social messaging conversation requests.

- **Idle**: Indicates that you are signed in but not ready to accept any routed requests. When you sign in to the desktop, your state is set to the default idle reason configured by your administrator.

- **RONA (Redirection on No Answer)**: Indicates that you have not accepted a voice call, chat, email, or social messaging conversation request within the specified time. Your administrator configures the time available to accept an incoming request from any channel. If you cannot accept the request within the specified time displayed in the timer, the action button on the popover flashes for a few seconds and your state automatically changes to RONA. The request is returned to the queue. When your state changes to RONA, a popover appears and you can select the state that you want to be moved: to Idle or to Available

- **Engaged**: indicates that you are busy and connected with a customer. When you have accepted the contact request, the Available state changes to the Engaged - Available label. When you're in this state, you can continue to receive active requests on other channels, depending on the channel capacity. If you don't want to receive more requests, you can select any Idle state, so you will be moved to Engaged - Idle label.

#### Manage Voice Calls

- **Call Associated Data (CAD) variables**: These variables allow the administrator to collect call data such as a case number or any action code of the customer. In Flow Designer, your administrator configures the variables, labels of the variables, and the order in which they must appear on the Interaction Control panel. While you are on a call, you can edit the CAD variables if your administrator configures the CAD variables as editable.

- **Hold/Resume**: You can put the customer on hold so that you can consult with another agent or lookup additional information without having the customer listening to you. Click on Resume to take a call off hold.

- **Pause/Resume Recording**: Your administrator can choose for each Queue either to record all the calls or not. In case the recording is enabled, the agent can Pause and Resume the recording.

- **End**: After you have helped your customer with queries, it is a good practice to ask the customer to end the voice call. If necessary, you can also end the call. When the customer ends the call, agent will need to select some Wrap Up Reasons from the dialog box appears.

- **Consult**: You can initiate a consult call with another agent while you are on an active call with a customer.

- **Transfer**: If you cannot resolve a customer query and want to escalate the active voice call (inbound or outbound), you can transfer the call to another agent or supervisor.

- Either for **Consult and Transfer** you have the following options:

  - _Agent_: You can either select an agent from the drop-down list, or use the search field to filter the list. The drop-down list displays the names of available agents.

  - _Queue_: You can select a Queue or Entry Point from the drop-down list, or use the search field to filter the list. The drop-down list displays the queues that are available to transfer the call.

  - _DN_: You can enter a name or number; select a name or number from the drop-down list; or use the search field to filter the list. The drop-down list shows the grouped list of contacts in your address book. Names are listed along with the numbers for the contacts in the address book.

- **Conference**: To start a three-way conference call between you, the customer and another agent. For this option, you (primary agent) must have initiated a consult call. Click Transfer to transfer the call to the consulting agent. The consulted agent can exit the call by clicking Exit Conference, and the call continues between the primary agent and the customer. Only the primary agent can end the Conference.

# Basic Features

| **Entity**           | **Name**                                                               |
| -------------------- | ---------------------------------------------------------------------- |
| Agent 1              | <w class = "attendee-class">attendeeID</w>_agent1@mailinator.com       |
| Supervisor 1         | <w class = "attendee-class">attendeeID</w>\_supervisor1@mailinator.com |
| Desktop Profile        | <w class = "attendee-class">attendeeID</w>\_desktopProfile               |
| Entry Point          | <w class = "attendee-class">attendeeID</w>\_EP                         |
| Queue                | <w class = "attendee-class">attendeeID</w>\_Q                          |
| Team 1               | <w class = "attendee-class">attendeeID</w>\_team1                      |
| Team 2               | <w class = "attendee-class">attendeeID</w>\_team2                      |
| Outdial ANI          | <w class = "attendee-class">attendeeID</w>\_outdialANI                 |
| Outdial ANI Entry 1  | <w class = "attendee-class">attendeeID</w>\_outdialANIEntry1           |
| Address Book         | <w class = "attendee-class">attendeeID</w>\_addressBook                |
| Address Book Entry 1 | <w class = "attendee-class">attendeeID</w>\_addressBookEntry1          |
| Multimedia Profile   | <w class = "attendee-class">attendeeID</w>\_MMP                        |

> **NOTE:** Please create all the tenant entities following the naming convention mentioned specified in the table above. Your attendeeID is provided in the email in the **"Attendee ID"** line.
{: .block-warning }

> Be aware that all entities that don't match with attendee IDs will be deleted
{: .block-warning }



## Testing Incoming call

> In this section, you will will interact as an agent and test an Incoming call. Review the video of the lab section above to understand the different call handling options.
{: .block-tip }

- In order to test properly an incoming call, first we need to make sure that we have all the call handling options enabled

- Login with your administrator user in the **Control Hub** and navigate to _Services > Contact Center > Settings > Desktop_
  - Make sure that **`End Call`** and **`End Consult`** are enabled
  - You can also configure _Auto Wrapup and RONA timeouts_

<br>
- Now open the **Management Portal** and navigate to _Provisioning > Desktop Profiles_ and edit _your Desktop Profile_:
	- In the **Collaboration** tab:
		- Set the **Buddy Teams** to **`All`**
		- Enable **`Consult to Queue`**

<br>

- Navigate to _Provisioning > Queue_ and edit your Queue
  - Enable **`Permit Recording, Record All Calls and Pause/Resume`**
    - Make sure that these settings are also enabled at tenant level
  - You can also set the _Recording Pause Duration_. This is the maxiumum duration that an agent can pause the recording

<br>
- Now place it's time to test the incoming call
	- Login in both in the **Agent Desktop** and **Webex App** with _your Agent 1_ user 
	- Input the corresponding Webex App Extension in the Agent Desktop Station Login (you can check this info in the Users module of Control Hub)
	- Move to **`Available`** state
	- Place an incoming call to the DN mapped to your EP (You should have mapped your EP in Lab 2)

<br>
- Accept the call in the Webex App of _your Agent 1_
	- Check the **CAD variables** and try to edit any Global Variable
	- Change to **`Engage - Idle`**. This way you will not receive any other digital channel requests

<br>

- Let's play with the call interaction buttons
  - Click on **`Hold`** to pause the conversation with the end-customer and click on **`Resume`** to talk with him again
  - Click on **`Pause Recording`**, say some personal infor and click again on **`Resume`** to continue the recording
  - Click on **`Transfer`** and select the **`Welcome_EP`**
    - End-customer be redirected to a common EP already created
  - **End** the call (this can be done from customer or agent perspective) and select any **Wrap-up code**

> For this part, you will need a third calling device for interacting as aSupervisor
{: .block-warning }
<br>
- Now, using a different browser, login in the **Agent Desktop** with _your Supervisor_ user and move to **`Available`** status
  - In a separate device (you mobile phone for example), login in Webex App with your _Supervisor_ user
  - Place the call from the third calling endpoint (your personal phone for example)
  - Try **`Consult, Conference and Transfer`** functions between End Customer, Agent and Supervisor.

## Exploring User Profile

> In this section, we will explore what are the available options and settings under the User Profile.
{: .block-tip }

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/149fe8d1-c27e-4c7e-a0b9-af072487c543" width="100%" height="100%" title="User Profile" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>
<br>
- First, we will see how to change from one team to another one
  - In order to notice some difference when we make the Team change, we need to modify some setting from _your Team 2_ (created in Lab 1) . For that, we will assign a different **Multimedia Profile** to that team.

<br>
- Navigate to the _Management Portal > Provisioning > Teams_
	- Find _your Team 2_ and click on `Edit`
	- Check _your User settings_ and make sure that there is not **Multimedia Profile** assigned. **User settings have preference over Team setting**, so the Multimedia Profile at User level will be applied. 
	- Change the **Multimedia Profile** of the team from <w class = "attendee-class">attendeeID</w>\_MMP` to `Default_Telephony_Profile

<br>
- Now, login in the **Agent Desktop** selecting <w class = "attendee-class">attendeeID</w>\_team1
	- Open _your User Profile_ and check that the **Channel Capacity**
	- Now, click on _your Team_, you will see a dropdown list with other available Teams
	- Click on <w class = "attendee-class">attendeeID</w>\_team2 
	- **`Save Team Selection`** to confirm that you want to change a team

<br>
- You will see notification appeared in the **Notification Center**
	- You can change the **Notification settings** to disable the incoming notifications or the sound
	- Mark the notification as `Read`
	- Go to the **User Profile** and check the **Channel Capacity** again, it's different

<br>
- Test some additional options:
	- **Switch to Dark Mode**
	- **Keyboard shortcuts**
	- **Download error log**

## Outdial

> In this section, we will test Outdial calls using different Outdial ANIs and Address Books.
{: .block-tip }

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/df20ad39-55db-4c8c-a268-bcd4818fe1f3" width="100%" height="100%" title="Outdial Call" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>
<br>
- Navigate to _Management Portal > Provisioning > Outdial ANI_
  - Click on **`New Outdial ANI`**
  - Name: <w class = "attendee-class">attendeeID</w>\_outdialANI
  - Add Outdial ANI entry
    - Name: <w class = "attendee-class">attendeeID</w>\_outdialANIEntry1
    - Number: Select your mapped DN

<br>
- Navigate to _Management Portal > Provisioning > Address Book_
	- Click on **`New Address Book`**
	- Name: <w class = "attendee-class">attendeeID</w>\_addressBook
	- Parent Type: **`Site`**
	- Add Address Book entries
		- Name: <w class = "attendee-class">attendeeID</w>\_addressBookEntry1
		- International calls are disabled, **so only US numbers are supported**. For example: +18662293239 (Cisco Helpdesk)

<br>
- Navigate to _Management Portal > Provisioning > Desktop Profiles_
	- Search for _your Desktop Profile_ and make sure that **Outdial is enabled and `Outdial Entry Point-1` (created by the system) selected**
	- Select _your Outdial ANI_

<br>
- Navigate to _Management Portal > Tenant > Settings_
	- See the number of the **Default Outdial ANI**

> **This is a required setting at tenant level, so PLEASE DON'T EDIT IT**
{: .block-danger }

<br>
- Now, login in the **Agent Desktop** with _your Agent1_ with the Webex Extension of the Agent
	- Open the Outdial on the Horizontal Header
  - Input your personal phone number
	- **Don't select any Outdial ANI**
	- Click on the telephone button to place the call
	- The call will be delivered to your phone number from the **Default Outdial ANI** defined at Tenant level
	- Now repeat the same but **choosing _your Outdial ANI_** configured before. You will see that the call is coming with a different ANI

<br>

- Finally, let's see how **Adress Book** works
  - Open the Outdial window and swith to the Address Book tab
  - You will see the the list of entries of <w class = "attendee-class">attendeeID</w>\_addressBook configured before
  - You can search by entry name or DN
  - Try to call any of the numbers in the list



# Custom Desktop Layout

## Basic JSON elements

The following are the top-level and most important properties to know for JSON layout:

-  **`appTitle`**: To specify a title on the horizontal header of the Desktop. The default title is `Webex Contact Center`. 

- **`logo`**: To specify a URL for the company logo. If you do not provide a URL, then the Webex Contact Center logo appears by default.

- **`taskPageIllustration`**: To specify a custom illustration for the task page based on organization preferences and brand alignment. When an agent signs in, the task page displays the configured illustration as a background. By default, the task page appears without illustration.
   
- **`stopNavigateOnAcceptTask`**: To determine whether to shift the focus to a newly accepted task, when the agent accepts the new task while working on a previous task. The default value is `false`.  

- **`dragDropEnabled`**: To enable the drag-and-drop and resizing of the widgets on the custom pages, set the value to `true`. The default value is `false`.

- **`notificationTimer`**: To set the duration (in seconds) after which the desktop notifications on the Desktop are automatically dismissed. The notification appears at the top-right corner of the Desktop. The default timeout value is 8 seconds. The valid range for timeout values is 1-10 seconds. For the timeout changes to take effect, the browser must be refreshed after the changes are made.

- **`maximumNotificationCount`**: To set the number of desktop notifications to be displayed at a time on the Desktop. The default value is 3. The range for desktop notifications is 1-10. The desktop notifications are stacked. If there are many notifications, they appear with a slight delay depending on the `notificationTimer` settings.    

- **`browserNotificationTimer`**: To set the duration (in seconds) after which the browser toaster notifications on the Desktop are automatically dismissed. Toaster is a native browser notification that appears only if the Desktop is not the active browser window or tab. The Desktop browser window or tab is inactive when

- **`wxmConfigured`**: (Optional) To configure Webex Experience Management, set the value to `true`. The default value is `false`.
  
- **`desktopChatApp`**: To configure multiple Cisco-offered chat applications such as Webex App.

- **`webexConfigured`**: Webex App along with its messaging, calling, and meeting functionalities, can be configured within the Desktop. This configuration allows agents to collaborate with other agents, supervisors, and subject matter experts (SMEs) in their organization without navigating away from the Desktop.

- **`headerActions`**: To change the order of the icons on the horizontal header of the Desktop. The default order is as follows:  **`["webex", "outdial", "notification"]`**.

- **`area`**: The `area` property is the core section of the Desktop Layout. You can define the layout as per the area.

<br>

## Personalize the title and logo

> In this video, you will learn the desktop layout customization process. After watching this, you will be able to customize the Agent Desktop with a custom logo, custom title. You will also learn how to enable/disbale standard widgets:
{: .block-tip }


<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/de0e97f2-d0bc-447a-b326-93ccbf190203" width="100%" height="100%" title="Create a Custom Desktop Layout" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br>


- Login to **[https://portal.wxcc-us1.cisco.com](https://portal.wxcc-us1.cisco.com){:target="\_blank"}** with admin credentials.

- Navigate to **_Provisioning_** –> **_Desktop Layout_**.

- Click on **_New Layout_** button.

- Click on **_Download_** button to download the **Default Desktop Layout.json** file.

- Open the **Default Desktop Layout.json** file with any text editor (e.g. Notepad, Sublime text).

- Modify the **_appTitle_** key value with your company name in order to change Agent Desktop title.

- Modify the **_logo_** key value with your company logo URL or use this **https://raw.githubusercontent.com/wxcctechsummit/holcct2100/main/labslive/CiscoLiveLogo.jpg**.

- Modify the wxmConfigured and webexConfigured key values to **_true_** to enable the standard (out of box) widgets.

- **_Save As_** JSON file with a distinguishable name.
<br>


- Login as admin to **_Desktop Layout_** module in the **[Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com){:target="\_blank"}**.

- Click on **_New Layout_**.

- Provide the following **name**: <w class = "attendee-class">attendeeID</w>\_desktopLayout

- Select <w class = "attendee-class">attendeeID</w>\_team2 as Team.

- Click **_Upload_** button to upload the modified JSON file.

- Click **_Save_** button to apply the layout.
<br>


- Login to the **[Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="\_blank"}**.

- Open the **_User Profile_** and click on the arrow `>` under **_Team_**.

- Change the team of the agent to <w class = "attendee-class">attendeeID</w>\_team2

- Click on **_Save Team Selection_**.

- Confirm the changes by clicking on **_Change Team_**.

- Wait for few seconds to see the results.

- Now you should be able to see the new logo, new title and will be able to access the out of box widgets i.e Webex & Custom Experience Analytics.
<br>
## Reorder components of Horizontal Header

> In this section, you will learn how to reorder components of Horizontal Header.
{: .block-tip }


<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/41edcf4e-25c5-45b6-8315-4a922ee615e3" width="100%" height="100%" title="Reorder components of Horizontal Header" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Take the same desktop layout file that you used in the last section.

- Open the desktop layout file with any text editor (e.g. Notepad, Sublime text).

- Make sure the layout version is 0.0.7 or higher.

- Under **_advancedHeader_**, change the order of components.

- **_Save As_** JSON file and upload it on **[Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com){:target="\_blank"}** against your team.

- Now login to the **[Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="\_blank"}** or refresh the browser if you are already logged in.

- You should be able to see the order of components in the Horizontal header as per your configuration.
<br>

## Create iFrame Widget & change default landing page

> The iFrame widget is a special widget that can be used to embed a different application. The iFrame widget creates an HTML iFrame and renders your application.
{: .block-warning}


> In this section, you will learn how to create a iFrame widget and how to change the default landing page in the Agent Desktop. For this example, we are using Webex Contact Center Analyzer Report as a iFrame widget.
{: .block-tip }



<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/d6e4883a-282e-4376-8b3e-b5bf67fc6b43" width="100%" height="100%" title="Create custom widget & change default landing page" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

- Take the default desktop layout file.

- Open the desktop layout file with any text editor (e.g. Notepad, Sublime text).

- Create another section under **_navigation_** similar to that of existing Customer Experience Analytics.
  > Check out this sample [Analyzer_iFrame_Widget.json](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/widget-samples/iframe-widget-sample/Analyzer_iFrame_Widget_Layout.json)

- In the new section, add the **_label_** key value with your choice.

- Add the **_icon_** key value with your choice.

- Add a new key **_isDefaultLandingPage_** and its value should be set as **_true_**.

- **_src_** key value should be same as URL of your analyzer report.

- **_Save As_** JSON file and upload it on **[Webex Contact Center Management Portal](https://portal.wxcc-us1.cisco.com){:target="\_blank"}** against your team.

- Now login to the **[Agent Desktop](https://desktop.wxcc-us1.cisco.com/){:target="\_blank"}** or refresh the browser if you are already logged in.

- You should be able to see the new widget you added when you login to the agent desktop as it is set as the default landing page.

<br>


## Populate Custom Widget with desktop parameters

> A Custom Widget is a component with some specific encapsulated functionality, exported as a custom HTML element that is placed within the desktop.
{: .block-warning}


> Watch the demo below to understand the ability to pass default Desktop parameters into your Custom widget. This will help developers understand how data is handled in the Desktop STORE and injected into widgets inside of Webex Contact Center desktop. 
{: .block-tip }

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/7ca5247d-462b-4b49-859c-62bee86477a3" width="100%" height="100%" title="Part 1 of 2: Sample Widget 101 & passing parameters" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/6e211cd5-e0c6-4c38-a1dc-df647b60a0b3" width="100%" height="100%" title="Part 2 of 2: Sample Widget 101 & passing parameters" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>

<br>
Below, you will find a breakdown of all possible data and type definitions that is available through the STORE key:
-   **STORE.agent**: Desktop profile info and settings. 
-   **STORE.agentContact**: Agent tasks and interactions
-   **STORE.app**: Company logo, title and dark mode
-   **STORE.auth**: Authentication token used for Single Sign On
-   **STORE.generalNotifications**: Application notifications
-   **STORE.dynamic**: Connector (smaller) or Desktop (larger) view area

<br>
> 
> Check the **[Developer guide](https://developer.webex-cx.com/documentation/guides/desktop/#custom-widgets)** for more details about Custom Widgets.
{: .block-warning}

> If you want to explore and play around with the possible types of custom widgets you can create, check the below **Git repository with some samples: 
> [https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples](https://github.com/CiscoDevNet/webex-contact-center-widget-starter/tree/master/Examples)**
{: .block-warning}

<br>
## JavaScript SDK and Modules
> Desktop JavaScript SDK is an npm package that allows you to request up-to-date information from the Desktop. Using the SDK, you can request information such as agent details, assigned tasks, details of specific tasks, current browser locale, and the authentication token for Single Sign-On (SSO) integration.
{: .block-warning}

- To start using the JavaScript SDK, run the following command in your project folder: `npm install @wxcc-desktop/sdk --save` or `yarn add @wxcc-desktop/sdk`.

- Once you have installed the package in your project, include it in the appropriate component file following the ES6 import pattern: `import {Desktop} from "@wxcc-desktop/sdk";`.

- `Desktop` is the root module of the JavaScript SDK. The root module provides a reference to the following sub-modules:
  - Configuration Module
  - Localization Module
  - Actions Module
  - Logger Module
  - Agent State Information Module
  - Agent Contact Module
  - Dialer Module
  - Screen Pop Module
  - Shortcut Key Module
  - Call Monitoring Module

- Check the [Developer Guide](https://developer.webex-cx.com/documentation/guides/desktop#javascript-sdk-and-modules) for more details about each module.


<br>
<br>
---

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded OKOK')
    })

    window.addEventListener('load', () => {
      console.log('window load OK')
    })
  </script>

<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>

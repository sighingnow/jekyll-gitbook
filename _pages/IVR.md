---
title: Lab 2 - IVR and Contact Routing
author: Tao He
date: 2022-12-30
category: Jekyll
layout: post
---

## Overview of the lab:

In this Lab, we will learn the configuration we need to complete for making a simple call. For that purpose, we will need to create Entry Points, Queues, Routing Strategies and Flows. Different blocks and approaches of Flow Designed will be explained, from the very basic to advance features, such as Menus, HTTP Request, or Callback.


# Table of Contents

- [Part 1: Setup a Simple Flow and make a test call](#part-1-setup-and-test-a-simple-call-flow)
  - [1. Verify and upload Audio Prompts](#1-verify-and-upload-audio-prompts)
  - [2. Create main inbound Voice Entry Point and Main IVR to reach the Entry Point of team member](#2-create-main-inbound-voice-entry-point-and-main-ivr-to-reach-the-entry-point-of-team-member)
  - [3. Create an inbound Voice Entry Point and Voice Queue as a team member](#3-create-an-inbound-voice-entry-point-and-voice-queue-as-a-team-member)
  - [4. Add your Entry Point into the chain within the main flow](#4-add-your-entry-point-into-the-chain-within-the-main-flow)
  - [5. Create and Publish a simple flow](#5-create-and-publish-a-simple-flow)
  - [6. Configure the Entry Point Routing Strategy](#6-configure-the-entry-point-routing-strategy)
  - [7. Make a call to test your simple flow](#7-make-a-call-to-test-your-simple-flow)
  - [8. Modify and Publish your simple flow](#8-modify-and-publish-your-simple-flow)
  - [9. Make a call to test modified flow](#9-make-a-call-to-test-modified-flow)
- [Part 2: Adding Menu and Queue treatment to the call](#part-2-adding-menu-and-queue-treatment-to-the-call)
  - [1. Copy out the flow and configure the advanced flow](#1-copy-out-the-flow-and-configure-the-advanced-flow)
  - [2. Configure the Queue Treatment loop and Opt Out and Callback steps](#2-configure-the-queue-treatment-loop-and-opt-out-and-callback-steps)
  - [3. Plug In New Flow into Routing Strategy](#3-plug-in-new-flow-into-routing-strategy)
  - [4. Test the end to end flow](#4-test-the-end-to-end-flow)
  - [5. Execute the Callback](#5-execute-the-callback)
- [Part 3: Configuring Outdial](#part-3-configuring-outdial)
  - [1. Verify/create the Outdial Entry Point and Queue](#1-verifycreate-the-outdial-entry-point-and-queue)
  - [2. Create the Outdial Entry Point Routing Strategy](#2-create-the-outdial-entry-point-routing-strategy)
  - [3. Setup Your Agent Profile for Outdial](#3-setup-your-agent-profile-for-outdial)
  - [4. Test Outdial](#4-test-outdial)
- [Part 4: HTTP Requests](#part-4-advanced-scripting-steps-for-http-requests)
  - [1. Copy out the flow and configure the advanced flow 2](#1-copy-out-the-flow-and-configure-the-advanced-flow-2)
  - [2. Enhance the existing flow with an HTTP Request](#2-enhance-the-existing-flow-with-an-authentication-piece)
  - [3. Configure the Collect Digits block](#3-configure-the-collect-digits-block)
  - [4. Configure the custom variables and the HTTP Request Block](#4-configure-the-custom-variables-and-the-http-request-block)
  - [5. Configure the Conditional for Error Check](#5-configure-the-conditional-for-error-check)
  - [6. Point to the New flow in the Routing Strategy](#6-point-to-the-new-flow-in-the-routing-strategy)
  - [7. Verify the flow end to end](#7-verify-the-flow-end-to-end)
- [Part 5: Skills Based Routing](#part-5-skills-based-routing)
  - [1. Create new Queue with Skill based routing and Add team](#1-create-new-queue-with-skill-based-routing-and-add-team)
  - [2. Create Skill Definitions](#2-create-skill-definitions)
  - [3. Crete Skill Profile](#3-create-skill-profile)
  - [4. Add skill profile to User/ Agent](#4-add-skill-profile-to-user-agent)
  - [5. Modify the Previous Flow into a new Flow 4](#5-modify-the-previous-flow-into-a-new-flow-4)
  - [6. Update the Entry Point Routing Strategy](#6-update-the-entry-point-routing-strategy)



# Introduction

## Lab Objective

- This lab is designed to ensure you are able to configure a voice contact end to end and receive it on the agent desktop.

- The lab will also contain multiple exercises on flow designer to make you comfortable with the Webex Contact Center Flow Designer and the overall Contact Routing configuration.

- **IVR Prompts:** We will expect you to configure and upload static prompts shared for use below.

> [Download the IVR Prompts - Static Prompts HERE](https://wxcctechsummit.github.io/wxcclabguides/prompts/Tech_Summit_2021_WAVFiles.zip){:target="\_blank"}

- **Lookups, Advanced Scripting, Screen-pops:** We have chosen specific areas of focus for advanced scripting topics. We have more content shared in the bonus sections on how to get other use cases configured.

- **GoTo, ScreenPops, Skills Based Routing:** We will cover the newer features on Webex Contact Center, including the GoTo step, Screen Pop, and skills based routing.

# Lab Pre-requisites

1. **Webex Calling App** is installed on your **PC or MAC, and Mobile.**
	- PC or MAC Webex calling App for Agent to accept calls.
	- Mobile Webex Calling App for Supervisor to accept calls and to place test calls to EP.
2. All the tasks from **Lab1 (Control Hub and Admin Portal)** are completed.
	- You have the administrator's access to the Tenant Management Portal.
	- Agent and Supervisor users created and configured
	- You have agent's access to the Agent Desktop
	- You have the supervisor's access to the Tenant Management Portal.
	- Agent is part of 2 Teams.
	- Webex Calling extensions are assigned to a WxCC users (agent and supervisor).


## Quick Links

> Control hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/portal](https://portal.wxcc-us1.cisco.com/portal){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\

---

# Lab Section

## Part 1: Setup and test a Simple Call Flow

> This lab is designed to help you to make an end to end test call into the contact center. The lab concludes with sending a test call from the caller (customer) to the agent desktop using a Simple Flow.

> **WARNING:** Instructions provided in the video slightly differ from the instructions provided below due to limited amount of PSNT numbers. This lab assumes there are few members of which are sharing the same tenant. Each one can create their own call flow and by using menu IVR under the main flow a decision can be made on what Entry Point you want the call to take. e.g. Map DN to `EP_Main_TS` > `Flow_Main_TS`, then branch out to your own Entry Point from Flow_Main_TS through corresponding menu item using "GoTo" activity., in this lab every attendee will need to call into the main flow and, from there, route their calls to personal flows.

> **NOTE:** Instructions provided in sections 1 and 2 need to be performed only by the first person working on this lab. If you're not the first accessing the POD, start this lab from section 3.

<iframe width="1024" height="576" src="https://www.youtube.com/embed/n_PiLTFcgZw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 1. Verify and upload Audio Prompts

- As indicated in the Lab Objectives, download the bundle of wav files for this lab

- Upload the audio files. Go to: Configuration Portal > Routing Strategy > Resources > Audio Files. 

> **Note:** [Download the IVR Prompts - Static Prompts HERE](https://wxcctechsummit.github.io/wxcclabguides/prompts/Tech_Summit_2021_WAVFiles.zip){:target="\_blank"}

### 2. Create main inbound Voice Entry Point and Main IVR to reach the Entry Point of team member

- Login to Portal and create the main inbound voice Entry Point. (Provisioning > Entry Point / Queue). Create the Entry Point named `EP_Main_TS` if it has not been created yet.

- Mapping the DN to the main Entry Point. In the Portal, under Entry Point Mappings page (Provisioning > Entry Point Mappings), map the listed DN to `EP_Main_TS`.

- Navigate to Routing Strategy: Con > Flow and create new flow `Flow_Main_TS` if it has not been created yet. Follow the steps below to build main flow:
	- Add Menu activity and name it "Flow_Main_Menu"
	- Choose IVR prompt "Flow_Main_Menu.wav"
	- Tick checkbox "Make Prompt Interruptible"
	- Set "Entry Timeout" to 10 seconds
	- Loop "Entry Timeout" and "Unmatched Entry" of the "Error Handling" section to the input of "Main_Menu" activity
	- Terminate any "Custom Links" outputs of menu with "DisconnectContact" activity
	- Verify and publish the flow. 

> **NOTE:** Later on each member will return to the “Flow_Main_TS” and create a Menu Link to their Entry Point.

- Configure the Routing Strategy for main Entry Point `EP_Main_TS`:
	- Configure the Open 24x7 routing strategy time of day on the Entry Point Routing strategy by selecting it on the Routing Strategies >`EP_Main_TS`.
	- Map the flow Flow_Main_TS you just created above

### 3. Create an inbound Voice Entry Point and Voice Queue as a team member

- Login to Portal and create an inbound voice entry point and voice queue. (Provisioning > Entry Point / Queue).

- Create the Entry Point named `EP_<ID>_TS`.
 
- Create the Queue named `Q_<ID>_TS`.

**Here are the Queue Settings**

| Configuration                       | field Value             |
| ----------------------------------- | ----------------------- |
| Name                                | `Q_<ID>_TS`  |
| Channel Type                        | Telephony               |
| _---- Contact Routing Settings ---_ |
| Queue Routing Type                  | Longest Available Agent |
| Call Distribution                   | `<Add team>`            |
| _---- Advanced Settings ---_        |
| Service Level Threshold             | 60                      |
| Maximum Time in Queue               | 600                     |
| Time Zone                           | Default                 |

### 4. Add your Entry Point into the chain within the main flow

- Navigate to Routing Strategy > Flow and edit `Flow_Main_TS`

- Add new custom menu link in the "Flow_Main_Menu" and terminate it by GoTo activity.

- Choose "Go to Entry Point" in "Flow Destination Settings" of GoTo acivity and choose your `EP_<ID>_TS` from the drop-down list. 

- Select "Validate" to verify the are no errors in the flow.

- Select "Publish" to save the call flow.

### 5. Create and Publish a simple flow

- Navigate to Routing Strategy > Flow and select "+ New"

- Rename the flow `Flow1_<ID>`

- Select "Play Message" from the library and connect it to the "Start Flow". Edit its property by changing the label with a name of your preference and by selecting the "Welcome Message".

- Select "Disconnect Contact" from the library and connect it to the "Play Message",

- Select "Validate" to verify the are no errors in the flow.

- Select "Publish" to save the call flow.

### 6. Configure the Entry Point Routing Strategy

- Navigate to Routing Strategy > Routing > Routing Strategies.

- From the drop-down menu select `EP_<ID>_TS`

- Select "+ New Strategy"

- Name the strategy as `RS_<ID>_TS`, set the "Time Settings" so that it would be Open 24x7, select the default Music on Hold from the dropdown and finally select the flow `Flow1_<ID>` you just created above.
	
### 7. Make a call to test your simple flow

- Navigate to the configuration Portal > Provisioning > Entry Point Mappings to obtain the DN number to be called.

- Call the Dial Number > Hear main menu and press corresponding digt to go to your Entry Point > Hear the welcome prompt and call should get disconnected.

### 8. Modify and Publish your simple flow

- Navigate to Routing Strategy > Flow and select `Flow1_<ID>`

- Remove the "Disconnect Contact".
	
- Select the "Queue Contact" from the library and connect it to the "Play Message". Edit it so to select `Q_<ID>_TS`.
	
- Select the "Play Music" from the library and connect it to the "Queue Contact". On the other end connect it to itself to create a loop. Edit it by selecting the "MOH" file, set Start Offset at 0, set Music Duration at 10.

- Go to "Event Flows", for each event select and connect the "End Flow" from the library.
	
- Select "Validate" to verify the are no errors in the flow.

- Select "Publish" to save the call flow.

### 9. Make a call to test modified flow

- Login to the agent desktop into `Team_<ID>_TS` and go to a ready state.

- Call the Dial number > Hear main menu and press corresponding digt to go to your Entry Point > Available agent gets connected immediately (if the Agent is not available the call is queued and music is played).


---

## Part 2: Adding Menu and Queue treatment to the call

> This lab is designed to help you configure a Menu step in the call flow along with Queue Treatment. We will also configure counters and Opt-outs within the queue, along with Callbacks.

> At the end of this lab, you should be able to hear a Menu prompt, Opt-out of queue, and send a courtesy callback call to the customer by picking a ready agent.

<iframe width="1024" height="576" src="https://www.youtube.com/embed/BKid4Q--dp0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### 1. Copy out the flow and configure the advanced flow

- Open the Portal > Routing Strategy > Flow page.
	
- Copy the existing flow `Flow1_<ID>` and edit the name inside the flow designer window - name it `Flow2_<ID>`
	
- Ensure that you configure the Menu steps with a 3 options - for example 1 & 2 to go to a queue and 3 Blind Transfer to external number.
	
- Ensure you configure all the fields in the menu step including the prompts and the entry timeout (requires you to explore all options on the step).
	
- Ensure you configure all the blind transfer location to Cisco Toll Free : `+18005536387`

  > **Note: This will actually connect you to the live toll free number!**

> **Important TIP on the MENU Block**

> `Make all Menu Steps Interruptible by default` - This gives callers an option to bypass the prompt. It is a small checkbox on the Menu Step.

> `In the Menu Block > Advanced Settings > Entry Timeout = Make it 10 Seconds` - This gives callers enough time to complete the DTMF (digit) entry.

---

### 2. Configure the Queue Treatment loop and Opt Out and Callback steps

- In Flow Designer - Configure the Queue treatment for the first queue. Use the queueCounter variable and configure the Opt out steps including the high volume message and the callback step.

- In the Callback Settings of the Callback block, you have two options on how to configure the **Callback Dial Number**.

	1. If you set it to `NewPhoneContact.ANI` , as the video guide indicates, you will need to make the call to the Entry Point via your own mobile phone number. 


	> **Note:** This call will be billed as an international call to your personal phone bill with all applicable fees. If you want to avoid that cost, you can configure it using Option 2.

	2. You can create a new **Flow Variable** (e.g. CallbackANI) and set its **Variable Type** as `String` and its **Variable Value** to your mobile phone number (format should be `+country code`, e.g. `+32...`). Then, in the Callback block, you can set this created Flow variable as the Callback Dial Number. In this scenario, you can make the initial call with your supervisor extension and then receive the callback on your mobile phone number.
	
- Configure the voicemail destination to the same Cisco Toll Free number above.
	
- Validate the flow and publish it.

### 3. Plug In New Flow into Routing Strategy

- Return to the Routing Strategy page and select your Entry Point: Routing > Routing Strategy > `EP_<ID>_TS`
	
- Edit your Entry Point Routing strategy to point to the new flow `Flow2_<ID>`

### 4. Test the end to end flow

- Login to the agent desktop and set the agent in Idle (Not Ready).
	
- Call the main number (either via your **mobile** or through the **supervisor extension**, based on how you configured the Callback Dial) associated to entry point and go into the queue. You should hear the queue message twice and then get the option to request the callback.
	
- Select the menu option requesting the callback. The call should then end.

### 5. Execute the Callback

- Set the agent to Ready state, after you left the callback.
	
- Both Agent and orginal caller should receive the callback call.


## Part 3: Configuring Outdial

> This lab is designed to complete configuring the outdial capability on the Agent Desktop.

> At the end of the lab, your agent will be able to make an outbound call from the Agent Desktop.

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/DN7mm81hHdQ?rel=0" title="WxCC Lab #2 Part 3: Configuring Outdial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	

### 1. Verify/create the Outdial Entry Point and Queue

- Login to Portal > Provisioning > Outdial Entry Point > Configure an Outdial Entry Point.
	
- Verify you already have an outdial Queue configured on Portal > Provisioning > Outdial Queue.
	
- Ensure that the system created outdial entry points and queues are present and configure their settings.
	
- Alternatively, you can setup a new Outdial Entry Point as shown in the video.

### 2. Create the Outdial Entry Point Routing Strategy

- Go Routing Strategy > Choose the One you just setup OR the default Outdial Entry Point-1
	
- In Call Controll section set the Outdial Queue to 'Outdial Queue-1' 
> **Note:** Control script option (as on video) was removed from available settings to change.
	
- Ensure the strategy time of day setting is correctly open 24x7 and marked default.

> **Note:** There are no more Queue Routing Strategies on the new Webex Contact Center.

### 3. Setup Your Agent Profile for Outdial

- Go to Provisioning > Agent Profiles > Select the Agent Profile and go to the Dial Plan tab.
	
- Configure all the Outdial settings on the dial plan as shown in the video.
	
- Attach the Outdial ANI, Address books etc. to the agent profile. Setup the Dial Plan Settings.

### 4. Test Outdial

- Logout/login the Agent on the agent desktop for the new agent profile settings to take effect.
	
- You should see the Outdial button and the agent is now able to make an outdial call.
	
- Test it by calling the Cisco Tollfree Number - `+18005536387`, as an example –Note: This will actually connect you to a live toll free number for Cisco Support!
> **Note:** Please consider the dialing number and the POD you use for testing. For PODs 1-30 use US number to dial, for PODs 31-45 use UK number. Intenational dialing is restricted in the Lab PODs.

- You should have all the connected call features pop on the agent desktop once the call is established and the call should land on your Calling endpoint.


---

## Part 4: Advanced Scripting Steps for HTTP Requests

<iframe width="1024" height="576" src="https://www.youtube.com/embed/gXhVTkGazmk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	

### 1. Copy out the flow and configure the advanced flow 2

- Open the Portal > Routing Strategy > Flow page.
	
- Copy the existing flow `Flow2_<ID>` and edit the copied flow - name it `Flow3_<ID>`
	
- Edit the flow to go into flow designer.

### 2. Enhance the existing flow with an authentication piece

- Drag a play message block, Collect Digits, HTTP Request, Condition Block, 2 more Play message blocks and put them in front of the menu step.
	
- Ensure the prompts are plugged in to the play message prompts. `welcome`, `enter_pin`, and after the HTTP and Condition, a corresponding success and failure prompt.

> **Important TIP on the MENU Block**

> `Make all Menu Steps Interruptible by default` - This gives callers an option to bypass the prompt. It is a small checkbox on the Menu Step.

> `In the Menu Block > Advanced Settings > Entry Timeout = Make it 10 Seconds` - This gives callers enough time to complete the DTMF (digit) entry.

### 3. Configure the Collect Digits block

- Configure the Collect Digits Block to a 5 digits max/min and ensure the timeouts are properly setup.

### 4. Configure the custom variables and the HTTP Request Block

- Create 4 Custom variables - mark them CAD variables - with names `name`,`email`,`phone`, `account` with labels `Name`, `Email`, `Phone`, `Account` and values of `None` OR `null` - _(depends on what you prefer as the default for the agents to see if no info is available in the data dip)_

> The actual request we will construct is :

**HTTPS GET -> https://5f97898842706e0016957443.mockapi.io/crm/api/customers?pin=18716**

- Use the variable from the CollectDigits1.EnteredPIN variable to inject it in the pin lookup.
	
- We will construct it as follows

```
HTTP Request
GET https://5f97898842706e0016957443.mockapi.io/crm/api/customers

Query    <->     Parameters
pin      <->     {{CollectDigits.DigitsEntered}}

with value of the block (recheck your block variable name!)

The type would be application/json

The Parse settings would be :
customerName = $.[0].name
customerEmail = $.[0].email
customerPhone = $.[0].phone
```

**Tech-Tip:** Here are some practice exercises you can try by going to jsonpath.com

> - Go to https://5f97898842706e0016957443.mockapi.io/crm/api/customers

> - Copy out the JSON into https://jsonpath.com on the left pane.

> - Try out all of these to learn how JSON path works!

| Query For                                                     | Parse statement                       |
| ------------------------------------------------------------- | ------------------------------------- |
| All Customers                                                 | `$.*`                                 |
| First Customer                                                | `$.[0]`                               |
| Last Customer                                                 | `$.[-1:]`                             |
| First two customers                                           | `$.[0:2]`                             |
| Last two customers                                            | `$.[-2:]`                             |
| Second from last                                              | `$.[-2:-1]`                           |
| All the names                                                 | `$..name`                             |
| All the pins                                                  | `$..pin`                              |
| All the customers who’s pin value is more than 70000 or 80000 | `$..[?(@.pin > 70000)]`               |
| All details of customer with account number                   | `$..[?(@.account == "87305901”)].*`   |
| Name of customer with account number                          | `$.[?(@.account == "70579265")].name` |

### 5. Configure the Conditional for Error Check

- Use the httpBlock.StatusCode variable to check the value retured.
	
- Note that the test API does not give a 404 but an empty list [] with a 200 when no match is found. However, this step is just to understand error handling and checking.
	
- Use the `</>` expression check on the condition and play success and failure prompts accordingly.
	
- Ensure all the settings per block are entered and properly setup.
	
- Validate and Publish the new script, correcting any errors that show up during validation.

### 6. Point to the New flow in the Routing Strategy

- Go to the routing Strategy page > Routing Strategy > `EP_<ID>_TS`
	
- Once the flow is published, configure the Entry Point Routing strategy to point to the new flow `Flow3_<ID>`.

### 7. Verify the flow end to end

- Verify the new flow end to end by first, logging into the Agent Desktop and going into a ready state.

Execute the Test:

- Call the Dial number > Enter the 5 digit PIN number as `18716` > On Main Menu press 2 > call gets connected to agent,

`Agent should see all CAD variables (Customer Name, Email, Account Number)`


---

## Part 5: Skills Based Routing

<iframe width="1024" height="576" src="https://www.youtube.com/embed/b-KyHUia-Bk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 1. Create new Queue with Skill based routing and Add team

- Open portal > Provisioning > Entry point/Queue > Queue
	
- Create new Skills Based Queue > Give Name and Description
	
- Channel Type > `Telephony`
	
- Queue Routing Type > Skill Based > Best Available Agent
	
- Add Team > `Team_<ID>_TS`

| Configuration field        | Value                |
| -------------------------- | -------------------- |
| Name                       | `Q_<ID>_TS_SBR`      |
| Channel Type               | Telephony            |
| _Contact Routing Settings_ |
| Queue Routing Type         | Skills Based         |
| Agent Selection            | Best Available Agent |
| Call Distribution          | `<Add team>`         |
| Service Level Threshold    | 60                   |
| Maximum Time in Queue      | 600                  |
| Time Zone                  | Default              |

### 2. Create Skill Definitions

- Open portal > Provisioning > Skill > Skill Definition
	
- Click (New Skill Creation) > Give Name(`SkillSet`)and Description(`Skillset`) Type > `Proficiency`
	
- Click (New Skill Creation) > Give Name(`VIP Customer`)and Description(`VIP Customer`) Type > `Text`

> **Note:** We are using "TEXT Skills" in this SBR lab so that you can directly target agents with a specific variable from flow. This gives powerful capabilities as you will see later.

### 3. Create Skill Profile

- Open portal > Provisioning > Skill > skill Profile
	
- Click (New Skill Profile) > Give Name - `TechSummitSkill` and Description -`TechSummitSkill`
	
- Select `SkillSet` and enter the Skill Value as `8`
	
- Select `VIP Customer` and enter the `Skill Value` to `Techsummit`

### 4. Add skill profile to User/ Agent

- Open Portal > Users
	
- Edit User > Under Skill Profile select the skill profile created in step 2 - `TechSummitSkill`

### 5. Modify the Previous Flow into a new Flow 4

- Open Flow > Copy Existing `Flow2<ID>` - Rename it as `Flow4<ID>`.
	
- Create a new variable `skill`. 
	
	> Click on Canvas > Global Flow properties > Add Flow Variable
	
	> name > `skill`
	
	> Variable Type > `string`
	
	> Variable Value > `Techsummit`
	
	> Turn on `MArk as CAD Variable`
	
	> Save
	
- In Menu Option 1 > Select the Queue Block > Make it SBR based by selecting the Skills Based Queue.
	
- Setup skill requirements as below

**Set the following settings**

	> `Skillset >= 5`

	> `Make {{skill}} as a String Variable`

	> `VIPCustomer` IS {% raw %}{{skill}}{% endraw %}

	> Enable Skill Relaxation After waiting in queue for: `15 seconds`

**Set skill relaxation to (after 60 seconds):**

	> `Skillset >= 3`

	> Remove the requirement of the VIP Customer skill.

### 6. Update the Entry Point Routing Strategy

- Navigate to Routing Strategy > Routing > Routing Strategies.

- From the drop-down menu select `EP_<ID>_TS`.

- Select the existing strategy.

- From the dropdown menu select `Flow4<ID>` and click save.

- Click on the 3-dots icon for the current strategy and select 'Delete', the confirm the deletion.

---

### Congratulations, you have compleated Lab2 tasks! 
### We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete the short survey.



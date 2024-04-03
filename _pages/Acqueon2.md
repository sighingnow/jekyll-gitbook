---
title: Lab 9 - Outbound Campaign (Preview & Progressive)
author: Gagarin Sathiyanarayanan (gasathiy@cisco.com)
date: 2022-09-09
layout: post
---

```
author: Gagarin Sathiyanarayanan (gasathiy@cisco.com)
Last modified: Wed, 06 Mar 2024
```

## Table of Contents

| Topic                                                             | Lab Type      | Difficulty Level | Estimated length |
| ----------------------------------------------------------------- | ------------- | ---------------- | ---------------- |
| [Lab 9.1 Verify Tenant Provisioning](#verify-tenant-provisioning) | Practical Lab | EASY             | 5 min            |
| [Lab 9.2 Preview Campaign](#lab-92-preview-campaign)              | Practical Lab | EASY             | 20 min           |
| [Lab 9.3 Progressive Campaign](#lab-93-progressive-campaign)      | Practical Lab | EASY             | 20 min           |
| [Lab 9.4 Predictive Campaign](#lab-94-predictive-campaign)        | Coming Soon   | Coming Soon      | Coming Soon      |
| [Lab 9.5 Call Guide](#lab-95-call-guide)                          | Coming Soon   | Coming Soon      | Coming Soon      |

## Introduction

In this lab you will learn about configuring Webex Contact centre to manage outbound voice campaigns using the LCM (List and Campaign Manager) application.

## Lab Objective

1. Configure Webex Contact Centre and LCM (List and Campaign Manager) application
2. Verify that the Agents can accept outbound campaign calls from the Webex CC Agent Desktop

## Lab Pre-requisites

- In this lab tenant, the tenant provisioning and integration is already completed. If you are using a different tenant, you can configure and use outbound campaigns only if your enterprise has purchased the Acqueon SKU and provisioning, integration is completed.
- You should also be able to login to agent desktop with your respective team created in previous labs
- This step should have been completed as part of previous lab sections. If not already done, please create a team and add your agent to this new team
- Acqueon tenant version should be `v4.2.1.2310 and above` ( instructions in this guide are based on `v4.2.1.2401`)

## Lab Section

# Lab 9.1 Verify Tenant Provisioning

- Login to Control Hub, navigate to Contact Center Settings > Addons and ensure `Campaign Management` option is enabled

![Outbound](/assets/images/Acqueon/AE_9.1.1.gif)

- Navigate to `Integrations` option and ensure a custom connector with the name `CampaignManagerCredential` is created

![Outbound](/assets/images/Acqueon/AE_9.1.2.gif)

> Note: The steps mentioned above are integral to the Acqueon provisioning and integration process and should have been completed as part of your initial setup. This current step serves merely as a verification to ensure everything is in place before you begin with the lab. This has already been completed for the lab tenant. If you are using a different tenant and discover that any of the necessary steps have not been completed on your tenant, please consult the Webex Contact Center Ordering Guide available at https://www.cisco.com/c/en/us/partners/tools/collaboration-ordering-guides.html. Here, you can find the relevant SKUs and instructions on how to place your order.

# Lab 9.2 Preview Campaign

### Step 1: Navigate to Flows > Manage Flows > Create Flows

![Outbound](/assets/images/Acqueon/AE_9.2.1.png)

### Step 2: Provide a desired `Flow Name` and click `Start building Flow`

![Outbound](/assets/images/Acqueon/AE_9.2.2.png)

### Step 3: Connect the `NewPhoneContact` activity to `EndFlow` activity. Set `Validations` to On and `Publish Flow`

![Outbound](/assets/images/Acqueon/AE_9.2.3.png)

> Note: A flow must be configured with each campaign, referenced by the outdial entrypoint. The flow is simple, but dictates which variables are shown on the agent desktop and in which order. This is done via global variables. Configure variables in the flow as required. In this lab exercise, we will not be configuring any variables.

### Step 4: Create Outdial Queue

- Navigate to `Queues` and click `Create Queue`
  ![Outbound](/assets/images/Acqueon/AE_9.2.4.png)

- Configure the outdial queue
  - **Name:** `Provide any desired Name`
  - **Queue Type:** `Outdial Queue`
  - **Outbound Campaign:** `ON`
  - **Queue Routing Type:** `Longest Available Agent`
  - **Call Distribution:** Create Group > Select the team that the agent is part of
  - **Service Level Threshold:** `Set a desired value`
  - **Maximum Time in Queue:** `Set a desired value`
  - **Default Music in Queue:** `Set a desired value`
- Click `Create`

![Outbound](/assets/images/Acqueon/AE_9.2.5.gif)

### Step 5: Create Outdial EntryPoint

- Navigate to `Channels` and click `Create Channel`
  ![Outbound](/assets/images/Acqueon/AE_9.2.6.png)

- Configure the outdial EntryPoint
  - **Name:** `Provide any desired Name`
  - **Channel Type:** `Outbound Telephony`
  - **Service Level Threshold:** `Set a desired value`
  - **Routing Flow:** `Select flow created in Step1`
  - **Version Label:** `Latest` (or as per your configuration)
  - **Outdial Queue:** `Select the Queue created in previous step`
- Click `Create`

![Outbound](/assets/images/Acqueon/AE_9.2.7.gif)

### Step 6: Configure Desktop layout for preview

- Navigate to `Desktop Layouts` and click `Create Desktop Layout`
  ![Outbound](/assets/images/Acqueon/AE_9.2.8.png)

- Provide a desired name and select the team that the agent is part of. Also, download the dekstop layout.
  ![Outbound](/assets/images/Acqueon/AE_9.2.9.png)

- Edit the downloaded layout in any desired text editor and replace `advancedHeader` section with the below content.

![Outbound](/assets/images/Acqueon/AE_9.2.10.gif)

```json
"header":{
            "id":"dw-header",
            "widgets":{
               "acqueon-component":{
                  "comp": "agentx-preview-campaign",
                  "properties":{
                     "isCampaignManagementEnabled": "$STORE.agent.isCampaignManagementEnabled",
                     "agentDbId": "$STORE.agent.acqueonAgentId",
                     "lcmUrl": "$STORE.agent.lcmUrl",
                     "isCallInProgress": "$STORE.agentContact.isActiveCall",
                     "outdialEntryPointId": "$STORE.agent.outDialEp",
                     "teamId": "$STORE.agent.getAcqueonTeamId",
                     "campaignManagerAdditionalInfo": "$STORE.agent.campaignManagerAdditionalInfo",
                     "orgId": "$STORE.agent.orgId",
                     "dialerProxyHost": "$STORE.envVaribles.serviceUrls.dialerProxyHost",
                     "isProgressiveCampaignEnabled": "$STORE.app.featureFlags.isProgressiveCampaignEnabled"

                                }
                                    }
                        },
            "layout":{
               "areas":[["acqueon-component"]],
               "size":{"cols":[1], "rows":[1]}
                    }
                },
```

- Save this layout as a new file and upload it to desktop layout configuration. Click `Save`
  ![Outbound](/assets/images/Acqueon/AE_9.2.11.png)

- Login to Agent desktop with the team that is assigned this layout and verify that the campaign management icon is visible on the desktop
  ![Outbound](/assets/images/Acqueon/AE_9.2.12.png)

### Step 7: Create Campaign Group (Preview)

- Navigate to Contact Center Administration portal
  ![Outbound](/assets/images/Acqueon/AE_9.2.13.png)

- Cross launch into Acqueon administration portal
  ![Outbound](/assets/images/Acqueon/AE_9.2.14.png)

- Navigate to `Group` and click `+`
  ![Outbound](/assets/images/Acqueon/AE_9.2.15.png)

- Select `Voice Campaign Group` option
  ![Outbound](/assets/images/Acqueon/AE_9.2.16.png)

- Configure the below:
  - Name: `Enter desired Name`
  - Dialer Name: `Select the dialer configured in your tenant`
  - Entry POint: `Select the outdial entrypoint created in Step 5`
  - Pacing Mode: `Preview`
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.2.17.png)

- Select ANI based on your requirement
- From the list of available teams, select the respective team that is assigned to agent and move it under `Assigned Teams`. Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.2.18.png)

- Click `Save`
  ![Outbound](/assets/images/Acqueon/AE_9.2.19.png)

- Verify group status shows as `Executing`
  ![Outbound](/assets/images/Acqueon/AE_9.2.20.png)

### Step 8: Create Campaign (Preview)

- Navigate to `Campaign` and click `Add Campaign`
  ![Outbound](/assets/images/Acqueon/AE_9.2.21.png)

- Configure the below:
  - Name: `Enter desired Name`
  - Select Date Range, Time Range, TimeZone as per your requirement
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.2.22.png)

- Select `Dedicated Campaign Group` and select the group created in previous step
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.2.23.png)

- Select `Default_Simple_Strategy` as the contact strategy
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.2.24.png)

- Leave the default values as such and click `Save`
  ![Outbound](/assets/images/Acqueon/AE_9.2.25.png)

### Step 9: Create and upload contact list

- Create a text file with comma seperated values as shown in the image below
- The first row in the file should be : Firstname,Lastname,Phone
- The second row in the file should be: Test,Agent1,<`Any US phone number of your choice`>
- Save the file

![Outbound](/assets/images/Acqueon/AE_9.2.31.png)

- Navigate to "Contact Lists" section. Click on the "+" sign at the bottom right and click "Upload Contacts"
  ![Outbound](/assets/images/Acqueon/AE_9.2.27.png)

- Verify "Source Type" is `Formatted File`
- Verify "File Type" is `Text/CSV` and "Delimiter" is `,`
- Click "Choose File" and select the file created in the previous step
  ![Outbound](/assets/images/Acqueon/AE_9.2.28.png)

- Navigate to "Field Mapping", select "ZoneName" as `Campaign Specific TimeZone`
  ![Outbound](/assets/images/Acqueon/AE_9.2.29.png)

- Navigate to "Modes Mapping", select "Mobile" as `Mobile`
- Click "Upload"
  ![Outbound](/assets/images/Acqueon/AE_9.2.30.png)

- Click "Refresh" and verify that the list shows up under the list of records
  ![Outbound](/assets/images/Acqueon/AE_9.2.32.png)

- Navigate to `Campaign` > `Actions` > `Start`
  ![Outbound](/assets/images/Acqueon/AE_9.2.33.png)

### Step 10: Accept the Campaign Contact from Agent Desktop

- Login to desktop with agent credentials and select the appropriate team that was selected during the outdial queue creation.
- Click `Campaign Contact` and accept the preview contact
  ![Outbound](/assets/images/Acqueon/AE_9.2.34.png)

# Lab 9.3 Progressive Campaign

### Step 1: Navigate to Flows > Manage Flows > Create Flows

![Outbound](/assets/images/Acqueon/AE_9.2.1.png)

### Step 2: Provide a desired `Flow Name` and click `Start building Flow`

![Outbound](/assets/images/Acqueon/AE_9.3.2.png)

### Step 3: Connect the `NewPhoneContact` activity to `EndFlow` activity. Set `Validations` to On and `Publish Flow`

![Outbound](/assets/images/Acqueon/AE_9.3.3.png)

> Note: A flow must be configured with each campaign, referenced by the outdial entrypoint. The flow is simple, but dictates which variables are shown on the agent desktop and in which order. This is done via global variables. Configure variables in the flow as required. In this lab exercise, we will not be configuring any variables.

### Step 4: [Optional] Configure custom messages for Answering Machine or Abandoned Calls

- Navigate to `Event Flows`
  ![Outbound](/assets/images/Acqueon/AE_9.3.9.png)

> There is a new `OutboundCampaignCallResult` handler event which can be used to trigger a message to be played to the customer when the call has terminated at a voicemail/Answering machine or will be abandoned. In the diaexample below, a message is played for each case and the call is then disconnected. If the handler is not configured, the call will terminate when these two conditions occur.

- Add the `Case` activity and configure the below 2 cases
  - Case1: `AMD`
  - Case2: `ABANDONED`
  - Select the variable as `OutboundCampaignCallResult.CPAResult`

![Outbound](/assets/images/Acqueon/AE_9.3.4.gif)

- Add two `PlayMessage` activity and configure the custom message for both the cases. You can use Text-To-Speech (TTS) or a audio file as required.

- Case1 (AMD)
  ![Outbound](/assets/images/Acqueon/AE_9.3.5.gif)

- Case2 (ABANDONED)
  ![Outbound](/assets/images/Acqueon/AE_9.3.6.gif)

- Add `DisconnectContact` activity and conenct the output of the `PlayMessage` activity to it
- Also connect the `Default` outcome of the `Case` activity to the `DisconnectContact` activity
- Connect the outcome of `OutboundCampaignCallResult` activity to the `Case` activity
- Connect the `Case` outcome nodes to its respective `PlayMessage` activity

![Outbound](/assets/images/Acqueon/AE_9.3.7.gif)

- Set `Validations` to On and `Publish Flow`
  ![Outbound](/assets/images/Acqueon/AE_9.3.8.png)

### Step 5: Create Outdial Queue

- Navigate to `Queues` and click `Create Queue`
  ![Outbound](/assets/images/Acqueon/AE_9.2.4.png)

- Configure the outdial queue
  - **Name:** `Provide any desired Name`
  - **Queue Type:** `Outdial Queue`
  - **Outbound Campaign:** `ON`
  - **Queue Routing Type:** `Longest Available Agent`
  - **Call Distribution:** Create Group > Select the team that the agent is part of
  - **Service Level Threshold:** `Set a desired value`
  - **Maximum Time in Queue:** `Set a desired value`
  - **Default Music in Queue:** `Set a desired value`
- Click `Create`

![Outbound](/assets/images/Acqueon/AE_9.3.1.gif)

### Step 6: Create Outdial EntryPoint

- Navigate to `Channels` and click `Create Channel`
  ![Outbound](/assets/images/Acqueon/AE_9.2.6.png)

- Configure the outdial EntryPoint
  - **Name:** `Provide any desired Name`
  - **Channel Type:** `Outbound Telephony`
  - **Service Level Threshold:** `Set a desired value`
  - **Routing Flow:** `Select flow created in Step1`
  - **Version Label:** `Latest` (or as per your configuration)
  - **Outdial Queue:** `Select the Queue created in previous step`
- Click `Create`

![Outbound](/assets/images/Acqueon/AE_9.3.10.gif)

### Step 7: Create Campaign Group (Progressive)

- Navigate to Contact Center Administration portal
  ![Outbound](/assets/images/Acqueon/AE_9.2.13.png)

- Cross launch into Acqueon administration portal
  ![Outbound](/assets/images/Acqueon/AE_9.2.14.png)

- Navigate to `Group` and click `+`
  ![Outbound](/assets/images/Acqueon/AE_9.2.15.png)

- Select `Voice Campaign Group` option
  ![Outbound](/assets/images/Acqueon/AE_9.2.16.png)

- Configure the below:
  - Name: `Enter desired Name`
  - Dialer Name: `Select the dialer configured in your tenant`
  - Entry POint: `Select the outdial entrypoint created in Step 6`
  - Pacing Mode: `Progressive`
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.3.11.png)

- Select ANI based on your requirement
- Configure `Dial Rate` and `No Answer Ring Limit` as required or as shown in the image below
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.3.12.png)

> The `CPA Parameters` tab of the Campaign Group specifies whether CPA and AMD are needed for the call. The CPA parameters are considered advanced and are not typically modified. CPA is performed on the call by the dialer directly - there is no agent awareness. It has the ability to detect FAX machines, busy signals, invalid numbers, no answer calls and answering machines / voicemails.

- Enable `CPA` , `AMD Detection`, `Terminating Tone Detection` and click `Next`

![Outbound](/assets/images/Acqueon/AE_9.3.13.png)

- Configure `Contact Parameters` values as per the requirement and Click `Save`
  ![Outbound](/assets/images/Acqueon/AE_9.3.14.png)

- Verify group status shows as `Executing`
  ![Outbound](/assets/images/Acqueon/AE_9.3.15.png)

### Step 8: Create Campaign (Progressive)

- Navigate to `Campaign` and click `Add Campaign`
  ![Outbound](/assets/images/Acqueon/AE_9.2.21.png)

- Configure the below:
  - Name: `Enter desired Name`
  - Business Outcome Group: `Default group`
- Select Date Range, Time Range, TimeZone as per your requirement
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.3.16.png)

- Select `Dedicated Campaign Group` and select the group created in previous step
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.3.17.png)

- Select `Default_Simple_Strategy` as the contact strategy
- Click `Next`
  ![Outbound](/assets/images/Acqueon/AE_9.3.18.png)

- Leave the default values as such and click `Save`
  ![Outbound](/assets/images/Acqueon/AE_9.3.18.png)

### Step 9: Create and upload contact list

- Create a text file with comma seperated values as shown in the image below
- The first row in the file should be : Firstname,Lastname,Phone
- The second row in the file should be: Test,Agent1,<`Any US phone number of your choice`>
- Save the file

![Outbound](/assets/images/Acqueon/AE_9.3.20.png)

- Navigate to `Contact Lists` section. Click on the `+` sign at the bottom right and click `Upload Contacts`
  ![Outbound](/assets/images/Acqueon/AE_9.3.21.png)

- Verify "Source Type" is `Formatted File`
- Verify "File Type" is `Text/CSV` and "Delimiter" is `,`
- Click "Choose File" and select the file created in the previous step
  ![Outbound](/assets/images/Acqueon/AE_9.2.28.png)

- Navigate to "Field Mapping", select "ZoneName" as `Campaign Specific TimeZone`
  ![Outbound](/assets/images/Acqueon/AE_9.2.29.png)

- Navigate to "Modes Mapping", select "Mobile" as `Mobile`
- Click "Upload"
  ![Outbound](/assets/images/Acqueon/AE_9.2.30.png)

- Click "Refresh" and verify that the list shows up under the list of records
  ![Outbound](/assets/images/Acqueon/AE_9.3.22.png)

- Navigate to `Campaign` > `Actions` > `Start`
  ![Outbound](/assets/images/Acqueon/AE_9.3.23.png)

### Step 10: Accept the Campaign Contact from Agent Desktop

- Login to desktop with agent credentials and select the appropriate team that was selected during the outdial queue creation.
- Change agent status to `Available`

> The below example/demo covers a progressive 1:N dialer with Call Progress Analysis (CPA).

- Once an agent is available, the system will place `N` customer calls (This value is configured in Step 7 under `Dial Rate` configuration)

- For calls which result in live voice, the system will connect the agents

- If customer call is abandoned or goes to voicemail, our system will invoke the flow to determine how to handle the scenario (Through Configurations done in `Step4`)

![Outbound](/assets/images/Acqueon/AE_9.3.24.gif)

- In the `Progressive & Predictive Campaign Realtime Report` we can verify that both the numbers in the contact list were dialed once an agent was available
  ![Outbound](/assets/images/Acqueon/AE_9.3.25.png)

# Lab 9.4 Predictive Campaign

Stay Tuned. Coming Soon !!!

# Lab 9.5 Call Guide

Stay Tuned. Coming Soon !!!

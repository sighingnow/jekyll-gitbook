---
title: Lab 9 - Outbound Campaign (Progressive)
author: Gagarin Sathiyanarayanan
date: 2024-02-06
layout: post
---
```
Last modified: Tue, 06 Feb 2024
```

## Table of Contents

| Topic                                                             | Lab Type      | Difficulty Level | Estimated length |
| ----------------------------------------------------------------- | ------------- | ---------------- | ---------------- |
| [Verify Tenant Provisioning](#verify-tenant-provisioning )                               | Practical Lab | EASY             | 5 min           |
| [Webex CC Configurations](#webex-cc-configurations)                               | Practical Lab | EASY             | 5 min           |
| [Acqueon Configurations](#acqueon-configurations)                               | Practical Lab | EASY             | 5 min           |



## Introduction
In this lab you will learn about configuring Webex Contact centre to manage outbound voice campaigns using the LCM (List and Campaign Manager) application.

## Lab Objective
1. Configure Webex Contact Centre and LCM (List and Campaign Manager) application
2. Verify that the Agents can accept outbound campaign calls from the Webex CC Agent Desktop

## Lab Pre-requisites
- In this lab tenant, the tenant provisioning and integration is already completed. If you are using a different tenant, you can configure and use outbound campaigns only if your enterprise has purchased the Acqueon SKU and provisioning, integration is completed. 
- You should also be able to login to agent desktop with your respective team created in previous labs
- This step should have been completed as part of previous lab sections. If not already done, please create a team and add your agent to this new team


## Lab Section

# Lab 9.1 Verify Tenant Provisioning 

- Login to Control Hub, navigate to Contact Center Settings > Addons and ensure `Campaign Management` option is enabled

![Outbound](/assets/images/Acqueon/AE_9.1.1.gif)

- Navigate to `Integrations` option and ensure a custom connector with the name `CampaignManagerCredential` is created 

![Outbound](/assets/images/Acqueon/AE_9.1.2.gif)

>Note: The steps mentioned above are integral to the Acqueon provisioning and integration process and should have been completed as part of your initial setup. This current step serves merely as a verification to ensure everything is in place before you begin with the lab. This has already been completed for the lab tenant. If you are using a different tenant and discover that any of the necessary steps have not been completed on your tenant, please consult the Webex Contact Center Ordering Guide available at https://www.cisco.com/c/en/us/partners/tools/collaboration-ordering-guides.html. Here, you can find the relevant SKUs and instructions on how to place your order.


# Lab 9.2 Preview Campaign

Step 1: Navigate to Flows > Manage Flows > Create Flows
![Outbound](/assets/images/Acqueon/AE_9.2.1.png)

Step 2: Provide a desired `Flow Name` and click `Start building Flow`
![Outbound](/assets/images/Acqueon/AE_9.2.2.png)

Step 3: Connect the `NewPhoneContact` activity to `EndFlow` activity. Set `Validations` to On and `Publish Flow` 

![Outbound](/assets/images/Acqueon/AE_9.2.3.png)

>Note: A flow must be configured with each campaign, referenced by the outdial entrypoint. The flow is simple, but dictates which variables are shown on the agent desktop and in which order. This is done via global variables. Configure variables in the flow as required. In this lab exercise, we will not be configuring any variables.

Step 4: Create Outdial Queue 

- Navigate to `Queues` and click `Create Queue`
![Outbound](/assets/images/Acqueon/AE_9.2.4.png)

- Configure the outdial queue
  - **Name:** `Provide any desired Name`
  - **Queue Type:** `Outdial Queue`
  - **Outbound Campaign:** `ON`
  - **Queue Routing Type:** `Longest Available Agent`
  - **Call Distribution:** Create Group > Select the team that the agent is part of
  -  **Service Level Threshold:** `Set a desired value` 
  -  **Maximum Time in Queue:** `Set a desired value`
  -  **Default Music in Queue:** `Set a desired value`
-  Click `Create`
 
![Outbound](/assets/images/Acqueon/AE_9.2.5.gif)

Step 5: Create Outdial EntryPoint 

- Navigate to `Channels` and click `Create Channel`
![Outbound](/assets/images/Acqueon/AE_9.2.6.png)

- Configure the outdial queue
  - **Name:** `Provide any desired Name`
  - **Channel Type:** `Outbound Telephony`
  - **Service Level Threshold:** `Set a desired value` 
  - **Routing Flow:** `Select flow created in Step1` 
  - **Version Label:** `Latest` (or as per your configuration)
  - **Outdial Queue:** `Select the Queue created in previous step`
- Click `Create` 

![Outbound](/assets/images/Acqueon/AE_9.2.7.gif)

Step 6: Configure Desktop layout for preview 

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




Step 7: Create Campaign Group

Step 8: Create Campaign

Step 9: Upload Contact list 

Step 9: 

# Lab 9.3 Progressive Campaign

# Lab 9.4 Predictive Campaign



!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


# Create Campaign

- Login to administration portal and launch the 'Campaign Manager' portal 

![Outbound](/assets/images/1_OB_1.gif)


- Navigate to 'Campaign' and click 'Add Campaign' button
![Outbound](/assets/images/1_OB_2.gif)


- Enter the following details and click 'Next' : 
  - Campaign name : "Enter a desired name"
  - Select "Business Outcome Group": `Select Wrapup Code`
  - Select Date Range: `Select a desired date range`
  - Select Time Range: `Select a desired time duration when campaign should be active`
  - Select TimeZone: `Select a desired time zone`


![Outbound](/assets/images/1_OB_3.gif)

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

---
title: Lab 9 - Outbound Campaign (Progressive)
author: Gagarin Sathiyanarayanan
date: 2024-02-06
layout: post
last_modified_at: 2024-02-06
---

## Table of Contents

- [Verify Tenant Provisioning](#lab-91-verify-tenant-provisioning)
- [Webex CC Configurations](#lab-92-webex-cc-configurations)
- [Acqueon Configurations](#lab-93-acqueon-configurations)

## Introduction

This lab guides you through configuring the Webex Contact Center to manage outbound voice campaigns using the List and Campaign Manager (LCM) application. You'll learn to set up and verify configurations essential for running successful outbound campaigns.

## Lab Objective

1. Configure Webex Contact Center and the LCM (List and Campaign Manager) application.
2. Ensure that agents can accept outbound campaign calls from the Webex CC Agent Desktop.

## Lab Pre-requisites

- Tenant provisioning and integration are already completed for this lab tenant. For different tenants, outbound campaigns can only be configured and used if your enterprise has purchased the Acqueon SKU, and provisioning and integration are completed.
- Participants should be able to log in to the agent desktop with the team created in previous labs.
- Ensure a team is created, and your agent is added to this new team, a step that should have been completed in previous lab sections.

## Lab Sections

### Lab 9.1 Verify Tenant Provisioning 

1. Log in to the Control Hub, navigate to Contact Center Settings > Addons, and ensure the `Campaign Management` option is enabled.
   
   ![Outbound](/assets/images/Acqueon/AE_9.1.1.gif)

2. Navigate to the `Integrations` option and ensure a custom connector named `CampaignManagerCredential` is created.

   ![Outbound](/assets/images/Acqueon/AE_9.1.2.gif)

   > **Note:** The steps above are integral to the Acqueon provisioning and integration process, serving as a verification step to ensure readiness for the lab. These steps have been completed for the lab tenant. If using a different tenant and any steps are incomplete, please refer to the [Webex Contact Center Ordering Guide](https://www.cisco.com/c/en/us/partners/tools/collaboration-ordering-guides.html) for necessary SKUs and order placement instructions.

### Lab 9.2 Preview Campaign

1. Navigate to Flows > Manage Flows > Create Flows.
   
   ![Outbound](/assets/images/Acqueon/AE_9.2.1.png)

2. Provide a desired `Flow Name` and click `Start building Flow`.
   
   ![Outbound](/assets/images/Acqueon/AE_9.2.2.png)

3. Connect the `NewPhoneContact` activity to `EndFlow` activity. Set `Validations` to On and `Publish Flow`.

   ![Outbound](/assets/images/Acqueon/AE_9.2.3.png)

   > **Note:** Each campaign must have an associated flow, referenced by the outdial entry point. The flow structure is straightforward but crucial for determining the variables displayed on the agent desktop and their arrangement, managed through global variables. This lab will not delve into variable configuration.

- Continue with the creation of the Outdial Entry Point and Outdial Queue as per the instructions provided in the lab guide.

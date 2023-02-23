---
title: Lab 2 - IVR Contact Routing
author: Kevin Simpson & Krishna Tyagi & Chandramouli Vaithiyanathan
date: 2022-02-02
category: Jekyll
layout: post
---


## Table of Contents

| Topic                                                                         | Lab Type      | Difficulty Level | Estimated length |
| ----------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Control Hub User Management Tasks](#control-hub-user-management-task)        | Practical Lab | EASY            | 10 min           |
| [Management Portal User Configuration](#management-portal-user-configuration) | Practical Lab | EASY            | 5 min            |
| [Bulk Operations](#bulk-operations)                                           | Practical Lab | EASY            | 5 min            |
| [Access to the Agent Desktop](#access-to-the-agent-desktop)                   | Practical Lab | EASY            | 10 min           |

## Overview of the lab:

In this lab, we will configure all of the required elements to deliver a call into a queue.  We will then create a new flow and iterate on it adding functionality and exploring opportunities for improvement.

## Introduction

### Lab Objective

- Configure Entry Point, Entry Point Mapping, Routing Strategy, and Queue
- Create a basic flow
- Add functionality to the flow by making small changes

  ---

### Pre-requisites

- Complete Lab 1 "Admin Experience"
  - You have the administrator's access to the Tenant Management Portal.
  - Agent and Supervisor users created and configured
  - You have agent's access to the Agent Desktop
  - You have the supervisor's access to the Tenant Management Portal.
  - Agent is part of 2 Teams.
  - Webex Calling extensions are assigned to a WxCC users (agent and supervisor).
  ---

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\

  ---



### Fill in the form with the details provided and agent email address you created in the previous lab, then click "Update Directions" 
<form id="IVRdeets">
  
  <label for="DN">EP DN you were assigned:</label><br>
  <input type="text" id="DN" name="DN"><br>
  
  <label for="attendee">Attendee ID:</label><br>
  <input type="text" id="attendee" name="attendee"><br>
  
  <label for="agent">Agent Email Address:</label><br>
  <input type="text" id="agent" name="agent"><br>
<br>

  <button onclick="update()">Update Directions</button>
</form>
---
<script>document.forms["IVRdeets"][1].value = localStorage.getItem("attendee-form") || "Enter Attendee ID" </script>


---

# Lab Section


## Part 1: Configuring Contact Center for Call Delivery

### Create your Entry Point
1. Click on the provisioning menu > Entry Points/Queues > Entry point
2. Click Create new Entry point
    > Name your Entry Point EP_<w class="attendee_out">AttendeeID</w>
    >
    > Description: optional
    >
    > Channel Type: telephony
    >
    > Service Level Threshold: 60
    >
    > Flow: 
    >
    > Music on Hold: defaultmusic_on_hold.wav

    ---

### Create your Entry Point mapping
1. Click on the provisioning menu > Entry Point Mapping
2. Click new mapping
    > In location, select "Office"
    >
    > In Available Numbers select <w class= "DN-out" >Your EP DN</w>
    >
    > In Entry point select EP_<w class="attendee_out">AttendeeID
    >
    > Click Save

    ---

### Create a queue
1. Click on the provisioning menu > Entry Points/Queues > Queue
2. Click New Queue
    > Name your queue Q_<w class="attendee_out">AttendeeID</w>
    >
    > Description: optional
    >
    > Channel Type
    >
    > Queue Routing Type: Longest Available Agent
    > 
    > Call Distribution:
    >> Click Add Group
    >>
    >> Select team XXXX
    >>
    >> Save Group
    >
    > Service Level Threshold: 60
    >
    > Maximum Time in Queue: 600
    >
    > Default Music in Queue: defaultmusic_on_hold.wav
    >
    > Save

    ---


### Create your first flow
1. Click
2. Create a new flow and name it <w class="attendee_out">AttendeeID</w>_TechSummit

### Create Routing Strategy  


### Test your configuration
1. Call your assigned DN 

## Part 2: Adding functionality to your flow

### Adding a comfort message while a call is in queue

### Creating alternating comfort messages while a call is in queue

### Creating an opt-out option with ANI readout

### Adding the ability to collect digits for a callback

### Making the flow bi-lingual


## Part 3: Adding HTTP lookups and agent routing




























<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	


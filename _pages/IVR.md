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
| [Configuring Contact Center for Call Delivery](#part-1-configuring-contact-center-for-call-delivery)        | Practical Lab | EASY            | 10 min           |
| [Adding Functionality to Your Flow](#part-2-adding-functionality-to-your-flow) | Practical Lab | EASY            | 5 min            |
| [Bulk Operations FAKE!](#bulk-operations)                                           | Practical Lab | EASY            | 5 min            |
| [Access to the Agent Desktop FAKE!](#access-to-the-agent-desktop)                   | Practical Lab | EASY            | 10 min           |

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
  <input type="text" id="DN" name="DN" onChange="update()"><br>
  
  <label for="attendee">Attendee ID:</label><br>
  <input type="text" id="attendee" name="attendee" onChange="update()"><br>
  
  <label for="agent">Agent Email Address:</label><br>
  <input type="text" id="agent" name="agent" onChange="update()"><br>
<br>

  <button onclick="update()">Update Directions</button>
</form>

<script>
document.forms["IVRdeets"][0].value = localStorage.getItem("EPDN") || "Your EP DN"
document.forms["IVRdeets"][1].value = localStorage.getItem("attendee-form") || "Your Attendee ID" 
document.forms["IVRdeets"][2].value = localStorage.getItem("agentEmail") || "Agent Email"
update()
</script>


---

## Lab Section


# Part 1: Configuring Contact Center for Call Delivery

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
    >> Select <w class="attendee_out">Your_Attendee_ID</w>_Team1
    >>
    >> Save Group
    >>
    >> Create second group
    >>
    >> Select <w class="attendee_out">Your_Attendee_ID</w>_Team2
    >>
    >> After: 60 Seconds in queue
    >>
    >> Add Group as: Last
    >>
    >> Save Group
    >>
    >> Click Close
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
1. Download the [Flow Template](https://webexcc.github.io/../../../assets/files/flow_template.json){:target="\_blank"}
   > The file will open in a separate window.  
   >
   > If using Firefox, Select the save option.
   >
   > <img src="/assets/images/IVR/saveJson.gif">
   >
   > If using Chrome or Edge, right click and select save.
   >
   ><img src="/assets/images/IVR/saveJsonChrome.gif">
   
   ---
2. Click Routing Strategy <img src="/assets/images/IVR/routingStrategy.JPG" height="40">
3. Click on Flows in the top ribbon
4. Click Import
5. Select flow_template
6. Click the ellipsis next to the newly imported flow_template and select Open
   > Rename the flow <w class="attendee_out">AttendeeID</w>_TechSummit
   >
   > Click on the Play Message node
   >> Audio File: welcome.wav 
   >
   > Click on the Queue Contact node
   >> Select Static Queue
   >>
   >> Queue: Q_<w class="attendee_out">AttendeeID</w>
   >>
   > Click on the Play Music node
   >> Select Static Audio File
   >>
   >> Music File: defaultmusic_on_hold.wav
   >>
   > Click the Validation switch to turn on validation
   >
   > Click Publish Flow
   > 
   > Add a Publish Note of your choosing
   >
   > Click Publish Flow
   >
   > Click Return to Flow
   > 
   > Turn off Validation 

    ---



### Create your Entry Point
1. Click on Provisioning > Entry Points/Queues > Entry point
2. Click Create new Entry point
    > Name your Entry Point EP_<w class="attendee_out">AttendeeID</w>
    >
    > Description: optional
    >
    > Channel Type: telephony
    >
    > Service Level Threshold: 60
    >
    > Flow: <w class="attendee_out">AttendeeID</w>_TechSummit
    >
    > Music on Hold: defaultmusic_on_hold.wav

    ---

### Create your Entry Point mapping
1. Click on the provisioning menu > Entry Point Mapping
2. Click new mapping
    > In location, select "Office"
    >
    > In Available Numbers select <w class= "DN_out" >Your EP DN</w>
    >
    > In Entry point select EP_<w class="attendee_out">AttendeeID
    >
    > Click Save

    ---


### Test your configuration
1. Call <w class= "DN_out" >Your EP DN</w> from your non agent extension
    > You should hear the greeting message and then the music in queue
    >
    > Go available in the agent desktop
    >> The call should be delivered to your agent extension
    >
    > End the call, Wrap-up, and Go unavailable

    ---



# Part 2: Adding Functionality to Your Flow

### Adding a comfort message while a call is in queue
1. Delete the connection which loops from the end of the Play Music node back to the beginning of the Play Music node.
2. Drag a new Play Message node under the Play Music node. 
3. Connect the end of the Play Music node to the beginning of the play message node.
4. Connect the end of the Play Message node to the beginning of the Play Music node.
5. Click on the Play Music node
   > Set the music duration to 15 seconds 
   >
6. Click on the Play message node
   > 
   > 
   >
   >
   >
   >
7. Validate and Publish the flow:   
   > Click the Validation switch to turn on validation
   >
   > Click Publish Flow
   > 
   > Add a Publish Note of your choosing
   >
   > Click Publish Flow
   >
   > Click Return to Flow
   > 
   > Turn off Validation 
8. Place a test call to <w class= "DN_out" >Your EP DN</w>
   > Did you hear the comfort message every 15 seconds?

   ---

### Creating alternating comfort messages while a call is in queue
1. Create a new flow variable: 
    > Click on the flow background 
    >
    > 
2. Delete the connection from the Play Music node to the Play Message node.
3. Delete the connection from the Play Message node to the Play Music node.
4. Drag a Set Variable node onto the canvas and place it next to the Play Music node
5. Click on the Set Variable node
    >
    >
    >
    >
6. Drag a Condition node on the canvas
7. Connect the end of the Set Variable node to the Condition node
8. Click on the condition node
    >
    >
    >
    >
9. Drag another Play Message node onto the canvas 
    > 
    >
    >
10. Connect the True 
11. Connect the False
12. Connect the ends of both Play Message nodes to the Play Music node
13. Publish your flow
14. Place a test call to <w class= "DN_out" >Your EP DN</w>
   > Did you hear the comfort message and website message alternate every 15 seconds?
  
  ---
### Creating an opt-out option with ANI readout
1. Create new flow variables:
   > Callback number
   >> Type: String
   >>
   >> No default value
   >
   > rDigit
   >> Type: Integer
   >>
   >> Default Value: 0
   >
   >
2. 
3. Delete the connection from the second Play Message node
4. Drag a Menu node onto the canvas
   > 
   >
   >
   >
   >


### Adding the ability to collect digits for a callback

### Making the flow bi-lingual


## Part 3: Adding HTTP lookups and agent routing









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
    localStorage.setItem("attendee-form",document.forms["IVRdeets"][1].value)
  }  
  if(document.forms["IVRdeets"][2].value != "Agent Email"){
    localStorage.setItem("agentEmail",document.forms["IVRdeets"][2].value)
  } 
  }
</script> 


















<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	


---
title: Lab 2 - IVR Contact Routing
author: Kevin Simpson & Krishna Tyagi & Chandramouli Vaithiyanathan
date: 2022-02-02
category: Jekyll
layout: post
---
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
  if(document.forms["IVRdeets"][3].value != "Supervisor Extension"){
    localStorage.setItem("supervisorEXT",document.forms["IVRdeets"][3].value)
  }
  }
</script>

## Table of Contents

| Topic                                                                         | Lab Type      | Difficulty Level | Estimated length |
| ----------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Configuring Contact Center for Call Delivery](#configuring-contact-center-for-call-delivery)        | Practical Lab | EASY            | 10 min           |
| [Adding a comfort message while a call is in queue](#adding-a-comfort-message-while-a-call-is-in-queue) | Practical Lab | EASY            | 8 min            |
| [Creating alternating comfort messages while a call is in queue](#creating-alternating-comfort-messages-while-a-call-is-in-queue)                                           | Practical Lab | EASY            | 15 min            |
| [Creating an opt-out option with ANI readout](#creating-an-opt-out-option-with-ani-readout)                   | Practical Lab | EASY            | 15 min           |
| [Adding the ability to receive a callback at a different number](#adding-the-ability-to-receive-a-callback-at-a-different-number)                   | Practical Lab | EASY            | 15 min           |
| [Adding the ability to collect an extension and present it to an agent during a callback](#adding-the-ability-to-collect-an-extension-and-present-it-to-an-agent-during-a-callback)                   | Practical Lab | EASY            | 15 min | 

         
---


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

  <label for="supervisorEXT">Supervisor Extension:</label><br>
  <input type="text" id="agent" name="supervisorEXT" onChange="update()"><br>
<br>

  <button onclick="update()">Update Directions</button>
</form>

<script>
document.forms["IVRdeets"][0].value = localStorage.getItem("EPDN") || "Your EP DN"
document.forms["IVRdeets"][1].value = localStorage.getItem("attendee-form") || "Your Attendee ID" 
document.forms["IVRdeets"][2].value = localStorage.getItem("agentEmail") || "Agent Email"
document.forms["IVRdeets"][3].value = localStorage.getItem("supervisorEXT") || "Supervisor Extension"
update()
</script>


---

## Lab Section


# Configuring Contact Center for Call Delivery

### Create a queue
1. Click on Provisioning > Entry Points/Queues > Queue
    > <img src="/assets/images/IVR/openQueue.gif">
    ---
2. Click New Queue
    > Name your queue Q_<w class="attendee_out">AttendeeID</w>
    >
    > Description: optional
    >
    > Channel Type: Telephony
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
    > ---
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
   ><img src="/assets/images/IVR/saveJsonChrome.gif" width="243">
   
      ---
2. Click Routing Strategy <img src="/assets/images/IVR/rsToFlow.gif" Align= "right" height="200">
3. Click on Flows in the top ribbon 
4. Click Import
5. Select flow_template
<br><br><br><br><br><br><br><br>
6. Click the ellipsis next to the newly imported flow_template and select Open 
   > <img src="/assets/images/IVR/openFlow.JPG" height="40">
   > 
   > Rename the flow to <w class="attendee_out">AttendeeID</w>_TechSummit by clicking on the pencil icon at the top of the screen, next to the flow name
   >
   > Click on the Play Message node
   >> Audio File: welcome.wav 
   >
   > ---
   > Click on the Queue Contact node
   >> Select Static Queue
   >>
   >> Queue: Q_<w class="attendee_out">AttendeeID</w>
   >>
   > ---
   >
   > Click on the Play Music node
   >> Select Static Audio File
   >>
   >> Music File: defaultmusic_on_hold.wav
   >>
   >  ---
   >
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

⚠️**Your Entry Point has already been created as EP_<w class="attendee_out">AttendeeID</w>.  In this step you only need to search for it and update the flow field.**


1. Click on Provisioning > Entry Points/Queues > Entry point
2. Click Create new Entry point [Show Me](https://webexcc.github.io/../../../assets/images/IVR/openEP.gif){:target="\_blank"}
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
    >
    > Click Save
    >
    > ---

### Create your Entry Point mapping

⚠️**Your Entry Point has already been mapped for you.  You can skip this step.**

1. Click on Provisioning > Entry Point Mapping [Show Me](https://webexcc.github.io/../../../assets/images/IVR/openEPmap.gif){:target="\_blank"}
2. Click new mapping
    > In location, select "Office"
    >
    > In Available Numbers select <w class= "DN_out" >Your EP DN</w>
    >
    > In Entry point select EP_<w class="attendee_out">AttendeeID
    >
    > Click Save
    >
    > ---


### Test your configuration
1. Call <w class= "DN_out" >Your EP DN</w> from your supervisor extension
    > You should hear the greeting message and then the music in queue
    >
    > Go available in the agent desktop
    >> The call should be delivered to your agent extension
    >
    > End the call, Wrap-up, and Go unavailable
    >
    > ---

# Adding Functionality to Your Flow

## Adding a comfort message while a call is in queue
1. Delete the connection which loops from the end of the Play Music node back to the beginning of the Play Music node.
2. Drag a new Play Message node under the Play Music node. 
3. Click on the Play message node
   > 
   > Activity Label: comfortMessage
   >
   > Audio File: comfort_1_English
   >
   > ---
4. Click on the Play Music node
   > Set the music duration to 15 seconds 
   >
   > --- 
5. Connect the end of the Play Music node to the beginning of the play message node.
6. Connect the end of the Play Message node to the beginning of the Play Music node.
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
   >
   > [Compare](https://webexcc.github.io/../../../assets/images/IVR/comfortMessage.JPG){:target="\_blank"}
   >
   > ---
8. Place a test call to <w class= "DN_out" >Your EP DN</w>
   > Did you hear the comfort message every 15 seconds?
   >
   > ---

## Creating alternating comfort messages while a call is in queue
1. Create a new flow variable: 
    > Click on the cog in the lower left corner of the canvas <img src="/assets/images/IVR/flowCog.JPG" height="40"> (or on the background of the flow) 
    >
    > Click Add Flow Variables
    >> Name: Loop_Count
    >> 
    >> Variable Type: Integer
    >>
    >> Default value: 0
    >
    > Click Save
    >
    > ---

2. Delete the connection from the Play Music node to the comfortMessage node.
3. Drag a Set Variable node onto the canvas and place it below the Play Music node
4. Click on the Set Variable node
    > Activity Label: lCount
    >
    > Variable: Loop_Count
    >
    > Set Value: \{\{ Loop_Count + 1 \}\}
    >
    > ---
5. Connect the Play Music node to lCount
6. Drag a Condition node on the canvas
7. Connect the end of the Set Variable node to the Condition node
8. Click on the condition node
    > Activity Label: evenOdd
    >
    > Expression: \{\{ Loop_Count is odd\}\}
    >
    > ---
9. Drag another Play Message node onto the canvas 
    > Activity Label: websiteMessage
    >
    > Audio File: website_English.wav
    >
    > ---
10. Connect the True node edge from evenOdd to comfortMessage
11. Connect the False node edge from evenOdd to websiteMessage
12. Connect the end of websiteMessage node to the Play Music node
13. Publish your flow [Compare](https://webexcc.github.io/../../../assets/images/IVR/altMessages.JPG){:target="\_blank"}
14. Place a test call to <w class= "DN_out" >Your EP DN</w>
    > Did you hear the comfort message and website message alternate every 15 seconds?
    >
    > ---

## Creating an opt-out option with ANI readout
1. Create new flow variables:
   > Name: callbackANI
   >> Type: String
   >>
   >> No default value
   >
   > ---
   >
   > Name: rDigit
   >> Type: string
   >>
   >> No default value
   >
   > ---
   >
   > Name: sPosition
   >> Type: Integer
   >>
   >> Default Value: 0
   >>
   ---
2. Delete the connection from the websiteMessage node to Play Music
3. Drag a Menu node onto the canvas
   > Activity Label: callback_opt
   >
   > Audio File: opt_out_English.wav
   >
   > Make Prompt Interruptible: True
   >
   > Digit Number: 1 Link Description: optOut 
   >
   > Connect the No-Input Timeout node edge to Play Music
   >
   > Connect the Unmatched Entry node edge to Play Music
   >
   > ---
4. Connect the websiteMessage to the callback_opt node
5. Add a Set Variable node
   > Activity Label: callbackANI_set
   >
   > Select Variable: callbackANI
   >
   > Set to Value: \{\{NewPhoneContact.ANI \| slice (NewPhoneContact.ANI.length -10,NewPhoneContact.ANI.length)\}\}
   >
   ---
6. Connect the callback_opt optOut node edge to callbackANI_set 
7. Add a Play Message Node
   > Activity Label: cfrom
   >
   > Audio File: calling_from_English.wav
   >
   > ---
8. Connect callbackANI_set to cfrom
9. Add a Set Variable node
   > Activity Label: rDigit_set
   >
   > Select Variable: rDigit
   >
   > Set to Value: \{\{callbackANI \| slice (sPosition,sPosition+1)\}\}
   >
   ---
10. Connect cfrom to rDigit_set
11. Add a Play Message node
   > Activity Label: playDigit 
   >
   > Click Add Audio Prompt Variable
   >> Audio Prompt Variable: \{\{rDigit\}\}_English.wav
   >>
   >> Delete the Audio File Drop Down
   >> 
   >> ---
12. Connect rDigit_set to playDigit
13. Add a Set Variable node
    > Activity Label: advance
    >
    > Select Variable: sPosition
    >
    > Set to Value: \{\{sPosition+1\}\}
    >
   ---
14. Connect playDigit to advance
15. Add a Condition node
    > Activity Label: positionCheck
    > 
    > Condition: \{\{sPosition <= (callbackANI.length -1) \}\}
    >
    > True: Connect to rDigit_set 
    >
    > False: Add a new Disconnect Contact node and connect it here
    >
   ---
16. Connect advance to positionCheck  
17. Publish your flow [Compare](https://webexcc.github.io/../../../assets/images/IVR/aniRead.JPG){:target="\_blank"}
18. Place a test call to <w class= "DN_out" >Your EP DN</w>
    > When you are given the option for a callback, press 1.
    >> Did you hear your 10 digit callback number being read back?

    ---



## Adding the ability to receive a callback at a different number
1. Add a new Menu node
    > Activity Label: confirmNumber
    >
    > Prompt: number_confirm_English.wav
    >
    > Make Prompt Interruptible: True
    >
    > Digit Number: 1 Link Description: confirm number
    >
    > Digit Number: 2 Link Description: change number
    >
    > Connect No-Input Timeout to the front of the confirmNumber node
    >
    > Connect Unmatched Entry to the front of the confirmNumber node
    >
    > ---
2. Delete the False node edge from positionCheck to Disconnect Contact
3. Connect the False node edge from positionCheck to confirmNumber
4. Connect the confirm number node edge to Disconnect Contact
5. Add a Collect Digits node
   > Activity Label: newNumber 
   >
   > Audio File: new_number_English.wav
   >
   > Make Prompt Interruptible: True
   >
   > Minimum Digits: 10
   >
   > Maximum Digits: 10
   >
   > Connect No-Input Timeout to the front of the newNumber node
   >
   > Connect Unmatched Entry to the front of the newNumber node
   >
   > ---
6. Connect the change number node edge to newNumber
7. Add a Set Variable Node
   > Activity Label: newCB
   >
   > Variable: callbackANI
   >
   > Set Value: \{\{newNumber.DigitsEntered\}\}
   >
   > ---
8. Connect newNumber to newCB
9.  Add a Set Variable Node
    > Activity Label:resetPosition
    >
    > Variable: sPosition
    >
    > Set Value: 0
    >
    > ---
10. Connect newCB to resetPosition
11. Add a Play message node
    > Activity Label: rcontext
    > 
    > Audio File: entered_English.wav
    >
    > ---
12. Connect resetPosition to rcontext
13. Connect rcontext to rDigit_set
14. Publish your flow [Compare](https://webexcc.github.io/../../../assets/images/IVR/changeNumber.JPG){:target="\_blank"}
15. Place a test call to <w class= "DN_out" >Your EP DN</w>
    > When you are given the option for a callback, press 1.
    >
    > Press 2 to enter a different number.
    >> Did you hear your 10 digit callback number being read back?
    >>
    >> Did you hear the number you entered read back?

    ---



## Adding the ability to collect an extension and present it to an agent during a callback
1. Create new flow variable:
   > Name: Extension
   >
   >> Type: String
   >>
   >> No default value
   >>
   >> Set as agent Viewable: True
   >>
   >> Desktop Label: Extension
   >
    ---
2. Add a Menu node
   > Activity Label: needExt
   > 
   > Audio File: ext_English.wav 
   >
   > Make Prompt Interruptible: True
   >
   > Digit Number: 1 Link Description: collect ext
   >
   > ---  
3. Delete to connection from the confirm number node edge of confirmNumber to Disconnect Contact
4. Connect the confirm number node edge of confirmNumber to needExt
5. Add a Collect Digits node
   > Activity Label: getEXT
   >
   > Audio File: enter_ext_English
   >
   > Make Prompt Interruptible: True
   >
   > Connect the No-Input Timeout node edge to the front of the getEXT node
   >
   > Connect the Unmatched Entry node edge to the front of the getEXT node
   > 
   > ---
6. Connect the collect ext node edge of needExt to getEXT
7. Add a Set Variable node
    > Activity Label: setExt
    >
    > Variable: Extension
    >
    > Set Value: \{\{getEXT.DigitsEntered\}\}
8. Connect getEXT to setEXT
9. Add a Set variable node
    > Activity Label: clrsPos
    >
    > Variable: sPosition 
    >
    > Set Value: 0
    >
    > ---
10. Connect setEXT to clrsPos
11. Add a Play Message node
    > Activity Label: entEXT
    >
    > Audio File: entered_English.wav
    >
    > ---

12. Connect clrsPos to entEXT
13. Use Shift + left click to select nodes:
   - rDigit_set
   - playDigit
   - advance
   - positionCheck
14. Click the copy button in the lower left corner of the canvas
15. Drag the copied versions of the nodes under the clrsPos node
16. Rename the copied nodes the original names = _EXT (example: rDigit_set_EXT)
17. Connect entEXT > rDigit_set_EXT > playDigit_EXT > advance_EXT > positionCheck_EXT
18. Edit rDigit_set_EXT 
    > Set value: \{\{Extension \| slice (sPosition,sPosition+1)\}\}
    >
    > ---
19. Edit positionCheck_EXT
    > Expression: \{\{sPosition <= (Extension.length -1) \}\}
    >
    > Connect True node edge to rDigit_set_EXT
    >
    >  ---
20. Add a Menu node   
    > Activity Label: confirmEXT
    >
    > Audio File: ext_confirm_English.wav
    >
    > Make Prompt Interruptible: True
    >
    > Digit Number: 1 Link Description: confirmed
    >
    > Digit Number: 2 Link Description: again
    >
    > Connect No-Input Timeout to the front of the confirmEXT node
    >
    > Connect Unmatched Entry to the front of the confirmEXT node
    >
    > Connect the Again node edge to getEXT
    >
    > ---
21. Connect the False node edge of positionCheck_EXT to confirmEXT
22. Add a Callback node
    > Activity Label: callback
    >
    > Callback Dial Number: callbackANI
    >
    > Callback Queue: Q_<w class="attendee_out">AttendeeID</w>
    >
    > ---
23. Connect the confirmed node edge of confirmedEXT to callback
24. Add a Play Message node
    > Activity Label: callbackConfirm
    >
    > Audio File: callback_confirm_English.wav
    >
    > ---
25. Connect callback to callbackConfirm
26. Connect callbackConfirm to Disconnect Contact
27. Connect the No-Input Timeout and Unmatched Entry node edges from needExt to Disconnect Contact
28. Publish your flow [Compare](https://webexcc.github.io/../../../assets/images/IVR/collectExt.JPG){:target="\_blank"}
29. Place a test call to <w class= "DN_out" >Your EP DN</w>
    > Press one to receive a callback 
    >
    > Press one to keep the number which was read back
    >
    > Press one to receive a callback at an extension
    >
    > Enter <w class= "supervisorEXT_out">Your Supervisor Extension</w> and press #.
    >
    > In the agent desktop, go available.
    >
    > When your agent phone rings, answer the call.
    > 
    > Listen to the prompts and enter the Extension shown on the agent desktop.
    >
    > Your Supervisor extension should ring, answer it.
    >
    > ---  




### Coming soon:
#### Making the flow bi-lingual
#### Adding HTTP lookups and agent routing
#### Business Hours








 


















<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	


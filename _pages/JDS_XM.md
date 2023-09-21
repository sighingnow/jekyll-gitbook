---
title: Lab 8 - Feedback and Journey
author: Ankan Dutta & Gagarin Sathiyanarayanan
date: 2022-08-08
layout: post
---
```
Last modified: Tue, 27 Jul 2023
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
  if(document.forms["IVRdeets"][3].value != "Supervisor Extension"){
    localStorage.setItem("supervisorEXT",document.forms["IVRdeets"][3].value)
  }
  }
</script>

## Table of Contents 

| Topic                                                                                    | Lab Type      | Difficulty Level | Estimated length |
| ---------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Customer Journey Data Services Introduction](customer-journey-data-services-introduction) | Watch & Understand | EASY            | 5 min           |
| [Introduction to Experience Management](#Introduction to Experience Management Post Interaction and Post Call Surveys) | Watch & Understand | EASY            | 7 min            |
| [Configure Post Call IVR Survey](#Configure Post Call IVR Survey)| Practical Lab | EASY | 10 min |
| [Configure Post Interaction Digital Survey * Coming Soon *](#Configure Post Interaction Digital Survey) | Practical Lab | EASY | 10 min |



## Overview of the lab:
In this lab...


### Lab Objective

- Configure Entry..

  ---

### Pre-requisites

1.  You have **completed Lab 1 - Admin Experience:**
    -   You are familiar with how to create a new user in Control Hub
2.  You have **completed Lab 2 - IVR Contact Routing:**
    -   You are familiar with creating and modifying flows
3.  You have **completed Lab 3 - Agent Desktop:**
    -   You are familiar with editing and updating desktop layout JSON
4.  You have **Webex Calling installed** in your mobile phone and supervisor created in Lab 1 from which you can make calls to the contact center
  
    ---

### Quick Links

> Control Hub: **[https://admin.webex.com](https://admin.webex.com){:target="\_blank"}**\
> Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\

  ---



### Fill in the form with the details provided and agent email address you created in the previous lab, then click "Update Directions" 
>Please skip the task if you are doing the labs on the Gold Tenant. The task below is only for the Lab Tenant option where you have received an email with the Lab tenant credentials. In a such case, please copy and paste the data from the email into the corresponding fields.
{: .block-tip }
<form id="IVRdeets">
  
  <label for="DN">EP DN you were assigned:</label><br>
  <input type="tel" id="DN" name="DN" onChange="update()"><br>
  
  <label for="attendee">Attendee ID:</label><br>
  <input type="text" id="attendee" name="attendee" onChange="update()"><br>
  
  <label for="agent">Agent Email Address:</label><br>
  <input type="email" id="agent" name="agent" onChange="update()"><br>

  <label for="supervisorEXT">Supervisor Extension:</label><br>
  <input type="number" id="agent" name="supervisorEXT" onChange="update()"><br>
<br>

  <button onclick="update()">Update Directions</button>
</form>

<script>
document.forms["IVRdeets"][0].value = localStorage.getItem("EPDN") || "Your EP DN"
document.forms["IVRdeets"][1].value = localStorage.getItem("attendeeID") || "Your Attendee ID" 
document.forms["IVRdeets"][2].value = localStorage.getItem("agentEmail") || "Agent Email"
document.forms["IVRdeets"][3].value = localStorage.getItem("supervisorEXT") || "Supervisor Extension"
update()
</script>


---
## Introduction

# Introduction to Experience Management Post Interaction and Post Call Surveys
> Flow designer is a simple drag-and-drop user interface (UI) to define the flows. The following video explains the Flow Designer layout, activity library, and terminology used in the Flow Designer.

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/47f262bb-b0a4-4222-9347-db942e21d5e3" width="100%" height="100%" title="Introduction to Flow Designer" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div>


# Customer Journey Data Services Introduction

>Work in progress. ETA is August 2023. 
{: .block-warning }



## Lab Section
# Configure Post Call IVR Survey
# Configure Post Interaction Digital Survey *Coming Soon*  



---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

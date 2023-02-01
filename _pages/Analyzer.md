---
title: Lab 5 - Analyzer Deep Dive
author: Krishna Tyagi & Mike Turnbow & George Kovanis
date: 2022-05-05
layout: post
---

This page is under development

---
---
title: "Lab 5: Analyzer Exercises 1.1 to 1.3"
---

# Webex CC Partner Summit Lab 5: Analyzer Lab

## Exercises 1.1 to 1.3

# Table of Contents
1. [Exercise 1.1: Dashboard reports](#exercise-11-login-to-analyzer-and-review-dashboard-reports)
2. [Exercise 1.2: Analyzer User Interface](#exercise-12-analyzer-user-interface)
3. [Exercise 1.3: Access Control](#exercise-13-access-control)

**Quick Links**

* <a href="https://portal.wxcc-us1.cisco.com/portal" target="_blank">Portal</a>
* <a href="https://analyzer.wxcc-us1.cisco.com/analyzer/home" target="_blank">Analyzer</a>
* <a href="https://desktop.wxcc-us1.cisco.com" target="_blank">Agent Desktop</a>

## Important Lab Note

This lab was created with existing Supervisor Profiles as well as Team designations.  The content may make reference to this or direct the user to use these designations to make changes as part of the learning process and lab goals.  Additionally, there may be previous lab dependencies as some labs will build on the completion of other labs so it is recommended to complete these labs in order.

**Example:** 
- Lab may state to change the Supervisor Profile for your student number.  Supervisor Team 3 for example.  This profile will not exist on your allocated tenant unless you create the profile.

`Resolution` of these designations can be accomplished with some of these suggestions which should be done prior to going through these labs.
- Previous videos specified creating `Team1_TS` and if those were done then supplement the training video with using a team you created earlier.
- If no Supervisor Profile was previously created and no users were designated as a Supervisor, follow the guideline below
	- In Control Hub under Users, ensure that at least one of your users is designated as a Supervisor
	- In WebexCC ensure that a Supervisor Profile is assigned to that user.  You may create your own supervisor profile or use the stock profile in the system.
	- Alternatively if following the video is desired but no supervisors exist, you may be able to change administrator profiles but best case is using a supervisor profile.

### OR
- Ignore or overlook the specific lab instructions as you see fit.  If this option is chosen, it may mean limited success with some labs that may build on the existence of the team and supervisor profiles
- Lab videos are still viable learning regardless of whether your allocated tenant has these configurations


## Lab Objective

This lab is designed to give you basic understanding of Analyzer, user interface features , how execute stock reports and use them to create custom reports per your need. In these videos the `lab goal` is familiarization of the product and terminology. 

We will also be creating two new reports (one for Call and one for agent) to capture relevant information and then will use these reports in a dashboard, while doing this we will learn about capabilities and features you can use to capture the required insights.


## Pre-requisite

1. Admin or supervisor credential with Analytics access in user profile
2. Labs will be more successful once agent data has been created using voice, email and chat.

# Exercise 1.1 Login to Analyzer and Review Dashboard Reports

<iframe width="1024" height="576" src="https://youtube.com/embed/jNi2C12xbbI?rel=0" title="Exercise 1.1 Login to Analyzer and Review Dashboard Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Instructions
1. First `Login to the WxCC portal` using the Portal link above.
2. Login using your provided student email and password.  Emails for this lab are always **admin1podX@email.carehybrid.com** where **X** is your student/pod number.
3. The initial dashboard includes several `Realtime & Historical` reports showing current contact information in the system.
4. Navigate (shown in the video) through the various dashboard reports and the dropdown allowing you to see current information to familiarize yourself with these stock reports.
- Video Checkpoints
> * <a href="https://www.youtube.com/embed/jNi2C12xbbI?start=56" target="_blank">Drop-down Dashboard Views </a>

5. `Navigate back to the Entry Point Site Level Dashboard` and complete some navigation exercises shown in the video
6. `Cross-Launch` from dashboard to a specific dashboard **Entry Point Historical Dashboard**
7. From the Cross-Launched dashboard - `Cross-Launch into Analyzer` to the specific table **Incoming, Short Contacts Entry Point** and follow the instructions to set filters as desired.
> * <a href="https://www.youtube.com/embed/jNi2C12xbbI?start=192" target="_blank">Analyzer Incomming, Short Contacts Entry Point </a> <br>
8. This exercise completed


# Exercise 1.2 Analyzer User Interface
<iframe width="1024" height="576" src="https://www.youtube.com/embed/1T4pWE0meBI?rel=0" title="Exercise 1.2 Analyzer User Interface" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Instructions
1. `Login to the WxCC Analyzer` using the Analyzer link above
2. If already in Analyzer click on the `Home` icon to head back to the start screen of Analyzer
3. `Navigate` around the home screen learning the different features available on this screen
4. Select the `Visualization` icon to navigate to the Visualization repository
> * <a href="https://www.youtube.com/embed/1T4pWE0meBI?start=72" target="_blank">Visualization</a>
5. Use the `Search` box to find specific or groups of reports
6. Type 'agent' in the 'Search' box and see list of 'Visualizations' and 'Folders' matching your string
7. Report information on card <a href="https://www.youtube.com/embed/1T4pWE0meBI?start=166" target="_blank">Timeslot 2:46</a>
8. Set preferred view characteristics <a href="https://www.youtube.com/embed/1T4pWE0meBI?start=220" target="_blank">Timeslot 3:40</a>
9. Identify the required view which allows administrator to identify the most recently modified Visualization report

# Exercise 1.3 Access Control

<iframe width="1024" height="576" src="https://youtube.com/embed/vrNSpaltkIo?rel=0" title="Exercise 1.3 Access Control" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Instructions

- Goals for this lab are to set user restrictions and dashboard views

1. Ensure you are logged into the Admin portal
2. `Open` Analyzer in a new tab to enable you to switch between tasks in Portal and Analyzer
3. Create a folder for yourself with the name `Team_X` where X is your student number
> * <a href="https://www.youtube.com/embed/vrNSpaltkIo?start=64" target="_blank">Create a Folder</a> 
4. In Admin Portal, navigate to `Provisioning - Users`
5. Use the `Search` to find your profile.  You can search for your student number to make it easy. 
6. Check which User Profile is being used by your user. 
> * <a href="https://www.youtube.com/embed/vrNSpaltkIo?start=103" target="_blank">Find User Profile</a>
> * NOTE: You will be editing your Supervisor Team Profile.  Search for `Supervisor Team X` where X is your student number.
8. Edit your user profile by navigating to `User Profiles` and select the ellipsis menu next to that profile, then click Edit
9. In your user profile, navigate to `Access Rights`
10. Set the appropriate access rights to the folders as outlined in the video
11. Set the appropriate Entry Point access for this user profile as well
12. **Save your work**
13. Navigate back to the `Portal Dashboard` to view the change on the dashboard
14. Navigate to Analyzer and refresh if needed then check the `Visualizations` to make sure the folders you do not want to see are gone
15. Congratulations on finishing `Lab 1 Exercises`.  This exercise was high level to reinforce Analyzer concepts.

## Next Lab is Lab 2: Stock Reports
> * [Lab 5: Analyzer Exercises 2](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/analyzerlab2.html)

[Back to top](#webex-cc-partner-summit-lab5-analyzer-lab)

<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

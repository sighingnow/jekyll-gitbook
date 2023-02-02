---
title: "Lab 6: Analyzer Exercises 3.1 to 3.3"
---

# Webex CC Partner Summit Lab 6: Analyzer Lab

## Exercises 3.1, 3.2 and 3.3

# Table of Contents
1. [Exercise 3.1 - Create Realtime Contact Report](#exercise-31---create-realtime-contact-report)
2. [Exercise 3.2 - Create Realtime Agent Report](#exercise-32---create-realtime-agent-report)
3. [Exercise 3.3 - Create Chat Reports with Interval](#exercise-33---create-chat-reports-with-interval)

**Quick Links**

* <a href="https://portal.wxcc-us1.cisco.com/portal" target="_blank">Portal</a>
* <a href="https://analyzer.wxcc-us1.cisco.com/analyzer/home" target="_blank">Analyzer</a>
* <a href="https://desktop.wxcc-us1.cisco.com" target="_blank">Agent Desktop</a>

## Lab Objective

This lab is designed to dig deeper into Analyzer and rather than copying and editing stock reports, the attendee will create new and custom reports.  These reports will be used in subsequent labs to build upon as well so it is important to finish this lab prior to moving on to the next lab.

## Pre-requisite

1. All previous labs completed is advisable
2. Admin or supervisor credential with Analytics access in user profile
3. Make sure to make few test calls and answered by the agent the day you attempting this lab (to ensure we have some data to analyze)


# Exercise 3.1 - Create Realtime Contact Report  


<iframe width="1024" height="576" src="https://youtube.com/embed/-N8PtiDL6Kg?rel=0" title="Analyzer Videos" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Instructions**
- Set User Profile back to All Entry Points
- Create a new visualization for Realtime Contacts

1. Before starting the lab exercise, navigate to the user profile and return your user access for Entry Points to `All` if you had restricted to selected Entry Points in earlier labs
2. Navigate to Analyzer and `Create` a new report visualization that will be saved in your personal directory.
> * [Create New Visualization](https://www.youtube.com/embed/-N8PtiDL6Kg?start=101)
3. This will be a Realtime report so select the appropriate value under `Compute` on the left side of the screen
4. Follow the video instructions to add the `14` values to the report
5. `Save` The new report to your directory as `3.1_CSR_Contacts`
6. This completes your first custom report

# Exercise 3.2 - Create Realtime Agent Report


<iframe width="1024" height="576" src="https://youtube.com/embed/J7vWAftcGn8?rel=0" title="Exercise 2.1 Execute Stock Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Instructions**
- Create a new AAR Agent Activity Realtime Report (NOTE: You probably only see telephony channel type report since earlier sections cover telephony only)

1. Create a new visualization in Analyzer as an `Agent Activity Record`
2. Set this report as a Realtime Report with a Snapshot refresh rate of 3 seconds
3. Follow the video guide to add the reporting element columns 
> * [Add New Column Data](https://www.youtube.com/embed/J7vWAftcGn8?start=88)
4. Once done, `Save` the new report as `3.2_AAR_AgentState`
5. `Review` the report by doing a preview and if all is good, this exercise is complete 
6. Move to the next and last exercise


# Exercise 3.3 - Create Chat Reports with Interval


<iframe width="1024" height="576" src="https://youtube.com/embed/_fkY1FKvH-0?rel=0" title="Exercise 2.1 Execute Stock Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


**Instructions**
- Create a new `Chart View` historical report for Total Calls and Abandoned Calls

1. Create a new visualization using CSR report data. `CSR is Customer Session Record`
2. Set this as a `Monthly` report
3. Follow the instructions in the video to complete the fields.  There are two fields to be added to this report:
3.1.  Select 'Contact Session ID' and select 'Count of Contact Session ID' to represent total calls. Rename header as "Total Calls'
3.2 Select 'Contact Session ID' again and select 'Count of Contact Session ID' but this time add 'Termination Type' as filter and equal to 'abandoned' to capture total abandon calls`. Note you may need to type in 'abandoned' in the Field parameter if its not found in teh drop-down menu. Rename header as "Abandon Calls'
4. Change 'Output Type' to 'Line Chart`
5. When done, save this chart as `3.3_CSR_ContactVolume`
6. This section is done.  When complete, move to Lab exercises 5.

## Next Lab is Lab 6: Analyzer Exercises 4: Advanced Insights
> * [Lab 6: Analyzer Exercises 4](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/analyzerlab4.html)

[Back to top](#webex-cc-partner-summit-lab5-analyzer-lab)

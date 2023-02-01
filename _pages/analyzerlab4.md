---
title: "Lab 6: Analyzer Exercises 4.1 to 4.2"
---

# Webex CC Partner Summit Lab 6: Analyzer Lab
## Exercises 4.1 and 4.2


# Table of Contents
1. [Exercise 4.1: Using Formula and Filter](#exercise-41-using-formulas-and-filters)
2. [Exercise 4.2: Enhanced Field Compound Visualization and Drill-down](#exercise-42-enhanced-field-compound-visualization-and-drill-down)

**Quick Links**

* <a href="https://portal.wxcc-us1.cisco.com/portal" target="_blank">Portal</a>
* <a href="https://analyzer.wxcc-us1.cisco.com/analyzer/home" target="_blank">Analyzer</a>
* <a href="https://desktop.wxcc-us1.cisco.com" target="_blank">Agent Desktop</a>


## Lab Objective

This lab is designed to build upon previous labs where custom reports were created and saved.  Those reports will be used in this lab to further get simple, useful and actionable data insights.  In this lab we will explore `Enhanced Fields`, `Heat Map view`, `Compound Visualizations`, and `Drill-down`

### Pre-requisite

1. All previous labs completed
2. Admin or supervisor credential with Analytics access in user profile
3. Make sure to make few test calls and answered by the agent the day you attempting this lab (to ensure we have some data to analyze)


# Exercise 4.1 Using Formulas and Filters

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/3dB4XrZk384?rel=0" title="WxCC Lab #6 Part 4.1: Using Formulas and Filters" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Instructions
- Create a Queue Performance Report
- Add report values like number of connected calls for a queue, number of calls waiting in queue and longest duration for calls in queue or connected
## NOTE:
There are some changes required (compared to what's presented in the video) to build the Queue Performance Report:
a. You have to use Customer Activity Record (CAR) depository instead of Customer Session Record (CSR); and
b. You have to use Activity Start Timestamp instead of Realtime Contact Timestamp to create the Formula

Steps 1 to 14 are updated with latest instructions. Please ignore steps provided in video
1. Create a CAR report and set it as a Realtime report with a refresh set to 3 seconds
2. On the Row Segment select Queue Name.
3. Drag Contact Session ID to Profile Variables and set a `filter` here for calls that are connected. If you cannot find 'connected' option in the drop-down menu, type 'connected' under Field
4. Drag Contact Session ID to Profile Variables and set a `filter` here for calls that are parked. If you cannot find 'parked' option in the drop-down menu, type 'parked' under Field
5. Drag Activity Start Timestamp to `Profile Variables` and set for the `Minimum Value of`
6. Right click and `create a new formula` on the Activity Start Timestamp
7. The new formula should be named LongestDuration and the expression should be `Current Timestamp` - `Minimum Activity Start Timestamp`
8. Hide the Minimum Activity Start Timestamp created in step 5
9. On the `left` column, add a filter and use "Activity State'
10. In the filter under the `Fields` section, set the "Activity State' to 'park' and 'connected' to display only these activity states in the report
11. Set any columns that require timestamps with the appropriate formatting
12. Save the report as `4.1_CSR_QueueStatus`
13. Be sure to save the LongestDuration as a global variable
14. Make some test calls to validate your report

15. `Next` we will be opening a newly created report from Lab 3 - 3.2_AAR_AgentState 
> * <a href="https://youtube.com/embed/U2I5rw7sELU?start=476" target="_blank">Start at timestamp</a>
16. Use the global filter created in the previous report to filter your team in this report
17. `Save` this new report as `4.1.2_AAR_AgentState`
18. `Next` Edit the newly created report in Lab 3 named `3.1_CSR_Contacts` 
> * <a href="https://youtube.com/embed/U2I5rw7sELU?start=545" target="_blank">Start at timestamp</a>
20. `Add a Filter` using Final Queue Name and set a Regular Expression since all telephony queues starts with 'QV'
  - Use the expression `QV_+` as the wildcard.  
  - Refer <a href="https://regex101.com/" target="_blank">REGEX</a> to learn and test your regular expressions 
21. `Save` the expression then choose `Save as` and call this new report `4.1.3_CSR_Contacts'
22. This completes this lab.  Please proceed to the next lab below.


# Exercise 4.2 Enhanced Field Compound Visualization and Drill-down

<iframe width="1024" height="576" src="https://youtube.com/embed/47j7YKu7f7I?rel=0" title="Exercise 4.2 Enhanced Field Compound Visualization and Drill-down" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Instructions
Getting simple, actionable data insights from your reports using:
- Enhanced Fields, and making it a global Enhance Fields for future reuse
- Heat Map View
- Customized Drill-downs
- Compound Visualizations via modules within the same report for comparison

Outcome reports in this lab will be
- 4.2.1_CSR_QueueStatus
- 4.2.2_CSR_ContactVolume

NOTE: To execute this lab, you will need to have some realtime sessions running on telephony (with consult), email, chat and social channels

1. Begin by running a previously created report named `4.1.1_CSR_QueueStatus` to review the report information
> * <a href="https://youtube.com/embed/47j7YKu7f7I?start=84" target="_blank">Start at timestamp</a>
2. Edit the report to add reporting functionality 
3. On the `Final Queue Name` block, right click and select 'Create Enhanced Field' to create a new `Channel Group` as listed in the video and `Save` the enhancement

![NewEnhancment4 2 1](https://user-images.githubusercontent.com/75790934/113614055-9b5e6100-9617-11eb-96ed-fab3526f5899.png)

4. `Save` the report and realign the sequence as shown in the video
5. `Preview` the report to view the changes.  You should see a new Chat Group for your chat channels
6. `Delete` Final Queue Name from the Row Segments and `Save` once again previewing the results
7. On the report view, click on the ChatGroup - Connected box and see that an icon will appear to `drill down` into those values.  `Click it`
8. Back in the editor, select a `Heat Map` view for this table then `Save` and view or refresh your report view
9. Click on the `ChannelGroup` created and save it to create a new Global Filter
10. `Rename and Save` this report to `4.2.1_CSR_QueueStatus`
11. Run the recently created report named `4.1.3_CSR_Contacts` to view what changes may be needed
> * <a href="https://youtube.com/embed/47j7YKu7f7I?start=487" target="_blank">Start at timestamp</a>
12. Use the `Drill-down` functionality on a `Contact Session ID` block in the report
13. Choose a call that was transferred by looking for a `consult`
> * If this doesn't exist, you may decide to create some consult transfer calls
15. Watching the video, as specified, click on the Agent Name option under fields.  This takes you to the first agent name.
16. Click on the Field called 'Second Agent Name' to see who this call was consult transferred to
17. Experiment with Drill-down and export or open in a new tab
18. `Next` Time to jump to the next and last part of this exercise
> * <a href="https://youtube.com/embed/47j7YKu7f7I?start=637" target="_blank">Start at timestamp</a>
19. This part of the exercise will show `Enhanced Field Compound Visualization Drill-down`
20. `Edit` the report `3.3_CSR_ContactVolume` and follow the video to make the needed changes
  * Output Type - Table
  * Compute - None
  * Add Row Segment - Entrypoint Name
21. `Rename` the current Module1 as `Monthly`
22. Add another module and name it `Weekly` and set the interval to Weekly
23. Remove the extra Module as shown in the video
24. `Save as` on this report as `4.2.2_CSR_ContactVolume`
25. This completes all the requirements of this exercise


## Next Lab is Lab 6: Analyzer Exercises 5
> * [Lab 6: Analyzer Exercises 5](https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/analyzerlab5.html)

[Back to top](#webex-cc-partner-summit-lab5-analyzer-lab)

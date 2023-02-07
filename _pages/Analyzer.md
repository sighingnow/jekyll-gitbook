---
title: Lab 5 - Analyzer Deep Dive
author: Krishna Tyagi & Mike Turnbow & George Kovanis
date: 2022-05-05
layout: post
---


| **[Lab 1](#lab-1-table-of-contents)** | **[Lab 2](#lab-2-table-of-contents)** | **[Lab 3](#lab-3-table-of-contents)** | **[Lab 4](#lab-4-table-of-contents)** | **[Lab 5](#lab-5-table-of-contents)** |
|---|---|---|---|---|
| [Exercise 1.1: Dashboard reports](#exercise-11-login-to-analyzer-and-review-dashboard-reports) | [Exercise 2.1: Execute Stock Reports](#exercise-21---execute-stock-reports) | [Exercise 3.1 - Create Realtime Contact Report](#exercise-31---create-realtime-contact-report) | [Exercise 4.1: Using Formula and Filter](#exercise-41-using-formulas-and-filters) | [Exercise 5.1: Stock Dashboards](#exercise-51-stock-dashboards) |
| [Exercise 1.2: Analyzer User Interface](#exercise-12-analyzer-user-interface) | [Exercise 2.2: Create Custom Reports using Stock Reports](#exercise-22---create-custom-report-using-stock-reports) | [Exercise 3.2 - Create Realtime Agent Report](#exercise-32---create-realtime-agent-report) | [Exercise 4.2: Enhanced Field Compound Visualization and Drill-down](#exercise-42-enhanced-field-compound-visualization-and-drill-down) | [Exercise 5.2: Custom Dashboards](#exercise-52-custom-dashboards) |
| [Exercise 1.3: Access Control](#exercise-13-access-control) |  | [Exercise 3.3 - Create Chat Reports with Interval](#exercise-33---create-chat-reports-with-interval) |  |  |

# Webex CC Partner Summit Lab 5: Analyzer Lab

# Lab 1 Analyzer Exercises

## Exercises 1.1 to 1.3

# Lab 1 Table of Contents
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

# Lab 2: Stock Reports

## Exercises 2.1 and 2.2

# Lab 2 Table of Contents
1. [Exercise 2.1: Execute Stock Reports](#exercise-21---execute-stock-reports)
2. [Exercise 2.2: Create Custom Reports using Stock Reports](#exercise-22---create-custom-report-using-stock-reports)

**Quick Links**

* <a href="https://portal.wxcc-us1.cisco.com/portal" target="_blank">Portal</a>
* <a href="https://analyzer.wxcc-us1.cisco.com/analyzer/home" target="_blank">Analyzer</a>
* <a href="https://desktop.wxcc-us1.cisco.com" target="_blank">Agent Desktop</a>

## Lab Objective

This lab is designed to give you basic understanding of Analyzer, user interface features , how execute stock reports and use them to create custom reports per your need. In these videos the `lab goal` is familiarization of the product and terminology. 

We will also be creating two new reports (one for Call and one for agent) to capture relevent information and then will use these reports in a dashboard, while doing this we will learns about capabilities and features you can use to capture the required insights.


## Pre-requisite

1. All previous labs completed
2. Admin or supervisor credential with Analytics access in user profile
3. Make sure to make few test calls and answered by the agent the day you attempting this lab (to ensure we have some data to analyze)


# Exercise 2.1 - Execute Stock Reports

<iframe width="1024" height="576" src="https://youtube.com/embed/r58kwjR3xRY?rel=0" title="Exercise 2.1 Execute Stock Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Instructions**
- Run various stock reports
- Copy stock reports and edit to suit your reporting needs
- Exporting reports

1. In this lab, start in Analyzer.  If you are not in Analyzer, please navigate to the Analyzer home page
2. Go to `Home --> Visualization`
3. Use the search option and search for `contact` finding the `Contact Details in Queue` report
4. Run the report by either `double click` or using the elipsis menu and choosing `Run`
5. Review the report information and click on the `hamburger` or expand option at the top left to see `Data Summary` and `Details` about the report
6. Click on the `Details` tab for the report and review the various report configuration objects
7. Click on the `Settings` button and test the various options outlined in the video like hiding columns or copying data elements.  Direct link to this part of the video below.
> * [Test Stock Report Options](https://www.youtube.com/embed/r58kwjR3xRY?start=139)
8. Run the report in the `Tenant Time Zone`. Timezone can be changed at Analyzer home page
9. Review the Analyzer URL for the report which shows the Tenant ID (tid) and Report ID (rid). The tenant ID is unique to every tenant and very useful for troubleshooting or back end change requests.
10. This concludes the first lab in Exercise Section 2

# Exercise 2.2 - Create Custom Report using Stock Reports 

<iframe width="1024" height="576" src="https://youtube.com/embed/pG4lcs5vVJs?rel=0" title="Exercise 2.2 Create Custom Report using Stock Reports" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Instructions**
- Copy a stock report to create a new custom report
- Create a new report to show the team performance for yesterday

1. Using the search option, search for the word `team` and review the listed reports to find the best report to build from
2. Find the `Team Details` Report and run it
3. Review the information captured in the stock report using the ellipsis menu to view details about the report.  This will help you determine if this report will work to suit your needs
4. Create a copy of this report and save it into your `Team Folder`
5. Following the video instructions, make the recommended changes to the new report.
> * [Make Changes to Team Details Direct Link](https://www.youtube.com/embed/pG4lcs5vVJs?start=153)
6. Follow the video guide to make changes as suggested. `Note that in this report you may make any changes you wish since no future labs will use this report`  However, don't take too much time here if falling behind on time.
7. `Save as` on this report into your Team folder
8. Change the filter to ensure that no other team data is being shown on your report if needed.
> * [Add a Filter](https://www.youtube.com/embed/pG4lcs5vVJs?start=259)
9. Customize the field sizes by reducing the field header names as shown in the video to fit all columns within your display if possible
10. Congratulations.  This completes Lab 2.  Proceed to Lab 3.

# Lab 3 Realtime Report Exercises

## Exercises 3.1, 3.2 and 3.3

# Lab 3 Table of Contents
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

# Lab 4 Advanced Insights

## Exercises 4.1 and 4.2


# Lab 4 Table of Contents
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

# Lab 5 Dashboards

## Exercises 5.1 and 5.2


# Lab 5 Table of Contents
1. [Exercise 5.1: Stock Dashboards](#exercise-51-stock-dashboards)
2. [Exercise 5.2: Custom Dashboards](#exercise-52-custom-dashboards)

**Quick Links**

* <a href="https://portal.wxcc-us1.cisco.com/portal" target="_blank">Portal</a>
* <a href="https://analyzer.wxcc-us1.cisco.com/analyzer/home" target="_blank">Analyzer</a>
* <a href="https://desktop.wxcc-us1.cisco.com" target="_blank">Agent Desktop</a>


## Lab Objective

This lab is designed to introduce you to the dashboards available in Analyzer.  Dashboards are available for Historical, Realtime and Business Metrics.  

### Pre-requisite

1. All previous labs completed is advisable but not required
2. Admin or supervisor credential with Analytics access in user profile
3. Make sure to make few test calls and answered by the agent the day you attempting this lab (to ensure we have some data to analyze)

NOTE: You may not see report outputs as shown in the videos which has some channel sessions running in the background

# Exercise 5.1 Stock Dashboards

<iframe width="1024" height="576" src="https://youtube.com/embed/vfMlNmVZcQM?rel=0" title="Webex CC Partner Summit Lab 6: Analyzer Lab 5.1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Instructions
- Navigate some stock dashboards
- Create a dashboard from a stock dashboard

1. Navigate the Analyzer directory structure and discover the `Dashboards` directory
2. Dashboards are categorized under the following types.  Historical, Realtime and Business Metrics.

![dashboards](https://user-images.githubusercontent.com/75790934/113645373-60c2eb80-964c-11eb-939f-fbbcbcb71608.png)

3. Under Business Metrics, run the `Abandoned Contacts` dashboard.  
4. Under this dashboard there are several different types of data reports.  Take some time to familiarize yourself with them.
5. Expand the `Customer Journey` dashboard and familiarize yourself with how this report makes use of mouse overs to track the different abandoned contacts
6. Navigate back to the main dashboard directory and open a dashboard named `Contact Volume Historical Dashboard` under the Multimedia directory.
> * <a href="https://youtube.com/embed/vfMlNmVZcQM?start=201" target="_blank">Start at timestamp</a>
7. Create a copy of this dashboard and edit to make some changes
8. Remove the `Contact Volume` dashboard component
9. Find the report created in Lab 4.2 called `4.2.1_CSR_QueueStatus` and drag that into the dashboard
10. Save this report as `5.1_Contact_Volume_Queue_Dashboard` and run it
11. This concludes this section.  Onto the next.

# Exercise 5.2 Custom Dashboards

<iframe width="1024" height="576" src="https://youtube.com/embed/wCgzv58mKTs?rel=0" title="Webex CC Partner Summit Lab 6: Analyzer Lab 5.2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Instructions
- Create a custom dashboard called 5.2.1_NewReportDashboard
- Create a custom dashboard using previous lab reports named in video 5.2.2_CL21HOLCCT2108Dashboard

1. Navigate to the Dashboards section of Analyzer and `Create New` Dashboard
2. Drag dashboards according to the video instruction to the work canvas and position to your liking
3. When dashboard components have been arranged, you should have something similar to this

![custom dashboard](https://user-images.githubusercontent.com/75790934/113778075-92da5900-96f1-11eb-9b05-3a5f86d24920.png)

4. Save this report as `5.2.1_NewReportDashboard` under your team folder
5. Run the report and notice that you can make changes to widget sizes but this will not save to the template
6. Edit the new dashboard and make any sizing changes and save to see those changes every time
7. Create a `new dashboard` for the next exercise
> * <a href="https://youtube.com/embed/wCgzv58mKTs?start=179" target="_blank">Start at timestamp</a>
8. In this new dashboard you will be using several of the reports created earlier in this lab
  - 4.2.1_CSR_QueueStatus
  - 3.2_AAR_AgentState
  - 3.3_CSR_ContactVolume
  - 3.1_CSR_Contacts

![5-2customdashboard](https://user-images.githubusercontent.com/75790934/113779194-f3b66100-96f2-11eb-8a22-21c1bf94b1a5.png)

9. Video saves this report as `5.2.2_CL21HOLCCT2108Dashboard` but you can save it as you wish.  It will not impact any other exercises.
10. Explore some options to edit and personalize this new dashboard like changing background colors

**Congratulations!  **All Analyzer labs are now complete!**

[Back to top](#webex-cc-partner-summit-lab5-analyzer-lab)

---

### Congratulations, you have compleated all Lab tasks! 
### We would like to keep track of your progress and make sure that we are giving you effective support. Please take approximately one minute to complete the short survey.


<script>
function mainPage() {window.location.href = "https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/HomePage.html";}
function nextLab() 
 {
 window.open("https://app.smartsheet.com/b/form/42c2c1f4e71940088ad0ea8053ac3006", '_blank');
 window.location.href = "https://wxcctechsummit.github.io/wxcclabguides/TechSummitRoW_2021/WxM.html";
 }
</script>

<div id="button-row">
	<button onclick="mainPage()" style="
  border-radius: 5px;
  background-color: rgb(116,191,75);
  padding: 10px;">Go back to Main Page</button>

<button onclick="nextLab()" style="
  position: absolute;
  right: 200px;
  border-radius: 5px;
  background-color: rgb(116,191,75);
  padding: 10px;">Take Survey and Go to Lab 7</button>

</div>

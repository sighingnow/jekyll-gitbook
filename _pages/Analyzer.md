---
title: Lab 5 - Analyzer Deep Dive
author: Krishna Tyagi & Mike Turnbow & George Kovanis
date: 2023-02-13
layout: post
---

## Table of Contents

| Topic                                                                                                           | Lab Type      | Dificulty Level | Estimated length |
| --------------------------------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Admin Portal Dashboard and Analyzer User Interfaces](#admin-portal-dashboard-and-analyzer-user-interfaces)     | Practical Lab | EASY            | 20 min           |
| [Getting Data Insight using Stock Visualizations](#getting-data-insight-using-stock-visualizations)             | Practical Lab | EASY            | 20 min           |
| [Understanding Data and Creating Custom Visualizations](#understanding-data-and-creating-custom-visualizations) | Practical Lab | MEDIUM          | 45 min           |
| [Dashboards](#dashboards)                                                                                       | Practical Lab | EASY            | 15 min           |
| [New Data Insights](#new-data-insights)                                                                         | Practical Lab | HARD            | 60 min           |
| [Agent Data Insights](#management-portal-user-configuration)                                                    | Practical Lab | EASY            | 10 min           |
| [Supplementary Data Capabilities](#supplementary-data-capabilities)                                             | Practical Lab | EASY            | 15 min           |
| [Using Data APIs](#using-data-apis)                                                                             | Practical Lab | MEDIUM          | 15 min           |

## Overview of the Lab

This hands-on Lab will provide you foundational and advanced knowledge of Webex Contact Center Data and Analytics, you will learn about data points and metrics across various existing and new capabilities, you will learn how to use stock reports and dashboards.

This session will guide you step-by-step on how to design and build analytic Visualizations and Dashboards to capture your business & operational KPIs and Actionable Insights.

You will also learn about new capabilities developed around the new cloud Data platform. Across the sessions, you will get useful tips and tricks to reap the full benefits of the solution and how easily you can mine your data for key insights.

## Introduction

### Pre-requisites

- TODO

### Quick Links

> Admin Portal: **[https://portal.wxcc-us1.cisco.com/](https://portal.wxcc-us1.cisco.com/){:target="\_blank"}**\
> Agent Desktop: **[https://desktop.wxcc-us1.cisco.com](https://desktop.wxcc-us1.cisco.com){:target="\_blank"}**\
> Analyzer: **[https://analyzer-v2.wxcc-eu1.cisco.com/analyzer/home](https://analyzer-v2.wxcc-eu1.cisco.com/analyzer/home){:target="\_blank"}**

# Admin Portal Dashboard and Analyzer User Interfaces

This lab is designed to give you basic understanding of Analyzer, user interface features, access controls and permissions as well as the default dashboards available in the Admin Portal. In the following exercises, the goal is the familiarization with the product, interfaces and terminology.

## Table of Contents

| Topic                                                 | Lab Type      | Dificulty Level | Estimated length |
| ----------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Portal Dashboards](#1-portal-dashboards)             | Practical Lab | EASY            | 10 min           |
| [Analyzer User Interface](#2-analyzer-user-interface) | Practical Lab | EASY            | 5 min            |
| [Access Control](#3-access-control)                   | Practical Lab | EASY            | 5 min            |

## 1. Portal Dashboards

1. Login to the `Webex CC Administration Portal` using the Portal link. Login using your provided student email and password.

2. Navigate through the various dashboards via the dropdown to see current tenant information and to familiarize yourself with the four different dashboard views.

3. Search through all the dashboards to find following information:

   - Contacts in Queue
   - Total Contacts Handled
   - Longest Contact Currently in Queue (Realtime)
   - Agent State Data (Listing all logged-in agents with their current state)
   - "Team Details Real-Time" from `Contact Centre Overview - Realtime` Dashboard

4. Return to the `Entry Point - Site Level Dashboard` and complete some navigation exercises:
   - In `Site Interval Realtime - Chart` report, filter calls for **Inbound Connected Count** (by clicking on profile variable next to the gear icon)
   - Click on ![Expand](/assets/images/Analyzer/Expand.png) to open `Entry Point Contact Volume – Chart` report in a separate window.
   - Try the **Duration** filter on top right.
   - Open `Incoming, Short Contacts - Entry Point` report in separate browser tab and **export** the Data as **_Excel_**.

## 2. Analyzer User Interface

1. **Login** to the `Webex CC Analyzer` using the Analyzer link above or cross-launch from the Administration portal by clicking on `Reporting and Analytics`.

2. Navigate around the home screen learning the different features available on this screen.

3. Click on the `Visualizations` tab on the left.

4. On the top in `Search` field, search for key word like **agent**:

   - Click on `Agent Realtime` report and note down the path for this report.
   - Searched items can be further filtered to show Visualizations or Folders from the “Show” dropdown menu.

5. Then, navigate to the path `Stock Reports > Real-Time Reports > Agent Reports > Interval Reports`.

   - Click ![Grid](/assets/images/Analyzer/grid.png) to change the view to List view.
   - Here you can sort the reports based on a specific header by clicking on it.
   - Notice the `Temporal Scope`, which can be either Realtime or Historical.
   - ID is <ins>unique</ins> for every report and a report can also be searched by its ID.

6. Click ![Dots](/assets/images/Analyzer/dots.png) the icon next to the report and then click on Details.

   - Make a note of the `Date Range` and `Scheduled Jobs`.
   - Try the same for any Historical stock report.

7. On the top, click on your **username** and then `Help` to open the help manual for Analyzer.

   - This provides you with an online version of the [Analyzer User Guide](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/Analyzer_2/b_analyzeronloinehelp/_b_analyzeronloinehelp_chapter_01.html), a great document that provides information about <ins>all the available stock reports, variables as well as functionalities of Analyzer.</ins>

8. Click on `Threshold Alerts` next to the username. Check if there are any active alerts.

9. Click on `Tenant Time zone` option on the header. Set it to the time-zone in which you want to Run Visualizations (Tenant or Browser).

## 3. Access Control

The goal of this exercise is to review the access controls and permissions you can apply for Analyzer reporting.

1. Ensure you are logged into the Admin portal.

2. Open Analyzer in a new tab to enable you to switch between tasks in Portal and Analyzer.

3. You would notice two folders: `Admin` and `Stock` Reports.

4. Create a folder for yourself under Visualisations with the name `Team_X`, where X is your student number. TODO

5. In Admin Portal, navigate on the left to `Provisioning -> Users`. Use the Search bar to find your user. You can search for your student number to make it easy. Check which `User Profile` is being used by your user.

6. Edit your User profile by navigating to `User Profiles` and selecting the ellipsis menu next to that profile, then click `Edit`. Then, in your User Profile, navigate to `Access Rights`.
   - Set all folders except yours to “None”.

**_Note: Stock Folder cannot be modified and is visible to all._**

1. `Save` the User profile.

2. **Logout** from the Administrator portal, **close** the Browser and login back with your student user.

3. Go Back to the `Analyzer -> Visualizations` and check if the applied folder restrictions are visible. You should be able to see only the Stock Reports and your own folder.

You can always consult the [Analyzer User Guide Access Control](https://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cust_contact/contact_center/webexcc/Analyzer_2/b_analyzeronloinehelp/_b_analyzeronloinehelp_chapter_01.html#topic_38C3FADD09C46F7A0073A1F4452D23F2) chapter on complete information on permissions and access control for each type of user.

# Getting Data Insight using Stock Visualizations

This lab is designed to give you a basic understanding on stock visualizations, how to execute them and how to use them to create custom visualizations as per your business requirements.

<ins>Reports created in this lab will be used in later labs to create a custom dashboard.</ins>

## Table of Contents

| Topic                                                                                                               | Lab Type      | Dificulty Level | Estimated length |
| ------------------------------------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Execute Stock Reports](#1-execute-stock-reports)                                                                   | Practical Lab | EASY            | 5 min            |
| [Execute CCX Transition Reports](#2-execute-ccx-transition-reports)                                                 | Practical Lab | EASY            | 5 min            |
| [Create Custom Visualization using Stock Visualizations](#3-create-custom-visualization-using-stock-visualizations) | Practical Lab | EASY            | 5 min            |

## 1. Execute Stock Reports

1. Go to `Visualizations`. Navigate to `Stock Reports` folder.

2. Review the below Stock report structure.

![StockStructure](/assets/images/Analyzer/StockStructure.png)

3. Search for and execute the `Agent Details` report.

4. Update the `Filters` to show data for `Today` and at `Hourly` interval.

5. Click on the hamburger menu to check the `Data summary` and `Details`. Review the following information:

   - Records found
   - Time to compute
   - Number of Rows and Columns
   - Report Duration and Interval

6. Click on the `Settings` button. The Row segments and report variables are now visible.

7. Drag all `Row segments` fields except Agent name and Interval to the `Hidden Segments` section.

8. Also, by Clicking the Eye ![eye](/assets/images/Analyzer/eye.png) symbol, hide the `Initial Log In Time` and `Final Log Out Time` fields.

9. Now, click again the `Settings` to hide Row and Profile variables.

10. Go to the **Table Summary** on the bottom and review the summary results of each column.

11. Review the Analyzer URL for the report which shows the `tid` which is the **Tenant ID** and `rid` which is the **report ID**. <ins>The tenant ID is unique to every tenant</ins>. The report ID allows you to also search in the search box for visualization using the ID for that visualization.
    For example, searching –100 will bring up the Agent Details Report.

12. Search through the stock reports and find below information:
    1. Historical Agent Details with Staff hours information
    2. Agent Idle state information
    3. Realtime Queue Statistics
    4. Agent Usage Report
    5. Average service level in Card format

**_Tips:_**

1. **_Look in the Stock folder structure to find the type of reports that possibly contain the requested information._**
2. **_Use search functionality with keywords used in the requested data._**

## 2. Execute CCX Transition Reports

For customers migrating from CCX over to Contact Center, Cisco has provided <ins>nine historical stock reports</ins> that have the same look and feel as CCX reports. This provides those customers with the most common CCX reports in Webex CC as prebuilt reports.

1. From the Analyzer portal, go to `Stock Reports -> Transition Reports`.

2. All 9 of these reports can be run, copied to be edited or scheduled just like any other historical report.

3. Execute the `CSQ All Fields Report`. Take note that `CSQ All Fields` is a common CCX report. This stock report mirrors the same column headers contained in the CCX report. Rather than name this report simply a Queue Report, we have used the CCX terminology for queues as well as to map the same fields into the report and make the transition smoother.

## 3. Create Custom Visualization using Stock Visualizations

In this exercise we will copy a stock report to create a new custom report. The new report will show the Team Performance from yesterday. As a supervisor, you will be able to use the report to view:

- Team Name
- Agent name
- Login and logout time
- Total contacts handled

**Objective** is to create a report to see the following Queue level data insights:

- % Service Level
- % Abandoned Calls
- Number of Total Calls
- ASA (Average Speed of Answer)
- Telephony only Contacts

**_Tips:_**

<ins>How to search for the right report to match your requirements?</ins> Three Ways:

1. Go into the `Stock Report Directory` structure and look for something similar, e.g. we are looking for a `Historical -> Multimedia Report`.
2. Search for keywords matching your desired report data, e.g. search for `Service level`.
3. Search in the `Analyzer User Guide` for the data point and identify the report.

`Queue Service Level` report comes as a result in all three ways and seems to be covering what we are looking for, so execute that report and validate the data.

1. Identify what needs to be changed to meet the requirements.

- `Duration` needs to be updated to **Yesterday**.
- Few field name headers need to be renamed.
- `Channel Type` need to be set to **Telephony**.
- If it can be compacted in view.
- `Not-required` fields to be **removed**.
- `% Abandoned` is missing in this report (needs to be added).

2. Create a copy of this report by clicking on the `dots` icon and `Create a Copy`.

3. Complete below changes:

   - Update the `Start Time` to **Today** and `Interval` as **None**.
   - Right click on the `Channel type` and add a filter for **Telephony**.
     <ins>Filters are a very powerful tool that allows us to only extract the data that meet specific criteria. They can be applied on a variable on a report level. In this case, we make sure to only account for the calls that have their Channel Type marked as "telephony".</ins>
   - Since we created a filter to only show telephony Channel, we can `remove Channel Type` from the Row segment as it is redundant. <ins>Filter has been applied on a report level from the previous step.</ins>
   - Right click on the field `In Service Level%`. Click `Edit` and update the name as `%ServiceLevel`.
   - Hide unnecessary fields by clicking on `Eye` symbol on the `Profile Variables`.
   - Notice that `% Abandoned field` is there in the report, but it’s hidden. `Unhide` it.

4. You can already see a preview of the report in `Edit` mode. Scroll through it to see if it meets what we are looking for.

5. If yes, click `Save As`. Name report as `2.3_Queue Service Level`. Select your folder and click `OK`.

6. Click `Preview`.

7. Notice that some Fields are taking too much width like `Avg Speed Of Answer`.

8. `Double click` the column lines. This will adjust the width of each column to the size of the values. Any change on the column width is stored and remains on the report even after refresh. You can also adjust the width manually by clicking on the column line and dragging left or right to resize it.

# Understanding Data and Creating Custom Visualizations

![DataRepos](/assets/images/Analyzer/DataRepos.png)

## Table of Contents

| Topic                                                                                   | Lab Type      | Dificulty Level | Estimated length |
| --------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Understanding the Data](#1-understanding-the-data)                                     | Practical Lab | EASY            | 5 min            |
| [Create Realtime Agent Visualization](#2-create-realtime-agent-visualization)           | Practical Lab | EASY            | 5 min            |
| [Create Chart Visualization with Interval](#3-create-chart-visualization-with-interval) | Practical Lab | EASY            | 5 min            |

## 1. Understanding the Data

In this exercise, you will spend some time understanding the Webex Contact Center Data and schema in which data is stored.

1. Navigate to Analyzer and click on Create New and select Visualization to create a new report that will be saved in your student folder.

2. Select the Type as Customer Session Record.

3. Select Start Time as Today.

4. Click on Profile variables.

5. Add the following Profile variable of type Fields:
   o Search for session and select “Contact Session ID” under fields and drag&drop it into Profile Variables.

o Select the Value of Contact Session ID under Formula.

o Next, add the below fields similarly and Save the report as 3.1_CSR_Today_ValueReport in your folder after you have added all of them.
• DNIS
• Entry point
• IVR Script Name
• Final Queue Name
• Team
• Agent

o Preview the Report.

Outcome 10: Successfully create report 3.1_CSR_Today_ValueReport inside your student folder. 6. Next click on any session ID, then click on Zoom Icon .

7. Make a note of all the Call Activities during this session (Call Activity Records)

8. On the Drill Down on the left, search for Team Name and click on it.

9. Team name will be added to Drill-down view.

10. Launch it in a separate tab.

11. Move Contact Start Timestamp and Contact End Timestamp next to nextState_s by dragging them.

Outcome 11: Take a screenshot of below fields after they are aligned in requested order.

12. Click Export as Excel and save a copy of Call Activity records.

13. Now, create a similar report for Agent Session Record with below value fields and Start Time as Today.
    o Agent Session ID
    o Agent Name
    o Agent Endpoint (DN)
    o Team Name
    o Current State
    o Channel type

Save it as 3.1_ASR_Today_ValueReport in your folder and Click Preview.

14. Click on hamburger menu next to Value of Current State.

15. Uncheck all the states except Idle.

## 2. Create Realtime Agent Visualization

## 3. Create Chart Visualization with Interval

In this exercise, we will create a visualization in chart view of historical data for total calls and abandoned calls.

1. Create a new `Visualization`.

2. Set it as a `Customer Session Record`.

3. Next, set this visualization as a **Monthly** report, select **This Month** as the `Start Time`. Then under `Compute`, we will select `Interval` as **Daily**.

4. Click on `Profile Variables`. Bring in `Contact Session ID` and drag and drop that into the report. When prompted, we will select `Count of Session IDs` as formula and rename the field as **Total Calls**.

5. Next, we will add `Abandoned Calls` to the report.

   - Drag and drop the `Contact Session ID` over to the report again.
   - Select `Count of Contact Session ID` under formula and name it **AbandonedCalls**.
   - In order to get abandoned calls, we will need to create a `Filter`.
   - In this same window, search for `Termination Type` from the drop down menu. Select it and drag and drop as a Filter.
   - From the filter select only `Abandoned`. Click `Save`.

6. Lastly, we want this visualization to render as a `Chart`, so we will change the `Output type` from Table to `Line Chart`.

7. Click `Hide table` and `Save` the report.

8. Save this chart as `3.3_CSR_ContactVolume` in your folder and Run the report.

9. Execute the visualization, you can hover over points of the line chart to see values of total calls and abandoned calls.

10. Alternatively, we can re-save the report in a Bar chart format. To do this, go back to Edit mode and change the output type to `Bar chart`. Save and refresh the report.

# Dashboards

This lab is designed to introduce you to the dashboards available in Analyzer. Dashboards are available for Historical, Realtime and Business Metrics. You will learn about and run some useful stock dashboards as well as create a custom one.

## Table of Contents

| Topic                                                       | Lab Type      | Dificulty Level | Estimated length |
| ----------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Stock Dashboards](#1-stock-dashboards)                     | Practical Lab | EASY            | 5 min            |
| [Creating Custom Dashboards](#2-creating-custom-dashboards) | Practical Lab | EASY            | 5 min            |

## 1. Stock Dashboards

1. Start at the `Analyzer` home page.

2. Navigate to the `Dashboard` folder from the menu icon on the left-hand side. Once there, you will notice that <ins>all the same folders created under Visualizations exist in Dashboards as well.</ins>

3. Click on the `Stock Reports` folder. You will notice dashboards are categorized under the following types: Historical, Realtime and Business Metrics.

4. Under `Business Metrics`, run the `Abandoned Contacts` dashboard by double clicking the dashboard.

5. This dashboard contains several different types of data reports. Take some time to familiarize yourself with them.

6. Expand the `Customer Journey` dashboard by clicking on the blue launch button and observe contact distribution across IVR, Queue and Agent.

7. Navigate back to the main dashboard directory and open a dashboard named `Contact Volume Historical Dashboard` under the **Stock reports > Historical > Multimedia** directory.

8. `Create a copy` of this dashboard and edit to make some changes.

   - Click the `ellipses` buttons to create a copy.

9. Remove the `Contact Volume dashboard` table format from the bottom of the dashboard.

10. Next, we will add another report to this dashboard. Find the report created in Lab 3.2 called `3.2_AAR_RT_AgentState` under your Team folder and drag that into the dashboard on top of the chart. Adjust the height and width of the report. TODO

11. Update the Dashboard name as `4.1_Contact_Volume_AgentState` below `Save` option.

12. Save this Dashboard as 4.1_Contact_Volume_AgentState Dashboard and execute it.

## 2. Creating Custom Dashboards

We will create a new Dashboard using the below visualizations which we have created in previous labs together with some stock visualizations.

**Objective**: Create a dashboard to provide insights on: TODO

- How are contacts trending historically around Total vs Abandoned calls?
  - Via 3.3_CSR_ContactVolume
- How are Agents performing today?
  - Via Team Details Real-Time
- How is the Customer experience right now?
  - Via Average Service Level Card Real-Time
  - Via Longest Contact Currently in Queue Card Real-Time
- What are agents doing (what is their state) in Realtime?
  - Via 3.2_AAR_RT_AgentState

1. Navigate to the `Dashboards` section of Analyzer and `Create New Dashboard`.

2. Drag the following created reports from your student folder to the dashboard.

   - 3.2_AAR_RT_AgentState
   - 3.3_CSR_ContactVolume

3. Search for the other visualizations and drag them in the panel.
   - Team Details Real-Time
   - Average Service Level Card Real-Time
   - Longest Contact Currently in Queue Card Real-Time

**_Tip: If you are having issues with dragging the visualizations, try dragging it next to an already added report instead of a random free space in the dashaboard._**

4. Arrange them in a presentable view by moving them around and extending.

5. Name the dashboard as `Lab Custom Dashboard`.

6. `Save` this dashboard as `4.2_CustomDashboard` inside your student folder.

7. Run the dashboard by clicking `Preview`.

8. Recently, we have added the <ins>ability to use filters in dashboards as well</ins> (this is controlled by a Feature Flag, you need to request this through your PSM/CSM). Depending on the type of reports included in your dashboard, you will have option to filter to customize the information that is displayed on the dashboard. In this screenshot we have Run filter with option for Interval and Duration.

# New Data Insights

## Table of Contents

| Topic                                                                         | Lab Type      | Dificulty Level | Estimated length |
| ----------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Queue Based Reporting](#1-queue-based-reporting)                             | Practical Lab | EASY            | 5 min            |
| [Global Variable Reporting](#2-global-variable-reporting)                     | Practical Lab | EASY            | 5 min            |
| [Data Reporting for Digital Channels](#3-data-reporting-for-digital-channels) | Practical Lab | EASY            | 5 min            |
| [Skill Based Reporting](#4-skill-based-reporting)                             | Practical Lab | EASY            | 5 min            |
| [Preferred Agent Reporting](#5-preferred-agent-reporting)                     | Practical Lab | EASY            | 5 min            |

## 1. Queue Based Reporting

## 2. Global Variable Reporting

## 3. Data Reporting for Digital Channels

## 4. Skill Based Reporting

Skill Reporting has been launched recently, which offers new data insights into Call and Agent skill assignments, providing information for agents and flows that utilize the Skill-Based Routing logic.
Fields added for CSR, CAR, ASR and AAR
• Agent Skill Profile (ASR and AAR)
• Agent Skills (ASR and AAR)
• Contact Required skills (CSR and CAR)
• Contact Matched skills (CSR and CAR)
• Contact matched Skill profile (CSR and CAR)
Support Skill Type:

1. Enum: A named set of predefined values
2. Proficiency: 0-10
3. Text: Free-form text, support 40 characters
4. Boolean: True, False

In this Exercise you would try to capture skill information for the caller and Agents.

First visualization we will create will capture the numbers of agent available for each skill set

1. Leverage the learning so far to build a custom report with Row segment and Profile variables and create below shown visualizations
   • Data Type: Agent Session Record
   • Realtime with 5 sec refresh duration
   • Agent skill and Agent Name as Segment
   • Count of Agent as Profile Variable
   • Filter on Channel Type Telephony
   • Select Agent Skills for Filter on Run Mode

2. Save the Visualizations as 5.4_Agent_RT_SkillCount.

3. Click Preview.

4. Click on Agent Skills Filter à Click Custom Select

## 5. Preferred Agent Reporting

In this exercise, you will explore key reporting data points when using Preferred Agent Routing.

1. Create a new visualization in Analyzer as `Customer Session Record`.

2. Set `Start Time` as `Today`

3. Next, Click on `Row Segment` and add:

   - Routing Type
   - Preferred Agent Name
   - Final Queue Name

4. Next, Click on Profile Variables and add `Count of Contact Session ID` and rename the name as `#CallCount`.

5. Customize the Report Summary:

   - Uncheck `Table level` and check `Routing Type`.
   - Click `Customize`, set the `Routing Type` Level to `SUM` and `Save`.

6. Save the visualization as `5.5_PrefferedAgent_CallToday` in your folder.

7. `Preview` the visualization. Review the information in the report.

# Agent Data Insights

In many cases, it’s not only supervisors or administrators but also agents that need access to some reporting and statistics. Since Analyzer is, by default, not accessible to agents, there are other ways that we can share such data insights with them. In this lab, you will explore some of them, such as the `Agent Personal Statistics(APS)` tab in Agent desktop, the `direct access via URL` as well as `embedding reports on the Agent Desktop` itself.

## Table of Contents

| Topic                                                                                 | Lab Type      | Dificulty Level | Estimated length |
| ------------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Agent Personal Statistics](#1-agent-personal-statistics)                             | Practical Lab | EASY            | 5 min            |
| [Agent Direct URL Access](#2-agent-direct-url-access)                                 | Practical Lab | EASY            | 5 min            |
| [Embedding the report into Agent Desktop](#3-embedding-the-report-into-agent-desktop) | Practical Lab | EASY            | 5 min            |

## 1. Agent Personal Statistics

1. If not already logged in to the Agent Desktop, open a new window and **login**.

2. On the left-hand side menu select the `APS` icon ![APS](/assets/images/Analyzer/APS.png).

3. Within APS, there are multiple tabs of data. Navigate through the APS dashboards available in the Agent Desktop.

4. Go back to the first tab called `Summary`. While on the Summary report, the agent can filter their view. We now have the ability to **save** these filters in cache so that next time agent logs in, the filters will already be in place.

5. Choose different options from the `Team Name`, `Queue Name`, `Channel Type`. Notice that the data on the screen updates.

6. The tabs inside the APS reports are **_persistent_**, i.e. the agent desktop will remember the last tab you visited if you navigate away to the home screen or any other page. Select the `Queue Stats – Realtime` tab. Then, click the `Home` tab on the left side.

7. Go back to the APS tab. You will notice that the `Queue Stats – Realtime` is the default tab in your APS viewer.

## 2. Agent Direct URL Access

Analyzer is a premium functionality which is only accessible for Supervisors or Administrators but there are few use-cases where supervisors would like to share certain visualizations with Agents (Standard or Premium) for sharing the insights they are looking. This is possible with the `Share Browser Links` functionality.

1. Run the dashboard 4.2_CustomDashboard you created in [previous exercise](#2-creating-custom-dashboards) with your student user.

2. **_Copy_** the dashboard link from the browser.

3. Now, **Login** with user TODO in a separate browser or incognito mode. You can use TODO to login. This is an `Agent` user.

4. **_Paste_** the dashboard link in a new tab on the agent's browser session. You can see that you can now the dashboard as an agent, seeing only the statistics in which you have access.

## 3. Embedding the report into Agent Desktop

`Desktops layout` configuration drives the Agent desktop UI. By default all Agent teams are mapped to default Global Desktop Layout. To **_embed_** aa custom report into Agent desktop, follow below instructions:

1. Execute the dashboard you created in 4.2

2. Now open the custom desktop layout file provided to you with the Lab documents in a VS Code (should be default option on your lab machines).

3. Go to the Line 114 or look for "src" and copy the dashboard link from step 1 as src value.

4. Save the file.

5. Go back to the Admin Portal.

6. Go to Desktop Layout under Provisioning.

7. Click on 3 dots and then Copy the layout and name it as “DesktopLayout_TeamX” where X is your student number.

8. Upload the saved file in step 4 and save the desktop layout.

9. Now, navigate to Provisioning -> Team.

 Select your team and edit by clicking 3 dots -> Edit.

 Under Advanced settings -> Desktop Layout, select your newly created personalize desktop layout and save the Team.

10. Now refresh the agent desktop, you will notice Analyzer iFrame Widget on the agent desktop.

11. Click on it and you will see the dashboard loading on agent desktop!

# Supplementary Data Capabilities

There are various additional capabilities that Analyzer offers in terms of automating and monitoring the system. In this lab, we will explore how we can import/export report templates, how we can schedule reports to be run and sent on predefined time periods as well as how we can create alerts when specific threshold criteria are surpassed.

## Table of Contents

| Topic                                                                             | Lab Type      | Dificulty Level | Estimated length |
| --------------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Export/Import Visualizations Template](#1-export/import-visualizations-template) | Practical Lab | EASY            | 5 min            |
| [Visualization Scheduler](#2-visualization-scheduler)                             | Practical Lab | EASY            | 5 min            |
| [Threshold Alerting](#3-threshold-alerting)                                       | Practical Lab | EASY            | 5 min            |

## 1. Export/Import Visualizations Template

You can export or import visualizations as a single file or as folders containing multiple files. Exporting /Import report templates helps in reusability across multiple tenants.

**This is an Administrator only functionality and these options won’t be visible for supervisor role.**

For this exercise, you need to login in the Analyzer portalin a separate browser or incognito window with user cladm29user@mailinator.com. Also, you will need to download the zip file named CCMonitor.zip that is shared in the lab’s Webex Teams space. (TODO user+files)

1. Go to the `Visualizations` tab, click on the `ellipsis` on the right of your student folder and click `Export Templates`. Confirm by clicking `Export` on the popup window.

2. Zip file with the templates of all the created visualizations will be downloaded on your PC. **\_Note: During export, the filter names are retained but the values are not, thus **filter values are blank** after export and need to be re-configured.\_**

3. To import the downloaded template, first to go your student folder and create a sub-directory named **Import**.

4. Go Inside the Import folder, and click on `Import` on the top.

5. Browse to the Downloads Folder of your PC.

6. Select the zip file CCMonitor.zip , and click Import. TODO

7. You can verify from the new popup window that the templates were imported successfully.

8. Try to run these reports (e.g. Agent Monitor by State). <ins>You will see that most will fail and will ask provide you the details of filters which need to be updated due to the values being blank </ins>.

9. Go inside the report and fill all the filters. Once filter values are added, you can run these reports. You can also remove the filter all together, if not required.

## 2. Visualization Scheduler

In this exercise we will learn how to `schedule` visualizations within Analyzer. In Analyzer, you can schedule any historical visualization to be run and sent in a predefined time period to an email address. This is very handy for admins or supervisors who need to see reports on a scheduled daily, weekly or monthly basis.

1. Find the report `2.3_Queue Service Level` report that we created previously from your student folder.

2. Next, in the right-hand corner of the report, select the three `ellipsis` and from the dropdown select the option `Schedule Job`.

3. Fill in the schedule information for the scheduled report.

- Start with the `Job Name`. Let’s set this to run daily so we will give it the name **2.3 Daily**.
- Choose a start date and time. Select today’s date with a time of a few minutes ahead of your current time to give it time to trigger.
- Next complete the details for the email notification by entering in your email address and a subject line.

4. Once saved, the scheduled job will show up under the `Jobs` list.

5. If everything was setup correctly, check your email for the report after the trigger time has passed.

6. If your job was only set to run once, once it runs, that job is deleted from the jobs list.

7. Close the job scheduling window. Go back to the folder structure and look at the `Details` of the report, it will show the number of jobs scheduled. You should see 1 scheduled job to reflect the job we just scheduled in this exercise.

## 3. Threshold Alerting

`Threshold Rules` can be set to trigger when specific threshold criteria (e.g. number of calls in Queue) are met. This is another useful feature for administrators, as they can be notified both inside the Analyzer and via email when an undesired condition is met in the tenant in order to take action.

1. Navigate to the `Admin Portal` and under the Provisioning menu, go to `Threshold Rules`.

2. Create a `New Threshold Rule`.

3. Let's setup an agent threshold alert. Name it LabThresholdX, where X is your student number. <ins>Threshold rules can be set according to Agent or Contact records.</ins> TODO

4. Set the entity type to be `Queue`.

5. Select the name of your queue. For this exercise select the queue assigned to your user (should be of format SBR_QV_TeamX). TODO

6. Next select the `Longest Time in Queue` as the Threshold Metric with the `>=` operand and `Trigger Value` of 10 seconds, as well as `Trigger Interval` of 120 seconds.

7. Type your email address for the alert. After you entered your email address, you need to hit `Enter` key for the email to save.

8. Test the new threshold with a call into the queue.

9. Check your email to see that you got the alert.

10. In Analyzer check your threshold alerts on top-right. You should see an alert.

11. Next, acknowledge this threshold alert by checking the box next to the alert and clicking `Mark as Read`.

12. Lastly, you will notice that the threshold alert also gives ability to filter on (1) Notification Types (2) Duration and (3) Entity Type as well as the option to turn off the auto refresh function. You can also switch between Realtime and Historical Alerts, to view any past alerts in the system.

# Using Data APIs

Webex Contact Center Analyzer utilizes `GraphQL` for its API capabilities. GraphQL endpoint enables users to search for various contact center objects, such as tasks (= contacts/calls) or agent sessions, as per the graphQL schema.

The queries supported by the search graphQL endpoint optionally accept filters and aggregations, whose format, is also defined in the schema.

The search results are paginated, with max page size being different across various queries, and a maximum of 10000 results across multiple pages are returned.

<ins>It is important to note that SearchTasks API is not querying the reports we create in Analyzer but the raw data directly.</ins>

Additionally to the [Developer Documentation](https://developer.webex-cx.com/documentation/search/v1/search-tasks), Cisco has created various additional Search Task endpoint samples and help videos to get started with Analyzer API, which can be found in [Cisco DevNet Github page](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/graphql-sample).

In this lab, we are going to see a basic example of utilizing API through the Developer portal to retrieve some data from our tenant.

## Table of Contents

| Topic                         | Lab Type      | Dificulty Level | Estimated length |
| ----------------------------- | ------------- | --------------- | ---------------- |
| [Search APIs](#1-search-apis) | Practical Lab | MEDIUM          | 15 min           |

## 1. Search APIs

In this exercise, we are going to use API to retrieve the `LastAgentInteraction` example from Github to find when a customer called in the last 7 days and which agent they reached.

1. Open Developer portal using this [link](https://developer.webex-cx.com/documentation/search/v1/search-tasks).

2. Login with Admin user TODO credentials.

3. Click `Try Out` -> `Maximize Screen`.

4. You can **_explore_** the schema by clicking on Docs to open the Documentation Explorer. On the explorer, click on `Query -> task -> TaskList`.

5. Now let’s execute a query and see what data you get. `Update` the <ins>underlined Origin number</ins> in below query with the phone number you are using to make the test calls. If you used Calling as customer DN, use TODO as the origin instead of the DN.

6. Go to the query window and delete the text first before you paste the new query with your number.

7. Then, paste the snippet in Query space and click `Run`. Review the results of the API response.

```
{
#LAST AGENT INTERACTIONS: Usage of filters, aggregates, pagination and custom fields to find when the customer called last in a 7 day window and who they reached
task( # NOTE: from and to are mandatory arguments that take the Epoch timestamp in milliseconds
from: 1675638001000 #This can be set to Date.now() - (days _ 24 _ 60 _ 60 _ 1000) for lookback in days
to: 1675782001000 #This can be set to Date.now() in millis
timeComparator: createdTime #Filter by created Time only
filter: {
#Filter the type of Task
and: [
{ channelType: { equals: telephony } } #Telephony calls only
<ins>{ origin: { equals: "XXXXXXXXXXXX" } }</ins> #Customer ANI
{ status: { equals: "ended" } } #Final Disposition
{ direction: { equals: "inbound" } } #Inbound call only
{ isActive: { equals: false } } #Resolved call only
{ owner: { notequals: { id: null } } } #Only calls that had an Owner
]
}
pagination: { cursor: "0" } #Display first page only
) {
tasks {
#Task Metadata
id
createdTime
endedTime
origin
destination
lastWrapupCodeName #Why the customer called
totalDuration
selfserviceDuration
captureRequested
#Treatment Details
lastEntryPoint {
#Entrypoint Details
id
name
}
lastQueue {
#Queue Details
id
name
}
lastTeam {
#Team Details
id
name
}
owner {
#Agent Details
name
id
}
}
#Pagination Information
pageInfo {
endCursor
hasNextPage
}
}
}
```

---

<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>

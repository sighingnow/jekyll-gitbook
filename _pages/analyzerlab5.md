---
title: "Lab 6: Analyzer Exercises 5.1 to 5.2"
---

# Webex CC Partner Summit Lab 6: Analyzer Lab

## Exercises 5.1 and 5.2


# Table of Contents
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


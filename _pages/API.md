---
title: Lab 11 - Webex CC APIs
author: Shrishail Doddalinganavar & Kevin Simpson & Krishna Tyagi & Arunabh Bhattacharjee
date: 2022-11-11
layout: post
---

```
Last modified: Mon, 19 Jun 2023
```

## Table of Contents



| Topic                                                                         | Lab Type      | Difficulty Level | Estimated length |
| ----------------------------------------------------------------------------- | ------------- | --------------- | ---------------- |
| [Introduction to the New Webex CC APIs](#introduction-to-the-new-webex-cc-apis)        | Practical Lab | MID            | 25 min           |
| [Reporting APIs](#reporting-apis) | Practical Lab | MID            | 25 min            |
| [Call Recording APIs](#call-recording-apis)                                           | Practical Lab | EASY            | 15 min            |
| [Configuration APIs](#configuration-apis)                   | Practical Lab | MID            | 20 min           |
| [Search API](#search-api)                   | Practical Lab | MID            | 25 min |
| [Agent Desktop APIs](#agent-desktop-apis)                   | Practical Lab | MID            | 25 min |




## Introduction

**Important:** Changes to the API Lab.

- The New Webex Contact Center APIs are now available on **[developer.webex-cx.com](https://developer.webex-cx.com){:target="_blank"}** and use OAuth2 as opposed to One-time API Keys.
- The Legacy APIs (v1) are still available and are documented in the later section of this lab.
- The lab assumes that you will use the All New Webex Contact Center APIs which are documented below.
- For a quick start and overview, refer to the Overview / Quick start section.


## All New Webex Contact Center APIs (New Version)

# Introduction to the New Webex CC APIs
> This is the introduction video. It explains what API we have, what application and authorization mechanisms exist and how to get started.

<iframe width="1024" height="500" src="https://www.youtube-nocookie.com/embed/EiCXsxX2EHI?rel=0" title="WxCC Lab #8 Part 1:Introduction to the New Webex Contact Center APIs and Sample Ap" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>




### 1. Walkthrough of Auth Flow 
- To develop applications with the new APIs, you must build an integration with Webex.

- See **[Contact Center Dev Portal Docs](https://developer.webex-cx.com/documentation/getting-started){:target="_blank"}** for all the details. 


Here is a summary: 

**API Access- create an Integration**

- The New  Webex Contact Center APIs are accessed by using Webex OAuth2

- Watch this **[video](https://app.vidcast.io/share/b8b4de22-7322-45d3-ab9c-070b3a8ec1f3){:target="_blank"}** to create an integration and run APIs on postman.

- **[Steps](https://www.cisco.com/c/en/us/support/docs/contact-center/webex-contact-center/218418-configure-webex-contact-center-apis-with.html){:target="_blank"}** to create an integration and use on postman 

- OAuth2 by design, requires a client ID, clinet secret, callback URL(Redirect URL)

- Use the Client ID, Client Secret, Redirect URI (callback URL) to obtain access_token for your Org. Use the Access token to hit the API inside of the Authorization header. 

`Authorization: Bearer yourAccessToken`

- Use the refresh_token before it expires to renew your access_token - and get a new set of Access and Refresh Tokens.

`By Default, the access_token is valid for 12 hours and the refresh token is valid for 60 days, however using another call for the refresh token will give you a new set of tokens. Maintaining this access is important for perpetual access. One can write a simple scheduler that performs this background refresh activity.`

**OAuth2 Mechanism - Implications**

- With the OAuth2 support- Will require a "One Time Onboarding" User interface to obtain access to an org

- "Login with Webex" > Button to access an org

- You will register an App with us and use it for N orgs

- Have each Org administrator login into your App at least once to   obtain the tokens

- This is a "Required Onboarding " Process

- Once you obtain an Org's access_token and refresh_token, you can access their data



**OAuth2 Access Token Flow**

- Your App redirects to authorize with Webex (GET)

1. GET `https://webexapis.com/v1/authorize?client_id=______&response_type=code&redirect_uri=_https://your-app/auth___&scope=cjp:config_read&state=set_state_here`

- Admin user COMPLETES login.Redirect back to your App (GET)

2. GET https://your-app/auth?code=___unique_code_sent

-  Your App usess this code - API Endpoint - and then sends a POST request back to Webex

- Request Access Token AND/OR Refresh Tokens (POST)

3. POST https://webexapis.com/v1/access_token`
   application/x-www-form-urlencoded

```javascript
{"access_token":"ZDI3MGEyYzQtNmFlNS00NDNhLWFlNzAtZGVjNjE0MGU1OGZmZWNmZDEwN2ItYTU3",
"expires_in":1209600,
"refresh_token":"MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTEyMzQ1Njc4",
"refresh_token_expires_in":7776000 }
```

> Expiry in seconds and required x-www-form-urlencoded values include

> grant_type = _authorisation_code OR refresh_token_

> client_id

> client_secret

> code

> redirect_uri

### 2. Initial Setup of Sample App

- Login with the POD admin account to https://developer.webex-cx.com/.

- Go to > Documentation > API Reference.

- Follow the instructions in the video to request access to your sample app.

- The sample app is available here :**[https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/app-auth-sample](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/app-auth-sample){:target="_blank"}**

- Follow the instructions in the video to clone the repository and run the app.


# Reporting APIs

> In this video we will go through the developer portal and execute your first API calls through Postman.

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/CND6N_HpHs8?rel=0" title="WxCC Lab #4 Part 4:Reporting APIs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


- Login with the POD admin account to https://developer.webex-cx.com/.

- Go to > Documentation > API Reference.



### 1. Executing "Get Tasks" API


- Go to the Tasks section.

- Click on GET Tasks  > Try Out

- Fetch all the tasks using the "From Date/time" in Epoch milliseconds.

- To get the Epoch time use [epochconverter](https://www.epochconverter.com)

- Enter the Org ID and channel type > Press Run

The same request can be drafted on Postman using your personal Bearer Token.

Example of a GET Task:  https://api.wxcc-us1.cisco.com/v1/tasks

- Create a new collection in Postman

- Under that add a request

-  Enter the request URL copied from the developer portal. Make changes to the from and to times and the org ID to refelect your tenant.

- Under Headers enter the _Key:_ _Authorization_ and _Value _: _Bearer 'Your Bearer token copied from the developer portal'_

- Under Parameters enter the values you wil be passing as shown in the video

- Click on Send


### 2. Executing "Get Queue Statistics" API

- Go to the Queues section.

- Click on Get Queue Statistics > Try Out

- Enter the from date, to date and the interval 

- Click on Run

To try this out in Postman follow the steps outlined in the previous example


### 3. Executing "Get Agent Activities" API

- Go to the Agents section.

- Click on get Agent Activities > Try Out

- Enter the required parameters as explained in the video .Click on Run

To try this out in Postman follow the steps outlined in the previous example


### 4. Executing "Get Agent Statistics" API

- Go to the Agents section.

- Click on get Agent Statistics > Try Out

- Enter the required parameters as explained in the video .Click on Run

To try this out in Postman follow the steps outlined in the previous example



# Call Recording APIs

> In this video we will concentrate on "Captures" API. Captures are audio recordings that can be downloaded through API.

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/iehZnNvRzVc?rel=0" title="WxCC Lab #5 Part 5:Call Recording APIs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>




### Working with "List Captures" API

- Run the Get Tasks API as explained in the video and get teh required task IDs

- Go to Captures section

- Click on List Captures > Try Out

- Enter the parameters :orgid, taskids,urlexpiration

- Click on Run

- Use the Filepath in the response to download and listen to the recording

- Enter the required parameters as explained in the video .Click on Run

To try this out in Postman follow the steps outlined in the previous example


# Configuration APIs

> This is the bonus section of New WxCC APIs where you will be able to create/change settings in the Webex Contact Center by using the Configuration APIs.

<iframe width="1024" height="576" src="https://www.youtube-nocookie.com/embed/W5C3AvTEYmY?rel=0" title="WxCC Lab #5 Part 6:Configuration APIs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



### 1. Creating a Site with "Create Sites" API

- Go to Sites section

- Click on Create Sites > Try Out

- Enter the parameters :active,orgid, multimediaprofileid,name

- Click on Run

To try this out in Postman follow the steps outlined in the previous example


### 2. Changing the Site name with "Update Site By ID" API

- Go to Sites section

- Click on Update Site by ID > Try Out

- Enter the parameters orgid and the id (The site ID that was created in the previous exercise)

- In the request body update the orgid,id, multimediaprofileid, name

- Click on Run

To try this out in Postman follow the steps outlined in the previous example


### 3. Practicing with Bulk Upload

Follow the instructions in the video to use Postman and create mutiple sites using a csv file

# Search API

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%">
	<iframe src="https://app.vidcast.io/share/embed/c8c778c5-6659-4145-891a-bafcece29863" width="100%" height="100%" title="WebexCC Search API: Getting Started with GraphQL" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe>
</div> 

### 1. Search endpoint in developer portal

 - Go to - **[Search endpoint on Developer Portal](https://developer.webex-cx.com/documentation/search){:target="_blank"}**
 - Click on -> Try out -> Expand try out window by clicking box icon on right hand side top section.

### 2. Forming a graphQL query

 - In the interactive editor paste the query from github sample **[link](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/simple.graphql){:target="_blank"}**
 - NOTE : To and From should be changed according to your needs, it has to be epoch time in miliseconds, use this **[link](https://www.epochconverter.com/){:target="_blank"}** to convert.

### 3. Running the query

- Click on run - notice that you will receive all the interaction ID's between that timeframe.
- Run the query **[https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/totalCallsByAni.graphql](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/reporting-samples/graphql-sample/totalCallsByAni.graphql){:target="_blank"}** to aggregate calls from a specific phone number.
- NOTE : Change the line 11 to the ANI from your tenant.
- Refer to docs section as shown in video to find explaination for each fields in the schema.
- You can also run all the graphQL samples **[here](https://github.com/CiscoDevNet/webex-contact-center-api-samples/tree/main/reporting-samples/graphql-sample){:target="_blank"}** 
  
  NOTE : Change filters and aggregation values according to your tenant.

# Agent Desktop APIs

<div style="padding-bottom:60.25%; position:relative; display:block; width: 100%"> <iframe src="https://app.vidcast.io/share/embed/49fce72a-de94-449a-809e-822ed061d2e3" width="100%" height="100%" title="Agent desktop APIs" frameborder="0" loading="lazy" allowfullscreen style="position:absolute; top:0; left: 0"></iframe> </div>

### 1. Useful links

- **[Web socket subscription API](https://developer.webex-cx.com/documentation/notification){:target="_blank"}**
- **[Login](https://developer.webex-cx.com/documentation/agents/v1/login){:target="_blank"}**
- **[Logout](https://developer.webex-cx.com/documentation/agents/v1/logout){:target="_blank"}**
- **[Reload](https://developer.webex-cx.com/documentation/agents/v1/reload){:target="_blank"}**
- **[State change](https://developer.webex-cx.com/documentation/agents/v1/state-change){:target="_blank"}**

### 2. Importing postman collection and setting up oauth2.

- As shown in the **[video](https://github.com/CiscoDevNet/webex-contact-center-api-samples/blob/main/desktop-api-sample/WebexCC%20Desktop%20APIs%20-%20Sample.postman_collection.json){:target="_blank"}** Import the desktop postman collection.
- Postman -> Import -> Raw Text -> Continue
- Setup Oauth2 connection on postman collection as mentioned in **[section 1](https://app.vidcast.io/share/b8b4de22-7322-45d3-ab9c-070b3a8ec1f3){:target="_blank"}**


### 3. Establish a websocket connection

- Establish a web socket connection from postman as shown in this **[video](https://developer.webex-cx.com/documentation/notification){:target="_blank"}**
- Collection -> Agent -> Register Web socket Subscription.
- Run the request. A websocket URL will be generated.
- Copy the web socket notification URL received in the above step.
- On Postman Click on New -> WebSocket Request -> Paste the URL -> Click connect.
- At this point a WebSocket will be established successfully.

### 4. Login an agent

- Collection -> Agent -> Station login.
- Change the request body as mentioned in this **[document](https://developer.webex-cx.com/documentation/agents/v1/login){:target="_blank"}**
- Click on send.
- Agent will be successfully logged in and will be in idle state.
- Click on web socket established in step 5 and notice that an event is received on web socket for successful login.

### 5. Change state of an agent

- Collection -> Agent -> Change state.
- Change the request body as mentioned in this (To available) **[document](https://developer.webex-cx.com/documentation/agents/v1/state-change){:target="_blank"}**
- Click on send.
- Agent state will be successfully changed to Available.
- Click on web socket established in step 3 and notice that an event is received on web socket for successful state change.

### 6. Reload an agent

- Collection -> Agent -> Reload Agent.
- Reload API **[documentation](https://developer.webex-cx.com/documentation/agents/v1/reload){:target="_blank"}** 
- Click on send.
- Agent state data will be successfully received on web socket. this will include the config details aswell as task agent is handling.
- Click on web socket established in step 3 and notice that an event is received on web socket for successful agent reload.

### 7. Logout an agent

- Collection -> tasks -> Logout Task.
- Change the request body as in this **[document](https://developer.webex-cx.com/documentation/agents/v1/logout){:target="_blank"}** 
- Click on send.
- Agent will be successfully logged out.
- Click on web socket established in step 3 and notice that an event is received on web socket for successful agent reload.





---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	





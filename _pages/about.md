---
title: About
author: J. Austin Straley, DO
date: 2022-11-11
layout: post
output: html_document
---

<html lang="en" >
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <style>
      * {
        color: #000000;
      }
      body {   
        box-sizing: border-box;
        background-image: url('../assets/Background.png');
        background-repeat: no-repeat;
        background-size: cover;
      }
      .leftcolumn {
        float:left; 
        width: 45%;
        height: 600px;
        width: 300px;
        margin-right: 20px;
      }
      .rightcolumn {
        float:right; 
        width: 45%;
        height: 600px;
        padding-left: 20px;
      }
      .row:after {
        content: "";
        display: table;
        clear: both;
      }
      h1 {
        display:none;
      }
      h5 {
        text-align: center;
        font-size: 150%;
        margin: 15px;
        padding: 10px;
        border: 1px solid #000000;
      }
      h4 {
        text-align: center;
        display: block;
        padding: 5px;
      }
      img {
        display: block;
        padding: 10px;
        border: 4px solid #222;
      }
      .footer {
        background-color: #F1F1F1;
        text-align: center;
        padding: 10px;
        height: 800px;
        width: auto;
      }
  </style>
  <body>
    <div class="row">
      <div class="leftcolumn">
        <img src="../assets/profilepic.jpg" alt="Me"/>
        <h4>J. Austin Straley, DO</h4>
      </div>
      <div class="rightcolumn">
        <h5>About Me</h5>
        <p>
            Education
            <ul>
                <li>Charleston Area Medical Center | Charleston, WV</li>
                    <ul><li>Internal Medicine</li></ul>
                <li>Lincoln Memorial University DeBusk College of Osteopathic Medicine | Harrogate, TN</li>
                    <ul><li>Doctor of Osteopathy (DO)</li></ul>
                <li>University of Tennessee | Knoxville, TN</li>
                    <ul><li>Mathematics</li></ul>
            </ul>
        </p>
        <p>
            Intrests
            <ul>
                <li>Clinical</li>
                    <ul><li>Cerner</li></ul>
                <li>Research</li>
                    <ul><li>Heart Failure</li></ul>
                    <ul><li>Chronic Kidney Disease</li></ul>
                <li>Hobbies</li>
                    <ul><li>Snowboarding</li></ul>
                    <ul><li>Golf</li></ul>
            </ul>
        </p>
      </div>
    </div>
    <div class="footer">
      <h5></h5>
    </div>
  </body>
</html>
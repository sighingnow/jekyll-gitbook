---
title: Lab 10 - QM/WFO - Calabrio
author: Carles Duz Palau & Susan Quick
date: 2022-10-10
layout: post
---

Work in progress. ETA is the end of April.

<form id="myForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name"><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email"><br><br>
      <input type="submit" value="Submit">
</form>  
    <script>
      // Get the form and its inputs
      const form = document.getElementById('myForm');
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');

      // Check if there is data in local storage
      const storedData = localStorage.getItem('myFormData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        nameInput.value = parsedData.name;
        emailInput.value = parsedData.email;
      }

      // Add an event listener for the form submission
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data and store it in local storage
        const formData = {
          name: nameInput.value,
          email: emailInput.value
        };
        localStorage.setItem('myFormData', JSON.stringify(formData));

        // Display a message indicating that the data was saved
        const message = document.getElementById('message');
        message.textContent = 'Values updated!';

        // Reset the form
        form.reset();
      });
    </script>



---


<p style="text-align:center"><strong>Congratulations, you have completed this lab! You can continue with the next one.</strong></p>
		
<p style="text-align:center;"><img src="/assets/gitbook/images/webex.png" width="100"></p>	

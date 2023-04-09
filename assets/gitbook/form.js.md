// Get the form and its inputs
      const form = document.getElementById('AttendeeForm');
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

// form.js
const formId = "attendee-form"; // ID of the form
const saveButton = document.querySelector("#save"); // select save button
const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form
const formElement = "attendee-id";


saveButton.onclick = event => {
  event.preventDefault();
  let inputAttendee= document.getElementById(formElement);
  localStorage.setItem(formId, inputAttendee.value);
  const message = "Attendee ID has been saved!";
  displayAlert(message);
};

/**
 * This function displays a message
 * on the page for 1 second
 *
 * @param {String} message
 */
const displayAlert = message => {
  alertBox.innerText = message;
  alertBox.style.display = "block";
  setTimeout(function() {
    alertBox.style.display = "none";
  }, 1000);
};

/**
 * This function populates the form
 * with data from localStorage
 *
 */
const populateForm = () => {
  if (localStorage.key(formId)) {
    const savedData = localStorage.getItem(formId); 
    formElement.value = savedData;
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);
  }
};

document.onload = populateForm(); // populate the form when the document is loaded

// form.js
console.log("TRIGGER1");
const formId = "attendee-form"; // ID of the form
const className = ".attendee-class";
const formIdentifier = `${formId}`; // Identifier used to identify the form
const saveButton = document.querySelector("#save"); // select save button
const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form
let formElement = "attendee-id";


  
//Function which updates all "attendee-class" 
const updateAllClasses = (data) => {
  // Get a NodeList of all .demo elements
  const demoClasses = document.querySelectorAll(className);

  // Change the text of multiple elements with a loop
  demoClasses.forEach(element => {
  element.textContent = data;
  });  
  };

/**
 * This function gets the values in the form
 * and returns them as a string with the
 * [formIdentifier] as the key
 */
const getFormData = () => {
  let data;
  for (const element of formElements) {
    if (element.name.length > 0) {
      data = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formIdentifier, data);
  const message = "Attendee ID has been saved!";
  displayAlert(message);
  updateAllClasses(data);
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
  if (localStorage.key(formIdentifier)) {
    const savedData = localStorage.getItem(formIdentifier); // get and parse the saved data from localStorage
    for (const element of formElements) {      
      if (element.name == formElement) {
        element.value = savedData;        
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);    

    updateAllClasses(savedData); 
    
  }
};


document.onload = populateForm(); // populate the form when the document is loaded
window.onload = populateForm(); // populate the form when the document is loaded


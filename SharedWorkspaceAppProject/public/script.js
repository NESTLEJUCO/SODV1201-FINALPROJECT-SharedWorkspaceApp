// Name: Course Project - CoWorking Registry Web App
// Course Code: SODV1201
// Class: Software Development Diploma program.
// Author: Nestle Juco, Sheryl Lugti, Lady Rose Alarcon, Aldwin Sean Eje

//JS Function for Banner Slides
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 3000);
}

//JS Functions to auto generate id
// fetch the users.json file
fetch("http://localhost:8081/users", {
  // specify the mode as cors
  mode: "cors",
  // optionally, specify the headers with the origin
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
  // convert the response to a JSON object
  .then((response) => response.json())
  // use the data from the JSON object
  .then((data) => {
    // declare a variable for the new user id
    let newUserId;
    // check if the data array is empty or not
    if (data.length == 0) {
      // if it is empty, set the new user id to US00000001
      newUserId = "US00000001";
    } else {
      // otherwise, use existing code to generate the new user id
      // get the last user id from the data array
      let lastUserId = data[data.length - 1].id;
      try {
        // check if the last user id is null or undefined
        if (
          lastUserId == null ||
          lastUserId == "undefined" ||
          lastUserId == ""
        ) {
          // throw an error
          throw new Error("Last User ID is null or undefined");
        }
        // otherwise, generate a new user id normally
        newUserId = generateId(lastUserId);
      } catch (error) {
        // catch the error and display it in the console
        console.error(error);
        // set the new user id to US00000001
        newUserId = "US00000001";
      }
    }
    // display the new property id in an alert and in an input element
    document.getElementById("id").value = newUserId;
  })
  // catch any errors
  .catch((error) => console.error(error));

function generateId(lastUserId) {
  // get the prefix and the number from the last user id
  let prefix = lastUserId.slice(0, 2);
  let number = parseInt(lastUserId.slice(2));
  // increment the number by one
  number++;
  // pad the number with zeros to make it eight digits long
  let padded = number.toString().padStart(8, "0");
  // return the concatenation of the prefix and the padded number
  return prefix + padded;
}

//Function to display thank you message on same page after register:
// Get the form element
var form = document.getElementById("signup");
// Get the input element
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
// Get the message div element
var message = document.getElementById("message");
// Get the message text element
var messageText = document.getElementById("messageText");
// Add an event listener to handle the form submission
form.addEventListener("submit", function (event) {
  // Get the input value
  var namef = fname.value;
  var namel = lname.value;
  // Set the message text with the input value
  messageText.textContent =
    "Thank you for registering, " + namef + " " + namel + "!";
  //Show the message div
  message.style.display = "block";
});

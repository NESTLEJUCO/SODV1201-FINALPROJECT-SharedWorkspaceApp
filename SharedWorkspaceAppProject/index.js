// Name: Course Project - CoWorking Registry Web App
// Course Code: SODV1201
// Class: Software Development Diploma program.
// Author: Nestle Juco, Sheryl Lugti, Lady Rose Alarcon, Aldwin Sean Eje

// Notes:
// 1. Install - npm install express body-parser fs cors
// 2. Default URL - http://localhost:8081/
// 3. Activate JS Express Server - node index.js

//JS Function for User Account Registration
const express = require("express"); //JS Express Web Server
const bodyParser = require("body-parser"); //Read Incoming POST Request
const fs = require("fs"); //File System
const cors = require("cors"); //CORS Middleware
const app = express();

app.use(bodyParser.json()); //JSON Middleware or Connection String
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", cors()); // use cors for the /users route
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/login.html");
});

//User registration
let users = [];
if (fs.existsSync("users.json")) {
  let data = fs.readFileSync("users.json", "utf-8");
  users = JSON.parse(data);
}

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/register", (req, res) => {
  users.push(req.body);

  fs.writeFileSync("users.json", JSON.stringify(users));
  const data = req.body;

  setTimeout(function () {
    const username = data.username;
    const user = users.find((user) => user.username === username);
    const userId = user.id;
    res.redirect(`/login.html?id=${userId}`);
  }, 2000);
});

// Property registration
let property = [];
if (fs.existsSync("property.json")) {
  let propdata = fs.readFileSync("property.json", "utf-8");
  property = JSON.parse(propdata);
}

app.get("/property", (req, res) => {
  res.send(property);
});

// Retrieve property by ID
app.get("/property/:propertyid", (req, res) => {
  // get the property id from the request parameters
  const propertyId = req.params.propertyid;

  // find the property with the given id
  const propertyDetails = property.find((p) => p.propertyid === propertyId);

  // send the property details as a response
  res.send(propertyDetails);

  const foundProperty = property.find((prop) => prop.propertyid === propertyId);

  if (foundProperty) {
    res.json(foundProperty);
  } else {
    res.status(404).json({ success: false, message: "Property not found." });
  }
});

app.post("/addProperty", (req, res) => {
  property.push(req.body);

  fs.writeFileSync("property.json", JSON.stringify(property));
  const propdata = req.body;
  const userId = req.body.userId;
  setTimeout(function () {
    res.redirect(`/owneradmin.html?id=${userId}`);
  }, 2000);
});

//UPDATE endpoint for updating specific property by ID
app.put("/property/:propertyid", (req, res) => {
  // get the property id from the request parameters
  const propertyId = req.params.propertyid;

  // get the updated property details from the request body
  const updatedPropertyDetails = req.body;

  // find the index of the property with the given id
  const propertyIndex = property.findIndex((p) => p.propertyid === propertyId);

  // update the property details in the property array
  property[propertyIndex] = updatedPropertyDetails;

  // write the updated property array back to the JSON file
  fs.writeFileSync("property.json", JSON.stringify(property, null, 2));

  // send a success response
  res.send({ success: true });
});

// PROPERTY DELETE endpoint for deleting a Property by ID
app.delete("/property/:id", (req, res) => {
  const propertyId = req.params.id;

  // Find the index of the property with the given ID
  const propertyIndex = property.findIndex(
    (property) => property.propertyid === propertyId
  );

  if (propertyIndex !== -1) {
    // Remove the property from the array
    property.splice(propertyIndex, 1);

    fs.writeFileSync("property.json", JSON.stringify(property));
    res.json({ success: true, message: "Property deleted successfully." });
  } else {
    res.status(404).json({ success: false, message: "Property not found." });
  }
});

// WORKSPACE DELETE endpoint for deleting a Workspace by ID
app.delete("/workspace/:id", (req, res) => {
  const workspaceId = req.params.id;

  // Find the index of the workspace with the given ID
  const workspaceIndex = workspace.findIndex(
    (workspace) => workspace.workspaceid === workspaceId
  );

  if (workspaceIndex !== -1) {
    // Remove the workspace from the array
    workspace.splice(workspaceIndex, 1);

    fs.writeFileSync("workspace.json", JSON.stringify(workspace));
    res.json({ success: true, message: "Workspace deleted successfully." });
  } else {
    res.status(404).json({ success: false, message: "Workspace not found." });
  }
});

// BOOKING DELETE endpoint
// app.delete("/mybooking/:workspaceId", (req, res) => {
app.delete("/mybooking/:workspaceId", (req, res) => {
  const workspaceId = req.params.workspaceId;

  fs.readFile("mybooking.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading mybooking.json:", err);
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete booking." });
    }

    let mybooking = JSON.parse(data);
    const updatedBookings = mybooking.filter(
      (booking) => booking.workspaceid !== workspaceId
    );

    fs.writeFile(
      "mybooking.json",
      JSON.stringify(updatedBookings),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing mybooking.json:", err);
          return res
            .status(500)
            .json({ success: false, message: "Failed to delete booking." });
        }

        res.json({ success: true, message: "Booking deleted successfully." });
      }
    );
  });
});

//Workspace registration
let workspace = [];
if (fs.existsSync("workspace.json")) {
  let wpdata = fs.readFileSync("workspace.json", "utf-8");
  workspace = JSON.parse(wpdata);
}

app.get("/workspace", (req, res) => {
  res.send(workspace);
});

// Retrieve Workspace by ID
app.get("/workspace/:workspaceid", (req, res) => {
  // get the workspace id from the request parameters
  const workspaceId = req.params.workspaceid;

  // find the workspace with the given id
  const workspaceDetails = workspace.find((p) => p.workspaceid === workspaceId);

  // send the workspace details as a response
  res.send(workspaceDetails);

  const foundWorkspace = workspace.find(
    (space) => space.workspaceid === workspaceId
  );

  if (foundWorkspace) {
    res.json(foundWorkspace);
  } else {
    res.status(404).json({ success: false, message: "Workspace not found." });
  }
});

app.post("/addWorkSpace", (req, res) => {
  workspace.push(req.body);

  fs.writeFileSync("workspace.json", JSON.stringify(workspace));
  const wpdata = req.body;
  const userId = req.body.userid;

  setTimeout(function () {
    res.redirect(`/owneradmin.html?id=${userId}`);
  }, 2000);
});

//UPDATE endpoint for updating specific workspace by ID
app.put("/workspace/:workspaceid", (req, res) => {
  // get the property id from the request parameters
  const workspaceId = req.params.workspaceid;

  // get the updated property details from the request body
  const updatedWorkspaceDetails = req.body;

  // find the index of the property with the given id
  const workspaceIndex = workspace.findIndex(
    (p) => p.workspaceid === workspaceId
  );

  // update the property details in the property array
  workspace[workspaceIndex] = updatedWorkspaceDetails;

  // write the updated property array back to the JSON file
  fs.writeFileSync("workspace.json", JSON.stringify(workspace, null, 2));

  // send a success response
  res.send({ success: true });
});

// Booking Handler endpoint
let mybooking = [];
if (fs.existsSync("mybooking.json")) {
  let booking = fs.readFileSync("mybooking.json", "utf-8");
  mybooking = JSON.parse(booking);
}

app.get("/mybooking", (req, res) => {
  // Set Cache-Control: no-cache header for HTML
  res.send(mybooking);
});

app.post("/mybooking/:workspaceId/update", async (req, res) => {
  //app.put("/mybooking/:workspaceId/update", (req, res) => {
  try {
    const bookingData = req.body;
    const bookings = getBookings(); //removed await

    bookings.push(bookingData);

    saveBookings(bookings); //removed await

    res.json({ message: "Booking saved successfully." });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the booking." });
  }
});

async function getBookings() {
  try {
    const data = fs.readFile("mybooking.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveBookings(bookings) {
  fs.writeFile("mybooking.json", JSON.stringify(bookings, null, 2));
}

//Login Validation - Routing and URL Forwarding
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const userId = user.id;
    let redirectUrl;
    if (user.status === "owner") {
      redirectUrl = `/owneradmin.html?id=${userId}`;
    } else if (user.status === "coworker") {
      redirectUrl = `/coworkerview.html?id=${userId}`;
    } else {
      // Handle other roles or scenarios if needed
      redirectUrl = "/";
    }
    res.redirect(redirectUrl);
  } else {
    res.redirect("/login.html?error=true");
  }
});

//Check activated server port
app.listen(8081, () => {
  console.log("APP LISTENING ON PORT 8081.");
});

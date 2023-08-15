// Name: Course Project - CoWorking Registry Web App
// Course Code: SODV1201
// Class: Software Development Diploma program.
// Author: Nestle Juco, Sheryl Lugti, Lady Rose Alarcon, Aldwin Sean Eje

// Notes:
// 1. Install - npm install express body-parser fs
// 2. Default URL - http://localhost:8081/
// 3. Activate JS Express Server - node index.js

//JS Function for User Account Registration
const express = require("express"); //JS Express Web Server
const bodyParser = require("body-parser"); //Read Incoming POST Request
const fs = require("fs"); //File System
const app = express();

app.use(bodyParser.json()); //JSON Middleware or Connection String
app.use(bodyParser.urlencoded({ extended: false }));

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

// app.post("/register", (req, res) => {
//   users.push(req.body);

//   fs.writeFileSync("users.json", JSON.stringify(users));
//   const data = req.body;

//   res.send(
//     `<center>
//     <h2>Account Registration Successful!</h2>
//     <p>${"Thank you! " + data.firstname + " " + data.lastname}</p>
//     <p>Click to <a href="http://localhost:8081/">Login</a>.</p>
//     </center>`
//   );
// });

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/register", (req, res) => {
  users.push(req.body);

  fs.writeFileSync("users.json", JSON.stringify(users));
  const data = req.body;

  res.send(
    `<center>
    <h2>Account Registration Successful!</h2>
    <p>${"Thank you! " + data.firstname + " " + data.lastname}</p>
    <p>Click to <a href="http://localhost:8081/">Login</a>.</p>
    </center>`
  );
});

//Property registration
let property = [];
if (fs.existsSync("property.json")) {
  let propdata = fs.readFileSync("property.json", "utf-8");
  property = JSON.parse(propdata);
}

app.get("/property", (req, res) => {
  res.send(property);
});

app.post("/addProperty", (req, res) => {
  property.push(req.body);

  fs.writeFileSync("property.json", JSON.stringify(property));
  const propdata = req.body;

  res.send(
    `<center>
    <h2>Property Listing Successful!</h2>
    <p>Click to <a href="http://localhost:8081/owneradmin.html">List Property / Workspace</a>.</p>
    </center>`
  );
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

app.post("/addWorkSpace", (req, res) => {
  workspace.push(req.body);

  fs.writeFileSync("workspace.json", JSON.stringify(workspace));
  const wpdata = req.body;

  res.send(
    `<center>
    <h2>Workspace Listing Successful!</h2>
    <p>Click to <a href="http://localhost:8081/owneradmin.html">List Property / Workspace</a>.</p>
    </center>`
  );
});

//Login Validation

//Routing and URL Forwarding
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    if (user.status === "owner") {
      res.redirect("/owneradmin.html");
    } else if (user.status === "coworker") {
      res.redirect("/coworkerview.html");
    } else {
      // Handle other roles or scenarios if needed
      res.redirect("/");
    }
  } else {
    // Display error message
    res.sendFile(__dirname + "/public/login.html", {
      error: "Invalid credentials. Please try again.",
    });
  }
});

//Check acitivated server port
app.listen(8081, () => {
  console.log("APP LISTENING ON PORT 8081.");
});

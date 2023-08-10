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

app.use(bodyParser.json()); //JSON Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

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

  res.send(
    `<center>
    <h2>Account Registration Successful!</h2>
    <p>${"Thank you! " + data.firstname + " " + data.lastname}</p>
    <p>Click to <a href="http://localhost:8081/">Login</a>.</p>
    </center>`
  );
});

app.listen(8081, () => {
  console.log("APP LISTENING ON PORT 8081.");
});

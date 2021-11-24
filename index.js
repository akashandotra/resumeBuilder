const express = require("express");
require("dotenv").config();
var path = require("path");
var public = path.join(__dirname, "public");

const app = express();
app.use(express.json({ limit: "10kb" }));

app.listen(3000, () => {
  console.log("Running at port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(public, "index.html"));
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(public, "login.html"));
});
app.get("/build", function (req, res) {
  res.sendFile(path.join(public, "build.html"));
});
app.get("/resume", function (req, res) {
  res.sendFile(path.join(public, "resume.html"));
});
app.use("/", express.static(public));

app.post("/createAccount", function (req, res) {
  console.log(req.body);
  //save to database
  res.send({
    success: 1,
    message: "signup successful",
  });
});

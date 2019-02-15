
//express
const express = require("express");
let app = express();
var path = require("path");



app.use('/portal/assessments/', express.static('dist/sl-assessments-portal'))
app.get("/portal/assessments/*", function (req, res) {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "/dist/sl-assessments-portal/index.html"));
});

//listen to given port
app.listen(4300, () => {
  console.log(
    "Environment: " + "development"
  );
  console.log("Application is running on the port:" + 4300);
});

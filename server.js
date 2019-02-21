
//express
const express = require("express");
let app = express();
var path = require("path");



app.use('/programs/', express.static('dist/sl-programs-portal'))
app.get("/programs/*", function (req, res) {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, "/dist/sl-programs-portal/index.html"));
});

//listen to given port
app.listen(4400, () => {
  console.log(
    "Environment: " + "development"
  );
  console.log("Application is running on the port:" + 4400);
});

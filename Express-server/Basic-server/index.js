var express = require("express");
var app = express();
app.get("/", function(request, response) {
 response.send("Assalam o Alaikum ");
});

app.listen(8080, function() {
 console.log("Express app started on port 8080.");
});
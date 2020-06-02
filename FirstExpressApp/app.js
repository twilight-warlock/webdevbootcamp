var express = require("express");
var app = express();

// use / for "hi there"
app.get("/",function(req,res){
	// res.send("Helllo Amigooo!!!!!");
	res.send("I am Sorryyyyy");
})

app.get("/bye",function(req,res){
	res.send("BByeeee Amigooo!!!!");
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});
var express = require("express");
var app = express();

app.get("/:word",function(req,res){
	var word  = req.params.word;
	res.render("simple.ejs",{word:word});
});

app.listen(3000,function(){
	console.log("Server started at port 3000");
});
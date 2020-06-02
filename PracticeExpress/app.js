var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("Hollalalalalalala");
});

app.get("/speak/:word",function(req,res){
	var word = req.params.word;
	if(word=="pig"){
		res.send("Oink");
	}
	else if(word=="cow"){
		res.send("MOOOOO!");
	}
	else if(word=="dog"){
		res.send("Woooffff");
	}
});

app.get("/repeat/:word/:num",function(req,res){
	var word = req.params.word;
	var num = req.params.num;
	var repeator="";
	for(let i=0;i<num;i++){
		repeator+=`${word} `;
	}	
	res.send(repeator);
});

app.get("*",function(req,res){
	res.send("Sorry page not found.......What you doing with your life??");
})

app.listen(3000,function(){
	console.log("server started on port 3000");
})
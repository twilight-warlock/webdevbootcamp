var app = require("express")();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("home");
});
var friends = ["Veronica","Amaira","Genevieve","Mariana","Isabel"];

app.get("/friends",function(req,res){	
	res.render("friends",{friends:friends});
})

app.post("/new",function(req,res){
	friends.push(req.body.newFriend);
	res.redirect("/friends");
})

app.listen(3000,function(){
	console.log("Server started on port 3000")
});
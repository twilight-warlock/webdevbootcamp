const app = require("express")();
const request = require("request");

// http://www.omdbapi.com/?apikey=b796d8f8&

app.set("view engine","ejs");

app.get("/",function(req,res){
	res.render("search");
})

app.get("/results",function(req,res){
	const term = req.query.term;
	request(`http://www.omdbapi.com/?apikey=b796d8f8&s=${term}`,function(error,response,body){
		if(!error && res.statusCode==200){
			var parsedData = JSON.parse(body);
			res.render("results",{data:parsedData});
		}
	})
})
// Listening for server at port 3000
app.listen(3000,function(){
	console.log("Movie app has started at port 3000");
})
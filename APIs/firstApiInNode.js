var request = require("request");
request("http://www.google.com",function(err,res,body){
	if(!err && res.statusCode == 200){
		console.log(body);
	}
	else{
		console.log("Something went Wromg!");
		console.log(err);
	}
});
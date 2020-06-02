var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	breed: String
});

var Cat = mongoose.model("Cat",catSchema);

var jack = new Cat({
	name: "Jack",
	age: 11,
	breed: "Bitchy",
});

jack.save(function(err,cat){
	if(err){
		console.log("Something went Wrong");
	}
	else{
		console.log("Added Jack to the database");
		console.log(cat);
	}
})
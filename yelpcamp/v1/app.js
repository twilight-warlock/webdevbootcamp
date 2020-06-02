const express = require("express"),
	  app = express(),
	  bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
	  flash = require("connect-flash"),
	  Camp = require("./models/campground"),
	  Comment = require("./models/comment"),
	  passport = require("passport"),
	  localStrategy = require("passport-local"),
	  methodOverride = require("method-override"),
	  User = require("./models/user"),
	  seedDB = require("./seeds");

const campgroundRoutes = require("./routes/campgrounds"),
	  commentRoutes    = require("./routes/comments"),
	  indexRoutes       = require("./routes/index");
// seedDB();

// -----------------Passport Config-----------------
// Using connect-flash
app.use(flash());
app.locals.moment = require('moment');
app.use(require("express-session")({
	secret:"I am going to be consistent",
	resave:false,
	saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -------------------App Config-------------------

mongoose.set('useUnifiedTopology', true);
// Connecting to the database
var url = process.env.DATABASEURL || "mogodb://localhost:27017/yelpcamp";
mongoose.connect(url,{
	useNewUrlParser:true,
	useCreateIndex:true,
}).then(()=>{
	console.log("Connected to DB");
}).catch(err=>{
	console.log(err.message);
})

// Converting form data
app.use(bodyParser.urlencoded({extended:true}));

// setting default page type as .ejs
app.set("view engine","ejs");

// Making public a static directory
app.use(express.static(__dirname + "/public"));

// Method override initialization
app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// Making a server
app.listen(process.env.PORT,process.env.IP);
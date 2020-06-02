const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSanitizer = require("express-sanitizer");

// -----------=====App Config-------------------
// Setting default file structure to .ejs
app.set("view engine","ejs");

// To use method override
app.use(methodOverride("_method"));

// To retrieve data from form
app.use(bodyParser.urlencoded({extended:true}));

// TO sanitize the input from the user
app.use(expressSanitizer());

// for libraries
app.use(express.static('public'));

// -----------Mongoose Config-------------------
// Connecting to the database
mongoose.connect("mongodb://localhost:27017/restful_blogs_app",{useNewUrlParser: true });

// Making mongoose Schema
const blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now},
});

// Making a model
const Blog = mongoose.model("Blog",blogSchema);


// ---------------RESTful Routes-------------------

// Home page
app.get("/",function(req,res){
	res.redirect("/blogs");
})

// INDEX - list all the blogs
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("Error");
			console.log(err);
		}
		else{
			res.render("index",{blogs:blogs});		
		}
	})
	
});

// NEW - Render form to add new blogs
app.get("/blogs/new",function(req,res){
	res.render("new");
})

// CREATE - accepting user submitted values from the form
app.post("/blogs",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,function(err, newBlog){
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs")
		}
	})
})

// SHOW - shows a single blog
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog:foundBlog});
		}
	})
})

// EDIT - edit a part of the page
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit",{blog:foundBlog});
		}
	})
})

// UPDATE - to take value from edit form and update database
app.put("/blogs/:id",function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/"+req.params.id);
		}
	})
})

// DELETE - to delete a particular blogs
app.delete("/blogs/:id",function(req,res){
// 	destroy blogs
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
		
	})
// redirect	
})

// Starting server at port 3000
app.listen(3000,function(){
	console.log("Server has started on port 3000");
})
const express = require("express");
// To fix params passing
const router = express.Router({mergeParams:true});
const Camp = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// Comment routes
// NEW
router.get("/new",middleware.isLoggedIn, function(req,res){
	
	Camp.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{data:campground});
		}
	})
	
})

// CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
// 	look for campground
	Camp.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			//Creating a new comment	
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong");
					console.log(err);
				}
				else{
					// Add  username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})	
})

// EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Camp.findById(req.params.id,function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id,function(err,foundCom){
			if(err || !foundCom){
				req.flash("error","Comment not found");
				res.redirect("back");
			}else{
				res.render("comments/edit",{data_id:req.params.id,comment:foundCom});	
			}
		})
	})
	
	
})

// UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundCom){
		if(err){
			req.flash("error","Comment not found");
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
		
	})
})

// DESTROY
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			req.flash("error","Comment not found");
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})


module.exports = router;
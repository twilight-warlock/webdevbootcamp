const Camp = require("../models/campground");
const Comment = require("../models/comment");
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		// 	Is user logged in?	
		Camp.findById(req.params.id,function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found");
			res.redirect("back");
		}else{
			// Does user own the campground
			if(foundCamp.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error","You do not have the permission to do that");
				res.redirect("back");
			}	
		}
	})
	}else{
		req.flash("error","You need to login first")
		res.redirect("back");
	}
	
}


middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		// 	Is user logged in?	
		Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{
			// Does user own the comment
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error","You do not have the permission to do that");
				res.redirect("back");
			}
				
		}
	})
	}else{
		req.flash("error","You need to login first");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to login first");
	res.redirect("/login");
}


module.exports = middlewareObj;
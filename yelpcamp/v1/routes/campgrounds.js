const express = require("express");
const router = express.Router();
const Camp = require("../models/campground");
const middleware = require("../middleware");

// INDEX - displays all the campgrounds
router.get("/",function(req,res){
	Camp.find({},function(err,camps){
		if(err){
			console.log("OOpss");
			console.log(err);
		}
		else{
			console.log("Found all");
			res.render("campgrounds/index",{data:camps, page: 'campgrounds'});
		}
	})
});

//NEW - Adding new campgrounds
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})

//CREATE - creating new campgrounds
router.post("/",middleware.isLoggedIn,function(req,res){
	const name = req.body.name;
	const image = req.body.image;
	const description = req.body.description;
	const price = req.body.price;
	const author = {
		id:req.user._id,
		username:req.user.username,
	}
	Camp.create({
		name,
		price,
		image,
		description,
		author,
	},function(err,camps){
		if(err){
			console.log("OOpss");
			console.log(err);
		}
		else{
			console.log("Created a new Camppp");
			console.log(camps);
			res.redirect("/");
			}
	});
})

// SHOW - display information about a particular campground
router.get('/:id', async function(req, res) {
    Camp.findById(req.params.id).populate('comments').exec(function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found");
			res.redirect("back");
		}else{
			res.render('campgrounds/show', {data: foundCamp});
		}
	});
    
    
    
});

// EDIT - To dispaly the edit form
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Camp.findById(req.params.id,function(err,foundCamp){
		if(err){
			req.flash("error","Campground not found");
		}
		res.render("campgrounds/edit",{data:foundCamp});
	})
})

// UPDATE - To update the values of the campground
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Camp.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCamp){
		if(err){
			req.flash("error","Campground not found");
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})	
})

// DESTROY - delete a campground
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Camp.findByIdAndRemove(req.params.id,function(err){
		if(err){
			req.flash("error","Campground not found");
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Campground deleted");
			res.redirect("/campgrounds");
		}
	})
})


module.exports = router;


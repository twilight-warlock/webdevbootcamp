var mongoose = require("mongoose");
var Post = require("./models/post");
var User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/blog_demo");


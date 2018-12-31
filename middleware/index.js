var Campgrounds = require("../models/campground");
var Comment = require("../models/comments");
// all middleware stays here
var middlewareObj = {};


middlewareObj.isOwner = function(req, res, next){
    if(req.isAuthenticated()){
                Campgrounds.findById(req.params.id, function(err, foundcampground){
                if(err){req.flash("error", "Campground not found"); res.redirect("back")}
                else{ 
                    if(foundcampground.author.id.equals(req.user._id)){next();}
                    else{ req.flash("error", "You don't have permission to do that"); res.redirect("back")} }
            });     
    }
   
    else{ req.flash("error", "You need to be logged in to do that"); res.redirect("back")}
   
};


middlewareObj.isCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
                Comment.findById(req.params.comments_id, function(err, foundcomment){
                if(err){res.redirect("back")}
                else{ 
                    if(foundcomment.author.id.equals(req.user._id)){next();}
                    else{req.flash("error", "You don't have permission to do that"); res.redirect("back")} }
            });     
    }
    else{req.flash("error", "You need to be logged in to do that"); res.redirect("back")}
   
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){return next();}
    
    req.flash("error", "you need to be logged in to do that!!");
    res.redirect("/login");
};

module.exports = middlewareObj;
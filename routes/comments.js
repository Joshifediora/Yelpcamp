var express = require("express");
var router = express.Router();
// {mergeParams: true}
var Campgrounds = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//=========================
//      Comment Route
//=========================

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn,function(req, res){
    Campgrounds.findById(req.params.id, function(err, campground){
        if(err){console.log(err)}
        else{res.render("comments/new",{campground: campground});
        }
    });

});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn,function(req,res){
    Campgrounds.findById(req.params.id, function(err, campground){
        if(err){console.log(err); res.redirect("/campgrounds");}
        else{Comment.create(req.body.comment, function(err, comment){
            if(err){console.log(err); res.redirect("/campgrounds")}
            else{
                //connecting author to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                
                campground.comments.push(comment);
                campground.save();
                req.flash("success", "Comment successfully added");
                res.redirect("/campgrounds/"+ campground._id);
            }
        })}
    });
});

//comments edit routes
router.get("/campgrounds/:id/comments/:comments_id/edit", middleware.isCommentOwner,function(req, res){
    Comment.findById(req.params.comments_id, function(err, foundComment){
        if(err){res.redirect("back")}
        else{res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});}
    });
    
});

//comment update route
router.put("/campgrounds/:id/comments/:comments_id", middleware.isCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updateComment){
        if(err){res.redirect("back")}
        else{res.redirect("/campgrounds/"+ req.params.id)}
    });
});

//Comment destroy route
router.delete("/campgrounds/:id/comments/:comments_id", middleware.isCommentOwner, function(req, res){
   Comment.findByIdAndRemove(req.params.comments_id, function(err){
       if(err){res.redirect("back")}
       else{req.flash("success", "Comment deleted"); res.redirect("/campgrounds/"+req.params.id)}
   });
});

//Check for User logged in
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){return next();}
//     res.redirect("/login");
// }

//check for comment ownership
// function isCommentOwner(req, res, next){
//     if(req.isAuthenticated()){
//                 Comment.findById(req.params.comments_id, function(err, foundcomment){
//                 if(err){res.redirect("back")}
//                 else{ 
//                     if(foundcomment.author.id.equals(req.user._id)){next();}
//                     else{res.redirect("back")} }
//             });     
//     }
//     else{res.redirect("back")}
   
// }


module.exports = router;
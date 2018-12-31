var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground");
var middleware = require("../middleware");


router.get("/campgrounds", function(req, res){
    
            Campgrounds.find({}, function(err, allCampgrounds){
                if(err){console.log(err)} 
                else{console.log("ok!!"); res.render("campgrounds/Index", {campgrounds: allCampgrounds, currentUser: req.user});
                }
            });
    
   
});

router.post("/campgrounds", middleware.isLoggedIn ,function(req, res){
        var place = req.body.place;
        var price = req.body.price;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        };
        var newCampground = {name: place, price: price, image: image, description: desc, author: author};
        
        Campgrounds.create(newCampground, function(err, campgrounds){
            if(err){console.log(err)}
            else{console.log(campgrounds);
                res.redirect("/campgrounds");}
        });
        // campgrounds.push(newCampground);
});

router.get("/campgrounds/new", middleware.isLoggedIn ,function(req, res){
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req,res){
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err, campgroundfound){
        if(err){console.log(err)}
        else{console.log(campgroundfound); res.render("campgrounds/show", {campgrounds: campgroundfound})}
    });
});

//Edit campground
router.get("/campgrounds/:id/edit", middleware.isOwner, function(req, res){
                Campgrounds.findById(req.params.id, function(err, foundcampground){
                    if(err){res.redirect("/campgrounds")}
                    else{ res.render("campgrounds/edit", {campground: foundcampground});}
            });     
   
});

//update campground 
router.put("/campgrounds/:id", middleware.isOwner,function(req, res){
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
        if(err){res.redirect("/campground")}
        else{res.redirect("/campgrounds/"+ req.params.id)}
    });
});
//Delete campground
router.delete("/campgrounds/:id", middleware.isOwner,function(req, res){
    Campgrounds.findByIdAndRemove(req.params.id, function(err){
        if(err){res.redirect("/campgrounds")}
        else{res.redirect("/campgrounds")}
    });
});

//Functions
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){return next();}
//     res.redirect("/login");
// }

// function isOwner(req, res, next){
//     if(req.isAuthenticated()){
//                 Campgrounds.findById(req.params.id, function(err, foundcampground){
//                 if(err){res.redirect("back")}
//                 else{ 
//                     if(foundcampground.author.id.equals(req.user._id)){next();}
//                     else{res.redirect("back")} }
//             });     
//     }
//     else{res.redirect("back")}
   
// }



module.exports = router;
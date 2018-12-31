var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var localStrategy = require("passport-local");
var passport = require("passport");
var Campgrounds = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comments");
var User = require("./models/user");
var methodOverride = require("method-override");


var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//seed database with data
//seedDB();

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/yelp_camp_v12final");
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport configuration

app.use(require("express-session")({
    secret:"Rusty the cutest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Campgrounds.create({name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80", description: "This is the best spot to take a vacation. A nice and clean environment that is safe and beautiful at night."},
//             // {name: "Salmon creek", image: "https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-0.3.5&s=d3f99e5f02b9014a8cb0d22c944f72ba&auto=format&fit=crop&w=750&q=80"},
//             // {name: "Granite hill", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&s=14948b1b6a8dd54164a0db522662e869&auto=format&fit=crop&w=750&q=80"},
//             // {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80"},
//             // {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80"},
//             // {name: "Salmon creek", image: "https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-0.3.5&s=d3f99e5f02b9014a8cb0d22c944f72ba&auto=format&fit=crop&w=750&q=80"},
//                         function(err, campgrounds){
//                         if(err){console.log(err)} else{console.log(campgrounds)}
//                     });


// var campgrounds =[
//             {name: "Salmon creek", image: "https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-0.3.5&s=d3f99e5f02b9014a8cb0d22c944f72ba&auto=format&fit=crop&w=750&q=80"},
//             {name: "Granite hill", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&s=14948b1b6a8dd54164a0db522662e869&auto=format&fit=crop&w=750&q=80"},
//             {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80"},
//             {name: "Salmon creek", image: "https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-0.3.5&s=d3f99e5f02b9014a8cb0d22c944f72ba&auto=format&fit=crop&w=750&q=80"},
//             {name: "Granite hill", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&s=14948b1b6a8dd54164a0db522662e869&auto=format&fit=crop&w=750&q=80"},
//             {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80"},
//             {name: "Mountain Goat's rest", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80"},
//             {name: "Salmon creek", image: "https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-0.3.5&s=d3f99e5f02b9014a8cb0d22c944f72ba&auto=format&fit=crop&w=750&q=80"},
//         ];

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);


app.listen(process.env.PORT, process.env.IP, function(){console.log("Yelp server is up and running!!!")});
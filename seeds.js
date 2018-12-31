var mongoose = require("mongoose");
var Campgrounds = require("./models/campground");
var Comment = require("./models/comments");

var data = [
    {name:"pumpey",
    image:"https://images.unsplash.com/photo-1477574901123-6b1db202feff?ixlib=rb-0.3.5&s=d3f99e5f02b9014a8cb0d22c944f72ba&auto=format&fit=crop&w=750&q=80",
    description:"If you need a place that is quite and calm. This is it! It is located in an area rich in culture and history. The tents are shapped like traditional indian tents as seen in old cowboy movies. Due to the location it is advisable to stay as close to the tent as possible since there have been sightings of wild wolves and a bear on one occassion. This is indeed a nice place to have a quite family camp and get a feel of the countryside and experience what it was like at the wild west days."},
    
    {name:"Barren",
    image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&s=14948b1b6a8dd54164a0db522662e869&auto=format&fit=crop&w=750&q=80",
    description:"Located in a forest location. This camp site is very beautiful and is known to have a wonderful feeling especially in the morning. Wake up to the beautiful singing of birds and watch as harmless friendly animals play and run around. The sunset at night is a sight to see as the light seeps between trees. Watch out for wild animals at night. Its safe to be close to camp and the fire when it gets late."},
    
    {name:"Flanked",
    image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=750&q=80",
    description:"This is a mountain region and is lovely to be in at all times. From the mountain top you can view all the way down the hills and watch the flowing river at the bottom of the mountain. Be warned though, it gets really cold at night so be sure to carry along warm clothing and blankets for a nice tuck in at night. Bears have been sighted rampaging tents and attacking campers at this location on several occassions(Lol. Just kidding). For sure you will have a good time here."}
];

function seedDB(){
            
            Campgrounds.remove({}, function(err){
            if(err){console.log(err)} else{console.log("camgrounds removed !")}
            
            data.forEach(function(seed){
            Campgrounds.create(seed, function(err, campground){
             if(err){console.log(err)}else{console.log("new campground added!!");
                 //add new comment
                 Comment.create({
                     author: "Jobagins",
                     text: "crazy to see all types and forms of campgrounds on this Yelpcamp site. lol"
                 }, function(err, comment){if(err){console.log(err)}else{console.log("comment created!!");
                                                                  campground.comments.push(comment);
                                                                  campground.save();

                 }});
             }
            });
        });
    });
}



module.exports = seedDB;

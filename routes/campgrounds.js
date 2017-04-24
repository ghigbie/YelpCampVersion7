const express = require(express),
      router  = express.Router();

const Campground = require("../models/campground");
      
//INDEX - show all campgrounds
router.get("/campgrounds", (req, res) =>{
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log("THERE WAS A PROBLEM - CAMPGROUNDS");
            console.log(err);
        }else{
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });
});

//CREATE - add new campground to DB
router.post("/", (req, res)=> {
    //get form data
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //creates new campground
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log("THERE WAS AN ERROR - POST CAMPGROUNDS");
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create a new campground
router.get("/new", (req, res)=>{
   res.render("campgrounds/new"); 
});


//SHOW - shows more information about one campground - this needs to be positoned AFTER "/campgrounds/new"
router.get("/:id", (req, res) => {
   Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
       if(err){
           console.log("THERE WAS A PROBLEM - CAMPGROUNDS/:ID");
           console.log(err);
       }else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campground: foundCampground});
       }
   }); 
});

module.exports = router;
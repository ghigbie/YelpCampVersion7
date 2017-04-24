const express = require("express"),
      router  = express.Router();

const Campground = require("../models/campgrounds"),
      Comment    = require("../models/comments");

// ======================
// COMMENTS ROUTE
// ======================
router.get("/new", isLoggedIn, (req, res) =>{
   //find campground by id
   Campground.findById(req.params.id, (err, campground) => {
       if(err){
           console.log(err);
       }else{
          res.render("comments/new", {campground: campground});
       }
   });
});

router.post("/", isLoggedIn, (req, res) => {
    //lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.commet);
            Comment.create(req.body.comment, (err, comment) => { //create a new comment
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment); //connect new commet to campground
                    campground.save();
                    res.redirect("/campgroounds/" + campground._id); //redirect campground show page
                }
            });
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    res.redirect("/login");
}

module.exports = router;
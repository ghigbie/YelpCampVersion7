const express  = require("express"),
      router   = express.Router(),
      passport = require("passport");
      
const User = require("../models/user");
      
      
//Landing Page
router.get("/", (req, res) =>{
    res.render("landing");
});

//=============
//AUTH ROUTES
//=============

//show register form
router.get("/register", (req, res) => {
   res.render("register"); 
});

//handle sign-up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log("THERE WAS A PROBLEM WITH POST /register");
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () =>{
            res.redirect("/campgrounds");
        });
    });
});
    
//show login form
router.get("/login", (req, res) => {
       res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    res.redirect("/login");
}

//logout route
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

router.get("*", (req, res) => {
    res.render("notfound"); 
});

module.exports = router;
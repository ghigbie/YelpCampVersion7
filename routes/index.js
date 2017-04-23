
//=============
//AUTH ROUTES
//=============

//show register form
app.get("/register", (req, res) => {
   res.render("register"); 
});

//handle sign-up logic
app.post("/register", (req, res) => {
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
app.get("/login", (req, res) => {
       res.render("login"); 
});

//handling login logic
app.post("/login", passport.authenticate("local",
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
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

app.get("*", (req, res) => {
    res.render("notfound"); 
});

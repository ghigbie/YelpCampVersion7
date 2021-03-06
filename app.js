const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local");
      
const Campground  = require("./models/campground"),
      Comment     = require("./models/comment"),
      User        = require("./models/user"),
      seedDB      = require("./seeds");
      
//requiring routes
const campgroundsRoutes = require("./routes/campgrounds"),
      commentsRoutes   = require("./routes/comments"),
      indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v7");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again my dog is super cute!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate comes is a method that comes with passport local mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next;
    }
    res.redirect("/login");
}

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server is up and running!"); 
});

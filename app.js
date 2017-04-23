const express       = require("express"),
      LocalStrategy = require("passport-local"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      app           = express();
      
const Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      Seeds         = require("./seeds");
      

//mongoose.connect("mongodb://localhost/yelp_camp_v7");


app.listen(process.env.PORT, process.env.IP, () => {
   console.log("Server is lisdtening..."); 
});
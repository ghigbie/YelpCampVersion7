const express       = require("express"),
      LocalStrategy = require("mongoose-local-strategy"),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      passport      = require("passport"),
      app           = express();
      
const Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      User          = require("./models/user"),
      Seeds         = require("./seeds");
      


      
      
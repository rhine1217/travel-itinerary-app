const express = require('express');
const morgan = require('morgan');
const port = 3000;
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')

// We'll need to load the env vars
require('dotenv').config()

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
require('./config/passport');

// view engine setup
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( methodOverride('_method') );

// Add session middleware here
app.use(session({
  secret: 'bm9T5PShhYP9axr9',
  resave: false,
  saveUninitialized: true
}));

// Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());

// require and use our routes

/*
const indexRoutes = require('./routes/index');
const studentsRoutes = require('./routes/students');

app.use('/', indexRoutes);
app.use('/', studentsRoutes);

*/

app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});

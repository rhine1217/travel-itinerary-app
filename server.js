const express = require('express');
const port = 3000;
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan');
const methodOverride = require('method-override')

// load the env vars
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
app.use(methodOverride('_method'));

// Add session middleware here
app.use(session({
    store: new MongoStore({ url: process.env.DATABASE_URL}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 2 } // 2 weeks 
}));

// Add passport middleware here
app.use(passport.initialize());
app.use(passport.session());

// require and use our routes

const indexRoutes = require('./routes/index');
const tripRoutes = require('./routes/trip');
const placeRoutes = require('./routes/places');

app.use('/', indexRoutes);
app.use('/trips', tripRoutes);
app.use('/places', placeRoutes);

app.listen(port, () => {
  console.log(`Express is listening on port:${port}`);
});

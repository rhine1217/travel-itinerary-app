const router = require('express').Router();
const tripCtrl = require('../controllers/trips');

// /trips

router.get('/', isLoggedIn, tripCtrl.index); // show all trips
router.get('/new', isLoggedIn, tripCtrl.newTrip) // render the page for 'plan a new trip'
router.post('/add', isLoggedIn, tripCtrl.addTrip) // add a new trip to the database and redirect to the trip details page
router.get('/:id', isLoggedIn, tripCtrl.showTrip) // show the trip details (with the trip:id)
router.post('/:id', isLoggedIn, tripCtrl.updateTrip) // update the trip details in the database 
router.delete('/:id', isLoggedIn, tripCtrl.delTrip) // delete the trip in the database

router.get('/getlatlng/:id', isLoggedIn, tripCtrl.showTripLatLng) // return the trip's geocode

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;

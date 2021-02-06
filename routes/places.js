const router = require('express').Router();
const placeCtrl = require('../controllers/places');

// /places

// router.get('/', isLoggedIn, tripCtrl.index); // show all places
router.get('/new/:id', isLoggedIn, placeCtrl.newPlace) // render the page for 'add a new place' fpr a specific trip
router.post('/add', isLoggedIn, placeCtrl.addPlace) // add new places to the database
// router.get('/:id', isLoggedIn, tripCtrl.showTrip) // show the trip details (with the trip:id)
// router.post('/:id', isLoggedIn, tripCtrl.updateTrip) // update the trip details in the database 
// router.delete('/:id', isLoggedIn, tripCtrl.delTrip) // delete the trip in the database

router.post('/search', isLoggedIn, placeCtrl.placeSearch) // search places for a particular trip

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;

const Trips = require('../models/trip')

module.exports = {
    index,
    newTrip,
    addTrip,
    showTrip,
    updateTrip,
    delTrip,
}

function index(req, res) {

    Trips.find({ createdBy: req.user.id}).exec((err, userTrips) => {
    
        if (err) return console.log(err);
      
        const context = {
          trips: userTrips,
        }
        
        res.render('trips/index', context)
      })
  }

function newTrip(req, res) {

    res.render('trips/new')

}


function addTrip(req, res) {
    // grab the req. body data of start/end date, and destinations
    // create a new trip { sDate, eDate, destinations from the form. autopopulate the name (can be edited later. createdBy - use the current user's userId. )}
    
    const newTripInfo = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        destination: req.body.destination,
        createdBy: req.user.id,
        stops: [],
    }

    Trips.create(newTripInfo, (err, newTrip) => {
        if (err) return console.log(err)
        res.redirect(`/trips/${newTrip._id}`)
    })

}

function showTrip(req, res) {

    Trips.findById(req.params.id, (err, foundTrip) => {
        if (err) return console.log(err)

        const context = {
            trip: foundTrip
        }
        
        res.render('trips/show', context)
    } )
}

function updateTrip(req, res) {

    return

}

function delTrip(req, res) {
    // find the CreatedBy User. remove from their trips array 
    // remove this trip. 
    return
}


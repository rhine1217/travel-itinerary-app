const Trip = require('../models/trip')

module.exports = {
    index,
}

function index(req, res) {
    // show User Profile on a page? 
}


function newTrip(req, res) {

    // render the plan a new trip page
}


function addTrip(req, res) {
    // grab the req. body data of start/end date, and destinations
    // create a new trip { sDate, eDate, destinations from the form. autopopulate the name (can be edited later. createdBy - use the current user's userId. )}

}


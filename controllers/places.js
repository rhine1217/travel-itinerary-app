const Places = require('../models/place')
const Trips = require('../models/trip')
const fetch = require('node-fetch')

module.exports = {
    index,
    addPlace,
    newPlace,
    // updatePlace,
    // delPlace
    getLatLng,
}

function index(req, res) {
    return

}

function newPlace(req, res) {

        const context = {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            currLink: 'yourTrips',
            user:req.user
        }

        res.render('places/new', context)
    }

function addPlace(req, res) {
    return

}

function getLatLng(req, res) {

    Trips.findById(req.params.id, (err, foundTrip) => {
        const context = {
            tripLat: foundTrip.latLng[0],
            tripLng: foundTrip.latLng[1],
        }
        res.send(context)
    })

}

// function updatePlace(req, res) {
//     return

// }

// function delPlace(req, res) {
//     return

// }




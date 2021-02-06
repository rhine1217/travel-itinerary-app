const Places = require('../models/place')
const Trips = require('../models/trip')
const fetch = require('node-fetch')

module.exports = {
    index,
    addPlace,
    newPlace,
    // updatePlace,
    // delPlace
    // getLatLng,
    placeSearch,
}

function index(req, res) {
    return

}

function newPlace(req, res) {

    Trips.findById(req.params.id, (err, foundTrip) => {
        const context = {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            currLink: 'savedPlaces',
            user:req.user,
            trip: foundTrip,
        }
    
        res.render('places/new', context)
    })
}
function addPlace(req, res) {
    return

}

// function getLatLng(req, res) {

//     Trips.findById(req.params.id, (err, foundTrip) => {
//         const context = {
//             tripLat: foundTrip.latLng[0],
//             tripLng: foundTrip.latLng[1],
//         }
//         res.send(context)
//     })

// }

// function updatePlace(req, res) {
//     return

// }

// function delPlace(req, res) {
//     return

// }

function placeSearch(req, res) {

    console.log(req.body)

    Trips.findById(req.body.tripId, (err, foundTrip) => {

        const placeSearchParams = {
            output: 'json',
            key: process.env.GOOGLE_API_KEY, 
            input: req.body.keyword,
            inputtype: 'textquery',
            fields: 'formatted_address,name,geometry,types,photos,place_id',
            locationbias: `circle:20000@${foundTrip.latLng[0]},${foundTrip.latLng[1]}`,
            type: req.body.placeType,
        }
        
        placeSearchApiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeSearchParams.input}&inputtype=${placeSearchParams.inputtype}&fields=${placeSearchParams.fields}&locationbias=${placeSearchParams.locationbias}&key=${placeSearchParams.key}`

        if (placeSearchParams.type !== '') { 
            placeSearchApiUrl += `&type=${placeSearchParams.type}` 
        }

        console.log(placeSearchApiUrl) // to remove

        fetch(placeSearchApiUrl)
        .then(placeSearchResponse => placeSearchResponse.json())
        .then(placeSearchResponse => {

            res.send( {places: placeSearchResponse.candidates } )

        })
    })
}


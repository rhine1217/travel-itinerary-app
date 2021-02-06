const Places = require('../models/place')
const Trips = require('../models/trip')
const fetch = require('node-fetch')

module.exports = {
    index,
    addPlace,
    newPlace,
    // updatePlace,
    // delPlace
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
    console.log(req.body)

    const newDataEntries = []
    const tripId = req.body.tripId

    for (const [key, value] of Object.entries(req.body)) {
        if (key === 'tripId') {
            continue
        } else {
            const newPlaceInfo = {
                name: value.name,
                address: value.formatted_address,
                googlePlaceId: value.place_id,
                types: value.types,
                googleUrl: value.placeUrl,
                latLng: {
                    lat: value.geometry.location.lat,
                    lng: value.geometry.location.lng,
                },
            }

            newDataEntries.push(newPlaceInfo)
        }
    }

    Places.insertMany(newDataEntries, function(error, places) {
        if (error) return console.log(error)
        Trips.findById(tripId, function(err, foundTrip) {
            places.forEach(place => {
                const newStop = {
                    placeId: place._id,
                    date: new Date(0),
                }
                foundTrip.stops.push( newStop )
                foundTrip.save(function(err) {
                    if(err) return console.log(err)
                })
            })

            res.redirect(`/trips/${tripId}`)

        })
    })


}

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
            query: req.body.keyword,
            fields: 'formatted_address,name,geometry,types,photos,place_id',
            location: `${foundTrip.latLng[0]},${foundTrip.latLng[1]}`,
            radius: '20000',
            type: req.body.placeType,
        }
        
        placeSearchApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeSearchParams.query}&fields=${placeSearchParams.fields}&location=${placeSearchParams.location}&key=${placeSearchParams.key}`

        if (placeSearchParams.type !== 'all') { 
            placeSearchApiUrl += `&type=${placeSearchParams.type}` 
        }

        console.log(placeSearchApiUrl) // to remove

        fetch(placeSearchApiUrl)
        .then(placeSearchResponse => placeSearchResponse.json())
        .then(placeSearchResponse => {
            console.log(placeSearchResponse) // to remove
            res.send( {places: placeSearchResponse.results } )

        })
    })
}


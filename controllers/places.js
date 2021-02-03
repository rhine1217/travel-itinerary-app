const Place = require('../models/place')
const nodeFetch = require('node-fetch')

module.exports = {
    index,
    addPlace,
    // updatePlace,
    // delPlace
}

function index(req, res) {
    return

}

function addPlace(req, res) {
    return

}

// function updatePlace(req, res) {
//     return

// }

// function delPlace(req, res) {
//     return

// }



function getLatLang(destination) {

    const geocodeApiUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${destination}`

    fetch(geocodeApiUrl)
        .then( res => {
            console.log(res.results[0].latLng)
        })

}

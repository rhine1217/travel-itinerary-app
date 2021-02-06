const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({ // Google Places API data fields listed in comments
    name: String, // name
    address: String, // formatted address 
    googlePlaceId: String, // place_id 
    types: Array, // types
    photos: String, // photo_reference
    googleUrl: String, // Google Url
    latLng: Array, // geometry.location.lat, geometry.location.lng
  }, {
    timestamps: true
  });
  
module.exports = mongoose.model('Place', placeSchema)
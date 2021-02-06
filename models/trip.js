const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
    startDate: Date,
    endDate: Date,
    destination: String,
    stops: Array,  // [ { placeId, date }]
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    headerPic: String, // url to an Unsplash image
    latLng: Array, // [Lat, Lng]
  }, {
    timestamps: true
  });
  
module.exports = mongoose.model('Trip', tripSchema)
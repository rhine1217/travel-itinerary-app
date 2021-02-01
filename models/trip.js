const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tripSchema = new Schema({
    startDate: Date,
    endDate: Date,
    destination: String,
    stops: Array,  // [ { place_id (string) : date }]
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, {
    timestamps: true
  });
  
module.exports = mongoose.model('Trip', tripSchema)
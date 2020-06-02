const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

const Location = new Schema({
   
    id: String,
    latitude: Number,
    longitude: Number,
    addressLine: String,
    addressLine2: String

}, {timestamps: true})

module.exports = mongoose.model('Location', Location)

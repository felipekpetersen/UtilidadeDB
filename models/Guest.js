const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

const Guest = new Schema({
    name: {
        type: String,
    },
    email: String,

}, {timestamps: true})

Guest.plugin(autopopulate);
module.exports = mongoose.model('Guest', Guest)
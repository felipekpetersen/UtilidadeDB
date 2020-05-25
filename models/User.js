const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    id: String,
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        autopopulate: true
    }]

}, {timestamps: true})

User.plugin(autopopulate);
module.exports = mongoose.model('User', User)
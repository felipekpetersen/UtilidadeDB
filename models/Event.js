const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

const Event = new Schema({
    ownerId: {
        type: String,
        required: true
    },
    ownerName: String, 
    name: String,
    id: String,
    color: String,
    date: Date, 
    shoppingListName: String,
    shoppingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingList',
        autopopulate: true
    }], 
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        autopopulate: true
    }

}, {timestamps: true})

Event.plugin(autopopulate);
module.exports = mongoose.model('Event', Event)

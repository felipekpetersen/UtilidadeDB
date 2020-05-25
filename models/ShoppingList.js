const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

const ShoppingList = new Schema({
    itemName: String,
    whoBrings: String

}, {timestamps: true})

module.exports = mongoose.model('ShoppingList', ShoppingList)

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autopopulate = require('mongoose-autopopulate');

const Teste = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    

}, {timestamps: true})

module.exports = mongoose.model('Teste', Teste)

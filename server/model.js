const mongoose = require('mongoose')
const { config } = require('../config')

mongoose.connect(config.DB_URI)

const Schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    saved_passwords:Array,
})

const model = mongoose.model('users',Schema)

module.exports = { model }
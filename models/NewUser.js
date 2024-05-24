const mongoose = require('mongoose')
const NewUserSchema = new mongoose.Schema ({
    name: String, 
    email: String,
    password: String,
})

const NewUser = mongoose.model('NewUsers', NewUserSchema)

module.exports = NewUser
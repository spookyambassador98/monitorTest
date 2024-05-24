const mongoose = require('mongoose')

const BugsSchema = new mongoose.Schema ({
    title: String,
    name: String,
    department: String,
    severity: String,
    description: String,
    Ip: String,
    date: String,
})

const Bug = mongoose.model('Bugs', BugsSchema)

module.exports = Bug
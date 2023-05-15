const mongoose = require("mongoose")

const trainSchema = new mongoose.Schema({
    SeatNumber: { type: Number, index: true },
    Booked: { type: Boolean, default: false }
})

const trainModel = mongoose.model('SeatStatus', trainSchema)

module.exports = trainModel
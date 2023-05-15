const trainModel = require('../models/trainSchema')

const trainController = {}

//To initialize all seats of train

trainController.createSeat = async (req, res) => {
    for(var i=1; i <= 80; i++){
        try {
            await trainModel.create({ SeatNumber: i })
        }
        catch(e){
            throw new Error(e)
        }
    }
    res.json({ "message": "Seats are Created" })
}

//To book seat of train route

trainController.bookSeat = async (req, res) => {
    const totalSeats = req.body.totalSeats

    try {
        if(totalSeats>7){
            return res.json({ "Error": "Number of seats should not be more than 7" })
        }
    
        var count = 0
        var empty = []
        var emptySeats = []
        for(var i = 0;i <= 11; i++){
            emptySeats[i] = []
        }
        var k = 0
        for(var i=1;i<=80;i++){
            const seat = await trainModel.findOne({ SeatNumber: i, Booked: false })
            if(seat) {
                count++
                emptySeats[k].push(i)
            }
            if(i%7 == 0){
                empty.push(count)
                count = 0
                k++
            }
        }
        if(count == 0){
            return res.json({ "Error": "All Seats are booked" })
        }
        empty.push(count)
    
        var dist
        var minDist = 100
        var avalSeats
        var bookedSeats = []
    
        for(var i = 0;i < empty.length; i++){
            var count = totalSeats
            dist = 0
            avalSeats = []
            if(minDist == 0) break
            for(var j = i; j < empty.length; j++){
                if(dist > minDist) break
                if(j!=i) dist++
                if(empty[j] == 0) {
                    continue
                }
                if(empty[j] >= count){
                    for(var k = 0; k < count; k++){
                        avalSeats.push(emptySeats[j][k])
                    }
                    minDist = dist
                    bookedSeats = avalSeats
                    break
                }
                else{
                    count-=empty[j]
                    for(var k = 0; k < emptySeats[j].length; k++){
                        avalSeats.push(emptySeats[j][k])
                    }
                }
            }
        }
    
        for(var i=0; i < bookedSeats.length; i++){
            await trainModel.findOneAndUpdate({ SeatNumber: bookedSeats[i] }, { Booked: true })
        }
    
        res.status(201).json({ "message": "Seats Booked" , "data": bookedSeats })
    }
    catch(e){
        throw new Error(e)
    }

   

}

//To delete all seats of train

trainController.deleteSeats = async (req, res) => {
    try {
        await trainModel.deleteMany({})
        res.json({ "message": "Seats are deleted" })
    }
    catch(e){
        throw new Error(e)
    }
}

// To get seats which are booked

trainController.allSeats = async (req, res) => {
    try {
        const seats = await trainModel.find({ Booked: true })
        return res.json({ "message": "All Seats", "data": seats })
    }
    catch(e){
        throw new Error(e)
    }
}
module.exports = trainController
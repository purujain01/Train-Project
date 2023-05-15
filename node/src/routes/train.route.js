const express = require("express")
const router = express.Router()
const trainController = require('../controller/train.controller')

router.get('/healthCheck', (req, res) => { res.json({ "message": "Working" })})
router.get('/createSeat', trainController.createSeat)
router.post('/bookSeat', trainController.bookSeat)
router.get('/allSeats', trainController.allSeats)
router.delete('/deleteSeats', trainController.deleteSeats)

module.exports = router
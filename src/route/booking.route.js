const express = require('express');
const router = express.Router();
const bookingController = require("../controller/booking.controller");
const verifyOwner = require('../middleware/verifyOwner');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyIsAdmin')

router.post("/",verifyToken, bookingController.createBooking);
router.get("/",verifyToken,verifyAdmin,bookingController.getBookings);
router.get("/travel",verifyToken,bookingController.getMyTravel);
router.get("/me",verifyToken,verifyOwner, bookingController.getMyBooking);
router.put("/:id/:status",verifyToken,verifyOwner,bookingController.updateBooking);

module.exports = router;
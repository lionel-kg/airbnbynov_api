const express = require('express');
const router = express.Router();
const placeController = require("../controller/place.controller");
const verifyOwner = require('../middleware/verifyOwner');
const verifyToken = require('../middleware/verifyToken');


router.post("/",verifyToken ,verifyOwner , placeController.createPlace);
router.get("/", placeController.getPlaces);
router.get("/me",  verifyToken, placeController.getMyPlaces);
router.get("/:id", placeController.getPlace);
router.get("/me/:id",  verifyToken, verifyOwner , placeController.getMyPlace);
router.put("/me/:id",  verifyToken, verifyOwner , placeController.updateMyPlace);
router.delete("/me/:id",  verifyToken, verifyOwner , placeController.deleteMyPlace);
router.get("/filter/places",placeController.filterPlace);
router.get("/search/places",placeController.searchPlace);






module.exports = router;
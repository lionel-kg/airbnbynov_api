const express = require('express');
const router = express.Router();
const typePlaceController = require("../controller/typePlace.controller");
const verifyAdmin = require('../middleware/verifyIsAdmin');
const verifyToken = require('../middleware/verifyToken');

router.get("/",typePlaceController.getTypes);
router.delete("/:id",verifyToken,verifyAdmin ,typePlaceController.deleteType);
router.put("/:id",verifyToken,verifyAdmin ,typePlaceController.updateType);



module.exports = router;
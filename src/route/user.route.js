const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const  verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyIsAdmin");
const {checkBody, checkBodyUpdate, checkIdentity, validation} = require('../middleware/verifyBody');


router.get("/all", verifyToken, verifyAdmin ,userController.getAll);

router.get("/", verifyToken, userController.getById);

router.put("/",checkBodyUpdate, checkIdentity,validation, verifyToken, userController.updateUser)

router.delete("/:id", userController.deleteOneUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require("../controller/auth/auth.controller");
const {checkBody , checkIdentity ,validation} = require('../middleware/verifyBody');
const verifyToken = require('../middleware/verifyToken');

router.post("/register",checkBody,checkIdentity,validation, authController.register);
router.post("/login", authController.login);
router.get("/refreshLogin",verifyToken,authController.refreshLogin);

module.exports = router;
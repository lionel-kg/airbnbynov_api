const express = require('express');
const router = express.Router();
const authController = require("../controller/auth/auth.controller");
const {checkBody , checkIdentity ,validation} = require('../middleware/verifyBody');

router.post("/register",checkBody,checkIdentity,validation, authController.register);
router.post("/login", authController.login);

module.exports = router;
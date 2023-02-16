const jwt = require("jsonwebtoken");

function verifyOwner(req, res, next){
    if(req.userToken.UserType !== "OWNER"){
        return res.status(401).send({
            auth: false,
            token: null,
            message: "You must be an owner"
        })
    }
    next();
}

module.exports = verifyOwner;
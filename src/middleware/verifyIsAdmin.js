const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next){
    if(!req.userToken.isAdmin){
        return res.status(401).send({
            auth: false,
            token: null,
            message: "You must be an admin"
        })
    }
    console.log(req.userToken.isAdmin)
    next();
}

module.exports = verifyAdmin;
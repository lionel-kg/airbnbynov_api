const User = require("../../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt    = require('jsonwebtoken');
const {signToken} = require("../../tools/tools");


exports.register =  (req,res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword
    if(req.body.UserType !== undefined) {
      if(req.body.UserType === false){
        req.body.UserType = "CUSTOMER";
      } else if (req.body.UserType === true) {
        req.body.UserType = "OWNER";
      }
    }
    /*const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });*/
    User.create(req.body).then((user)=>{
        var userToken =  signToken({user_id: user._id,isAdmin: user.isAdmin,UserType: user.UserType} , process.env.JWT_SECRET);
        return res.send({
            message: "created successfully",
            token: userToken
        });
    }).catch(err=> {
        return res.status(404).send(err)
    })
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found",
            auth: false
          })
        }
        let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
          return res.status(401).send({
            message: "password not valid",
            auth: false
          })
        }
        const userToken = signToken({
          id: user._id,
          isAdmin: user.isAdmin,
          UserType: user.UserType
        }, process.env.JWT_SECRET)

        return res.send({
          auth:true,
          message:"User logged",
          token: userToken
        })
  
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  }

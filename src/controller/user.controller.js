const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt    = require('jsonwebtoken');




exports.updateUser =  (req,res,next)=>{
    let update = req.body;
    User.findByIdAndUpdate({_id: req.userToken.id},update,{new: true})
    .then((result)=>{
        if (!result) {  
            return res.status(404).send({
                message: "User not found"
            })
        }
        res.json(result)
    }).catch(err => {next(err)} )
}

exports.getAll =  (req,res)=>{
    User.find({})
    .then((result)=>{
        return res.json(result)
    }).catch(err => res.status(404).send(err))
}

exports.getById =  (req,res)=>{
    User.findById({_id: req.userToken.id}) 
    .then((result)=>{
        if(!result){
            return res.status(404).send({
                message: "User not found"
            })
        }
        return res.json(result)
    }).catch(err => res.status(404).send(err))
}

exports.deleteOneUser = (req,res)=>{
    var id = req.params["id"];
    User.findByIdAndDelete({_id: id}) 
    .then((result)=>{
        return res.send({message: `user with id ${result._id} successfully delete`})
    }).catch(err => {return res.status(404).send(err)})
} 
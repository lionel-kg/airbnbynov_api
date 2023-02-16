const User = require("../model/user.model");
const Place = require("../model/place.model");
const typeModel = require("../model/type.model");

exports.createType = (req,res) => {
    const newType = new typeModel({
        title: req.body.title,
    })
    newType.save().then((typePlace)=> {
        return res.send({
            message: "create successfully",
            typePlace: typePlace
        })
    }).catch((err)=>{
        return res.status(404).send(err);
    })
}

exports.deleteType = (req, res) => {
     var id = req.params.id;
     typeModel.findOneAndDelete({_id: id})
     .then((result)=>{
        return res.send({message: `typePlace with id ${result._id} successfully delete`})
    }).catch ((err) => {
        res.status(400).send(err)
     })
} 

exports.updateType = (req, res) => {
    var id = req.params.id;
    var payload = req.body;
    typeModel.findByIdAndUpdate({_id: id},payload,{new: true})
    .then((type) => {
       res.send(type);
    }).catch ((err) => {
       res.status(400).send(err)
    })
} 

exports.getTypes = (req, res) => {
    typeModel.find().then((typePlace) => {
        res.send(typePlace);
    }).catch((err)=>{
        res.status(400).send(err)
    })
}
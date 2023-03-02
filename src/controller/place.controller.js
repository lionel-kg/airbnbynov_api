const User = require("../model/user.model");
const Place = require("../model/place.model");
const typeModel = require("../model/type.model");
const { response } = require("express");
const { param } = require("../route");

exports.createPlace = (req,res) => {
    // const newType = new typeModel({
    //     title: "petite maison",
    // })
    // const user = new User({});
    // const newPlace = new Place({
    //     title: req.body.title,
    //     type: newType,
    //     owner: user,
    //     pricePerDay: req.body.pricing.perDay,
    //     image: req.body.image,
    //     capacity: req.body.capacity,
    //     description: req.body.description,
    //     address: req.body.address
    // });
    //console.log(newPlace,req.body.pricing.perDay);
    req.body.owner = req.userToken.id;
    Place.create(req.body).then((place)=> {
        User.findByIdAndUpdate({_id: req.userToken.id},{$push: {places: place}},{new: true}).then((user) => {
            // console.log(user)

        }).catch ((err) => res.status(400).send(err));
        return res.send({
            message: "create successfully",
            place: place
        })
    }).catch((err)=>{
        return res.status(404).send(err);
    })
}

exports.getPlaces = (req, res) => {
    Place.find().populate("owner").then(
      (places) => res.send(places))
      .catch(err => res.status(400).send(err))
  }

  exports.getPlace = (req, res) => {
    Place.findById(req.params.id).then((place)=>{
        res.send(place)
    }).catch((err)=> {
        res.status(400).send(err);
    })
}


exports.getMyPlaces = (req, res) => {
    User.findById(req.userToken.id).populate('places').then((user)=>{
        res.send(user.places)
    }).catch((err)=> {
        res.status(400).send(err);
    })
}

exports.getMyPlace = (req, res) => {
    User.findById(req.userToken.id).populate('places').then((user)=>{
        user.places.forEach(place => {
            if(place._id.toString() === req.params.id) {
                res.send(place)
            }
        });
    }).catch((err)=> {
        res.status(400).send(err);
    })
}

exports.updateMyPlace = (req, res) => {
    var update = req.body;
    User.findById(req.userToken.id).populate('places').then((user)=>{
        if(user.places !== null && user.places.length > 0) {
        user.places.forEach(place => {
            var id = place._id.toString();
            if( id === req.params.id) {
                Place.findByIdAndUpdate({_id: id},update,{new: true} )
                .then((newPlace) => { 
                    return res.send(newPlace); 
                })
            } 
        });
    } else {
        return res.status(400).send({err: "places not found"});
    }
    }).catch((err)=> {
        res.status(400).send(err);
    })
}

exports.deleteMyPlace = (req, res) => {
    let isBelongs = false;
    User.findById(req.userToken.id).populate('places').then((user)=>{
        if(user.places !== null && user.places.length > 0) {
            arrayPlaces = user.places.filter((place) => {
                if (place._id.toString() !== req.params.id) {
                  return place;
                } 
            });
            user.places.forEach(place => {
                var id = place._id.toString();
                if( id === req.params.id) {
                    isBelongs = true;
                    Place.findById({_id: id})
                    .then((result)=>{
                        user.places = arrayPlaces;
                        result.remove();
                        user.save((newUser)=>{
                            // console.log(newUser)
                        });
                        return res.send({message: `place with id ${result._id} successfully delete`})
                    })
                } 
            });
        } else {
            return res.status(400).send({err: "places not found"});
        }
    }).catch((err)=> {
        return res.status(400).send(err);
    })


}

exports.searchPlace = (req,res) =>{
    Place.find({$or: [{title:{$regex: req.query.name,$options: "i"}},{description:{$regex: req.query.name,$options: "i"}}]}).then((place)=> {
        res.send(place);
    }).catch((err)=> {
        return res.status(400).send(err);
    })
}

exports.filterPlace = async (req,res) =>{
    let params = req.query;
    let filter = {};
    const price_min = params.price_min !== undefined ? parseInt(params.price_min) : null;
    const price_max = params.price_max !== undefined ? parseInt(params.price_max) : null;
    const capacity_min = params.capacity_min !== undefined  ? parseInt(params.capacity_min) : null;
    const capacity_max =  params.capacity_max !== undefined ? parseInt(params.capacity_max) : null;
    if( price_min !== null && price_max !== null){
        filter["pricing.perDay"] = {$gte: price_min, $lte: price_max};
    } 
    if( capacity_min !== null && capacity_max !== null){
        filter.capacity = {$gte: capacity_min, $lte: capacity_max};
    } 
    if (params.type !== undefined && params.type !== null && params !== "") {
        filter.type = params.type;
    }
    Place.find(filter).then((place)=> {
        res.send(place);
    }).catch((err)=> {
        return res.status(400).send(err);
    })
}



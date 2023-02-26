const User = require("../model/user.model");
const Place = require("../model/place.model");
const Booking = require("../model/booking.model");
const { response } = require("express");
const { param } = require("../route");

exports.createBooking = (req,res) => {
    req.body.customer = req.userToken.id;
    Booking.create(req.body).then((booking)=> {
        User.findByIdAndUpdate({_id: req.userToken.id},{$push: {travel: booking}},{new: true}).then((traveler) => {
            console.log(traveler)
        }).catch ((err) => res.status(400).send(err));
        User.findByIdAndUpdate({_id: req.body.owner},{$push: {booking: booking}},{new: true}).then((owner) => {
            console.log(owner)
        }).catch ((err) => res.status(400).send(err));
        return res.send({
            message: "create successfully",
            booking: booking
        })
    }).catch((err)=>{
        return res.status(404).send(err);
    })
}

exports.getBookings = (req, res)=> {
    Booking.find().then((bookings)=> {
        res.send(bookings);
    }).catch((err)=>{
        return res.status(404).send(err);
    })
}

exports.getMyBooking = (req, res) => {
    User.findById(req.userToken.id).populate('booking').then((user)=>{
        res.send(user.booking)
    }).catch((err)=> {
        res.status(400).send(err);
    })
}

exports.getMyTravel = (req, res) => {
    User.findById(req.userToken.id).populate('travel').then((user)=>{
        res.send(user.travel)
    }).catch((err)=> {
        res.status(400).send(err);
    })
}
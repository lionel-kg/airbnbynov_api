const mongoose = require("mongoose");
const placeModel = require("../model/place.model");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    UserType:{
        type: String,
        enum : ['OWNER','CUSTOMER'],
        default: 'CUSTOMER'
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Place"
    },],

    booking: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Booking"}
    ],
    travel: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Booking"}
    ]
})

userSchema.pre('remove', async function(next) {
    const places = await placeModel.find({ _id: { $in: this.places } });
    await Promise.all(places.map(place => place.remove()));
    next();
  });
module.exports = mongoose.model("User",userSchema);
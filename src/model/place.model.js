const mongoose = require("mongoose");
const bookingModel = require("./booking.model");

const placeSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        min: 2,
        max: 50
    },
    type: {
        type: mongoose.Schema.Types.ObjectId, ref: "Type"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    pricing: {
        perDay:{
            type: Number,
            required: true
        }
    },
    image : [String],

    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 1500
    },

    address: {
        city: {
            type: String,
            required: true,
            trim: true
        },
        zipCode: {
            type: Number,
            required: true,
            trim: true
        },
        street: {
            type: String,
            required: true,
            trim: true
        },
        gps:{
            long:{
                type:Number,
                required:true,
            },
            lat:{
                type:Number,
                required:true,
            }
        }
    }

})

placeSchema.pre('remove', async function () {
    const place = this;

    await bookingModel.deleteMany({ place: place._id });
});



module.exports = mongoose.model("Place", placeSchema);
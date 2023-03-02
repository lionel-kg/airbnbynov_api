const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId, ref: "Place",
        required:true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required:true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required:true,
    },
    nbTraveler: {
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum : ['WAITING','VALIDATE','DECLINE','PAID'],
        default: 'WAITING'
    },
    dateStart:{ 
        type: Date, 
        required:true,
    },
    dateEnd: {
        type: Date,
        required:true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    
})

module.exports = mongoose.model("Booking", BookingSchema);
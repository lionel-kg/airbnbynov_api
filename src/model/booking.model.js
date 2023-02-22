const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId, ref: "Place"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    status: {
        type: String,
        enum : ['WAITING','VALIDATE','DECLINE','PAID'],
        default: 'WAITING'
    },
    dateStart:{ 
        type: Date, 
    },
    dateEnd: {
        type: Date,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    
})

module.exports = mongoose.model("status", typeSchema);
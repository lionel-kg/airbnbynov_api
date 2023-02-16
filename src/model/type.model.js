const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        min: 2,
        max: 50
    },
})

module.exports = mongoose.model("Type", typeSchema);
const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    email: {
        type: String,
    },

    password: {
        type: String,
        default: "NOT SET"
    },

    username: {
        type: String,
        default: "PomoClock User"
    },

    profilePicId: {
        type: String,
        default: ""
    },

    createdAt: {
        type: Date,
        expires: "10m",
        default: Date.now
    }
    
})

module.exports = mongoose.model("User", userSchema)

const mongoose = require('mongoose');

//user schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
});


module.exports = mongoose.model("User", userSchema)
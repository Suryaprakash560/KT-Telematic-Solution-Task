
const mongoose = require('mongoose');

//employee schema 
const employeeSchema = new mongoose.Schema({
    empId: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    phoneNo: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Employee", employeeSchema)
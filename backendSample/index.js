// import express from "express";
const express = require('express');
// import cors from "cors";
// import mongoose from "mongoose";
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const employeeRoutes = require('./routes/employee');

const url = `mongodb+srv://Admin:admin%40123@admin.lxwis.mongodb.net/test`;



const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database !')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    });

app.use('/user', userRoutes);

app.use('/employee', employeeRoutes);

app.get("/",(req,res) =>{
    console.log(req.body);
    res.send("Hello guys!...., you running my backend server!!!.....")
});

app.listen(4000,()=>{
    console.log("started on port 4000");
})
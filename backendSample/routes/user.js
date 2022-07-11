const express = require('express');
const router = express.Router()

const Users = require('../models/user')




// create one
router.post('/create',async (req,res) => {
    console.log(req.body);
    const newUserJSON = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo
    })
    try {
        const newUser = await newUserJSON.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})



// login route
router.post("/login",(req,res)=>{
    const { email, password } = req.body;
    Users.findOne({email:email},(err,user)=>{
        if(user){
            if(password === user.password) {
                res.send({ message:"Login success !", detail:user })
            } else {
                res.send({ message:"Wrong credentials !"})
            }
        } else {
            res.send({ message:"User not registered !"})
        }
    })
});

module.exports = router;
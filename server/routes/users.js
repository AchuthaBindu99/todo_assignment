const express = require("express");
const users = express.Router();
const {User, validate } = require("../model/user")
const bcrypt = require("bcrypt");

users.post("/reg/" , async (req,resp) => {
    const {error} = validate (req.body);
    if(error) 
        return resp.send({
          setalert : true,
          message: error.details[0].message,
          status: false,
    });


let user = await User.findOne({userName : req.body.userName});
if(user)
    return resp.status(400).send({
       setalert : true,
       message:"User already registered",
       status: false,
})


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(req.body.password, salt)

 user = new User({userName : req.body.userName,  password:hashed});

 try{
    const data = await user.save();
    resp.send({
        setalert:true,
        message:"Registered Successfully",
        status : true,
    })
 }catch(error){
     resp.send({setalert:true, message:error.message, status:false})
 }
});

module.exports = users;
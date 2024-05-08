const express = require("express")
const auth = express.Router();
const {User,validate} = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const users = require("./users");
const config = require("config")

auth.post("/", async(req,resp) => {
    const {error} = validate(req.body);
    if(error)
        return resp.send({
              setalert : true,
              message: error.details[0].message
        })
    
    let user = await User.findOne({userName:req.body.userName});
    if(!user)
        return resp.status(400).send({
           setalert : true,
           message:"Invalid User Name or Password",
           status:false,
        });
    
    const valids = await bcrypt.compare(req.body.password, user.password)
    if(!valids)
        return resp.status(400).send({
            setalert : true,
            message:"Invalid User Name or Password",
            status:false,
    });

    const token = jwt.sign({userName:user.userName}, config.get("privateKey"))

    console.log(user.userName);
    resp.send({
        setalert:true,
        message:"Login Successful",
        userName:user.userName,
        status:true,
        token:token,
    });
});

module.exports = auth;
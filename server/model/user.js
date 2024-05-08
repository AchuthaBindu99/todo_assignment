const mongoose = require("mongoose")
const joi = require("joi");

const schema = mongoose.Schema({
    userName : { 
         type : String,
         required :true,
          unique: true, 
          minlength:5, 
          maxlength:100
        },

    password : {  
        type : String, 
        required : true,
         minlength:5, 
         maxlength:1024
        }
})

const User = new mongoose.model("User", schema);
 
function validate(body){
  const schema = joi.object({
    userName : joi.string().required().min(5).max(255),
    password : joi.string().required().min(5).max(255)
  });
  return schema.validate(body);
}
module.exports = {User,validate};
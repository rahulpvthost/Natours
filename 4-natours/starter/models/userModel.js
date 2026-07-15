const mongoose =require('mongoose');
const validator =require('validator');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell us your name!']
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide your email']
    },
    photo:String,
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password']
    }

});
const User =mongoose.model('User',userSchema);
module.exports = User;
// in this photo and password are different field photo:is short form ofphoto: String is the short form of:
// photo: {
//     type: String
// }  means it store image url that is present in string
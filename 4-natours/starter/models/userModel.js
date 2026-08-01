const mongoose =require('mongoose');
const validator =require('validator');
const bcrypt = require('bcryptjs');

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
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        select:false,
        validate:{
            //this only works on create and SAVE!
            validator:function(el){
                return el=== this.password;
            },
            message:'Passwords are not same'
        }
    }

}); 


userSchema.pre('save', async function(next){
// only run this function if  password was actually modified

if(!this.isModified('password')) return next();
//Hash the password with cost of 12
this.password = await bcrypt.hash(this.password,12);

 // Delete passwordConfirm field
this.passwordConfirm = undefined;
next();
});


userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword)
    {
    return  await bcrypt.compare(candidatePassword,userPassword);
}


const User =mongoose.model('User',userSchema);
module.exports = User;
// in this photo and password are different field photo:is short form ofphoto: String is the short form of:
// photo: {
//     type: String
// }  means it store image url that is present in string
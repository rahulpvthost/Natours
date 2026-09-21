const mongoose =require('mongoose');
const validator =require('validator');
const bcrypt = require('bcryptjs');

const crypto = require('crypto');
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
    photo:{
        type: String,
        default:'default.jpg'
    },
    role:{
         type:String,
         enum:['user','guide','lead-guide','admin'],
         default:'user'
    },
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

          // select: false tells Mongoose:

         // “Don't include active when this user is fetched normally.”

        validate:{
            //this only works on create and SAVE!
            validator:function(el){
                return el=== this.password;
            },
            message:'Passwords are not same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
        type: Boolean,
        default:true,
        select:false
    }

}); 


userSchema.pre('save', async function(){
    // only run this function if password was actually modified
    if(!this.isModified('password')) return ;

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;

});

userSchema.pre('save', function(){
    if(!this.isModified('password') || this.isNew) return ;

    this.passwordChangedAt = Date.now() - 1000;
    
});

userSchema.pre(/^find/,function(){
      //this points to current query
       this.find({active:{$ne: false }});
       
});


userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword)
    {
    return  await bcrypt.compare(candidatePassword,userPassword);
}


userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        // console.log(changedTimestamp,JWTTimestamp);
        return JWTTimestamp < changedTimestamp; //True means changed password after token was issued
    }
    //False means NOT changed
    return false;
};
userSchema.methods.createPasswordResetToken= function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    // console.log({resetToken},this.passwordResetToken);
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};

const User =mongoose.model('User',userSchema);
module.exports = User;
// in this photo and password are different field photo:is short form ofphoto: String is the short form of:
// photo: {
//     type: String
// }  means it store image url that is present in string
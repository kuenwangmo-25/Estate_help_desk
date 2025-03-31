const mongoose = require("mongoose");
const validator = require ('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate:[validator.isEmail, "invalid email"]
    },
    role:{
        type:String,
        enum:["admin","student","staff"],
    },
    password:{
        type:String,
        required:false,
        minlength:8,
        select:false,
        default: null
    },
    otp: { type: String,}, // Stores OTP
    otpExpires: { type: Date,}, // OTP expiration

    active:{
        type:Boolean,
        default:true,
        select:false,
    }
})
UserSchema.pre('save', async function (next) {
    // Check if password is being set/modified
    if (this.isModified('password')) {
        // Ensure the password isn't already hashed
        const passwordIsHashed = this.password.startsWith("$2b$12$"); // bcrypt hash starts with this
        if (!passwordIsHashed) {
            this.password = await bcrypt.hash(this.password, 12);
        }
    }
    next();
});


UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
    };
  
const User = mongoose. model('User',UserSchema)
module.exports = User;
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
        enum:["admin","student","staff","security"],
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator: function(el) {
                return el=== this.password
                },
                message: 'Passwords do not match',
            },
    },

    active:{
        type:Boolean,
        default:true,
        select:false,
    }
})
UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined
    next()
  });
  
  UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
    update.password !== undefined &&
    update.password == update.passwordConfirm) {
    // Hash the password with cost of 12
    this.getUpdate().password = await bcrypt.hash(update.password, 12)
    // // Delete passwordConfirm field
    update.passwordConfirm = undefined
    next()
    }else
    next()
    })
  
const User = mongoose. model('User',UserSchema)
module.exports = User;
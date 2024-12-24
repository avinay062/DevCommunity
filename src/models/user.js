const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

//const { Schema} = mongoose;
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //required : true
        //minLength: 3,
        //maxlength: 10,
        trim: true
    },
    lastName: {
        type: String,
        //required : true
        //minLength: 3,
        //maxlength: 10,
        trim: true
    },
    emailId: {
        type: String,
        //required : true
        unique: true,
        lowercase: true,
        maxLength: 30,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address: " + value);
            }
        }
    },
    password: {
        type: String,
        //required : true
        minLength: 8,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Invalid Password: " + value);
            }
        }
    },
    age: {
        type: Number,
        minLength: 1,
        maxlength: 3,
        trim: true,
        min: 18,
    },
    gender: {
        type: String,
        trim: true,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender value is not valid..!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "common Photo URL",
        trim: true,
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("Invalid Photo URL: " + value);
        //     }
        // }
    },
    about: {
        type: String,
        trim: true
    },
    skills: {
        type: [String],
        //required : true
    },
},
    {
        timestamps: true
    });

// ofloads creating JWT token
userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEV@COMP$05", {
        expiresIn: "7d"
    });
    return token;
};

//offloads password validation
userSchema.methods.validatePassword = async function(passwordInputByUser){
   const user = this;
   const passwordHash = user.password;

   const isPasswordvalid = await bcrypt.compare(passwordInputByUser, passwordHash);

   return isPasswordvalid;
}



//Creating user model

const User = mongoose.model("User", userSchema);

module.exports = User;

//or you can write like below as well

//module.exports = mongoose.model("User", userSchema);
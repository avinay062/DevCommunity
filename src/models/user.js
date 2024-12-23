const mongoose = require('mongoose');

//const { Schema} = mongoose;
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        //required : true
        minLength: 3,
        maxlength: 10,
        trim: true
    },
    lastName: {
        type: String,
        //required : true
        minLength: 3,
        maxlength: 10,
        trim: true
    },
    emailId: {
        type: String,
        //required : true
        unique: true,
        lowercase: true,
        maxLength: 30,
        trim: true,
    },
    password: {
        type: String,
        //required : true
        minLength: 8,
        maxlength: 12,
        trim: true
    },
    age: {
        type: Number,
        minLength: 1,
        maxlength: 3,
        trim: true,
        min: 18,
        required : true
    },
    gender: {
        type: String,
        trim: true,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender value is not valid..!")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "common Photo URL",
        trim: true
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

//Creating user model

const User = mongoose.model("User", userSchema);

module.exports = User;

//or you can write like below as well

//module.exports = mongoose.model("User", userSchema);
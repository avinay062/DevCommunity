const mongoose = require('mongoose');

//const { Schema} = mongoose;
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
});

//Creating user model

const User = mongoose.model("User", userSchema);

module.exports = User;

//or you can write like below as well

//module.exports = mongoose.model("User", userSchema);
const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect("mongodb://admin:devcompass@54.89.250.108:27017/devCommunity");
};

module.exports = connectDB;


 
const mongoose = require('mongoose');

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://avinay_node:11RCV7RUUTe7f7zT@node.m1eax.mongodb.net/devCommunity");
};

module.exports = connectDB;


 
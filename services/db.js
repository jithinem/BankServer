//server-mongodb interaction
//import mongoose
const mongoose=require('mongoose');

//state connection string via mongoose
mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true  //to avoid unwanted warnings
});

//to define a bank model
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});

module.exports={
    User
}

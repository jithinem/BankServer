//import json web token
const jwt=require('jsonwebtoken');

userDetails={
    1000:{acno:1000,username:"Amal",password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,username:"Arun",password:1001,balance:2000,transaction:[]},
    1002:{acno:1002,username:"Akshay",password:1002,balance:2000,transaction:[]}
  }

  const register=(acno,username,password)=>{
    if(acno in userDetails){
      // return false;
      return{
        status:false,
        message:"User already exist",
        statusCode:401
      }
    }
    else{
      userDetails[acno]={
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      }
      // return true;
      return{
        status:true,
        message:"Register successful",
        statusCode:200
      }
    }    
  }

  const login=(acno,pswd)=>{
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        currentUser=userDetails[acno]['username'];
        currentAcno=acno;
        const token=jwt.sign({currentAcno:acno},'superkey2023');
        return{
          status:true,
          message:"Login successful",
          statusCode:200,
          token:token
        }
      }
      else{
        return{
          status:false,
          message:"Invalid password",
          statusCode:401
        }
      }
    }
    else{
      return{
        status:false,
        message:"Invalid acno",
        statusCode:401
      }
    }
  }

  const deposit=(acno,pswd,amt)=>{
    var amount=parseInt(amt);
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        userDetails[acno]['balance']+=amount;
        userDetails[acno]['transaction'].push({
          type:'Credit',
          amount
        })
        return{
          status:true,
          message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`,
          statusCode:200
        }
      }
      else{
        return{
          status:false,
          message:"Invalid password",
          statusCode:401
        }
      }
    }
    else{
      return{
        status:false,
        message:"Invalid acno",
        statusCode:401
      }
    }
  }

  const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt);
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        if(userDetails[acno]['balance']>amount){
          userDetails[acno]['balance']-=amount;
          userDetails[acno]['transaction'].push({
            type:'Debit',
            amount
          })
          return{
            status:true,
            message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`,
            statusCode:200
          }
        }
        else{
          return{
            status:false,
            message:"Insufficient balance",
            statusCode:401
          }
        }
      }
      else{
        return{
          status:false,
          message:"Invalid password",
          statusCode:401
        }
      }
    }
    else{
      return{
        status:false,
        message:"Invalid acno",
        statusCode:401
      }
    }
  }  

  const getTransaction=(acno)=>{
    return{
      status:true,
      statusCode:200,
      transaction:userDetails[acno]['transaction']
    }
  }




  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }

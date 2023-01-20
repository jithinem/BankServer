//import json web token
const jwt=require('jsonwebtoken');

//importing db.js
const db=require('./db');

userDetails={
    1000:{acno:1000,username:"Amal",password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,username:"Arun",password:1001,balance:2000,transaction:[]},
    1002:{acno:1002,username:"Akshay",password:1002,balance:2000,transaction:[]}
  }

  const register=(acno,username,password)=>{
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return{
            status:false,
            statusCode:401,
            message:"User already exists"
          }
        }
        else{
          const newUser=new db.User({
            acno:acno,
            username:username,
            password:password,
            balance:0,
            transaction:[]
          })
          newUser.save();  //to save new data to mongodb
          return{
            status:true,
            statusCode:200,
            message:"Registered successfully"       
          }
        }
      }
    )
    // if(acno in userDetails){
    //   // return false;
    //   return{
    //     status:false,
    //     message:"User already exist",
    //     statusCode:401
    //   }
    // }
    // else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   // return true;
    //   return{
    //     status:true,
    //     message:"Register successful",
    //     statusCode:200
    //   }
    // }    
  }

  const login=(acno,password)=>{
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          currentUser=user.username;
          currentAcno=acno;
          const token=jwt.sign({currentAcno:acno},'superkey2023');
          return{
            status:true,
            statusCode:200,
            message:"Login successful",
            currentUser:user.username,
            currentAcno:acno,
            token:token
          }
        }
        else{
          return{
            status:false,
            statusCode:401,
            message:"Invalid userdetails"
          }
        }
      }
    )
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     currentUser=userDetails[acno]['username'];
    //     currentAcno=acno;
    //     const token=jwt.sign({currentAcno:acno},'superkey2023');
    //     return{
    //       status:true,
    //       message:"Login successful",
    //       statusCode:200,
    //       token:token
    //     }
    //   }
    //   else{
    //     return{
    //       status:false,
    //       message:"Invalid password",
    //       statusCode:401
    //     }
    //   }
    // }
    // else{
    //   return{
    //     status:false,
    //     message:"Invalid acno",
    //     statusCode:401
    //   }
    // }
  }

  const deposit=(acno,password,amt)=>{
    var amount=parseInt(amt);
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          if(password==user.password){
            user.balance+=amount;
            user.transaction.push({
              type:'Credit',
              amount
            });
            user.save();
            return{
              status:true,
              statusCode:200,
              message:`${amount} is credited and balance is ${user.balance} `
            }
          }
          else{
            return{
              status:false,
              statusCode:401,
              message:"Invalid password"
            }
          }
        }
        else{
          return{
            status:false,
            statusCode:401,
            message:"Invalid userdetails"
          }
        }
      }
    )
    // var amount=parseInt(amt);
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       type:'Credit',
    //       amount
    //     })
    //     return{
    //       status:true,
    //       message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`,
    //       statusCode:200
    //     }
    //   }
    //   else{
    //     return{
    //       status:false,
    //       message:"Invalid password",
    //       statusCode:401
    //     }
    //   }
    // }
    // else{
    //   return{
    //     status:false,
    //     message:"Invalid acno",
    //     statusCode:401
    //   }
    // }
  }

  const withdraw=(acno,password,amt)=>{
    var amount=parseInt(amt);
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          if(password==user.password){
            user.balance-=amount;
            user.transaction.push({
              type:'Debit',
              amount
            })
            user.save();
            return{
              status:true,
              statusCode:200,
              message:`${amount} is debited and balance is ${user.balance}`
            }
          }
          else{
            return{
              status:false,
              statusCode:401,
              message:"Invalid password"
            }
          }
        }
        else{
          return{
            status:false,
            stausCode:401,
            message:"Invalid userdetails"
          }
        }
      }
    )
    // var amount=parseInt(amt);
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     if(userDetails[acno]['balance']>amount){
    //       userDetails[acno]['balance']-=amount;
    //       userDetails[acno]['transaction'].push({
    //         type:'Debit',
    //         amount
    //       })
    //       return{
    //         status:true,
    //         message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`,
    //         statusCode:200
    //       }
    //     }
    //     else{
    //       return{
    //         status:false,
    //         message:"Insufficient balance",
    //         statusCode:401
    //       }
    //     }
    //   }
    //   else{
    //     return{
    //       status:false,
    //       message:"Invalid password",
    //       statusCode:401
    //     }
    //   }
    // }
    // else{
    //   return{
    //     status:false,
    //     message:"Invalid acno",
    //     statusCode:401
    //   }
    // }
  }  

  const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return{
            status:true,
            statusCode:200,
            transaction:user.transaction
          }
        }
        else{
          return{
            status:false,
            statusCode:401,
            message:"User not found"
          }
        }
      }
    )
    // return{
    //   status:true,
    //   statusCode:200,
    //   transaction:userDetails[acno]['transaction']
    // }
  }

  //To delete account
  const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno}).then(
      user=>{
        if(user){
          return{
            status:true,
            statusCode:200,
            message:"User deleted"
          }
        }
        else{
          return{
            status:false,
            statusCode:401,
            message:"User not found"
          }
        }
      }
    )
  }


  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }

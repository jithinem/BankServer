//importing express
const express = require('express');

//importing json web token
const jwt=require('jsonwebtoken');

//creating an app using express
const app=express();

//connection between index and dataservice
const dataService=require('./services/dataService');

//for JSON to JS conversion
app.use(express.json());

//Creating a port number
app.listen(3000,()=>{
    console.log('listening on port 3000');
});

//Application specific middleware
// const appMiddleware=(req,res,next)=>{
//     console.log('Application specific middlewaree');
//     next();
// }
// app.use(appMiddleware);

//Router speific middleware
const jwtRouterMiddleware=(req,res,next)=>{
    console.log('Router specific middleware');
    const token=req.body.token;
    const data=jwt.verify(token,'superkey2023');
    console.log(data);
    next();
}

app.post('/register',(req,res)=>{
    const result=dataService.register(req.body.acno,req.body.username,req.body.password);
    // if(result){
    //     res.send('register successful');
    //     console.log(req.body);
    // }
    // else{
    //     res.send('register failed');
    // }
    res.status(result.statusCode).json(result);
});

app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.password);
    res.status(result.statusCode).json(result);
});

app.post('/deposit',jwtRouterMiddleware,(req,res)=>{
    const result=dataService.deposit(req.body.acno,req.body.password,req.body.amount);
    res.status(result.statusCode).json(result);
});

app.post('/withdraw',jwtRouterMiddleware,(req,res)=>{
    const result=dataService.withdraw(req.body.acno,req.body.password,req.body.amount);
    res.status(result.statusCode).json(result);
});

app.post('/transaction',jwtRouterMiddleware,(req,res)=>{
    const result=dataService.getTransaction(req.body.acno);
    res.json(result);
});















// resolving http request
// app.get('/',(req,res)=>{
//     res.send('Get http request');
// });

// app.post('/',(req,res)=>{
//     res.send('post http request');
// });
// app.put('/',(req,res)=>{
//     res.send('put http request');
// });
// app.patch('/',(req,res)=>{
//     res.send('patch http request');
// });
// app.delete('/',(req,res)=>{
//     res.send('delete http request');
// });

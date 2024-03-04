require('dotenv').config() // to reatch the .env file

const express = require('express');

const cors = require('cors');

const app = express();

const path = require('path');

app.use( '/uploads', express.static(path.join(__dirname, 'uploads')) );

const mongoose = require('mongoose');

const url = process.env.mongo_URL;

mongoose.connect(url).then(() => {
    console.log("mongodb server connect successfull");
})

app.use(cors()); // error in frontend

app.use(express.json());    //body-parser.

let courseRouter = require('./routes/courses-routes');
let userRouter = require('./routes/users-routes');

app.use('/api/courses',courseRouter); // handle request for course api
app.use('/api/users',userRouter); // handle request for user api

// globle middleware for not found routes
app.all('*',(req,res)=>{
    res.status(404).json({status:"error",message:"this resource is not available"})
})

// globle middleware handler 
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({status:error.statusText||"error",message:error.message,l:1});
})

app.listen(process.env.PORT,()=>{
    console.log("listening on port 2002");
})



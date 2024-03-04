
const jwt = require('jsonwebtoken')

const AppError = require('../help/AppError');

const verifyToken = (req,res,next)=>{

    const authheader = req.headers['Authorization'] || req.headers['authorization'] ;

    if(!authheader)
    {
        const error = AppError.create("token is required",401,'error')

        return next(error);
    }

    const token = authheader.split(' ')[1];

    try{
        const  currentUser = jwt.verify(token,process.env.jwt_secret_key); // current user 

        req.currentUser = currentUser;

        // console.log(currentUser);

        next();
    }catch(err){
        const error = AppError.create("invalid token",401,'error')

        return next(error);
    }
    
} 

module.exports = verifyToken;
require('dotenv').config() 
const user = require('../modules/users-module');
const asyncWrapper = require('../middleware/asyncWrapper');
const AppError = require('../help/AppError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../help/generate-token');

const getAllUsers = asyncWrapper(
    
    async(req,res) =>{

        console.log(req.headers)

    let query = req.query;

    let limit = query.limit || 10;
    let page = query.page || 1;

    let skip = (page-1)*limit;

    const users = await user.find( {},{"__v":false,'password':false} ).limit(limit).skip(skip);

    res.status(200).json( {status: 'success', data:{users}} );

})

const register =asyncWrapper(
    async(req,res,next) =>{
        
        const {firstName,lastName,email,password,role}= req.body;

        let checkOld = await user.findOne({email:email});

        if(checkOld)
        {
            const error = AppError.create("email allready in use",400,'fail')

            return next(error);
        }

        // password hashing

        const hashedPassword = await bcrypt.hash(password,10);

       let NewUser = new user({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            role:role,
            avatar:req.file.filename
         });
            console.log(req.file)

            // generate jwt token

            const token = await generateToken(NewUser);

            NewUser.token = token;   

            await NewUser.save();

        res.status(201).json( {status: 'success', data:{NewUser}} )

    }) 


const login = asyncWrapper(

    async(req,res,next) =>{

        const {email,password} = req.body;

        if(!email && !password)
        {
            const error = AppError.create("email and password are required",400,'fail');

            return next(error);

        }

        const registedUser = await user.findOne({ email: email});

        if(!registedUser)
        {
            const error = AppError.create("user not found",400,'fail')

            return next(error);
        }
        
        const matchPassword = await bcrypt.compare(password, registedUser.password);

        if(registedUser && matchPassword)
        {
            const token = await generateToken(registedUser);

            return  res.status(200).json( {status: 'success', data:{token}} )

        }else{
            const error = AppError.create("something wrong",500,'error');

            return next(error);
        }

        

    })

module.exports = {
    getAllUsers,
    register,
    login
}
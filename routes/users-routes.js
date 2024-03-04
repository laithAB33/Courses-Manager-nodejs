const express = require('express')

const verifyToken = require('../middleware/verify-token');

const Router = express.Router();

const userController = require('../controller-actions/users-actions');

const multer = require('multer');

const AppError = require('../help/AppError');

const diskStorage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('file',file);
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        const ext = file.mimetype.split('/')[1];
        const fileNmae = `user${Date.now()}.${ext}`;
        cb(null,fileNmae);
    }
})

const fileFilter = (req,file,cb)=>{
    const type = file.mimetype.split('/')[0];

    if(type == 'image'){
        return cb(null,true)
    }else{
        return cb(AppError.create('this file must be image',400,'error'),false)
    }
}

const upload = multer({ 
    storage:diskStorage,
    fileFilter: fileFilter })

// get all users

Router.route('/')
                .get(verifyToken,userController.getAllUsers)

// register

Router.route('/register')
                .post(upload.single('avatar'),userController.register)

// login 

Router.route('/login')
                .post(userController.login)

module.exports = Router;

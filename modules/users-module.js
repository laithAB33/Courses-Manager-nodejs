const {Schema, default: mongoose} = require('mongoose');

var validator = require('validator');

const userRoles = require('../help/usersRoles');

const userSchem = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,'failed required a valid email'] 
    },
    password:{
        type: String,
        required: true,
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.MANAGER,userRoles.USER],
        default: userRoles.USER,
    },
    avatar:{
        type:String,
        default: 'uploads/profileDefault.jpg',
    }
})


module.exports = mongoose.model('user',userSchem);
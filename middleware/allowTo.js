const AppError = require('../help/AppError');

module.exports = (...Roles)=>{

    console.log("Roles",Roles);

    return (req,res,next)=>{

        if(!Roles.includes(req.currentUser.role))
        {
            return next(AppError.create("this role is not authorized", 404,'error'))
        }
        
        next();
    }
}
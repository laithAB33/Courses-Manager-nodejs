const jwt = require('jsonwebtoken');

module.exports = async(payload)=>{

    const token = await jwt.sign( {email:payload.email,id:payload._id,role:payload.role},process.env.jwt_secret_key,{expiresIn:'2d'});

    return token;
}
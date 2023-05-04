const { verify } = require("jsonwebtoken");
const appError = require("../utils/AppError");
const authConfig = require("../config/auth");


async function ensureAuthenticated(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new appError("JWT Token nao informado", 401)
    }

    const [, token] = authHeader.split(" ")
    

    try {
        const {sub: user_id} = await verify(token, authConfig.jwt.secret);
        
        req.user = {
            id: Number(user_id)
        }; 
        
        return next();
    } catch (error) {
        throw new appError(`JWT Token Invalido ${error}`, 401)
    }
}

module.exports = ensureAuthenticated;
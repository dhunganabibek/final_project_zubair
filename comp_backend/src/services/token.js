const jwt = require('jsonwebtoken');
const addToken = (req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }else{
        res.status(401).json({error: true, message: "User is not authorizred for this operation"})
    }
}
const getToken = async (data) => {
    return await jwt.sign({ data }, 'secretkey', { expiresIn: 60*60 })
}
const verifyToken = (req, res, next)=>{
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err){
            res.status(401).json({error: true, message: "User is not authorizred for this operation"})
        }else{
            next();
        }
    }) 
}
const getAuthData = (token) => {
    return jwt.verify(token, 'secretkey');
}
module.exports = { addToken, verifyToken, getToken, getAuthData }
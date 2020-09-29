const config= require('config');
const jwt= require('jsonwebtoken');

function auth(req, res, next) {
    const token= req.header('x-auth-token');

    //Check for token
    if(!token) return res.status(401).send({ msg: 'No token, you don\'t have access to this route' });
    
    try {
        //Validate token
        const decoded= jwt.verify(token, config.get('jwtSecret'));

        //Authorize the user
        req.user= decoded;

        next();
    } catch(e) {
        res.status(401).send({ msg: 'Invalid token' })
    }
}

module.exports= auth;
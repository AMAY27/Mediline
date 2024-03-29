const jwt = require('jsonwebtoken');

const jwtMiddleWare = {
    verification : (req,res,next) =>{
        const token = req.header('auth-token');
        if(!token){
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        try {
            jwt.verify(token, 'secret_for_test', (error, decoded) =>{
                if(error){
                    return res.status(401).json({msg : error});
                }else{
                    next();
                }
            })
        } catch (error) {
            console.error('middleware failure');
            res.status(500).json({msg : 'Server Error'});
        }
    }
}

module.exports = jwtMiddleWare;
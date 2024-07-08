const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../Components/User/schemas/user.schema")

const jwtMiddleWare = (req,res,next) =>{
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token is not valid' });
        }
        // try {
        //     jwt.verify(token, 'secret_for_test', (error, decoded) =>{
        //         if(error){
        //             return res.status(401).json({msg : error});
        //         }else{
        //             next();
        //         }
        //     })
        // } catch (error) {
        //     console.error('middleware failure');
        //     res.status(500).json({msg : 'Server Error'});
        // }
    }

module.exports = jwtMiddleWare;
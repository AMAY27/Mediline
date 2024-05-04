const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../Components/User/schemas/user.schema")

const jwtMiddleWare = {
    verification : (req,res,next) =>{
        const token = req.header("auth-token")
        if(!token){
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data)=>{
            if(err){
                return res.status(400).json({status:false})
            }else{
                //const user = await User.findById(data.id)
                //if(user) return res.json({status: true, user: user.username})
                //else return res.json({status:false})
                next();
            }
        })
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
}

module.exports = jwtMiddleWare;
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY,{
        expiresIn: 3*24*60*60,
    })
}
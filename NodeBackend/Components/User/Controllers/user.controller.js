const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../schemas/user.schema.js');
const { createToken } = require('../../../util/TokenCreation.js');
const { createNextState } = require('@reduxjs/toolkit');

const userController = {
    registerUser: async (req,res) => {
        try {
            const user = await User.findOne({email : req.body.email});
            if(user){
                res.status(400).json({status : 'unavail'});
            }else{
                const salt = await bcrypt.genSalt(10);
                let encryptPassword = req.body.password
                encryptPassword = await bcrypt.hash(encryptPassword, salt);
                const user = await User.create({
                    email: req.body.email,
                    password: encryptPassword,
                    name: req.body.name,
                    is_active: req.body.is_active,
                    date_joined: Date.now()
                });
                res.status(201).json({status : 'ok'})
            }
        } catch (error) {
            res.status(400).json({status :'error'})
            console.log(error);
        }
    },

    loginUser: async (req,res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(400).json({status:'email incorrect'})
            }
            const isPass = await bcrypt.compare(password, center.password);
            if(!isPass){
                return res.status(400).json({status:'password incorrect'})
            }
            const token = createToken(user._id)
            res.cookie("token", token,{
                withCredentials: true,
                httpOnly: false,
            });
            res.status(201).json({message: "User logged in sucsessfully", success: true});
            createNextState()
        } catch (error) {
            console.error(error);
        }
    }
}
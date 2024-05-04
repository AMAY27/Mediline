const bcrypt = require('bcryptjs');
const Doctor = require('../Schemas/doctor.schema.js');
const { createToken } = require('../../../util/TokenCreation.js');

const doctorController = {
    registerDoctor: async(req, res) => {
        try {
            const doctor = Doctor.findOne({email: req.body.email})
            if(doctor){
                res.status(400).json({status : 'email already used'});
            }else{
                const salt = await bcrypt.genSalt(10);
                let encryptPassword = req.body.password
                encryptPassword = await bcrypt.hash(encryptPassword, salt);
                const doctor = await Doctor.create({
                    email: req.body.email,
                    password: encryptPassword,
                    name: req.body.name,
                    professional_details: req.body.professional_details,
                    date_joined: Date.now(),
                    is_active: req.body.is_active,
                    specializations: req.body.specializations
                })
            }
        } catch (error) {
            res.status(400).json({status :'error'})
            console.log(error);
        }
    },

    loginDoctor: async(req, res) => {
        try {
            const doctor = await Doctor.findOne({email: req.body.email});
            if(!doctor){
                return res.status(400).json({status:'email incorrect'})
            }
            const isPass = await bcrypt.compare(req.body.password, doctor.password);
            if(!isPass){
                return res.status(400).json({status:'password incorrect'})
            }
            const token = createToken(doctor._id)
            res.cookie("token", token,{
                withCredentials: true,
                httpOnly: false,
            });
            res.status(201).json({message: "logged in sucsessfully", success: true});
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = doctorController
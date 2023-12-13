const Testcenter = require('../models/centermodel')
const Appointment = require('../models/appointmentmodel')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const centerController = {
    registerCenter: async (req,res) =>{
        try {
            const center = await Testcenter.findOne({center_name : req.body.center_name});
            if(center){
                res.status(400).json({status : 'unavail'});
            }else{
                const salt = await bcrypt.genSalt(10);
                let encryptPassword = req.body.password
                encryptPassword = await bcrypt.hash(encryptPassword, salt);
                const testcenter = await Testcenter.create({
                    email : req.body.email,
                    password : encryptPassword,
                    center_name: req.body.center_name,
                    address: req.body.address,
                    zip: req.body.zip,
                    contact: req.body.contact,
                    tests: req.body.tests,
                });
                res.status(201).json({status : 'ok'})
            }
        } catch (error) {
            res.status(400).json({status :'error'})
            console.log(error);
        }
    },

    loginCenter: async (req,res) =>{
        const {email, password} = req.body;
        try {
            const center = await Testcenter.findOne({email : req.body.email});
            console.log(center);
            if(!center) {
                return res.status(400).json({status:'email incorrect'})
            }
            const isPass = await bcrypt.compare(password, center.password);
            if(!isPass){
                return res.status(400).json({status:'password incorrect'})
            }
            const payload = {
                center:{
                    id: center._id
                }
            };
            jwt.sign(
                payload,
                'secret_for_test',
                {expiresIn : 120},
                (err, token) =>{
                    if(err) throw err;
                    res.json({token})
                }
            )
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    getCenters: async (req,res)=>{
        const centers = await Testcenter.find()
        res.status(200).json({status : 'ok',centers})
    },

    getCenterData: async(req,res) => {
        const center_id  = new mongoose.Types.ObjectId(req.query.centerid)
        const query = {_id : center_id}
        const center = await Testcenter.findOne(query)
        res.status(200).json({status : 'ok',center})
    },

    bookappointment: async(req,res) =>{
        try {
            const appointment = await Appointment.create({
                test_names : req.body.test_names,
                patient_name : req.body.patient_name,
                appointment_date : req.body.appointment_date,
                status : req.body.status,
                userid : req.body.userid,
                center_id : req.body.center_id,
                cost : req.body.cost
            })
            res.status(201).json({status : 'ok'})
        } catch (error) {
            res.status(400).json({status : 'error'})
            console.log(error);
        }
    }
}

module.exports = centerController;
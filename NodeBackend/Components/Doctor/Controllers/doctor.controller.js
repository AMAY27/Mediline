const bcrypt = require('bcryptjs');
const Doctor = require('../Schemas/doctor.schema.js');
const Docavailability = require('../Schemas/docavailability.schema.js')
const Office = require('../../DoctorOffice/Schemas/office.schema.js')
const Appointments = require('../../Appointments/Schemas/consultationappointment.schema.js')
const { createToken } = require('../../../util/TokenCreation.js');
const cron = require('node-cron');

const doctorController = {
    registerDoctor: async(req, res) => {
        try {
            const doctor = await Doctor.findOne({email: req.body.email})
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
                    is_active: true,
                    specializations: req.body.specializations
                })
                res.status(201).json({status : 'ok'})
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
    },
    availabilityAddition: async(req,res) => {
        try {
            const weekdays = {
                "Monday" : 1,
                "Tuesday" : 2,
                "Wednesday" : 3,
                "Thursday" : 4,
                "Friday" : 5,
                "Saturday" : 6,
                "Sunday" : 7
            }
            const curr_weekday = await weekdays[req.body.weekday]
            const availability = await Docavailability.create({
                weekday : curr_weekday,
                time_slots : req.body.time_slots,
                is_available : true,
                officeid : req.body.officeid,
                docid : req.body.docid
            })
            res.status(201).json({message : "Created"});
        } catch (error) {
            res.status(500).json({message : "Internal server error"})
        }
    },
    fetchDocAvailability: async(req,res) => {
        try {
            const availability = await Docavailability.find({docid: req.query.docid, officeid: req.query.officeid})
            res.status(200).json({availability})
        } catch (error) {
            res.status(500).json({error:error})
        }
    },
    fetchClinicData: async(req,res)=>{
        try {
            const clinics = await Office.find({admin_docid: req.query.docid})
            const appointments = await Appointments.find({docid: req.query.docid, appointment_date: req.query.date})
            res.status(200).json({clinicData: clinics, appointmentData: appointments})
        } catch (error) {
            res.status(500).json({error:error})
        }
    }
}

module.exports = doctorController
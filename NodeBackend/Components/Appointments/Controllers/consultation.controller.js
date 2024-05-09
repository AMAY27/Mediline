const mongoose = require('mongoose')
const Consultation = require('../../Appointments/Schemas/consultationappointment.schema')
const Availability = require('../../../Components/Doctor/Schemas/docavailability.schema')
const Doctor = require('../../../Components/Doctor/Schemas/doctor.schema')
const User = require('../../../Components/User/schemas/user.schema')


const consultationAppointments = {
    addAppointment : async(req,res) => {
        try {
            const doctor = await Doctor.findOne({_id : req.body.docid})
            const appointment = await Consultation.create({
                docid : req.body.docid,
                userid : req.body.userid,
                patient_name : req.body.patient_name,
                doc_name : doctor.name,
                appointment_date : req.body.appointment_date
            })
            res.status(201).json({message : 'Appointment booked'})
        } catch (error) {
            res.status(500).json({message : 'Internal Server error'})
        }
    },
    checkAvailability : async(req,res) => {
        try {
            const datetobechecked = req.body.date
            //const appointements = await Consultation.find({appointment_date : datetobechecked, officeid : req.body.officeid, docid : req.body.docid})
            const availability = await Availability.find({officeid : req.body.officeid, docid : req.body.docid})
            console.log(availability);
            res.status(200).json({availability})
        } catch (error) {
            res.status(500).json({error})
            console.log(error);
        }
    }
}

module.exports = consultationAppointments
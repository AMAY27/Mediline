const mongoose = require('mongoose')
const Consultation = require('../../Appointments/Schemas/consultationappointment.schema')
const Availability = require('../../../Components/Doctor/Schemas/docavailability.schema')
const Doctor = require('../../../Components/Doctor/Schemas/doctor.schema')
const User = require('../../../Components/User/schemas/user.schema')
const Office = require('../../DoctorOffice/Schemas/office.schema')


const consultationAppointments = {
    addAppointment : async(req,res) => {
        try {
            const doctor = await Doctor.findOne({_id : req.body.docid})
            const user = await User.findOne({_id : req.body.userid})
            const appointement = await Consultation.find({appointment_date : req.body.appointment_date, officeid : req.body.officeid, docid : req.body.docid, userid : req.body.userid})
            if(appointement) {
                res.status(409).json({message : "Appointment already booked for this date"})
            }
            else{
                const appointment = await Consultation.create({
                    docid : req.body.docid,
                    officeid : req.body.officeid,
                    userid : req.body.userid,
                    patient_name : user.name,
                    doc_name : doctor.name,
                    appointment_date : req.body.appointment_date,
                    appointment_day : req.body.day,
                    time_slot : req.body.time_slot
                })
                res.status(201).json({message : 'Appointment booked'})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message : 'Internal Server error'})
        }
    },
    checkAvailability : async(req,res) => {
        try {
            const appointements = await Consultation.find({appointment_date : req.body.date, officeid : req.body.officeid, docid : req.body.docid})
            const availability = await Availability.findOne({officeid : req.body.officeid, docid : req.body.docid, weekday : req.body.day})
            let available_slots = [];
            const available_time_slots = await availability.time_slots
            await available_time_slots.forEach(value => {
                if(value.max_patients >= appointements.length){
                    available_slots.push(value.slot)
                }
            })
            available_slots.length > 0 ? res.status(200).json({ available_slots })  : res.status(409).json({ message :"No slots available" });
        } catch (error) {
            res.status(500).json({error})
            console.log(error);
        }
    },
    getDetailsForBookingAppointment : async(req,res) => {
        try {
            const details = await Office.findOne({admin_docid: req.query.docid, _id: req.query.officeid});
            const avilability = await Availability.find({officeid: req.query.officeid, docid: req.query.docid});
            const doctor = await Doctor.findOne(
                { _id: req.query.docid },
                { professional_details: 1 }
            );
            res.status(200).json({officeDetails: details, availabilityDetails: avilability, professional_details: doctor.professional_details})
        } catch (error) {
            res.status(500).json({error})
            console.log(error);
        }
    }
}

module.exports = consultationAppointments
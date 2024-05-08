const Office = require('../Schemas/office.schema')
const Doctor = require('../../Doctor/Schemas/doctor.schema')

const officeController = {
    registerOffice : async(req,res) => {
        try {
            const doctor = await Doctor.findOne({_id: req.body.docid})
            const office = await Office.create({
                docid : req.body.docid,
                docname : doctor.name,
                officename : req.body.officename,
                address : req.body.address,
                pincode : req.body.pincode,
                service_tags : req.body.servicetags
            })
            res.status(201).json({status : "Registered"})
        } catch (error) {
            res.status(500).json({message : "Internal Server error"})
            console.log(error);
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
            const availability = {
                weekday : curr_weekday,
                time_slots : req.body.time_slots,
                is_available : true,
                docid : req.body.docid
            }
            const updateavailability = { $push: {weekly_availability : availability} } 
            const office = {_id : req.body.officeid}
            const update_availability = await Office.findOneAndUpdate(office, updateavailability);
            res.status(201).json({message : "Update with addition of availability"});
        } catch (error) {
            res.status(500).json({message : "Internal server error"})
        }
    }
}

module.exports = officeController
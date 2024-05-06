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
                servicetags : req.body.servicetags
            })
            res.status(201).json({status : "Registered"})
        } catch (error) {
            res.status(500).json({message : "Internal Server error"})
            console.log(error);
        }
    }
}

module.exports = officeController
const express =  require("express");
const cors =  require('cors');
const mongoose = require('mongoose');
const app = express();
const Testcenter = require('./models/centermodel')
const Appointment = require('./models/appointmentmodel')
app.use(cors());
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/Mediline')

app.listen(3000,()=>{
    console.log("server started at port 3000");
})

app.post('/registercenter',async (req,res)=>{
    const center= await Testcenter.findOne({center_name : req.body.center_name})
    if(center){
        res.status(400).json({status : 'unavail'})
    }
    else{
        try {
            const testcenter = await Testcenter.create({
                center_name : req.body.center_name,
                address : req.body.address,
                zip : req.body.zip,
                contact : req.body.contact,
                tests : req.body.tests
            })
            res.status(201).json({status : 'ok'})
        } catch (error) {
            res.status(400).json({status : 'error'})
            console.log(error);
        }
    }
})

app.get('/centers', async (req,res)=>{
    const centers = await Testcenter.find()
    res.status(200).json({status : 'ok',centers})
})

app.get('/testcenter', async (req,res)=>{
    const center_id  = new mongoose.Types.ObjectId(req.query.centerid)
    const query = {_id : center_id}
    const center = await Testcenter.findOne(query)
    res.status(200).json({status : 'ok',center})
})

app.post('/appointment/book',async (req,res)=>{
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
})
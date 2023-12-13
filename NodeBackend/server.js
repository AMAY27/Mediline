const express =  require("express");
const cors =  require('cors');
const mongoose = require('mongoose');
const app = express();
const Testcenter = require('./models/centermodel')
const Appointment = require('./models/appointmentmodel')
const centerRoutes = require('./routes/centerRoutes')
app.use(cors());
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/Mediline')

app.use( centerRoutes);

app.listen(3000,()=>{
    console.log("server started at port 3000");
})


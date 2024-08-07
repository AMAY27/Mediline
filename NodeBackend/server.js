const express =  require("express");
const cors =  require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const app = express();
const Testcenter = require('./Components/TestCenters/Schemas/centermodel')
const Appointment = require('./Components/TestCenters/Schemas/appointmentmodel')
// const centerRoutes = require('./routes/centerRoutes')
const userRoutes = require('./Components/User/Routes/user.routes')
const authRoutes = require('./Components/Auth/Routes/auth.routes')
const doctorRoutes = require('./Components/Doctor/Routes/doctor.routes')
const officeRoutes = require('./Components/DoctorOffice/Routes/office.routes')
const consultationRoutes = require('./Components/Appointments/Routes/consultation.routes')
const testCenterRoutes = require('./Components/TestCenters/Routes/centerRoutes')
app.use(cors());
app.use(express.json())
mongoose.connect(MONGO_URL);

app.use(userRoutes, authRoutes, testCenterRoutes);
app.use(doctorRoutes, officeRoutes, consultationRoutes);

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})


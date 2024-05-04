const express =  require("express");
const cors =  require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const app = express();
const Testcenter = require('./models/centermodel')
const Appointment = require('./models/appointmentmodel')
const centerRoutes = require('./routes/centerRoutes')
const userRoutes = require('./Components/User/Routes/user.routes')
app.use(cors());
app.use(express.json())
mongoose.connect(MONGO_URL);

app.use( centerRoutes);
app.use(userRoutes);

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URL, PORT } = process.env;
const app = express();

// Import Routes
const userRoutes = require("./Components/User/Routes/user.routes");
const authRoutes = require("./Components/Auth/Routes/auth.routes");
const doctorRoutes = require("./Components/Doctor/Routes/doctor.routes");
const officeRoutes = require("./Components/DoctorOffice/Routes/office.routes");
const consultationRoutes = require("./Components/Appointments/Routes/consultation.routes");
const testCenterRoutes = require("./Components/TestCenters/Routes/centerRoutes");

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use Routes
app.use(userRoutes);
app.use(authRoutes);
app.use(testCenterRoutes);
app.use(doctorRoutes);
app.use(officeRoutes);
app.use(consultationRoutes);

// Start server
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
}

// Export app for testing
module.exports = app;  // <-- Export app for testing

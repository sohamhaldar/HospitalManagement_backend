import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

import PatientStartrouter from "./routes/patient_start.routes.js";
import Patientrouter from "./routes/patient.routes.js";
import DoctorStartrouter from "./routes/doctor_start.routes.js"

app.use("/patient",PatientStartrouter);
app.use("/patient/appointment",Patientrouter);
app.use("/doctor",DoctorStartrouter);

export {app};
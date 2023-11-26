import { ApiError } from "../utils/ApiError.js";
import { Patient } from "../models/patient.model.js";
import { PatientHistory } from "../models/patientHistory.model.js";
import { Appointments } from "../models/appointments.model.js";

const SignUp=async(req,res,next)=>{
    try{
        console.log(req.body);
        const {username,email,password,fullName}=req.body;
        if([username,email,password,fullName].some((parameters)=>parameters?.trim()==="")){
            throw new ApiError(400,"All fields are required");
        }
        const existedUser=await Patient.findOne({$or:[{username},{email}]});
        if(existedUser){
            throw new ApiError(409,"Email or username already exists");
        }
        const patient=await Patient.create({
            fullName,
            email,
            password,
            username
        })
    // console.log(patient);

        const createdPatient=await Patient.findById(patient._id).select(
            "-password"
        );
        if(!createdPatient){
            throw new ApiError(500,"Some Error occured please try Again");
        }
        res.status(200).json({
            status:true,
            message:"user created succesfully"
        });
    }catch (err) {
        next(err);
    }
}

const Login=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user=await Patient.findOne({email,password});

        if(!user){
            throw new ApiError(401,"Email or password is incorrect");
        }
        const token=await user.generateAccessToken();
        res.status(200).json({
            status:true,
            message:"Succesful login",
            token:token 
        })    
    }catch (err) {
        next(err);
    }
}

const AddApointment=async(req,res,next)=>{
    try{
        const {id,doctor_name,time}=req.body;
        if([id,doctor_name,time].some((parameters)=>parameters?.trim()==="")){
            throw new ApiError(500,"Some Error occured in sending appointment request");
        }
        const appointment=Appointments.create({
            id,
            doctor_name,
            time
        })
        const createdAppointment=Appointments.findById(appointment._id);
        if(!createdAppointment){
            throw new ApiError(500,"Some Error occured please try Again");
        }
        res.status(201).json({
            status:true,
            message:"Appointment taken successfuly"
        })
    
    }catch (error){
        next(error);
    }
}




export {SignUp,Login}

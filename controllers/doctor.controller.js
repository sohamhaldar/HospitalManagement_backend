import { ApiError } from "../utils/ApiError.js";
import { Doctor } from "../models/doctor.model.js";
import { DoctorHelp } from "../models/doctorHelp.model.js";

const SignUp=async(req,res,next)=>{
    try{
        console.log(req);
        const {username,email,password,fullName,speciality,fees}=req.body;
        if([username,email,password,fullName,speciality,fees].some((parameters)=>parameters?.trim()==="")){
            throw new ApiError(400,"All fields are required");
        }
        const existedUser=await Doctor.findOne({$or:[{username},{email}]});
        if(existedUser){
            throw new ApiError(409,"Email or username already exists");
        }
        const doctor=await Doctor.create({
            fullName,
            email,
            password,
            username,
            speciality,
            fees
        });
        const createdDoctor=await Doctor.findById(doctor._id).select(
            "-password"
        );
        if(!createdDoctor){
            throw new ApiError(500,"Some Error occured please try Again");
        }
        res.status(200).json({
            status:true,
            message:"user created succesfully"
        });
        
    }catch (error){
        next(error);
    }
}

const Login=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user=await Doctor.findOne({email,password});
        console.log(user);

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
const getDoctors=async(req,res,next)=>{
    try{
        const doctors=await Doctor.find();
        res.status(200).json({
            status:true,
            data:doctors
        })
    }
    catch(err){
        next(err)
    }
}

export {SignUp,Login,getDoctors}
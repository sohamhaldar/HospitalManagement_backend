// import { ApiError } from "../utils/ApiError.js";
import { Patient } from "../models/patient.model.js";



const SignUp=async(req,res)=>{
    console.log(req.body);
    const {username,email,password,fullName}=req.body;
    if([username,email,password,fullName].some((parameters)=>parameters?.trim()==="")){
        // throw new ApiError(400,"All fields are required");
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const existedUser=await Patient.findOne({$or:[{username},{email}]});
    if(existedUser){
        // throw new ApiError(409,"Email or username already exists");
        return res.status(409).json({
            success:false,
            message:"Email or username already exists"
        })
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
        // throw new ApiError(500,"");
        return res.status(500).json({
            success:false,
            message:"Something went wrong when registering"
        })
    }
    res.status(200).json({message:"user created succesfully"});
}
const Login=async(req,res)=>{
    const{email,password}=req.body;
    const user=await Patient.findOne({email,password});
    if(!user){
        // throw new ApiError(401,"Email or password is incorrect");
        return res.status(401).json({
                        success:false,
                        message:"Email or password is incorrect"
                    })
    }
    res.status(200).json({
        message:"Succesful login" 
    })

}

export {SignUp,Login}
//test
import mongoose,{Schema} from "mongoose";

const patientHistorySchema=Schema({
    doctor_name:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true
    },
    prescription:[{
        type:String
    }],
    bill:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

},{timeStamps:true})
export const PatientHistory=mongoose.model("PatientHistory",patientHistorySchema);
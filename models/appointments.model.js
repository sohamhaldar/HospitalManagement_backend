import mongoose,{Schema} from "mongoose";

const AppointmentSchema=Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    doctor_name:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    }
},{timeStamps:true})
export const Appointments=mongoose.model("Appointments",AppointmentSchema);
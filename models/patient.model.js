import mongoose,{ Schema,model } from "mongoose";

const patientSchema=Schema(
    {

        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        Appointments:[{
            doctor_name:{
                type:String,
                required:true
            },
            time:{
                type:Date,
                required:true
            }
        }],
        History:[
            {
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

            }]
    },
{
    timeStamps:true
}
);
export const Patient=mongoose.model("Patient",patientSchema);
import mongoose from "mongoose";

export interface languageType{
    name:string;
    direction:"ltr" | "rtl"
}
const languageSchema = new mongoose.Schema<languageType>({
    name:{
        type:String,
        required:[true,"languge name is required"],
        unique:true,
        trim:true,
        index:true
    },
    direction:{
        required:[true,"direction is required"]
    }
},{timestamps:true});

const languageModel = mongoose.models?.language as mongoose.Model<languageType> || mongoose.model("Language",languageSchema);
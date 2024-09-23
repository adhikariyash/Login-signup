import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    LoggedIn:{
             type:Boolean,
              default:false
    },
   password: {
    type: String,
    required:true,
    }
    
  

},{timestamps: true})

export const userModel = mongoose.model("userModel", userSchema);
import mongoose from 'mongoose'
export const dbConnection = async()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Your database has been connected successfully`)
    } catch (error) {
     console.log("db connection failed")   
    }
}
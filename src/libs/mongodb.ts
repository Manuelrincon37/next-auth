
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if(!MONGODB_URI){
 throw new Error("MONGODB_URI must be defined")
}

 const connectDB = async () => {
    
    try {
        const {connection} = await mongoose.connect(MONGODB_URI)
        if (connection.readyState === 1) {
            console.log('MongoDB Connected')
            return Promise.resolve(true)
        }
    } catch (err){
        console.log(err)
        return Promise.reject(false)
    }
 }
 export default connectDB 
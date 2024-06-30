import mongoose from "mongoose";
const connectDB = async (DB_URI: string)=>{
    try {
        await mongoose.connect(DB_URI, {
            dbName: 'paytm'
        });
        return {
            message: 'Mongo started successfully!'
        }
    } catch (error: any) {
        return {
            message: error.message
        }
    }
}
export default connectDB;
import mongoose from "mongoose";

export const connectDB=async(url)=>{
    try {
         await mongoose.connect(url);
         console.log('Db connected successfully');
         
    } catch (error) {
        console.log('Database connection error:',error);
    }

}



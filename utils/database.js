import mongoose from 'mongoose';
let isDBConnected = false; //track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isDBConnected) {
        //console.log('MongoDB is already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
            socketTimeoutMS: 45000,
        })
        isDBConnected = true;
        //console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(error);
    }
}
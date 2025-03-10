import mongoose from "mongoose";

const connectDB = async () => {
    if(mongoose.connection.readyState >= 1){
        return; // Already connected
    }

    try{
        // await mongoose.connect(process.env.MONGODB_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Atlas connected");
    } catch(error){
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default connectDB;
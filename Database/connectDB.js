import mongoose from "mongoose";

const connectDb = () => {
    try{
        const connectionString = process.env.DATABASE_URL
        if(!connectionString){
            throw new Error("Connection string is giving undefined");
        }
        return mongoose.connect(connectionString, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
          })
    } catch(err) {
        console.log(err) 
    }
}

export default connectDb
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery',true); //ensures the queries asked to the db are valid and queries can return some actual respose. and gives error for invalid queries. basically strengthens the schema

    if(isConnected){ //checks if mongois connnected
        console.log('MongoDb is already connected')
        return
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
        dbName: "share_snippet",
        useNewUrlParser : true,
        useUnifiedTopology : true,
        })
        isConnected = true;
    } catch(error){
        console.log(error)
    }
}
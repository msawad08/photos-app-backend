import  mongoose from "mongoose";

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);

// Define the database URL to connect to.

// Wait for database to connect, logging an error if there is a problem 
export const initialiseDatabase = async function(){
    try{
        if(process.env.DB_PATH){
            await mongoose.connect(process.env.DB_PATH);
        }else{
            console.log("Db path not configured")
        }
        

    }catch(err){
        console.log(err)
    }
}
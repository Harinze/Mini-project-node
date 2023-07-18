

const dotenv = require('dotenv'); 
const mongoose = require("mongoose");



dotenv.config({path: __dirname + '/.env'});

const connectDB = async ()=>{
    try{    
        // if(process.env.DATABASE_URI === undefined) return;
            await mongoose.connect(process.env.DATABASE_URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
    }catch(error){
        console.error(error);
    }
}

module.exports = connectDB;
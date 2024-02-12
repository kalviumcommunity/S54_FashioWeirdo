const mongoose = require('mongoose');
require('dotenv').config()

// MongoDB connection URI

const connection = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is Connected")
        return "Database is connected"
    }
    catch (error){
        console.log("Unable to connect because of", error.message);
        return `Unable to connect because of, ${error.message}`
        process.exit(1)
    }
}

module.exports = connection
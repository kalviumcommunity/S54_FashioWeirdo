const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const connection = require("./dbConnection");
const crudRouter = require("./Routes/route")
const userDataRoutes = require("./Routes/userRoute")

app.use(express.json())

app.use(cors())

app.use("/main",crudRouter)

app.use("/user",userDataRoutes)


// creating routes over here
connection().then(response=>{
    app.get('/',(req,res)=>{
        res.send("database is connected")
    })
}).catch(response=>{
    app.get('/',(req,res)=>{
        res.send("failed to connect")
    })
})

app.get('/',(req,res)=>{
    res.send('We hope to see you soon')
})

app.listen(3500,()=>{
    console.log('this is now running on port 3500')
})
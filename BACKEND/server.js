const express = require('express');
const app = express();
const connection = require("./dbConnection");


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

app.get('/ping',(req,res)=>{
    res.send('We hope to see you soon')
})

app.listen(3000,()=>{
    console.log('this is now runnign on port 3000')
})
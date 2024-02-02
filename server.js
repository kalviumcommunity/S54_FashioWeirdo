const exp = require('express')
const app = exp()

// creating routes over here
app.get('/',(req,res)=>{
    res.send('Hello welcome to node API of FashioWeirdo')
})
app.get('/ping',(req,res)=>{
    res.send('We hope to see you soon')
})

app.listen(3000,()=>{
    console.log('this is now runnign on port 3000')
})
const express = require('express');
const crudRouter = express.Router()


crudRouter.get('/', (req,res)=>{
    res.status(200).json({message: "CRUD operation for GET req is succesful"})
})

crudRouter.post('/', (req,res)=>{
    res.status(201).json({message: "CRUD operation for POST req is succesful"})
})

crudRouter.put('/:id', (req,res)=>{
    const id = req.params.id
    res.status(201).json({message: `CRUD operation for PUT req is succesful for ${id}`})
})
crudRouter.delete('/:id', (req,res)=>{
    const id = req.params.id
    res.status(201).json({message: `CRUD operation for DELETE req is succesful for ${id}`})
})

module.exports  = crudRouter;



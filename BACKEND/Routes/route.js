const express = require('express');
const crudRouter = express.Router()
const {
    getAllData,
    getOneData,
    createData,
    updateOneData,
    deleteData,
} = require("../controllers/controllers")


crudRouter.get('/', getAllData)
crudRouter.get('/:id', getOneData)
crudRouter.post('/', createData)
crudRouter.put('/:id', updateOneData)
crudRouter.delete('/:id',deleteData)

module.exports  = crudRouter;



const express = require("express")
const userDataRoutes = express.Router()
const { getAllUsers, getOneUser, createUser, loginUser, updateUser, deleteUser } = require("../controllers/usercontroller")


userDataRoutes.get("/",getAllUsers)
userDataRoutes.get("/:id",getOneUser)
userDataRoutes.post("/",createUser)
userDataRoutes.post("/login",loginUser)
userDataRoutes.patch("/:id",updateUser)
userDataRoutes.delete("/:id",deleteUser)


module.exports = userDataRoutes
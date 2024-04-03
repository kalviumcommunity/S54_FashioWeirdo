
const  UserData = require("../Schema/userSchema");
const {sha512} = require("js-sha512")

require('dotenv').config()

const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await  UserData.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Users" });
  }
};
const getOneUser = async (req, res) => {
  try {
    const OneUser = await  UserData.find({
      Username: req.params.id,
    }).exec();
    if (OneUser.length === 0) {
      res.status(404).json({ message: "User not Found",OneUser });
    } else {
      res.status(200).json({OneUser});
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Data" });
  }
};
const createUser = async (req, res) => {
  try {
    const value = req.body
    const { Name, Email, Password, Username } = value;
        const postUser = await  UserData.create({
          Name,
          Email,
          Password: sha512(Password),
          Username,
        });
        
        res.status(201).json({ message: "User Created", postUser});
  } catch (error) {
    errorName = Object.keys(error.keyPattern)
    errorValue = error.keyValue[errorName]
    res.status(500).json({ message: "Unable to Create User",errorMessage: `"${errorValue}" ${errorName[0]} is already taken` });
  }
};
const updateUser = async (req, res) => {
  try {
    // console.log(req.params.id,req.body);
    const patchUser = await  UserData.findOneAndUpdate(
      { Username: req.params.id },
      { $set: req.body },
      { new: false }
    );
    if (!patchUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      const updatedUser = await  UserData.find({ Username: req.params.id });
      res
        .status(200)
        .json({
          message: `User Data Updated for id ${req.params.id}`,
          previousUser: patchUser,
          updatedUser,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Update Data" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await  UserData.findOneAndDelete({
      Username: req.params.id,
    });
    if (!deleteUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      res
        .status(200)
        .json({
          message: `User Data with id ${req.params.id} is deleted`,
          deleteUser,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to Delete Data" });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};

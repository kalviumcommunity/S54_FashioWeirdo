const UserData = require("../Schema/userSchema");
const { sha512 } = require("js-sha512");
const { uservalidator } = require("../validators/uservalidator");

require('dotenv').config();

const getAllUsers = async (req, res) => {
  try {
    const AllUsers = await UserData.find({});
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Users" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const OneUser = await UserData.findOne({
      Username: req.params.id,
    }).exec();
    if (!OneUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({ OneUser });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch Data" });
  }
};

const loginUser = async (req,res) => {
  try {
    const {Username, Password} = req.body
    // console.log(Username, Password)
    const codedPassword = sha512(Password)

    const foundUser = await UserData.find({ Username: Username })
    if (!foundUser) {
      res.json("User does not Exist")
    } else {
      if (codedPassword === foundUser[0].Password) {
        console.log("true user")
        res.json(foundUser[0].Username)
      } else {
        console.log("Password is Incorrect")
      }
      console.log(foundUser[0].Password)
    }
    return

  } catch (error) {
    console.log("Login Erorr", error)
  }
  return
}

const createUser = async (req, res) => {
  try {
    const { error } = uservalidator(req.body);
    if (error) {
      return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
    }

    const { Name, Email, Password, Username } = req.body;
    const postUser = await UserData.create({
      Name,
      Email,
      Password: sha512(Password), 
      Username,
    });
    
    res.status(201).json({ message: "User Created", postUser });
  } catch (error) {
    res.status(500).json({ message: "Unable to Create User", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const patchUser = await UserData.findOneAndUpdate(
      { Username: req.params.id },
      { $set: req.body },
      { new: false }
    );
    if (!patchUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    const updatedUser = await UserData.findOne({ Username: req.params.id });
    res.status(200).json({
      message: `User Data Updated for id ${req.params.id}`,
      previousUser: patchUser,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to Update Data" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await UserData.findOneAndDelete({
      Username: req.params.id,
    });
    if (!deleteUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({
      message: `User Data with id ${req.params.id} is deleted`,
      deleteUser,
    });
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
  loginUser,
};
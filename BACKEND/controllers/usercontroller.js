const UserData = require("../Schema/userSchema");
const bcrypt = require('bcrypt');
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

const loginUser = async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const foundUser = await UserData.findOne({ Username: Username });

    if (!foundUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(Password, foundUser.Password);
    if (passwordMatch) {
      console.log("true user");
      return res.json(foundUser.Username);
    } else {
      console.log("Password is Incorrect");
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log("Login Error", error);
    return res.status(500).json({ message: "Login error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = uservalidator(req.body);
    if (error) {
      return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
    }

    const { Name, Email, Password, Username } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10); 
    const postUser = await UserData.create({
      Name,
      Email,
      Password: hashedPassword,
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

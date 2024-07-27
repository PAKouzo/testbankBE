import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';
import fs from 'fs';
import resultModel from '../models/resultModel.js';
import mongoose from 'mongoose';

//register
export const registerController = async (req, res) => {
  try {
    const { fullname, username, accounttype, email, password, answer } = req.body;
    //validations
    if (!fullname) {
      return res.send({ error: 'Full Name is Required' });
    }
    if (!username) {
      return res.send({ message: 'Username is Required' });
    }
    if (!accounttype) {
      return res.send({ message: 'Account Type is Required' });
    }
    if (!email) {
      return res.send({ message: 'Email is Required' });
    }
    if (!password) {
      return res.send({ message: 'Password is Required' });
    }
    if (!answer) {
      return res.send({ message: 'Answer is Required' });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: 'Already register please login',
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      fullname,
      username,
      accounttype,
      email,
      password: hashedPassword,
      answer,
    }).save();
    if (user.accounttype === 'teacher') {
      user.role = 2;
      user.save();
    }
    res.status(201).send({
      success: true,
      message: 'User Register Successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Registeration',
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if ((!username && !email) || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }
    //check user
    const user = await userModel.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email or username is not registered',
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Invalid Password',
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.status(200).send({
      success: true,
      message: 'Login Successfully',
      user: {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        accounttype: user.accounttype,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Login',
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send('Protected Routes');
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update profile
export const upadteProfileController = async (req, res) => {
  try {
    const { fullname, username, password, avatar, age, dateofbirth, gender } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: 'Passsword is required and 6 character long' });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    if (avatar && avatar.path) {
      user.avatar.data = fs.readFileSync(avatar.path);
      user.avatar.contentType = avatar.type;
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        fullname: fullname || user.fullname,
        username: username || user.username,
        password: hashedPassword || user.password,
        avatar: avatar || user.avatar,
        age: age || user.age,
        dateofbirth: dateofbirth || user.dateofbirth,
        gender: gender || user.gender,
      },
      { new: true },
    );
    res.status(200).send({
      success: true,
      message: 'Profile updated successfully',
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while updating profile',
      error,
    });
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: 'Email is required' });
    }
    if (!answer) {
      res.status(400).send({ message: 'Answer is required' });
    }
    if (!newPassword) {
      res.status(400).send({ message: 'New password is required' });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({ success: false, message: 'Email not registered' });
    }
    //validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'Wrong email or answer . Please try again',
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

export const GetAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: 'All users fetched successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting all courses',
      error,
    });
  }
}

export const DeleteUser = async (req, res) =>{
  try{
    const {id} = req.params
    const user = await userModel.findByIdAndDelete(id);
    if(!user) throw new Error('User is not exist!')
    res.status(200).send({
      message: "Delete user successfully!",
      data: user
    })
  }
  catch(e){
    res.status(500).send({
      message: e.message,
      data: null
    })
  }
}

export const resultController = async (req, res) => {
  try {
    const userId = req.params._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    const results = await resultModel.findById(userId).populate('examId');

    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: 'No results found' });
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
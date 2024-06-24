import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from '../model/users.js';

dotenv.config();
const { TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const UserCTL = {
  signup: async (req, res) => {
    const {
      fullname,
      accountType,
      username,
      email,
      password,
      age,
      DateOfBirth,
      gender,
      organization,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const createUser = await UserModel.create({
      fullname,
      accountType,
      username,
      email,
      password: hash,
      age,
      DateOfBirth,
      gender,
      organization,
    });
    res.status(201).send({
      message: "Register successful",
      data: createUser,
    });
  },

  login: async (req, res) => {
    const { email, password, accountType } = req.body;
    const users = await UserModel.find({
      email: email,
      password: password,
      accountType: accountType,
    });
    const access_token = jwt.sign(users, TOKEN_SECRET, { expiresIn: "10s" });
    const refresh_token = jwt.sign(users, REFRESH_TOKEN_SECRET, {
      expiresIn: "365d",
    });
    res.status(200).send(
      access_token, 
      refresh_token);
  },
//   update: async (req, res) => {
//     const { userID } = req.params;
//     const { phone, birthday, bio } = req.body;
//     const user = await UsersModel.findByIdAndUpdate(userID, {
//       phone: phone,
//       birthday: birthday,
//       bio: bio,
//     });
//     res.status(200).send({
//       message: "Update profile successfully!",
//       data: user,
//     });
//   },
};
export default UserCTL;
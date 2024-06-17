import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from '../../models/users/index.js';

dotenv.config();
const { TOKEN_SECRET } = process.env;
const UserCTL = {
  signup: async (req, res) => {
    const { email, password, name } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const createUser = await UsersModel.create({
      email,
      password: hash,
      name,
    });
    res.status(201).send({
      message: "Register successful",
      data: createUser,
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const users = await UserModel.find({
      email: email,
      password: password,
    });
    const payload = {
      email: users.email,
      password: users.password,
    };
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: "10s" });
    res.status(200).send(token);
  },
  update: async (req, res) => {
    const { userID } = req.params;
    const { email, password, name, avatar, dateOfBirth, age, gender, organization, role } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(userID, {
      email: email,
      password: password,
      name: name,
      avatar: avatar,
      dateOfBirth: dateOfBirth,
      age: age,
      gender: gender,
      organization: organization,
      role: role,

    });
    res.status(200).send({
      message: "Update profile successfully!",
      data: updatedUser,
    });
  },
};
export default UserCTL;
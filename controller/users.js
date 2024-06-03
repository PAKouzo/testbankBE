import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;
const UserCTL = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const createUser = await UsersModel.create({
      email,
      password: hash,
    });
    res.status(201).send({
      message: "Register successful",
      data: createUser,
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const users = await UsersModel.find({
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
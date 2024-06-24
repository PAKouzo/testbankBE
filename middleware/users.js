import UserModel from '../model/users.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();
const {TOKEN_SECRET} = process.env;

const UserMDW = {
    checkSignUp: async (req, res, next) => {
        const {username} = req.body;
        try{
            const existedUsername = await UserModel.findOne({ username });
            if(existedUsername) throw new Error('Username already exists');
            next();
        }
        catch(Error){
            res.status(403).send({
                message:Error.message,
                data: null,
                success: false
            })
        }
    },
    checkLogin: async (req, res, next) => {
        const {username, password} = req.body;
        try{
            const existedUsername = await UserModel.findOne({username});
            if(!existedUsername) {
                throw new Error('Username is wrong or does not exist');
            }
            else{
                const isPasswordValid = await bcrypt.compare(password, existedUsername.password)
                if(!isPasswordValid) throw new Error('Password is wrong');
            }
            next();
        }
        catch(Error){
            res.status(403).send({
                message:Error.message,
                data: null,
                success: false
            })
        }
    }
}
export default UserMDW;
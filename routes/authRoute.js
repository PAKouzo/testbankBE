import express from 'express';
import {
  DeleteUser,
  forgotPasswordController,
  GetAllUser,
  loginController,
  registerController,
  resultController,
  testController,
  upadteProfileController,
} from '../controllers/authController.js';
import { isAdmin, isTeacher, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

//routing
//regiter
router.post('/register', registerController);

//login
router.post('/login', loginController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected user routes
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//get all users
router.get("/get-all", requireSignIn, isAdmin, GetAllUser)

//protected teacher routes
router.get('/teacher-auth', requireSignIn, isTeacher, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot password
router.post('/forgot-password', forgotPasswordController);

//update profile
router.put('/profile', requireSignIn, upadteProfileController, GetAllUser);

//user result
router.get('/results/:userId', requireSignIn, resultController);

//delete users
router.delete('/delete/:id', requireSignIn, isAdmin, DeleteUser)

export default router;

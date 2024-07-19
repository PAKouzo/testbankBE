import express from 'express';
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  upadteProfileController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

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
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//forgot password
router.post('/forgot-password', forgotPasswordController);

//update profile
router.put('/profile', requireSignIn, upadteProfileController, getAllUser);

export default router;

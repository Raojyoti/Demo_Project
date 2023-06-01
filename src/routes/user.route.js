import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.registerUser);

//route to login  user
router.post('/login', userController.userlogin);

//route to get all users
router.get('', userController.getAllUsers);

export default router;

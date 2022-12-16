import express from 'express';
import Controller from '../controllers';

const userRouter = express.Router();

userRouter.post('/register', Controller.user.register);
userRouter.post('/modifyUser', Controller.user.modifyUser);
userRouter.post('/getUser', Controller.user.getUser);
userRouter.post('/getUsers', Controller.user.getUsers);
userRouter.post('/removeUser', Controller.user.removeUser);

export default userRouter;

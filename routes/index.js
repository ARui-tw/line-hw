import express from 'express';
import cors from 'cors';
import testRouter from './test';
import userRouter from './user';

const router = express.Router();

router.use(cors());

router.use('/test', testRouter);
router.use('/user', userRouter);

export default router;

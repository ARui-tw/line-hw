import express from 'express';
import cors from 'cors';
import sampleRouter from './sample';
import userRouter from './user';

const router = express.Router();

router.use(cors());

router.use('/sample', sampleRouter);
router.use('/user', userRouter);

export default router;

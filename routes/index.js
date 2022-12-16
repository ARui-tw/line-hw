import express from 'express';
import cors from 'cors';
import testRouter from './test';

const router = express.Router();

router.use(cors());

router.use('/test', testRouter);

export default router;

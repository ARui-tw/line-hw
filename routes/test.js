import express from 'express';
import Controller from '../controller';

const testRouter = express.Router();

testRouter.post('/test', Controller.test.test);

export default testRouter;

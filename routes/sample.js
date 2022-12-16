import express from 'express';
import Controller from '../controllers';

const SampleRouter = express.Router();

SampleRouter.post('/test', Controller.sample.test);

export default SampleRouter;

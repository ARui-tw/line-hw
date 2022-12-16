import logger from '../libs/logger';
import service from '../services';

const sampleController = {
  async test(req, res) {
    try {
      const result = await service.sample.test();
      res.json(result);
    } catch (error) {
      logger.error('[Test Controller] Test failed:', error);
      res.status(400).json({ message: `Test Failed, ${error}` });
    }
  },
};

export default sampleController;

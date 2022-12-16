import logger from '../libs/logger';

const testService = {
  async test() {
    try {
      logger.info('[Test Service] test successfully');
      return { message: 'test successfully' };
    } catch (error) {
      logger.error('[Test Service] Failed to Test:', error);
      throw new Error(`Failed to test, ${error}`);
    }
  },
};

export default testService;

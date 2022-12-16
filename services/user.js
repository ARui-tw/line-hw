import logger from '../libs/logger';
import model from '../models';

const testService = {
  async create(params) {
    try {
      const result = await model.Users.create(params);
      logger.info('[User Service] Create user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to create user to database:', error);
      throw new Error(`Failed to create user database, ${error}`);
    }
  },
  async findOne(filter) {
    try {
      const projection = { password: false };
      const result = await model.Users.findOne(filter, projection).lean();
      logger.info('[User Service] Find user successfully');
      return result;
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async findAll(params) {
    const {
      projection, filter, limit, skip, sort = { order: -1 },
    } = params;

    try {
      const total = await model.Users.countDocuments(filter).lean();
      const data = await model.Users.find(filter, projection, {
        limit,
        skip,
        sort,
      }).lean();

      logger.info('[User Service] Find users successfully');
      return { total, data };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to find users in database, ${error}`);
    }
  },
  async updateOne(params) {
    try {
      const result = await model.Users.updateOne(
        // eslint-disable-next-line no-underscore-dangle
        { _id: params._id },
        params.body,
      ).lean();
      logger.info('[User Service] Update user successfully');
      return { success: result.acknowledged };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to update user in database, ${error}`);
    }
  },
  async deleteOne(filter) {
    try {
      const result = await model.Users.deleteOne(filter).lean();
      logger.info('[User Service] Delete user successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[User Service]', error);
      throw new Error(`Failed to delete user in database, ${error}`);
    }
  },
  async userExist(params, expectedId = null) {
    const { Email } = params;

    const result = await model.Users.countDocuments({
      _id: {
        $ne: expectedId,
      },
      $or: [{ Email }],
    });

    return result > 0;
  },
};

export default testService;

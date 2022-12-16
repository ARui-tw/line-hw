import logger from '../libs/logger';
import service from '../services';
import validator from '../libs/validator';

const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const UserController = {
  async register(req, res) {
    const rule = {
      FirstName: {
        type: 'string',
        min: 1,
        max: 50,
      },
      LastName: {
        type: 'string',
        min: 1,
        max: 50,
      },
      DateOfBirth: {
        type: 'date',
        convert: true,
      },
      Email: {
        type: 'email',
      },
      Gender: {
        type: 'string',
        enum: ['Male', 'Female'],
      },
    };
    try {
      validator.validate(req.body, rule);
      if (await service.user.userExist(req.body)) { throw new Error('Cannot create user, duplicate user.'); }
      const body = await service.user.create(req.body);
      res.json(body);
    } catch (error) {
      logger.error('[User Controller] Failed to register:', error);
      res.status(400).json({ message: `Failed to register, ${error}` });
    }
  },
  async getUser(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.findOne(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUser:', error);
      res.status(400).json({ message: `Failed to getUser, ${error}` });
    }
  },
  async getUsers(req, res) {
    const rule = {
      filter: {
        type: 'object',
        optional: true,
      },
      limit: {
        type: 'number',
        optional: true,
      },
      skip: {
        type: 'number',
        optional: true,
      },
      sort: {
        type: 'object',
        optional: true,
      },
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.findAll(req.body);
      res.json(user);
    } catch (error) {
      logger.error('[User Controller] Failed to getUsers:', error);
      res.status(400).json({ message: `Failed to getUsers, ${error}` });
    }
  },
  async modifyUser(req, res) {
    const rule = {
      _id: idRule,
      FirstName: {
        type: 'string',
        min: 1,
        max: 50,
        optional: true,
      },
      LastName: {
        type: 'string',
        min: 1,
        max: 50,
        optional: true,
      },
      DateOfBirth: {
        type: 'date',
        convert: true,
        optional: true,
      },
      Email: {
        type: 'email',
        optional: true,
      },
      Gender: {
        type: 'string',
        enum: ['男', '女'],
        optional: true,
      },
    };
    try {
      // eslint-disable-next-line no-underscore-dangle
      const userID = req.body._id;
      validator.validate(req.body, rule);

      const result = await service.user.updateOne({ _id: userID, body: req.body });

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to modifyUser:', error);
      res.status(400).json({ message: `Failed to modifyUser, ${error}` });
    }
  },
  async removeUser(req, res) {
    const rule = {
      _id: idRule,
    };

    try {
      validator.validate(req.body, rule);
      const user = await service.user.findOne(req.body);
      const { photoPath } = user;
      req.body = { ...req.body, photoPath };
      const result = await service.user.deleteOne(req.body);
      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to removeUser:', error);
      res.status(400).json({ message: `Failed to removeUser, ${error}` });
    }
  },
  async birthday(req, res) {
    const rule = {
      date: {
        type: 'date',
        convert: true,
      },
    };
    try {
      const returnValue = [];
      validator.validate(req.body, rule);
      const result = await service.user.userFindBirthday(req.body);
      result.forEach((user) => {
        const { FirstName, Email } = user;
        returnValue.push({
          subject: 'Happy birthday!',
          text: `Happy birthday, dear ${FirstName}!`,
          email: Email,
        });
      });

      res.json(returnValue);
    } catch (error) {
      logger.error('[User Controller] Failed to birthday:', error);
      res.status(400).json({ message: `Failed to birthday, ${error}` });
    }
  },
};

export default UserController;

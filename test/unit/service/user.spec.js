/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import connectMongo from '../../../libs/connect_mongo';

describe('Test \'users\' service', () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await mongoose.disconnect();

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  let newUser = null;

  describe('Test \'users.register\' action', () => {
    it('add an user, should return with the user', async () => {
      const res = await request(app).post('/user/register')
        .send({
          FirstName: 'Peter',
          LastName: 'Wang',
          Gender: 'Male',
          DateOfBirth: '1993/12/22',
          Email: 'peter.wang@linecorp.com',
        });

      newUser = res.body;

      expect(res.body).toEqual(expect.objectContaining({
        _id: expect.anything(),
        FirstName: 'Peter',
        LastName: 'Wang',
        Gender: 'Male',
        Email: 'peter.wang@linecorp.com',
      }));
    });
  });

  describe('Test \'users.getUser\' action', () => {
    it('get an user, should return with the user', async () => {
      const res = await request(app).post('/user/getUser')
        .send({ _id: newUser._id });
      expect(res.body).toEqual(expect.objectContaining({
        _id: newUser._id,
        FirstName: newUser.FirstName,
      }));
    });
  });

  describe('Test \'users.getUsers\' action', () => {
    it('get users, should return with the user list', async () => {
      const res = await request(app).post('/user/getUsers');
      expect(res.body).toHaveProperty('total', 1);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Test \'users.modifyUser\' action', () => {
    it('modify an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/modifyUser')
        .send({ _id: newUser._id, password: 'test-modify' });
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('Test \'users.removeUser\' action', () => {
    it('remove an user, should return with \'success message\'', async () => {
      const res = await request(app).post('/user/removeUser')
        .send({ _id: newUser._id });
      expect(res.body).toHaveProperty('success', true);
    });
  });
});

/* Global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { User },
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');

describe('User routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('/api/users/', () => {
    it('GET /api/users - 401 Unauthorized', async () => {
      await request(app).get('/api/users').expect(401);
    });
  }); // End describe('/api/users')
}); // End describe('User routes')

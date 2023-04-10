/* Global describe beforeEach it */

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  db,
  models: { User },
} = require('../index');
const jwt = require('jsonwebtoken');
const seed = require('../../../script/seed');
let app = require('../../app');
chai.use(chaiHttp);

describe('User model', () => {
  let users;
  beforeEach(async () => {
    users = (await seed()).users;
  });

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const token = await users.lu.generateToken();
        chai
          .request(app)
          .get('/users')
          .set({ Authorization: `Bearer ${token}` })
          .end(async (err, res) => {
            expect(res.statusCode).to.equal(200);

            const { id } = await jwt.verify(token, process.env.JWT);
            expect(id).to.equal(users.lu.id);
          });
      });
    });
    describe('authenticate', () => {
      let user;
      beforeEach(
        async () =>
          (user = await User.create({
            firstName: 'lucy',
            lastName: 'loo',
            username: 'lucy',
            password: 'loo',
            email: 'lucy@email.com',
          }))
      );
      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            username: 'lucy',
            password: 'loo',
            email: 'lucy@email.com',
          });
          expect(token).to.be.ok;
        });
      });
      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {
          try {
            await User.authenticate({
              username: 'lucy@gmail.com',
              password: '123',
              email: 'lucy@email.com',
            });
            throw 'nooo';
          } catch (ex) {
            expect(ex.status).to.equal(401);
          }
        });
      });
    }); // End describe('authenticate')
  }); // End describe('instanceMethods')
}); // End describe('User model')

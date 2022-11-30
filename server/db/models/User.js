const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_ROUNDS = 5;

const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  // We need to compare the plain version to an encrypted version of the password.
  return bcrypt.compare(candidatePwd, this.password);
};
console.log('--------->', process.env);

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);

  //~~~~> SHOULD I JUST LEAVE THIS AS JWT SINCE WE ADDED A SECRET IN THE ENV FILE ALREADY?
  // return jwt.sign({ id: this.id }, process.env.SECRET);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    // Returns user instance from backend and gets id.
    const { id } = await jwt.verify(token, process.env.JWT);

    //~~~~> SHOULD I JUST LEAVE THIS AS JWT SINCE WE ADDED A SECRET IN THE ENV FILE ALREADY?
    // const { id } = await jwt.verify(token, process.env.SECRET);

    const user = User.findByPk(id);
    if (!user) {
      throw 'nooo';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //In case the password has been changed, we want to encrypt it with bcrypt.
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

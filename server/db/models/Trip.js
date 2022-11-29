const { DataTypes } = require('sequelize');
const db = require('../db');

const Trip = db.define('trip', {
  tripName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Trip;

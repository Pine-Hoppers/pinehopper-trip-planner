const { DataTypes } = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  activity_name: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.TEXT,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  park_fullName: {
    type: DataTypes.STRING,
  },
  park_url: {
    type: DataTypes.TEXT,
  },
  parkCode: {
    type: DataTypes.STRING,
  },
  isReservationRequired: {
    type: DataTypes.STRING,
  },
  feeDescription: {
    type: DataTypes.STRING,
  },
  doFeesApply: {
    type: DataTypes.STRING,
  },
  arePetsPermittedWithRestrictions: {
    type: DataTypes.STRING,
  },
  petsDescription: {
    type: DataTypes.TEXT,
  },
  activity_category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  activityDescription: {
    type: DataTypes.STRING,
  },
  longDescription: {
    type: DataTypes.TEXT,
  },
  additional_category: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  duration: {
    type: DataTypes.STRING,
  },
  accessibilityInformation: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  dateOfActivity: {
    type: DataTypes.DATEONLY,
    defaultValue: null,
  },
});

module.exports = Activity;

const { DataTypes } = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  activity_name: {
    type: DataTypes.TEXT,
  },
  activity_id: {
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
    type: DataTypes.TEXT,
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
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  activityDescription: {
    type: DataTypes.TEXT,
  },
  longDescription: {
    type: DataTypes.TEXT,
  },
  additional_category: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  duration: {
    type: DataTypes.STRING,
  },
  accessibilityInformation: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
  },
  dateOfActivity: {
    type: DataTypes.DATEONLY,
    defaultValue: null,
  },
});

module.exports = Activity;

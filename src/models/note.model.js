'use strict';
//const { optional } = require('@hapi/joi');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    static associate(models) {
    }
  }
  note.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      color:DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      createdBy:DataTypes.STRING,
      isArchieved: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'note'
    }
  );
  return note;
};
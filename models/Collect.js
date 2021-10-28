const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collect extends Model {}

Collect.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageTag: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    memberID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'collect',
  }
);

module.exports =Collect ;
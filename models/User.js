const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, // id

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, // username

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }, // validate
    }, // email

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // password
  }, // end of user object
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  } // sequelize
); // init method

module.exports = User;
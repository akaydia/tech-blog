const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, // id

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // title

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, // content

    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }, // date_created

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }, // references
    }, // user_id
  }, // end of blogpost object
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog_post',
  } // sequelize
); // init method

module.exports = BlogPost;

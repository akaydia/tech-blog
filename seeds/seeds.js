const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('../seeds/userData.json');
const blogPostData = require('../seeds/blogPostData.json');
const commentData = require('../seeds/commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

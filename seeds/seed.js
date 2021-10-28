const sequelize = require('../config/connection');
const { User, Collect, Comment } = require('../models');

const userData = require('./userData.json');
const collectData = require('./collectData.json');
const commentData = require('./commentData.json');
console.log('test')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log(users)
  const collects = await Collect.bulkCreate(collectData, {
    individualHooks: true,
    returning: true,
  });
  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

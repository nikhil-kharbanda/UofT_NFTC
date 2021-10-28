const User = require('./User');
const Collect = require('./Collect');
const Comments = require('./Comments');

Collect.hasMany(Comments,{
    foreignKey: 'User_id',
});

Comments.belongsTo(User,{
    foreignKey:'User_id',
});

module.exports = { User, Collect , Comments };

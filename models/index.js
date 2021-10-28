const User = require('./User');
const Collect = require('./Collect');
const Comment = require('./Comment');

Collect.belongsTo(User,{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Collect.hasMany(Comment,{
    foreignKey: 'collectId',
    onDelete: 'CASCADE'
});

User.hasMany(Comment,{
    foreignKey:'userId',
    onDelete: 'CASCADE'
});

module.exports = {
     User, Collect , Comment
     }

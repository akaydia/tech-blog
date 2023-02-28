const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// create associations

// User has many BlogPosts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// BlogPost belongs to User
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

// BlogPost can have many Comments
BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});

// Comment belongs to BlogPost
Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id'
});

// Comment belongs to User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, BlogPost, Comment}
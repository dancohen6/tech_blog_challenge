const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');
const Comment = require('./Comment');
const User = require('./User');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize: db,
    modelName: 'post'
  }
);

Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: 'user_id'
  });
  Post.hasMany(models.Comment, {
    foreignKey: 'post_id'
  });
};

module.exports = Post;
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const Post = require('./Post');

class User extends Model {
  async validatePass(providedPassword) {
    return await bcrypt.compare(providedPassword, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
  },
  {
    sequelize: db,
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        user.password = encryptedPassword;
      }
    }
  }
);

module.exports = User;
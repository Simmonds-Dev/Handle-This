// models/Comment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
    {
        sequelize,
        modelName: 'comment',
        timestamps: true 
    }
);

module.exports = Comment;

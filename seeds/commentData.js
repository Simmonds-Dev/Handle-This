const { Comment } = require("../models");

const commentData = [
    {
        content: "Initial Comment",
        post_id: 1,
        user_id: 1
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
const { Post } = require("../models");

const postData = [
    {
        post_title: "Initial Post",
        post_content: "We're rebuilding!",
        user_id: 1,
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
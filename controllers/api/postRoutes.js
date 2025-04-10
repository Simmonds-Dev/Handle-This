const router = require("express").Router();
const { Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

// /api/post
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// /api/post/:id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// /api/post/ with a post method
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

// /api/post/:id
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router
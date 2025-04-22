const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
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
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, // To show author's name
                    attributes: ['id', 'username']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['id', 'username'] }]
                }
            ]
        });

        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = postData.get({ plain: true });

        res.render('singlePost', {
            post,
            currentUserId: req.session.user_id,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// /api/post/ with a post method
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        res.status(200).json(newPost);
    } catch (err) {
        console.error("Error creating post:", err)
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post.user_id !== req.session.user_id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await post.update({ post_content: req.body.post_content });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

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
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post', withAuth, (req, res) => {
    res.render('post', {
        logged_in: req.session.logged_in,
    });
});

// GET /post/:id — show single post w/comments
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['id', 'username'] }]
                }
            ]
        });

        if (!postData) {
            return res.status(404).render('404'); // or res.send('Not Found');
        }

        const post = postData.get({ plain: true });

        res.render('singlePost', {
            post,
            logged_in: req.session.logged_in,
            currentUserId: req.session.user_id
        });
    } catch (err) {
        console.error("🔥 Error in /post/:id route:", err);
        res.status(500).send("Server error");
    }
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});


module.exports = router;
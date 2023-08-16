const router = require('express').Router();
const { Post, Comment, User } = require("../models");

// DISPLAY ALL POSTS //
router.get('/', async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const posts = await Post.findAll({
      include: [User, Comment],
    });

    const post = posts.map((post) => post.get({ plain: true }));

    res.render('index', {
      post: post,
      user: user
    });
  } catch (error) {
    res.redirect('/login');
  }
});

// DISPLAY SINGLE POST //
router.get("/post/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id);
    const post = await Post.findByPk(req.params.id, {
      include: [User, Comment]
    });

    const plaintrue = post.get({ plain: true });
    const comments = plaintrue.comments;

    res.render("post", {
      post: post.get({ plain: true }),
      user: user,
      comments: comments
    });
  } catch (error) {
    res.redirect('/login');
  }
});

// DISPLAY LOGIN PAGE //
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// DISPLAY REGISTRATION PAGE //
router.get('/register', (req, res) => {
  res.render('auth/register');
});

module.exports = router;

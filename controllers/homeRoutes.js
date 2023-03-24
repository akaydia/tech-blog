const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all blogposts and JOIN with user data
router.get('/', async (req, res) => {
  try {
    // Get all Blogposts and JOIN with user data
    const blogData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blog = blogData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one blogpost
router.get('/blogpost/:id', async (req, res) => {
  try {
    // Get one Blogpost and JOIN with user data
    const blogData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    // Get all Comments and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      where: [
        {
          blogpost_id: req.params.id,
        },
      ],
    });

    const comments = commentData.map((project) => project.get({ plain: true }));

    // Check if user is logged in
    var userEdit = false;
    if (blog.user_id == req.session.user_id) {
      userEdit = true;
    }

    res.render('blog', {
      blog,
      comments,
      logged_in: req.session.logged_in,
      userEdit,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all blogposts created by user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get All Blogs Created By User
    const projectData = await BlogPost.findAll({
      where: [
        {
          user_id: req.session.user_id,
        },
      ],
    });

    const blog = projectData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

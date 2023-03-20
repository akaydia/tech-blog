const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Define routes for the homepage
router.get('/', async (req, res) => {
  try {
    // Get all blog posts and render them on the homepage
    const blogPosts = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const serializedPosts = blogPosts.map((post) => post.get({ plain: true }));

    // Check if the user is authenticated
    if (req.session.loggedIn) {
      // Render the dashboard view with the main layout
      const blogPosts = await BlogPost.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['content', 'date_created', 'user_id'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      });

      const serializedPosts = blogPosts.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        layout: 'main',
        blogposts: serializedPosts,
        user: { username: req.session.username },
      });
    } else {
      // Render the homepage view with the main layout
      res.render('home', {
        layout: 'main',
        posts: serializedPosts,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.session.user_id) {
      // If the user is not authenticated, redirect them to the login page
      return res.redirect('/login');
    }

    // Get all blog posts for the current user and render them on the dashboard
    const blogPosts = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const serializedPosts = blogPosts.map((post) => post.get({ plain: true }));

    // Render the dashboard view with the main layout
    res.render('dashboard', {
      layout: 'main',
      blogposts: serializedPosts,
      user: { username: req.session.username },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define routes for editing a blog post
router.get('/edit-post/:id', async (req, res) => {
  try {
    // Find the blog post with the given id and render the edit-post view
    const blogPost = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'date_created', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const serializedPost = blogPost.get({ plain: true });

    // Render the edit-post view with the main layout
    res.render('edit-post', {
      layout: 'main',
      post: serializedPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define routes for the login page
router.get('/login', (req, res) => {
  // Render the login view with the main layout
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Define routes for creating a new blog post
router.get('/post', (req, res) => {
  // Render the post view with the main layout
  res.render('post', { layout: 'main' });
});

module.exports = router;

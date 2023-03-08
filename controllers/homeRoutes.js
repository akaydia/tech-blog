const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

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

    // Render the homepage view with the main layout
    res.render('home', {
      layout: 'main',
      posts: serializedPosts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define routes for the dashboard
router.get('/dashboard', async (req, res) => {
  try {

     // Check if the user is authenticated
     if (!req.session.user_id) {
      // If the user is not authenticated, redirect them to the login page
      res.redirect('/login');
      return;
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
      posts: serializedPosts,
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
  res.render('login', { layout: 'main' });
});

// // Define routes for the signup page
// router.get('/signup', (req, res) => {
//   // Render the signup view with the main layout
//   res.render('signup', { layout: 'main' });
// });

// Define routes for creating a new blog post
router.get('/post', (req, res) => {
  // Render the post view with the main layout
  res.render('post', { layout: 'main' });
});
module.exports = router;

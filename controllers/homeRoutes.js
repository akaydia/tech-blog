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
          attributes: ['comment_text', 'date_created', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const serializedPosts = blogPosts.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts: serializedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
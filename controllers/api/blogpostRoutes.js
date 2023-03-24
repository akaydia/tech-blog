const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { BlogPost, Comment } = require('../../models');

// Define blogpost routes
// updating blogpost
router.put('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.update({
            title: req.body.title,
            content: req.body.description
        }, {
            where: { id: req.body.blogpost_id}
        })
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// post comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            blogpost_id: req.body.blogpost_id
        })
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
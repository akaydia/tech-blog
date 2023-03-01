const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Define comment routes 
// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [ { model: User, attributes: ['username'] }],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    } // catch
}); // GET all comments

// POST a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    } // catch
}); // POST a new comment

// DELETE a comment by its ID
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        } // if
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    } // catch
}); // DELETE a comment by its ID



module.exports = router;
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { BlogPost, User } = require('../../models');

// Define blogpost routes
// GET all blogposts
router.get('/', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findAll({
            include: [ { model: User, attributes: ['username'] }],
        });
        const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
        res.status(200).json(blogposts);
    } catch (err) {
        res.status(500).json(err);
    } // catch
}); // GET all blogposts

// GET one blogpost by id
router.get('/:id', async (req, res) => {
    try {
        const blogpostData = await BlogPost.findByPk(req.params.id, {
            include: [ { model: User, attributes: ['username'] }],
        });
        const blogpost = blogpostData.get({ plain: true });
        res.status(200).json(blogpost);
    } catch (err) {
        res.status(500).json(err);
    } // catch
}); // GET one blogpost by id

// POST a new blogpost
router.post('/', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(400).json(err);
    } // catch
}); // POST a new blogpost

// UPDATE a blogpost by its ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        } // if
        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    } // catch
}); // UPDATE a blogpost by its ID

// DELETE a blogpost by its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogpostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!blogpostData) {
            res.status(404).json({ message: 'No blogpost found with this id!' });
            return;
        } // if
        res.status(200).json(blogpostData);
    } catch (err) {
        res.status(500).json(err);
    } // catch
}); // DELETE a blogpost by its ID

module.exports = router;
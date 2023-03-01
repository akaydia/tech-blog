const router = require('express').Router();

const { User } = require('../../models');

// Define user routes
// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    const users = userData.map((user) => user.get({ plain: true }));
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // GET all users

// GET one user by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    const user = userData.get({ plain: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // GET one user by id

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    }); // req.session.save
  } catch (err) {
    res.status(400).json(err);
  } // catch
}); // Create a new user

// UPDATE a user by id
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    } // if
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // UPDATE a user by id

// DELETE a user by id
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    } // if
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // DELETE a user by id

module.exports = router;

const router = require('express').Router();

const blogpostRoutes = require('./blogpostRoutes');
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/blogposts', blogpostRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
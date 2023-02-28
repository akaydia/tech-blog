const router = require('express').Router();

// Require all controllers
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use all controllers
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
const router = require('express').Router();

const apiRoutes = requite('./api');

const userRoutes = require('./api/userRoutes');
const collectRoutes = require('./collectRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/collectRoutes', collectRoutes);
router.use('/commentRoutes', commentRoutes);

module.exports = router;
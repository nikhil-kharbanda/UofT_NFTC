const router = require('express').Router();
const userRoutes = require('./userRoutes');

const collectRoutes = require('./collectRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/collectRoutes', collectRoutes);
router.use('/commentRoutes', commentRoutes);

module.exports = router;

router.use('/users', userRoutes);

module.exports = router;

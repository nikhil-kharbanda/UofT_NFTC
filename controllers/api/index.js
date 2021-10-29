const router = require('express').Router();
const userRoutes = require('./userRoutes');

const feedRoutes = require('./feedRoutes');
//const commentRoutes = require('./commentRoutes');


router.use('/users', userRoutes);
router.use('/feedRoutes', feedRoutes);
// router.use('/commentRoutes', commentRoutes);

router.use('/users', userRoutes);

module.exports = router;

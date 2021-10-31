const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes=require('./commentRoutes')
const collectRoutes=require('./collectRoutes')

router.use('/users', userRoutes);
router.use('/comments',commentRoutes)
router.use('/collects',collectRoutes)
module.exports = router;

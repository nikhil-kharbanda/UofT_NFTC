const router = require("express").Router();
const userRoutes = require("./userRoutes");
const collectRoutes=require('./collectRoutes')
router.use('/users', userRoutes);
router.use('/collects',collectRoutes)

module.exports = router;

const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
// router.use('/company', companyRoutes);

module.exports = router;
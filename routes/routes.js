const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const companyRoutes = require('./company-routes');

router.use('/user', userRoutes);
router.use('/company', companyRoutes);

module.exports = router;
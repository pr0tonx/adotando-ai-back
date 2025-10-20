const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const companyRoutes = require('./company-routes');
const dogRoutes = require('./dog-routes');
const adoptionRoutes = require('./adoption-routes');

router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/dog', dogRoutes);
router.use('/adoption', adoptionRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const companyRoutes = require('./company-routes');
const dogRoutes = require('./dog-routes');
const adoptionRoutes = require('./adoption-routes');
const AuthService = require('../services/auth-service');

router.post('/login', async (req, res) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/dog', dogRoutes);
router.use('/adoption', adoptionRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();

const {login} = require('../services/auth-service');

router.post('/login', async (req, res) => {
  const result = await login(req.body);

  res.status(result.statusCode).send(result);
});

module.exports = router;
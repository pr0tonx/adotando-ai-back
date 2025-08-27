const express = require('express');
const app = express();
const port = 4200;

const { testConnection } = require('./database/database');

(async () => {
  await testConnection();
})();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send();
});


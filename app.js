const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {testConnection} = require('./database/database');
const routes = require('./routes/routes');
const routeNotFoundHandler = require('./middlewares/routeNotFoundHandler');

require('./models/associations');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 4200;

(async () => await testConnection())();

app.get('/healthcheck', (req, res) => res.status(200).send());
app.use('/api', routes);
app.use(routeNotFoundHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));

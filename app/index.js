const express = require('express');
const setRouter = require('./router');


const app = express();
app.use(express.json());

setRouter(app);

module.exports = app;

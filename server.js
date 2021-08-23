const express = require('express');
const app = express()
const parserRouter = require('./routes/parser');

app.use('/parser/', parserRouter)

module.exports = app;
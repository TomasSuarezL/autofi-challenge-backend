const express = require("express");
const app = express();
const parserRouter = require("./parser/parserRoutes");

app.use("/parser/", parserRouter);

app.use(function (err, req, res, next) {
  if (err.name === "MulterError") {
    err.status = 400;
  }
  console.error(err.stack);
  res.status(err.status).send(err.message);
});

process.on('uncaughtException', function (err) {
  console.log('* [process.on(uncaughtException)]: err:', err);
});

module.exports = app;

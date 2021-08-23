const express = require("express");
const app = express();
const parserRouter = require("./routes/parser");

app.use("/parser/", parserRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status).send(err.message);
});

module.exports = app;

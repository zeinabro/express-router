const express = require("express");
const app = express()
const usersRouter = require("../routes/users");
const fruitRouter = require("../routes/fruits");

app.use("/users", usersRouter)
app.use("/fruits", fruitRouter)

module.exports = app;
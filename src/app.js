const express = require("express");
const app = express()
const usersRouter = require("../routes/users");

app.use("/users", usersRouter)

module.exports = app;
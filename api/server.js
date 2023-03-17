const express = require("express");
const server = express();
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const tweetRouter = require("./tweets/tweet-router");
const commetsRouter = require("./commet/commet-router");
const mw = require("./token/token-middleware");

server.use(express.json());

server.use("/api/users", mw.checkToken, usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/tweets", mw.checkToken, tweetRouter);
server.use("/api/comments", mw.checkToken, commetsRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

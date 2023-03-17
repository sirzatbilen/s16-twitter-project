const express = require("express");
const router = require("express").Router();
const tweetModel = require("./tweet-model");
const mw = require("./tweet-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allTweets = await tweetModel.getAllTweet();
    res.status(200).json(allTweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", mw.checkUserId, (req, res, next) => {
  res.status(200).json(req.yorum);
});

router.post("/", async (req, res, next) => {
  try {
    const newTweet = await tweetModel.createTweet(req.body);
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", mw.checkUserId, async (req, res, next) => {
  try {
    const updatedTweet = await tweetModel.updateTweet(req.params.id, req.body);
    res.json(updatedTweet);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", mw.checkUserId, async (req, res, next) => {
  try {
    const deletedTweet = await tweetModel.deleteByTweetId(req.params.id);
    res.json({ message: "tweet silindi" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const PollController = require('../controller/poll.controller')

router.post("/", PollController.createPoll);
router.post("/:id/vote", PollController.votePoll);
router.get("/", PollController.resultPoll);

module.exports = router
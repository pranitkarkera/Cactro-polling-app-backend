const Poll = require("../models/poll.model");

// Create a poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    console.log("Received request body:", req.body); // Log the request body

    // Validate input
    if (
      !question ||
      !Array.isArray(options) ||
      options.length === 0 ||
      !options.every((opt) => opt.text)
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Create and save the poll
    const poll = new Poll({ question, options });
    await poll.save();
    console.log("Poll created successfully:", poll); // Log the created poll
    res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Vote on a poll
exports.votePoll = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);
    if (poll) {
      if (optionIndex < 0 || optionIndex >= poll.options.length) {
        return res.status(400).json({ message: "Invalid option index" });
      }
      poll.options[optionIndex].votes += 1;
      await poll.save();
      res.json(poll);
    } else {
      res.status(404).json({ message: "Poll not found" });
    }
  } catch (error) {
    console.error("Error voting on poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get poll results
exports.resultPoll = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get specific poll
exports.specificPoll = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid poll ID" });
    }

    const poll = await Poll.findById(id);
    if (poll) {
      res.json(poll);
    } else {
      res.status(404).json({ message: "Poll not found" });
    }
  } catch (error) {
    console.error("Error fetching poll by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

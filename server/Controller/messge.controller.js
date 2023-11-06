const { Router } = require("express");

const messageConroller = Router();

messageConroller.post("/send", async (req, res) => {
  const message = req.body;
  console.log(message);
});

module.exports = { messageConroller };

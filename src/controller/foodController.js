const express = require("express");
const router = express();

router.get("/", async (req, res, next) => {
  res.status(200).send("will write soon");
  res.end();
});

module.exports = router;

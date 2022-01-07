const express = require("express");
const authenticate = () => {
  return;
};

const router = express();

router.get("/", authenticate, (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = router;

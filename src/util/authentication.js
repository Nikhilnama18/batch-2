const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    // next(); // Skip token authentication.

    //   Fetch token
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : req.body.token
      ? req.body.token
      : "";

    // Validate token
    if (!token) {
      return res.status(401).json({
        message: "Missing authentication token.",
      });
    }

    // Verify token
    jwt.verify(token, process.env.PrivateKey, (err, decoded) => {
      if (err)
        return res.status(401).json({
          message: "Authentication failure. Please verify your token.",
        });

      // Pass on request if token verified successfully.
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;

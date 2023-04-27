const jwt = require("jsonwebtoken");

const checkVariables = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    console.log(requiredFields);

    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
      });
    }

    next();
  };
};

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SCRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid token." });
    }
    // Do something with the decoded token, such as extract user information
    req.user = decoded.user.id;
    next();
  });
};

module.exports = { checkVariables, authentication };

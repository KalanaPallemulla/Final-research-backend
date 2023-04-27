const router = require("express").Router();
const User = require("../models/User");
const { checkVariables } = require("../middlewares/helper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post(
  "/user/signup",
  checkVariables(["fullName", "age", "email", "password"]),
  async (req, res) => {
    try {
      const body = req.body;
      const isUser = await User.findOne({ email: req.body.email });
      if (isUser) {
        res.status(409).send("User already exists");
        return;
      }
      const user = new User(body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(body.password, salt);

      const response = await user.save();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send("Sign up error: " + error);
    }
  }
);

router.post(
  "/user/login",
  checkVariables(["email", "password"]),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("User does not exist");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SCRET,
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user._id,
              name: user.fullName,
            },
          });
          return;
        }
      );
    } catch (error) {
      return res.status(500).send("Sign in error: " + error);
    }
  }
);

router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send(200, user);
  } catch (error) {
    return res.status(500).send("User get error: " + error);
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../../middleWare/auth");

//User Model
const User = require("../../models/User");

//@route post api/auth
//@desc auth user before login
//@access public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res.status(400).json("Please enter all field");

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json("No user with this email");

    //Compare user's password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json("Invalid password");

      //Sign a jwt token
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//@route post api/auth/user
//@desc auth user before login
//@access Private
router.get("/user/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

module.exports = router;

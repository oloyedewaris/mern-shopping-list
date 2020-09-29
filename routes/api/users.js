const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

//User Model
const User = require("../../models/User");

//@route post api/users
//@desc register a new user
//@access public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password)
    return res.status(400).json("Please enter all field");

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json("User with this email already exist");

    //Create a new user
    const newUser = new User({
      name,
      email,
      password,
    });

    //Hash the user's password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            //sign a jwt token
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
          })
          .catch(err => res.json({ success: false }).status(404));
      });
    });
  });
});

// console.log(router)
module.exports = router;

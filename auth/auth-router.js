const router = require("express").Router();
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWTSecret = require("../secrets/secret");
const restricted = require("./authenticate-middleware");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then((user) => {
      res.status(200).json({ message: "You're registered!" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "There was an error registering.", err });
    });
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genDaToken(user);
        res
          .status(200)
          .json({ message: `You're logged in, ${user.username}!`, token });
      } else {
        res
          .status(401)
          .json({ errorMessage: "Your credentials were invalid!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "There was an error logging you in!" });
    });
});

router.get("/userlist", restricted, (req, res) => {
  Users.getAll()
    .then((users) => res.status(201).json(users))
    .catch((err) => {
      res
        .status(401)
        .json({ message: "There was an error getting user info", err });
    });
});

module.exports = router;

const genDaToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWTSecret.JWTSecret, options);
  return token;
};

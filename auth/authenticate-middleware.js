/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken");
const secret = require("../secrets/secret");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret.JWTSecret, (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "Sorry, you are not authenticated", err });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(500).json({ message: "Please re-login and try again." });
  }
};

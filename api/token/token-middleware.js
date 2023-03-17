const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret/utils");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "bu token geçersizdir" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "token gereklidir" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkToken };

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports.checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const userInfo = jwt.verify(token, SECRET_KEY);
        req.user = userInfo;
        return next();
      } catch (err) {
        return res.status(401).send("Invalid/Expired token");
      }
    }
    return res.status(400).send("The header is not well formatted (Bearer <token>)");
  }
  return res.status(400).send("You must provide the auth header");
};

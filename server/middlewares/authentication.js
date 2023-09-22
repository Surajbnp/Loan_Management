const { decodeToken } = require("../utils/utils");

const authMiddlewares = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decodedToken = decodeToken(token);
    const { userId, role } = decodedToken;
    req.userId = userId;
    req.role = role;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized");
  }
};

module.exports = authMiddlewares;

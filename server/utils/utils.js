const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateEmail = (email) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailFormat)) return true;
  else return false;
};

const generateToken = ({ userId, email, fullName, role }) => {
  const primaryToken = jwt.sign(
    { userId: userId, email: email, fullName: fullName, role: role },
    process.env.PRIMARY_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    { userId: userId, email: email, fullName: fullName, role: role },
    process.env.REFRESH_SECRET_KEY,
    {
      expiresIn: "7days",
    }
  );
  return {
    primaryToken,
    refreshToken,
  };
};

// function for decrypting token
const decodeToken = (token) => {
  const tokenDecodablePart = token.split(".")[1];
  const decoded = JSON.parse(
    Buffer.from(tokenDecodablePart, "base64").toString()
  );
  return decoded;
};

const genreateEmis = (terms) => {
  const currentDate = new Date();
  const emiArray = [];

  for (let i = 0; i < terms; i++) {
    const startDate = new Date(
      currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000
    );

    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    emiArray.push(endDate);
  }

  return emiArray;
};

module.exports = { validateEmail, decodeToken, generateToken, genreateEmis };

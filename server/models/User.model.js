const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "customer",
    enum: ["customer"],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel,
};

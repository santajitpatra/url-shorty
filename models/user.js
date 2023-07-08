const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      require: true,
    },
    email: {
      type: "string",
      require: true,
      unique: true,
    },
    role: { type: "string", require: true, default: "NORMAL" },
    password: {
      type: "string",
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;

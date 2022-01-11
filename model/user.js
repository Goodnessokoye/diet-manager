const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const {
  schemaForLogin,
  schemaForSignup,
} = require("./schemas/userSchema");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// hash password before saving user
userSchema.pre("save", async function (next) {
  const saltRounds = 10;
  const hash = await bcrypt
    .hash(this.password, saltRounds)
    this.password = hash;
    next();
});

userSchema.statics.joiValidateSignup = async function (obj) {
  const value = await schemaForSignup.validateAsync(obj);

  return value
};


userSchema.statics.joiValidateLogin = async function (obj) {
  const value = await schemaForLogin.validateAsync(obj);

  return value;
};

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password).then((match) => match);
};

module.exports = mongoose.model("User", userSchema);

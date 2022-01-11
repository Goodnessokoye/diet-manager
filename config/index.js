require("dotenv").config();

const config = {};
const JWT_KEY = process.env.JWT_KEY || "randomtokenkey";
const MONGO_URI =
  "mongodb+srv://Goodness:34452027@cluster0.wkdlm.mongodb.net/diet-manager?retryWrites=true&w=majority";
const env = process.env.NODE_ENV || "development";

config.development = {
  JWT_KEY,
  MONGO_URI: MONGO_URI,
  PORT: 8080,
};

config.production = {
  JWT_KEY: JWT_KEY,
  MONGO_URI: process.env.MONGO_URI || MONGO_URI,
  PORT: process.env.PORT || 8080,
};

module.exports = config[env] ? config[env] : config["development"];

const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const _ = require('lodash');
const res = require("express/lib/response");

exports.findByEmail = async (email) => {
  const user = await User.findOne({ email })

  return user;
}

exports.registerUser = async (data) => {

      const newUser = new User(data);

      await newUser.save();
      
      return newUser;
};

exports.loginUser = function (user, plainPassword) {

  const isMatch = user.comparePassword(plainPassword);
  
  return isMatch;

};


//JWT generation
exports.jwtGenerate = (user) => {
  const token = jwt.sign({email: user.email }, config.JWT_KEY, {
    expiresIn: "7d",
  });
  return token;
};

//jwt generation for passsword
/*
exports.passwordJWT = (email) => {
  const token = jwt.sign({ email }, config.JWT_KEY, { expiresIn: "1d" });
  return token;
};
*/


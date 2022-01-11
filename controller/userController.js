
const User = require('../model/user');
const UserService = require("../services/userService");
const _ = require('lodash')

function AuthController() {
  this.registerUser = async (req, res) => {

  const validData = await User.joiValidateSignup(req.body);
    
  const currentUser = await UserService.findByEmail(validData.email);

    if (!_.isEmpty(currentUser)) {
      return res.status(409).send({
        success: false,
        message: "The user already exist",
      });
    }

    const newUser = await UserService.registerUser(req.body);

    if (_.isEmpty(newUser)) {
      return res.status(409).send({
        success: false,
        message: "Something failed....",
      });
    }
   
    const token = UserService.jwtGenerate(newUser);

    return res.status(201).send({
      data: JSON.parse(JSON.stringify(newUser)),
      token,
      message: 'User successfully created',
      success: true,
    });
      
  };

  this.loginUser = async (req, res) => {
  const validData = await User.joiValidateSignup(req.body);

  const user = await UserService.findByEmail(validData.email);

  if (_.isEmpty(user)) {
    return res.status(400).send({
      success: false,
      message: "Email or Password not correct",
    });
  }

    const isLoggedIn = await UserService.loginUser(user, validData.password);

    
    if (!isLoggedIn) {
      return res.status(400).send({
        success: false,
        message: "Auth Failed. username or password is incorrect",
      });
    }


    const token = UserService.jwtGenerate(user);

    return res.status(200).send({
      success: true,
      token,
      message: "Successfully logged in",
      data: user,
    })
  };


}

module.exports = AuthController;

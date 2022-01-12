const router = require('express').Router();
const mealRoute = require('./mealRoute');
const userRoute = require('./userRoute');
const ingredientRoute = require('./ingredientRoute');

module.exports = function () {
  router.use('/users', userRoute());
  router.use('/meals', mealRoute());
  router.use('/ingredients', ingredientRoute());

  return router;
};

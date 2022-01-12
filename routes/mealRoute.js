const router = require('express').Router();

const MealController = require('../controller/mealController');
const { authenticate } = require('../middleware/auth');

module.exports = () => {
  const mealCtl = new MealController();
  router.post('/', authenticate, mealCtl.addMeal);

  router.get('/', authenticate, mealCtl.allMeals);

  router.get('/random', authenticate, mealCtl.getRandomMeal);

  return router;
};

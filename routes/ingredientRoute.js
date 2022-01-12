const router = require('express').Router();

const IngredientController = require('../controller/ingredientController');

module.exports = () => {
  const ingredientCtl = new IngredientController();
  router.post('/', ingredientCtl.addIngredient);

  router.get('/', ingredientCtl.allIngredient);

  return router;
};

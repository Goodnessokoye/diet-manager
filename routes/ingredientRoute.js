const router = require('express').Router();

const IngredientController = require('../controller/ingredientController');
const { authenticate } = require('../middleware/auth');

module.exports = () => {
  const ingredientCtl = new IngredientController();
  router.post('/', authenticate, ingredientCtl.addIngredient);

  router.get('/', authenticate, ingredientCtl.allIngredient);

  return router;
};

/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const IngredientService = require('../services/ingredientService');
const MealService = require('../services/mealService');

function MealController() {
  this.addMeal = async (req, res) => {
    const existingMeal = await MealService.findByName(req.body.name);

    if (!_.isEmpty(existingMeal)) {
      return res.status(409).send({
        success: false,
        message: 'Meal already exist',
      });
    }

    const validIngredientIds = MealService.validateIds(req.body.ingredientId);

    const newMeal = await MealService.addMeal({ ...req.body, ingredientId: validIngredientIds });

    return res.status(201).send({
      success: true,
      message: 'Meal created',
      data: newMeal,
    });
  };

  this.allMeals = async (req, res) => {
    const result = await MealService.allMeals();
    if (result) {
      return res.status(result.status).send({
        data: result.data,
        message: result.message,
        error: null,
      });
    }
  };

  this.getRandomMeal = async (req, res) => {
    // const ingredientWithKCalories = await IngredientService.getKcalories(6);

    // const IngredientIds = ingredientWithKCalories.map((ingredient) => ingredient._id);

    // return res.send(IngredientIds);

    if (!('kCalories' in req.query)) {
      return res.status(400).send({
        success: false,
        message: 'Number of calories was not provided',
      });
    }

    const kCalories = Number(req.query.kCalories);

    const meals = await MealService.findOneRandomMeal(kCalories);

    return res.send(meals);
  };
}

module.exports = MealController;

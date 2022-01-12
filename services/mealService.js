/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const { isValidObjectId } = require('mongoose');
const Meal = require('../model/meal');
// const Ingredient = require('../model/ingredient');

exports.findByName = async (name) => {
  const meal = await Meal.findOne({ name });

  return meal;
};

exports.validateIds = (idList = []) => {
  const _idList = idList.filter((id) => isValidObjectId(id));
  return _idList;
};

exports.addMeal = async (Body) => {
  const newMeal = new Meal({
    name: Body.name,
    ingredientId: Body.ingredientId,
  });

  // const ingredient = await Meal.findByIdAndUpdate(
  //   id,
  //   {
  //     $addToSet: { ingredientId: Body.ingredientId },
  //   },
  //   { new: true }
  // ).populate("ingredientId");

  await newMeal.save();

  return newMeal;
};

// getAllMeals
exports.allMeals = async function () {
  const meals = await Meal.find().sort({ createdAt: -1 });
  if (!meals) {
    return {
      status: 404,
      message: ' No meal found ',
    };
  }
  return {
    status: 200,
    data: meals,
    message: 'Successful',
  };
};

const sumOfMealsCalories = (mealIngredients) => {
  let sum = 0;
  for (const ingredient of mealIngredients) {
    sum += ingredient.numberOfCalories;
  }

  return sum;
};

exports.findMealWithIngredients = async () => {
  const mealsWithIngredients = await Meal.find().populate('ingredientId');

  return mealsWithIngredients;
};

exports.findMealWithKcalories = async (kCalories) => {
  const mealsWithIngredients = await this.findMealWithIngredients();

  const mealWithKCalories = [];

  for (const meal of mealsWithIngredients) {
    const sumofCalories = sumOfMealsCalories(meal?.ingredientId);

    if (sumofCalories <= kCalories) {
      mealWithKCalories.push(meal);
    }
  }

  return mealWithKCalories;
};

exports.findOneRandomMeal = async (kCalories) => {
  const randomeMeal = await this.findMealWithKcalories(kCalories);

  const randomNumber = Math.floor(Math.random() * randomeMeal.length);

  return randomeMeal[randomNumber];
};

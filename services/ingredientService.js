const Ingredient = require('../model/ingredient');

exports.findById = async (_id) => {
  const ingredient = await Ingredient.findById(_id);

  return ingredient;
};

exports.addIngredient = async function (Body) {
  const ingredient = await Ingredient.findOne({ name: Body.name });
  if (ingredient) {
    return {
      status: 400,
      message: 'Ingredient already exist',
    };
  }

  let newIngredient = new Ingredient({
    name: Body.name,
    numberOfCalories: Body.numberOfCalories,
  });

  newIngredient = await newIngredient.save();

  return {
    status: 200,
    data: newIngredient,
    message: `Successfully created ${Body.name}`,
  };
};

// getAllMeals
exports.allIngredient = async function () {
  const ingredients = await Ingredient.find().sort({ createdAt: -1 });
  if (!ingredients) {
    return {
      status: 404,
      message: ' No meal found ',
    };
  }
  return {
    status: 200,
    data: ingredients,
    message: 'Successful',
  };
};

exports.getKcalories = async (kCalories) => {
  const kCaloriesIngredient = await Ingredient
    .find({
      numberOfCalories: { $lte: kCalories },
    }).select('_id numberOfCalories');

  return kCaloriesIngredient;
};

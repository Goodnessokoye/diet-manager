const mongoose = require('mongoose');
const Ingredient = require('./ingredient');
const { schemaForMeal } = require('./schemas/userSchema');

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      lowercase: true,
      unique: true,
    },
    ingredientId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
      },
    ],
  },
  { timestamps: true },
);

mealSchema.statics.joiValidateLogin = async function (obj) {
  const value = await schemaForMeal.validateAsync(obj);

  return value;
};

module.exports = mongoose.model('Meal', mealSchema);

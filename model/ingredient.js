const mongoose = require("mongoose");
const { schemaForIngredient } = require("./schemas/ingredientSchema");

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },

    numberOfCalories: {
      type: String,
      required: [true, "Number of Calories is required"],
    },
  },
  { timestamps: true }
);

ingredientSchema.statics.joiValidateLogin = async function (obj) {
  const value = await schemaForIngredient.validateAsync(obj);

  return value;
};

module.exports = mongoose.model("Ingredient", ingredientSchema);

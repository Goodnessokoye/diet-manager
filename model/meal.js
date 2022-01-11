const mongoose = require("mongoose")
const { schemaForMeal } = require("./schemas/userSchema");

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },
    
  },
  { timestamps: true }
);


mealSchema.statics.joiValidateLogin = async function (obj) {
  const value = await schemaForMeal.validateAsync(obj);

  return value;
};


module.exports = mongoose.model("Meal", mealSchema);

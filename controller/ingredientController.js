const IngredientService = require("../services/ingredientService");

function IngredientController() {
  this.addIngredient = async (req, res) => {
    const result = await IngredientService.addIngredient(req.body);
    if (result)
      return res.status(200).send({
        data: result.data,
        message: result.message,
        error: null,
      });
  };

  this.allIngredient = async (req, res) => {
    const result = await IngredientService.allIngredient();
    if (result)
      return res.status(result.status).send({
        data: result.data,
        message: result.message,
        error: null,
      });
  };
}

module.exports = IngredientController;

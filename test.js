const ingredient = {
  calories: 2,
  name: 'pepper',
};

const meal = {
  name: 'food',
  ingredients: [ingredient, ingredient, ingredient],
};

function calculateCalories(meal) {
  let total = 0;
  meal.ingredients.map((i) => {
    total = i.calories + total;
  });
  return total;
}

function main(meals, calorie) {
  return meals.find((meal) => {
    const total = calculateCalories(meal);

    if (total == calorie) { return meal; }
  });
}

const result = main([meal, meal, meal], 17);
console.log(result.name);

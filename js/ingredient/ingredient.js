const fetchIngredients = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/ingredient");
    const ingredients = await response.json();
    const rows = ingredients.map(createIngredientTemplate);
    const table = $("#ingredients tbody");
    table.append(rows);
  } catch (error) {
    console.error(error);
  }
};

const createIngredientTemplate = (ingredient) => {
  let template = $("#ingredient-item-template")[0].innerHTML;
  return Mustache.render(template, ingredient);
};

fetchIngredients();
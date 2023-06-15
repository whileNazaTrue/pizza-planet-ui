const fetchBeverages = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/beverage");
    const beverages = await response.json();
    const rows = beverages.map(createBeverageTemplate);
    const table = $("#beverages tbody");
    table.append(rows);
  } catch (error) {
    console.error(error);
  }
};

// Create beverage template
const createBeverageTemplate = (beverage) => {
  let template = $("#beverage-item-template")[0].innerHTML;
  return Mustache.render(template, beverage);
};

fetchBeverages();
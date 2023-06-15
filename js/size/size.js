const fetchSizes = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/size/');
    const sizes = await response.json();
    const rows = sizes.map(createSizeTemplate);
    const table = $("#sizes tbody");
    table.append(rows);
  } catch (error) {
    console.error(error);
  }
};

const createSizeTemplate = (size) => {
  let template = $("#size-item-template")[0].innerHTML;
  return Mustache.render(template, size);
};

fetchSizes();

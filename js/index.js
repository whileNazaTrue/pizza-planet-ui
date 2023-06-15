const postOrder = (order) => {
  fetch("http://127.0.0.1:5000/order/", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((res) => showNotification());
};

const orderForm = $("#order-form");
orderForm.submit((event) => {
  const order = getOrderData();
  postOrder(order);

  event.preventDefault();
  event.currentTarget.reset();
});

const getOrderData = () => {
  const ingredients = [];
  $("input[name='ingredients']:checked").each(function (index, el) {
    ingredients.push($(this).val());
  });

  const beverages = [];
  $("input[name='beverages']:checked").each(function (index, el) {
    beverages.push($(this).val());
  });

  return {
    customer: {
      client_name: $("input[name='name']").val(),
      client_dni: $("input[name='dni']").val(),
      client_address: $("input[name='address']").val(),
      client_phone: $("input[name='phone']").val(),
    },
    size_id: $("input[name='size']:checked").val(),
    ingredients,
    beverages,
  };
};

const showNotification = () => {
  const orderAlert = $("#order-alert");
  orderAlert.toggle();
  setTimeout(() => orderAlert.toggle(), 5000);
};

const fetchIngredients = () => {
  fetch("http://127.0.0.1:5000/ingredient/")
    .then((response) => response.json())
    .then((ingredients) => {
      const rows = ingredients.map((element) => createIngredientTemplate(element));
      const table = $("#ingredients tbody");
      table.append(rows);
    });
};

const fetchOrderSizes = () => {
  fetch("http://127.0.0.1:5000/size/")
    .then((response) => response.json())
    .then((sizes) => {
      const rows = sizes.map((element) => createSizeTemplate(element));
      const table = $("#sizes tbody");
      table.append(rows);
    });
};

const fetchBeverages = () => {
  fetch("http://127.0.0.1:5000/beverage/")
    .then((response) => response.json())
    .then((beverages) => {
      const rows = beverages.map((element) => createBeverageTemplate(element));
      const table = $("#beverages tbody");
      table.append(rows);
    });
};

const createIngredientTemplate = (ingredient) => {
  const template = $("#ingredients-template")[0].innerHTML;
  return Mustache.render(template, ingredient);
};

const createSizeTemplate = (size) => {
  const template = $("#sizes-template")[0].innerHTML;
  return Mustache.render(template, size);
};

const createBeverageTemplate = (beverage) => {
  const template = $("#beverages-template")[0].innerHTML;
  return Mustache.render(template, beverage);
};

const loadInformation = () => {
  fetchIngredients();
  fetchOrderSizes();
  fetchBeverages();
};

window.onload = loadInformation;

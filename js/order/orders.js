const fetchOrders = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/order/");
    const orders = await response.json();
    let rows = orders.map(createOrderTemplate);
    let table = $("#orders tbody");
    table.append(rows);
  } catch (error) {
    console.error(error);
  }
};

const createOrderTemplate = (order) => {
  let template = $("#order-item-template")[0].innerHTML;
  return Mustache.render(template, order);
};

fetchOrders();

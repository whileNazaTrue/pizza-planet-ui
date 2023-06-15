
const postBeverage = async (beverage) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/beverage/", {
      method: "POST",
      body: JSON.stringify(beverage),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const data = await response.json();
    showNotification("#beverage-alert");
  } catch (error) {
    console.error(error);
  }
};

const beverageForm = $("#beverage-form");
beverageForm.submit(async (event) => {
  event.preventDefault();
  const beverage = getBeverageData();
  await postBeverage(beverage);
  event.currentTarget.reset();
});

const getBeverageData = () => {
  return {
    name: $("input[name='name']").val(),
    price: $("input[name='price']").val(),
  };
};




const showNotification =() => {
  let beverageAlert = $("#beverage-alert");
  beverageAlert.toggle();
  setTimeout(() => beverageAlert.toggle(), 5000);
}


const postSize = async (size) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/size/", {
      method: "POST",
      body: JSON.stringify(size),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const data = await response.json();
    showNotification();
  } catch (error) {
    console.error(error);
  }
};

const sizeForm = $("#size-form");
sizeForm.submit(async (event) => {
  event.preventDefault();
  const size = getSizeData();
  await postSize(size);
  event.currentTarget.reset();
});

const getSizeData = () => {
  return {
    name: $("input[name='name']").val(),
    price: $("input[name='price']").val(),
  };
};

const showNotification= () => {
  let ingredientAlert = $("#size-alert");
  ingredientAlert.toggle();
  setTimeout(() => ingredientAlert.toggle(), 5000);
}

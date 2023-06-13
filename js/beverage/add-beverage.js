function postBeverage(beverage) {
    fetch('http://127.0.0.1:5000/beverage/', {
        method: 'POST',
        body: JSON.stringify(beverage),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then(res => res.json())
        .then(res => showNotification());

}

let beverageForm = $("#beverage-form");
beverageForm.submit(event => {

    let beverage = getBeverageData();
    postBeverage(beverage);

    event.preventDefault();
    event.currentTarget.reset();
});


function getBeverageData() {
    return {
        name: $("input[name='name']").val(),
        price: $("input[name='price']").val(),
    };
}

function showNotification() {
    let beverageAlert = $("#beverage-alert");
    beverageAlert.toggle();
    setTimeout(() => beverageAlert.toggle(), 5000);
}